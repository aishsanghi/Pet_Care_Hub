import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import contactRoute from "./routes/contactRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import vendorRoute from "./routes/vendorRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";

const app = express();
const port = process.env.PORT || 3001;

// middleware to parse json req
app.use(express.json());
app.use(express.static('build'));

//enable cross origin(cors)
app.use(cors());

//database connection
mongoose
  .connect(
    "mongodb+srv://asanghi04:asanghi04@cluster0.3bcohfd.mongodb.net/Petcare"
  )
  .then(() => {
    console.log("connected to mongoDB database");
  })
  .catch((error) => console.error("fail to connect with mongoDB", error));

// default route
app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/uploads", express.static("./uploads"));
app.use("/api", userRoute);
app.use("/api", contactRoute);
app.use("/api", categoryRoute);
app.use("/api", vendorRoute);
app.use("/api", productRoute);
app.use("/api", cartRoute);
app.use("/api", orderRoute);

// server code
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

// // const PORT = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
