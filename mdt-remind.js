const API_URL = "https://mikrodtech-backend.onrender.com";

/* ==============================
   LOAD REAL DOWNLOAD COUNT
============================== */

async function loadDownloads() {

  try {

    const res = await fetch(`${API_URL}/downloads/mdt-remind`);
    const data = await res.json();

    document.getElementById("downloadCount").textContent = data.count;

  } catch (error) {

    console.error("Failed to load downloads", error);

  }

}

loadDownloads();



/* ==============================
   DOWNLOAD BUTTON
============================== */

const downloadBtn = document.getElementById("downloadBtn");

downloadBtn.addEventListener("click", async () => {

  try {

    const res = await fetch(`${API_URL}/downloads/mdt-remind`, {
      method: "POST"
    });

    const data = await res.json();

    document.getElementById("downloadCount").textContent = data.count;

  } catch (error) {

    console.error("Download tracking failed", error);

  }

  // Start download
  window.location.href = "MDT_Remind.apk";

});



/* ==============================
   STAR RATING SYSTEM
============================== */

const stars = document.querySelectorAll("#starRating span");
let selectedRating = 0;

stars.forEach((star, index) => {

  star.addEventListener("click", () => {

    selectedRating = index + 1;

    stars.forEach((s, i) => {

      s.textContent = i < selectedRating ? "★" : "☆";
      s.classList.toggle("selected", i < selectedRating);

    });

  });

});



/* ==============================
   RATING STATISTICS
============================== */

function updateRatingStats(reviews) {

  let total = reviews.length;

  document.getElementById("totalReviews").textContent = total;

  let counts = {1:0,2:0,3:0,4:0,5:0};

  reviews.forEach(r => {
    counts[r.rating]++;
  });

  let avg = 0;

  if (total > 0) {
    avg = reviews.reduce((sum, r) => sum + r.rating, 0) / total;
  }

  document.getElementById("avgRating").textContent = avg.toFixed(1);

  for (let i = 1; i <= 5; i++) {

    document.getElementById("count" + i).textContent = counts[i];

    let percent = total ? (counts[i] / total) * 100 : 0;

    document.getElementById("bar" + i).style.width = percent + "%";

  }

}


/* ==============================
   LOAD REVIEWS FROM BACKEND
============================== */

async function loadReviews() {

  try {

    const res = await fetch(`${API_URL}/reviews/mdt-remind`);
    const reviews = await res.json();
    updateRatingStats(reviews);
    

    const reviewsList = document.getElementById("reviewsList");

    reviewsList.innerHTML = "";

    reviews.forEach(r => {

      const review = document.createElement("div");

      review.classList.add("review");

      review.innerHTML = `
        <p>Rating: ${"⭐".repeat(r.rating)}</p>
        <p>Comment: ${r.comment}</p>
      `;

      reviewsList.appendChild(review);

    });

  } catch (error) {

    console.error("Failed to load reviews", error);

  }

}

loadReviews();



/* ==============================
   SUBMIT REVIEW
============================== */

const submitReview = document.getElementById("submitReview");

submitReview.addEventListener("click", async () => {

  const name = document.getElementById("reviewName").value.trim();
  const comment = document.getElementById("comment").value.trim();

  if (name === "") {
    alert("Please enter your name.");
    return;
  }


  if (selectedRating === 0) {

    alert("Please select a star rating.");
    return;

  }

  if (comment === "") {

    alert("Please enter a comment.");
    return;

  }

  try {

    await fetch(`${API_URL}/reviews/mdt-remind`, {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

     body: JSON.stringify({
     name: name,
     rating: selectedRating,
     comment: comment
})


    });

    // Reload reviews
    loadReviews();

  } catch (error) {

    console.error("Review submission failed", error);

  }

  // Reset form
  document.getElementById("comment").value = "";
  selectedRating = 0;

  stars.forEach((s) => {
    s.textContent = "☆";
    s.classList.remove("selected");
  });

});