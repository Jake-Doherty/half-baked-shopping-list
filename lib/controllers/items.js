const { Router } = require('express');
const Item = require('../models/Item.js');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const itemObject = {
      description: req.body.description,
      qty: req.body.qty,
      user_id: req.user.id,
    };
    const item = await Item.insert(itemObject);
    res.json(item);
  } catch (e) {
    next(e);
  }
});

// TO DO - implement items CRUD
