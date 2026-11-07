/**
 * Splits a headline figure such as "5 days", "100%" or "−70%" into the part
 * that can count up and the text around it:
 *   splitKpi("5 days") -> { prefix: "", num: 5, suffix: " days" }
 * Text with no number (e.g. "Remote-ready") returns num: null.
 */
export interface KpiParts {
  prefix: string;
  num: number | null;
  suffix: string;
}

export function splitKpi(value: string): KpiParts {
  const m = value.match(/^(\D*?)(\d+)(.*)$/);
  if (!m) return { prefix: '', num: null, suffix: value };
  return { prefix: m[1], num: Number(m[2]), suffix: m[3] };
}
