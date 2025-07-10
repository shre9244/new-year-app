const express = require('express');
const { todo } = require('./db');
const { createTodo, updateTodo } = require('./types');
require('dotenv').config();

const app = express();
app.use(express.json());

// POST /todo
app.post("/todo", async function(req, res){
  const createPayload = req.body;
  const parsePayload = createTodo.safeParse(createPayload);

  if (!parsePayload.success) {
    return res.status(411).json({ msg: "You sent the wrong inputs" });
  }

  await todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false
  });

  res.json({ msg: "Todo created successfully" });
});

// GET /todo
app.get("/todo", async function(req, res){
  const todos = await todo.find({});
  res.json({ todos });
});

// PUT /completed
app.put("/completed", async function(req, res){
  const updatePayload = req.body;
  const parsePayload = updateTodo.safeParse(updatePayload);

  if (!parsePayload.success) {
    return res.status(411).json({ msg: "You sent the wrong inputs" });
  }

  await todo.updateOne(
    { _id: updatePayload._id },
    { completed: true }
  );

  res.json({ msg: "Todo updated successfully" });
});

app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});
