const API_URL = "https://mikrodtech-backend.onrender.com";

/* ==============================
   DOWNLOAD SYSTEM
============================== */

// Load current download count when page opens
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

// Handle download click
const downloadBtn = document.getElementById("downloadBtn");
const downloadCountEl = document.getElementById("downloadCount");

downloadBtn.addEventListener("click", async () => {
  try {
    // ✅ Start real download (IMPORTANT)
    const a = document.createElement("a");
    a.href = `${API_URL}/MDT_Remind.apk`; // adjust if needed
    a.download = "MDT-Remind.apk";
    document.body.appendChild(a);
    a.click();
    a.remove();

    // ✅ Increment AFTER download starts
    const res = await fetch(`${API_URL}/downloads/mdt-remind`, {
      method: "POST"
    });

    const data = await res.json();
    downloadCountEl.textContent = data.count;

  } catch (err) {
    console.error("Download failed", err);
  }
});


/* ==============================
   HELPER: Convert ISO / Date to Relative
============================== */
function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date; // ms

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days === 0) {
    if (hours > 0) return `${hours} hour${hours>1?"s":""} ago`;
    if (minutes > 0) return `${minutes} min${minutes>1?"s":""} ago`;
    return "Just now";
  } else if (days === 1) return "Yesterday";
  else if (days < 30) return `${days} day${days>1?"s":""} ago`;
  else {
    const months = Math.floor(days / 30);
    return `${months} month${months>1?"s":""} ago`;
  }
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

  const avg = total ? (reviews.reduce((sum,r)=>sum+r.rating,0)/total).toFixed(1) : '0.0';
  avgRatingEl.textContent = avg;
}

/* ==============================
   LOAD REVIEWS FROM BACKEND
============================== */
async function loadReviews() {
  try {
    const res = await fetch(`${API_URL}/reviews/mdt-remind`);
    const reviews = await res.json();

    // Update rating summary
    updateRatingStats(reviews);

    // Render reviews list
    const reviewsList = document.getElementById("reviewsList");
    reviewsList.innerHTML = "";
// Render reviews
reviews.slice().reverse().forEach((r, index) => {
  const review = document.createElement("div");
  review.classList.add("review");
  review.dataset.index = index;

  const reviewDate = new Date(r.date);
  const now = new Date();
  const diffMinutes = (now - reviewDate) / (1000*60);
  const canEdit = r.name === currentUserName && diffMinutes <= 5; // only 5 mins

  review.innerHTML = `
    <p><strong>${r.name}</strong> <span class="review-meta">• ${timeAgo(r.date)}</span></p>
    <p>Rating: <span class="review-rating">${'⭐'.repeat(r.rating)}</span></p>
    <p>Comment: <span class="review-text">${r.comment}</span></p>
    ${canEdit ? `<button class="edit-btn">Edit</button>` : ""}
  `;

  reviewsList.appendChild(review);
});

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
      s.classList.toggle("selected", i < selectedRating);
    });
  });
});

/* ==============================
   SUBMIT NEW REVIEW
============================== */
const submitReview = document.getElementById("submitReview");
submitReview.addEventListener("click", async () => {
  const name = document.getElementById("reviewName").value.trim();
  const comment = document.getElementById("comment").value.trim();

  if (!name) return alert("Please enter your name.");
  if (!selectedRating) return alert("Please select a star rating.");
  if (!comment) return alert("Please enter a comment.");

  try {
    const res = await fetch(`${API_URL}/reviews/mdt-remind`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, rating: selectedRating, comment })
    });

    const data = await res.json();
    if (!data.success) throw new Error("Failed to submit review");

    // Clear form
    document.getElementById("reviewName").value = "";
    document.getElementById("comment").value = "";
    selectedRating = 0;
    stars.forEach(s => { s.textContent = "☆"; s.classList.remove("selected"); });

    // Reload reviews
    loadReviews();

  } catch (error) {
    console.error("Review submission failed", error);
  }
});

/* ==============================
   EDIT / SAVE / CANCEL
============================== */
document.getElementById("reviewsList").addEventListener("click", async (e) => {
  const parentDiv = e.target.closest(".review");
  if(!parentDiv) return;

  const idx = parentDiv.dataset.index;

  if(e.target.classList.contains("edit-btn")){
    const reviewText = parentDiv.querySelector(".review-text").textContent;
    const ratingCount = parentDiv.querySelector(".review-rating").textContent.length;

    parentDiv.innerHTML = `
      <label>Rating:</label>
      <input type="number" min="1" max="5" value="${ratingCount}" id="editRating">
      <label>Comment:</label>
      <textarea id="editComment">${reviewText}</textarea>
      <button class="save-btn">Save</button>
      <button class="cancel-btn">Cancel</button>
    `;
  }

  if(e.target.classList.contains("save-btn")){
    const newRating = parseInt(document.getElementById("editRating").value);
    const newComment = document.getElementById("editComment").value;

    const reviews = await fetch(`${API_URL}/reviews/mdt-remind`).then(r=>r.json());
    const review = reviews[reviews.length-1-idx]; // reverse order

    // PATCH backend or simulate POST update
    try {
      await fetch(`${API_URL}/reviews/mdt-remind`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
          name: review.name,
          rating: newRating,
          comment: newComment
        })
      });
    } catch(err){ console.error(err); }

    loadReviews();
  }

  if(e.target.classList.contains("cancel-btn")){
    loadReviews();
  }
});

// INITIAL LOAD
loadReviews();