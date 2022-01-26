const { OAuth2Client } = require('google-auth-library');

const googleAuth = async (req, res, next) => {
  try {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: req.body,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
  
    const { sub, email } = payload;
    const userId = sub;
    return { userId, email };
  } catch (err) {
    next(err);
  }
};

module.exports = googleAuth;
