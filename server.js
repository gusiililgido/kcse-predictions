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

    try {

        const { phone } = req.body;

        // STEP 1 — GET TOKEN
        const authResponse = await axios.post(
            "https://pay.pesapal.com/v3/api/Auth/RequestToken",
            {
                consumer_key: consumerKey,
                consumer_secret: consumerSecret
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            }
        );

        const token = authResponse.data.token;

        // STEP 2 — CREATE PAYMENT ORDER
        const orderResponse = await axios.post(
            "https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest",
            {
                id: "KCSE-" + Date.now(),
                currency: "KES",
                amount: 50,
                description: "KCSE Prediction Payment",
                callback_url: "https://yourwebsite.vercel.app/success.html",
                notification_id: "YOUR_IPN_ID",
                billing_address: {
                    phone_number: phone,
                    country_code: "KE",
                    first_name: "Customer"
                }
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        res.json(orderResponse.data);

    } catch (error) {

        console.log(error.response?.data || error.message);

        res.status(500).json({
            success: false,
            error: error.response?.data || error.message
        });
    }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});