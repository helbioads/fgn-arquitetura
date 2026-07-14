"use client";

import { useState, useEffect } from "react";
import Home from "../page";
import settingsData from "../../content/settings.json";
import testimonialsData from "../../content/testimonials.json";
import projectsData from "../../content/projects.json";

export default function AdminBuilder() {
  // State for content files
  const [settings, setSettings] = useState<typeof settingsData>(settingsData);
  const [testimonials, setTestimonials] = useState<typeof testimonialsData>(testimonialsData);
  const [projects, setProjects] = useState<typeof projectsData>(projectsData);

  // UI state
  const [activeTab, setActiveTab] = useState<string>("hero");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: "", type: "" });
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const [selectedTestimonialIndex, setSelectedTestimonialIndex] = useState<number | null>(null);

  // Automatically clear status message after 5 seconds
  useEffect(() => {
    if (statusMessage.text) {
      const timer = setTimeout(() => setStatusMessage({ text: "", type: "" }), 5000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  // Save changes locally
  const handleSave = async () => {
    setSaving(true);
    setStatusMessage({ text: "Salvando alterações locais...", type: "info" });
    try {
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings, testimonials, projects }),
      });
      const data = await res.json();
      if (data.success) {
        setStatusMessage({ text: "Alterações locais salvas com sucesso!", type: "success" });
      } else {
        setStatusMessage({ text: `Erro ao salvar: ${data.error}`, type: "error" });
      }
    } catch (err: any) {
      setStatusMessage({ text: `Erro de rede: ${err.message}`, type: "error" });
    } finally {
      setSaving(false);
    }
  };

  // Publish to GitHub
  const handlePublish = async () => {
    setPublishing(true);
    setStatusMessage({ text: "Enviando e publicando no GitHub (isso pode demorar uns segundos)...", type: "info" });
    try {
      // First save locally to make sure all states are written to disk
      await handleSave();
      
      const res = await fetch("/api/admin/git", {
        method: "POST",
      });
      const data = await res.json();
      if (data.success) {
        setStatusMessage({ text: "Publicado no GitHub com sucesso! O site de produção será atualizado em breve.", type: "success" });
      } else {
        setStatusMessage({ text: `Erro ao publicar: ${data.error}`, type: "error" });
      }
    } catch (err: any) {
      setStatusMessage({ text: `Erro ao publicar: ${err.message}`, type: "error" });
    } finally {
      setPublishing(false);
    }
  };

  // Helper to update settings fields
  const updateSetting = (section: string, key: string, value: any) => {
    setSettings((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  return (
    <div className="adminContainer">
      <style>{`
        .adminContainer {
          display: flex;
          flex-direction: column;
          height: 100vh;
          font-family: 'Outfit', sans-serif;
          background-color: #0f172a;
          color: #f8fafc;
          overflow: hidden;
        }
        
        /* Header */
        .adminHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 24px;
          background-color: #1e293b;
          border-bottom: 1px solid #334155;
          z-index: 10;
        }
        
        .headerLeft {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .headerLeft h1 {
          font-size: 20px;
          font-weight: 700;
          margin: 0;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .tag-beta {
          background-color: #2563eb;
          color: white;
          font-size: 10px;
          font-weight: bold;
          padding: 2px 6px;
          border-radius: 4px;
          text-transform: uppercase;
        }

        .headerCenter {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .deviceToggle {
          display: flex;
          background-color: #0f172a;
          border-radius: 6px;
          padding: 2px;
          border: 1px solid #334155;
        }

        .deviceBtn {
          background: none;
          border: none;
          color: #64748b;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 500;
          transition: all 0.2s;
        }

        .deviceBtn.active {
          background-color: #2563eb;
          color: white;
        }

        .headerRight {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .btn-secondary {
          background-color: #334155;
          color: #f8fafc;
          border: 1px solid #475569;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-secondary:hover:not(:disabled) {
          background-color: #475569;
        }

        .btn-primary {
          background-color: #2563eb;
          color: white;
          border: none;
          padding: 8px 18px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);
        }

        .btn-primary:hover:not(:disabled) {
          background-color: #1d4ed8;
          box-shadow: 0 4px 12px -1px rgba(37, 99, 235, 0.4);
        }

        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Status Toast Alert */
        .statusAlert {
          position: fixed;
          top: 70px;
          right: 24px;
          padding: 12px 20px;
          border-radius: 8px;
          font-weight: 500;
          font-size: 14px;
          z-index: 100;
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.3);
          animation: slideIn 0.3s ease;
        }

        .statusAlert.info {
          background-color: #1e293b;
          border-left: 4px solid #3b82f6;
          color: #93c5fd;
        }

        .statusAlert.success {
          background-color: #064e3b;
          border-left: 4px solid #10b981;
          color: #a7f3d0;
        }

        .statusAlert.error {
          background-color: #7f1d1d;
          border-left: 4px solid #ef4444;
          color: #fca5a5;
        }

        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        /* Workspace Grid */
        .workspace {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        /* Sidebar Editor */
        .sidebar {
          width: 420px;
          background-color: #1e293b;
          border-right: 1px solid #334155;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .tabsContainer {
          display: flex;
          overflow-x: auto;
          background-color: #0f172a;
          border-bottom: 1px solid #334155;
          scrollbar-width: none;
        }
        
        .tabsContainer::-webkit-scrollbar {
          display: none;
        }

        .tabBtn {
          background: none;
          border: none;
          color: #94a3b8;
          padding: 14px 18px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          white-space: nowrap;
          transition: all 0.2s;
        }

        .tabBtn.active {
          color: #3b82f6;
          border-bottom-color: #3b82f6;
          background-color: rgba(59, 130, 246, 0.05);
        }

        .editorFields {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .fieldGroup {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .fieldGroup label {
          font-size: 11px;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .fieldGroup input, .fieldGroup textarea {
          background-color: #0f172a;
          border: 1px solid #334155;
          border-radius: 6px;
          padding: 10px 14px;
          color: #f8fafc;
          font-family: inherit;
          font-size: 14px;
          transition: border-color 0.2s;
        }

        .fieldGroup input:focus, .fieldGroup textarea:focus {
          border-color: #3b82f6;
          outline: none;
        }

        .fieldGroup textarea {
          min-height: 80px;
          resize: vertical;
        }

        /* List Items Cards styling */
        .listManager {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .cardItem {
          background-color: #0f172a;
          border: 1px solid #334155;
          border-radius: 6px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cardItem:hover {
          border-color: #475569;
          background-color: #1e293b;
        }

        .cardItem.active {
          border-color: #2563eb;
          background-color: rgba(37, 99, 235, 0.05);
        }

        .cardInfo h4 {
          margin: 0;
          font-size: 14px;
          font-weight: 600;
          color: #f8fafc;
        }

        .cardInfo p {
          margin: 4px 0 0 0;
          font-size: 11px;
          color: #64748b;
        }

        .cardActions {
          display: flex;
          gap: 8px;
        }

        .btn-icon {
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: all 0.2s;
        }

        .btn-icon:hover {
          color: #ef4444;
          background-color: rgba(239, 68, 68, 0.1);
        }

        /* Preview Area */
        .previewPane {
          flex: 1;
          background-color: #0f172a;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          position: relative;
        }

        .previewFrame {
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          overflow-y: auto;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          height: 100%;
        }

        .previewFrame.desktop {
          width: 100%;
          max-width: 100%;
        }

        .previewFrame.mobile {
          width: 410px;
          border-radius: 30px;
          border: 10px solid #1e293b;
          height: 800px;
        }
      `}</style>

      {/* Header Panel */}
      <header className="adminHeader">
        <div className="headerLeft">
          <h1>FGN Visual Builder</h1>
          <span className="tag-beta">Live Editor</span>
        </div>
        <div className="headerCenter">
          <div className="deviceToggle">
            <button
              className={`deviceBtn ${device === "desktop" ? "active" : ""}`}
              onClick={() => setDevice("desktop")}
            >
              Desktop
            </button>
            <button
              className={`deviceBtn ${device === "mobile" ? "active" : ""}`}
              onClick={() => setDevice("mobile")}
            >
              Celular
            </button>
          </div>
        </div>
        <div className="headerRight">
          <button className="btn-secondary" onClick={handleSave} disabled={saving || publishing}>
            {saving ? "Salvando..." : "Salvar Local"}
          </button>
          <button className="btn-primary" onClick={handlePublish} disabled={saving || publishing}>
            {publishing ? "Publicando..." : "Publicar no Site"}
          </button>
        </div>
      </header>

      {/* Status Notifications */}
      {statusMessage.text && (
        <div className={`statusAlert ${statusMessage.type}`}>
          {statusMessage.text}
        </div>
      )}

      {/* Main Workspace */}
      <div className="workspace">
        {/* Left Side: Sidebar Controls */}
        <aside className="sidebar">
          {/* Scrollable Tabs */}
          <div className="tabsContainer">
            {[
              { id: "hero", label: "Banner" },
              { id: "about", label: "Quem Somos" },
              { id: "stats", label: "Estatísticas" },
              { id: "services", label: "Serviços" },
              { id: "clients", label: "Logos Parceiros" },
              { id: "testimonials", label: "Depoimentos" },
              { id: "contact", label: "Contato" },
            ].map(tab => (
              <button
                key={tab.id}
                className={`tabBtn ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedProjectIndex(null);
                  setSelectedTestimonialIndex(null);
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form Fields */}
          <div className="editorFields">
            {/* HERO SECTION FIELDS */}
            {activeTab === "hero" && (
              <>
                <div className="fieldGroup">
                  <label>Texto de Apoio (Eyebrow)</label>
                  <input
                    type="text"
                    value={settings.hero.eyebrow}
                    onChange={e => updateSetting("hero", "eyebrow", e.target.value)}
                  />
                </div>
                <div className="fieldGroup">
                  <label>Título Principal</label>
                  <textarea
                    value={settings.hero.title}
                    onChange={e => updateSetting("hero", "title", e.target.value)}
                  />
                </div>
              </>
            )}

            {/* ABOUT SECTION FIELDS */}
            {activeTab === "about" && (
              <>
                <div className="fieldGroup">
                  <label>Texto de Apoio (Eyebrow)</label>
                  <input
                    type="text"
                    value={settings.about.eyebrow}
                    onChange={e => updateSetting("about", "eyebrow", e.target.value)}
                  />
                </div>
                <div className="fieldGroup">
                  <label>Título Principal</label>
                  <input
                    type="text"
                    value={settings.about.title}
                    onChange={e => updateSetting("about", "title", e.target.value)}
                  />
                </div>
                <div className="fieldGroup">
                  <label>Subtítulo / Introdução</label>
                  <input
                    type="text"
                    value={settings.about.subtitle}
                    onChange={e => updateSetting("about", "subtitle", e.target.value)}
                  />
                </div>
                <div className="fieldGroup">
                  <label>Descrição Completa</label>
                  <textarea
                    value={settings.about.description}
                    onChange={e => updateSetting("about", "description", e.target.value)}
                  />
                </div>
                <div className="fieldGroup">
                  <label>Foto 1 (Esquerda) - Nome do arquivo</label>
                  <input
                    type="text"
                    value={settings.about.image1}
                    onChange={e => updateSetting("about", "image1", e.target.value)}
                  />
                </div>
                <div className="fieldGroup">
                  <label>Foto 2 (Direita) - Nome do arquivo</label>
                  <input
                    type="text"
                    value={settings.about.image2}
                    onChange={e => updateSetting("about", "image2", e.target.value)}
                  />
                </div>
              </>
            )}

            {/* STATS SECTION */}
            {activeTab === "stats" && (
              <div className="listManager">
                {settings.stats.map((stat, i) => (
                  <div key={i} style={{ borderBottom: "1px solid #334155", paddingBottom: "16px", marginBottom: "8px", display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div className="fieldGroup">
                      <label>Valor #{i + 1}</label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={e => {
                          const newStats = [...settings.stats];
                          newStats[i].value = e.target.value;
                          setSettings(prev => ({ ...prev, stats: newStats }));
                        }}
                      />
                    </div>
                    <div className="fieldGroup">
                      <label>Texto Descritivo #{i + 1}</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={e => {
                          const newStats = [...settings.stats];
                          newStats[i].label = e.target.value;
                          setSettings(prev => ({ ...prev, stats: newStats }));
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* SERVICES SECTION */}
            {activeTab === "services" && (
              <div className="listManager">
                <button
                  className="btn-primary"
                  style={{ marginBottom: "12px" }}
                  onClick={() => {
                    const newServices = [...settings.services, { title: "Novo Serviço", icon: "\ue900" }];
                    setSettings(prev => ({ ...prev, services: newServices }));
                  }}
                >
                  + Adicionar Serviço
                </button>
                {settings.services.map((service, i) => (
                  <div key={i} style={{ borderBottom: "1px solid #334155", paddingBottom: "16px", marginBottom: "8px", display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "11px", fontWeight: "bold", color: "#94a3b8" }}>SERVIÇO #{i + 1}</span>
                      <button
                        className="btn-icon"
                        onClick={() => {
                          const newServices = settings.services.filter((_, idx) => idx !== i);
                          setSettings(prev => ({ ...prev, services: newServices }));
                        }}
                      >
                        Excluir
                      </button>
                    </div>
                    <div className="fieldGroup">
                      <label>Título do Serviço</label>
                      <input
                        type="text"
                        value={service.title}
                        onChange={e => {
                          const newServices = [...settings.services];
                          newServices[i].title = e.target.value;
                          setSettings(prev => ({ ...prev, services: newServices }));
                        }}
                      />
                    </div>
                    <div className="fieldGroup">
                      <label>Ícone Unicode (Hex)</label>
                      <input
                        type="text"
                        value={service.icon}
                        onChange={e => {
                          const newServices = [...settings.services];
                          newServices[i].icon = e.target.value;
                          setSettings(prev => ({ ...prev, services: newServices }));
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* LOGOS / PARTNERS SECTION */}
            {activeTab === "clients" && (
              <div className="listManager">
                <button
                  className="btn-primary"
                  style={{ marginBottom: "12px" }}
                  onClick={() => {
                    const newClients = [...settings.clients, { image: "logo-cliente01-1.png", name: "Novo Cliente" }];
                    setSettings(prev => ({ ...prev, clients: newClients }));
                  }}
                >
                  + Adicionar Logo Parceiro
                </button>
                {settings.clients.map((client, i) => (
                  <div key={i} style={{ borderBottom: "1px solid #334155", paddingBottom: "16px", marginBottom: "8px", display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "11px", fontWeight: "bold", color: "#94a3b8" }}>PARCEIRO #{i + 1}</span>
                      <button
                        className="btn-icon"
                        onClick={() => {
                          const newClients = settings.clients.filter((_, idx) => idx !== i);
                          setSettings(prev => ({ ...prev, clients: newClients }));
                        }}
                      >
                        Excluir
                      </button>
                    </div>
                    <div className="fieldGroup">
                      <label>Nome da Construtora</label>
                      <input
                        type="text"
                        value={client.name}
                        onChange={e => {
                          const newClients = [...settings.clients];
                          newClients[i].name = e.target.value;
                          setSettings(prev => ({ ...prev, clients: newClients }));
                        }}
                      />
                    </div>
                    <div className="fieldGroup">
                      <label>Arquivo de Imagem (Logo)</label>
                      <input
                        type="text"
                        value={client.image}
                        onChange={e => {
                          const newClients = [...settings.clients];
                          newClients[i].image = e.target.value;
                          setSettings(prev => ({ ...prev, clients: newClients }));
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TESTIMONIALS SECTION */}
            {activeTab === "testimonials" && (
              <div className="listManager">
                <button
                  className="btn-primary"
                  style={{ marginBottom: "12px" }}
                  onClick={() => {
                    const newTestimonials = [
                      ...testimonials.testimonials,
                      { author: "Novo Nome", company: "Nome Empresa", quote: "Texto do depoimento..." }
                    ];
                    setTestimonials({ testimonials: newTestimonials });
                    setSelectedTestimonialIndex(newTestimonials.length - 1);
                  }}
                >
                  + Adicionar Depoimento
                </button>

                {selectedTestimonialIndex === null ? (
                  testimonials.testimonials.map((item, i) => (
                    <div key={i} className="cardItem" onClick={() => setSelectedTestimonialIndex(i)}>
                      <div className="cardInfo">
                        <h4>{item.author}</h4>
                        <p>{item.company}</p>
                      </div>
                      <div className="cardActions">
                        <button
                          className="btn-icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            const newTestimonials = testimonials.testimonials.filter((_, idx) => idx !== i);
                            setTestimonials({ testimonials: newTestimonials });
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <button className="btn-secondary" onClick={() => setSelectedTestimonialIndex(null)}>
                      ← Voltar à Lista
                    </button>
                    <div className="fieldGroup">
                      <label>Autor</label>
                      <input
                        type="text"
                        value={testimonials.testimonials[selectedTestimonialIndex].author}
                        onChange={e => {
                          const newList = [...testimonials.testimonials];
                          newList[selectedTestimonialIndex].author = e.target.value;
                          setTestimonials({ testimonials: newList });
                        }}
                      />
                    </div>
                    <div className="fieldGroup">
                      <label>Empresa / Construtora</label>
                      <input
                        type="text"
                        value={testimonials.testimonials[selectedTestimonialIndex].company}
                        onChange={e => {
                          const newList = [...testimonials.testimonials];
                          newList[selectedTestimonialIndex].company = e.target.value;
                          setTestimonials({ testimonials: newList });
                        }}
                      />
                    </div>
                    <div className="fieldGroup">
                      <label>Depoimento</label>
                      <textarea
                        value={testimonials.testimonials[selectedTestimonialIndex].quote}
                        onChange={e => {
                          const newList = [...testimonials.testimonials];
                          newList[selectedTestimonialIndex].quote = e.target.value;
                          setTestimonials({ testimonials: newList });
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* CONTACTS SECTION */}
            {activeTab === "contact" && (
              <>
                <div className="fieldGroup">
                  <label>E-mail Comercial</label>
                  <input
                    type="email"
                    value={settings.contact.email}
                    onChange={e => updateSetting("contact", "email", e.target.value)}
                  />
                </div>
                <div className="fieldGroup">
                  <label>Link do WhatsApp</label>
                  <input
                    type="text"
                    value={settings.contact.whatsapp}
                    onChange={e => updateSetting("contact", "whatsapp", e.target.value)}
                  />
                </div>
                <div className="fieldGroup">
                  <label>Endereço Físico Comercial</label>
                  <textarea
                    value={settings.contact.address}
                    onChange={e => updateSetting("contact", "address", e.target.value)}
                  />
                </div>
                <div className="fieldGroup">
                  <label>Página Facebook (Link)</label>
                  <input
                    type="text"
                    value={settings.contact.facebook}
                    onChange={e => updateSetting("contact", "facebook", e.target.value)}
                  />
                </div>
                <div className="fieldGroup">
                  <label>Instagram (Link)</label>
                  <input
                    type="text"
                    value={settings.contact.instagram}
                    onChange={e => updateSetting("contact", "instagram", e.target.value)}
                  />
                </div>
                <div className="fieldGroup">
                  <label>LinkedIn (Link)</label>
                  <input
                    type="text"
                    value={settings.contact.linkedin}
                    onChange={e => updateSetting("contact", "linkedin", e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
        </aside>

        {/* Right Side: Live preview */}
        <section className="previewPane">
          <div className={`previewFrame ${device}`}>
            <Home previewData={{ settings, testimonials, projects }} />
          </div>
        </section>
      </div>
    </div>
  );
}
