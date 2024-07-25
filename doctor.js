import express from "express";
// const express=require('express');
import cors from "cors";
import { db } from "./admin.js";
import { getAuth } from "firebase-admin/auth";

//12:09 change
import { getAuth as getClientAuth, signInWithEmailAndPassword } from "firebase/auth";
//12:09 change
import { firebaseClientApp } from "./config.js";


import nodemailer from "nodemailer";
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());


const doctorClientAuth = getClientAuth(firebaseClientApp);//12:09 change

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")){
    return res.status(401).json({ error: "No ID token provided" });
  }

//12:09 change
const idToken = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await getAuth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "purohitrushi1527@gmail.com", // Replace with your email
      pass: "xfjn ieil prvs lyne", // Replace with your email password
    },
  });

  const mailOptions = {
    from: "doctor-email@gmail.com", 
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

app.get("/data", async (req, res) => {
  try {
    // Example Firestore interaction
    const snapshot = await db.collection("doctors").get();
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const userDoc = await db.collection("doctors").doc(userId).get();
    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found" });
    }
    const userData = { id: userDoc.id, ...userDoc.data() };
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/signup", async (req, res) => {
  const { email, password, username, contacts, specialist, description } =
    req.body;
  try {
    // Create user with email and password
    const userRecord = await getAuth().createUser({
      email: email,
      password: password,
    });

    // Save additional user info to Firestore
    await db
      .collection("doctors")
      .doc(userRecord.uid)
      .set({
        username: username || "",
        contacts: contacts || "",
        specialist: specialist || "",
        description: description || "",
        email: userRecord.email,
        createdAt: new Date().toISOString(),
      });

    res
      .status(201)
      .json({ message: "User created successfully", userRecord: userRecord });
  } catch (error) {
    res.status(500).send(error.message);
  }

  // await User.add(data);
});

//12:09 change
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Sign in user with email and password
    const userCredential = await signInWithEmailAndPassword(doctorClientAuth, email, password);
    const user = userCredential.user;

    res.status(200).json({ message: "User signed in successfully", user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// Endpoint for doctor to accept appointment
app.patch("/appointments/:appointmentId/accept", async (req, res) => {
  const { appointmentId } = req.params;
  try {
    // Update appointment status in the database to 'accepted'
    const appointmentRef = db.collection("appointments").doc(appointmentId);
    await appointmentRef.update({ status: "accepted" });

    // Fetch appointment details
    const appointmentDoc = await appointmentRef.get();
    const appointmentData = appointmentDoc.data();

    // Fetch user email
    const userDoc = await db
      .collection("users")
      .doc(appointmentData.userId)
      .get();
    const userData = userDoc.data();

    // Send email notification to the user
    await sendEmail(
      userData.email,
      "Appointment Accepted",
      "Your appointment has been accepted."
    );

    res.status(200).json({ message: "Appointment accepted successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/appntIdfetch", async (req, res) => {
  try {
    const snapshot = await db.collection("appointments").get();
    const appointmentIds = snapshot.docs.map((doc) => doc.id);
    res.status(200).json({ appointmentIds });
  } catch (error){
    res.status(500).send(error.message);
}
});

app.get("/myappointments", authenticate, async (req, res) => {
  const doctorId = req.user.uid;
  try {
    const snapshot = await db.collection("appointments").where("doctorId", "==", doctorId).get();
    const appointments = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).send(error.message);
}
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
