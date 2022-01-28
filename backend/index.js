import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import userModel from "./db/userSchema.js";
import pizzaSchema from "./db/pizzaSchema.js";
import orderSchema from "./db/orderSchema.js";
import nodemailer from "nodemailer";
//const userModel = require("./db/userSchema");

const app = express();
const port = 8888;
const jwtSecret = "ajnc548asd54a45d454fdsfs";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const id = "neelsabne46@gmail.com";
const ps = "neel633506";

const db = "mongodb://localhost:27017/PizzaStore";
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected Successfully!");
    } catch (err) {
        console.log(err.message);
    }
};
connectDB();

//Routs
app.get("/getpizza", (req, res) => {
    pizzaSchema.find({}, (err, data) => {
        if (err) throw err;
        else res.send(data);
    });
});

app.get("/getorder", (req, res) => {
    orderSchema.find({}, (err, data) => {
        if (err) throw err;
        else res.send(data);
    });
});

app.post("/login", (req, res) => {
    userModel.findOne({ email: req.body.email }, (err, user) => {
        if (user) {
            if (req.body.password === user.pass) {
                let payload = { uid: user.email };
                let det = {
                    fname: user.fname,
                    lname: user.lname,
                    email: user.email,
                };
                const token = jwt.sign(payload, jwtSecret, {
                    expiresIn: 360000,
                });
                res.send({
                    message: "Login Successfull!",
                    userDet: det,
                    token: token,
                });
            } else {
                res.send({ message: "Password didn't match!!" });
            }
        } else {
            res.send({ message: "User not registered" });
        }
    });
});

app.post("/signup", (req, res) => {
    console.log(req.body.fname);
    userModel.findOne({ email: req.body.email }, (err, user) => {
        if (user) {
            res.send({ message: "User Already Registered" });
        } else {
            let field = {
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                pass: req.body.cpass,
            };
            let ins = new userModel(field);
            ins.save((err) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send({ flg: 1, message: "Registered Successfully!" });
                }
            });
        }
    });
});

app.post("/cartdetails", (req, res) => {
    let field = {
        orderuser: req.body.orderuser,
        cardnumber: req.body.cardnumber,
        total: req.body.total,
    };
    let ins = new orderSchema(field);
    ins.save((err) => {
        if (err) {
            res.send("Error");
        } else {
            res.send({ flag: 1, msg: "Details Added" });
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                    user: id,
                    pass: ps,
                },
            });

            let mailOptions = {
                from: "neelsabne46@gmail.com",
                to: "neelsabne46@gmail.com",
                subject: "Order Confirmed!",
                text: "Your Pizza Order is Recived! and will be delivered in 20 min. Stay Awake!",
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Email sent: " + info.response);
                }
            });
        }
    });
});

// Running Server on Port
app.listen(port, () => {
    console.log(`Server Running on Port ${port}`);
});
