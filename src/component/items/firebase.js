import firebase from 'firebase/app'
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDlFQ4LebGPxGNfj28Z52dgDF6NoiP5d-A",
    authDomain: "keijiban-site.firebaseapp.com",
    projectId: "keijiban-site",
    storageBucket: "keijiban-site.appspot.com",
    messagingSenderId: "246351951688",
    appId: "1:246351951688:web:f19ce5a815163f2047e57d",
    measurementId: "${config.measurementId}"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage()

export { storage, firebase as default };