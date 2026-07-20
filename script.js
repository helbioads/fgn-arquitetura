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

  // Hero BG Slider
  const heroBg = document.getElementById("hero-bg");
  const heroDots = document.getElementById("hero-dots") ? document.getElementById("hero-dots").querySelectorAll("button") : [];
  let currentHeroIndex = 0;
  const heroBgClasses = ["hero1", "hero2", "hero3"];

  function changeHeroBg(index) {
    if (!heroBg) return;
    heroBg.className = `heroBg ${heroBgClasses[index]} active`;
    heroDots.forEach((dot, idx) => {
      if (idx === index) dot.classList.add("active");
      else dot.classList.remove("active");
    });
    currentHeroIndex = index;
  }

  if (heroBg && heroDots.length > 0) {
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
  }

  // Projects slider carousel logic
  const projectsGrid = document.getElementById("projects-grid");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  const indexIndicator = document.getElementById("carousel-index");
  
  if (projectsGrid && prevBtn && nextBtn && indexIndicator) {
    const projects = projectsGrid.querySelectorAll(".project");
    const itemsCount = projects.length;
    let currentSlide = 0;

    function updateCarouselStatus() {
      indexIndicator.textContent = `${String(currentSlide + 1).padStart(2, '0')} / ${String(itemsCount).padStart(2, '0')}`;
      prevBtn.disabled = currentSlide === 0;
      nextBtn.disabled = currentSlide === itemsCount - 1;
    }

    function scrollCarousel(dir) {
      const itemWidth = projectsGrid.querySelector(".project").clientWidth;
      projectsGrid.scrollBy({ left: dir * itemWidth, behavior: "smooth" });
      currentSlide = Math.max(0, Math.min(itemsCount - 1, currentSlide + dir));
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

  // Testimonials Quotes Slider
  const quotesContainer = document.getElementById("testimonials-quotes");
  const dotsContainer = document.getElementById("testimonials-dots");

  if (quotesContainer && dotsContainer) {
    const blockquotes = quotesContainer.querySelectorAll("blockquote");
    const dots = dotsContainer.querySelectorAll("button");

    function selectTestimonial(index) {
      blockquotes.forEach((q, idx) => {
        if (idx === index) q.classList.add("active");
        else q.classList.remove("active");
      });
      dots.forEach((dot, idx) => {
        if (idx === index) dot.classList.add("active");
        else dot.classList.remove("active");
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener("click", () => selectTestimonial(idx));
    });
  }
});
