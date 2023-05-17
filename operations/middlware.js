const jwt = require('jsonwebtoken');

function middleware(req, res, next) {
  const token = req.headers.authorization; // Assuming the token is passed in the Authorization header

  if (!token) {
    return res.status(401).json({ error: 'Access token not provided' });
  }

  // Remove the "Bearer " prefix from the token
  const tokenWithoutPrefix = token.replace('Bearer ', '');

  try {
    // Verify the token using your secret key or public key, depending on how it was signed
    const decoded = jwt.verify(tokenWithoutPrefix, process.env.pass); // Replace with your secret key

    // Attach the decoded payload to the request object
    req.user = decoded;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid access token' });
  }
}

module.exports = { middleware };
