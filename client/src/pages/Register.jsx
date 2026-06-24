import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const registerUser = async () => {

        if (!name || !email || !password) {
            toast.error("Please fill all fields")
            return;
        }
        try {
            const response = await api.post(
                "/auth/register",
                {
                    name,
                    email,
                    password,
                }
            );
            alert(response.data.message);
            setName("");
            setEmail("");
            setPassword("");
            navigate("/login");
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/");
        }
    }, []);
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Expense Tracker
                </h1>
                <p className="text-gray-500 text-center mb-6">
                    Track your expenses efficiently
                </p>

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button onClick={registerUser} className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
                    Register
                </button>
                <p className="text-center mt-4">
                    Already have an account?
                    <Link
                        to="/login"
                        className="text-blue-600 ml-1"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>

    );
}

export default Register;