function ExpenseItem({
    expense,
    deleteExpense,
    editingId,
    setEditingId,
    editAmount,
    setEditAmount,
    editCategory,
    setEditCategory,
    editDescription,
    setEditDescription,
    editDate,
    setEditDate,
    updateExpense
}) {
    return (

        <div className="border rounded-lg p-5 mb-4 bg-white shadow-sm">

            <h2 className="text-2xl font-bold text-green-600">
                ₹{expense.amount}
            </h2>

            <p className="text-gray-700 mt-2">
                Category:
                <span className="font-semibold ml-1">
                    {expense.category}
                </span>
            </p>
            <p className="text-gray-600 mt-2">
                {expense.description}
            </p>

            <p className="text-sm text-gray-500 mt-2">
                {new Date(
                    expense.date
                ).toLocaleDateString()}
            </p>

            {
                editingId === expense._id
                    ? (
                        <>
                            <input
                                value={editAmount}
                                onChange={(e) => setEditAmount(e.target.value)}
                                className="border rounded-lg p-2 w-full mb-2"

                            />
                            <select
                                value={editCategory}
                                onChange={(e) =>
                                    setEditCategory(e.target.value)
                                }
                                className="border rounded-lg p-2 w-full mb-2"
                            >
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
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                className="border rounded-lg p-2 w-full mb-2"
                            />
                            <input
                                type="date"
                                value={editDate}
                                onChange={(e) => setEditDate(e.target.value)}
                                className="border rounded-lg p-2 w-full mb-2"
                            />
                            <button
                                onClick={() => updateExpense(expense._id)}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                Save
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="flex gap-3 mt-4">

                                <button
                                    onClick={() => {
                                        setEditingId(expense._id);
                                        setEditAmount(expense.amount);
                                        setEditCategory(expense.category);
                                        setEditDescription(expense.description);
                                        setEditDate(expense.date.split("T")[0]);
                                    }}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() =>
                                        deleteExpense(expense._id)
                                    }
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </>
                    )
            }



        </div>
    );
}

export default ExpenseItem;