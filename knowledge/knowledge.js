// =============================
// MikrodTech Knowledge Hub
// 3 Column Layout System
// Left: Topics | Middle: Articles | Right: Reader
// =============================

document.addEventListener("DOMContentLoaded", () => {

  const categories = document.querySelectorAll(".knowledge-category");

  let currentCategory = null;
  let articles = [];
  let currentIndex = 0;

  const container = document.querySelector(".knowledge-main .container");

  // =========================
  // BUILD LAYOUT
  // =========================

  const layout = document.createElement("div");
  layout.className = "knowledge-layout";

  layout.innerHTML = `
    <div class="left-panel">
      <h3>Topics</h3>
      <div id="topicList"></div>
    </div>

    <div class="middle-panel">
      <h3>Articles</h3>
      <div id="articleList">
        <p class="hint">Select a topic first</p>
      </div>
    </div>

    <div class="right-panel">
      <h3>Reader</h3>
      <div id="readerPanel">
        <p>Select an article to read</p>
      </div>
    </div>
  `;

  container.innerHTML = "";
  container.appendChild(layout);

  const topicList = document.getElementById("topicList");
  const articleList = document.getElementById("articleList");
  const readerPanel = document.getElementById("readerPanel");

  let topicButtons = [];
  let articleItems = [];

  // =========================
  // LOAD TOPICS
  // =========================

  categories.forEach((cat, catIndex) => {

    const title = cat.querySelector("h2").textContent;

    const btn = document.createElement("button");
    btn.className = "topic-btn";
    btn.textContent = title;

  btn.addEventListener("click", () => {

  setActiveTopic(cat);

  currentCategory = cat;
  loadArticles(cat);

});

    topicButtons.push(btn);
    topicList.appendChild(btn);
  });




// =========================
// SET ACTIVE TOPIC UI
// =========================
function setActiveTopic(categoryElement) {

  topicButtons.forEach(btn => btn.classList.remove("active"));

  const index = [...categories].indexOf(categoryElement);

  if (topicButtons[index]) {
    topicButtons[index].classList.add("active");
  }
}


  // =========================
  // LOAD ARTICLES
  // =========================




  function loadArticles(category) {

    setActiveTopic(category);

    articles = [...category.querySelectorAll(".open-article")];
    currentIndex = 0;

    articleList.innerHTML = "";
    articleItems = [];

    articles.forEach((article, index) => {

      const item = document.createElement("div");
      item.className = "article-item";
      item.textContent = article.textContent.trim();

      item.addEventListener("click", () => {
        currentIndex = index;
        openArticle();
        setActiveArticle(index);
      });

      articleItems.push(item);
      articleList.appendChild(item);
    });

    setActiveArticle(0);
    openArticle();
  }

  // =========================
  // SET ACTIVE ARTICLE UI
  // =========================

  function setActiveArticle(index) {

    articleItems.forEach(a => a.classList.remove("active"));

    if (articleItems[index]) {
      articleItems[index].classList.add("active");
    }
  }

  // =========================
  // OPEN ARTICLE (RIGHT PANEL)
  // =========================

  function openArticle() {

    if (!articles.length) return;

    const article = articles[currentIndex];

    const title = article.dataset.title;
    const content = article.dataset.content;
    const image = article.dataset.image || "../logo.png";

    readerPanel.innerHTML = `
      <img src="${image}" class="reader-image">

      <h2>${title}</h2>

      <div class="reader-text">
        ${content}
      </div>

      <div class="reader-controls">
        <button id="prevBtn">Previous</button>
        <button id="nextBtn">Next</button>
        <a href="../services/" class="service-btn">Need This Service</a>
      </div>
    `;

    // keep article highlight synced
    setActiveArticle(currentIndex);

document.getElementById("prevBtn").onclick = () => {
  currentIndex = (currentIndex - 1 + articles.length) % articles.length;
  setActiveArticle(currentIndex);
  openArticle();
};

document.getElementById("nextBtn").onclick = () => {
  currentIndex = (currentIndex + 1) % articles.length;
  setActiveArticle(currentIndex);
  openArticle();
};
  }

});