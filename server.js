const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("KCSE Backend Running");
});

app.post("/pay", async (req, res) => {
    const { phone } = req.body;

    try {
        // STEP 3 will contain real PesaPal API

        console.log("Phone:", phone);

        res.json({
            success: true,
            message: "STK Push Sent"
        });

    } catch (error) {
        res.json({
            success: false,
            message: "Payment Failed"
        });
    }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
    console.log("Server running");
});
