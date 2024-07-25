import express from "express";
// const express=require('express');
import cors from "cors";
import { db } from "./admin.js";

import { getAuth } from "firebase-admin/auth";

//12:09 change
import { getAuth as getClientAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseClientApp } from "./config.js";

const app = express();
const PORT = process.env.PORT || 3008;
app.use(express.json());
app.use(cors());


const userClintAuth = getClientAuth(firebaseClientApp);// 12:09 am change

//12:09 am change
const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No ID token provided" });
  }

  const idToken = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await getAuth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};//12:09 change

app.get("/data", async (req, res) => {
  try {
    // Example Firestore interaction
    const snapshot = await db.collection("users").get();
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
// Booking an appointment
app.post("/appointments", async (req, res) => {
  const { userId, doctorId, datetime } = req.body;
  try {
    const appointmentData = {
      userId,
      doctorId,
      datetime,
      createdAt: new Date().toISOString(),
    };
    const appointmentRef = await db
      .collection("appointments")
      .add(appointmentData);
    res.status(201).json({
      message: "Appointment booked successfully",
      id: appointmentRef.id,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/signup", async (req, res) => {
  const { email, password, username, contacts } = req.body;
  try {
    // Create user with email and password
    const userData = await getAuth().createUser({
      email: email,
      password: password,
    });
    // Save additional user info to Firestore
    await db.collection("users").doc(userData.uid).set({
      username: username,
      contacts: contacts,
      email: userData.email,
      createdAt: new Date().toISOString(),
    });

    res
      .status(200)
      .json({userData: userData});
  } catch (error) {
    res.status(500).send(error.message);
  }
  
});



//12:09 change
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Sign in with Firebase Client SDK to verify credentials
    const userCredential = await signInWithEmailAndPassword(userClintAuth, email, password);
    const user = userCredential.user;
    const idToken = await user.getIdToken();

    // Fetch additional user info from your database if needed
    const userInfo = {
      email: user.email,
      displayName: user.displayName,
      uid: user.uid,
      // Add any other non-sensitive user info here
    };

    res.status(200).json({ message: "User signed in successfully", idToken, userInfo });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

 


app.patch("/update/:userId", async (req, res) => {
  const { userId } = req.params;
  const updates = req.body;

  try {
    // Check if the document exists
    const userDoc = db.collection("users").doc(userId);
    const docSnapshot = await userDoc.get();

    if (!docSnapshot.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user info
    await userDoc.update(updates);

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete("/delete/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    await db.collection("users").doc(userId).delete();
    await getAuth().deleteUser(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
