import { DocShell, P, H3, C, Steps, Bullets, Note, DocTable, type DocGroup } from './DocShell.js';

/**
 * Phoenixtekk fork: the end-user help center, hosted at /help.
 *
 * Audience is brand admins running a program and the partners promoting it —
 * NOT the platform operator, who has /handbook. Public and unauthenticated:
 * a partner deciding whether to join reads this before they have an account.
 * See docs/FORK-PATCHES.md #6.
 */

const GROUPS: DocGroup[] = [
  {
    label: 'Getting started',
    sections: [
      {
        id: 'what',
        kicker: 'Overview',
        title: 'What this does',
        body: (
          <>
            <P>
              You give people a link. They share it. When someone clicks it and later pays you, we tie
              that payment back to whoever sent them, work out what they're owed, and pay them.
            </P>
            <P>
              That's an affiliate program — sometimes called a referral or partner program. The people
              promoting you are <strong>partners</strong>. What they earn is a <strong>commission</strong>.
            </P>
            <DocTable
              head={['You want to', 'Read']}
              rows={[
                ['Set up a program and start recruiting', 'Launch checklist, below'],
                ['Understand how commission is calculated', 'How you get paid'],
                ['Promote a program as a partner', 'For partners'],
                ['Work out why something is not tracking', 'Troubleshooting'],
              ]}
            />
          </>
        ),
      },
      {
        id: 'checklist',
        kicker: 'For brands',
        title: 'Launch checklist',
        body: (
          <>
            <P>Work through these in order. It takes under an hour if your payment setup is already in place.</P>
            <Steps
              items={[
                <><strong>Set your brand details.</strong> Program name, support email and logo under Settings. Partners see all three, and their replies go to that support address.</>,
                <><strong>Create a program.</strong> One set of commission terms plus the page links should land on — usually your pricing page.</>,
                <><strong>Choose your commission terms.</strong> See “How you get paid” below.</>,
                <><strong>Set a holdback.</strong> Match your refund window. This stops you paying commission on a sale that later refunds.</>,
                <><strong>Decide how partners join</strong> — anyone instantly, or by application.</>,
                <><strong>Upload assets</strong> partners can use: logos, banners, approved wording.</>,
                <><strong>Connect payment tracking</strong> so sales are recorded automatically.</>,
                <><strong>Test it end to end</strong> before inviting anyone.</>,
              ]}
            />
            <Note tag="Do not skip the test" tone="warn">
              A broken tracking link discovered by your first affiliate costs you that affiliate — and
              they tell others. Run a real test purchase first.
            </Note>
          </>
        ),
      },
    ],
  },
  {
    label: 'Running a program',
    sections: [
      {
        id: 'commission',
        kicker: 'For brands',
        title: 'How you get paid, and how they do',
        body: (
          <>
            <P>Commission terms are built from simple rules, and you can layer them.</P>
            <DocTable
              head={['You want', 'Set up']}
              rows={[
                ['A fixed amount per sale', 'A one-off payment on the first purchase'],
                ['A share of every sale', 'A percentage, applied each time'],
                ['A share of every renewal, forever', 'A recurring percentage'],
                ['A share of renewals, but only for a year', 'A recurring percentage, capped at 12 months'],
                ['More for the first payment, less after', 'Two rules — a higher rate first, lower on later payments'],
              ]}
            />
            <Note tag="Recurring is the big decision" tone="info">
              For a subscription product, paying on renewals rather than only the first invoice is
              usually what makes a program worth joining. It also multiplies what you owe. Decide
              deliberately, and say clearly which one you're offering — partners will ask.
            </Note>
            <H3>Attribution: who gets credit</H3>
            <P>
              If a customer clicked two partners' links before buying, someone has to get the credit.
              The default gives it to the <strong>most recent</strong> click. You can also credit the
              first, or split it. You can change this later and the numbers recalculate — you are not
              stuck with your first choice.
            </P>
            <H3>The attribution window</H3>
            <P>
              How long a click stays valid, often 60 days. Click today and buy in three months, and with
              a 60-day window nobody gets credit.
            </P>
          </>
        ),
      },
      {
        id: 'paying',
        kicker: 'For brands',
        title: 'Paying your partners',
        body: (
          <>
            <P>
              Commissions appear in your review queue as they're earned. You approve them, then run a
              payout. Money goes directly to the partner's own Stripe account.
            </P>
            <Bullets
              items={[
                <><strong>Minimum threshold</strong> — don't send $2 transfers. Balances roll over until they clear it.</>,
                <><strong>Holdback</strong> — commissions can't be approved until they've aged past your refund window.</>,
                <><strong>Refunds</strong> — if a sale refunds, a reversing entry is recorded. The original record is never quietly edited, so your history stays auditable.</>,
              ]}
            />
            <Note tag="Partners must connect Stripe first" tone="warn">
              A partner who hasn't connected their Stripe account cannot be paid. Their commissions keep
              accruing safely, but the payout won't go through. Say this in your invite.
            </Note>
          </>
        ),
      },
      {
        id: 'codes',
        kicker: 'For brands',
        title: 'Discount codes, not just links',
        body: (
          <>
            <P>
              Give each partner their own discount code as well as a link. Sales attribute by code, which
              works where a link can't survive — a podcast read, a printed card, a conference talk.
            </P>
            <P>
              You can also make the code reward the <strong>customer</strong> — a percentage off, an
              amount off, or free months — so the partner's audience has a reason to use it. That
              usually lifts conversion more than raising the commission does.
            </P>
          </>
        ),
      },
    ],
  },
  {
    label: 'For partners',
    sections: [
      {
        id: 'partners',
        kicker: 'For partners',
        title: 'Promoting a program',
        body: (
          <>
            <P>If you've been invited to promote a product, here's how it works.</P>
            <Steps
              items={[
                <><strong>Accept your invite</strong> and sign in. No password — you get an email link each time.</>,
                <><strong>Connect Stripe.</strong> You're paid directly into your own account. Do this before you start promoting, or your earnings will sit unpaid.</>,
                <><strong>Copy your link</strong> from your dashboard. It's unique to you.</>,
                <><strong>Share it.</strong> Anyone who clicks it and buys within the attribution window earns you commission.</>,
                <><strong>Watch your dashboard</strong> for clicks, conversions and earnings.</>,
              ]}
            />
            <H3>What the statuses mean</H3>
            <DocTable
              head={['Status', 'Meaning']}
              rows={[
                ['Pending', 'Earned, but still within the holdback period or awaiting review'],
                ['Approved', 'Cleared and queued for the next payout run'],
                ['Paid', 'Sent to your Stripe account'],
                ['Reversed', 'The underlying sale refunded, so the commission was reversed'],
              ]}
            />
            <Note tag="Don't rewrite your link" tone="warn">
              The tracking code on your link is what identifies you. Shorteners are usually fine, but if
              you edit the link or strip its query string, the sale won't be credited to you.
            </Note>
          </>
        ),
      },
    ],
  },
  {
    label: 'Help',
    sections: [
      {
        id: 'trouble',
        kicker: 'Help',
        title: 'Troubleshooting',
        body: (
          <DocTable
            head={['Problem', 'What to check']}
            rows={[
              ['Sign-in email never arrives', 'Check spam. Links expire after 15 minutes, so request a fresh one. The page always says “check your inbox”, even for an unknown address'],
              [<C key="a">invalid_or_expired_token</C>, 'The link timed out. Request another and use it straight away'],
              ['Clicks show, but no sales', 'Payment tracking probably is not connected. A brand admin should check the tracking setup'],
              ['A sale is missing', 'It may be outside the attribution window, or the customer clicked a different partner more recently'],
              ['Commission stuck on Pending', 'Holdback has not elapsed, or it is waiting on review'],
              ['Approved but not paid', 'The partner has not connected Stripe, or the balance is under the minimum threshold'],
              ['A commission was reversed', 'The sale refunded. This is expected and the record is kept'],
            ]}
          />
        ),
      },
      {
        id: 'contact',
        kicker: 'Help',
        title: 'Still stuck',
        body: (
          <>
            <P>
              <strong>Partners:</strong> contact the brand you're promoting — their support address is on
              their program page. They can see your clicks and commissions; we can't answer for them.
            </P>
            <P>
              <strong>Brand admins:</strong> if something looks wrong with tracking or payouts, gather the
              partner, the date, and the order or invoice reference before reporting it. Almost every
              tracking question resolves from those three.
            </P>
          </>
        ),
      },
    ],
  },
];

export function HelpCenterPage() {
  return (
    <DocShell
      eyebrow="Help center"
      title="Running an affiliate program"
      standfirst="How to set up a program, decide commission terms, pay partners — and, if you're a partner, how to promote and get paid."
      groups={GROUPS}
    />
  );
}
