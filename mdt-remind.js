/* ==================================================
   MDT REMIND JAVASCRIPT
   Updated + Safe + Working Version
================================================== */

/* ---------- CONFIG ---------- */
const API_URL = "https://mikrodtech-backend.onrender.com";

/* ==================================================
   DOWNLOAD BUTTON
================================================== */
const downloadBtn = document.getElementById("downloadBtn");

if (downloadBtn) {
  downloadBtn.addEventListener("click", () => {
    const a = document.createElement("a");
    a.href = `${API_URL}/download/mdt-remind`;
    a.click();
  });
}

/* ==================================================
   TIME AGO FUNCTION
================================================== */
function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days === 0) {
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
    return "Just now";
  }

  if (days === 1) return "Yesterday";
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;

  const months = Math.floor(days / 30);
  return `${months} month${months > 1 ? "s" : ""} ago`;
}

/* ==================================================
   DOM ELEMENTS
================================================== */
const reviewsList = document.getElementById("reviewsList");
const avgRatingEl = document.getElementById("avgRating");
const totalReviewsEl = document.getElementById("totalReviews");

const counts = [null, 1, 2, 3, 4, 5].map(i =>
  document.getElementById("count" + i)
);

const bars = [null, 1, 2, 3, 4, 5].map(i =>
  document.getElementById("bar" + i)
);

const stars = document.querySelectorAll("#starRating span");
const submitBtn = document.getElementById("submitReview");
const nameInput = document.getElementById("reviewName");
const commentInput = document.getElementById("comment");

let reviews = [];
let selectedRating = 0;

/* ==================================================
   UPDATE RATING SUMMARY
================================================== */
function updateRatingStats(reviews) {
  if (!avgRatingEl || !totalReviewsEl) return;

  const total = reviews.length;
  totalReviewsEl.textContent = total;

  const countsArr = [0, 0, 0, 0, 0, 0];

  reviews.forEach(r => {
    if (r.rating >= 1 && r.rating <= 5) {
      countsArr[r.rating]++;
    }
  });

  for (let i = 1; i <= 5; i++) {
    if (counts[i]) counts[i].textContent = countsArr[i];

    if (bars[i]) {
      bars[i].style.width =
        total > 0 ? (countsArr[i] / total) * 100 + "%" : "0%";
    }
  }

  const avg =
    total > 0
      ? (
          reviews.reduce((sum, r) => sum + Number(r.rating), 0) / total
        ).toFixed(1)
      : "0.0";

  avgRatingEl.textContent = avg;
}

/* ==================================================
   RENDER REVIEWS
================================================== */
function renderReviews() {
  if (!reviewsList) return;

  reviewsList.innerHTML = "";

  reviews
    .slice()
    .reverse()
    .forEach(r => {
      const div = document.createElement("div");
      div.className = "review";

      div.innerHTML = `
        <p>
          <strong>${r.name}</strong>
          <span class="review-meta">• ${timeAgo(r.date)}</span>
        </p>

        <p>
          Rating:
          <span class="review-rating">${"⭐".repeat(r.rating)}</span>
        </p>

        <p>
          Comment:
          <span class="review-text">${r.comment}</span>
        </p>
      `;

      reviewsList.appendChild(div);
    });

  updateRatingStats(reviews);
}

/* ==================================================
   LOAD REVIEWS
================================================== */
async function loadReviews() {
  try {
    const res = await fetch(`${API_URL}/reviews/mdt-remind`);
    reviews = await res.json();
    renderReviews();
  } catch (error) {
    console.error("Failed to load reviews:", error);
  }
}

/* ==================================================
   STAR RATING
================================================== */
if (stars.length > 0) {
  stars.forEach((star, index) => {
    star.addEventListener("click", () => {
      selectedRating = index + 1;

      stars.forEach((s, i) => {
        s.textContent = i < selectedRating ? "★" : "☆";
      });
    });
  });
}

/* ==================================================
   SUBMIT REVIEW
================================================== */
if (submitBtn) {
  submitBtn.addEventListener("click", async () => {
    const name = nameInput?.value.trim();
    const comment = commentInput?.value.trim();

    if (!name || !comment || selectedRating === 0) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/reviews/mdt-remind`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          rating: selectedRating,
          comment
        })
      });

      const newReview = await res.json();

      reviews.push(newReview);
      renderReviews();

      nameInput.value = "";
      commentInput.value = "";
      selectedRating = 0;

      stars.forEach(s => (s.textContent = "☆"));
    } catch (error) {
      console.error("Submit failed:", error);
      alert("Failed to submit review.");
    }
  });
}

/* ==================================================
   INITIAL LOAD
================================================== */
loadReviews();