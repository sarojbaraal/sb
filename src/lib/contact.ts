// Contact channels, one per line, each opening its own app. Source: src/data/profile.json.
import profile from '../data/profile.json';

export const channels = [
  { id: 'email', label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: 'mail', external: false },
  { id: 'whatsapp', label: 'WhatsApp', value: profile.handle, href: profile.whatsappUrl, icon: 'whatsapp', external: true },
  { id: 'telegram', label: 'Telegram', value: profile.handle, href: profile.chatUrl, icon: 'telegram', external: true },
  { id: 'linkedin', label: 'LinkedIn', value: 'Saroj Baral', href: profile.linkedin, icon: 'link', external: true },
] as const;
