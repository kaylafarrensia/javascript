const bookRepository = require("../repository/book.repository");

const findOne = async (id) => {
  return await bookRepository.findOne(parseInt(id));
};

const findAll = async (id) => {
  return await bookRepository.findAll();
};

const create = async (id) => {
  return await bookRepository.create(data);
};

const updateById = async (id) => {
  return await bookRepository.updateById(parseInt(id), data);
};

const deleteById = async (id) => {
  return await bookRepository.deleteById(parseInt(id));
};

module.exports = {
  findOne,
  findAll,
  create,
  updateById,
  deleteById,
};
