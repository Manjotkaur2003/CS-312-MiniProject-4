import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signin({ setUser }) {
    const [creds, setCreds] = useState({ user_id: "", password: "" });
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => setCreds({ ...creds, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/api/auth/signin", creds);
            setUser(res.data.user);
            navigate("/");
        } catch (err) {
            setMsg(err.response?.data?.message || "Error");
        }
    };

    return (
        <div className="col-md-6 mx-auto">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <input className="form-control mb-2" name="user_id" placeholder="User ID" value={creds.user_id} onChange={handleChange} required />
                <input className="form-control mb-2" type="password" name="password" placeholder="Password" value={creds.password} onChange={handleChange} required />
                <button className="btn btn-primary">Sign In</button>
            </form>
            {msg && <p className="mt-3 alert alert-info">{msg}</p>}
        </div>
    );
}
