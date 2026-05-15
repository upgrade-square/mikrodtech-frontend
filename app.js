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
    <p class="article-meta">📘 ${calculateReadTime(article.content)}</p>
  </div>
`;
    });


    function calculateReadTime(content) {
  const text = content.replace(/<[^>]*>/g, ""); // remove HTML tags
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / 200); // avg reading speed
  return `${minutes} min read`;
}

    articleList += `</div>`;

    modalBody.innerHTML = articleList;
    articleListState = articleList;

    modal.style.display = "flex";
    document.body.style.overflow = "hidden";

    attachArticleClicks();
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
});

const userInput = document.getElementById("user-input");

if (userInput) {

  userInput.addEventListener("focus", () => {
    document.body.classList.add("chatbot-keyboard-open");
  });

  userInput.addEventListener("blur", () => {
    document.body.classList.remove("chatbot-keyboard-open");
  });

}