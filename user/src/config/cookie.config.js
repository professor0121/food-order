
export const cookieConfig = {
  secret: 'secret', // 🔐 Used to sign the session ID cookie
  resave: false, // ❌ Don't save session if unmodified
  saveUninitialized: true, // ✅ Save new sessions that are unmodified (can be false for more strict setups)
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 🕒 1 day in milliseconds
    httpOnly: true, // 🛡️ Prevent client-side JS from accessing the cookie
    secure: false, // 🔐 Should be true in production with HTTPS
    sameSite: 'lax', // 🧭 Controls cross-site cookie sharing: 'lax', 'strict', or 'none'
  }
};

export const cookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: 'lax',
};