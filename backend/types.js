const zod = require('zod');

const createTodo = zod.object({
  title: zod.string(),
  description: zod.string()
});

const updateTodo = zod.object({
  _id: zod.string()   // ✅ Use _id here to match MongoDB's ObjectId
});

module.exports = {
  createTodo,
  updateTodo
};
