document.addEventListener("DOMContentLoaded", () => {
  // Hardcoded projects list (extracted from content/projects.json)
  const projectsData = [
    {
      title: "Tomoichi",
      slug: "tomoichi",
      images: [
        "galleries-full/tomoichi/01.webp",
        "galleries-full/tomoichi/02.webp",
        "galleries-full/tomoichi/03.webp",
        "galleries-full/tomoichi/04.webp",
        "galleries-full/tomoichi/05.webp",
        "galleries-full/tomoichi/06.webp",
        "galleries-full/tomoichi/07.webp",
        "galleries-full/tomoichi/08.webp",
        "galleries-full/tomoichi/09.webp",
        "galleries-full/tomoichi/10.webp",
        "galleries-full/tomoichi/11.webp",
        "galleries-full/tomoichi/12.webp",
        "galleries-full/tomoichi/13.webp",
        "galleries-full/tomoichi/14.webp",
        "galleries-full/tomoichi/15.webp",
        "galleries-full/tomoichi/16.webp",
        "galleries-full/tomoichi/17.webp",
        "galleries-full/tomoichi/18.webp"
      ]
    },
    {
      title: "André de Almeida",
      slug: "andre-de-almeida",
      images: [
        "galleries-full/andre-de-almeida/01.webp",
        "galleries-full/andre-de-almeida/02.webp",
        "galleries-full/andre-de-almeida/03.webp",
        "galleries-full/andre-de-almeida/04.webp",
        "galleries-full/andre-de-almeida/05.webp"
      ]
    },
    {
      title: "Santa Ângela",
      slug: "santa-angela",
      images: [
        "galleries-full/santa-angela/01.webp",
        "galleries-full/santa-angela/02.webp",
        "galleries-full/santa-angela/03.webp",
        "galleries-full/santa-angela/04.webp",
        "galleries-full/santa-angela/05.webp",
        "galleries-full/santa-angela/06.webp",
        "galleries-full/santa-angela/07.webp",
        "galleries-full/santa-angela/08.webp",
        "galleries-full/santa-angela/09.webp"
      ]
    },
    {
      title: "Santa Beatriz",
      slug: "santa-beatriz",
      images: [
        "galleries-full/santa-beatriz/01.webp",
        "galleries-full/santa-beatriz/02.webp",
        "galleries-full/santa-beatriz/03.webp",
        "galleries-full/santa-beatriz/04.webp",
        "galleries-full/santa-beatriz/05.webp",
        "galleries-full/santa-beatriz/06.webp",
        "galleries-full/santa-beatriz/07.webp",
        "galleries-full/santa-beatriz/08.webp",
        "galleries-full/santa-beatriz/09.webp",
        "galleries-full/santa-beatriz/10.webp",
        "galleries-full/santa-beatriz/11.webp",
        "galleries-full/santa-beatriz/12.webp"
      ]
    },
    {
      title: "Santa Amélia",
      slug: "santa-amelia",
      images: [
        "galleries-full/santa-amelia/01.webp",
        "galleries-full/santa-amelia/02.webp",
        "galleries-full/santa-amelia/03.webp",
        "galleries-full/santa-amelia/04.webp",
        "galleries-full/santa-amelia/05.webp",
        "galleries-full/santa-amelia/06.webp",
        "galleries-full/santa-amelia/07.webp",
        "galleries-full/santa-amelia/08.webp",
        "galleries-full/santa-amelia/09.webp",
        "galleries-full/santa-amelia/10.webp",
        "galleries-full/santa-amelia/11.webp"
      ]
    },
    {
      title: "San Isidoro",
      slug: "san-isidoro",
      images: [
        "galleries-full/san-isidoro/01.webp",
        "galleries-full/san-isidoro/02.webp",
        "galleries-full/san-isidoro/03.webp",
        "galleries-full/san-isidoro/04.webp",
        "galleries-full/san-isidoro/05.webp",
        "galleries-full/san-isidoro/06.webp",
        "galleries-full/san-isidoro/07.webp",
        "galleries-full/san-isidoro/08.webp",
        "galleries-full/san-isidoro/09.webp",
        "galleries-full/san-isidoro/10.webp"
      ]
    },
    {
      title: "San Luigi",
      slug: "san-luigi",
      images: [
        "galleries-full/san-luigi/01.webp",
        "galleries-full/san-luigi/02.webp",
        "galleries-full/san-luigi/03.webp",
        "galleries-full/san-luigi/04.webp",
        "galleries-full/san-luigi/05.webp",
        "galleries-full/san-luigi/06.webp",
        "galleries-full/san-luigi/07.webp",
        "galleries-full/san-luigi/08.webp",
        "galleries-full/san-luigi/09.webp",
        "galleries-full/san-luigi/10.webp",
        "galleries-full/san-luigi/11.webp"
      ]
    },
    {
      title: "San Patrick",
      slug: "san-patrick",
      images: [
        "galleries-full/san-patrick/01.webp",
        "galleries-full/san-patrick/02.webp",
        "galleries-full/san-patrick/03.webp",
        "galleries-full/san-patrick/04.webp",
        "galleries-full/san-patrick/05.webp",
        "galleries-full/san-patrick/06.webp",
        "galleries-full/san-patrick/07.webp",
        "galleries-full/san-patrick/08.webp",
        "galleries-full/san-patrick/09.webp"
      ]
    },
    {
      title: "Golden Plaza",
      slug: "golden-plaza",
      images: [
        "galleries-full/golden-plaza/01.webp",
        "galleries-full/golden-plaza/02.webp",
        "galleries-full/golden-plaza/03.webp",
        "galleries-full/golden-plaza/04.webp",
        "galleries-full/golden-plaza/05.webp",
        "galleries-full/golden-plaza/06.webp",
        "galleries-full/golden-plaza/07.webp",
        "galleries-full/golden-plaza/08.webp",
        "galleries-full/golden-plaza/09.webp",
        "galleries-full/golden-plaza/10.webp",
        "galleries-full/golden-plaza/11.webp",
        "galleries-full/golden-plaza/12.webp",
        "galleries-full/golden-plaza/13.webp"
      ]
    },
    {
      title: "Bicicletário Maria Augusta",
      slug: "bicicletario-maria-augusta",
      images: [
        "galleries-full/bicicletario-maria-augusta/01.webp",
        "galleries-full/bicicletario-maria-augusta/02.webp",
        "galleries-full/bicicletario-maria-augusta/03.webp"
      ]
    },
    {
      title: "Fitness Portes du Soleil",
      slug: "fitness-portes-du-soleil",
      images: [
        "galleries-full/fitness-portes-du-soleil/01.webp",
        "galleries-full/fitness-portes-du-soleil/02.webp",
        "galleries-full/fitness-portes-du-soleil/03.webp",
        "galleries-full/fitness-portes-du-soleil/04.webp",
        "galleries-full/fitness-portes-du-soleil/05.webp"
      ]
    },
    {
      title: "Santa Lúcia",
      slug: "santa-lucia",
      images: [
        "galleries-full/santa-lucia/01.webp",
        "galleries-full/santa-lucia/02.webp",
        "galleries-full/santa-lucia/03.webp",
        "galleries-full/santa-lucia/04.webp",
        "galleries-full/santa-lucia/05.webp",
        "galleries-full/santa-lucia/06.webp",
        "galleries-full/santa-lucia/07.webp",
        "galleries-full/santa-lucia/08.webp",
        "galleries-full/santa-lucia/09.webp",
        "galleries-full/santa-lucia/10.webp",
        "galleries-full/santa-lucia/11.webp",
        "galleries-full/santa-lucia/12.webp",
        "galleries-full/santa-lucia/13.webp",
        "galleries-full/santa-lucia/14.webp",
        "galleries-full/santa-lucia/15.webp",
        "galleries-full/santa-lucia/16.webp"
      ]
    },
    {
      title: "San Valentin",
      slug: "san-valentin",
      images: [
        "galleries-full/san-valentin/01.webp",
        "galleries-full/san-valentin/02.webp",
        "galleries-full/san-valentin/03.webp",
        "galleries-full/san-valentin/04.webp",
        "galleries-full/san-valentin/05.webp",
        "galleries-full/san-valentin/06.webp",
        "galleries-full/san-valentin/07.webp",
        "galleries-full/san-valentin/08.webp",
        "galleries-full/san-valentin/09.webp",
        "galleries-full/san-valentin/10.webp",
        "galleries-full/san-valentin/11.webp"
      ]
    },
    {
      title: "Aroeira",
      slug: "aroeira",
      images: [
        "galleries-full/aroeira/01.webp",
        "galleries-full/aroeira/02.webp",
        "galleries-full/aroeira/03.webp",
        "galleries-full/aroeira/04.webp",
        "galleries-full/aroeira/05.webp"
      ]
    },
    {
      title: "Saint Dimas",
      slug: "saint-dimas",
      images: [
        "galleries-full/saint-dimas/01.webp",
        "galleries-full/saint-dimas/02.webp",
        "galleries-full/saint-dimas/03.webp",
        "galleries-full/saint-dimas/04.webp",
        "galleries-full/saint-dimas/05.webp",
        "galleries-full/saint-dimas/06.webp",
        "galleries-full/saint-dimas/07.webp",
        "galleries-full/saint-dimas/08.webp"
      ]
    },
    {
      title: "Saint John",
      slug: "saint-john",
      images: [
        "galleries-full/saint-john/01.webp",
        "galleries-full/saint-john/02.webp",
        "galleries-full/saint-john/03.webp",
        "galleries-full/saint-john/04.webp",
        "galleries-full/saint-john/05.webp",
        "galleries-full/saint-john/06.webp",
        "galleries-full/saint-john/07.webp",
        "galleries-full/saint-john/08.webp"
      ]
    },
    {
      title: "Parque Sálvia",
      slug: "salvia",
      images: [
        "galleries-full/salvia/01.webp",
        "galleries-full/salvia/02.webp",
        "galleries-full/salvia/03.webp",
        "galleries-full/salvia/04.webp",
        "galleries-full/salvia/05.webp",
        "galleries-full/salvia/06.webp",
        "galleries-full/salvia/07.webp",
        "galleries-full/salvia/08.webp",
        "galleries-full/salvia/09.webp"
      ]
    },
    {
      title: "Cerejeiras",
      slug: "cerejeiras",
      images: [
        "galleries-full/cerejeiras/01.webp",
        "galleries-full/cerejeiras/02.webp",
        "galleries-full/cerejeiras/03.webp",
        "galleries-full/cerejeiras/04.webp",
        "galleries-full/cerejeiras/05.webp",
        "galleries-full/cerejeiras/06.webp"
      ]
    },
    {
      title: "Sisal",
      slug: "sisal",
      images: [
        "galleries-full/sisal/01.webp",
        "galleries-full/sisal/02.webp",
        "galleries-full/sisal/03.webp",
        "galleries-full/sisal/04.webp",
        "galleries-full/sisal/05.webp",
        "galleries-full/sisal/06.webp",
        "galleries-full/sisal/07.webp"
      ]
    }
  ];

  // Get project slug from query parameters
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");

  if (!slug) {
    window.location.href = "index.html";
    return;
  }

  const project = projectsData.find(p => p.slug === slug);
  if (!project) {
    window.location.href = "index.html";
    return;
  }

  initGallery(project);

  function initGallery(project) {
    // Set project title & metadata
    document.getElementById("project-title").textContent = project.title;
    document.getElementById("project-slug").textContent = `FGN Projetos > ${project.title}`;
    document.title = `Projeto ${project.title} - FGN Arquitetura`;

    const images = project.images || [];
    if (images.length === 0) return;

    // Render Thumbnails
    const thumbsContainer = document.getElementById("project-thumbs");
    thumbsContainer.innerHTML = images.map((img, idx) => `
      <button class="${idx === 0 ? 'active' : ''}" data-index="${idx}">
        <img src="${img}" alt="Foto ${idx + 1} do projeto ${project.title}">
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
      stageImg.src = images[index];
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
