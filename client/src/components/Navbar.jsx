import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navItems = [
  { name: "Work",     href: "#work"     },
  { name: "Projects", href: "#projects" },
  { name: "Why Me",   href: "#whyme"    },
  { name: "Contact",  href: "#contact"  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "py-3 bg-black/80 backdrop-blur-xl border-b border-white/[0.06]"
          : "py-5 bg-transparent"
      )}
    >
      <div className="section-container flex items-center justify-between">

        <a
          href="#hero"
          className="text-xl font-bold text-white tracking-tight hover:opacity-70 transition-opacity duration-150"
        >
          Justin<span className="gradient-text">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm font-medium text-white/50 hover:text-white transition-colors duration-150"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="hidden md:inline-flex gradient-cta-btn">
          Get in touch
        </a>

        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open navigation menu"
                className="p-2 text-white/50 hover:text-white transition-colors"
              >
                <Menu size={22} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-[#0A0A0A] border-l border-white/[0.06] w-72 flex flex-col"
            >
              <SheetHeader>
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              </SheetHeader>

              <div className="mt-12 mb-10">
                <span className="text-2xl font-bold text-white tracking-tight">
                  Justin<span className="gradient-text">.</span>
                </span>
              </div>

              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="px-2 py-3.5 text-base text-white/50 hover:text-white transition-colors border-b border-white/[0.05] last:border-0"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>

              <div className="mt-auto pb-8">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full justify-center"
                >
                  Get in touch
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
