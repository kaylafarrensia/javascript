const db = require("../../../helpers/db");

const findOne = async (id) => {
  return await db.book.findUnique({
    where: {
      id,
    },
  });
};

const findAll = async () => {
  return await db.book.findMany();
};

const create = async (data) => {
  return await db.book.create({
    data,
  });
};

const updateById = async (id, data) => {
  return await db.book.update({
    where: {
      id,
    },
    data,
  });
};

const deleteById = async (id) => {
  return await db.book.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  findOne,
  findAll,
  create,
  updateById,
  deleteById,
};
