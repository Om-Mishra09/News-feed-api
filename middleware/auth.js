const API_KEY = 'my-secret-key';

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader === `Bearer ${API_KEY}`) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

module.exports = authenticate;
