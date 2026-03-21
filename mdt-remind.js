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
    // 1️⃣ Trigger the download
    const a = document.createElement("a");
    a.href = `${API_URL}/download/mdt-remind`; // backend serves APK & increments count
    a.download = "MDT-Remind.apk";
    document.body.appendChild(a);
    a.click();
    a.remove();

    // 2️⃣ Fetch the updated download count
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
   RENDER REVIEWS
============================== */


let justSubmittedIndex = null; // track the last review this user submitted
let editTimers = {}; // store timers to auto-remove edit buttons

const editTimers = {}; // keeps track of setTimeouts for each review

function renderReviews() {
  reviewsList.innerHTML = "";
  const now = new Date();

  reviews.slice().reverse().forEach((r, index) => {
    const review = document.createElement("div");
    review.classList.add("review");
    review.dataset.index = index;

    // Only show edit for the logged-in user's own review within 2 minutes
    let canEdit = false;
    if (typeof currentUserName !== "undefined" && r.name === currentUserName) {
      const reviewDate = new Date(r.date || r.timestamp);
      const diffMinutes = (now - reviewDate) / 60000;
      canEdit = diffMinutes <= 2; // 2-minute limit

      // Automatically remove edit button after 2 minutes
      if (canEdit && !editTimers[index]) {
        const remainingMs = 2 * 60 * 1000 - (now - reviewDate);
        editTimers[index] = setTimeout(() => {
          renderReviews(); // refresh to remove button
        }, remainingMs);
      }
    }

    review.innerHTML = `
      <p><strong>${r.name}</strong> <span class="review-meta">• ${timeAgo(r.date || r.timestamp)}</span></p>
      <p>Rating: <span class="review-rating">${'⭐'.repeat(r.rating)}</span></p>
      <p>Comment: <span class="review-text">${r.comment}</span></p>
      ${canEdit ? `<button class="edit-btn">Edit</button>` : ""}
    `;

    reviewsList.appendChild(review);
  });

  updateRatingStats(reviews);
}


// On submitting a review
submitReviewBtn.addEventListener("click", async () => {
  const name = reviewName.value.trim();
  const comment = commentInput.value.trim();

  if (!name || !selectedRating || !comment) return alert("Fill all fields.");

  try {
    const res = await fetch(`${API_URL}/reviews/mdt-remind`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, rating: selectedRating, comment }),
    });

    const newReview = await res.json();

    reviews.push({ ...newReview.review, timestamp: newReview.review.date });

    // Mark the last submitted review as editable
    justSubmittedIndex = reviews.length - 1;

    // Reset form
    reviewName.value = "";
    commentInput.value = "";
    selectedRating = 0;
    stars.forEach(s => s.textContent = "☆");

    renderReviews();
  } catch (err) {
    console.error("Submit failed", err);
  }
});


/* ==============================
   LOAD REVIEWS (HYBRID)
============================== */
async function loadReviews() {

  // ✅ 1. Load from localStorage first (instant)
  const cached = getLocalReviews();
  if (cached.length) {
    renderReviews(cached);
  }

  // ✅ 2. Then fetch from backend
  try {
    const res = await fetch(`${API_URL}/reviews/mdt-remind`);
    const reviews = await res.json();

    saveLocalReviews(reviews); // sync cache
    renderReviews(reviews);

  } catch (error) {
    console.error("Failed to load reviews", error);
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

    // ✅ Update local instantly
    const cached = getLocalReviews();
    cached.push({
      name,
      rating: selectedRating,
      comment,
      date: new Date().toISOString()
    });
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

/* ==============================
   EDIT SYSTEM
============================== */
document.getElementById("reviewsList").addEventListener("click", async (e) => {
  const parent = e.target.closest(".review");
  if(!parent) return;

  const idx = parent.dataset.index;

 if(e.target.classList.contains("edit-btn")){
  const cached = getLocalReviews();
  const rev = cached[cached.length-1-idx];

  const reviewDate = new Date(rev.date);
  const now = new Date();
  const diffMinutes = (now - reviewDate) / 60000;

  // 🚫 Block edit after 2 minutes
  if (diffMinutes > 2) {
    alert("Edit time expired (2 minutes).");
    return;
  }

  // continue edit...
}

  if(e.target.classList.contains("save-btn")){
    const newRating = parseInt(document.getElementById("editRating").value);
    const newComment = document.getElementById("editComment").value;

    // Update backend
    try {
      await fetch(`${API_URL}/reviews/mdt-remind`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ rating: newRating, comment: newComment })
      });
    } catch(err){ console.error(err); }

    // ✅ Update local
    const cached = getLocalReviews();
    const rev = cached[cached.length-1-idx];
    if (rev) {
      rev.rating = newRating;
      rev.comment = newComment;
      rev.date = new Date().toISOString();
    }
    saveLocalReviews(cached);

    loadReviews();
  }

  if(e.target.classList.contains("cancel-btn")){
    loadReviews();
  }
});

// INITIAL LOAD
loadReviews();