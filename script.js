import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
    import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

    // Your web app's Firebase configuration


  // For Firebase JS SDK v7.20.0 and later, measurementId is optional


  const firebaseConfig = {
    apiKey: "AIzaSyAEsOOvrCEUt_1WKtASJvYrQQbHZDQjo_s",
    authDomain: "login-bijli.firebaseapp.com",
    databaseURL: "https://login-bijli-default-rtdb.firebaseio.com",
    projectId: "login-bijli",
    storageBucket: "login-bijli.firebasestorage.app",
    messagingSenderId: "956625759809",
    appId: "1:956625759809:web:82d20e1a9c81b136d020c0",
    measurementId: "G-LQ8WLHDSZZ"
  };

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    const statusRef = ref(db, "electricity/status");
    const timeRef = ref(db, "electricity/lastUpdated");

    const statusSelect = document.getElementById("status");
    const lastUpdatedText = document.getElementById("lastUpdatedText");

    statusSelect.addEventListener("change", () => {
      const status = statusSelect.value;
      if (status) {
        const now = new Date().toLocaleString("hi-IN", {
          dateStyle: "medium",
          timeStyle: "short"
        });
        set(statusRef, status);
        set(timeRef, now);
      }
    });

    onValue(timeRef, (snapshot) => {
      const time = snapshot.val();
      lastUpdatedText.textContent = "✨ अंतिम अपडेट: " + (time || "---");
    });

    // Comment post logic: REPLACES old comment
    window.postComment = function () {
      const commentBox = document.getElementById("commentInput");
      const commentText = commentBox.value.trim();
      if (!commentText) {
        alert("कृपया कोई टिप्पणी लिखें!");
        return;
      }

      const commentRef = ref(db, "electricity/comment");

      set(commentRef, {
        text: commentText,
        time: new Date().toLocaleString("hi-IN", {
          dateStyle: "medium",
          timeStyle: "short"
        })
      }).then(() => {
        alert("✅ स्टेटस सफलतापूर्वक अपडेट की गई!");
        commentBox.value = "";
      }).catch(err => {
        alert("Error: " + err.message);
      });
    };
