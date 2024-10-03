// config/firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://healthconnet.appspot.com', // Replace with your Firebase project bucket name
});

const bucket = admin.storage().bucket();

module.exports = { bucket };
