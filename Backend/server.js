const express = require("express");
const connectDB = require("./config/db");
const app = express();
const cors = require('cors');

const userRoute = require("./routes/userRoute");
const movieRoute = require("./routes/movieRoute");
const theatreRoute = require("./routes/theatreRoute");
const showRoute = require("./routes/showRoute");
const bookingRoute = require("./routes/bookingRoute")

const { validateJWTToken } = require("./middleware/authorizationMiddleware");

require('dotenv').config()
connectDB()

app.use(express.json());
app.use(cors())
app.use("/bms/users", userRoute);
app.use("/bms/movies", validateJWTToken, movieRoute);
app.use("/bms/theatres", validateJWTToken, theatreRoute);
app.use("/bms/shows", validateJWTToken, showRoute);
app.use("/bms/bookings", validateJWTToken, bookingRoute);


app.listen(process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}`)
})