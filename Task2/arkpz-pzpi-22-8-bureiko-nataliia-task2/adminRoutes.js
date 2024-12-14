const express = require("express");
const database = require("../connect");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config({path: "./config.env"})
const verifyToken = require("../authMiddleware");

let adminRoutes = express.Router();
const SALT_ROUNDS = 6

// Get all admins
adminRoutes.route("/admins").get(verifyToken, async (request, response) => {
    let db = database.getDb();
    let data = await db.collection("admins").find({}).toArray();

    if (data.length > 0) {
        response.json(data);
    } else {
        response.status(404).send("No admins found");
    }
});

// Get admin by ID
adminRoutes.route("/admins/:id").get(verifyToken, async (request, response) => {
    let db = database.getDb();
    let data = await db.collection("admins").findOne({ _id: new ObjectId(request.params.id) });

    if (data) {
        response.json(data);
    } else {
        response.status(404).send("Admin not found");
    }
});

// Update an existing admin
adminRoutes.route("/admins/:id").put(verifyToken, async (request, response) => {
    let db = database.getDb();

    const hash = await bcrypt.hash(request.body.password, SALT_ROUNDS)

    let mongoObject = {
        $set: {
            firstName: request.body.firstName,
            surname: request.body.surname,
            email: request.body.email,
            password: hash,
        },
    };

    let data = await db.collection("admins").updateOne(
        { _id: new ObjectId(request.params.id) },
        mongoObject
    );

    response.json(data)
});

// Delete an admin
adminRoutes.route("/admins/:id").delete(verifyToken, async (request, response) => {
    let db = database.getDb();
    let data = await db.collection("admins").deleteOne({ _id: new ObjectId(request.params.id) });
    response.json(data)
});

//Login
adminRoutes.route("/admins/login").post(async (request, response) => {
    let db = database.getDb()

    const user = await db.collection("admins").findOne({email: request.body.email})

    if (user) {
        let confirmation = await bcrypt.compare(request.body.password, user.password)
        
        if (confirmation) { 
            const token = jwt.sign(user, process.env.SECRETKEY, {expiresIn: "1h"})
            response.json({success: true, token})
        } else {
            response.json({success: false, message: "Incorrect password"})
        }
    } else {
        response.json({success: false, message: "User is not found"})
    }
    
})

//should be deleted later
adminRoutes.route("/admins").post(async (request, response) => {
    let db = database.getDb()

    const takenEmail = await db.collection("admins").findOne({email: request.body.email})

    if (takenEmail) {
        response.json({message: "This email is taken"})
    } else {
        const hash = await bcrypt.hash(request.body.password, SALT_ROUNDS)

        let mongoObject = {
            firstName: request.body.firstName,
            surname: request.body.surname,
            email: request.body.email,
            password: hash,
        }
        let data = await db.collection("admins").insertOne(mongoObject)

        response.json(data)
    }
    
})

module.exports = adminRoutes;
