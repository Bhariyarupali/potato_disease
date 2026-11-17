
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const predictionRoutes = require("./routes/predictionRoutes");

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Potato Disease Detection Backend Running"
    });
});

// Prediction route
app.use("/api", predictionRoutes);

// Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
