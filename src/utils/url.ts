// Prefixes internal root-relative paths with the configured `base`, so the same
// build works at a domain root (sarojbaral.com.np) and under a subpath
// (https://sarojbaraal.github.io/sb/). External, mailto:, tel: and #hash links
// are returned untouched.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function url(path: string): string {
  if (!path || /^([a-z][a-z0-9+.-]*:|\/\/|#)/i.test(path)) return path;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

// Removes the base from a pathname (for active-link comparisons).
export function stripBase(pathname: string): string {
  const p = base && pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  return p || '/';
}
