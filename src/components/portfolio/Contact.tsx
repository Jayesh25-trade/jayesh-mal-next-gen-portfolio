import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { toast } from "sonner";

const EMAIL = "jimmy.developers007@gmail.com";
const PHONE = "918605601801";
const WA_MESSAGE =
  "Hi Jayesh, I saw your portfolio and I'd love to discuss a project with you.";
const WHATSAPP = `https://wa.me/${PHONE}?text=${encodeURIComponent(WA_MESSAGE)}`;

// Set your Web3Forms Access Key here. You can get a free key instantly from https://web3forms.com
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
          access_key: WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE" ? "421f1c7d-c240-42d4-9d50-e14b553e1a53" : WEB3FORMS_ACCESS_KEY, // Default developer fallback key if not set
          name,
          email,
          message,
          subject: `New Portfolio Message from ${name}`,
          from_name: "Jayesh Mal Portfolio",
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
    <section id="contact" className="relative py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-5xl font-display font-semibold gradient-text">
              {t.contact.title}
            </h2>
            <p className="mt-3 text-muted-foreground">{t.contact.subtitle}</p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-5">
            {/* Left Column: Direct info & WhatsApp */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 flex flex-col gap-4"
            >
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl bg-gradient-primary p-[1.5px] glow-primary transition-transform hover:scale-[1.02] flex-1"
              >
                <div className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl bg-background/80 px-6 py-8 text-center backdrop-blur">
                  <div className="rounded-full bg-gradient-primary p-3 text-primary-foreground">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <div className="text-lg font-semibold">{t.contact.whatsapp}</div>
                  <div className="text-sm text-muted-foreground">
                    +91 86056 01801
                  </div>
                  <div className="text-xs text-neon-cyan">
                    Replies within a few hours
                  </div>
                </div>
              </a>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center backdrop-blur flex flex-col items-center justify-center gap-3">
                <div className="rounded-full border border-white/15 bg-white/5 p-3">
                  <Mail className="h-6 w-6 text-neon-cyan" />
                </div>
                <div className="text-sm font-medium">{t.contact.emailMe}</div>
                <a href={`mailto:${EMAIL}`} className="break-all text-xs text-muted-foreground hover:text-white transition-colors">
                  {EMAIL}
                </a>
              </div>
            </motion.div>

            {/* Right Column: Interactive Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-span-3 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur"
            >
              {isSent ? (
                <div className="flex flex-col items-center justify-center text-center py-12 gap-4 h-full">
                  <div className="rounded-full bg-emerald-500/10 p-4 text-emerald-400">
                    <CheckCircle2 className="h-12 w-12" />
                  </div>
                  <h3 className="text-xl font-semibold">Message Sent!</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Thank you for reaching out. I have received your message and will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setIsSent(false)}
                    className="mt-4 text-xs text-neon-cyan hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-muted-foreground mb-1">
                      {t.contact.name}
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="John Doe"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm placeholder:text-muted-foreground/30 focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-muted-foreground mb-1">
                      {t.contact.email}
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="john@example.com"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm placeholder:text-muted-foreground/30 focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-medium text-muted-foreground mb-1">
                      {t.contact.message}
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={4}
                      placeholder="Describe your project details..."
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm placeholder:text-muted-foreground/30 focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-primary py-3 font-semibold text-primary-foreground shadow-lg transition-transform active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    ) : (
                      <>
                        <span>{t.contact.send}</span>
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
