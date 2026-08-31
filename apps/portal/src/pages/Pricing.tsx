import { Link } from 'react-router-dom';
import { theme } from '../theme.js';
import { Logo } from './auth/Shared.js';

/**
 * Phoenixtekk fork: public pricing page for the hosted platform.
 *
 * Upstream's landing links "Pricing" out to openpartner.dev, which is
 * OpenPartner-the-company's own marketing site and prices THEIR hosted
 * service. A self-hosted operator selling to their own customers has no
 * pricing surface at all. This is it.
 *
 * The numbers here are the contract with what is actually provisioned in
 * Stripe (apps/api/scripts/setup-stripe.mjs) and metered in
 * usage-billing.ts — attributed GMV is reported in DOLLARS, so the Flex
 * metered price is 1.5 cents per unit (1.5%) and Revshare is 3 cents (3%).
 * If either number changes here, it must change in Stripe too.
 *
 * See docs/FORK-PATCHES.md #4.
 */

interface Plan {
  key: 'revshare' | 'flex' | 'enterprise';
  name: string;
  price: string;
  priceNote: string;
  pitch: string;
  best: string;
  features: string[];
  cta: string;
  to: string;
  featured?: boolean;
}

const PLANS: Plan[] = [
  {
    key: 'revshare',
    name: 'Revshare',
    price: '3%',
    priceNote: 'of attributed revenue · no monthly fee',
    pitch: 'You only pay when the program actually earns you something.',
    best: 'Best if you are starting out, or your volume is uneven',
    features: [
      'No monthly cost — ever',
      'Unlimited partners and programs',
      'Full attribution chain and reporting',
      'Direct Stripe Connect payouts to partners',
      'Recurring commissions on subscriptions',
      '14-day free trial',
    ],
    cta: 'Start free',
    to: '/signup?plan=revshare',
    featured: true,
  },
  {
    key: 'flex',
    name: 'Flex',
    price: '$49',
    priceNote: 'per month + 1.5% of attributed revenue',
    pitch: 'A lower rate once your program is doing real volume.',
    best: 'Cheaper than Revshare above roughly $3,300/mo in attributed revenue',
    features: [
      'Everything in Revshare',
      'Half the revenue share (1.5% vs 3%)',
      'Predictable base cost',
      'Priority support',
      '14-day free trial',
    ],
    cta: 'Start free',
    to: '/signup?plan=flex',
  },
  {
    key: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    priceNote: 'billed by agreement',
    pitch: 'For high volume, custom terms, or a white-labelled portal.',
    best: 'Best if you need your own domain, or contractual terms',
    features: [
      'Everything in Flex',
      'White-label partner portal on your own domain',
      'Negotiated rate',
      'Direct support channel',
    ],
    cta: 'Talk to us',
    to: '/signup?plan=enterprise',
  },
];

/** The exact revenue where Flex and Revshare cost the same:
 *  4900 + 0.015x = 0.03x  →  x = 4900 / 0.015 = $3,266.67 */
const BREAK_EVEN = '$3,267';

export function PricingPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: theme.bg,
        color: theme.text,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <header
        style={{
          padding: '20px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${theme.borderSubtle}`,
        }}
      >
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, color: theme.text }}>
          <Logo />
          <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em' }}>
            Phoenixtekk Affiliates
          </div>
        </Link>
        <div style={{ display: 'flex', gap: 18, alignItems: 'center', fontSize: 13 }}>
          <Link to="/" style={{ color: theme.textMuted }}>
            Home
          </Link>
          <Link to="/help" style={{ color: theme.textMuted }}>
            Help
          </Link>
          <Link to="/signin" style={{ color: theme.textMuted }}>
            Sign in
          </Link>
        </div>
      </header>

      <main style={{ flex: 1, padding: '64px 24px 40px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <div
            style={{
              fontSize: 12,
              color: theme.accent,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: 16,
            }}
          >
            Pricing
          </div>
          <h1 style={{ fontSize: 44, lineHeight: 1.1, margin: 0, letterSpacing: '-0.02em', fontWeight: 700 }}>
            You pay when your partners perform.
          </h1>
          <p
            style={{
              marginTop: 22,
              fontSize: 17,
              color: theme.textMuted,
              lineHeight: 1.55,
              maxWidth: 640,
              marginInline: 'auto',
            }}
          >
            Every plan includes unlimited partners, unlimited programs, the full attribution chain,
            and direct Stripe payouts. The only difference is how you pay for it.
          </p>
        </div>

        <div
          style={{
            maxWidth: 1120,
            margin: '52px auto 0',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 20,
            alignItems: 'start',
          }}
        >
          {PLANS.map((p) => (
            <PlanCard key={p.key} plan={p} />
          ))}
        </div>

        <div
          style={{
            maxWidth: 760,
            margin: '56px auto 0',
            background: theme.surface,
            border: `1px solid ${theme.borderSubtle}`,
            borderRadius: 16,
            padding: 24,
          }}
        >
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Which one should I pick?</div>
          <p style={{ color: theme.textMuted, fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            Start on <strong style={{ color: theme.text }}>Revshare</strong>. It costs nothing until
            your program earns, so there is no risk in trying it. Once you are consistently above{' '}
            <strong style={{ color: theme.text }}>{BREAK_EVEN}/month</strong> in attributed revenue,
            Flex becomes the cheaper plan and you can switch. We will not switch you automatically —
            you would be paying us more.
          </p>
        </div>

        <div style={{ maxWidth: 760, margin: '28px auto 0' }}>
          <Faq
            q="What counts as attributed revenue?"
            a="Revenue from a conversion we tracked back to one of your partners. If a sale was not driven by a partner, it is not attributed and you are not charged on it."
          />
          <Faq
            q="How do partners get paid?"
            a="Directly, through Stripe Connect. Partners onboard with their own Stripe account and the money moves to them. We do not take a cut of partner earnings."
          />
          <Faq
            q="Is there a limit on partners or programs?"
            a="No. Every plan is unlimited on both. We charge on revenue the platform helps you earn, not on seats."
          />
          <Faq
            q="Can I cancel?"
            a="Yes, any time, from your billing settings. Your data stays exportable."
          />
        </div>

        <div style={{ marginTop: 44, textAlign: 'center', color: theme.textDim, fontSize: 13 }}>
          Already have an account?{' '}
          <Link to="/signin" style={{ color: theme.accent }}>
            Sign in
          </Link>
        </div>
      </main>

      <footer
        style={{
          padding: '20px 32px',
          borderTop: `1px solid ${theme.borderSubtle}`,
          color: theme.textDim,
          fontSize: 12,
          textAlign: 'center',
        }}
      >
        Phoenixtekk Affiliates
      </footer>
    </div>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const border = plan.featured ? theme.accent : theme.borderSubtle;
  return (
    <div
      style={{
        background: theme.surface,
        border: `1px solid ${border}`,
        borderRadius: 18,
        padding: 28,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {plan.featured && (
        <div
          style={{
            position: 'absolute',
            top: -11,
            left: 28,
            background: theme.accent,
            color: theme.accentInk,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            padding: '3px 10px',
            borderRadius: 999,
          }}
        >
          Start here
        </div>
      )}

      <div style={{ fontSize: 13, fontWeight: 600, color: theme.textMuted, letterSpacing: '0.02em' }}>
        {plan.name}
      </div>

      <div style={{ marginTop: 12, display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-0.02em' }}>{plan.price}</span>
      </div>
      <div style={{ fontSize: 13, color: theme.textMuted, marginTop: 4, lineHeight: 1.45 }}>
        {plan.priceNote}
      </div>

      <p style={{ fontSize: 14, color: theme.text, lineHeight: 1.55, marginTop: 18, marginBottom: 6 }}>
        {plan.pitch}
      </p>
      <div style={{ fontSize: 12.5, color: theme.textDim, lineHeight: 1.5, marginBottom: 20 }}>
        {plan.best}
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', flex: 1 }}>
        {plan.features.map((f) => (
          <li
            key={f}
            style={{
              color: theme.textMuted,
              fontSize: 13.5,
              padding: '6px 0 6px 20px',
              position: 'relative',
              lineHeight: 1.5,
            }}
          >
            <span style={{ position: 'absolute', left: 0, color: theme.accent, fontWeight: 700 }}>›</span>
            {f}
          </li>
        ))}
      </ul>

      <Link
        to={plan.to}
        style={{
          display: 'block',
          textAlign: 'center',
          padding: '11px 16px',
          borderRadius: theme.radiusMd,
          fontSize: 14,
          fontWeight: 600,
          background: plan.featured ? theme.accent : 'transparent',
          color: plan.featured ? theme.accentInk : theme.accent,
          border: `1px solid ${plan.featured ? theme.accent : theme.border}`,
        }}
      >
        {plan.cta}
      </Link>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div style={{ padding: '16px 0', borderBottom: `1px solid ${theme.borderSubtle}` }}>
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{q}</div>
      <div style={{ fontSize: 13.5, color: theme.textMuted, lineHeight: 1.6 }}>{a}</div>
    </div>
  );
}
