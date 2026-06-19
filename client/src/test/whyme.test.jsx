import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import WhyMe from "@/components/whyme";

// ── Framer Motion: synchronous pass-through ──
vi.mock("framer-motion", () => ({
  motion: new Proxy(
    {},
    { get: (_, __) => ({ children }) => children ?? null }
  ),
  AnimatePresence: ({ children }) => children ?? null,
}));

vi.mock("lucide-react", () => ({
  Check:     () => null,
  Upload:    () => null,
  ArrowRight:() => null,
  Zap:       () => null,
}));

vi.mock("@/data/meta", () => ({
  meta: { resumeFile: "/resume.pdf", company: "TikTok · ByteDance", bio: "Test bio." },
}));

vi.mock("@/lib/config", () => ({
  API_BASE_URL: "http://localhost:5000",
}));

// ─────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────

function makeSSEStream(events) {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      for (const evt of events) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(evt)}\n\n`));
      }
      controller.close();
    },
  });
}

function mockStream(events) {
  global.fetch = vi.fn().mockResolvedValue({ ok: true, body: makeSSEStream(events) });
}

/** Type into the job-description textarea using a synthetic change event. */
function fillTextarea(value) {
  fireEvent.change(
    screen.getByPlaceholderText("Paste the job description here…"),
    { target: { value } }
  );
}

/** Click the Analyse fit submit button. */
function clickSubmit() {
  fireEvent.click(screen.getByRole("button", { name: /analyse fit/i }));
}

const HAPPY = [
  { type: "phase", id: "retrieve", state: "active" },
  { type: "phase", id: "retrieve", state: "done" },
  { type: "phase", id: "generate", state: "active" },
  { type: "token",  content: "Justin " },
  { type: "token",  content: "is a great fit." },
  { type: "phase", id: "generate", state: "done" },
  { type: "done" },
];

// ─────────────────────────────────────────────────────────────────
// Tests
// ─────────────────────────────────────────────────────────────────

describe("WhyMe — initial render", () => {
  beforeEach(() => vi.clearAllMocks());

  it("renders the section heading 'Why me'", () => {
    render(<WhyMe />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Why me");
  });

  it("renders textarea with correct placeholder", () => {
    render(<WhyMe />);
    expect(
      screen.getByPlaceholderText("Paste the job description here…")
    ).toBeInTheDocument();
  });

  it("renders the file upload input", () => {
    render(<WhyMe />);
    expect(screen.getByLabelText("Upload job description PDF")).toBeInTheDocument();
  });

  it("shows character counter at 0/2000", () => {
    render(<WhyMe />);
    expect(screen.getByText("0/2000")).toBeInTheDocument();
  });

  it("Analyse fit button is disabled when textarea is empty", () => {
    render(<WhyMe />);
    expect(screen.getByRole("button", { name: /analyse fit/i })).toBeDisabled();
  });

  it("output card and phase indicators are not visible initially", () => {
    render(<WhyMe />);
    expect(screen.queryByText(/analysis complete/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/scanning resume/i)).not.toBeInTheDocument();
  });
});

describe("WhyMe — input interaction", () => {
  beforeEach(() => vi.clearAllMocks());

  it("enables the Analyse fit button when text is typed", () => {
    render(<WhyMe />);
    fillTextarea("Senior ML Engineer");
    expect(screen.getByRole("button", { name: /analyse fit/i })).toBeEnabled();
  });

  it("updates character counter as user types", () => {
    render(<WhyMe />);
    fillTextarea("Hello");
    expect(screen.getByText("5/2000")).toBeInTheDocument();
  });

  it("enforces 2000 character maxLength on textarea", () => {
    render(<WhyMe />);
    const textarea = screen.getByPlaceholderText("Paste the job description here…");
    expect(textarea).toHaveAttribute("maxlength", "2000");
  });

  it("textarea is disabled while a submission is in flight", async () => {
    global.fetch = vi.fn().mockReturnValue(new Promise(() => {}));
    render(<WhyMe />);
    fillTextarea("some JD");
    clickSubmit();
    await waitFor(() =>
      expect(
        screen.getByPlaceholderText("Paste the job description here…")
      ).toBeDisabled()
    );
  });
});

describe("WhyMe — SSE streaming flow", () => {
  beforeEach(() => vi.clearAllMocks());

  it("POSTs to the correct endpoint with the job description", async () => {
    mockStream(HAPPY);
    render(<WhyMe />);
    fillTextarea("ML Engineer JD");
    clickSubmit();
    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:5000/api/whyme",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jobDescription: "ML Engineer JD" }),
        })
      )
    );
  });

  it("shows phase indicators while streaming", async () => {
    mockStream(HAPPY);
    render(<WhyMe />);
    fillTextarea("some JD");
    clickSubmit();
    await waitFor(() => {
      expect(screen.getByText("Scanning resume")).toBeInTheDocument();
      expect(screen.getByText("Generating analysis")).toBeInTheDocument();
    });
  });

  it("accumulates token events into the response paragraph", async () => {
    mockStream(HAPPY);
    render(<WhyMe />);
    fillTextarea("some JD");
    clickSubmit();
    await waitFor(() =>
      expect(screen.getByText("Justin is a great fit.")).toBeInTheDocument()
    );
  });

  it("shows 'Analysis complete' badge when stream ends", async () => {
    mockStream(HAPPY);
    render(<WhyMe />);
    fillTextarea("some JD");
    clickSubmit();
    await waitFor(() =>
      expect(screen.getByText(/analysis complete/i)).toBeInTheDocument()
    );
  });

  it("shows 'Get in touch' and 'Download resume' links after done", async () => {
    mockStream(HAPPY);
    render(<WhyMe />);
    fillTextarea("some JD");
    clickSubmit();
    await waitFor(() => {
      expect(screen.getByRole("link", { name: /get in touch/i })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /download resume/i })).toBeInTheDocument();
    });
  });

  it("removes streaming-cursor class from output paragraph when done", async () => {
    mockStream(HAPPY);
    render(<WhyMe />);
    fillTextarea("some JD");
    clickSubmit();
    await waitFor(() => screen.getByText("Justin is a great fit."));
    expect(screen.getByText("Justin is a great fit.")).not.toHaveClass("streaming-cursor");
  });

  it("Analyse fit button is re-enabled after the stream completes", async () => {
    mockStream(HAPPY);
    render(<WhyMe />);
    fillTextarea("some JD");
    clickSubmit();
    await waitFor(() =>
      expect(screen.getByRole("button", { name: /analyse fit/i })).toBeEnabled()
    );
  });
});

describe("WhyMe — error handling", () => {
  beforeEach(() => vi.clearAllMocks());

  it("shows error message when fetch rejects (network failure)", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network failure"));
    render(<WhyMe />);
    fillTextarea("some JD");
    clickSubmit();
    await waitFor(() =>
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    );
  });

  it("shows error message when server returns non-ok HTTP status", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      text: async () => "Internal Server Error",
    });
    render(<WhyMe />);
    fillTextarea("some JD");
    clickSubmit();
    await waitFor(() =>
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    );
  });

  it("shows error message when stream emits an error event", async () => {
    mockStream([{ type: "error", message: "LLM unavailable" }]);
    render(<WhyMe />);
    fillTextarea("some JD");
    clickSubmit();
    await waitFor(() =>
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    );
  });
});

describe("WhyMe — PDF upload", () => {
  beforeEach(() => vi.clearAllMocks());

  it("calls upload_jd and populates textarea with extracted text", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ text: "Senior ML Engineer at Acme Corp" }),
    });
    render(<WhyMe />);
    const file = new File(["pdf bytes"], "jd.pdf", { type: "application/pdf" });
    await act(async () => {
      fireEvent.change(screen.getByLabelText("Upload job description PDF"), {
        target: { files: [file] },
      });
    });
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:5000/api/whyme/upload_jd",
        expect.objectContaining({ method: "POST" })
      );
      expect(
        screen.getByPlaceholderText("Paste the job description here…")
      ).toHaveValue("Senior ML Engineer at Acme Corp");
    });
  });

  it("displays filename next to upload icon after successful parse", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ text: "job description text" }),
    });
    render(<WhyMe />);
    const file = new File([""], "my-jd.pdf", { type: "application/pdf" });
    await act(async () => {
      fireEvent.change(screen.getByLabelText("Upload job description PDF"), {
        target: { files: [file] },
      });
    });
    await waitFor(() =>
      expect(screen.getByText("my-jd.pdf")).toBeInTheDocument()
    );
  });

  it("shows error message when PDF upload endpoint fails", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      text: async () => "Bad Request",
    });
    render(<WhyMe />);
    const file = new File([""], "bad.pdf", { type: "application/pdf" });
    await act(async () => {
      fireEvent.change(screen.getByLabelText("Upload job description PDF"), {
        target: { files: [file] },
      });
    });
    await waitFor(() =>
      expect(screen.getByText(/failed to parse pdf/i)).toBeInTheDocument()
    );
  });

  it("truncates extracted text to 2000 characters", async () => {
    const longText = "x".repeat(3000);
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ text: longText }),
    });
    render(<WhyMe />);
    const file = new File([""], "long.pdf", { type: "application/pdf" });
    await act(async () => {
      fireEvent.change(screen.getByLabelText("Upload job description PDF"), {
        target: { files: [file] },
      });
    });
    await waitFor(() => {
      const textarea = screen.getByPlaceholderText("Paste the job description here…");
      expect(textarea.value.length).toBeLessThanOrEqual(2000);
    });
  });
});
