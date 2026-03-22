// mdt-remind.js
const downloadBtn = document.getElementById("downloadBtn");

downloadBtn.addEventListener("click", () => {
  const a = document.createElement("a");
  a.href = `${API_URL}/download/mdt-remind`;
  a.click();
});

// ---------- TIME AGO ----------
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
  } else if (days === 1) return "Yesterday";
  else if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
  else return `${Math.floor(days / 30)} month(s) ago`;
}

// ---------- RATING SUMMARY ----------
const avgRatingEl = document.getElementById("avgRating");
const totalReviewsEl = document.getElementById("totalReviews");
const counts = [null, 1, 2, 3, 4, 5].map((i) => document.getElementById("count" + i));
const bars = [null, 1, 2, 3, 4, 5].map((i) => document.getElementById("bar" + i));

function updateRatingStats(reviews) {
  const total = reviews.length;
  totalReviewsEl.textContent = total;

  const countsArr = [0, 0, 0, 0, 0, 0];
  reviews.forEach((r) => countsArr[r.rating]++);
  for (let i = 1; i <= 5; i++) {
    counts[i].textContent = countsArr[i];
    bars[i].style.width = total ? (countsArr[i] / total) * 100 + "%" : "0";
  }

  const avg = total ? (reviews.reduce((s, r) => s + r.rating, 0) / total).toFixed(1) : "0.0";
  avgRatingEl.textContent = avg;
}

// ---------- RENDER REVIEWS ----------
const reviewsList = document.getElementById("reviewsList");
let reviews = [];

function renderReviews() {
  reviewsList.innerHTML = "";
  reviews
    .slice()
    .reverse()
    .forEach((r) => {
      const div = document.createElement("div");
      div.classList.add("review");
      div.innerHTML = `
        <p><strong>${r.name}</strong> <span class="review-meta">• ${timeAgo(r.date)}</span></p>
        <p>Rating: <span class="review-rating">${"⭐".repeat(r.rating)}</span></p>
        <p>Comment: <span class="review-text">${r.comment}</span></p>
      `;
      reviewsList.appendChild(div);
    });

  updateRatingStats(reviews);
}

// ---------- LOAD REVIEWS ----------
async function loadReviews() {
  try {
    const res = await fetch(`${API_URL}/reviews/mdt-remind`);
    reviews = await res.json(); // comes from SQLite backend
    renderReviews();
  } catch (err) {
    console.error("Failed to load reviews", err);
  }
}

// ---------- STAR SELECTION ----------
const stars = document.querySelectorAll("#starRating span");
let selectedRating = 0;

stars.forEach((star, index) => {
  star.addEventListener("click", () => {
    selectedRating = index + 1;
    stars.forEach((s, i) => {
      s.textContent = i < selectedRating ? "★" : "☆";
    });
  });
});

// ---------- SUBMIT REVIEW ----------
const submitBtn = document.getElementById("submitReview");
const nameInput = document.getElementById("reviewName");
const commentInput = document.getElementById("comment");


submitBtn.addEventListener("click", async () => {
  const name = nameInput.value.trim();
  const comment = commentInput.value.trim();
  if (!name || !selectedRating || !comment) return alert("Please fill all fields.");

  const reviewToPush = {
    name,
    comment,
    rating: selectedRating,
    date: new Date().toISOString() // ← current timestamp
  };

  try {
    // send to backend
    await fetch(`${API_URL}/reviews/mdt-remind`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewToPush),
    });

    // immediately show review
    reviews.push(reviewToPush);
    renderReviews();

    // Reset form
    nameInput.value = "";
    commentInput.value = "";
    selectedRating = 0;
    stars.forEach((s) => (s.textContent = "☆"));
  } catch (err) {
    console.error("Submit review failed", err);
  }
});

// ---------- INITIAL LOAD ----------
loadReviews();