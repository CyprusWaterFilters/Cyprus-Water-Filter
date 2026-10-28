'use client';
import { useLanguage } from '@/components/language-provider';


import { ArrowUpRight, ArrowRight, MessageCircle, Check } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

const questions = [
  { id: 'fit', topic: 'COMMERCIAL-GRADE, HOME-READY', question: 'Are these commercial filters suitable for homes?', answer: 'Yes. These commercial-grade ranges can be selected for residential installation. We match the range, size and connection to your water, available space and household use before you choose.', action: 'Match my home', enquiry: 'choosing a commercial-grade water filter for my home' },
  { id: 'sizes', topic: 'THE LITTLE DETAILS', question: 'What is the difference between the sizes?', answer: 'The ranges come in 10, 15 and 17 inches. Capacity, flow and dimensions vary by model. A larger cartridge is not automatically the best fit: we’ll check your usage and the space available.', action: 'Ask about sizing', enquiry: 'the right filter size for my available space' },
  { id: 'replacement', topic: 'LOOKING AFTER YOUR FILTER', question: 'When will I need a replacement?', answer: 'That depends on your cartridge, local water quality and usage. Follow the manufacturer’s replacement guidance for your exact model. Tell us what you have installed and we can help with the next step.', action: 'Find my replacement', enquiry: 'a replacement cartridge for my existing filter' },
  { id: 'pricing', topic: 'PLANNING THE NEXT STEP', question: 'What about pricing and installation?', answer: 'Send us the model you’re considering, or ask for a recommendation. We’ll confirm the current price, compatibility and installation options available in your area before you decide.', action: 'Ask for a price', enquiry: 'pricing and installation options for a water filter' },
];

export function SupportSections({ onEnquire }: { onEnquire: (subject: string) => void }) {
  const { t } = useLanguage();
  return (
    <>
      <section className="local-help" id="how" aria-labelledby="local-help-title">
        <div className="local-help-panel">
          <div className="local-help-story">
            <p className="support-eyebrow"><span/> {t("LOCAL PEOPLE. SIMPLE ANSWERS.")}</p>
            <h2 id="local-help-title">{t("Commercial systems.")}<br/><em>{t("Simple home advice.")}</em></h2>
            <p className="local-help-copy">{t("You know your home.")}<br/>{t("We know how to match the system.")}</p>
            <button className="local-help-cta" onClick={() => onEnquire(t("a water filter for my home"))}><MessageCircle size={21}/> {t("Let’s talk on WhatsApp")} <ArrowUpRight size={20}/></button>
            <p className="local-help-note"><Check size={15}/> {t("A friendly place to start. No need to be an expert.")}</p>
          </div>
          <div className="conversation-start">
            <div className="conversation-symbol"><MessageCircle size={29} strokeWidth={1.6}/><span>{t("LET’S MAKE IT SIMPLE")}</span></div>
            <h3>{t("What brings")} <br/>{t("you here?")}</h3>
            <p>{t("Pick a starting point.")} <br/>{t("We’ll take it from there.")}</p>
            <div className="conversation-options">
              {[
                ['01', t("I’m choosing my first filter"), t("choosing my first water filter")],
                ['02', t("I need a replacement"), t("a replacement cartridge for my current filter")],
                ['03', t("I’d like to know the price"), t("water filter pricing and installation")],
              ].map(([number, label, enquiry]) => <button key={number} onClick={() => onEnquire(enquiry)}><span className="conversation-number">{number}</span><span>{label}</span><ArrowUpRight size={19}/></button>)}
            </div>
            <p className="conversation-caption">{t("Choose a question to prepare your enquiry.")}</p>
          </div>
          <ol className="local-help-path" aria-label={t("How we help")}>
            <li><span>01</span> {t("Tell us about your home")}</li>
            <li><span>02</span> {t("Compare your options")}</li>
            <li><span>03</span> {t("Plan your next step")}</li>
          </ol>
        </div>
      </section>

      <section className="water-faq" id="faq" aria-labelledby="water-faq-title">
        <div className="water-faq-intro">
          <p className="support-eyebrow">{t("A LITTLE CLARITY GOES A LONG WAY")}</p>
          <h2 id="water-faq-title">{t("Good questions.")}<br/><em>{t("Clear answers.")}</em></h2>
          <p>{t("The things you’re wondering about,")}<br/>{t("without the technical overwhelm.")}</p>
          <div className="water-faq-help"><span className="water-faq-help-icon"><MessageCircle size={23}/></span><div><h3>{t("Have a question of your own?")}</h3><button onClick={() => onEnquire(t("a question about water filters for my home"))}>{t("Ask us directly")} <ArrowUpRight size={17}/></button></div></div>
        </div>
        <Accordion className="water-faq-list" defaultValue={['fit']} multiple={false}>
          {questions.map((item, index) => <AccordionItem key={item.id} value={item.id} className="water-faq-card">
            <AccordionTrigger className="water-faq-trigger"><span className="water-faq-number">0{index + 1}</span><span className="water-faq-question"><span>{t(item.topic)}</span><span>{t(item.question)}</span></span></AccordionTrigger>
            <AccordionContent className="water-faq-answer"><p>{t(item.answer)}</p><button onClick={() => onEnquire(t(item.enquiry))}>{t(item.action)}<ArrowRight size={17}/></button></AccordionContent>
          </AccordionItem>)}
        </Accordion>
      </section>
    </>
  );
}
