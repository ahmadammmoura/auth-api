'use strict';

const express = require('express');
const router = express.Router();
const {
  paramController,
  handleGetAll,
  handleGetOne,
  handleCreate,
  handleUpdate,
  handleDelete,
} = require('../controllers/crud.controller');

router.param('model', paramController);

router.get('/:model', handleGetAll);
router.get('/:model/:id', handleGetOne);
router.post('/:model', handleCreate);
router.put('/:model/:id', handleUpdate);
router.delete('/:model/:id', handleDelete);

module.exports = router;
