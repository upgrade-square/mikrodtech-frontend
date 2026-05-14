 /* ----------------------------
     TOOLS MODAL INTEGRATION
  -----------------------------*/

  const ENABLE_TOOLS = true;


if (ENABLE_TOOLS) {
  const toolButtons = document.querySelectorAll(".tool-btn");

if (!toolButtons.length) {
  console.warn("No tool buttons found");
}

let activeTool = null;
let activeBtn = null;
let toolLoading = false;
let hasGeneratedPassword = false;

function showTool(toolKey, content, btn) {

    // 🚫 Prevent tool from closing while loading
  if (toolLoading && activeTool === toolKey) return;

  const target = document.getElementById(`tool-${toolKey}`);
  if (!target) return;

  const isSameTool = activeTool === toolKey;

  // ✅ TOGGLE OFF
if (isSameTool) {
  toolLoading = false;   // ✅ ADD THIS

  target.classList.remove("active");
  target.innerHTML = "";

  if (activeBtn) {
    activeBtn.textContent = getDefaultLabel(toolKey);
  }

  activeTool = null;
  activeBtn = null;
  return;
}

  
// ❌ close previous tool
document.querySelectorAll(".tool-inline").forEach(el => {
  el.classList.remove("active");
  el.innerHTML = "";
});

// 🚨 ADD THIS RESET SAFETY (IMPORTANT FOR IPLOOKUP)
if (activeTool && activeTool !== toolKey) {
  toolLoading = false;
}

  // reset previous button safely
  if (activeBtn && activeTool) {
    activeBtn.textContent = getDefaultLabel(activeTool);
  }

  // open new tool
  target.innerHTML = content;
  target.classList.add("active");

  activeTool = toolKey;
  activeBtn = btn;

  // ✅ force hide label
  if (btn) {
    btn.textContent = "Hide";
  }
}

// Optional: cleaner button labels
function getDefaultLabel(toolKey) {
  switch (toolKey) {
    case "password": return "Check Now";
    case "iplookup": return "Detect IP";
    default: return "Open Tool";
  }
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

// --- Enforce Strong Requirements (STRICT) ---
const hasUpper = /[A-Z]/.test(pw);
const hasLower = /[a-z]/.test(pw);
const hasNumber = /[0-9]/.test(pw);
const hasSymbol = /[^A-Za-z0-9]/.test(pw);
const hasLength = pw.length >= 8;

// If ANY required condition is missing → cannot be Strong
if ((!hasUpper || !hasLower || !hasNumber || !hasSymbol || !hasLength) && score >= 4) {
  score = 3; // cap at Medium
}

// --- STRICT STRONG RULE ---
if ((!hasNumber || !hasSymbol) && score >= 4) {
  score = 3; // force Medium
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
    case 4:
  return (/[0-9]/.test(pw) && /[^A-Za-z0-9]/.test(pw))
    ? "Strong"
    : "Medium";
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
    e.stopPropagation();

    const tool = btn.dataset.tool;

    switch (tool) {

case "iplookup": {
      toolLoading = true; 


      function render(html) {
  const target = document.getElementById("tool-iplookup");
  if (!target) return;

  target.innerHTML = html;
  target.classList.add("active");
}

showTool("iplookup", `<p>Looking up your public IP and location…</p>`, btn);

const currentTool = "iplookup";
toolLoading = true;
activeTool = currentTool;
activeBtn = btn;
  (async function fetchIpInfo() {

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
     const ipPromise = fetch("https://api.ipify.org?format=json").then(r => r.json());

const ipJson = await fetch("https://api.ipify.org?format=json").then(r => r.json());
const ip = ipJson.ip;

// 🚀 Show IP instantly (fast feedback)
render(`
  <p><strong>Public IP:</strong> ${ip}</p>
  <p><em>Fetching location...</em></p>
`);

fetch(`https://ipapi.co/${ip}/json/`)
  .then(r => r.json())
  .then(geo => {

    let lat = geo.latitude;
    let lon = geo.longitude;

    render(`
      <div>
        <p><strong>Public IP:</strong> ${ip}</p>
        <p><strong>Location:</strong> ${geo.city || ""} ${geo.country_name || ""}</p>
      </div>
    `);

    toolLoading = false; // ✅ unlock tool
  })
  .catch(() => {
    render(`<p><strong>Public IP:</strong> ${ip}</p><p>Location unavailable</p>`);
    toolLoading = false;
  });

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
 showTool("iplookup", updated, btn);

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
         render(html);
          return;
        }
      } catch (e) {
        // ignore fallback error
      }

      // final error message
   render(`
  <p>Sorry — could not retrieve IP information.</p>
  <p style="font-size:0.9em;color:#666">Check your connection or try again.</p>
`);
toolLoading = false;
      console.error("IP lookup error:", err);
    }
  })();

  break;
}



case "password": {
  showTool(
    "password",
    `
      <p>Enter or generate a password to check its strength.</p>

<div class="pw-wrapper">

<div class="pw-field">
  <input type="password" id="pwInput" class="pw-input">

  <div class="pw-actions">
    <button id="togglePw" class="pw-toggle">Show</button>
    <button id="copyPwBtn" class="copy-pw-btn">Copy</button>
  </div>
</div>

  <input type="text" id="pwName"
   placeholder=" Add Name"
    maxlength="6"
    class="pw-input pw-name-input">

</div>

<button id="genPwBtn" class="btn-primary">
  Generate Password
</button>

<div id="strengthBarContainer" class="strength-bar-container">
  <div id="strengthBar" class="strength-bar"></div>
</div>

<p id="pwMeta" class="pw-meta"></p>

<div id="pwSuggestions" class="pw-suggestions"></div>



<hr class="tool-divider">

<div id="resilienceTips" class="resilience-tips">
  <h3>MikrodTech Cyber Resilience Tips</h3>
  <ul>
    <li><span>Turn on 2-Step Login (MFA)</span> – adds a one-time code or fingerprint.</li>
    <li><span>Never reuse passwords</span> – each site should have a unique one.</li>
    <li><span>Use a password manager</span> – safely stores and generates secure passwords.</li>
    <li><span>Watch for fake links</span> – always check the sender or website before clicking.</li>
    <li><span>Keep devices updated</span> – updates fix security flaws automatically.</li>
  </ul>
</div>
    `
, btn
   
  )
  setTimeout(() => {
  const btn = document.getElementById("genPwBtn");
  const input = document.getElementById("pwInput");
  const nameInput = document.getElementById("pwName");

  if (!btn || !input) return;

  btn.style.pointerEvents = "auto";
  btn.style.zIndex = "9999";
  btn.style.position = "relative";



btn.onclick = () => {
  const nameInput = document.getElementById("pwName");

  // ✅ SHOW name field when generating password
  if (nameInput) {
    nameInput.style.display = "block";
    nameInput.focus(); // optional: auto focus it
  }

  const name = nameInput ? nameInput.value.trim().slice(0, 6) : "";

  input.value = generatePassword(14, name);

  hasGeneratedPassword = true;

  btn.textContent = "Regenerate Password";

  modalUpdateUI();
};

}, 0);
  ;

  // ✅ Get elements AFTER rendering
const pwInput = document.getElementById("pwInput");
const usePwBtn = document.getElementById("usePwBtn");
const strengthBar = document.getElementById("strengthBar");
const pwMeta = document.getElementById("pwMeta");
const pwSuggestions = document.getElementById("pwSuggestions");
const togglePw = document.getElementById("togglePw");
const copyPwBtn = document.getElementById("copyPwBtn");

pwInput.addEventListener("input", () => {
  const btn = document.getElementById("genPwBtn");

  if (pwInput.value.length === 0) {
    hasGeneratedPassword = false;

    if (btn) btn.textContent = "Generate Password";
  }
});

// Evaluate password strength
function evaluatePassword(pw) {
  let score = 0;
  const suggestions = [];

  if (pw.length >= 8) score++; else suggestions.push("Use at least 8 characters.");
  if (/[A-Z]/.test(pw)) score++; else suggestions.push("Add uppercase letters.");
  if (/[a-z]/.test(pw)) score++; else suggestions.push("Include lowercase letters.");
  const hasNumber = /[0-9]/.test(pw);
const hasSymbol = /[^A-Za-z0-9]/.test(pw);

if (hasNumber) score++;
else suggestions.push("Add numbers.");

if (hasSymbol) score++;
else suggestions.push("Include special characters (e.g. @, #, $, !).");

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

 if (
  pw.length >= superSecureLength &&
  entropy >= superSecureEntropy &&
  /[A-Z]/.test(pw) &&
  /[a-z]/.test(pw) &&
  hasNumber &&
  hasSymbol
) {
  score = 6;
}

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

 if (score >= 4) {
  copyPwBtn.classList.add("show");
} else {
  copyPwBtn.classList.remove("show");
}
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


// Hide optional name input when password input is focused
pwInput.addEventListener("focus", () => {
  const pwNameInput = document.getElementById("pwName");
  if (pwNameInput) {
    pwNameInput.style.display = "none";
  }
});

// Update on manual input
pwInput.addEventListener("input", modalUpdateUI);


copyPwBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(pwInput.value);

    copyPwBtn.textContent = "Copied ✓";

    setTimeout(() => {
      copyPwBtn.textContent = "Copy";
    }, 1500);

  } catch (err) {
    alert("Copy failed.");
  }
});

// Initial UI update
modalUpdateUI();

  break;
}


      case "ping":
        showTool(
          "Ping & Network Test 🖧",
          `
            <p>🚀 Coming Soon!</p>
            <p>We're working on a powerful network test feature to check your connection latency and server response times.</p>
            <p>Stay tuned — your internet performance insights are on the way!</p>
          `
        );
        break;

      case "downloads":
        showTool(
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

 
}


 

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

