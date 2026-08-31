import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { theme } from '../../theme.js';
import { Logo } from '../auth/Shared.js';
import { PLATFORM_NAME } from '../../lib/platform.js';

/**
 * Phoenixtekk fork: shared chrome for the hosted documentation routes
 * (/handbook, /help). Public and unauthenticated — partners and prospective
 * customers need to read these before they have an account.
 *
 * Deliberately uses the portal's own theme tokens rather than a separate
 * stylesheet, so the docs look like part of the product instead of a bolted-on
 * microsite. See docs/FORK-PATCHES.md #6.
 */

export interface DocSectionDef {
  id: string;
  /** Small uppercase label above the heading — the section's kind. */
  kicker?: string;
  title: string;
  body: ReactNode;
}

export interface DocGroup {
  label: string;
  sections: DocSectionDef[];
}

export function DocShell({
  eyebrow,
  title,
  standfirst,
  intro,
  groups,
}: {
  eyebrow: string;
  title: string;
  standfirst: string;
  intro?: ReactNode;
  groups: DocGroup[];
}) {
  const all = groups.flatMap((g) => g.sections);
  const [active, setActive] = useState<string>(all[0]?.id ?? '');

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: '-8% 0px -78% 0px', threshold: 0 },
    );
    for (const s of all) {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
    // The section list is static per page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, color: theme.text }}>
      <header
        style={{
          borderBottom: `1px solid ${theme.borderSubtle}`,
          background: theme.sidebar,
        }}
      >
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '18px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, color: theme.text, textDecoration: 'none' }}>
              <Logo size={24} />
              <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em' }}>{PLATFORM_NAME}</span>
            </Link>
            <nav style={{ display: 'flex', gap: 18, fontSize: 13.5 }}>
              <Link to="/help" style={{ color: theme.textMuted }}>Help center</Link>
              <Link to="/handbook" style={{ color: theme.textMuted }}>Operator handbook</Link>
              <Link to="/pricing" style={{ color: theme.textMuted }}>Pricing</Link>
              <Link to="/signin" style={{ color: theme.textMuted }}>Sign in</Link>
            </nav>
          </div>

          <div style={{ marginTop: 26, maxWidth: 720 }}>
            <div
              style={{
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: theme.accent,
                fontFamily: theme.fontMono,
                marginBottom: 10,
              }}
            >
              {eyebrow}
            </div>
            <h1 style={{ fontSize: 38, lineHeight: 1.08, margin: 0, letterSpacing: '-0.022em', fontWeight: 700 }}>
              {title}
            </h1>
            <p style={{ marginTop: 14, marginBottom: 0, fontSize: 16.5, color: theme.textMuted, lineHeight: 1.6 }}>
              {standfirst}
            </p>
          </div>
          {intro}
        </div>
      </header>

      <div
        style={{
          maxWidth: 1160,
          margin: '0 auto',
          padding: '0 24px 90px',
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr)',
          gap: 44,
        }}
        className="doc-grid"
      >
        <nav aria-label="Contents" className="doc-toc">
          {groups.map((g) => (
            <div key={g.label} style={{ marginBottom: 20 }}>
              <div
                style={{
                  fontFamily: theme.fontMono,
                  fontSize: 10.5,
                  letterSpacing: '0.13em',
                  textTransform: 'uppercase',
                  color: theme.textDim,
                  marginBottom: 8,
                }}
              >
                {g.label}
              </div>
              {g.sections.map((s) => {
                const on = active === s.id;
                return (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    style={{
                      display: 'block',
                      padding: '5px 0 5px 12px',
                      borderLeft: `2px solid ${on ? theme.accent : theme.borderSubtle}`,
                      color: on ? theme.accent : theme.textMuted,
                      fontWeight: on ? 600 : 400,
                      fontSize: 13.5,
                      lineHeight: 1.35,
                      textDecoration: 'none',
                    }}
                  >
                    {s.title}
                  </a>
                );
              })}
            </div>
          ))}
        </nav>

        <main style={{ minWidth: 0, paddingTop: 38 }}>
          {all.map((s) => (
            <section key={s.id} id={s.id} style={{ marginBottom: 52, scrollMarginTop: 20 }}>
              {s.kicker && (
                <div
                  style={{
                    fontFamily: theme.fontMono,
                    fontSize: 10.5,
                    letterSpacing: '0.13em',
                    textTransform: 'uppercase',
                    color: theme.accent,
                    marginBottom: 8,
                  }}
                >
                  {s.kicker}
                </div>
              )}
              <h2 style={{ fontSize: 25, margin: '0 0 12px', letterSpacing: '-0.015em', lineHeight: 1.2 }}>{s.title}</h2>
              <div style={{ fontSize: 15.5, lineHeight: 1.68, color: theme.text }}>{s.body}</div>
            </section>
          ))}
          <footer
            style={{
              borderTop: `1px solid ${theme.borderSubtle}`,
              paddingTop: 18,
              color: theme.textDim,
              fontSize: 13,
            }}
          >
            {PLATFORM_NAME}
          </footer>
        </main>
      </div>

      <style>{`
        .doc-toc { padding-top: 38px; }
        .doc-toc a:hover { color: ${theme.text}; }
        @media (min-width: 900px) {
          .doc-grid { grid-template-columns: 226px minmax(0,1fr) !important; align-items: start; }
          .doc-toc { position: sticky; top: 20px; }
        }
        @media (max-width: 899px) {
          .doc-toc { border-bottom: 1px solid ${theme.borderSubtle}; padding-bottom: 14px; }
          .doc-toc a { display: inline-block; border-left: none !important; padding: 4px 14px 4px 0 !important; }
        }
      `}</style>
    </div>
  );
}

/* ---------------- content primitives ---------------- */

export function P({ children }: { children: ReactNode }) {
  return <p style={{ margin: '0 0 13px', maxWidth: '68ch' }}>{children}</p>;
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 style={{ fontSize: 17, margin: '26px 0 8px', letterSpacing: '-0.008em' }}>{children}</h3>;
}

export function C({ children }: { children: ReactNode }) {
  return (
    <code
      style={{
        fontFamily: theme.fontMono,
        fontSize: '0.86em',
        background: theme.surface,
        border: `1px solid ${theme.borderSubtle}`,
        borderRadius: 4,
        padding: '1px 5px',
        wordBreak: 'break-word',
      }}
    >
      {children}
    </code>
  );
}

export function Steps({ items }: { items: ReactNode[] }) {
  return (
    <ol style={{ listStyle: 'none', margin: '14px 0 0', padding: 0, counterReset: 'dstep' }}>
      {items.map((it, i) => (
        <li
          key={i}
          style={{
            position: 'relative',
            padding: '0 0 16px 40px',
            maxWidth: '68ch',
          }}
        >
          <span
            style={{
              position: 'absolute',
              left: 0,
              top: 1,
              width: 25,
              height: 25,
              display: 'grid',
              placeItems: 'center',
              borderRadius: '50%',
              background: theme.accentSoft,
              color: theme.accent,
              fontFamily: theme.fontMono,
              fontSize: 11.5,
              fontWeight: 700,
            }}
          >
            {i + 1}
          </span>
          {it}
        </li>
      ))}
    </ol>
  );
}

export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul style={{ margin: '0 0 13px', paddingLeft: 20, maxWidth: '68ch' }}>
      {items.map((it, i) => (
        <li key={i} style={{ marginBottom: 6 }}>
          {it}
        </li>
      ))}
    </ul>
  );
}

export function Note({
  tone = 'info',
  tag,
  children,
}: {
  tone?: 'info' | 'warn' | 'stop' | 'go';
  tag: string;
  children: ReactNode;
}) {
  const palette = {
    info: { c: theme.info, bg: theme.infoSoft },
    warn: { c: theme.warn, bg: theme.warnSoft },
    stop: { c: theme.danger, bg: theme.dangerSoft },
    go: { c: theme.success, bg: theme.successSoft },
  }[tone];
  return (
    <div
      style={{
        background: palette.bg,
        border: `1px solid ${palette.c}44`,
        borderRadius: 10,
        padding: '13px 16px',
        margin: '16px 0',
        maxWidth: '68ch',
        fontSize: 14.5,
        lineHeight: 1.6,
      }}
    >
      <div
        style={{
          fontFamily: theme.fontMono,
          fontSize: 10.5,
          letterSpacing: '0.11em',
          textTransform: 'uppercase',
          color: palette.c,
          marginBottom: 5,
        }}
      >
        {tag}
      </div>
      {children}
    </div>
  );
}

export function DocTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div
      style={{
        overflowX: 'auto',
        border: `1px solid ${theme.border}`,
        borderRadius: 10,
        margin: '14px 0 18px',
        background: theme.surface,
      }}
    >
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 14.5 }}>
        <thead>
          <tr>
            {head.map((h) => (
              <th
                key={h}
                style={{
                  textAlign: 'left',
                  padding: '10px 14px',
                  fontFamily: theme.fontMono,
                  fontSize: 10.5,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: theme.textDim,
                  borderBottom: `1px solid ${theme.border}`,
                  whiteSpace: 'nowrap',
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((cell, j) => (
                <td
                  key={j}
                  style={{
                    padding: '10px 14px',
                    borderBottom: i === rows.length - 1 ? 'none' : `1px solid ${theme.borderSubtle}`,
                    verticalAlign: 'top',
                    color: theme.text,
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
