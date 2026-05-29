const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const consumerKey = process.env.PESAPAL_CONSUMER_KEY;
const consumerSecret = process.env.PESAPAL_CONSUMER_SECRET;

app.get("/", (req, res) => {
    res.send("KCSE Backend Running");
});

app.post("/pay", async (req, res) => {

    const { phone } = req.body;

    try {

        const paymentData = {
            amount: 50,
            currency: "KES",
            description: "KCSE Prediction Payment",
            phone_number: phone
        };

        console.log(paymentData);

        res.json({
            success: true,
            message: "STK Push Sent Successfully"
        });

    } catch (error) {

        console.log(error.message);

        res.json({
            success: false,
            message: "Payment Failed"
        });
    }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});