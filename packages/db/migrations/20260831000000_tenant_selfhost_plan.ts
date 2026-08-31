import type { Knex } from 'knex';

/**
 * Phoenixtekk fork — widen Tenant.billingPlan to allow 'selfhost'.
 *
 * Upstream resolves a tenant's payout rail with planToMode(): 'flex' and
 * 'enterprise' -> flat, 'revshare' -> revshare, and NULL falls through to the
 * process-wide OPENPARTNER_MODE env. That meant the only way to get
 * mode='selfhost' for a tenant was to put the ENTIRE installation into
 * selfhost mode — which also disabled four scheduler jobs, including
 * usage-report, the sole path by which attributed GMV reaches Stripe meters.
 * On a hosted deployment that silently means customers are never billed.
 *
 * Phoenixtekk needs both rails at once on one hub:
 *   - own products (VelvetSong et al.) -> 'selfhost': partners are paid by
 *     direct stripe.transfers.create from the platform balance, because it is
 *     our own money on both sides of the transaction;
 *   - customer brands -> 'flex' / 'revshare': the funded rail, because
 *     fronting a third party's commission principal is an unacceptable
 *     credit exposure.
 *
 * 'selfhost' is deliberately NOT accepted by the public POST /signup schema
 * (which allows only 'flex' | 'revshare'), so a brand cannot self-declare
 * onto the unfunded rail. It is assigned by an operator only.
 *
 * See docs/FORK-PATCHES.md #1.
 */

const BILLING_PLANS = ['flex', 'revshare', 'enterprise', 'selfhost'] as const;
const PREVIOUS_PLANS = ['flex', 'revshare', 'enterprise'] as const;

export async function up(knex: Knex): Promise<void> {
  const allowed = BILLING_PLANS.map((p) => `'${p}'`).join(', ');
  await knex.raw(`alter table "Tenant" drop constraint if exists "Tenant_billingPlan_check"`);
  await knex.raw(
    `alter table "Tenant" add constraint "Tenant_billingPlan_check" check ("billingPlan" is null or "billingPlan" in (${allowed}))`,
  );
}

export async function down(knex: Knex): Promise<void> {
  // Any tenant already on the new plan must be parked before the narrower
  // constraint can be re-applied. NULL is the correct landing spot: it
  // reproduces the pre-fork behaviour of falling through to OPENPARTNER_MODE.
  await knex.raw(`update "Tenant" set "billingPlan" = null where "billingPlan" = 'selfhost'`);
  const allowed = PREVIOUS_PLANS.map((p) => `'${p}'`).join(', ');
  await knex.raw(`alter table "Tenant" drop constraint if exists "Tenant_billingPlan_check"`);
  await knex.raw(
    `alter table "Tenant" add constraint "Tenant_billingPlan_check" check ("billingPlan" is null or "billingPlan" in (${allowed}))`,
  );
}
