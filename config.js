//   Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { initializeApp as initializeClientApp } from "firebase/app";//12:09 change

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyAp4j0pl948gibO7-YZOKVxATkOxst5P40",
authDomain: "health-care-a29e2.firebaseapp.com",
databaseURL: "https://health-care-a29e2-default-rtdb.firebaseio.com",
projectId: "health-care-a29e2",
storageBucket: "health-care-a29e2.appspot.com",
messagingSenderId: "312712105938",
appId: "1:312712105938:web:33e80c9970c57f48f7020b",
measurementId: "G-TY57LJVKYT"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const firebaseClientApp = initializeClientApp(firebaseConfig);//12:09 change
export { db, auth ,app,firebaseClientApp};//12:09 change
