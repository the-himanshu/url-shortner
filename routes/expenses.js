// import all the packages required
const express = require("express");
const dotenv = require("dotenv");

// creating express route handler
const router = express.Router();

// import the database model
const Expense = require("../models/expensesModel");
const validateToken = require("../helperFunctions/validate-token");

//add the dotenv package
dotenv.config();

router.post("/", validateToken, async (req, res) => {
  const expense = new Expense({
    userId: req.user.user,
    title: req.body.title,
    cost: req.body.cost,
    date: req.body.date,
  });
  await expense.save();
  return res.status(201).json(expense);
});

router.get("/", validateToken, async (req, res) => {
  const userId = req?.user?.user?._id
  if(!userId) res.status(400).send("Please send the user id parameter inside query");

  const expenses = await Expense.find({
    userId: userId,
  });
  return res.status(200).json(expenses);
});

router.patch("/:id", validateToken, async (req, res) => {
  const expenseId = req?.params?.id

  const allowedAttributes = ['title', 'cost', 'date']
  const updateBody = {}
  for(let key in req?.body) {
    if(allowedAttributes.includes(key)) updateBody[key] = req.body[key]
  }

  const expense = await Expense.findById({_id: expenseId});
  if(!expense) res.status(400).send("No such expense found");
  if(expense?.userId !== req?.user?.user?._id) {
    res.status(400).send("You are not authorized to edit this record");
  }
  
  const updatedExpense = await Expense.findByIdAndUpdate({_id: expenseId}, updateBody);
  return res.status(200).json(updatedExpense);
});

router.delete("/:id", validateToken, async (req, res) => {
  const expenseId = req?.params?.id
  const expense = await Expense.findById({_id: expenseId});
  if(!expense) res.status(400).send("No such expense found");
  if(expense?.userId !== req?.user?.user?._id) {
    res.status(400).send("You are not authorized to edit this record");
  }

  const deletedExpense = await Expense.deleteOne({_id: expenseId})
  return res.status(200).json(deletedExpense);
});

module.exports = router;
