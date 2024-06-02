const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // Import cors middleware
const { default: mongoose } = require("mongoose");
const userRoutes = require("./Routes/userRoutes.js"); // Declare userRoutes once

const app = express();
dotenv.config();
app.use(express.json());

// Enable CORS
app.use(cors());

mongoose.connect(process.env.MONGO_URI);
const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("Server Connected to database");
    } catch (error) {
        console.log("Server Not connected to db", err.message);
    }
};

connectDb();

app.get("/", (req, res) => {
    res.send("API is running")
});

// Mount the user routes under the /api prefix
app.use('/api', userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, console.log("Server is running"));
