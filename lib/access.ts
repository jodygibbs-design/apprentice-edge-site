import crypto from "crypto";
import type { cookies } from "next/headers";

type CookieStore = Awaited<ReturnType<typeof cookies>>;

// The Season Pass entitlement cookie.
//
// Stripe is checked once, when the cookie is issued (grant-access, restore-access).
// Every gate after that trusts the cookie alone, so the value has to be something only
// this server can produce. It used to be the literal string "paid", which anyone could
// set by hand in their browser's dev tools and unlock the whole paid product.
//
// Value format: v1.<exp>.<sig>
//   exp = unix seconds when access lapses
//   sig = HMAC-SHA256 over "ae_access.v1.<exp>", base64url
//
// Old "paid" cookies are deliberately NOT accepted. A real buyer holding one gets the
// paywall once and re-unlocks through /restore-access, which checks Stripe again.
export const ACCESS_COOKIE = "ae_access";

const ONE_YEAR = 60 * 60 * 24 * 365;

// Same fallback chain as the restore-access link signer, so no new env var is needed.
// Rotating the secret instantly signs everyone out; they restore via /restore-access.
const SECRET =
  process.env.ACCESS_COOKIE_SECRET ?? process.env.RESTORE_LINK_SECRET ?? process.env.ADMIN_KEY ?? "";

function sign(exp: number): string {
  return crypto.createHmac("sha256", SECRET).update(`ae_access.v1.${exp}`).digest("base64url");
}

/** Set a signed, one-year Season Pass cookie. Call only after verifying payment. */
export function grantPaidAccess(cookieStore: CookieStore): void {
  if (!SECRET) {
    // Fail closed: an unsigned cookie would be forgeable. The buyer can restore later.
    console.error("AE_ACCESS_NOSECRET: set ACCESS_COOKIE_SECRET or ADMIN_KEY; access cookie not issued");
    return;
  }
  const exp = Math.floor(Date.now() / 1000) + ONE_YEAR;
  cookieStore.set(ACCESS_COOKIE, `v1.${exp}.${sign(exp)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ONE_YEAR,
  });
}

/** True only for a cookie this server signed and that has not expired. */
export function hasPaidAccess(cookieStore: CookieStore): boolean {
  if (!SECRET) return false;
  const value = cookieStore.get(ACCESS_COOKIE)?.value;
  if (!value) return false;

  const [version, expStr, sig] = value.split(".");
  if (version !== "v1" || !expStr || !sig) return false;

  const exp = Number(expStr);
  if (!Number.isInteger(exp) || Math.floor(Date.now() / 1000) > exp) return false;

  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(sign(exp));
  return sigBuf.length === expBuf.length && crypto.timingSafeEqual(sigBuf, expBuf);
}
