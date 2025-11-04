import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function PostList({ user }) {
    const [posts, setPosts] = useState([]);

    const loadPosts = async () => {
        const res = await axios.get("http://localhost:8000/api/blogs");
        setPosts(res.data);
    };

    useEffect(() => {
        loadPosts();
    }, []);

    const del = async (id) => {
        await axios.delete(`http://localhost:8000/api/blogs/${id}`, {
            data: { author: user.user_id },
        });
        loadPosts();
    };

    return (
        <div>
            <h2>All Posts</h2>
            {user && <Link className="btn btn-primary mb-3" to="/create">New Post</Link>}
            {posts.map((p) => (
                <div key={p.id} className="card mb-3">
                    <div className="card-body">
                        <h4>{p.title}</h4>
                        <p>{p.body}</p>
                        <small>Author: {p.author}</small><br />
                        {user && user.user_id === p.author && (
                            <>
                                <Link to={`/edit/${p.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                                <button onClick={() => del(p.id)} className="btn btn-danger btn-sm">Delete</button>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
