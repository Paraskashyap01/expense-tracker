import { useState } from "react";

function ExpenseForm({
  addExpense
}) {

  const [amount, setAmount] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [date, setDate] =
    useState("");

  const handleSubmit = () => {

    addExpense({
      amount,
      category,
      description,
      date,
    });

    setAmount("");
    setCategory("");
    setDescription("");
    setDate("");

  };

  return (
    <div className="grid gap-4">

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) =>
          setAmount(e.target.value)
        }
        className="border rounded-lg p-3 w-full"
      />

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
        className="border rounded-lg p-3 w-full"
      >
        <option value="">
          Select Category
        </option>

        <option value="Food">
          Food
        </option>

        <option value="Travel">
          Travel
        </option>

        <option value="Shopping">
          Shopping
        </option>

        <option value="Bills">
          Bills
        </option>
      </select>

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(
            e.target.value
          )
        }
        className="border rounded-lg p-3 w-full"
      />

      <input
        type="date"
        value={date}
        onChange={(e) =>
          setDate(e.target.value)
        }
        className="border rounded-lg p-3 w-full"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
      >
        Add Expense
      </button>

    </div>
  );

}

export default ExpenseForm;