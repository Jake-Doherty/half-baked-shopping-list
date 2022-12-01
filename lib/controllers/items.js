const { Router } = require('express');
const Item = require('../models/Item.js');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const items = await Item.getAll(req.user.id);
      res.json(items);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
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
