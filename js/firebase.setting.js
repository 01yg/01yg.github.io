/* firebase setting */
var firebaseConfig = {
    apiKey: "AIzaSyAlBO0eQIsvlo_aC2ILlI-EeFF3e3w7wWg",
    authDomain: "yg-b7bfc.firebaseapp.com",
    databaseURL: "https://yg-b7bfc-default-rtdb.firebaseio.com",
    projectId: "yg-b7bfc",
    storageBucket: "yg-b7bfc.appspot.com",
    messagingSenderId: "900082952918",
    appId: "1:900082952918:web:eb1fa1f55156eb771ab777",
    measurementId: "G-FNJ2L44DZG"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.firestore();
const storage = firebase.storage().ref();