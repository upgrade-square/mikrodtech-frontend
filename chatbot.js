document.addEventListener("DOMContentLoaded", () => {
  const chatbotBtn = document.getElementById("chatbot-btn");
  const chatbotBox = document.getElementById("chatbot-box");
  const closeChat = document.getElementById("close-chat");
  const sendBtn = document.getElementById("send-btn");
  const messages = document.getElementById("chatbot-messages");



 /* ===========================================
   AUTO-EXPAND TEXTAREA (WhatsApp Style)
=========================================== */
const userInput = document.getElementById("user-input");

if (userInput) {
  userInput.addEventListener("input", () => {
    userInput.style.height = "20px";
    userInput.style.height = userInput.scrollHeight + "px";
  });
}

  const innerMessages = document.getElementById("chatbot-messages-inner");
  const chatbotNav = document.getElementById("chatbot-nav");





 /* ----------------------------
    🧠 MIKRODTECH KNOWLEDGE BASE
-----------------------------*/
const mikrodTechKB = {
  //// 🏢 Updated High-End Company Info
  "what is mikrodtech": "MikrodTech is a forward-thinking technology company specializing in software engineering, cybersecurity, and product innovation. We build secure, scalable, and intelligent solutions for enterprises and institutions.",

  "who owns mikrodtech": "MikrodTech was founded by Wabwile Simati Rodney Mike, a cybersecurity specialist, software engineer, and product developer focused on building secure, intelligent, and future-ready technologies.",

  "where is mikrodtech located": "MikrodTech operates in Kenya and provides advanced technology solutions to clients across East Africa and beyond.",

  "when was mikrodtech founded": "MikrodTech began as a research-driven tech initiative and evolved into a company focused on enterprise-grade software, cybersecurity, and product development.",

  "what does mikrodtech mean": "MikrodTech combines 'Mike' and 'Rod' — the founder’s names — with 'Tech', representing a company built on innovation, security, and intelligent engineering.",

  "tell me more about mikrodtech": `
MikrodTech is a modern technology company focused on building secure, scalable, and intelligent solutions.

We specialize in:
• Software engineering  
• Cybersecurity & digital protection  
• Product design, automation, and innovation  

We serve enterprises, institutions, and mission-driven organizations seeking high-performance technology engineered for long-term growth.
`,

  "best laptop for computer science student": `
For a computer science student, a laptop should balance performance, reliability, and portability.

**Recommended Specifications**
• CPU: Intel Core i7 or AMD Ryzen 7 (latest generation)
• RAM: 16GB minimum (32GB recommended for VMs, Docker, ML)
• Storage: 512GB NVMe SSD minimum (1TB recommended)
• Display: 14–15.6 inch Full HD or higher
• Battery Life: 8+ hours
• Operating System: Linux, Windows, or macOS depending on tooling

**Notes**
• Dedicated GPU is optional (mainly for ML or graphics work)
• Prioritize keyboard quality and thermal performance over gaming features
`,

  // 🛠️ High-End Services
  "what services do you offer": `
**MikrodTech Core Services**

*Software Engineering*
• Custom enterprise systems  
• Intelligent automation solutions  
• Web applications & digital platforms  
• Data-driven business tools  

*Cybersecurity*
• Cybersecurity assessments & audits  
• Secure architecture & system hardening  
• Threat detection & vulnerability analysis  
• Digital risk mitigation  

*Product Innovation*
• R&D and prototyping  
• Smart product development  
• Automation tools  
• Institutional and enterprise tech solutions  

*Business Systems*
• POS (Point of Sale) systems for sales, inventory, and operations  
• Custom business automation solutions  

*Applications & Platforms*
• MDT Remind App — smart task and productivity management system  

*IoT & Smart Solutions*
• IoT (Internet of Things) systems for automation, monitoring, and control  
• Intelligent device integration for businesses and institutions  

*Consultation & Strategy*
• Technology consultation and advisory  
• System architecture planning  
• Digital transformation strategy  

We focus exclusively on secure, high-performance, and scalable solutions for businesses and institutions.
`,

  "do you install cctv": "MikrodTech no longer offers CCTV installation. We are now focused on advanced cybersecurity, software development, and product innovation.",

  "do you fix computers": "MikrodTech does not provide computer repair services. We specialize in enterprise-grade technology solutions.",

  "do you offer networking services": "We provide secure network architecture and enterprise-level cybersecurity — not basic router or Wi-Fi installations.",

  "do you sell computers": "No. MikrodTech focuses on high-level technology solutions, not hardware sales.",

  "do you offer cybersecurity services": "Yes — we offer assessments, secure architecture design, vulnerability analysis, and threat detection for organizations.",

  "do you do installations": "No. MikrodTech no longer handles hardware installations. Our focus is strategic, high-end digital solutions.",

  "do you build websites": "Yes — we build secure, scalable, and professional web platforms for enterprises and institutions.",

  "do you create software": "Yes — MikrodTech designs and develops custom enterprise software and intelligent systems tailored to professional needs.",

  // 🆕 Products & Solutions
  "what is mdt remind": "MDT Remind is a smart productivity and reminder application developed by MikrodTech to help users manage tasks, schedules, and important activities efficiently.",

  "tell me about mdt remind": `
**MDT Remind App**

A smart productivity solution designed to help users stay organized and efficient.

• Task and schedule management  
• Intelligent reminders and notifications  
• Clean and user-friendly interface  
• Designed for students, professionals, and organizations  
`,

  "do you offer pos": "Yes — MikrodTech provides smart POS systems for efficient sales processing, inventory management, and business operations.",

  "what is pos": "A POS (Point of Sale) system is a business solution used to manage sales, track inventory, and handle transactions efficiently.",

  "tell me about your pos systems": `
**MikrodTech POS Systems**

• Sales and transaction management  
• Inventory tracking and stock control  
• Reporting and business insights  
• Scalable for growing businesses  
`,

  "do you offer iot": "Yes — MikrodTech provides IoT solutions for automation, monitoring, and intelligent system control.",

  "what is iot": "IoT (Internet of Things) refers to connected devices that communicate and share data to enable automation and smart control.",

  "tell me about iot": `
**MikrodTech IoT Solutions**

• Smart monitoring systems  
• Automated device control  
• Data-driven insights from connected systems  
• Scalable intelligent environments  
`,

  "do you offer consultation": "Yes — MikrodTech offers professional technology consultation to help businesses design and implement secure, scalable systems.",

  "what is your consultation service": `
**MikrodTech Consultation Services**

• System planning and architecture design  
• Cybersecurity advisory  
• Digital transformation strategy  
• Technology optimization and scaling  
`,

  // 🧰 Support & Contact
  "how can i contact mikrodtech": "You can reach us through our website, LinkedIn page, or by email at info@mikrodtech.co.ke.",
  
  "what are your working hours": "We are available Monday–Saturday, 8:00 AM – 6:00 PM. Remote support available anytime.",
  
  "how can i get a quote": "Request a quote on our website or describe your needs here — we’ll respond with personalized pricing.",
  
  "how do i request a service": "Simply tell us what you need or use the request form on our website. We’ll follow up with next steps.",
  
  "do you offer remote support": "Yes, MikrodTech provides fast remote troubleshooting and system support across Kenya.",

  // 🏗️ Projects
  "what projects have you done": "We have built school websites, developed a student progress tracking system for orphan programs, and implemented secure systems for institutions.",
  
  "do you make school systems": "Yes, we develop flexible school systems that help sponsors and institutions track student performance, records, and progress.",

  // 🌐 Social Media
  "do you have social media": "Yes — we are active on LinkedIn. Search for 'MikrodTech'. We do not use Facebook.",
  
  "where can i find mikrodtech online": "Visit our website at mikrodtech.co.ke or follow us on LinkedIn for updates and projects.",

  // 💡 Brand & Vision
  "what is your tagline": "Our tagline is 'Smart Solutions. Trusted Tech.'",
  
  "why choose mikrodtech": "We combine expertise, security, innovation, and reliability to deliver long-lasting solutions tailored to client needs.",
  
  "what makes mikrodtech different": "We focus on security, precision, and innovation — not just fixing problems, but preventing them with long-term, reliable solutions.",

  // 🧠 MDT Alias
  "what is mdt": "MDT is the short form of MikrodTech — a forward-thinking technology company specializing in software engineering, cybersecurity, and product innovation.",

  "who is mdt": "MDT refers to MikrodTech, a technology company focused on building secure, scalable, and intelligent solutions for enterprises and institutions.",

  "mdt": "MDT stands for MikrodTech — a company focused on secure, scalable, and intelligent technology solutions.",

  // 💬 Friendly / Small Talk
  "hello": "Hello! How can MikrodTech assist you today?",
  "hi": "Hi! How can we help you with technology solutions today?",
  "how are you": "I'm doing great and ready to assist! What can MikrodTech help you with?",
  "thanks": "You're welcome! MikrodTech is always happy to serve.",
  "bye": "Goodbye! Have a great day — from MikrodTech.",
  "who are you": "I'm the MikrodTech Assistant 🤖 — here to help you explore our services, products, and solutions."
};
  /* ----------------------------
      🔎 LOCAL KNOWLEDGE SEARCH
  -----------------------------*/
function normalizeInput(input) {
  let text = input.toLowerCase();

  // Map aliases → canonical name
   text = text.replace(/\bmdt\b/gi, "mikrodtech");

  return text;
}

function searchKnowledgeBase(input) {
  const normalizedInput = normalizeInput(input);

  for (const [question, answer] of Object.entries(mikrodTechKB)) {
    if (
      normalizedInput.includes(question) ||
      question.includes(normalizedInput)
    ) {
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


    if (lastTopic && (lower.includes("more") || lower.includes("details") || lower.includes("tell me more"))) {
  switch (lastTopic) {
    case "cybersecurity":
      return "MikrodTech provides advanced cybersecurity services such as audits, penetration testing, secure architecture design, and continuous threat monitoring.";
    case "software":
      return "Our software engineering services include custom system development, intelligent automation, digital platforms, and enterprise-grade tools.";
    case "innovation":
      return "We innovate through R&D, smart product development, automation tools, and scalable technology solutions for institutions and enterprises.";
    default:
      return "Sure! Tell me which area you'd like more details about — software engineering, cybersecurity, or product innovation.";
  }
}


if (lastTopic && (lower.includes("what else") || lower.includes("other services"))) {
  return `Besides ${lastTopic}, MikrodTech also specializes in software engineering, cybersecurity, and product innovation — all designed for secure, scalable, high-performance environments.`;
}


    if (lower.includes("thanks") || lower.includes("thank you")) {
      return "You're welcome!  Anything else you'd like to know about MikrodTech or our services?";
    }



    // Check KB
    const kbAnswer = searchKnowledgeBase(lower);
    if (kbAnswer) {
     if (lower.includes("cybersecurity")) lastTopic = "cybersecurity";
else if (lower.includes("software") || lower.includes("system") || lower.includes("app")) lastTopic = "software";
else if (lower.includes("innovation") || lower.includes("product")) lastTopic = "innovation";
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



 closeChat.addEventListener("click", () => {
  chatbotBox.style.display = "none";
  chatbotBtn.style.display = "block";
  document.body.classList.remove("chatbot-open");  // ← ADD THIS
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

  if (sender === "bot") {
    msg.innerHTML = formatBotMessage(text);
  } else {
    // Preserve line breaks exactly as typed
    msg.textContent = text; // ✅ Use textContent instead of innerHTML
  }

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
      📟 OPEN & CLOSE CHATBOT
-----------------------------*/
function openChatbot() {
  chatbotBox.style.display = "flex";
  chatbotBtn.style.display = "none";
  document.body.classList.add("chatbot-open");
  setTimeout(() => userInput.focus(), 100);
}

function closeChatbot() {
  chatbotBox.style.display = "none";
  chatbotBtn.style.display = "block";
  document.body.classList.remove("chatbot-open");
}

chatbotBtn.addEventListener("click", openChatbot);
closeChat.addEventListener("click", closeChatbot);

/* Menu click opens it too */
if (chatbotNav) {
  chatbotNav.addEventListener("click", (e) => {
    e.preventDefault();
    openChatbot();
  });
}

/* ===========================================
    🖱️ DRAGGABLE CHATBOT BUTTON (CLICK-SAFE)
=========================================== */
(function makeChatbotButtonDraggable() {
  const btn = document.getElementById("chatbot-btn");
  if (!btn) return;

  btn.style.touchAction = btn.style.touchAction || "none";
  btn.style.zIndex = btn.style.zIndex || 10000;

  const rect = btn.getBoundingClientRect();
  if (!btn.style.left && !btn.style.top) {
    btn.style.left = `${rect.left}px`;
    btn.style.top = `${rect.top}px`;
    btn.style.right = "auto";
    btn.style.bottom = "auto";
    btn.style.position = "fixed";
  }

  let dragging = false;
  let isClick = true;
  let originX = 0, originY = 0;
  let startLeft = 0, startTop = 0;

  function onPointerDown(e) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.preventDefault();
    btn.setPointerCapture?.(e.pointerId);

    dragging = true;
    isClick = true;

    originX = e.clientX;
    originY = e.clientY;

    startLeft = parseFloat(getComputedStyle(btn).left || 0);
    startTop = parseFloat(getComputedStyle(btn).top || 0);

    btn.style.transition = "none";
    document.body.style.userSelect = "none";
  }

  function onPointerMove(e) {
    if (!dragging) return;

    const dx = e.clientX - originX;
    const dy = e.clientY - originY;

    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      isClick = false;
    }

    let newLeft = startLeft + dx;
    let newTop = startTop + dy;

    const winW = window.innerWidth;
    const winH = window.innerHeight;
    const btnW = btn.offsetWidth;
    const btnH = btn.offsetHeight;

    newLeft = Math.max(0, Math.min(newLeft, winW - btnW));
    newTop = Math.max(0, Math.min(newTop, winH - btnH));

    btn.style.left = `${newLeft}px`;
    btn.style.top = `${newTop}px`;
  }

  function onPointerUp(e) {
    if (!dragging) return;
    dragging = false;

    btn.releasePointerCapture?.(e.pointerId);
    btn.style.transition = "all 0.25s ease";
    document.body.style.userSelect = "";

    if (isClick) openChatbot();
  }

  btn.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointermove", onPointerMove, { passive: false });
  window.addEventListener("pointerup", onPointerUp);
  window.addEventListener("pointercancel", onPointerUp);
})();


});


// Prevent click from firing after drag
let chatbotDragging = false;

document.getElementById("chatbot-btn").addEventListener("pointerdown", () => {
  chatbotDragging = false;
});

document.getElementById("chatbot-btn").addEventListener("pointermove", () => {
  chatbotDragging = true;
});

document.getElementById("chatbot-btn").addEventListener("click", (e) => {
  if (chatbotDragging) {
    e.preventDefault();
    e.stopImmediatePropagation();
    return false; // cancel click completely
  }
});
