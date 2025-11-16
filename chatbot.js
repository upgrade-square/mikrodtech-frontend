document.addEventListener("DOMContentLoaded", () => {
  const chatbotBtn = document.getElementById("chatbot-btn");
  const chatbotBox = document.getElementById("chatbot-box");
  const closeChat = document.getElementById("close-chat");
  const sendBtn = document.getElementById("send-btn");
  const userInput = document.getElementById("user-input");
  const messages = document.getElementById("chatbot-messages");
  const innerMessages = document.getElementById("chatbot-messages-inner");
/* ----------------------------
    🧠 MIKRODTECH KNOWLEDGE BASE
-----------------------------*/
const mikrodTechKB = {
  // 🏢 Company Info
  "what is mikrodtech": "MikrodTech is a professional technology solutions provider offering modern, secure, and reliable tech services for individuals, schools, and businesses across Kenya.",
  
  "who owns mikrodtech": "MikrodTech was founded by Wabwile Simati Rodney Mike, a cybersecurity specialist and software developer passionate about building secure and innovative technology solutions.",
  
  "where is mikrodtech located": "MikrodTech operates in Kenya and serves clients countrywide through onsite and remote service delivery.",
  
  "when was mikrodtech founded": "MikrodTech began as a passion for secure and reliable technology, later evolving into a professional brand serving homes, offices, and institutions.",
  
  "what does mikrodtech mean": "MikrodTech combines 'Mike' and 'Rod' — the founder’s names — with 'Tech' to form a brand focused on smart, modern, and reliable technology.",
  
  "tell me more about mikrodtech": `
MikrodTech is a technology solutions provider dedicated to delivering innovative, dependable, and secure tech services. 
Our mission is to simplify technology for clients across Kenya, while our vision is to become a leading tech provider in East Africa — known for excellence, integrity, and trust.

Our services cover:
• Computers & Hardware  
• Networking & Internet  
• Security & Surveillance  
• Power & Backup Solutions  
• Business & POS

For inquiries, contact us at +254769329029 or email: info@mikrodtech.co.ke.
  `,

 "mikrodtech ecosystem": `
🌐 **MikrodTech Ecosystem (Upcoming)**

The MikrodTech Ecosystem is an integrated technology platform unifying all our products and services into a seamless, intelligent environment. It reflects our mission of simplifying technology, enhancing productivity, and maintaining trust and security in every solution we provide.

**Key Sub-Ecosystems:**
• **MikrodAI** – AI-driven solutions for businesses and individuals, including automation, analytics, and intelligent assistants.
• **MikrodHome** – Smart home solutions integrating security, energy, and convenience for connected living.
• **MikrodSecure** – Advanced cybersecurity and surveillance tools to protect people, devices, and networks.
• **MikrodPower** – Reliable power backup, UPS, and smart energy management systems.
• **MikrodBusiness** – POS, workflow automation, and productivity tools tailored for enterprises.

📌 Keep watching — we will roll out updates and new features soon!
`,


  // 🛠️ Services
  "what services do you offer": `
**MikrodTech Services**



*Computers & Hardware*
• Computer sales & installation   
• Printer setup & troubleshooting  
• OS installation & optimization  
• Productivity software setup  
• Gaming accessories setup  

*Networking & Internet*
• Network design & configuration  
• Device discovery & vulnerability scanning  
• Wi-Fi setup & optimization  
• LAN/WAN installations  
• Network monitoring & troubleshooting  

*Security & Surveillance*
• CCTV & IP camera installation  
• Access control systems  
• Cybersecurity audits & protection  
• Intrusion detection & prevention (IDS/IPS)  

⚡ *Power & Backup*
• UPS & inverter installation  
• Power backup system setup  

*Business & POS*
• POS system setup & configuration  

Would you like details on a specific service?
`,

  "do you install cctv": "Yes! MikrodTech installs high-quality CCTV systems for homes, offices, and institutions — including setup, configuration, and remote monitoring.",
  
  "do you fix computers": "Yes, we repair, optimize, and maintain computers, including software installation and performance tuning.",
  
  "do you offer networking services": "Absolutely! We design, install, configure, and troubleshoot wired and wireless networks, including routers, switches, servers, and Wi-Fi systems.",
  
  "do you sell computers": "Yes, we supply quality computers, printers, accessories, and provide installation and warranty support.",
  
  "do you offer cybersecurity services": "Yes, MikrodTech offers cybersecurity audits, threat protection, device security, and network monitoring.",
  
  "do you do installations": "Yes, we install computers, networks, CCTV, access control, printers, POS systems, and more.",
  
  "do you build websites": "Yes! We design and develop professional, secure, and responsive websites for schools and businesses.",
  
  "do you create software": "Yes, we build custom software systems, including school management and business solutions.",


  // 🧰 Support & Contact
  "how can i contact mikrodtech": "You can reach us through our website, LinkedIn page, or by email at info@mikrodtech.co.ke.",
  
  "what are your working hours": "We are available Monday–Saturday, 8:00 AM – 6:00 PM. Remote support available anytime.",
  
  "how can i get a quote": "Request a quote on our website or describe your needs here — we’ll respond with personalized pricing.",
  
  "how do i request a service": "Simply tell us what you need or use the request form on our website. We’ll follow up with next steps.",
  
  "do you offer remote support": "Yes, MikrodTech provides fast remote troubleshooting and system support across Kenya.",


  // 🏗️ Projects
  "what projects have you done": "We have built school websites, developed a student progress tracking system for orphan programs, and installed secure networks and systems for institutions.",
  
  "do you make school systems": "Yes, we develop flexible school systems that help sponsors and institutions track student performance, records, and progress.",


  // 🌐 Social Media
  "do you have social media": "Yes — we are active on LinkedIn. Search for 'MikrodTech'. We do not use Facebook.",
  
  "where can i find mikrodtech online": "Visit our website at mikrodtech.co.ke or follow us on LinkedIn for updates and projects.",


  // 💡 Brand & Vision
  "what is your tagline": "Our tagline is 'Smart Solutions. Trusted Tech.'",
  
  "why choose mikrodtech": "We combine expertise, security, innovation, and reliability to deliver long-lasting solutions tailored to client needs.",
  
  "what makes mikrodtech different": "We focus on security, precision, and innovation — not just fixing problems, but preventing them with long-term, reliable solutions.",


  // 💬 Friendly / Small Talk
  "hello": "Hello! How can MikrodTech assist you today?",
  "hi": "Hi! How can we help you with computers, networking, or tech services?",
  "how are you": "I'm doing great and ready to assist! What can MikrodTech help you with?",
  "thanks": "You're welcome! MikrodTech is always happy to serve.",
  "bye": "Goodbye! Have a great day — from MikrodTech.",
  "who are you": "I'm the MikrodTech Assistant 🤖 — here to help you explore our services, projects, and solutions."
};

  /* ----------------------------
      🔎 LOCAL KNOWLEDGE SEARCH
  -----------------------------*/
  function searchKnowledgeBase(input) {
    const lowerInput = input.toLowerCase();
    for (const [question, answer] of Object.entries(mikrodTechKB)) {
      if (lowerInput.includes(question) || question.includes(lowerInput)) {
        return answer;
      }
    }
    return null;
  }

  function removeIrrelevantWords(text) {
  // Remove "Student" if it appears on its own line
  return text
    .split("\n")
    .filter(line => line.trim().toLowerCase() !== "student")
    .join("\n");
}


  /* ============================
     🗣️ MULTI-TURN CONTEXT ENGINE
     ============================ */
  let lastTopic = null;
  let lastAnswer = "";

  function getContextualReply(input) {
    const lower = input.toLowerCase().trim();

    // Handle follow-ups like "tell me more" or "details"
    if (lastTopic && (lower.includes("more") || lower.includes("details") || lower.includes("tell me more"))) {
      switch (lastTopic) {
        case "cctv":
          return "Our CCTV packages include HD and IP cameras, DVR/NVR setup, and remote mobile viewing configuration.";
        case "cybersecurity":
          return "We provide vulnerability scanning, threat monitoring, and secure network configurations for both schools and businesses.";
        case "network":
          return "Our network setups include structured cabling, router configuration, access point installations, and Wi-Fi optimization.";
        case "computers":
          return "We supply branded and custom-built computers, printers, and accessories with installation, warranty, and maintenance support.";
        default:
          return "Sure! Could you specify what you'd like to know more about — for example CCTV, networking, or cybersecurity?";
      }
    }

    if (lastTopic && (lower.includes("what else") || lower.includes("other services"))) {
      return `Besides ${lastTopic}, we also handle computers, printers, CCTV, networking, cybersecurity, and POS systems — basically everything tech under one roof.`;
    }


    if (lower.includes("thanks") || lower.includes("thank you")) {
      return "You're welcome!  Anything else you'd like to know about MikrodTech or our services?";
    }



    // Check KB
    const kbAnswer = searchKnowledgeBase(lower);
    if (kbAnswer) {
      if (lower.includes("cctv")) lastTopic = "cctv";
      else if (lower.includes("cybersecurity") || lower.includes("ethical")) lastTopic = "cybersecurity";
      else if (lower.includes("network") || lower.includes("wifi") || lower.includes("router")) lastTopic = "network";
      else if (lower.includes("computer") || lower.includes("printer")) lastTopic = "computers";
      else lastTopic = null;
      lastAnswer = kbAnswer;
      return kbAnswer;
    }

    return null;
  }

  /* ----------------------------
      💬 CHAT FUNCTIONALITY
  -----------------------------*/
  const savedMessages = JSON.parse(sessionStorage.getItem("mikrodtech-chat")) || [];
  savedMessages.forEach((msg) => appendMessage(msg.sender, msg.text, false));

  chatbotBtn.addEventListener("click", () => {
    chatbotBox.style.display = "flex";
    chatbotBtn.style.display = "none";
    setTimeout(() => userInput.focus(), 100);
  });

  closeChat.addEventListener("click", () => {
    chatbotBox.style.display = "none";
    chatbotBtn.style.display = "block";
  });

  

// --- Keep keyboard open on mobile after sending ---
function handleSend(e) {
  e.preventDefault();
  e.stopPropagation();

  // Immediately prevent blur (important for Android)
  const wasFocused = document.activeElement === userInput;

  sendMessage(); // your existing sendMessage() logic

  // Re-focus after small delay (lets DOM updates finish)
  if (wasFocused) {
    setTimeout(() => {
      userInput.focus();
    }, 120);
  }
}

// Use pointerdown for instant reaction on touch devices
sendBtn.addEventListener("pointerdown", handleSend);


// Allow Enter key to send message
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) { // Enter without Shift
    e.preventDefault(); // Prevent new line in input
    sendMessage();       // Call your existing sendMessage() function
  }
});

  function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    appendMessage("user", text);
    saveMessage("user", text);
    userInput.value = "";
    showTyping();


    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname.startsWith("192.168.") ||
      window.location.hostname.startsWith("10.") ||
      window.location.hostname.startsWith("172.");

    const API_BASE = isLocalhost
      ? "http://localhost:3000"
      : "https://mikrodtech-backend.onrender.com";

    fetch(`${API_BASE}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    })
      .then((res) => res.json())
      .then((data) => {
        hideTyping();
        appendMessage("bot", data.reply);
        saveMessage("bot", data.reply);
      })
      .catch(() => {
        hideTyping();
        appendMessage("bot", "⚠️ Sorry, I’m having trouble connecting to MikrodTech servers right now.");
      });
  }

  /* ----------------------------
      📦 STORAGE & UI FUNCTIONS
  -----------------------------*/
  function appendMessage(sender, text) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.innerHTML = sender === "bot" ? formatBotMessage(text) : text;
    innerMessages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  function saveMessage(sender, text) {
    savedMessages.push({ sender, text });
    sessionStorage.setItem("mikrodtech-chat", JSON.stringify(savedMessages));
  }

  let typingDiv;
  function showTyping() {
    typingDiv = document.createElement("div");
    typingDiv.classList.add("message", "bot");
    typingDiv.innerHTML = `<span class="typing-dots"><span>.</span><span>.</span><span>.</span></span>`;
    messages.appendChild(typingDiv);
    messages.scrollTop = messages.scrollHeight;
  }

  function hideTyping() {
    if (typingDiv) typingDiv.remove();
  }
function formatBotMessage(text) {
  // Remove leading spaces only, leave trailing intact
  text = text.replace(/^\s+/, "");

  // Preserve bold and italics
  text = text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") 
    .replace(/\*(.*?)\*/g, "<em>$1</em>");             

  // Preserve bullets starting with •
  text = text.replace(/^(\s*•\s*)/gm, "• ");

  // Preserve numbered lists (1., 2., etc.)
  text = text.replace(/^(\d+\.\s)/gm, "$1");

  // Convert newlines to <br>, keeping paragraphs
  text = text.replace(/\r\n/g, "\n")
             .replace(/\n\s*\n/g, "<br><br>")
             .replace(/\n/g, "<br>");

  return `<div class="bot-reply">${text}</div>`;
}



async function generateResponse(userInput) {
  const systemInstruction = `
    You are MikrodTech’s professional AI assistant.
    - When asked for lists (services, steps, items), always:
      1. Provide a short, context-relevant heading or sentence introducing the list.
      2. Categorize items if possible into logical groups (e.g., Computers, Networking, Cybersecurity).
      3. Use bullet points for items.
    - Do NOT include unrelated words such as "student" unless the user explicitly asks about education.
    - Keep tone professional and concise.
  `;

  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      role: "system",
      content: systemInstruction,
      userInput: userInput
    })
  });

  const data = await response.json();

  // Clean the AI response before returning
  return cleanResponse(data.output);
}

/* ----------------------------
    🖱️ MAKE CHATBOT BUTTON DRAGGABLE (pointer events)
-----------------------------*/
(function makeChatbotButtonDraggable() {
  const btn = document.getElementById("chatbot-btn");
  if (!btn) return;

  // Ensure the button can accept pointer events and is above other elements
  btn.style.touchAction = btn.style.touchAction || "none"; // fallback if CSS missing
  btn.style.zIndex = btn.style.zIndex || 10000;

  // If element uses bottom/right in CSS, initialize left/top so pointer dragging works
  const rect = btn.getBoundingClientRect();
  if (!btn.style.left && !btn.style.top) {
    // set inline left/top from computed position
    btn.style.left = `${rect.left}px`;
    btn.style.top = `${rect.top}px`;
    // remove bottom/right so inline left/top takes precedence
    btn.style.right = "auto";
    btn.style.bottom = "auto";
    btn.style.position = "fixed";
  }

  let dragging = false;
  let originX = 0, originY = 0;
  let startLeft = 0, startTop = 0;

  function onPointerDown(e) {
    // only left mouse or touch/pen
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.preventDefault();
    btn.setPointerCapture?.(e.pointerId);

    dragging = true;
    originX = e.clientX;
    originY = e.clientY;

    // parse current left/top (numbers)
    startLeft = parseFloat(getComputedStyle(btn).left || 0);
    startTop = parseFloat(getComputedStyle(btn).top || 0);

    // disable transitions while dragging
    btn.style.transition = "none";

    // prevent page from selecting text while dragging
    document.body.style.userSelect = "none";
  }

  function onPointerMove(e) {
    if (!dragging) return;
    e.preventDefault();

    const dx = e.clientX - originX;
    const dy = e.clientY - originY;

    let newLeft = startLeft + dx;
    let newTop = startTop + dy;

    // keep inside viewport bounds
    const winW = window.innerWidth;
    const winH = window.innerHeight;
    const btnW = btn.offsetWidth;
    const btnH = btn.offsetHeight;

    newLeft = Math.max(0, Math.min(newLeft, winW - btnW));
    newTop = Math.max(0, Math.min(newTop, winH - btnH));

    btn.style.left = `${newLeft}px`;
    btn.style.top = `${newTop}px`;
    btn.style.right = "auto";
    btn.style.bottom = "auto";
    btn.style.position = "fixed";
  }

  function onPointerUp(e) {
    if (!dragging) return;
    dragging = false;
    btn.releasePointerCapture?.(e.pointerId);
    btn.style.transition = "all 0.25s ease";
    document.body.style.userSelect = ""; // restore
  }

  // Attach pointer event listeners
  btn.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointermove", onPointerMove, { passive: false });
  window.addEventListener("pointerup", onPointerUp);

  // keep dragging working if pointer leaves window (safety)
  window.addEventListener("pointercancel", onPointerUp);
})();


});

document.addEventListener("DOMContentLoaded", () => {
  const chatbotBtn = document.getElementById("chatbot-btn");
  const chatbotNav = document.querySelector('a[href="#chatbot-btn"]');

  if (chatbotNav && chatbotBtn) {
    chatbotNav.addEventListener("click", (e) => {
      e.preventDefault();
      chatbotBtn.click();
    });
  }
});
