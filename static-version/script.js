document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const menuToggle = document.getElementById("menu-toggle");
  const mainNav = document.getElementById("main-nav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      mainNav.classList.toggle("open");
      const spans = menuToggle.querySelectorAll("span");
      if (mainNav.classList.contains("open")) {
        spans[0].style.transform = "rotate(45deg) translate(6px, 6px)";
        spans[1].style.transform = "rotate(-45deg) translate(1px, -1px)";
      } else {
        spans[0].style.transform = "none";
        spans[1].style.transform = "none";
      }
    });

    // Close menu when clicking links
    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.querySelectorAll("span").forEach(s => s.style.transform = "none");
      });
    });
  }

  // Load Content Dynamically from JSON
  Promise.all([
    fetch("content/settings.json").then(res => res.json()),
    fetch("content/testimonials.json").then(res => res.json()),
    fetch("content/projects.json").then(res => res.json())
  ])
  .then(([settings, testimonialsData, projectsData]) => {
    initSettings(settings);
    initProjects(projectsData.projects);
    initTestimonials(testimonialsData.testimonials);
  })
  .catch(err => console.error("Erro ao carregar dados do site:", err));

  // Initialize general settings (Hero, About, Stats, Services, Clients, Contacts)
  function initSettings(settings) {
    // 1. Social & Contact Links
    document.querySelectorAll(".fb-link").forEach(el => el.href = settings.contact.facebook);
    document.querySelectorAll(".ln-link").forEach(el => el.href = settings.contact.linkedin);
    document.querySelectorAll(".ig-link").forEach(el => el.href = settings.contact.instagram);
    document.querySelectorAll(".whats-link").forEach(el => el.href = settings.contact.whatsapp);
    
    const emailEl = document.getElementById("footer-email");
    if (emailEl) {
      emailEl.href = `mailto:${settings.contact.email}`;
      emailEl.textContent = settings.contact.email;
    }
    const addressEl = document.getElementById("footer-address");
    if (addressEl) addressEl.textContent = settings.contact.address;

    // 2. Hero Section
    const heroEyebrow = document.getElementById("hero-eyebrow");
    const heroTitle = document.getElementById("hero-title");
    if (heroEyebrow) heroEyebrow.textContent = settings.hero.eyebrow;
    if (heroTitle) heroTitle.textContent = settings.hero.title;

    // Hero Rotating BG Slider
    const heroBg = document.getElementById("hero-bg");
    const heroDots = document.getElementById("hero-dots").querySelectorAll("button");
    let currentHeroIndex = 0;
    const heroBgClasses = ["hero1", "hero2", "hero3"];

    function changeHeroBg(index) {
      heroBg.className = `heroBg ${heroBgClasses[index]} active`;
      heroDots.forEach((dot, idx) => {
        if (idx === index) dot.classList.add("active");
        else dot.classList.remove("active");
      });
      currentHeroIndex = index;
    }

    // Auto rotate banners every 5s
    let heroTimer = setInterval(() => {
      const nextIndex = (currentHeroIndex + 1) % 3;
      changeHeroBg(nextIndex);
    }, 5000);

    heroDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        clearInterval(heroTimer);
        changeHeroBg(index);
        // Restart timer
        heroTimer = setInterval(() => {
          const nextIndex = (currentHeroIndex + 1) % 3;
          changeHeroBg(nextIndex);
        }, 5000);
      });
    });

    // 3. About Section
    const formatImg = path => path.startsWith("/") ? path.slice(1) : path;
    
    document.getElementById("about-img1").src = formatImg(settings.about.image1);
    document.getElementById("about-img2").src = formatImg(settings.about.image2);
    document.getElementById("about-eyebrow").textContent = settings.about.eyebrow;
    document.getElementById("about-title").textContent = settings.about.title;
    document.getElementById("about-subtitle").textContent = settings.about.subtitle;
    document.getElementById("about-description").textContent = settings.about.description;

    // 4. Statistics (Stats)
    const statsContainer = document.getElementById("stats-container");
    if (statsContainer) {
      statsContainer.innerHTML = settings.stats.map(s => `
        <div>
          <strong>${s.value}</strong>
          <span>${s.label}</span>
        </div>
      `).join("");
    }

    // 5. Services Grid
    const servicesGrid = document.getElementById("services-grid");
    if (servicesGrid) {
      servicesGrid.innerHTML = settings.services.map((s, idx) => `
        <article class="service">
          <span class="serviceIcon" aria-hidden="true">${s.icon}</span>
          <h3>${s.title}</h3>
          <a href="servicos.html#sessao0${idx + 1}">→ &nbsp;SAIBA MAIS</a>
        </article>
      `).join("");
    }

    // 6. Clients Logo Carrossel Grid
    const clientsGrid = document.getElementById("clients-grid");
    const trustEyebrow = document.getElementById("trust-eyebrow");
    if (trustEyebrow) {
      trustEyebrow.textContent = settings.about.eyebrow === "Quem nós somos" ? "Empresas que confiam na FGN" : "Parceiros";
    }
    if (clientsGrid) {
      clientsGrid.innerHTML = settings.clients.map(c => `
        <img src="${formatImg(c.image)}" alt="${c.name}">
      `).join("");
    }
  }

  // Initialize projects slider
  function initProjects(projects) {
    const projectsGrid = document.getElementById("projects-grid");
    const prevBtn = document.getElementById("carousel-prev");
    const nextBtn = document.getElementById("carousel-next");
    const indexIndicator = document.getElementById("carousel-index");
    
    if (!projectsGrid) return;

    const formatImg = path => path.startsWith("/") ? path.slice(1) : path;

    // Render projects list
    projectsGrid.innerHTML = projects.map(p => `
      <article class="project">
        <a href="projeto.html?slug=${p.slug}">
          <img src="${formatImg(p.cover)}" alt="Projeto ${p.title}" loading="lazy">
          <div>
            <h3>${p.title}</h3>
          </div>
        </a>
      </article>
    `).join("");

    let currentSlide = 0;

    function updateCarouselStatus() {
      const itemsCount = projects.length;
      indexIndicator.textContent = `${String(currentSlide + 1).padStart(2, '0')} / ${String(itemsCount).padStart(2, '0')}`;
      
      prevBtn.disabled = currentSlide === 0;
      nextBtn.disabled = currentSlide === itemsCount - 1;
    }

    function scrollCarousel(dir) {
      const itemWidth = projectsGrid.querySelector(".project").clientWidth;
      projectsGrid.scrollBy({ left: dir * itemWidth, behavior: "smooth" });
      currentSlide = Math.max(0, Math.min(projects.length - 1, currentSlide + dir));
      updateCarouselStatus();
    }

    prevBtn.addEventListener("click", () => scrollCarousel(-1));
    nextBtn.addEventListener("click", () => scrollCarousel(1));

    // Handle manual scroll update
    let scrollTimer = null;
    projectsGrid.addEventListener("scroll", () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const itemWidth = projectsGrid.querySelector(".project").clientWidth;
        currentSlide = Math.round(projectsGrid.scrollLeft / itemWidth);
        updateCarouselStatus();
      }, 150);
    });

    updateCarouselStatus();
  }

  // Initialize Testimonials Quotes
  function initTestimonials(testimonials) {
    const quotesContainer = document.getElementById("testimonials-quotes");
    const dotsContainer = document.getElementById("testimonials-dots");

    if (!quotesContainer || !dotsContainer) return;

    // Render Quotes
    quotesContainer.innerHTML = testimonials.map((t, idx) => `
      <blockquote class="${idx === 0 ? 'active' : ''}">
        “${t.quote}”
        <footer>
          <strong>${t.author}</strong>
          <span>${t.company}</span>
        </footer>
      </blockquote>
    `).join("");

    // Render Dots
    dotsContainer.innerHTML = testimonials.map((_, idx) => `
      <button class="${idx === 0 ? 'active' : ''}" data-quote="${idx}" aria-label="Depoimento ${idx + 1}"></button>
    `).join("");

    const blockquotes = quotesContainer.querySelectorAll("blockquote");
    const dots = dotsContainer.querySelectorAll("button");
    let currentTestimonial = 0;

    function selectTestimonial(index) {
      blockquotes.forEach((q, idx) => {
        if (idx === index) q.classList.add("active");
        else q.classList.remove("active");
      });
      dots.forEach((dot, idx) => {
        if (idx === index) dot.classList.add("active");
        else dot.classList.remove("active");
      });
      currentTestimonial = index;
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener("click", () => selectTestimonial(idx));
    });
  }
});
