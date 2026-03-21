const API_URL = "https://mikrodtech-backend.onrender.com";
const LOCAL_KEY = "mdt_reviews_cache";

function saveLocalReviews(reviews) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(reviews));
}

function getLocalReviews() {
  const data = localStorage.getItem(LOCAL_KEY);
  return data ? JSON.parse(data) : [];
}

/* ==============================
   DOWNLOAD SYSTEM
============================== */
async function loadDownloads() {
  try {
    const res = await fetch(`${API_URL}/downloads/mdt-remind`);
    const data = await res.json();
    document.getElementById("downloadCount").textContent = data.count;
  } catch (err) {
    console.error("Failed to load downloads", err);
  }
}

loadDownloads();

const downloadBtn = document.getElementById("downloadBtn");
const downloadCountEl = document.getElementById("downloadCount");

downloadBtn.addEventListener("click", async () => {
  try {
    const a = document.createElement("a");
    a.href = `${API_URL}/download/mdt-remind`;
    a.download = "MDT-Remind.apk";
    document.body.appendChild(a);
    a.click();
    a.remove();

    const res = await fetch(`${API_URL}/downloads/mdt-remind`);
    const data = await res.json();
    downloadCountEl.textContent = data.count;

  } catch (err) {
    console.error("Download failed", err);
  }
});

/* ==============================
   TIME AGO
============================== */
function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days === 0) {
    if (hours > 0) return `${hours} hour${hours>1?"s":""} ago`;
    if (minutes > 0) return `${minutes} min${minutes>1?"s":""} ago`;
    return "Just now";
  } else if (days === 1) return "Yesterday";
  else if (days < 30) return `${days} day${days>1?"s":""} ago`;
  else return `${Math.floor(days/30)} month(s) ago`;
}

/* ==============================
   UPDATE RATING SUMMARY
============================== */
function updateRatingStats(reviews) {
  const avgRatingEl = document.getElementById('avgRating');
  const totalReviewsEl = document.getElementById('totalReviews');
  const counts = [null,1,2,3,4,5].map(i => document.getElementById('count'+i));
  const bars = [null,1,2,3,4,5].map(i => document.getElementById('bar'+i));

  const total = reviews.length;
  totalReviewsEl.textContent = total;

  const countsArr = [0,0,0,0,0,0];
  reviews.forEach(r => countsArr[r.rating]++);

  for(let i=1;i<=5;i++){
    counts[i].textContent = countsArr[i];
    bars[i].style.width = total ? (countsArr[i]/total*100)+'%' : '0';
  }

  const avg = total ? (reviews.reduce((s,r)=>s+r.rating,0)/total).toFixed(1) : '0.0';
  avgRatingEl.textContent = avg;
}

/* ==============================
   RENDER REVIEWS (READ-ONLY)
============================== */
function renderReviews(reviews) {
  const reviewsList = document.getElementById('reviewsList');
  reviewsList.innerHTML = "";

  reviews.slice().reverse().forEach(r => {
    const div = document.createElement("div");
    div.classList.add("review");
    div.innerHTML = `
      <p><strong>${r.name}</strong> <span class="review-meta">• ${timeAgo(r.date || r.timestamp)}</span></p>
      <p>Rating: <span class="review-rating">${'⭐'.repeat(r.rating)}</span></p>
      <p>Comment: <span class="review-text">${r.comment}</span></p>
    `;
    reviewsList.appendChild(div);
  });

  updateRatingStats(reviews);
}

/* ==============================
   LOAD REVIEWS
============================== */
async function loadReviews() {
  // Load from localStorage first
  const cached = getLocalReviews();
  if (cached.length) renderReviews(cached);

  // Then fetch from backend
  try {
    const res = await fetch(`${API_URL}/reviews/mdt-remind`);
    const reviews = await res.json();
    saveLocalReviews(reviews);
    renderReviews(reviews);
  } catch (err) {
    console.error("Failed to load reviews", err);
  }
}

/* ==============================
   STAR SELECTION
============================== */
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

/* ==============================
   SUBMIT REVIEW
============================== */
document.getElementById("submitReview").addEventListener("click", async () => {
  const name = document.getElementById("reviewName").value.trim();
  const comment = document.getElementById("comment").value.trim();

  if (!name || !selectedRating || !comment) {
    return alert("Fill all fields.");
  }

  try {
    await fetch(`${API_URL}/reviews/mdt-remind`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ name, rating: selectedRating, comment })
    });

    // Update local cache
    const cached = getLocalReviews();
    cached.push({ name, rating: selectedRating, comment, date: new Date().toISOString() });
    saveLocalReviews(cached);

    // Reset form
    document.getElementById("reviewName").value = "";
    document.getElementById("comment").value = "";
    selectedRating = 0;
    stars.forEach(s => s.textContent = "☆");

    loadReviews();

  } catch (err) {
    console.error("Submit failed", err);
  }
});

// INITIAL LOAD
loadReviews();