const firebase = require("firebase-admin");
// serviceAccount = JSON.parse(process.env.GOOGLE_CREDS)
const serviceAccount = require('./FirebaseServiceAccountKey.json')
const db = firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
});

module.exports = db;
