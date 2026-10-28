'use client';
import { useState } from 'react';
import { MessageCircle, ArrowUpRight, ArrowRight, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { useLanguage } from './language-provider';
import { business, enquiryUrl } from '@/lib/business';
export function EnquiryDialog({ selection, onClose }: { selection: string | null; onClose: () => void }) {
  const { t } = useLanguage();
  const [copyStatus, setCopyStatus] = useState('');
  const message = selection ? t("Hello! I'd like to know more about {subject}. Could you help me with pricing and the right filter for my home?", { subject: t(selection) }) : '';
  return (      <Dialog open={selection !== null} onOpenChange={open => {if (!open) onClose();}}><DialogContent className="enquiry-dialog"><MessageCircle className="dialog-icon"/><DialogTitle className="dialog-title">{t("Let’s find your filter.")}</DialogTitle><DialogDescription className="dialog-description">{business.whatsapp ? t("Your message is ready. Continue to WhatsApp to chat with us.") : t("WhatsApp enquiries will be available here soon. Your message is ready to copy.")}</DialogDescription><div className="message-preview">{message}</div>{business.whatsapp ? <a className="button primary" href={enquiryUrl(message)} target="_blank" rel="noopener noreferrer">{t("Continue to WhatsApp")} <ArrowUpRight size={19}/></a> : <button className="button primary" onClick={async () => {try {await navigator.clipboard.writeText(message);setCopyStatus(t("Message copied"));}catch{setCopyStatus(t("Copy unavailable. Please select and copy the message above."));}}}>{copyStatus === t("Message copied") ? t("Message copied") : t("Copy enquiry")}{copyStatus === t("Message copied") ? <Check size={18}/> : <ArrowRight size={18}/>}</button>}<p className="dialog-small" role="status">{copyStatus || (business.whatsapp ? t("You can edit your message before sending.") : t("The business contact number has not been added yet."))}</p></DialogContent></Dialog>);
}
