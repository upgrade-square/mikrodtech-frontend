// ============================
// MikrodTech JavaScript
// Features: Responsive nav toggle + smooth scrolling
// ============================

// Mobile navigation toggle
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", !expanded);
    mainNav.classList.toggle("active");
  });
}

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    // Only handle on-page links
    if (this.getAttribute("href").startsWith("#")) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 60, // offset for header
          behavior: "smooth"
        });
        // Close mobile nav after click
        mainNav.classList.remove("active");
        navToggle.setAttribute("aria-expanded", false);
      }
    }
  });
});


// Toggle callback form
const callbackBtn = document.getElementById('callbackBtn');
const callbackForm = document.getElementById('callbackForm');

callbackBtn.addEventListener('click', () => {
  callbackForm.classList.toggle('hidden');
});

// Handle "Request a Callback" form submission
document.getElementById('requestCallback').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('callback-name').value.trim();
  const phone = document.getElementById('callback-phone').value.trim();
  const messageBox = document.getElementById('callbackMessage');

  if (!name || !phone) {
    messageBox.textContent = "⚠️ Please fill in all fields.";
    messageBox.className = "error";
    messageBox.classList.remove("hidden");
    return;
  }

  // Remove simulated success message
  // You can handle the actual submission here if needed
});


// Testimonial slider (for 6 testimonials)
const testimonials = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevTestimonial');
const nextBtn = document.getElementById('nextTestimonial');
let currentIndex = 0;

// Function to update active testimonial and dot
function showTestimonial(index) {
  testimonials.forEach((t, i) => t.classList.toggle('active', i === index));
  dots.forEach((d, i) => d.classList.toggle('active', i === index));
}

// Next / previous buttons
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % testimonials.length;
  showTestimonial(currentIndex);
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentIndex);
});

// Dots click
dots.forEach(dot => {
  dot.addEventListener('click', (e) => {
    currentIndex = parseInt(e.target.dataset.index);
    showTestimonial(currentIndex);
  });
});

// Optional: auto-slide every 5 seconds
setInterval(() => {
  currentIndex = (currentIndex + 1) % testimonials.length;
  showTestimonial(currentIndex);
}, 15000);

// Initialize first testimonial
showTestimonial(currentIndex);


// --- Service expand/collapse with Chevron ---
document.querySelectorAll('.service-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-target');
    const detail = document.getElementById(targetId);

    // Close all service details first
    document.querySelectorAll('.service-detail').forEach(d => {
      if (d !== detail) {
        d.classList.add('hidden');
      }
    });

    // Toggle the clicked one
    detail.classList.toggle('hidden');

    // Reset chevrons on all buttons
    document.querySelectorAll('.service-toggle').forEach(b => b.classList.remove('active'));

    // Toggle chevron on the clicked button
    if (!detail.classList.contains('hidden')) {
      button.classList.add('active');
    }
  });
});

document.querySelectorAll('.service-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-target');
    const detail = document.getElementById(targetId);

    // Toggle visibility
    detail.classList.toggle('hidden');

    // Rotate chevron(s) linked to this detail
    document.querySelectorAll(
      `.service-toggle[data-target="${targetId}"] .chevron`
    ).forEach(chevron => {
      chevron.classList.toggle('active');
    });
  });
});

// --- Service expand/collapse with Chevron (final version) ---
document.querySelectorAll('.service-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-target');
    const detail = document.getElementById(targetId);

    if (!detail) return;

    // Close all other service details
    document.querySelectorAll('.service-detail').forEach(d => {
      if (d !== detail) {
        d.classList.add('hidden');
      }
    });

    // Toggle the clicked one
    detail.classList.toggle('hidden');

    // Reset all chevrons
    document.querySelectorAll('.service-toggle .chevron')
      .forEach(chevron => chevron.classList.remove('active'));

    // Rotate chevrons linked to this detail if it's open
    if (!detail.classList.contains('hidden')) {
      document.querySelectorAll(`.service-toggle[data-target="${targetId}"] .chevron`)
        .forEach(chevron => chevron.classList.add('active'));
    }
  });
});

document.getElementById('requestCallback').addEventListener('submit', function(e) {
  e.preventDefault(); // Stop default form submission

  const fname = document.getElementById('callback-firstname').value.trim();
  const sname = document.getElementById('callback-surname').value.trim();
  const altPhone = document.getElementById('callback-altphone').value.trim();
  const messageBox = document.getElementById('callbackMessage');
  const submitBtn = document.querySelector('#requestCallback button[type="submit"]');

  let valid = true;

  // Reset previous errors and messages
  document.querySelectorAll('.error').forEach(el => el.classList.add('hidden'));
  messageBox.classList.add('hidden');
  messageBox.textContent = "";

  // Validate first name
  if (!fname) {
    document.getElementById('fnameError').classList.remove('hidden');
    valid = false;
  }

  // Validate surname
  if (!sname) {
    document.getElementById('snameError').classList.remove('hidden');
    valid = false;
  }

  // Validate alternative phone (required and must start with 0, 10 digits)
  if (!altPhone || !/^0\d{9}$/.test(altPhone)) {
    document.getElementById('altPhoneError').classList.remove('hidden');
    valid = false;
  }

  // Stop submission if validation fails
  if (!valid) return;

  // Show loading state
  submitBtn.disabled = true;
  submitBtn.textContent = " Sending...";

  // Send the callback request via FormSubmit
  fetch("https://formsubmit.co/ajax/sales@mikrodtech.co.ke", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      _subject: "New Callback Request from MikrodTech Website",
      message: `You have received a callback request from ${fname} ${sname}\nPhone: ${altPhone}`
    }),
  })
  .then(res => res.json())
  .then(() => {
    messageBox.textContent = "✅ Callback request received. We’ll call you back shortly.";
    messageBox.className = "success";
    messageBox.classList.remove("hidden");
    document.getElementById('requestCallback').reset();
  })
  .catch(() => {
    messageBox.textContent = "❌ Something went wrong. Please try again.";
    messageBox.className = "error";
    messageBox.classList.remove("hidden");
  })
  .finally(() => {
    // Restore button text and enable it
    submitBtn.disabled = false;
    submitBtn.textContent = "Request Callback";
  });
});


document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault(); // Stop normal form submission

  const name = document.getElementById('name').value.trim();
  const emailInput = document.getElementById('email');
  const email = emailInput.value.trim();
  const message = document.getElementById('message').value.trim();
  const messageBox = document.getElementById('contactMessage');
  const submitBtn = document.querySelector('.contact-form button[type="submit"]');
  const emailError = document.getElementById('emailError'); // 👈 inline error span

  let valid = true;

  // Reset errors/messages
  messageBox.classList.add('hidden');
  messageBox.textContent = '';
  emailError.classList.add('hidden');      // hide error before re-check
  emailInput.classList.remove('border-red-500');

  if (!name) valid = false;

  // Email validation with inline indicator
  if (!email || !/^\S+@\S+\.(com|org|net|edu|gov|ke)$/.test(email)) {
    valid = false;
    emailError.classList.remove('hidden');   // show inline error
    emailInput.classList.add('border-red-500'); // highlight field red
  }

  if (!message) valid = false;

  if (!valid) {
    messageBox.textContent = '⚠️ Please fill all fields correctly.';
    messageBox.className = 'error';
    messageBox.classList.remove('hidden');
    return;
  }

  // Loading state
  submitBtn.disabled = true;
  submitBtn.textContent = ' Sending...';

  // Send via FormSubmit AJAX
  fetch('https://formsubmit.co/ajax/info@mikrodtech.co.ke', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name,
      email: email,
      message: message,
      _subject: 'New Contact Form Submission from Website'
    })
  })
  .then(res => res.json())
  .then(() => {
    messageBox.textContent = '✅ Message received! We will get back to you shortly.';
    messageBox.classList.remove('error');
    messageBox.classList.add('success', 'callback-message');
    messageBox.classList.remove('hidden');
    document.querySelector('.contact-form').reset();
  })
  .catch(() => {
    messageBox.textContent = '❌ Something went wrong. Please try again.';
    messageBox.classList.remove('success');
    messageBox.classList.add('error', 'callback-message');
    messageBox.classList.remove('hidden');
  })
  .finally(() => {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const callbackBtn = document.getElementById("callbackBtn");
  const callbackForm = document.querySelector(".callback-form");

  if (callbackBtn && callbackForm) {
    callbackBtn.addEventListener("click", () => {
      const isHidden = callbackForm.style.display === "none" || callbackForm.style.display === "";
      callbackForm.style.display = isHidden ? "block" : "none";
      callbackBtn.textContent = isHidden ? "Hide Callback Form" : "Request a Callback";
    });
  }
});

const slider = document.querySelector('.testimonial-slider'); // your slider container
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active'); // optional for styling while dragging
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2; // scroll-fast factor
  slider.scrollLeft = scrollLeft - walk;
});

// Touch events for mobile
slider.addEventListener('touchstart', (e) => {
  startX = e.touches[0].pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('touchmove', (e) => {
  const x = e.touches[0].pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;
});


// Swipe detection for changing testimonial on mobile
let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const swipeDistance = touchEndX - touchStartX;
    if (Math.abs(swipeDistance) < 30) return; // ignore tiny swipes
    if (swipeDistance > 0) {
        prevBtn.click(); // swipe right → previous
    } else {
        nextBtn.click(); // swipe left → next
    }
});

// ==== Backend API URL ====
const isLocalhost = (
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname.startsWith("192.168.") ||
  window.location.hostname.startsWith("10.") ||
  window.location.hostname.startsWith("172.")
);

// ==== MikrodTech Speed Test (Cloudflare Integration) ====
document.getElementById("start-speedtest").addEventListener("click", async () => {
  const btn = document.getElementById("start-speedtest");
  const downloadEl = document.getElementById("download-speed");
  const uploadEl = document.getElementById("upload-speed");
  const pingEl = document.getElementById("ping-speed");
  const loader = document.getElementById("loader");

  if (!btn || !downloadEl || !uploadEl || !pingEl) {
    console.error("❌ One or more required elements not found in DOM.");
    return;
  }

  // Reset UI
  btn.disabled = true;
  btn.textContent = "Testing...";
  loader.style.display = "block";
  downloadEl.textContent = uploadEl.textContent = pingEl.textContent = "";

  try {
    // ===== PING TEST =====
    const pingStart = performance.now();
    await fetch("https://speed.cloudflare.com/__down?bytes=1000", { cache: "no-store" });
    const ping = Math.round(performance.now() - pingStart);
    pingEl.textContent = `${ping} `;

    // ===== DOWNLOAD TEST =====
    const downloadStart = performance.now();
    const response = await fetch("https://speed.cloudflare.com/__down?bytes=10000000", { cache: "no-store" });
    const blob = await response.blob();
    const downloadDuration = (performance.now() - downloadStart) / 1000;
    const downloadMbps = Math.round((blob.size * 8) / (downloadDuration * 1024 * 1024));
    downloadEl.textContent = `${downloadMbps} Mbps`;

    // ===== UPLOAD TEST =====
    const payload = new Uint8Array(2 * 1024 * 1024); // 2 MB payload
    const uploadStart = performance.now();
    await fetch("https://speed.cloudflare.com/__up", {
      method: "POST",
      body: payload,
      cache: "no-store",
    });
    const uploadDuration = (performance.now() - uploadStart) / 1000;
    const uploadMbps = Math.round((payload.length * 8) / (uploadDuration * 1024 * 1024));
    uploadEl.textContent = `${uploadMbps} `;

    // Log results
    console.log(`✅ Ping: ${ping} ms, Download: ${downloadMbps} Mbps, Upload: ${uploadMbps} Mbps`);
  } catch (err) {
    console.error("⚠️ Speed test failed:", err);
    downloadEl.textContent = uploadEl.textContent = pingEl.textContent = "Err";
  } finally {
    loader.style.display = "none";
    btn.disabled = false;
    btn.textContent = "Start Test";
  }
});




// ===== Knowledge Hub Modal Logic =====

// Knowledge article content database
const articles = [
  {
    title: "How to Secure Your Wi-Fi",
    content: `
      <p>Your Wi-Fi security is the first line of defense against cyber intrusions.</p>
      <ul>
        <li>Change the default router password.</li>
        <li>Use WPA3 or at least WPA2 encryption.</li>
        <li>Regularly update your router firmware.</li>
        <li>Hide your SSID or limit its visibility to known devices.</li>
        <li>Disable WPS and use strong, unique passwords.</li>
      </ul>
      <p>Following these tips helps you protect sensitive information and prevent unauthorized access.</p>
    `
  },
  {
    title: "Top Free Tools for Network Analysis",
    content: `
      <p>Here are some top-rated free tools for network monitoring and analysis:</p>
      <ul>
        <li><strong>Wireshark:</strong> Deep packet inspection and analysis.</li>
        <li><strong>Nmap:</strong> Network scanning and device discovery.</li>
        <li><strong>Angry IP Scanner:</strong> Quick and easy IP address scanning.</li>
        <li><strong>GlassWire:</strong> Visual firewall and traffic analytics.</li>
        <li><strong>Netcat:</strong> Lightweight network debugging tool.</li>
      </ul>
      <p>These tools are widely used by professionals to secure, analyze, and troubleshoot networks.</p>
    `
  },
  {
    title: "5 Ways to Speed Up Your PC",
    content: `
      <p>Keep your computer running smoothly with these maintenance tips:</p>
      <ul>
        <li>Uninstall unused applications.</li>
        <li>Limit startup programs.</li>
        <li>Run disk cleanup and defragmentation tools.</li>
        <li>Upgrade to an SSD and increase RAM.</li>
        <li>Keep your OS and drivers up to date.</li>
      </ul>
      <p>With consistent maintenance, your PC will stay fast, efficient, and reliable.</p>
    `
  }
];
document.addEventListener("DOMContentLoaded", () => {
  /* ----------------------------
     KNOWLEDGE HUB MODAL SETUP
  -----------------------------*/
  const readMoreButtons = document.querySelectorAll(".read-more");
  const exploreButton = document.querySelector(".btn-secondary");

  // Create modal dynamically if missing
  let modal = document.getElementById("article-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "article-modal";
    modal.className = "modal";
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-btn">&times;</span>
        <h2 id="modal-title"></h2>
        <div id="modal-body"></div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const modalTitle = modal.querySelector("#modal-title");
  const modalBody = modal.querySelector("#modal-body");
  const closeBtn = modal.querySelector(".close-btn");

  // Open modal for Knowledge Hub
  readMoreButtons.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const article = articles[index];
      if (!article) return;

      modalTitle.textContent = article.title;
      modalBody.innerHTML = article.content;
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });

  // Explore All Articles
  if (exploreButton) {
    exploreButton.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      modalTitle.textContent = "More Articles Coming Soon!";
      modalBody.innerHTML = `
        <p>We’re working on adding more expert insights, guides, and tutorials.</p>
        <p><strong>Stay tuned!</strong> New content will be available here soon.</p>
      `;
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  }

  /* ----------------------------
     TOOLS MODAL INTEGRATION
  -----------------------------*/
  const toolButtons = document.querySelectorAll(".tool-btn");
  

  // Helper function
  function showModal(title, content) {
    modalTitle.textContent = title;
    modalBody.innerHTML = content;
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  // Password utilities
  const commonPasswords = [
    "123456", "123456789", "password", "admin", "qwerty", "iloveyou", "welcome"
  ];

  function poolSize(password) {
    let pool = 0;
    if (/[a-z]/.test(password)) pool += 26;
    if (/[A-Z]/.test(password)) pool += 26;
    if (/[0-9]/.test(password)) pool += 10;
    if (/[^A-Za-z0-9]/.test(password)) pool += 32;
    return pool;
  }

  function estimateEntropy(password) {
    const pool = poolSize(password);
    if (pool === 0) return 0;
    return password.length * Math.log2(pool);
  }
// ===== ENTROPY ESTIMATOR =====
function estimateEntropy(pw) {
  let charset = 0;
  if (/[a-z]/.test(pw)) charset += 26;
  if (/[A-Z]/.test(pw)) charset += 26;
  if (/[0-9]/.test(pw)) charset += 10;
  if (/[^A-Za-z0-9]/.test(pw)) charset += 32;
  return pw.length * Math.log2(charset || 1);
}

// ===== PASSWORD EVALUATOR =====
function evaluatePassword(pw) {
  let score = 0;
  const suggestions = [];

  // --- Basic Checks ---
  if (pw.length >= 8) score++;
  else suggestions.push("Use at least 8 characters.");

  if (/[A-Z]/.test(pw)) score++;
  else suggestions.push("Add uppercase letters.");

  if (/[a-z]/.test(pw)) score++;
  else suggestions.push("Include lowercase letters.");

  if (/[0-9]/.test(pw)) score++;
  else suggestions.push("Add numbers.");

  if (/[^A-Za-z0-9]/.test(pw)) score++;
  else suggestions.push("Include special characters (e.g. @, #, $, !).");

  const entropy = estimateEntropy(pw);
  const superReady = pw.length >= 12 && entropy >= 80;

 const superSecureLength = 14; // Minimum for Super Secure
const superSecureEntropy = 95; // Adjusted for 14-char strong mix

if (
  pw.length >= superSecureLength &&
  entropy >= superSecureEntropy &&
  /[A-Z]/.test(pw) &&
  /[a-z]/.test(pw) &&
  /[0-9]/.test(pw) &&
  /[^A-Za-z0-9]/.test(pw)
) {
  score = 6; // Mark as Super Secure
} else if (pw.length < superSecureLength || entropy < superSecureEntropy) {
  suggestions.push(`Use at least ${superSecureLength} characters for Super Secure strength.`);
}


  return { score, entropy, suggestions };
}

// ===== STRENGTH LABELS =====
function scoreLabel(score) {
  switch (score) {
    case 0:
    case 1: return "Weak";
    case 2: return "Fair";
    case 3: return "Medium";
    case 4: return "Strong";
    case 5: return "Excellent";
    case 6: return "Super Secure";
    default: return "";
  }
}

// ===== UPDATE UI =====
const updateUI = () => {
  const pw = pwInput.value;
  const { score, entropy, suggestions } = evaluatePassword(pw);

  const pct = Math.min((score / 6) * 100, 100);
  const roundedEntropy = entropy.toFixed(1); // 1 decimal place

  strengthBar.style.transition = "width 0.4s ease, background 0.4s ease, box-shadow 0.4s ease";
  strengthBar.style.width = pct + "%";

  // --- Color Logic ---
  let color;
  if (score <= 1) color = "#f44336"; // Weak - red
  else if (score === 2) color = "#ff9800"; // Fair - orange
  else if (score === 3) color = "#ffc107"; // Medium - amber
  else if (score === 4) color = "#4caf50"; // Strong - green
  else if (score === 5) color = "#00b37e"; // Excellent - teal
  else color = "#004aad"; // MikrodTech deep blue for Super Secure

  strengthBar.style.background = color;
  strengthBar.style.boxShadow =
    score === 6
      ? "0 0 25px 6px rgba(0,74,173,0.8)"
      : score >= 5
      ? "0 0 15px 3px rgba(0,179,126,0.5)"
      : "none";

  // --- Label + Entropy Display ---
  const label = scoreLabel(score);
  pwMeta.innerHTML = `<strong>${label}</strong> — ${roundedEntropy} bits of entropy`;

  // --- Suggestions ---
  if (score < 6) {
    pwSuggestions.innerHTML =
      "<ul>" +
      suggestions.map(s => `<li>${s}</li>`).join("") +
      "</ul>";
  } else {
    pwSuggestions.innerHTML =
      "<strong>Super Secure!</strong> Your password meets all MikrodTech standards for top-tier security.";
  }

  // --- Show Button Only for Excellent or Super ---
  usePwBtn.style.display = score >= 5 ? "inline-block" : "none";
};



function generatePassword(length = 14, userName = "") {
  // Trim and limit user name to max 6 characters
  userName = userName.trim().slice(0, 6);

  // Character sets
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const special = "!@#$%^&*()-_=+[]{}|;:,.<>?";
  const all = upper + lower + numbers + special;

  // Ensure at least one of each type for security
  let pwArray = [
    upper[Math.floor(Math.random() * upper.length)],
    lower[Math.floor(Math.random() * lower.length)],
    numbers[Math.floor(Math.random() * numbers.length)],
    special[Math.floor(Math.random() * special.length)],
  ];

  // Fill until we have enough characters (excluding username)
  while (pwArray.length < length - userName.length) {
    pwArray.push(all[Math.floor(Math.random() * all.length)]);
  }

  // Shuffle random section
  for (let i = pwArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pwArray[i], pwArray[j]] = [pwArray[j], pwArray[i]];
  }

  // Decide where to insert the whole username
  const positions = ["start", "middle", "end"];
  const pos = positions[Math.floor(Math.random() * positions.length)];

  let finalPassword = "";
  if (!userName) {
    finalPassword = pwArray.join("").slice(0, length);
  } else if (pos === "start") {
    finalPassword = userName + pwArray.join("").slice(0, length - userName.length);
  } else if (pos === "end") {
    finalPassword = pwArray.join("").slice(0, length - userName.length) + userName;
  } else {
    const mid = Math.floor((length - userName.length) / 2);
    const randomPart = pwArray.join("");
    finalPassword =
      randomPart.slice(0, mid) +
      userName +
      randomPart.slice(mid, mid + (length - userName.length - mid));
  }

  // ✅ Absolute enforcement: ensure exactly 14 characters
  return finalPassword.slice(0, length);
}

  // Attach tool button events
  toolButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation(); // <-- prevents scroll-top issue

      const tool = btn.dataset.tool;
      switch (tool) {
case "iplookup": {
  // show a loading modal immediately
  showModal("IP Address Lookup 🌐", `<p>Looking up your public IP and location…</p>`);

  (async function fetchIpInfo() {
    // helper to display the final modal content
    function render(dataHtml) {
      showModal("IP Address Lookup 🌐", dataHtml);
    }

    // helper to detect private/local hostnames
    function isPrivateHostname(hostname) {
      return (
        !hostname ||
        hostname === "localhost" ||
        hostname === "127.0.0.1" ||
        hostname.startsWith("192.168.") ||
        hostname.startsWith("10.") ||
        hostname.startsWith("172.")
      );
    }

    try {
      // If the page is served from a local host, still attempt to fetch public IP.
      // First try a simple service to get the public IP.
      let ipResp = await fetch("https://api.ipify.org?format=json", { cache: "no-store" });
      if (!ipResp.ok) throw new Error("Failed to fetch public IP");
      let ipJson = await ipResp.json();
      let ip = ipJson.ip || "Unknown";

      // Use ipapi.co to get geo details for the IP. (No token required for basic info)
      let geoResp = await fetch(`https://ipapi.co/${ip}/json/`, { cache: "no-store" });
      if (!geoResp.ok) throw new Error("Failed to fetch geo info");
      let geo = await geoResp.json();

      // Build the HTML to show
     // after fetching ip and geo
let lat = geo.latitude ?? geo.lat ?? geo.latitude;
let lon = geo.longitude ?? geo.lon ?? geo.longitude;

const privateNote = isPrivateHostname(window.location.hostname)
  ? `<p style="font-size:0.9em;color:#666">Note: Your browser is loaded from <code>${window.location.hostname}</code>. The public IP shown below belongs to the network your browser is using (your router / ISP), not necessarily your local machine.</p>`
  : "";

// first render a base modal (fast)
render(`
  <div style="line-height:1.4">
    <p><strong>Public IP:</strong> <span id="ip-address">${ip}</span>
      <button id="copy-ip" style="margin-left:8px;padding:4px 8px;cursor:pointer">Copy</button>
    </p>
    ${geo.city || geo.region || geo.country_name ? `
      <p><strong>Location:</strong> ${(geo.city ?? "") + (geo.region ? ", " + geo.region : "") + (geo.country_name ? " — " + geo.country_name : "")}</p>
    ` : `<p><strong>Location:</strong> Not available</p>`}
    <p id="local-ips-placeholder"><em>Detecting device local IP(s)…</em></p>
    ${privateNote}
    <p style="font-size:0.9em;color:#666;margin-top:8px">Data from <a href="https://ipify.org" target="_blank" rel="noopener">ipify</a> and <a href="https://ipapi.co" target="_blank" rel="noopener">ipapi.co</a>.</p>
  </div>
`);

// now fetch local IPs and update the modal
getLocalIPs(1200).then((localIps) => {
  let localHtml;
  if (!localIps || localIps.length === 0) {
    localHtml = `<p><strong>Device local IPs:</strong> Not available (browser blocked or none found)</p>`;
  } else {
    // Format each entry nicely
    const list = localIps.map((it) => {
      if (it.type === "mDNS/obfuscated") {
        return `<li>${it.ip} <small>(mDNS / obfuscated - browser protected)</small></li>`;
      } else {
        return `<li>${it.ip} <small>(${it.type})</small></li>`;
      }
    }).join("");
    localHtml = `<p><strong>Device local IP(s):</strong></p><ul style="margin-top:6px">${list}</ul>`;
  }

  // Replace the placeholder
  const updated = `
    <div style="line-height:1.4">
      <p><strong>Public IP:</strong> <span id="ip-address">${ip}</span>
        <button id="copy-ip" style="margin-left:8px;padding:4px 8px;cursor:pointer">Copy</button>
      </p>
      ${geo.city || geo.region || geo.country_name ? `
        <p><strong>Location:</strong> ${(geo.city ?? "") + (geo.region ? ", " + geo.region : "") + (geo.country_name ? " — " + geo.country_name : "")}</p>
      ` : `<p><strong>Location:</strong> Not available</p>`}
      ${lat && lon ? `<p><strong>Coordinates (IP-based):</strong> ${lat}, ${lon} ${lat && lon ? `(<a href="https://www.google.com/maps/@${lat},${lon},10z" target="_blank">Open map</a>)` : ""}</p>` : ""}
      ${localHtml}
      ${geo.org ? `<p><strong>ISP / Org:</strong> ${geo.org}</p>` : ""}
      ${geo.timezone ? `<p><strong>Timezone:</strong> ${geo.timezone}</p>` : ""}
      ${privateNote}
      <p style="font-size:0.9em;color:#666;margin-top:8px">Data from <a href="https://ipify.org" target="_blank" rel="noopener">ipify</a> and <a href="https://ipapi.co" target="_blank" rel="noopener">ipapi.co</a>. Device local IPs discovered via WebRTC (may be obfuscated by browser privacy features).</p>
    </div>
  `;
  render(updated);

  // hook the copy button
  const copyBtn = document.getElementById("copy-ip");
  if (copyBtn) {
    copyBtn.onclick = () => {
      navigator.clipboard?.writeText(ip).then(() => {
        copyBtn.textContent = "Copied!";
        setTimeout(() => (copyBtn.textContent = "Copy"), 1200);
      }).catch(() => alert("Copy failed — try manually."));
    };
  }
});


      render(html);

      // Set up the copy button (modal content is already in DOM if showModal injects it)
      // Use a small timeout to ensure DOM elements from showModal exist
      setTimeout(() => {
        const copyBtn = document.getElementById("copy-ip");
        if (copyBtn) {
          copyBtn.addEventListener("click", async () => {
            try {
              await navigator.clipboard.writeText(ip);
              copyBtn.textContent = "Copied!";
              setTimeout(() => (copyBtn.textContent = "Copy"), 1500);
            } catch (err) {
              copyBtn.textContent = "Copy failed";
            }
          });
        }
      }, 50);

    } catch (err) {
      // fallback: try ipapi.co/json (it returns caller info and may work if ipify fails)
      try {
        let fallback = await fetch("https://ipapi.co/json/", { cache: "no-store" });
        if (fallback.ok) {
          let geo = await fallback.json();
          const ip = geo.ip || "Unknown";
          const html = `
            <div>
              <p><strong>Public IP:</strong> ${ip}</p>
              <p><strong>Approximate Location:</strong> ${(geo.city ?? "") + (geo.region ? ", " + geo.region : "") + (geo.country_name ? " — " + geo.country_name : "")}</p>
            </div>
          `;
          showModal("IP Address Lookup 🌐", html);
          return;
        }
      } catch (e) {
        // ignore fallback error
      }

      // final error message
      showModal(
        "IP Address Lookup 🌐",
        `<p>Sorry — could not retrieve IP information. (${err.message})</p>
         <p style="font-size:0.9em;color:#666">This can happen on restricted networks, if a third-party service blocked the request, or if you're offline.</p>`
      );
      console.error("IP lookup error:", err);
    }
  })();

  break;
}
case "password": {
  showModal(
    "Password Strength Checker",
    `
      <p>Enter or generate a password to check its strength.</p>

<div style="position:relative;">
  <input type="password" id="pwInput" placeholder="Type password..." class="pw-input">
  <button id="togglePw" type="button"
          style="position:absolute;right:10px;top:50%;transform:translateY(-50%);
                 background:none;border:none;color:#004aad;font-weight:400;
                 cursor:pointer;">Show</button>
</div>




      <button id="genPwBtn"
        style="margin-top:8px;width:100%;padding:10px;background:#0078ff;color:#fff;
               border:none;border-radius:6px;cursor:pointer;font-size:1rem;">Generate Password</button>

      <div id="strengthBarContainer"
        style="width:100%;height:10px;background:#eee;border-radius:6px;margin-top:12px;">
        <div id="strengthBar"
          style="height:100%;width:0%;background:#f44336;border-radius:6px;
                 transition:width 0.3s,background 0.3s;"></div>
      </div>

      <p id="pwMeta" style="margin-top:10px;font-weight:600;"></p>
      <div id="pwSuggestions"
        style="margin-top:8px;font-size:0.9rem;color:#333;"></div>
      <button id="usePwBtn"
        style="display:none;margin-top:10px;padding:10px 14px;background:#00b37e;
               color:#fff;border:none;border-radius:8px;cursor:pointer;">Use This Password</button>

      <hr style="margin:20px 0;">
      <div id="resilienceTips" style="font-size:0.95rem;line-height:1.5;">
       <h3 style="margin-bottom:8px;color:#004aad;">MikrodTech Cyber Resilience Tips</h3>
<ul style="margin-left:18px;list-style:disc;">
  <li><span style="color:black;font-weight:500;">Turn on 2-Step Login (MFA)</span> – adds a one-time code or fingerprint.</li>
  <li><span style="color:black;font-weight:500;">Never reuse passwords</span> – each site should have a unique one.</li>
  <li><span style="color:black;font-weight:500;">Use a password manager</span> – safely stores and generates secure passwords.</li>
  <li><span style="color:black;font-weight:500;">Watch for fake links</span> – always check the sender or website before clicking.</li>
  <li><span style="color:black;font-weight:500;">Keep devices updated</span> – updates fix security flaws automatically.</li>
</ul>

    `
  );
// Password generation modal section
const pwInput = modalBody.querySelector("#pwInput");
const genPwBtn = modalBody.querySelector("#genPwBtn");
const togglePw = modalBody.querySelector("#togglePw");
const strengthBar = modalBody.querySelector("#strengthBar");
const pwMeta = modalBody.querySelector("#pwMeta");
const pwSuggestions = modalBody.querySelector("#pwSuggestions");
const usePwBtn = modalBody.querySelector("#usePwBtn");

// Evaluate password strength
function evaluatePassword(pw) {
  let score = 0;
  const suggestions = [];

  if (pw.length >= 8) score++; else suggestions.push("Use at least 8 characters.");
  if (/[A-Z]/.test(pw)) score++; else suggestions.push("Add uppercase letters.");
  if (/[a-z]/.test(pw)) score++; else suggestions.push("Include lowercase letters.");
  if (/[0-9]/.test(pw)) score++; else suggestions.push("Add numbers.");
  if (/[^A-Za-z0-9]/.test(pw)) score++; else suggestions.push("Include special characters (e.g. @, #, $, !).");

  const charset = 
    (/[a-z]/.test(pw) ? 26 : 0) +
    (/[A-Z]/.test(pw) ? 26 : 0) +
    (/[0-9]/.test(pw) ? 10 : 0) +
    (/[^A-Za-z0-9]/.test(pw) ? 32 : 0);

  const entropy = pw.length * Math.log2(charset || 1);
  const roundedEntropy = entropy.toFixed(1);

  // Super Secure threshold
  const superSecureLength = 14;
  const superSecureEntropy = 95; // 14-char mixed passwords pass

  if (pw.length >= superSecureLength && entropy >= superSecureEntropy) score++;

  // Always show this suggestion until Super Secure
  if (!(pw.length >= superSecureLength && entropy >= superSecureEntropy)) {
    suggestions.push('<span style="color:#004aad;font-weight:400;">Use at least 14 characters for Super Secure strength.</span>');
  }

  return { score, entropy: roundedEntropy, suggestions };
}

// Score labels
function scoreLabel(score) {
  switch (score) {
    case 0:
    case 1: return "Weak";
    case 2: return "Fair";
    case 3: return "Medium";
    case 4: return "Strong";
    case 5: return "Excellent";
    case 6: return "Super Secure";
    default: return "";
  }
}

// Update modal UI
const modalUpdateUI = () => {
  const pw = pwInput.value || "";
  const { score, entropy, suggestions } = evaluatePassword(pw);
  const pct = Math.min((score / 6) * 100, 100);
  strengthBar.style.width = pct + "%";

  let color;
  if (score <= 1) color = "#f44336";
  else if (score === 2) color = "#ff9800";
  else if (score === 3) color = "#ffc107";
  else if (score === 4) color = "#4caf50";
  else if (score === 5) color = "#00b37e";
  else color = "#004aad";

  strengthBar.style.background = color;
  strengthBar.style.boxShadow =
    score === 6
      ? "0 0 25px 6px rgba(0,74,173,0.8)"
      : score >= 4
      ? "0 0 12px 3px rgba(0,179,126,0.5)"
      : "none";

  pwMeta.innerHTML = `<strong>${scoreLabel(score)}</strong> — ${entropy} bits of entropy`;
 pwSuggestions.innerHTML =
  suggestions.length
    ? "<ul>" + suggestions.map(s => `<li>${s}</li>`).join("") + "</ul>"
    : "";

  usePwBtn.style.display = score >= 5 ? "inline-block" : "none";
};

togglePw.addEventListener("click", () => {
  if (pwInput.type === "password") {
    pwInput.type = "text";
    togglePw.textContent = "Hide";
  } else {
    pwInput.type = "password";
    togglePw.textContent = "Show";
  }
});

// Generate password button click
genPwBtn.addEventListener("click", () => {
  let pwNameInput = modalBody.querySelector("#pwName");

if (!pwNameInput) {
  pwNameInput = document.createElement("input");
  pwNameInput.type = "text";
  pwNameInput.id = "pwName";
  pwNameInput.placeholder = "Optional: Add a name (max 6 chars)";
  pwNameInput.classList.add("pw-optional-input"); // assign the CSS class
  genPwBtn.parentNode.insertBefore(pwNameInput, genPwBtn);
}

// Trigger password generation on Enter key
pwNameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // Prevent form submission or page reload
    genPwBtn.click();   // Simulate clicking the Generate Password button
  }
});


  const userName = pwNameInput.value.substring(0,6) || "";
  const newPw = generatePassword(15, userName);
  pwInput.value = newPw;
  modalUpdateUI();
});

// Hide optional name input when password input is focused
pwInput.addEventListener("focus", () => {
  const pwNameInput = modalBody.querySelector("#pwName");
  if (pwNameInput) pwNameInput.remove();
});


// Update on manual input
pwInput.addEventListener("input", modalUpdateUI);

// Use password button
usePwBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(pwInput.value);
    usePwBtn.textContent = "Copied ✓";
    setTimeout(() => (usePwBtn.textContent = "Use This Password"), 1500);
  } catch {
    alert("Copy failed.");
  }
});

// Initial UI update
modalUpdateUI();

  break;
}


      case "ping":
        showModal(
          "Ping & Network Test 🖧",
          `
            <p>🚀 Coming Soon!</p>
            <p>We're working on a powerful network test feature to check your connection latency and server response times.</p>
            <p>Stay tuned — your internet performance insights are on the way!</p>
          `
        );
        break;

      case "downloads":
        showModal(
          "Software Downloads",
          `
            <p>🚀 Coming Soon!</p>
            <p>Our curated collection of free software for security, networking, and productivity is being prepared for you.</p>
            <p>Get ready to download essential tools with ease. </p>
          `
        );
        break;

      default:
        console.warn("Tool not implemented:", tool);
      }
    });
  });

  // Close modal
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
});

const sections = document.querySelectorAll('.fade-up');
window.addEventListener('scroll', () => {
  const triggerBottom = window.innerHeight * 0.85;
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if(sectionTop < triggerBottom){
      section.classList.add('show');
    }
  });
});

// <--code section for the dark & light theme -->

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  const body = document.body;

  // Load saved theme from localStorage
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️";
  }

  // Handle toggle click
  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const isDark = body.classList.contains("dark-mode");

    toggleBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
});

// ==============================
// 📊 Track Page Visit
// ==============================
window.addEventListener("load", () => {
  fetch("https://mikrodtech-backend.onrender.com/api/visits")
    .catch(err => console.error("Counter error:", err));
});

document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("send-btn");
  const userInput = document.getElementById("user-input");
  const messages = document.getElementById("chatbot-messages");

  if (!sendBtn || !userInput || !messages) return;

  // Function to append messages
  function appendMessage(sender, text) {
    const msg = document.createElement("div");
    msg.className = `chatbot-message ${sender}`; // user or bot
    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight; // auto-scroll
  }

  // Function to send user message
  function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;
    appendMessage("user", text);
    userInput.value = "";

    // Simulated bot response (replace with API if needed)
    setTimeout(() => {
      appendMessage("bot", "🤖 Sorry, I cannot respond yet."); 
    }, 500);
  }

  // Send button click
  sendBtn.addEventListener("click", sendMessage);

  // Enter key also sends message
  userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // prevent new line
      sendMessage();
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {

const userInput = document.getElementById("user-input"); // your chatbot input
const sendBtn = document.getElementById("send-btn");     // your send button

// Pressing Enter triggers the Send button
userInput.addEventListener("keydown", function(e) {
  if (e.key === "Enter" && !e.shiftKey) { // ignore Shift+Enter
    e.preventDefault(); // prevent new line in input
    sendBtn.click();    // simulate Send button click
  }
});



  userInput.addEventListener("keydown", function(e) {
  console.log("Key pressed:", e.key);
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendBtn.click();
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => console.log("✅ Service Worker registered"))
      .catch((err) => console.log("❌ Service Worker registration failed:", err));
  });

  
}});