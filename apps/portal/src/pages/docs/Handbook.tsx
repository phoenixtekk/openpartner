import { theme } from '../../theme.js';
import { DocShell, P, H3, C, Steps, Bullets, Note, DocTable, type DocGroup } from './DocShell.js';

/**
 * Phoenixtekk fork: the operator handbook, hosted at /handbook.
 * Audience is whoever runs the platform — adding brands, setting terms,
 * paying partners. See docs/FORK-PATCHES.md #6.
 */

function Chain() {
  const nodes = ['click', 'identity', 'event', 'attribution', 'commission', 'payout'];
  return (
    <div
      style={{
        marginTop: 24,
        padding: '16px 18px',
        background: theme.surface,
        border: `1px solid ${theme.borderSubtle}`,
        borderRadius: 12,
        overflowX: 'auto',
      }}
    >
      <div
        style={{
          fontFamily: theme.fontMono,
          fontSize: 10.5,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: theme.textDim,
          marginBottom: 12,
        }}
      >
        How a payout gets made
      </div>
      <div style={{ display: 'flex', alignItems: 'center', minWidth: 600 }}>
        {nodes.map((n, i) => (
          <span key={n} style={{ display: 'contents' }}>
            <span
              style={{
                fontFamily: theme.fontMono,
                fontSize: 11.5,
                padding: '6px 11px',
                borderRadius: 999,
                whiteSpace: 'nowrap',
                border: `1px solid ${i === nodes.length - 1 ? theme.accent : theme.border}`,
                background: i === nodes.length - 1 ? theme.accent : theme.bg,
                color: i === nodes.length - 1 ? theme.accentInk : theme.textMuted,
                fontWeight: i === nodes.length - 1 ? 700 : 400,
              }}
            >
              {n}
            </span>
            {i < nodes.length - 1 && (
              <span style={{ flex: 1, height: 1, background: theme.border, minWidth: 12 }} />
            )}
          </span>
        ))}
      </div>
      <p style={{ margin: '12px 0 0', fontSize: 14, color: theme.textDim, maxWidth: '70ch' }}>
        Clicks, identities and events are immutable. Attribution is a view derived from them, so you
        can change how credit is assigned and the platform recalculates from the original facts.
      </p>
    </div>
  );
}

const GROUPS: DocGroup[] = [
  {
    label: 'Start',
    sections: [
      {
        id: 'doors',
        kicker: 'Orientation',
        title: 'You wear two hats',
        body: (
          <>
            <P>Same email, different doors. Most early confusion is being at the wrong one.</P>
            <DocTable
              head={['Role', 'Where', 'What it gives you']}
              rows={[
                [<strong key="a">Platform operator</strong>, <C key="b">/platform/login</C>, 'Approve or reject brands, mark your own brands free, blocklist, audit log.'],
                [<strong key="c">Brand admin</strong>, <C key="d">/signin</C>, 'Run one program — partners, commission terms, payouts, branding.'],
              ]}
            />
            <Note tag="Why sign-in can silently do nothing" tone="info">
              A sign-in page emails you only if an admin exists for that address <em>on that brand</em>.
              Otherwise it still says “check your inbox”, deliberately, so nobody can probe for valid
              accounts. Links last <strong>15 minutes</strong>.
            </Note>
          </>
        ),
      },
    ],
  },
  {
    label: 'Guides',
    sections: [
      {
        id: 'add-brand',
        kicker: 'Guide 1',
        title: 'Add one of your own brands',
        body: (
          <>
            <P>For every Phoenixtekk product. About two minutes.</P>
            <Steps
              items={[
                <><strong>Open the brand switcher</strong> — your name, top-left — and choose <em>Create a new brand</em>.</>,
                <><strong>Name it, keep the slug short.</strong> It appears in partner links (<C>/t/velvetsong/login</C>). Renaming later is only safe before partners share links.</>,
                <><strong>Click one of the two plan cards.</strong> The button stays disabled until you do, and the cards have no radio button. Either is fine — you overwrite it in step 5.</>,
                <><strong>Create the brand.</strong> You land on a Billing page. Ignore it.</>,
                <><strong>Ops console → Brands → Mark as owned.</strong> Sets it free, approves it, stops the billing prompts.</>,
              ]}
            />
            <Note tag="Do not enter card details" tone="stop">
              Step 4 lands on checkout because the create form is built for paying customers. Your own
              brands never need it — “Mark as owned” removes the billing relationship entirely.
            </Note>
            <Note tag="Owned is not white-label" tone="info">
              <strong>Owned</strong> means we don't bill this brand. <strong>White-label</strong> means
              hide Phoenixtekk from that brand's partners — built for customers who don't want their
              affiliates knowing the platform exists. Turning it on for your own brand strips
              Phoenixtekk from your emails and hides the brand-management links from your own switcher.
            </Note>
          </>
        ),
      },
      {
        id: 'configure',
        kicker: 'Guide 2',
        title: 'Configure a brand for launch',
        body: (
          <>
            <H3>Brand info</H3>
            <P>
              Set the program name, support email and logo under <strong>Settings</strong>. Partner
              replies go to the support email; without one they fall through to your oldest admin.
            </P>
            <H3>Create your first program</H3>
            <P>A program is one set of commission terms plus one destination.</P>
            <DocTable
              head={['Setting', 'What to put']}
              rows={[
                ['Destination URL', 'Where links land — usually your pricing page'],
                ['Attribution model', <><C>last_click</C> unless you have a specific reason</>],
                ['Attribution window', '60 days is a common default'],
                ['Holdback days', <><strong>Match your refund window.</strong> 30 if you offer 30-day refunds</>],
                ['Deep-link domains', 'Blank unless partners should link to specific product pages'],
                ['Start / end date', 'Blank to run indefinitely'],
              ]}
            />
            <Note tag="Set holdback before launch" tone="warn">
              Holdback stops a commission being approved until it has aged. Without it you pay
              commission on sales that later refund, and clawing that back from an affiliate is a
              conversation nobody enjoys.
            </Note>
            <H3>Decide how partners join</H3>
            <Bullets
              items={[
                <><strong>Auto-approve</strong> — anyone joins instantly. Good where volume beats vetting.</>,
                <><strong>Manual review</strong> — applications queue. Right wherever an affiliate's wild claim becomes your liability: health, finance, anything regulated.</>,
              ]}
            />
            <H3>Upload partner assets</H3>
            <P>
              Logos, banners, approved screenshots and copy. Partners with good assets promote more and
              misrepresent you less.
            </P>
            <H3>Set payout rules</H3>
            <P>A minimum payout threshold, so you aren't sending $2 transfers, and a cadence — weekly is typical.</P>
          </>
        ),
      },
      {
        id: 'partners',
        kicker: 'Guide 3',
        title: 'Invite your first partners',
        body: (
          <>
            <P>
              Invite by email under <strong>Admin → Partners</strong>, bulk-load a CSV under{' '}
              <strong>Export / import</strong>, or open self-signup and let people apply.
            </P>
            <Note tag="Tell them about Stripe up front" tone="warn">
              A partner cannot be paid until they connect Stripe. Commissions still accrue, so nothing
              is lost — but the payout fails preflight, and a partner discovering that at payout time
              reads as the platform being broken.
            </Note>
          </>
        ),
      },
      {
        id: 'tracking',
        kicker: 'Guide 4',
        title: 'Connect conversion tracking',
        body: (
          <>
            <P>The step that makes money actually track. On Stripe there is almost no code.</P>
            <Steps
              items={[
                <><strong>Add a webhook</strong> in the product's Stripe account pointing at <C>https://affiliates.phoenixtekk.com/api/webhooks/stripe</C></>,
                <><strong>Enable</strong> <C>checkout.session.completed</C>, <C>customer.created</C>, <C>customer.subscription.created</C>, <C>invoice.paid</C>, <C>invoice.payment_failed</C>, <C>charge.refunded</C>, <C>charge.dispute.created</C></>,
                <><strong>Append the signing secret</strong> to <C>STRIPE_WEBHOOK_SECRET_PLATFORM</C> — a comma-separated list, so every product adds its own.</>,
                <><strong>Pass the cref</strong> as Stripe's <C>client_reference_id</C> at checkout.</>,
                <><strong>Capture <C>?cref=</C></strong> on the marketing site so it survives to checkout.</>,
              ]}
            />
            <Note tag="Check this first" tone="warn">
              If the product already uses <C>client_reference_id</C> for something of its own — many do
              — move that value into <C>metadata</C> before repurposing the field, and update every
              place that reads it.
            </Note>
          </>
        ),
      },
      {
        id: 'test',
        kicker: 'Guide 5',
        title: 'Test before you launch',
        body: (
          <>
            <P>On every new brand, in Stripe test mode. Steps 5 to 7 are what tell you the platform can be trusted with money.</P>
            <Steps
              items={[
                <><strong>Click</strong> a partner link — you land on the destination with <C>?cref=</C> in the URL.</>,
                <><strong>Convert</strong> — sign up and pay with a test card.</>,
                <><strong>Check attribution</strong> — the sale appears against the right partner.</>,
                <><strong>Check the commission</strong> — right amount, right rule.</>,
                <><strong>Renew</strong> — advance one cycle. If the rule is recurring, a <em>second</em> commission must appear. Most-skipped step, most likely to be wrong.</>,
                <><strong>Pay out</strong> — approve and run. Exactly <em>one</em> Stripe transfer.</>,
                <><strong>Refund</strong> — a compensating adjustment appears; the original commission is not rewritten.</>,
              ]}
            />
          </>
        ),
      },
      {
        id: 'payouts',
        kicker: 'Guide 6',
        title: 'Running payouts',
        body: (
          <>
            <P>
              Commissions land in the review queue as they accrue. Approve what's legitimate, then run
              payouts — approved commissions batch per partner and currency and transfer via Stripe Connect.
            </P>
            <Note tag="Never hand-create a transfer" tone="stop">
              A payout that looks stuck usually isn't broken: the executor retries every 15 minutes and
              reconciles against Stripe. Creating a transfer by hand to “fix” it is the one action the
              whole intent system exists to prevent — it is how you pay someone twice. Use the recovery API.
            </Note>
            <Note tag="Keep the platform balance funded" tone="warn">
              Your own brands pay affiliates from the platform Stripe balance, so top it up from each
              product's revenue. If it runs dry, transfers fail cleanly and commissions return to the
              pool — nothing is lost, but payouts stall until you notice.
            </Note>
          </>
        ),
      },
      {
        id: 'customers',
        kicker: 'Guide 7',
        title: 'Onboarding a paying customer',
        body: (
          <>
            <Steps
              items={[
                <>They sign up at <C>/signup</C> and pick a plan.</>,
                <>Their brand appears in <strong>ops console → Brands → Pending</strong>.</>,
                <>Review and approve. They can configure while pending but cannot go live.</>,
                <>They configure their brand exactly as in Guide 2.</>,
              ]}
            />
            <Note tag="Never mark a customer's brand as owned" tone="stop">
              That makes them free <em>and</em> puts them on the unfunded payout rail — you would be
              paying their affiliates out of your own Stripe balance, with nothing collected from them.
            </Note>
          </>
        ),
      },
    ],
  },
  {
    label: 'Reference',
    sections: [
      {
        id: 'attribution',
        kicker: 'Reference',
        title: 'Attribution',
        body: (
          <>
            <P>
              A partner link is <C>https://click.phoenixtekk.com/r/&lt;linkKey&gt;</C>. It 302-redirects
              to your destination with <C>?cref=</C> appended and a first-party cookie set.
            </P>
            <DocTable
              head={['Model', 'Credit goes to']}
              rows={[
                [<C key="a">last_click</C>, 'the most recent partner before the sale — the usual default'],
                [<C key="b">first_click</C>, 'the partner who introduced the customer'],
                [<C key="c">linear</C>, 'split evenly across everyone who touched the journey'],
                [<C key="d">position</C>, 'weighted toward first and last touch'],
              ]}
            />
            <P>
              Anonymous clicks bind to a real user at signup, including across devices once they log in.
              Abuse controls: click-velocity limiting, a fraud-review queue, and a partner blocklist.
            </P>
          </>
        ),
      },
      {
        id: 'commissions',
        kicker: 'Reference',
        title: 'Commission rules',
        body: (
          <>
            <P>
              Rules are a list, so one program can express layered terms. Each has a trigger
              (<C>every</C> / <C>first</C> / <C>subsequent</C>), an optional event filter, a percent or
              fixed value, and optional recurrence with a month cap.
            </P>
            <DocTable
              head={['You want', 'Set']}
              rows={[
                ['One-off cash per sale', <>trigger <C>first</C>, fixed, 50</>],
                ['A cut of every sale', <>trigger <C>every</C>, percent, 20</>],
                ['A cut of every renewal, forever', <>as above plus <C>recurring: true</C></>],
                ['Recurring but capped at a year', <>add <C>recurringMonths: 12</C></>],
                ['Big first payment, smaller after', <>two rules — <C>first</C> 50%, <C>subsequent</C> 20%</>],
              ]}
            />
            <P>
              Individual partners can be given terms different from the program default. Programs can
              also reward the <em>customer</em> — percent off, amount off, or free months — so a
              partner's audience has a reason to use their code.
            </P>
          </>
        ),
      },
      {
        id: 'isolation',
        kicker: 'Reference',
        title: 'Multi-brand isolation',
        body: (
          <>
            <P>One login, many brands, each isolated with its own partners, terms, branding and payouts.</P>
            <P>
              Isolation is enforced at the <strong>database</strong>, not just in application code:
              Postgres force row-level security, every request running as a non-superuser role scoped to
              one tenant. Verified by test — scoped to one brand returns only that brand's rows, and an
              unscoped request returns <strong>zero</strong>.
            </P>
            <DocTable
              head={['Brand type', 'Plan', 'How affiliates get paid']}
              rows={[
                ['Yours', <C key="a">selfhost</C>, 'directly from your Stripe balance, no billing'],
                ["Customers'", <><C>flex</C> / <C>revshare</C></>, 'funded — money collected from the brand first'],
              ]}
            />
          </>
        ),
      },
      {
        id: 'trouble',
        kicker: 'Reference',
        title: 'Troubleshooting',
        body: (
          <DocTable
            head={['Symptom', 'Cause']}
            rows={[
              ['Sign-in link never arrives', 'No admin for that email on that brand, or wrong door. The page says “check your inbox” either way'],
              [<C key="a">invalid_or_expired_token</C>, 'Links last 15 minutes. Request another'],
              ["A brand's URLs return 404", 'It is rejected or suspended — a rejected brand goes fully dark. Ops console → Brands → Rejected → Reinstate'],
              ['“Create a new brand” link missing', "White-label is on for that brand and it isn't marked owned"],
              ['Brand list looks empty', 'The Brands page opens on the Pending filter. Switch tabs'],
              [<C key="b">network_not_configured</C>, "Expected — that's a federated service we don't run"],
              ["Clicks aren't attributing", <>Check <C>?cref=</C> survives to checkout and <C>client_reference_id</C> is passed</>],
              ['Commissions accrue but never pay', "Partner hasn't connected Stripe, below threshold, holdback not elapsed, or it's a customer brand"],
            ]}
          />
        ),
      },
    ],
  },
];

export function HandbookPage() {
  return (
    <DocShell
      eyebrow="Operator documentation"
      title="Affiliate Operator Handbook"
      standfirst="How to add a brand, set commission terms, wire up tracking, and pay partners — plus a straight account of what is still unproven."
      intro={<Chain />}
      groups={GROUPS}
    />
  );
}
