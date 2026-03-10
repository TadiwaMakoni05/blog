import React, { useState } from "react";
import { Mail, MapPin, Clock, Send } from "lucide-react";
import toast from "react-hot-toast";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
      setSending(false);
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          Have a question, feedback, or partnership inquiry? We'd love to hear
          from you. Fill out the form below or reach us through any of the
          channels listed.
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid gap-4 sm:grid-cols-3 mb-12">
        {[
          {
            icon: Mail,
            title: "Email",
            detail: "support@medium.com",
            href: "mailto:support@medium.com",
          },
          {
            icon: MapPin,
            title: "Location",
            detail: "San Francisco, CA",
            href: null,
          },
          {
            icon: Clock,
            title: "Response Time",
            detail: "Within 24 hours",
            href: null,
          },
        ].map((item) => (
          <div
            key={item.title}
            className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] text-center"
          >
            <item.icon className="h-6 w-6 mx-auto text-black dark:text-white mb-2" />
            <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
            {item.href ? (
              <a
                href={item.href}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition underline"
              >
                {item.detail}
              </a>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.detail}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a]"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium mb-1.5"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#111] text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1.5"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#111] text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium mb-1.5"
          >
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            value={form.subject}
            onChange={handleChange}
            placeholder="What's this about?"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#111] text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium mb-1.5"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us more..."
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#111] text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={sending}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-black text-white dark:bg-white dark:text-black text-sm font-medium hover:opacity-90 disabled:opacity-50 transition"
        >
          <Send className="h-4 w-4" />
          {sending ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default Contact;
