document.addEventListener("DOMContentLoaded", () => {
  // Get project slug from query parameters
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");

  if (!slug) {
    window.location.href = "index.html";
    return;
  }

  // Load projects data
  fetch("content/projects.json")
    .then(res => res.json())
    .then(data => {
      const project = data.projects.find(p => p.slug === slug);
      if (!project) {
        window.location.href = "index.html";
        return;
      }
      initGallery(project);
    })
    .catch(err => {
      console.error("Erro ao carregar projeto:", err);
      window.location.href = "index.html";
    });

  function initGallery(project) {
    // Set project title & metadata
    document.getElementById("project-title").textContent = project.title;
    document.getElementById("project-slug").textContent = `FGN Projetos > ${project.title}`;
    document.title = `Projeto ${project.title} - FGN Arquitetura`;

    const images = project.images || [];
    if (images.length === 0) return;

    const formatImg = path => path.startsWith("/") ? path.slice(1) : path;

    // Render Thumbnails
    const thumbsContainer = document.getElementById("project-thumbs");
    thumbsContainer.innerHTML = images.map((img, idx) => `
      <button class="${idx === 0 ? 'active' : ''}" data-index="${idx}">
        <img src="${formatImg(img)}" alt="Foto ${idx + 1} do projeto ${project.title}">
      </button>
    `).join("");

    const stageImg = document.getElementById("stage-img");
    const counter = document.getElementById("stage-counter");
    const prevBtn = document.getElementById("stage-prev");
    const nextBtn = document.getElementById("stage-next");
    const thumbBtns = thumbsContainer.querySelectorAll("button");
    let currentImageIndex = 0;

    function selectImage(index) {
      if (index < 0 || index >= images.length) return;
      
      currentImageIndex = index;
      stageImg.src = formatImg(images[index]);
      counter.textContent = `${index + 1} / ${images.length}`;

      // Update active state in thumbnails
      thumbBtns.forEach((btn, idx) => {
        if (idx === index) btn.classList.add("active");
        else btn.classList.remove("active");
      });

      // Scroll thumbnail into view
      thumbBtns[index].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }

    // Trigger image select events
    thumbBtns.forEach((btn, index) => {
      btn.addEventListener("click", () => selectImage(index));
    });

    prevBtn.addEventListener("click", () => {
      const newIndex = (currentImageIndex - 1 + images.length) % images.length;
      selectImage(newIndex);
    });

    nextBtn.addEventListener("click", () => {
      const newIndex = (currentImageIndex + 1) % images.length;
      selectImage(newIndex);
    });

    // Keyboard navigation (Left/Right arrows)
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        const newIndex = (currentImageIndex - 1 + images.length) % images.length;
        selectImage(newIndex);
      } else if (e.key === "ArrowRight") {
        const newIndex = (currentImageIndex + 1) % images.length;
        selectImage(newIndex);
      }
    });

    // Init first image
    selectImage(0);
  }
});
