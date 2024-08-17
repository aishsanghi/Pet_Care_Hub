// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import userRoute from "../back/routes/userRoute.js";
// import contactRoute from "../back/routes/contactRoute.js";
// import categoryRoute from "../back/routes/categoryRoute.js";
// import vendorRoute from "../back/routes/vendorRoute.js";
// import productRoute from "../back/routes/productRoute.js";
// import cartRoute from "../back/routes/cartRoute.js";
// import orderRoute from "../back/routes/orderRoute.js";

// // const app = express();
// // const port = process.env.PORT || 3001;

// // // middleware to parse json req
// // app.use(express.json());

// // //enable cross origin(cors)
// // app.use(cors());

// // //database connection
// // mongoose
// //   .connect(
// //     "mongodb+srv://asanghi04:asanghi04@cluster0.3bcohfd.mongodb.net/Petcare"
// //   )
// //   .then(() => {
// //     console.log("connected to mongoDB database");
// //   })
// //   .catch((error) => console.error("fail to connect with mongoDB", error));

// // // default route
// // app.get("/", (req, res) => {
// //   res.send("hello world");
// // });

// app.use("/uploads", express.static("./uploads"));
// app.use("/api", userRoute);
// app.use("/api", contactRoute);
// app.use("/api", categoryRoute);
// app.use("/api", vendorRoute);
// app.use("/api", productRoute);
// app.use("/api", cartRoute);
// app.use("/api", orderRoute);

// // app.listen(port, () => {
// //   console.log(`server started at http://localhost:${port}`);
// // });