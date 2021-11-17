importScripts("https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.1/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyDlro0XgCOGOEyyHI2X6fTrURvJAw-TESk",
  authDomain: "nutrio-e0798.firebaseapp.com",
  projectId: "nutrio-e0798",
  storageBucket: "nutrio-e0798.appspot.com",
  messagingSenderId: "947923365174",
  appId: "1:947923365174:web:10e1ca6ae3821bf7b1d797",
  measurementId: "G-0NP1VRMRHL",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function (payload) {
//   console.log("Received background message ", payload);

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//   };

//   return self.registration.showNotification(
//     notificationTitle,
//     notificationOptions
//   );
// });
