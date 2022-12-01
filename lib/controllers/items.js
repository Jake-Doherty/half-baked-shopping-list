const { Router } = require('express');
const itemCreator = require('../middleware/item-creator.js');
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
  })
  .put('/:id', itemCreator, async (req, res, next) => {
    try {
      const updatedItem = await Item.updateById(req.params.id, req.body);
      res.json(updatedItem);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', itemCreator, async (req, res, next) => {
    try {
      const item = await Item.delete(req.params.id);
      if (!item) next();
      res.send();
    } catch (e) {
      next(e);
    }
  });

// TO DO - implement items CRUD
