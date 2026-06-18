import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const info = [
  {
    icon: <FaPhoneAlt />, title: "Phone", desc: "+65 82909567"
  },
  {
    icon: <FaEnvelope />, title: "Email", desc: "gohkhjustin@gmail.com"
  },
];

const MAX_CHARS = 2000

export default function Contact() {
  const [status, setStatus] = useState("");
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.target);
    formData.append("access_key", accessKey);
    const payload = JSON.stringify(Object.fromEntries(formData));

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: payload,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        e.target.reset();
      } else {
        console.error("Web3Forms error:", data);
        setStatus("error");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 1.5, ease: "easeIn" },
      }}
      className="py-6"
    >
      <div className="container mx-auto px-4 sm:px-6 mt-20">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          <div className="xl:w-[54%] order-2 xl:order-none">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 p-10 bg-[#1f1f1f]/60 rounded-xl"
            >
              <h3 className="text-5xl text-gradient font-poppins-bold leading-snug">Let&apos;s Work Together!</h3>
              <p className="text-white/60 font-poppins-regular">
                Whether you have a specific project in mind, or just want to say hello,
                don’t hesitate to reach out! Drop me a message and I’ll get back to you
                as soon as I can.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  name="firstname"
                  type="text"
                  placeholder="Firstname"
                  required
                />
                <Input
                  name="lastname"
                  type="text"
                  placeholder="Lastname"
                  required
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  required
                />
                <Input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  required
                />
              </div>

              <Textarea
                name="message"
                placeholder="Type your message here"
                rows={6}
                maxLength={MAX_CHARS}
                required
                className="h-[200px] border-white/10 font-poppins-regular text-white/80 placeholder:text-white/60 focus-visible:outline-none focus-visible-ring-1 focus-visible:ring-accent focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={status === "loading"}
                className="max-w-40 bg-accent text-white px-4 py-2 rounded disabled:opacity-50"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>

              {status === "success" && (
                <p className="text-gradient font-poppins-semibold">Message sent successfully!</p>
              )}
              {status === "error" && (
                <p className="text-red-500/80 font-poppins-semibold">Failed to send. Please try again.</p>
              )}
            </form>
          </div>

          <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
            <ul className="flex flex-col gap-10">
              {info.map((item, idx) => (
                <li key={idx} className="flex items-center gap-6">
                  <div
                    className="w-[72px] h-[72px] xl:w-[104px] xl:h-[104px] bg-[#27272c] text-accent rounded-md flex items-center justify-center text-2xl"
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-gradient text-xl font-poppins-semibold">{item.title}</p>
                    <h3 className="text-2xl text-white">{item.desc}</h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
