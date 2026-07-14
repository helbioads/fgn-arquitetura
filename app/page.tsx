"use client";
import { useEffect, useState } from "react";

import testimonialsData from "../content/testimonials.json";
import projectsData from "../content/projects.json";
import settingsData from "../content/settings.json";

const testimonials = testimonialsData.testimonials;
const services = settingsData.services.map(s => [s.title, s.icon] as const);
const projects = projectsData.projects.map(p => [p.title, p.cover, p.slug, p.images.length] as const);
const whats = settingsData.contact.whatsapp;

// Helper to format image paths properly (handling /images prefix)
const formatImgPath = (path: string) => {
  if (!path) return "";
  return path.startsWith("/") ? path : `/images/${path}`;
};

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [slide, setSlide] = useState(0);
  const [hero, setHero] = useState(0);
  const [paused, setPaused] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setHero(v => (v + 1) % 3), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      const el = document.querySelector('.projectGrid');
      if (!el) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
        setSlide(0);
      } else {
        el.scrollBy({ left: el.clientWidth / 5, behavior: 'smooth' });
        setSlide(v => Math.min(projects.length - 1, v + 1));
      }
    }, 3500);
    return () => clearInterval(t);
  }, [paused]);

  const move = (dir: number) => {
    const el = document.querySelector('.projectGrid');
    if (el) el.scrollBy({ left: dir * (el.clientWidth / 5), behavior: 'smooth' });
    setSlide(v => Math.max(0, Math.min(projects.length - 1, v + dir)));
  };

  return (
    <main>
      <header className="header">
        <a href="#inicio">
          <img src="/images/logobranco.png" className="logo" alt="FGN Arquitetura Técnica BIM" />
        </a>
        <div className="headerRight">
          <nav className={menu ? "nav open" : "nav"}>
            {[
              ["sobre", "Sobre a FGN"],
              ["servicos", "Serviços"],
              ["projetos", "Projetos"],
              ["contato", "Contato"],
            ].map(x => (
              <a key={x[0]} href={`#${x[0]}`} onClick={() => setMenu(false)}>
                {x[1]}
              </a>
            ))}
          </nav>
          <div className="headerSocial">
            <a href={settingsData.contact.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">&#xf09a;</a>
            <a href={settingsData.contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">&#xf08c;</a>
            <a href={settingsData.contact.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">&#xf16d;</a>
          </div>
        </div>
        <button className="menu" onClick={() => setMenu(!menu)} aria-label="Abrir menu">
          <span />
          <span />
        </button>
      </header>

      <section className="hero" id="inicio">
        <div className={`heroBg hero${hero + 1}`} />
        <div className="heroContent">
          <p className="eyebrow light">{settingsData.hero.eyebrow}</p>
          <h1>{settingsData.hero.title}</h1>
          <div className="actions">
            <a className="button" href={whats} target="_blank" rel="noreferrer">
              Solicitar orçamento
            </a>
          </div>
        </div>
        <div className="heroDots">
          {[0, 1, 2].map(i => (
            <button
              key={i}
              className={i === hero ? 'active' : ''}
              onClick={() => setHero(i)}
              aria-label={`Banner ${i + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="about wrap" id="sobre">
        <div className="aboutVisual">
          <img className="aboutOne" src={formatImgPath(settingsData.about.image1)} alt="Empreendimento projetado pela FGN" />
          <img className="aboutTwo" src={formatImgPath(settingsData.about.image2)} alt="Detalhe arquitetônico" />
          <div className="bimTag">
            Projetos<strong>em BIM</strong>
          </div>
        </div>
        <div className="aboutText">
          <p className="eyebrow">{settingsData.about.eyebrow}</p>
          <h2>{settingsData.about.title}</h2>
          <p className="intro">{settingsData.about.subtitle}</p>
          <p>{settingsData.about.description}</p>
          <a className="arrowLink" href={whats} target="_blank" rel="noreferrer">
            Vamos conversar <span>→</span>
          </a>
        </div>
      </section>

      <section className="numbers">
        <div className="wrap stats">
          {settingsData.stats.map((s, i) => (
            <div key={i}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="services wrap" id="servicos">
        <div className="sectionHead">
          <div>
            <p className="eyebrow">O que nós fazemos</p>
            <h2>Serviços</h2>
          </div>
          <p>
            Os serviços de arquitetura envolvem uma ampla gama de atividades relacionadas ao design, planejamento e construção de espaços arquitetônicos.
          </p>
        </div>
        <div className="serviceGrid">
          {services.map(([s, icon], i) => (
            <article className="service" key={s}>
              <span className="serviceIcon" aria-hidden="true">
                {icon}
              </span>
              <h3>{s}</h3>
              <a href={`/servicos/#sessao0${i + 1}`}>→ &nbsp;SAIBA MAIS</a>
            </article>
          ))}
        </div>
      </section>

      <section
        className="projects"
        id="projetos"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div className="wrap">
          <div className="projectGrid" tabIndex={0} aria-label="Carrossel de projetos em reprodução automática">
            {projects.map((p, i) => (
              <article className="project" key={p[0]}>
                <a href={`/projetos/${p[2]}`}>
                  <img src={formatImgPath(p[1])} alt={`Projeto ${p[0]}`} loading={i > 4 ? "lazy" : undefined} />
                  <div>
                    <h3>{p[0]}</h3>
                  </div>
                </a>
              </article>
            ))}
          </div>
          <div className="carouselControls">
            <button onClick={() => move(-1)} disabled={slide === 0} aria-label="Projetos anteriores">
              ←
            </button>
            <span>
              {String(slide + 1).padStart(2, '0')} / {projects.length}
            </span>
            <button onClick={() => move(1)} disabled={slide === projects.length - 1} aria-label="Próximos projetos">
              →
            </button>
          </div>
        </div>
      </section>

      <section className="trust wrap">
        <p className="eyebrow">{settingsData.about.eyebrow === "Quem nós somos" ? "Empresas que confiam na FGN" : `Parceiros`}</p>
        <div className="clientLogos">
          {settingsData.clients.map((c, i) => (
            <img src={formatImgPath(c.image)} key={i} alt={c.name} />
          ))}
        </div>
      </section>

      <section className="testimonials">
        <div className="wrap">
          <p className="eyebrow light">Depoimentos</p>
          <div className="quotes">
            {testimonials.map((t, i) => (
              <blockquote key={i} className={i === activeTestimonial ? 'active' : ''} style={{ whiteSpace: 'pre-line' }}>
                “{t.quote}”
                <footer>
                  <strong>{t.author}</strong>
                  <span>{t.company}</span>
                </footer>
              </blockquote>
            ))}
          </div>
          <div className="testimonialDots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={i === activeTestimonial ? 'active' : ''}
                onClick={() => setActiveTestimonial(i)}
                aria-label={`Depoimento ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <footer className="footer" id="contato">
        <div className="wrap footerTop">
          <img src="/images/logobranco.png" alt="FGN Arquitetura" />
          <h2>Vamos trabalhar juntos</h2>
          <strong>Deixe-nos saber o que você precisa.</strong>
          <p>Vamos formatar a solução que melhor lhe atenda.</p>
          <strong>{settingsData.contact.address}</strong>
          <div className="footerContact">
            <a className="waCircle" href={whats} target="_blank" rel="noreferrer" aria-label="Conversar com a FGN pelo WhatsApp">&#xf232;</a>
            <a href={`mailto:${settingsData.contact.email}`}>{settingsData.contact.email}</a>
          </div>
        </div>
        <div className="wrap bottom">
          <div>
            <span>2026 © FGN Arquitetura e Tecnologia Ltda. Todos os direitos reservados.</span>
            <a href="/politica-de-privacidade">Política de privacidade</a>
          </div>
          <div className="footerSocial">
            <a href={settingsData.contact.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">&#xf09a;</a>
            <a href={settingsData.contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">&#xf08c;</a>
            <a href={settingsData.contact.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">&#xf16d;</a>
          </div>
        </div>
      </footer>
      <a className="whatsapp" href={whats} target="_blank" rel="noreferrer" aria-label="Conversar com a FGN pelo WhatsApp">&#xf232;</a>
    </main>
  );
}
