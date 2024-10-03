const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const Routes = require("./routes/route.js");

dotenv.config();

const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

// To restrict CORS to specific origins (optional)
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://mern-school-management.vercel.app/",
  ], // Replace with your frontend URL
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json({ limit: "10mb" }));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("NOT CONNECTED TO NETWORK", err));

// Health check route
app.get("/health", (req, res) => {
  res.status(200).send("API is running");
});

// Main routes
app.use("/", Routes);

app.listen(PORT, () => {
  console.log(`Server started at port no. ${PORT}`);
});
