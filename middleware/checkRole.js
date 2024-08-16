

// isAdmin middleware
const isAdmin = (req, res, next) => {
    if (!req.user) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    if (req.user.role !== 'admin') {
      return res.status(403).send({ message: 'Forbidden' });
    }
    next();
  };
  
  module.exports = {isAdmin};