import React from 'react'
import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { toast } from "react-toastify";


const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editAmount, setEditAmount] = useState("");
    const [editCategory, setEditCategory] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editDate, setEditDate] = useState("");
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(
        () => {
            fetchUser();
            fetchExpenses();
        }, []);


    const fetchUser = async () => {
        try {
            const response = await api.get("/auth/me");
            setUser(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const addExpense = async (expenseData) => {
        try {
            await api.post("/expenses", expenseData);
            fetchExpenses();
            toast.success("Expense Added");
        } catch (error) {
            console.log(error);
        }
    };

    const fetchExpenses = async () => {
        try {
            const response = await api.get("/expenses");
            setExpenses(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteExpense = async (id) => {
        try {
            await api.delete(`/expenses/${id}`);
            fetchExpenses();
            toast.success("Expense Deleted");
        } catch (error) {
            console.log(error);
        }
    };

    const updateExpense = async (id) => {
        try {
            await api.put(
                `/expenses/${id}`,
                {
                    amount: editAmount,
                    category: editCategory,
                    description: editDescription,
                    date: editDate,
                }
            );
            setEditingId(null);
            fetchExpenses();
            toast.success("Expense Updated");
        } catch (error) {
            console.log(error);
        }
    };



    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    const foodTotal = expenses.filter(
        (expense) => expense.category === "Food"
    ).reduce(
        (sum, expense) =>
            sum + expense.amount, 0
    );

    const travelTotal = expenses.filter(
        (expense) => expense.category === "Travel"
    ).reduce(
        (sum, expense) =>
            sum + expense.amount, 0
    );
    const shoppingTotal = expenses.filter(
        (expense) => expense.category === "Shopping"
    ).reduce(
        (sum, expense) =>
            sum + expense.amount, 0
    );
    const billsTotal = expenses.filter(
        (expense) => expense.category === "Bills"
    ).reduce(
        (sum, expense) =>
            sum + expense.amount, 0
    );

    const chartData = [
        {
            name: "Food",
            value: foodTotal,
        },

        {
            name: "Travel",
            value: travelTotal,
        },

        {
            name: "Shopping",
            value: shoppingTotal,
        },

        {
            name: "Bills",
            value: billsTotal,
        },
    ];

    const COLORS = [
        "#22c55e",
        "#eab308",
        "#a855f7",
        "#3b82f6",
    ];

    const monthlyData = {};

    expenses.forEach((expense) => {
        const month = new Date(expense.date).toLocaleString(
            "default",
            {
                month: "short",
            }
        );
        if (!monthlyData[month]) {
            monthlyData[month] = 0;
        }
        monthlyData[month] += expense.amount;
    });

    const monthlyChartData = Object.entries(monthlyData).map(
        ([month, total]) => ({
            month,
            total,
        })
    );



    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold">
                    Loading...
                </h1>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-gray-100">

            <nav className="bg-white shadow">

                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

                    <h1 className="text-2xl font-bold">
                        Expense Tracker
                    </h1>

                    <button
                        onClick={logout}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Logout
                    </button>

                </div>

            </nav>

            <div className="max-w-6xl mx-auto p-6">

                {user && (
                    <h2 className="text-3xl font-semibold mb-6">
                        Welcome, {user.name}
                    </h2>
                )}


                <div className="grid md:grid-cols-4 gap-4 mb-8">

                    <div className="bg-blue-500 text-white p-6 rounded-xl shadow">

                        <h3 className="text-lg">
                            Total Expenses
                        </h3>

                        <p className="text-3xl font-bold mt-2">
                            ₹{totalExpenses}
                        </p>

                    </div>

                    <div className="bg-green-500 text-white p-6 rounded-xl shadow">

                        <h3 className="text-lg">
                            Food
                        </h3>

                        <p className="text-3xl font-bold mt-2">
                            ₹{foodTotal}
                        </p>

                    </div>

                    <div className="bg-yellow-500 text-white p-6 rounded-xl shadow">

                        <h3 className="text-lg">
                            Travel
                        </h3>

                        <p className="text-3xl font-bold mt-2">
                            ₹{travelTotal}
                        </p>

                    </div>

                    <div className="bg-purple-500 text-white p-6 rounded-xl shadow">

                        <h3 className="text-lg">
                            Shopping
                        </h3>

                        <p className="text-3xl font-bold mt-2">
                            ₹{shoppingTotal}
                        </p>

                    </div>

                </div>


                <div className="bg-white p-6 rounded-xl shadow mb-8">
                    <h2 className="text-xl font-semibold mb-4">
                        Expense Distribution
                    </h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={120}
                                >
                                    {chartData.map(
                                        (entry, index) => (
                                            <Cell
                                                key={index}
                                                fill={COLORS[index % COLORS.length]}
                                            />)
                                    )}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>


                <div className="bg-white p-6 rounded-xl shadow mb-8">
                    <h2 className="text-xl font-semibold mb-4">
                        Monthly Spending
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={monthlyChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="total" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>


                <div className="bg-white p-6 rounded-lg shadow mb-8">

                    <h2 className="text-xl font-semibold mb-4">
                        Add Expense
                    </h2>

                    <ExpenseForm
                        addExpense={addExpense}
                    />

                </div>


                <div className="bg-white p-6 rounded-lg shadow">

                    <h2 className="text-xl font-semibold mb-4">
                        Expenses
                    </h2>

                    <ExpenseList
                        expenses={expenses}
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

                </div>


            </div>

        </div>
    )
}

export default Dashboard