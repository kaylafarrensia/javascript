const bookService = require("../service/book.service");
const Joi = require("joi");

const findOne = async (req, res) => {
  const book = await bookService.findOne(req.params.id);
  res.json(book);
};

const findAll = async (req, res) => {
  const book = await bookService.findAll();
  res.json(book);
};

const create = async (req, res) => {
  const scheme = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    description: Joi.string().required(),
    cover: Joi.string().required(),
    price: Joi.number().required(),
  });

  try {
    await scheme.validateAsync(req.body);
    const book = await bookService.create(req.body);
    res.json(book);
  } catch (err) {
    res.json(err);
  }
};

const updateById = async (req, res) => {
  const scheme = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    description: Joi.string().required(),
    cover: Joi.string().required(),
    price: Joi.number().required(),
  });

  try {
    await scheme.validateAsync(req.body);
    const book = await bookService.updateById(req.params, req.body);
    res.json(book);
  } catch (err) {
    res.json(err);
  }
};

const deleteById = async (req, res) => {
  const book = await bookService.deleteById(req.params.id);
  res.json(book);
};

module.exports = {
  findOne,
  findAll,
  create,
  updateById,
  deleteById,
};
