const express = require('express');
const bearerAuth = require('../middleware/bearer');
const acl = require('../middleware/acl');
const basicAuth = require('../middleware/basic');
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

router.get('/:model', basicAuth, acl('read'), handleGetAll);
router.get('/:model/:id', basicAuth, acl('read'), handleGetOne);
router.post(
  '/:model',
  bearerAuth,
  acl('read', 'update', 'create'),
  handleCreate,
);
router.put(
  '/:model/:id',
  bearerAuth,
  acl('read', 'update', 'create'),
  handleUpdate,
);
router.delete(
  '/:model/:id',
  bearerAuth,
  acl('read', 'update', 'create', 'delete'),
  handleDelete,
);

module.exports = router;
