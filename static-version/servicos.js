document.addEventListener("DOMContentLoaded", () => {
  // Services details data mapped exactly from app/servicos/page.tsx
  const servicesData = [
    {
      title: "Parcelamento do Solo",
      icon: "\ue907",
      paragraphs: [
        "O parcelamento do solo é um processo que consiste em parcelar ou dividir um terreno ou gleba em lotes menores. Esse processo pode ser na forma de loteamento, desmembramento e fracionamento, sempre mediante aprovação dos órgãos públicos."
      ]
    },
    {
      title: "Estudo de Massa",
      icon: "\ue903",
      paragraphs: [
        "O estudo de massa leva em conta o potencial construtivo do local, traduzindo em projeto a legislação aplicável, como recuos mínimos, gabarito, áreas permeáveis e outros índices.",
        "Também considera topografia, limitações ambientais, diretrizes viárias e servidões, ajudando a estabelecer a melhor forma de ocupação do empreendimento."
      ]
    },
    {
      title: "Estudo Preliminar",
      icon: "\ue905",
      paragraphs: [
        "O estudo preliminar apresenta a proposta de solução arquitetônica, com análise do terreno, níveis, acessos, áreas permeáveis, estacionamento e quadro de índices preliminares.",
        "É fundamental que esta etapa já atenda à legislação vigente e às diretrizes estabelecidas para o lote."
      ]
    },
    {
      title: "Projeto Arquitetônico",
      icon: "\ue901",
      paragraphs: [
        "O projeto arquitetônico compreende a montagem e o desenvolvimento do material conforme a proposta discutida no estudo preliminar.",
        "Inclui plantas, cortes e fachadas em escala adequada, suficientes para o completo entendimento do projeto."
      ]
    },
    {
      title: "Projeto Legal (ou Projeto de Prefeitura)",
      icon: "\ue906",
      paragraphs: [
        "O projeto legal adapta a representação do projeto arquitetônico às exigências das prefeituras municipais.",
        "Pode incluir a vinculação de vagas às unidades habitacionais para posterior registro, conforme interesse da construtora ou exigência do município."
      ]
    },
    {
      title: "Compatibilização de Projetos Complementares",
      icon: "\ue902",
      paragraphs: [
        "A compatibilização integra o projeto arquitetônico aos projetos de engenharia — estrutural, elétrica, hidráulica, ar-condicionado, gases medicinais e outros — garantindo o funcionamento conjunto e a qualidade arquitetônica."
      ]
    },
    {
      title: "Projeto Executivo",
      icon: "\ue904",
      paragraphs: [
        "É a representação detalhada do projeto, suficiente para a execução da obra. Pode incluir esquadrias, acabamentos, paginação de pisos, paredes, tetos e áreas molhadas."
      ]
    },
    {
      title: "Projeto de Acessibilidade",
      icon: "\ue900",
      paragraphs: [
        "Consiste em adequar acessos, circulações, mobiliário e espaços à legislação vigente, como a NBR 9050/2020.",
        "Especifica pisos de alerta e direcionais, guias de balizamento, corrimãos e guarda-corpos."
      ]
    }
  ];

  const nav = document.getElementById("services-nav");
  const activeIcon = document.getElementById("active-icon");
  const activeTitle = document.getElementById("active-title");
  const activeDesc = document.getElementById("active-description");

  // Render Navigation Buttons
  nav.innerHTML = servicesData.map((s, idx) => `
    <button data-index="${idx}">
      <i>${s.icon}</i>
      <span>${s.title}</span>
    </button>
  `).join("");

  const buttons = nav.querySelectorAll("button");

  function selectService(index) {
    if (index < 0 || index >= servicesData.length) return;

    buttons.forEach((btn, idx) => {
      if (idx === index) btn.classList.add("active");
      else btn.classList.remove("active");
    });

    const activeService = servicesData[index];
    activeIcon.textContent = activeService.icon;
    activeTitle.textContent = activeService.title;
    activeDesc.innerHTML = activeService.paragraphs.map(p => `<p>${p}</p>`).join("");
    
    // Update hash silently without jumping
    history.replaceState(null, '', `#sessao0${index + 1}`);
  }

  // Bind click events
  buttons.forEach((btn, index) => {
    btn.addEventListener("click", () => selectService(index));
  });

  // Select initial service based on URL hash
  function getInitialIndex() {
    const hash = window.location.hash;
    if (hash && hash.startsWith("#sessao")) {
      const num = parseInt(hash.replace("#sessao0", "").replace("#sessao", "")) - 1;
      if (!isNaN(num) && num >= 0 && num < servicesData.length) {
        return num;
      }
    }
    return 0;
  }

  // Initialize
  selectService(getInitialIndex());

  // Listen to hash changes (e.g. if user navigates back/forward or clicks another link)
  window.addEventListener("hashchange", () => {
    selectService(getInitialIndex());
  });
});
