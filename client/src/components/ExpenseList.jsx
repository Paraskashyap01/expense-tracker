import ExpenseItem from "./ExpenseItem";

function ExpenseList({
    expenses,
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

    if (expenses.length === 0) {
        return (
            <div className="text-center py-10">
                <h3 className="text-xl font-semibold">
                    No Expenses Yet
                </h3>
                <p className="text-gray-500 mt-2">
                    Add your first expense
                    to get started.
                </p>
            </div>
        );
    }

    return (
        <div>
            {expenses.map(
                (expense) => (
                    <ExpenseItem
                        key={expense._id}
                        expense={expense}
                        deleteExpense={deleteExpense}
                        editingId={editingId}
                        setEditingId={setEditingId}
                        editAmount={editAmount}
                        setEditAmount={setEditAmount}
                        editCategory={editCategory}
                        setEditCategory={setEditCategory}
                        editDescription={editDescription}
                        setEditDescription={setEditDescription}
                        editDate={editDate}
                        setEditDate={setEditDate}
                        updateExpense={updateExpense}
                    />
                )
            )}
        </div>
    );
}

export default ExpenseList;