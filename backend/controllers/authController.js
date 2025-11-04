import { users } from "../models/users.js";

export const signup = (req, res) => {
    const { user_id, password, name, age, occupation, city } = req.body;
    if (users.find((u) => u.user_id === user_id))
        return res.status(400).json({ message: "User already exists" });

    users.push({ user_id, password, name, age, occupation, city });
    res.json({ message: "Signup successful" });
};

export const signin = (req, res) => {
    const { user_id, password } = req.body;
    const user = users.find((u) => u.user_id === user_id && u.password === password);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    res.json({ message: "Signin successful", user });
};
