// Single view-model for every CV format. All facts come from src/data/*.json;
// formats only choose how much of it to show and how to lay it out.
import profile from '../data/profile.json';
import experience from '../data/experience.json';
import education from '../data/education.json';
import cv from '../data/cv.json';

export type FormatId = 'snapshot' | 'resume' | 'europass' | 'full-cv';

export const formats: { id: FormatId; label: string; short: string; file: string; blurb: string }[] = [
  { id: 'snapshot', label: 'Professional Snapshot', short: 'Snapshot', file: 'Saroj-Baral-Professional-Snapshot.pdf', blurb: 'One page. The whole career at a glance.' },
  { id: 'resume', label: 'Modern Resume', short: 'Resume', file: 'Saroj-Baral-Modern-Resume.pdf', blurb: 'Two pages. Role, scope and results.' },
  { id: 'europass', label: 'Europass CV', short: 'Europass', file: 'Saroj-Baral-Europass-CV.pdf', blurb: 'Europass-style layout for applications in Europe.' },
  { id: 'full-cv', label: 'Full CV', short: 'Full CV', file: 'Saroj-Baral-Full-CV.pdf', blurb: 'Everything, with full detail.' },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const nowDate = new Date();
export const nowYear = nowDate.getFullYear() + nowDate.getMonth() / 12;

export const person = {
  name: profile.name,
  headline: profile.headline,
  tagline: profile.tagline,
  city: profile.location.city,
  country: profile.location.country,
  email: profile.email,
  phone: profile.phone,
  linkedinUrl: profile.linkedin,
  linkedin: profile.linkedin.replace(/^https?:\/\/(www\.)?/, ''),
  summary: profile.summary,
  hire: profile.hire,
  identity: profile.identity,
  whatsapp: profile.whatsapp,
  languages: profile.languages,
};

export type Job = (typeof experience)[number] & { period: string; years: number; titleLine: string };

export const jobs: Job[] = experience.map((j) => {
  const to = j.toYear ?? nowYear;
  const titles = 'titles' in j && j.titles ? (j.titles as string[]) : [j.role];
  return {
    ...j,
    period: `${j.start} to ${j.end}`,
    years: Math.round((to - j.fromYear) * 10) / 10,
    titleLine: titles.join(', then '),
  } as Job;
});

export const huawei = jobs.find((j) => j.kind === 'core')!;
export const current = jobs.find((j) => j.kind === 'now')!;
export const huaweiYears = Math.round(huawei.years);

export const edu = education.map((e) => ({ ...e, period: `${e.start} to ${e.end}` }));
export const recognition = cv.recognition;
export const strengths = cv.strengths;
export const stack = cv.stack;
export const volunteer = cv.volunteer;
export const nt = { ...cv.nt, bts: `${cv.nt.bts}${cv.nt.btsPlus ? '+' : ''}`, swaps: `${cv.nt.swaps}${cv.nt.swapsPlus ? '+' : ''}` };
export const ncell = {
  ...cv.ncell,
  swapped: `${cv.ncell.swappedSites}${cv.ncell.plus ? '+' : ''}`,
  share: Math.round((cv.ncell.swappedSites / cv.ncell.totalSites) * 100),
};

export const capabilities = cv.capabilities;

export function formatById(id: string) {
  return formats.find((f) => f.id === id);
}
export const monthName = (m: number) => MONTHS[m];

const yr = (a: number, b: number | null) => `${Math.floor(a + 0.001)}–${b === null ? 'present' : Math.round(b)}`;
/** Education and work as one chronological schedule (used by the home page and the Snapshot). */
export const scheduleRows = [
  ...edu.map((e) => ({ show: true, label: e.short, sub: e.institution, start: e.fromYear, end: e.toYear as number, kind: 'edu' as string, years: yr(e.fromYear, e.toYear) })),
  ...jobs.map((j) => ({ show: j.snapshot !== false, label: j.role, sub: j.org.replace(/ Co\., Pvt\. Ltd\./, ''), start: j.fromYear, end: (j.toYear ?? nowYear) as number, kind: j.kind as string, years: yr(j.fromYear, j.toYear) })),
].sort((a, b) => a.start - b.start);
