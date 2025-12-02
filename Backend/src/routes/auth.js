import express from "express";
import { supabase } from "../config/supabase.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true
    });

    if (error) return res.status(400).json({ error: error.message });
    res.json({ user: data.user });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) return res.status(400).json({ error: error.message });
    res.json({ session: data.session, user: data.user });
});

export default router;
