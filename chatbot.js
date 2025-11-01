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
    "what is mikrodtech": "MikrodTech is a professional computer and network solutions company offering smart, trusted, and efficient tech services for individuals, schools, and businesses.",
    "who owns mikrodtech": "MikrodTech was founded by Wabwile Simati Rodney Mike, a cybersecurity specialist and software developer passionate about secure, innovative technology solutions.",
    "where is mikrodtech located": "MikrodTech operates in Kenya and serves clients across the country, providing both onsite and remote tech solutions.",
    "when was mikrodtech founded": "MikrodTech began as a passion project for secure and reliable technology solutions, later evolving into a professional brand serving schools, offices, and businesses.",
    "what does mikrodtech mean": "MikrodTech combines 'Mike' and 'Rod' — the founder’s names — with 'Tech' to represent modern, reliable, and personal technology services.",


    "what services do you offer": `
**MikrodTech Services**

MikrodTech provides expert technology solutions in the following areas:

 *Computers & Hardware*

• Computer sales and installations  
• Hardware and software maintenance  
• Printer setup and troubleshooting  
• Operating system installation and optimization  
• Productivity software installation  
• Gaming gear and accessories setup  

 *Networking & Internet*

• Network design, setup, and configuration  
• Device discovery and vulnerability scanning  
• Network monitoring and troubleshooting  
• Wi-Fi setup and access point management  
• LAN/WAN installations  

 **Security & Surveillance**
• CCTV and IP camera installations  
• Access control systems  
• Cybersecurity audits and protection  
• Intrusion detection and prevention systems (IDS/IPS)  

⚡ **Power & Backup**
• UPS and inverter installation  
• Power backup system configuration and maintenance  

 **Business & POS**
• POS system setup and configuration  

Would you like me to explain these services in more detail?  
`,


"do you install cctv": "Yes! MikrodTech installs high-quality CCTV and surveillance systems for homes and businesses, including setup and remote monitoring.",

"do you fix computers": "Yes, we handle computer repairs, maintenance, software installation, and performance optimization for desktops and laptops.",

"do you offer networking services": "Absolutely! We design, install, and configure wired and wireless networks, including routers, switches, servers, and Wi-Fi optimization.",

"do you sell computers": "Yes, we supply high-quality computers, printers, and accessories with installation and warranty support.",

"do you offer cybersecurity services": "Yes, MikrodTech provides cybersecurity assessments, threat monitoring, network protection, and device security solutions for organizations and individuals.",

"do you do installations": "Yes, we handle installations for computers, networking systems, printers, CCTV setups, access control systems, and POS systems.",

"do you build websites": "Yes! We develop responsive, secure, and professional websites for organizations and businesses.",

"do you create software": "Yes, we develop custom software solutions, including management tools and tailored applications for businesses.",


    // 🧰 Support & Contact
    "how can i contact mikrodtech": "You can reach us through our website contact form, LinkedIn page, or by email. Visit <strong>mikrodtech.co.ke</strong> for details.",
    "what are your working hours": "We are available Monday to Saturday, 8:00 AM – 6:00 PM. For urgent or remote support, you can reach us anytime online.",
    "how can i get a quote": "You can request a quote directly from our website or message us with your needs — we’ll respond promptly with tailored pricing.",
    "how do i request a service": "Simply describe your needs in the chat or fill in the form on our website, and we’ll follow up with a consultation and quote.",
    "do you offer remote support": "Yes, MikrodTech provides remote troubleshooting and system support for clients across Kenya.",

    // 🏗️ Projects
    "what projects have you done": "We’ve built websites for schools, created a student progress tracking system for orphan programs, and implemented secure networks for institutions.",
    "do you make school systems": "Yes, we’ve created flexible systems that help schools and sponsors track student performance and progress efficiently.",

    // 🌐 Social Media
    "do you have social media": "Yes, we’re on LinkedIn — search for <strong>MikrodTech</strong>. We don’t use Facebook at the moment.",
    "where can i find mikrodtech online": "Visit our website at <strong>mikrodtech.co.ke</strong> or follow us on LinkedIn for updates and projects.",

    // 💡 Brand & Vision
    "what is your tagline": "Our tagline is <strong>Smart Solutions. Trusted Tech.</strong> — it reflects our focus on intelligent, reliable, and secure technology.",
    "why choose mikrodtech": "Because we combine expertise, reliability, and personalized service. Our solutions are secure, affordable, and built for long-term performance.",
    "what makes mikrodtech different": "We’re passionate about security, innovation, and precision. MikrodTech doesn’t just fix problems — we build reliable systems that prevent them.",

    // 💬 Friendly / Small Talk
    "hello": "Hello there! How can MikrodTech assist you today?",
    "hi": "Hi!  Need help with computers, networking, or tech support?",
    "how are you": "I’m great! Always ready to assist. How can MikrodTech help you today?",
    "thanks": "You’re welcome!  MikrodTech is always happy to help.",
    "bye": "Goodbye!  Have a great day — from MikrodTech.",
    "who are you": "I’m the MikrodTech Assistant 🤖 — here to help you learn about our services, projects, and tech solutions.",
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
  // ✅ Clean unwanted spaces and leftover characters
  text = text.trim();

  // ✅ Preserve bullet characters and ensure proper line breaks
  text = text
    .replace(/\r\n/g, "\n")                       // Normalize newlines
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold
    .replace(/\*(.*?)\*/g, "<em>$1</em>")             // Italic
    .replace(/^(\s*[•\-–>]+\s*)/gm, "• ")             // Normalize bullets
    .replace(/\n\s*\n/g, "<br><br>")                  // Paragraph spacing
    .replace(/\n/g, "<br>");                          // Regular line breaks

  // ✅ Wrap content in a styled container for better readability
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
    🖱️ MAKE CHATBOT BUTTON DRAGGABLE
-----------------------------*/
(function makeChatbotButtonDraggable() {
  const btn = document.getElementById("chatbot-btn");
  let isDragging = false;
  let startX, startY, initialX, initialY;

  const startDrag = (e) => {
    e.preventDefault();
    isDragging = true;
    const touch = e.touches ? e.touches[0] : e;
    startX = touch.clientX;
    startY = touch.clientY;
    const rect = btn.getBoundingClientRect();
    initialX = rect.left;
    initialY = rect.top;
    btn.style.transition = "none"; // Disable smooth animation during drag
  };

  const duringDrag = (e) => {
    if (!isDragging) return;
    const touch = e.touches ? e.touches[0] : e;
    const dx = touch.clientX - startX;
    const dy = touch.clientY - startY;
    btn.style.left = `${initialX + dx}px`;
    btn.style.top = `${initialY + dy}px`;
    btn.style.right = "auto";
    btn.style.bottom = "auto";
    btn.style.position = "fixed";
  };

  const stopDrag = () => {
    if (!isDragging) return;
    isDragging = false;
    btn.style.transition = "all 0.25s ease"; // Re-enable smooth animation
  };

  // Desktop
  btn.addEventListener("mousedown", startDrag);
  document.addEventListener("mousemove", duringDrag);
  document.addEventListener("mouseup", stopDrag);

  // Mobile
  btn.addEventListener("touchstart", startDrag, { passive: false });
  document.addEventListener("touchmove", duringDrag, { passive: false });
  document.addEventListener("touchend", stopDrag);
})();


});
