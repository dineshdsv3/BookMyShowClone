const express = require("express");
const connectDB = require("./config/db");
const app = express();
const userRoute = require("./routes/userRoute");


require('dotenv').config()

connectDB()
app.use(express.json());
app.use("/bms/users", userRoute);


app.listen(process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}`)
})