const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();


// middleware
app.use(
  cors({ 
    origin: "https://codemyfyp-frontend.vercel.app",
    credentials: true,
  })
)

app.use(express.json({
  limit: "16kb"   // allows larger JSON (photo base64, etc.)
}));


/*
DATABASE CONNECTION
*/
async function connectDB() {

  try {

    await mongoose.connect(
      process.env.MONGODB_URL
    );

    console.log("MongoDB connected successfully");

  } catch (error) {

    console.error( "MongoDB connection failed:", error.message);

    process.exit(1);

  }

}

connectDB();



/*
ROUTES
*/
const authRoutes = require("./routes/authRoutes");
const biodataRoutes = require("./routes/biodataRoutes");


app.use("/api/auth", authRoutes);

app.use("/api/biodata", biodataRoutes);



/*
TEST ROUTE
*/
app.get("/", (req, res) => {

  res.send("API running");

});



/*
SERVER START
*/
const PORT = process.env.PORT;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});