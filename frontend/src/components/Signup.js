import React, { useState } from "react";
import axios from "axios";

export default function Signup() {
    const [form, setForm] = useState({ user_id: "", password: "", name: "", age: "", occupation: "", city: "" });
    const [msg, setMsg] = useState("");

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/api/auth/signup", form);
            setMsg(res.data.message);
        } catch (err) {
            setMsg(err.response?.data?.message || "Error");
        }
    };

    return (
        <div className="col-md-6 mx-auto">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                {Object.keys(form).map((key) => (
                    <input key={key} className="form-control mb-2" name={key} placeholder={key} value={form[key]} onChange={handleChange} required />
                ))}
                <button className="btn btn-primary">Sign Up</button>
            </form>
            {msg && <p className="mt-3 alert alert-info">{msg}</p>}
        </div>
    );
}
