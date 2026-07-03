// Debug check (optional but useful)
console.log("🔥 Server file is running...");

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage
let tournaments = [];

/* =============================
   ROOT ROUTE (TEST)
============================= */
app.get("/", (req, res) => {
    res.send("SpotPoint Backend is Running 🚀");
});

/* =============================
   LOGIN API
============================= */
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (email === "admin@gmail.com" && password === "1234") {
        res.send("Login Successful ✅");
    } else {
        res.send("Invalid Credentials ❌");
    }
});

/* =============================
   ADD TOURNAMENT
============================= */
app.post("/addTournament", (req, res) => {
    const { name, game, date, zone, organizer, prize, code } = req.body;

    if (!name || !game || !date || !organizer || !prize) {
        return res.status(400).json({ message: "Missing required fields ❌" });
    }

    const newTournament = {
        name,
        game,
        date,
        zone: zone || "N/A",
        organizer,
        prize,
        code
    };

    tournaments.push(newTournament);

    res.json({ message: "Tournament added successfully ✅", data: newTournament });
});

/* =============================
   GET ALL TOURNAMENTS
============================= */
app.get("/getTournaments", (req, res) => {
    res.json(tournaments);
});

/* =============================
   START SERVER
============================= */
app.listen(PORT, () => {
    console.log("✅ Server running at: http://localhost:" + PORT);
});