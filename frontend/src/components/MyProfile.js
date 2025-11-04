import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MyProfile({ user }) {
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        if (!user) return;
        axios.get("http://localhost:8000/api/blogs").then((res) => {
            const myPosts = res.data.filter((p) => p.author === user.user_id);
            setUserPosts(myPosts);
        });
    }, [user]);

    if (!user) {
        return <p className="alert alert-warning">Please sign in to view your profile.</p>;
    }

    return (
        <div className="container">
            <h3>My Profile</h3>
            <div className="card p-3 mb-3">
                <p><strong>User ID:</strong> {user.user_id}</p>
                <p><strong>Name:</strong> {user.name}</p>
                {user.age && <p><strong>Age:</strong> {user.age}</p>}
                {user.occupation && <p><strong>Occupation:</strong> {user.occupation}</p>}
                {user.city && <p><strong>City:</strong> {user.city}</p>}
            </div>

            <h4 className="mt-4">My Posts</h4>
            {userPosts.length === 0 ? (
                <p>No posts yet.</p>
            ) : (
                userPosts.map((p) => (
                    <div key={p.id} className="card mb-3">
                        <div className="card-body">
                            <h5>{p.title}</h5>
                            <p>{p.body}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
