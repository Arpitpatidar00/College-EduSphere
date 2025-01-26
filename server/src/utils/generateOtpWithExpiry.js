export function generateOtpWithExpiry(length = 6, expiryDuration = 5) {
  const otp = Array.from({ length }, () => Math.floor(Math.random() * 10)).join(
    ""
  );

  const expiry = Date.now() + expiryDuration * 60 * 1000;

  return { otp, expiry };
}
