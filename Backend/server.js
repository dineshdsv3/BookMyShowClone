const express = require("express");
const connectDB = require("./config/db");
const app = express();
const userRoute = require("./routes/userRoute");
const cors = require('cors');


require('dotenv').config()

connectDB()

app.use(express.json());
app.use(cors())
app.use("/bms/users", userRoute);



app.listen(process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}`)
})