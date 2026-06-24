const express = require("express");

const Expense = require("../models/Expense");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();



router.post("/", authMiddleware, async (req, res) => {
    try {
        const expense = await Expense.create({
            amount: req.body.amount,
            category: req.body.category,
            description: req.body.description,
            date: req.body.date,
            user: req.user.userId,
        });
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
);

router.get("/", authMiddleware, async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.userId });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
);

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        if (expense.user.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Access denied" });
        }
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Expense deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
);

router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        if (expense.user.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Access denied" });
        }
        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );
        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
);



module.exports = router;