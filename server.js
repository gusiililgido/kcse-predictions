const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("KCSE Backend Running");
});

app.post("/pay", async (req, res) => {

    try {

        const { phone } = req.body;

        console.log("PHONE:", phone);

        res.status(200).json({
            success: true,
            message: "STK Push Sent Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Payment Failed"
        });
    }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});