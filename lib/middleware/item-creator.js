const Item = require('../models/Item.js');

module.exports = async (req, res, next) => {
  try {
    const item = await Item.getById(req.params.id);
    if (item && (req.user.email === 'admin' || req.user.id === item.user_id)) {
      next();
    } else {
      throw new Error('You must be the creator of this item to delete!');
    }
  } catch (e) {
    e.status = 403;
    next(e);
  }
};
