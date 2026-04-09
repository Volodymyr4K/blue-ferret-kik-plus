'use client';

import { motion } from 'motion/react';
import { Mail, Instagram, Send, MessageCircle } from 'lucide-react';
import siteContent from '@/data/site-content';
import SectionHeader from '@/components/SectionHeader';
import uiContent from '@/data/ui-content';
import { safeExternalUrl } from '@/lib/safe-url';

export default function ContactsPage() {
  const { contacts } = siteContent;
  return (
    <div className="min-h-screen">
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/50" />
        <div className="absolute inset-0 bg-dots opacity-90" />
        <div className="absolute inset-0 bg-grain" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-30%,#009FE328_0%,transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_90%_80%,#4BB27218_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-noise" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <SectionHeader
              label={uiContent.contactsPage.label}
              title={uiContent.contactsPage.title}
              subtitle={contacts.intro}
            />
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 -mt-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8"
          >
            <a
              href={`mailto:${contacts.email}`}
              className="group flex flex-col items-center p-6 sm:p-12 rounded-2xl bg-white/95 backdrop-blur-sm border-2 border-slate-200/70 shadow-card hover:shadow-card-hover hover:border-bf/50 transition-all duration-400 hover:-translate-y-2 card-shimmer"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-bf-muted flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-[var(--bf-accent)]/15 group-hover:scale-105 transition-all">
                <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-bf" />
              </div>
              <h3 className="heading-3 mb-2 text-lg">Email</h3>
              <p className="text-body text-center text-sm sm:text-base break-all">{contacts.email}</p>
            </a>

            <a
              href={safeExternalUrl(contacts.social.instagram)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-6 sm:p-12 rounded-2xl bg-white/95 backdrop-blur-sm border-2 border-slate-200/70 shadow-card hover:shadow-card-hover hover:border-bf/50 transition-all duration-400 hover:-translate-y-2 card-shimmer"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-bf-muted flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-[var(--bf-accent)]/15 group-hover:scale-105 transition-all">
                <Instagram className="w-7 h-7 sm:w-8 sm:h-8 text-bf" />
              </div>
              <h3 className="heading-3 mb-2 text-lg">Instagram</h3>
              <p className="text-body text-center text-sm sm:text-base break-all">{uiContent.contactsPage.instagramHandle}</p>
            </a>

            <a
              href={safeExternalUrl(contacts.social.telegram)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-6 sm:p-12 rounded-2xl bg-white/95 backdrop-blur-sm border-2 border-slate-200/70 shadow-card hover:shadow-card-hover hover:border-bf/50 transition-all duration-400 hover:-translate-y-2 card-shimmer"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-bf-muted flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-[var(--bf-accent)]/15 group-hover:scale-105 transition-all">
                <Send className="w-7 h-7 sm:w-8 sm:h-8 text-bf" />
              </div>
              <h3 className="heading-3 mb-2 text-lg">Telegram</h3>
              <p className="text-body text-center text-sm sm:text-base">{uiContent.contactsPage.telegramAction}</p>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-16 sm:mt-24 p-6 sm:p-10 lg:p-14 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/30 border-2 border-slate-200/70 text-center shadow-[0_8px_40px_-15px_rgba(0,0,0,0.06)]"
          >
            <div className="w-14 h-14 rounded-2xl bg-bf-muted flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-7 h-7 text-bf" />
            </div>
            <h3 className="heading-2 text-xl mb-3">
              {uiContent.contactsPage.partnershipTitle}
            </h3>
            <p className="text-body mb-8 max-w-xl mx-auto">
              {contacts.partnership}
            </p>
            <a
              href={`mailto:${contacts.email}`}
              className="inline-flex w-full sm:w-auto max-w-xs justify-center items-center gap-2 px-8 sm:px-10 py-4 btn btn-primary rounded-xl shadow-premium-glow"
            >
              <Mail className="w-5 h-5" />
              {uiContent.contactsPage.writeButton}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
