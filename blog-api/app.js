const express = require("express");
const dotenv = require("dotenv");

dotenv.config(); // FIRST

const cors = require("cors");

const connectdatabase = require("./config/database");
const router = require("./routes/authroutes");
const blogRoutes = require("./routes/blogroutes");
const commentRoutes = require("./routes/commentroutes");
dotenv.config();
connectdatabase();

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Blog API is running...");
});

app.use("/api/auth", router);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
