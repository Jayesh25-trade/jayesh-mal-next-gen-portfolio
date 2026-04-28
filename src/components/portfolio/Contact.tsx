import { motion } from "framer-motion";
import { Mail, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { toast } from "sonner";

const EMAIL = "jayeshneo07@gmail.com";
const WHATSAPP = "https://wa.me/91XXXXXXXXXX?text=Hi%20Jayesh%2C%20I%20saw%20your%20portfolio%20and%20I%20am%20interested%20in%20your%20services";

export const Contact = () => {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project enquiry from ${form.name || "your site"}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} (${form.email})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    toast.success(t.contact.sent);
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-5xl font-display font-semibold gradient-text">{t.contact.title}</h2>
            <p className="mt-3 text-muted-foreground">{t.contact.subtitle}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
            className="relative gradient-border p-5 sm:p-8"
          >
            <form onSubmit={submit} className="space-y-4">
              <input
                required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder={t.contact.name}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-neon-cyan/60 focus:bg-white/[0.05] transition-all"
              />
              <input
                required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder={t.contact.email}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-neon-cyan/60 focus:bg-white/[0.05] transition-all"
              />
              <textarea
                required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder={t.contact.message}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-neon-cyan/60 focus:bg-white/[0.05] transition-all resize-none"
              />
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-primary py-3.5 font-medium text-primary-foreground glow-primary hover:scale-[1.01] transition-transform"
              >
                <Send className="w-4 h-4" /> {t.contact.send}
              </button>
            </form>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href={`mailto:${EMAIL}`} className="inline-flex items-center justify-center gap-2 rounded-xl glass px-4 py-3 text-sm hover:border-white/25 transition-colors">
                <Mail className="w-4 h-4" /> {t.contact.emailMe}
              </a>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl glass px-4 py-3 text-sm hover:border-white/25 transition-colors">
                <MessageCircle className="w-4 h-4 text-neon-cyan" /> {t.contact.whatsapp}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
