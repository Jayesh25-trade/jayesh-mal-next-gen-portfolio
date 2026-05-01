import { motion } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

const EMAIL = "jayeshneo07@gmail.com";
const PHONE = "918605601801";
const WA_MESSAGE =
  "Hi Jayesh, I saw your portfolio and I'd love to discuss a project with you.";
const WHATSAPP = `https://wa.me/${PHONE}?text=${encodeURIComponent(WA_MESSAGE)}`;
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Project enquiry from your portfolio"
)}&body=${encodeURIComponent(
  "Hi Jayesh,\n\nI saw your portfolio and I'd love to discuss a project with you.\n\nProject details:\n\nThanks!"
)}`;

export const Contact = () => {
  const { t } = useI18n();

  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-5xl font-display font-semibold gradient-text">
              {t.contact.title}
            </h2>
            <p className="mt-3 text-muted-foreground">{t.contact.subtitle}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="relative gradient-border p-6 sm:p-10"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl bg-gradient-primary p-[1.5px] glow-primary transition-transform hover:scale-[1.02]"
              >
                <div className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl bg-background/80 px-6 py-8 text-center backdrop-blur">
                  <div className="rounded-full bg-gradient-primary p-3 text-primary-foreground">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <div className="text-lg font-semibold">Chat on WhatsApp</div>
                  <div className="text-sm text-muted-foreground">
                    +91 86056 01801
                  </div>
                  <div className="text-xs text-neon-cyan">
                    Replies within a few hours
                  </div>
                </div>
              </a>

              <a
                href={MAILTO}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center transition-all hover:border-white/25 hover:bg-white/[0.06]"
              >
                <div className="flex h-full flex-col items-center justify-center gap-3 px-2 py-6">
                  <div className="rounded-full border border-white/15 bg-white/5 p-3">
                    <Mail className="h-6 w-6 text-neon-cyan" />
                  </div>
                  <div className="text-lg font-semibold">Email me</div>
                  <div className="break-all text-sm text-muted-foreground">
                    {EMAIL}
                  </div>
                  <div className="text-xs text-neon-cyan">
                    For detailed briefs
                  </div>
                </div>
              </a>
            </div>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              Prefer something else? Tap WhatsApp for the fastest reply.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
