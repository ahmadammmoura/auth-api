'use strict';

const fs = require('fs');
const Collection = require('../Models/data-collection');

const models = new Map();

const paramController = (req, res, next) => {
  const modelName = req.params.model;
  if (models.has(modelName)) {
    req.model = models.get(modelName);
    next();
  } else {
    const fileName = `${__dirname}/../Models/${modelName}/${modelName}.model.js`;
    if (fs.existsSync(fileName)) {
      const model = require(fileName);
      models.set(modelName, new Collection(model));
      req.model = models.get(modelName);
      next();
    } else {
      next('Invalid Model');
    }
  }
};

const handleGetAll = async (req, res) => {
  let allRecords = await req.model.get();
  res.status(200).json(allRecords);
};

const handleGetOne = async (req, res) => {
  const id = req.params.id;
  let theRecord = await req.model.get(id);
  res.status(200).json(theRecord);
};

const handleCreate = async (req, res) => {
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);
};
const handleUpdate = async (req, res) => {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await req.model.update(id, obj);
  res.status(200).json(updatedRecord);
};

const handleDelete = async (req, res) => {
  let id = req.params.id;
  let deletedRecord = await req.model.delete(id);
  res.status(200).json(deletedRecord);
};

module.exports = {
  paramController,
  handleGetAll,
  handleGetOne,
  handleCreate,
  handleUpdate,
  handleDelete,
};
