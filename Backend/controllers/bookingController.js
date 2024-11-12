const stripe = require("stripe")('sk_test_51QJzsRBAfQPuSZ0iDHctqwMRxTS5mzrb0GZGJuQ5uhBER2jnDbTp80OJM9GwJLhhjQRwV7Fi8NIWbiw2yxnhezLB00PH1adGky');
const Booking = require("../models/bookingSchema");
const Show = require("../models/showSchema");

const makePayment = async (req, res) => {
    try {
        // create a customer
        const { token, amount } = req.body;
        // to do instead of creating customer each time check if customer
        // already existing in stripe db

        const customers = await stripe.customers.list({
            email: token.email,
            limit: 1,
        });

        let currCustomer = null;
        if (customers.data.length > 0) {
            currCustomer = customers.data[0];
        } else {
            const createNewCustomer = async () => {
                return await stripe.customers.create({
                    source: token.id,
                    email: token.email,
                });
            };
            currCustomer = await createNewCustomer();
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            customer: currCustomer.id,
            payment_method_types: ["card"],
            receipt_email: token.email,
            description: "Token has been assigned to the movie",
        });
        const transactionId = paymentIntent.id;
        res.send({
            success: true,
            message: "Payment Successfull ! Tickets Booked",
            data: transactionId,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
};

const bookShow = async (req, res) => {
    try {
        // booking it
        const newBooking = new Booking(req.body);
        await newBooking.save();

        // we are marking booked seats
        const show = await Show.findById(req.body.show).populate("movie");
        // check if tickets are booked
        const updatedBookedSeats = [...show.bookedSeats, ...req.body.seats];
        await Show.findByIdAndUpdate(req.body.show, {
            bookedSeats: updatedBookedSeats,
        });
        res.send({
            success: true,
            message: "New Booking done!",
            data: newBooking,
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message,
        });
    }
};

const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.body.userId })
            .populate("user")
            .populate("show")
            .populate({
                path: "show",
                populate: {
                    path: "movie",
                    model: "movies",
                },
            })
            .populate({
                path: "show",
                populate: {
                    path: "theatre",
                    model: "theatres",
                },
            });

        res.send({
            success: true,
            message: "Bookings fetched!",
            data: bookings,
        });
    } catch (err) {
        res.send({
            success: false,
            message: err.message,
        });
    }
};

module.exports = {
    bookShow,
    makePayment,
    getAllBookings,
};