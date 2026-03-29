document.addEventListener("DOMContentLoaded", () => {
  const chatbotBtn = document.getElementById("chatbot-btn");
  const chatbotBox = document.getElementById("chatbot-box");
  const closeChat = document.getElementById("close-chat");
  const sendBtn = document.getElementById("send-btn");
  const messages = document.getElementById("chatbot-messages");
  const innerMessages = document.getElementById("chatbot-messages-inner");
  const chatbotNav = document.getElementById("chatbot-nav");
  const userInput = document.getElementById("user-input");

  /* ===========================================
     AUTO-EXPAND TEXTAREA (WhatsApp Style)
  =========================================== */
  if (userInput) {
    userInput.addEventListener("input", () => {
      userInput.style.height = "20px";
      userInput.style.height = userInput.scrollHeight + "px";
    });
  }

  /* ----------------------------
      🧠 DYNAMIC MIKRODTECH KNOWLEDGE BASE
  -----------------------------*/
  let mikrodTechKB = {};
  async function loadKnowledgeBase() {
    try {
      const isLocalhost =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ||
        window.location.hostname.startsWith("192.168.") ||
        window.location.hostname.startsWith("10.") ||
        window.location.hostname.startsWith("172.");
      const API_BASE = isLocalhost
        ? "http://localhost:3000"
        : "https://mikrodtech-backend.onrender.com";

      const res = await fetch(`${API_BASE}/knowledge`);
      if (!res.ok) throw new Error("Failed to fetch KB");
      mikrodTechKB = await res.json();
      console.log("MikrodTech KB loaded:", mikrodTechKB);
    } catch (err) {
      console.error("Error loading KB:", err);
    }
  }
  loadKnowledgeBase();

  /* ----------------------------
      🔎 LOCAL KNOWLEDGE SEARCH
  -----------------------------*/
  function normalizeInput(input) {
    let text = input.toLowerCase();
    // Replace aliases dynamically
    if (mikrodTechKB.aliases) {
      mikrodTechKB.aliases.forEach(alias => {
        const re = new RegExp(`\\b${alias}\\b`, "gi");
        text = text.replace(re, "mikrodtech");
      });
    }
    return text;
  }

  function searchKnowledgeBase(input) {
    const normalizedInput = normalizeInput(input);
    for (const [question, answer] of Object.entries(mikrodTechKB)) {
      if (
        normalizedInput.includes(question.toLowerCase()) ||
        question.toLowerCase().includes(normalizedInput)
      ) {
        return answer;
      }
    }
    return null;
  }

  /* ============================
     🗣️ MULTI-TURN CONTEXT ENGINE
  ============================ */
  let lastTopic = null;
  let lastAnswer = "";
  function getContextualReply(input) {
    const lower = input.toLowerCase().trim();

    if (
      lastTopic &&
      (lower.includes("more") ||
        lower.includes("details") ||
        lower.includes("tell me more"))
    ) {
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
      return "You're welcome! Anything else you'd like to know about MikrodTech or our services?";
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

  function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    appendMessage("user", text);
    saveMessage("user", text);
    userInput.value = "";
    showTyping();

    // Try contextual/local response first
    const localReply = getContextualReply(text);
    if (localReply) {
      setTimeout(() => {
        hideTyping();
        appendMessage("bot", localReply);
        saveMessage("bot", localReply);
      }, 300);
      return;
    }

    // Otherwise, fallback to API
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

  sendBtn.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    sendMessage();
  });

  userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  /* ----------------------------
      📦 STORAGE & UI FUNCTIONS
  -----------------------------*/
  function appendMessage(sender, text) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);

    if (sender === "bot") {
      msg.innerHTML = formatBotMessage(text);
    } else {
      msg.textContent = text;
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
    text = text.replace(/^\s+/, "");
    text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");
    text = text.replace(/^(\s*•\s*)/gm, "• ");
    text = text.replace(/^(\d+\.\s)/gm, "$1");
    text = text.replace(/\r\n/g, "\n").replace(/\n\s*\n/g, "<br><br>").replace(/\n/g, "<br>");
    return `<div class="bot-reply">${text}</div>`;
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
  if (chatbotNav) chatbotNav.addEventListener("click", (e) => { e.preventDefault(); openChatbot(); });

  /* ===========================================
      🖱️ DRAGGABLE CHATBOT BUTTON
  =========================================== */
  (function makeChatbotButtonDraggable() {
    const btn = chatbotBtn;
    if (!btn) return;
    btn.style.touchAction = "none";
    btn.style.zIndex = 10000;
    const rect = btn.getBoundingClientRect();
    btn.style.left = `${rect.left}px`;
    btn.style.top = `${rect.top}px`;
    btn.style.position = "fixed";
    btn.style.right = "auto";
    btn.style.bottom = "auto";

    let dragging = false, isClick = true, originX = 0, originY = 0, startLeft = 0, startTop = 0;

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
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) isClick = false;
      let newLeft = startLeft + dx;
      let newTop = startTop + dy;
      newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - btn.offsetWidth));
      newTop = Math.max(0, Math.min(newTop, window.innerHeight - btn.offsetHeight));
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