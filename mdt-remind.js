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
  

    [...reviews].reverse().forEach(r => {

  const review = document.createElement("div");
  review.classList.add("review");

  const timeAgo = getTimeAgo(r.date);

  review.innerHTML = `
    <div class="review-header">
      <span class="review-name">${r.name}</span>
      <span class="review-date">${timeAgo}</span>
    </div>

    <div class="review-rating">
      ${"⭐".repeat(r.rating)}
    </div>

    <p class="review-comment">${r.comment}</p>
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

// Handle click on Edit buttons
document.addEventListener('click', function(e) {
  if (e.target && e.target.classList.contains('editReviewBtn')) {
    const reviewDiv = e.target.closest('.review');
    const commentP = reviewDiv.querySelector('.comment-text');

    // Check if already in edit mode
    if (commentP.querySelector('textarea')) return;

    const currentText = commentP.textContent;
    
    // Replace comment text with a textarea
    commentP.innerHTML = `<textarea rows="3">${currentText}</textarea>
                          <button class="saveReviewBtn">Save</button>
                          <button class="cancelReviewBtn">Cancel</button>`;
  }

  // Handle save
  if (e.target && e.target.classList.contains('saveReviewBtn')) {
    const reviewDiv = e.target.closest('.review');
    const textarea = reviewDiv.querySelector('textarea');
    const newText = textarea.value.trim();

    if (newText) {
      reviewDiv.querySelector('.comment-text').textContent = newText;
    } else {
      reviewDiv.querySelector('.comment-text').textContent = "No comment provided";
    }
  }

  // Handle cancel
  if (e.target && e.target.classList.contains('cancelReviewBtn')) {
    const reviewDiv = e.target.closest('.review');
    const textarea = reviewDiv.querySelector('textarea');
    reviewDiv.querySelector('.comment-text').textContent = textarea.defaultValue;
  }
});

const EDIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes in milliseconds

document.addEventListener('click', function(e) {
  if (e.target && e.target.classList.contains('editReviewBtn')) {
    const reviewDiv = e.target.closest('.review');
    const commentP = reviewDiv.querySelector('.comment-text');
    
    const timestamp = parseInt(reviewDiv.dataset.timestamp);
    const now = Date.now();

    if (now - timestamp > EDIT_WINDOW_MS) {
      alert("You can only edit comments within 5 minutes of posting.");
      return;
    }

    // Prevent multiple textareas
    if (commentP.querySelector('textarea')) return;

    const currentText = commentP.textContent;

    // Replace comment text with a textarea + buttons
    commentP.innerHTML = `
      <textarea rows="3">${currentText}</textarea>
      <button class="saveReviewBtn">Save</button>
      <button class="cancelReviewBtn">Cancel</button>
    `;
  }

  // Save edited comment
  if (e.target && e.target.classList.contains('saveReviewBtn')) {
    const reviewDiv = e.target.closest('.review');
    const textarea = reviewDiv.querySelector('textarea');
    const newText = textarea.value.trim();

    reviewDiv.querySelector('.comment-text').textContent = newText || "No comment provided";
  }

  // Cancel editing
  if (e.target && e.target.classList.contains('cancelReviewBtn')) {
    const reviewDiv = e.target.closest('.review');
    const textarea = reviewDiv.querySelector('textarea');
    reviewDiv.querySelector('.comment-text').textContent = textarea.defaultValue;
  }
});

// Optional: disable expired edit buttons on page load
document.querySelectorAll('.review').forEach(reviewDiv => {
  const timestamp = parseInt(reviewDiv.dataset.timestamp);
  if (Date.now() - timestamp > EDIT_WINDOW_MS) {
    const btn = reviewDiv.querySelector('.editReviewBtn');
    if (btn) btn.disabled = true;
  }
});