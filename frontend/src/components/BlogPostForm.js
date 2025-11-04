import React, { useState } from "react";
import axios from "axios";

export default function BlogPostForm({ user }) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [msg, setMsg] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        if (!user) return setMsg("Please sign in first");
        const res = await axios.post("http://localhost:8000/api/blogs", {
            title,
            body,
            author: user.user_id,
        });
        setMsg(`Post "${res.data.title}" created`);
        setTitle("");
        setBody("");
    };

    return (
        <div className="col-md-8 mx-auto">
            <h3>Create New Post</h3>
            <form onSubmit={submit}>
                <input
                    className="form-control mb-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                />
                <textarea
                    className="form-control mb-2"
                    rows="5"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Body"
                    required
                />
                <button className="btn btn-success">Submit</button>
            </form>
            {msg && <div className="alert alert-info mt-3">{msg}</div>}
        </div>
    );
}
