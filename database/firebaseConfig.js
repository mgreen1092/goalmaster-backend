const admin = require("firebase-admin");

const serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const serviceAccount= {
    type: "service_account",
    project_id: "goalmaster-79ec8",
    private_key_id: "de87a7c7cd327dc1fa382b2a447f8a80bbc27b2a",
    private_key: JSON.parse(process.env.FIREBASE_PRIVATE_KEY).privateKey,
    client_email: "firebase-adminsdk-j0p3o@goalmaster-79ec8.iam.gserviceaccount.com",
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-j0p3o%40goalmaster-79ec8.iam.gserviceaccount.com"
}

module.exports=admin