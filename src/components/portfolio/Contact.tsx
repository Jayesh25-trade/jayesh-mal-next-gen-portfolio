import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Send, CheckCircle2, ArrowUpRight } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { toast } from "sonner";

const EMAIL = "jimmy.developers007@gmail.com";
const PHONE = "918605601801";
const WA_MESSAGE =
  "Hi Jimmzzz Developers, I saw your portfolio and I'd love to discuss a project with you.";
const WHATSAPP = `https://wa.me/${PHONE}?text=${encodeURIComponent(WA_MESSAGE)}`;

const WEB3FORMS_ACCESS_KEY = "073d759a-58c6-4e0e-83d5-d22aa54728fc";

export const Contact = () => {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name,
          email,
          message,
          subject: `New Client Message to Jimmzzz Developers from ${name}`,
          from_name: "Jimmzzz Developers Portfolio",
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Thank you! Your message has been sent successfully.");
        setIsSent(true);
        setName("");
        setEmail("");
        setMessage("");
      } else {
        toast.error(result.message || "Failed to send message.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36 bg-ink text-text">
      <div className="section-padding container mx-auto">
        {/* Header Tagline */}
        <div className="flex items-center gap-4 mb-16">
          <span className="label-sm text-acid">08 — INITIATE</span>
          <div className="rule flex-1" />
        </div>

        {/* Oversized Studio Header */}
        <div className="mb-16">
          <h2 className="font-display font-black text-text uppercase tracking-tighter" style={{ fontSize: "clamp(44px, 8vw, 110px)", lineHeight: 0.95 }}>
            {t.contact.title}
          </h2>
          <p className="mt-6 text-muted text-base sm:text-lg max-w-xl">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-wire/20">
          {/* Left Column: Direct Communication Channels */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div className="space-y-6">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 rounded-xl border border-wire/20 bg-wire/5 hover:border-acid hover:bg-acid/5 transition-all duration-300 flex items-start justify-between"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-acid/40 flex items-center justify-center text-acid">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-text">{t.contact.whatsapp}</h4>
                    <p className="text-sm font-mono text-muted mt-1">+91 86056 01801</p>
                    <span className="inline-block text-xs text-acid font-mono mt-2">Replies within a few hours</span>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted group-hover:text-acid group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>

              <div className="p-6 rounded-xl border border-wire/20 bg-wire/5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-wire/40 flex items-center justify-center text-text">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-base text-text">{t.contact.emailMe}</h4>
                  <a href={`mailto:${EMAIL}`} className="text-sm font-mono text-muted hover:text-acid transition-colors mt-1 block break-all">
                    {EMAIL}
                  </a>
                </div>
              </div>
            </div>

            <div className="hidden lg:block pt-8 border-t border-wire/10">
              <p className="text-xs font-mono text-muted uppercase tracking-widest">Availability</p>
              <p className="text-sm text-text font-medium mt-1">Taking on new projects for Q3/Q4</p>
            </div>
          </div>

          {/* Right Column: High-End Contact Form */}
          <div className="lg:col-span-7">
            {isSent ? (
              <div className="flex flex-col items-center justify-center text-center p-12 rounded-xl border border-acid/40 bg-acid/5 h-full">
                <div className="w-16 h-16 rounded-full bg-acid/20 flex items-center justify-center text-acid mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-2xl text-text">Message Sent!</h3>
                <p className="text-sm text-muted max-w-sm mt-2">
                  Thank you for reaching out. I have received your message and will get back to you shortly.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="mt-6 text-xs font-mono text-acid hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">
                    {t.contact.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="John Doe"
                    className="w-full bg-transparent border-b border-wire/30 py-3 text-text text-lg placeholder:text-muted/40 focus:border-acid focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">
                    {t.contact.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="john@example.com"
                    className="w-full bg-transparent border-b border-wire/30 py-3 text-text text-lg placeholder:text-muted/40 focus:border-acid focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono uppercase tracking-widest text-muted mb-2">
                    {t.contact.message}
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={4}
                    placeholder="Describe your project details..."
                    className="w-full bg-transparent border-b border-wire/30 py-3 text-text text-lg placeholder:text-muted/40 focus:border-acid focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 rounded-lg bg-acid text-ink font-display font-black text-sm uppercase tracking-wider hover:bg-white transition-colors duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-ink border-t-transparent" />
                  ) : (
                    <>
                      <span>{t.contact.send}</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
