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
  },

  {
  title: "How to Identify Phishing Attacks",
  content: `
    <p>Phishing attacks are one of the most common ways hackers steal passwords, money, or sensitive information.</p>
    <ul>
      <li>Check for suspicious email addresses and sender names.</li>
      <li>Beware of urgent messages demanding immediate action.</li>
      <li>Look for grammar mistakes or unusual formatting.</li>
      <li>Avoid clicking unknown links — hover to inspect URLs first.</li>
      <li>Never share passwords or account details via email.</li>
    </ul>
    <p>Always verify messages and report suspicious activity to your IT or security team.</p>
  `
},

{
  title: "Starlink vs Fiber Internet: Which is Better?",
  content: `
    <p>Choosing the right internet connection depends on your location and needs.</p>
    <ul>
      <li><strong>Fiber Internet:</strong> Very fast and stable but only available in certain areas.</li>
      <li><strong>Starlink:</strong> Satellite internet that works even in remote locations.</li>
      <li>Fiber usually has lower latency.</li>
      <li>Starlink is ideal for rural homes and businesses.</li>
    </ul>
    <p>MikrodTech helps businesses and homes choose the best connectivity solution.</p>
  `
},

{
  title: "Why Every Business Needs CCTV Security",
  content: `
    <p>CCTV systems protect businesses from theft, vandalism, and security threats.</p>
    <ul>
      <li>Deters criminals from targeting your property.</li>
      <li>Provides video evidence when incidents occur.</li>
      <li>Allows remote monitoring from smartphones.</li>
      <li>Improves employee and customer safety.</li>
    </ul>
    <p>A properly installed system ensures reliable security coverage.</p>
  `
},

{
  title: "Why UPS Systems Are Critical for Offices",
  content: `
    <p>Power outages can cause serious damage to computers and data systems.</p>
    <ul>
      <li>Protects equipment from sudden power loss.</li>
      <li>Prevents data corruption and hardware damage.</li>
      <li>Allows safe shutdown during outages.</li>
      <li>Keeps critical devices running temporarily.</li>
    </ul>
    <p>UPS systems are essential for businesses that rely on technology.</p>
  `
},

{
  title: "How to Protect Your Business from Ransomware",
  content: `
    <p>Ransomware attacks can lock your data and demand payment.</p>
    <ul>
      <li>Always keep backups of important data.</li>
      <li>Use updated antivirus and security tools.</li>
      <li>Avoid downloading suspicious attachments.</li>
      <li>Regularly update operating systems and applications.</li>
    </ul>
    <p>Strong cybersecurity policies greatly reduce risk.</p>
  `
},

{
  title: "What Makes a Reliable Office Network",
  content: `
    <p>A strong office network ensures smooth communication and productivity.</p>
    <ul>
      <li>Structured network cabling.</li>
      <li>Enterprise-grade routers and switches.</li>
      <li>Secure Wi-Fi configuration.</li>
      <li>Proper network segmentation.</li>
    </ul>
    <p>Professional network design prevents downtime and performance issues.</p>
  `
},

{
  title: "How Smart Homes Are Changing Technology",
  content: `
    <p>Smart homes allow users to control devices remotely using smartphones.</p>
    <ul>
      <li>Remote CCTV monitoring.</li>
      <li>Smart lighting and automation.</li>
      <li>Smart locks and security sensors.</li>
      <li>Integration with voice assistants.</li>
    </ul>
    <p>Smart home technology increases convenience and security.</p>
  `
},

{
  title: "Best Internet Providers in Nairobi 2025",
  content: `
    <p>Choosing the right internet provider in Nairobi can save you money and frustration. Here's an honest breakdown of the main options available in 2025.</p>
    <h4>Top Providers to Consider</h4>
    <ul>
      <li><strong>Safaricom Home Fibre:</strong> Widely available, reliable support, packages from KES 2,500/month. Best for homes and small offices already on the Safaricom ecosystem.</li>
      <li><strong>Zuku Fibre:</strong> Competitive pricing with bundled TV options. Coverage is strong in estates like Kilimani, Westlands, and South C.</li>
      <li><strong>Faiba 4G (JTL):</strong> Excellent value for money, especially for businesses. Unlimited packages and strong business support.</li>
      <li><strong>Starlink:</strong> Ideal for areas outside fibre coverage — upcountry homes, rural schools, or remote offices.</li>
      <li><strong>Liquid Intelligent Technologies:</strong> Enterprise-grade connectivity for businesses that need dedicated bandwidth and SLAs.</li>
    </ul>
    <h4>What to Look For</h4>
    <ul>
      <li>Check if fibre is available at your exact location before committing.</li>
      <li>Ask about the contention ratio — shared bandwidth affects speeds during peak hours.</li>
      <li>Always request an SLA (Service Level Agreement) for business connections.</li>
      <li>Test customer support responsiveness before signing a long contract.</li>
    </ul>
    <p>MikrodTech can help you assess your connectivity needs and recommend the right provider for your home or business. <a href="#contact">Contact us</a> for a free consultation.</p>
  `
},
{
  title: "How to Spot an M-Pesa Scam",
  content: `
    <p>M-Pesa fraud is one of the fastest-growing cybercrime categories in Kenya. Fraudsters are sophisticated — here's how to protect yourself.</p>
    <h4>Common M-Pesa Scam Types</h4>
    <ul>
      <li><strong>Wrong transfer scam:</strong> A stranger claims they sent you money by mistake and asks you to reverse it. The original transaction is fake — if you reverse it, you lose real money.</li>
      <li><strong>Agent impersonation:</strong> You receive a call from someone claiming to be an M-Pesa agent or Safaricom support asking for your PIN to "verify your account." Safaricom will never ask for your PIN.</li>
      <li><strong>Fake job/prize SMS:</strong> Messages claiming you've won a prize or been selected for a job that requires a "registration fee" via M-Pesa.</li>
      <li><strong>SIM swap fraud:</strong> Fraudsters obtain a duplicate SIM using your ID details, then intercept your M-Pesa codes.</li>
    </ul>
    <h4>How to Protect Yourself</h4>
    <ul>
      <li>Never share your M-Pesa PIN with anyone — not even Safaricom employees.</li>
      <li>Before reversing a "wrong transfer," verify through the official Safaricom app, not by calling the number that contacted you.</li>
      <li>Register a complex PIN and change it regularly.</li>
      <li>If you suspect a SIM swap, call 100 immediately and visit a Safaricom shop with your original ID.</li>
      <li>Enable transaction notifications and review them daily.</li>
    </ul>
    <p>If you've been defrauded, report to <strong>DCI Kenya</strong> via their website or call the cybercrime hotline at <strong>0800 722 203</strong>.</p>
  `
},
{
  title: "How Long Should a Laptop Last?",
  content: `
    <p>A laptop is a major investment. Knowing when to repair, upgrade, or replace it can save you thousands of shillings.</p>
    <h4>Average Lifespan by Use</h4>
    <ul>
      <li><strong>Light use (browsing, documents):</strong> 5–7 years.</li>
      <li><strong>Business/office use:</strong> 4–5 years with good maintenance.</li>
      <li><strong>Heavy use (design, video, coding):</strong> 3–4 years before performance becomes limiting.</li>
    </ul>
    <h4>Signs It's Time to Act</h4>
    <ul>
      <li>Battery drains within 1–2 hours on a full charge — replace the battery, not the whole laptop.</li>
      <li>The system takes more than 2 minutes to boot — often fixed with an SSD upgrade.</li>
      <li>It can no longer receive OS security updates — this is a security risk, not just a speed issue.</li>
      <li>Repeated overheating — may need thermal paste replacement and fan cleaning.</li>
      <li>Screen, keyboard, or hinge damage that costs more than 60% of a new laptop to repair.</li>
    </ul>
    <h4>Extend Your Laptop's Life</h4>
    <ul>
      <li>Clean the fan vents every 6 months.</li>
      <li>Keep the battery between 20–80% charge when possible.</li>
      <li>Upgrade to an SSD if still on a hard drive — it's one of the best value upgrades available.</li>
      <li>Reinstall the OS every 2–3 years to remove software bloat.</li>
    </ul>
    <p>MikrodTech offers laptop diagnostics, repairs, and upgrades in Nairobi. <a href="#contact">Book a checkup</a> today.</p>
  `
},
{
  title: "Starlink in Kenya: Is It Worth It?",
  content: `
    <p>Starlink by SpaceX has changed the internet landscape in Kenya, especially for areas that fibre hasn't reached. But is it the right choice for you?</p>
    <h4>What Does It Cost?</h4>
    <ul>
      <li><strong>Hardware kit:</strong> Approximately KES 45,000–65,000 (one-time purchase).</li>
      <li><strong>Monthly subscription:</strong> From KES 6,500 for residential plans.</li>
      <li><strong>Business plans:</strong> Higher throughput options available for offices and schools.</li>
    </ul>
    <h4>What Speeds Can You Expect?</h4>
    <ul>
      <li>Download speeds: 50–200 Mbps in most Kenyan locations.</li>
      <li>Latency: 25–60ms — much lower than older satellite options like VSAT.</li>
      <li>Performance can dip during heavy rain or obstructions.</li>
    </ul>
    <h4>Who Should Get Starlink?</h4>
    <ul>
      <li>Homes or businesses outside fibre coverage zones (upcountry, rural, remote).</li>
      <li>Schools and NGOs in underserved areas.</li>
      <li>Backup connectivity for businesses that can't afford downtime.</li>
    </ul>
    <h4>Who Probably Shouldn't?</h4>
    <ul>
      <li>Urban Nairobi residents — fibre is cheaper and faster for the price.</li>
      <li>Budget-conscious users — the upfront hardware cost is significant.</li>
    </ul>
    <p>MikrodTech is an experienced Starlink installer in Kenya. We handle procurement, installation, and configuration. <a href="#contact">Get a quote</a>.</p>
  `
},
{
  title: "Two-Factor Authentication Explained",
  content: `
    <p>Passwords alone are no longer enough. Two-factor authentication (2FA) is one of the most effective security steps you can take — and it takes under 2 minutes to set up.</p>
    <h4>What Is 2FA?</h4>
    <p>2FA requires two things to log in: something you know (your password) and something you have (a code from your phone or an app). Even if someone steals your password, they can't access your account without the second factor.</p>
    <h4>Types of 2FA — Ranked Best to Weakest</h4>
    <ul>
      <li><strong>Authenticator app (best):</strong> Apps like Google Authenticator or Microsoft Authenticator generate a new 6-digit code every 30 seconds. Not linked to your phone number so SIM swap attacks don't work.</li>
      <li><strong>Hardware key:</strong> A physical USB key (like a YubiKey). Extremely secure, used by high-risk individuals and businesses.</li>
      <li><strong>SMS code (common but weaker):</strong> A code sent via text message. Convenient but vulnerable to SIM swap fraud — still far better than no 2FA.</li>
      <li><strong>Email code (weakest 2FA):</strong> Only as secure as your email account itself.</li>
    </ul>
    <h4>Where to Enable 2FA Right Now</h4>
    <ul>
      <li>Your email (Gmail, Outlook) — highest priority.</li>
      <li>Banking apps and M-Pesa web portals.</li>
      <li>Social media accounts (Facebook, Instagram, Twitter/X).</li>
      <li>Any platform storing business or financial data.</li>
    </ul>
    <p>If you're a business, MikrodTech can help implement organisation-wide 2FA policies. <a href="#contact">Talk to our team</a>.</p>
  `
},
{
  title: "How to Back Up Your Business Data",
  content: `
    <p>Data loss can shut down a business. Ransomware, hardware failure, accidental deletion, and theft are all real threats. The good news: a solid backup plan is straightforward to implement.</p>
    <h4>The 3-2-1 Backup Rule</h4>
    <ul>
      <li><strong>3</strong> copies of your data.</li>
      <li><strong>2</strong> stored on different media types (e.g. hard drive + cloud).</li>
      <li><strong>1</strong> copy kept offsite or in the cloud.</li>
    </ul>
    <p>This approach means you can recover your data even if your office burns down, gets flooded, or is hit by ransomware.</p>
    <h4>Recommended Backup Solutions for Kenyan Businesses</h4>
    <ul>
      <li><strong>Google Workspace / Microsoft 365:</strong> Documents, email, and files automatically backed up in the cloud.</li>
      <li><strong>External hard drives:</strong> Weekly backups of critical files. Store one copy at a separate physical location.</li>
      <li><strong>NAS (Network Attached Storage):</strong> On-premise backup server that automatically backs up all devices on your network.</li>
      <li><strong>Cloud backup services:</strong> Backblaze, Acronis, or Veeam for automated encrypted off-site backups.</li>
    </ul>
    <h4>What to Back Up</h4>
    <ul>
      <li>Financial records and invoices.</li>
      <li>Client databases and contracts.</li>
      <li>Employee records and HR documents.</li>
      <li>Website files and databases.</li>
    </ul>
    <p>MikrodTech designs and implements backup systems for businesses in Kenya. <a href="#contact">Contact us</a> to protect your data today.</p>
  `
},
{
  title: "Free vs Paid Antivirus: What's the Difference?",
  content: `
    <p>With so many antivirus options available, it's easy to wonder if you even need to pay. Here's an honest breakdown.</p>
    <h4>What Free Antivirus Gives You</h4>
    <ul>
      <li>Basic malware and virus scanning.</li>
      <li>Real-time protection against known threats.</li>
      <li>Good examples: Windows Defender (built-in), Avast Free, AVG Free.</li>
    </ul>
    <p>For a personal home computer used for light browsing, free antivirus combined with good habits is often sufficient.</p>
    <h4>What Paid Antivirus Adds</h4>
    <ul>
      <li><strong>Ransomware protection:</strong> Dedicated shields that detect and block file-encrypting attacks.</li>
      <li><strong>Phishing protection:</strong> Blocks fake websites that steal passwords.</li>
      <li><strong>Firewall management:</strong> Advanced network traffic filtering.</li>
      <li><strong>VPN:</strong> Encrypts your internet traffic on public Wi-Fi.</li>
      <li><strong>Multi-device coverage:</strong> One license covers your phone, tablet, and laptop.</li>
      <li><strong>Business-grade features:</strong> Centralised management, device monitoring, and policy enforcement.</li>
    </ul>
    <h4>Our Recommendation</h4>
    <ul>
      <li><strong>Home users:</strong> Windows Defender + good browsing habits is enough for most people.</li>
      <li><strong>Small businesses:</strong> Invest in a paid solution like Bitdefender, ESET, or Kaspersky Small Office Security.</li>
      <li><strong>Enterprises:</strong> Enterprise endpoint protection with centralised management (e.g. Microsoft Defender for Business, CrowdStrike).</li>
    </ul>
    <p>MikrodTech can assess your security posture and recommend the right tools for your budget. <a href="#contact">Get in touch</a>.</p>
  `
},
{
  title: "Setting Up a Work-From-Home Office in Kenya",
  content: `
    <p>Remote work is now a permanent feature of the Kenyan job market. A proper home office setup improves productivity, professionalism, and wellbeing.</p>
    <h4>The Essentials</h4>
    <ul>
      <li><strong>Reliable internet:</strong> Minimum 10 Mbps download for solo work; 25 Mbps+ if you have video calls or share with others. Have a backup option (mobile data or a second ISP).</li>
      <li><strong>A UPS (Uninterruptible Power Supply):</strong> Power cuts are common in Nairobi. A UPS keeps your equipment running long enough to save work and shut down safely.</li>
      <li><strong>A proper desk and chair:</strong> Don't underestimate this. Back pain from bad posture is a real productivity killer.</li>
      <li><strong>External monitor:</strong> Even a second screen increases productivity significantly for most knowledge workers.</li>
      <li><strong>Headset with microphone:</strong> Clear audio on calls creates a professional impression and reduces fatigue.</li>
    </ul>
    <h4>Connectivity Tips</h4>
    <ul>
      <li>Connect your computer via ethernet cable instead of Wi-Fi for more stable video calls.</li>
      <li>Place your router centrally and away from walls and appliances.</li>
      <li>If your home is large, use a mesh Wi-Fi system for full coverage.</li>
    </ul>
    <h4>Security for Remote Workers</h4>
    <ul>
      <li>Use a VPN when accessing company systems.</li>
      <li>Keep your home router firmware updated.</li>
      <li>Use a separate network for work devices if possible.</li>
    </ul>
    <p>MikrodTech supplies and installs complete home office setups in Nairobi. <a href="#contact">Contact us</a> for a package quote.</p>
  `
},
{
  title: "Why Your Business Needs a Firewall",
  content: `
    <p>Many small and medium businesses in Kenya believe cyberattacks only target large corporations. This is a dangerous misconception — SMEs are increasingly the primary target because their defences are weaker.</p>
    <h4>What Is a Firewall?</h4>
    <p>A firewall monitors and controls incoming and outgoing network traffic based on security rules. Think of it as a security guard at the gate of your business network — it decides what is allowed in and out.</p>
    <h4>Types of Firewalls</h4>
    <ul>
      <li><strong>Software firewall:</strong> Installed on individual computers. Good for personal devices but not sufficient for a whole office.</li>
      <li><strong>Hardware firewall / UTM device:</strong> A dedicated device protecting your entire office network. Brands like Fortinet, Sophos, and Cisco are widely used.</li>
      <li><strong>Cloud firewall:</strong> Traffic is filtered through a cloud service before reaching your network — ideal for businesses with remote workers.</li>
    </ul>
    <h4>What a Business Firewall Protects Against</h4>
    <ul>
      <li>Unauthorised access to your internal systems.</li>
      <li>Ransomware and malware entering via the network.</li>
      <li>Employees accidentally accessing dangerous websites.</li>
      <li>Data being exfiltrated from your network.</li>
      <li>Denial of service (DoS) attacks disrupting your operations.</li>
    </ul>
    <p>MikrodTech designs and installs firewall solutions for businesses of all sizes in Kenya. <a href="#contact">Talk to our security team</a> for a free assessment.</p>
  `
},
{
  title: "SSD vs HDD: Which Should You Buy?",
  content: `
    <p>Storage is one of the most impactful components in any computer. Choosing between an SSD and an HDD is a decision that will affect your experience every single day.</p>
    <h4>What's the Difference?</h4>
    <ul>
      <li><strong>HDD (Hard Disk Drive):</strong> Uses spinning magnetic platters to store data. Slower, heavier, but cheaper per gigabyte.</li>
      <li><strong>SSD (Solid State Drive):</strong> Uses flash memory chips — no moving parts. Much faster, more durable, and increasingly affordable.</li>
    </ul>
    <h4>Speed Comparison</h4>
    <ul>
      <li>HDD boot time: 45–90 seconds.</li>
      <li>SSD boot time: 10–20 seconds.</li>
      <li>File transfer speed: SSDs are 3–10x faster for typical tasks.</li>
    </ul>
    <h4>When to Choose Each</h4>
    <ul>
      <li><strong>Choose SSD if:</strong> Speed matters, you're using a laptop (more durable to bumps), or you're upgrading an old slow computer.</li>
      <li><strong>Choose HDD if:</strong> You need large storage (2TB+) at low cost, and speed is not critical — e.g. for CCTV footage storage or archiving.</li>
      <li><strong>Best of both:</strong> Many users pair a small SSD (for the OS and apps) with a large HDD (for bulk storage).</li>
    </ul>
    <h4>Our Pick</h4>
    <p>For any new laptop or PC build in 2025, an SSD should be the default choice. A 512GB SSD is sufficient for most users and delivers a dramatically better experience than any HDD.</p>
    <p>MikrodTech supplies and installs SSDs and storage solutions for individuals and businesses. <a href="#contact">Get in touch</a> for pricing.</p>
  `
}

];
document.addEventListener("DOMContentLoaded", () => {
  /* ----------------------------
     KNOWLEDGE HUB MODAL SETUP
  -----------------------------*/
  const readMoreButtons = document.querySelectorAll(".read-more");
  const exploreButtons = document.querySelectorAll(".explore-btn");

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



  let articleListState = null;


  function attachArticleClicks() {

  document.querySelectorAll(".article-list-item").forEach(item => {

    item.addEventListener("click", () => {

      const index = Number(item.dataset.index);
      const article = articles[index];

      modalTitle.textContent = article.title;
      modalBody.innerHTML = article.content;

    });

  });

}

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

 exploreButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    modalTitle.textContent = "All Knowledge Hub Articles";

    let articleList = `<div class="article-list">`;

    articles.slice(4).forEach((article, index) => {
      articleList += `
        <div class="article-list-item" data-index="${index + 4}">
          <h4>${article.title}</h4>
        </div>
      `;
    });

    articleList += `</div>`;

    modalBody.innerHTML = articleList;
    articleListState = articleList;

    modal.style.display = "flex";
    document.body.style.overflow = "hidden";

    attachArticleClicks();
  });
});

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

  if (articleListState && modalTitle.textContent !== "All Knowledge Hub Articles") {
    
    // Return to article list instead of closing
    modalTitle.textContent = "All Knowledge Hub Articles";
    modalBody.innerHTML = articleListState;

    attachArticleClicks(); // reattach click events

  } else {

    modal.style.display = "none";
    document.body.style.overflow = "";
    articleListState = null;

  }

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
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");

  if (!userInput || !sendBtn) return;

  userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendBtn.click();
    }
  });
});


// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function() {
      gtag('event', 'contact_form_submission', {
        'event_category': 'Form',
        'event_label': 'Contact Form'
      });
    });
  }
});


document.getElementById("openChatbotMenu").addEventListener("click", () => {
  const btn = document.querySelector("#chatbot-btn"); // always finds the current version
  if (btn) btn.click();
});

