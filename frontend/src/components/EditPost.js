import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditPost({ user }) {
    const { id } = useParams();
    const [post, setPost] = useState({ title: "", body: "" });
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/blogs").then((res) => {
            const found = res.data.find((p) => p.id === id);
            if (found) setPost(found);
        });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8000/api/blogs/${id}`, {
            ...post,
            author: user.user_id,
        });
        navigate("/");
    };

    return (
        <div className="col-md-8 mx-auto">
            <h3>Edit Post</h3>
            <form onSubmit={handleSubmit}>
                <input
                    className="form-control mb-2"
                    value={post.title}
                    onChange={(e) => setPost({ ...post, title: e.target.value })}
                />
                <textarea
                    className="form-control mb-2"
                    rows="5"
                    value={post.body}
                    onChange={(e) => setPost({ ...post, body: e.target.value })}
                />
                <button className="btn btn-success">Save</button>
            </form>
        </div>
    );
}
