/**
 * Phoenixtekk fork: the operator's platform name, in ONE place.
 *
 * Upstream hardcodes the string "OpenPartner" across the portal — the brand
 * fallback, the logo alt text, the review banner, settings hints, and (most
 * consequentially) the ACH debit authorisation on the billing page. A
 * self-hosted operator running this as their own product needs all of it to
 * carry their name, and needs it to be one edit rather than twenty.
 *
 * See docs/FORK-PATCHES.md #4.
 */
export const PLATFORM_NAME = 'Phoenixtekk Affiliates';

/** The legal entity that appears in money-movement copy — bank debit
 *  authorisations, payout descriptors, terms references. Kept separate from
 *  the product name on purpose: the entity a customer authorises to debit
 *  their account is a legal fact, not branding. */
export const PLATFORM_LEGAL_ENTITY = 'Phoenixtekk';

/**
 * Where the bank-debit authorisation on the billing page points.
 *
 * ⚠️ THIS DOCUMENT MUST EXIST AND BE REVIEWED BY COUNSEL BEFORE
 * HOSTED_FUNDING_ENABLED IS EVER SET. It is the agreement a customer accepts
 * when authorising Phoenixtekk to debit their bank account. Upstream pointed
 * this at https://openpartner.dev/terms — a third party's document that does
 * not govern this relationship. See docs/FUNDING-ENABLEMENT.md, Gate A.
 */
export const PLATFORM_FUNDING_TERMS_URL = 'https://affiliates.phoenixtekk.com/funding-terms';
