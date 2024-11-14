const express = require("express");
const connectDB = require("./config/db");
const app = express();
const cors = require('cors');
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");


require('dotenv').config()
const userRoute = require("./routes/userRoute");
const movieRoute = require("./routes/movieRoute");
const theatreRoute = require("./routes/theatreRoute");
const showRoute = require("./routes/showRoute");
const bookingRoute = require("./routes/bookingRoute")

const { validateJWTToken } = require("./middleware/authorizationMiddleware");
const ExpressMongoSanitize = require("express-mongo-sanitize");


connectDB()

const apiLimiter = rateLimit({
    windowMS: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again after 15 minutes",
});

app.use(express.json());
app.use(ExpressMongoSanitize());
app.use(cors())

app.use(helmet());

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "example.com"], // Allow scripts from 'self' and example.com
            styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles (unsafe)
            imgSrc: ["'self'", "data:", "example.com"], // Allow images from 'self', data URLs, and example.com
            connectSrc: ["'self'", "api.example.com"], // Allow connections to 'self' and api.example.com
            fontSrc: ["'self'", "fonts.gstatic.com"], // Allow fonts from 'self' and fonts.gstatic.com
            objectSrc: ["'none'"], // Disallow object, embed, and applet elements
            upgradeInsecureRequests: [], // Upgrade insecure requests to HTTPS
        },
    })
);

app.use("/bms", apiLimiter);
app.use("/bms/users", userRoute);
app.use("/bms/movies", validateJWTToken, movieRoute);
app.use("/bms/theatres", validateJWTToken, theatreRoute);
app.use("/bms/shows", validateJWTToken, showRoute);
app.use("/bms/bookings", validateJWTToken, bookingRoute);


app.listen(process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}`)
})