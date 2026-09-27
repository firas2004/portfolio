import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowUpRight, Bot, Cloud, Cpu, FileDown, Github, GraduationCap,
  Linkedin, Mail, Sparkles, X, Wifi, Shield, Languages,
} from "lucide-react";
import { Scene } from "./components/Scene";
import InteractiveTerminal from "./components/InteractiveTerminal";
import { projects, type Project } from "./data/projects";
import { t, type Lang } from "./i18n";

const SKILL_ICONS = [Cpu, Bot, Cloud, Shield, Wifi];

const MARQUEE = [
  "STM32", "ESP32", "FreeRTOS", "MQTT", "LoRaWAN", "KAFKA", "KUBERNETES", "DOCKER",
  "TERRAFORM", "ANSIBLE", "AWS", "PYTHON", "FASTAPI", "REACT", "CAN BUS", "PROMETHEUS",
  "GRAFANA", "CCNA", "CI/CD", "GITHUB ACTIONS", "SUB-1 GHZ", "ROS2",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

/* ---- Preloader ---- */
function Preloader({ done, lang }: { done: () => void; lang: Lang }) {
  const lines = t[lang].boot;
  const [line, setLine] = useState(0);
  useEffect(() => {
    if (line < lines.length - 1) {
      const timer = setTimeout(() => setLine((i) => i + 1), 300);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(done, 550);
    return () => clearTimeout(timer);
  }, [line, lines.length, done]);
  return (
    <motion.div className="preloader" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <div className="preloader-core">FIRAS'S <span>PORTFOLIO</span></div>
      <div className="boot-lines">
        {lines.slice(0, line + 1).map((l) => (
          <p key={l}><span className="prompt">&gt;</span> {l} <span className="ok">OK</span></p>
        ))}
      </div>
      <div className="boot-bar">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: `${((line + 1) / lines.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

/* ---- Language toggle button ---- */
function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <button
      id="lang-toggle"
      className="lang-toggle"
      onClick={() => setLang(lang === "en" ? "fr" : "en")}
      aria-label={lang === "en" ? "Switch to French" : "Passer en anglais"}
      title={lang === "en" ? "Passer en français" : "Switch to English"}
    >
      <Languages size={14} />
      <span>{lang === "en" ? "FR" : "EN"}</span>
    </button>
  );
}

/* ---- Institution logo map ---- */
const INST_LOGOS: Record<string, string> = {
  "3S Standard Sharing Software — Tunis": "/images/logo-3s.png",
  "3S Tunisie — Tunis": "/images/logo-3s.png",
  "AsteelFlash Tunisia — Soukra, Ariana": "/images/logo-asteelflash.png",
  "AsteelFlash Tunisie — Soukra, Ariana": "/images/logo-asteelflash.png",
  "Faculty of Sciences of Tunis — University of Tunis El Manar": "/images/logo-fst.png",
  "Faculté des Sciences de Tunis — Université de Tunis El Manar": "/images/logo-fst.png",
  "Faculty of Sciences of Tunis — Maths, Physics, Computer Science": "/images/logo-utm.png",
  "Faculté des Sciences de Tunis — Mathématiques, Physique, Informatique": "/images/logo-utm.png",
};

/* ---- App ---- */
export default function App() {
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<Lang>("fr");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected: Project | undefined = projects.find((p) => p.id === selectedId);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });
  const tx = t[lang];

  return (
    <main>
      <AnimatePresence>{loading && <Preloader done={() => setLoading(false)} lang={lang} />}</AnimatePresence>

      {/* ---- Nav ---- */}
      <nav className="nav">
        <a className="brand" href="#top">FIRAS <span>ADEL</span></a>
        <div className="nav-links">
          <a href="#lab">{tx.navLab}</a>
          <a href="#projects">{tx.navProjects}</a>
          <a href="#about">{tx.navAbout}</a>
          <a href="#skills">{tx.navSkills}</a>
          <a href="#contact">{tx.navContact}</a>
        </div>
        <div className="nav-right">
          <LangToggle lang={lang} setLang={setLang} />
          <a className="cv-button" href="/documents/firas-adel-cv.pdf" download>
            <FileDown size={15} /> CV
          </a>
        </div>
        <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      </nav>

      {/* ---- Hero ---- */}
      <motion.section className="hero" id="top" initial="hidden" animate="show" variants={fadeUp}>
        <div className="hero-copy">
          <div className="chip"><Sparkles size={13} /> {tx.chip}</div>
          <p className="eyebrow">{tx.eyebrowHero}</p>
          <h1>
            {tx.h1a} <span className="gradient-text">{tx.h1b}</span>
          </h1>
          <p className="hero-description">
            {tx.heroDesc1} <strong>Firas Adel</strong>{tx.heroDesc2}{" "}
            <strong>{tx.heroDescPFE}</strong>{tx.heroDesc3}
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#lab">{tx.btnLab} <ArrowUpRight size={17} /></a>
            <a className="button secondary" href="#projects">{tx.btnProjects}</a>
            <a className="button ghost" href="/documents/firas-adel-cv.pdf" download>
              <FileDown size={16} /> {tx.btnCv}
            </a>
          </div>
          <div className="status-line"><span className="status-dot" /> {tx.status}</div>
          <div className="hero-stats">
            {tx.stats.map(([num, label]) => (
              <div className="stat" key={label}><strong>{num}</strong><small>{label}</small></div>
            ))}
          </div>
        </div>
        <div className="hero-panel">
          <InteractiveTerminal lang={lang} onSelectProject={setSelectedId} />
        </div>
      </motion.section>

      {/* ---- Marquee ---- */}
      <div className="marquee" aria-hidden>
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].map((s, i) => <span key={i}>{s}<i>◆</i></span>)}
        </div>
      </div>

      {/* ---- Profile Card ---- */}
      <motion.section
        className="profile-section"
        id="profile"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
      >
        <div className="profile-card">
          <div className="profile-photo-wrap">
            <div className="profile-ring" />
            <div className="profile-ring profile-ring-2" />
            <img src="/images/firas-photo.png" alt="Firas Adel" className="profile-photo" />
            <div className="profile-scanline" />
          </div>
          <div className="profile-info">
            <p className="eyebrow" style={{ marginBottom: "8px" }}>FIRAS ADEL</p>
            <h2 className="profile-name">Élève Ingénieur <span className="gradient-text">IoT</span></h2>
            <p className="muted profile-bio">
              Systèmes embarqués · Cloud &amp; DevOps · Vision industrielle<br />
              Faculté des Sciences de Tunis · Université de Tunis El Manar
            </p>
            <div className="profile-badges">
              <div className="profile-badge">
                <img src="/images/logo-3s.png" alt="3S" />
                <span>3S</span>
              </div>
              <div className="profile-badge">
                <img src="/images/logo-asteelflash.png" alt="AsteelFlash" />
                <span>AsteelFlash</span>
              </div>
              <div className="profile-badge">
                <img src="/images/logo-fst.png" alt="FST" />
                <span>FST Tunis</span>
              </div>
              <div className="profile-badge">
                <img src="/images/logo-utm.png" alt="UTM" />
                <span>UTM</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ---- About / Timeline ---- */}
      <motion.section
        className="content-section about-grid"
        id="about"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
      >
        <div>
          <p className="eyebrow">{tx.eyebrowAbout}</p>
          <h2>{tx.h2About}</h2>
          <p className="muted">{tx.aboutP1}</p>
          <p className="muted" style={{ marginTop: "14px" }}>{tx.aboutP2}</p>
          <p className="muted" style={{ marginTop: "14px" }}>
            <strong style={{ color: "#cbd5e1" }}>{tx.langLabel}</strong>{" "}
            {tx.lang1} <span style={{ color: "#64748b" }}>{tx.lang1Note}</span> ·{" "}
            {tx.lang2} <span style={{ color: "#64748b" }}>{tx.lang2Note}</span> ·{" "}
            {tx.lang3} <span style={{ color: "#64748b" }}>{tx.lang3Note}</span>
          </p>
          <p className="muted" style={{ marginTop: "10px" }}>
            <strong style={{ color: "#cbd5e1" }}>{tx.assocLabel}</strong>{" "}
            IEEE · GDSC · Securinets · Spark
          </p>
          <p className="muted" style={{ marginTop: "10px" }}>
            <strong style={{ color: "#cbd5e1" }}>{tx.certLabel}</strong>{" "}
            AWS Cloud Practitioner · CCNA
          </p>
          <div className="objective">
            <GraduationCap size={18} />
            <div>
              <strong>{tx.objectiveTitle}</strong>
              <p>{tx.objectiveText}</p>
            </div>
          </div>
        </div>
        <div className="timeline">
          {tx.timeline.map((item) => {
            const logo = INST_LOGOS[item.place];
            return (
              <div className="timeline-item" key={item.title}>
                <span className="timeline-dot" />
                <div className="timeline-header">
                  <div>
                    <p className="timeline-period">{item.period}</p>
                    <h4>{item.title}</h4>
                    <p className="timeline-place">{item.place}</p>
                  </div>
                  {logo && (
                    <img src={logo} alt={item.place} className="timeline-logo" />
                  )}
                </div>
                <p className="muted">{item.text}</p>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* ---- 3D Lab ---- */}
      <motion.section
        className="lab-section"
        id="lab"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
      >
        <Scene onSelect={setSelectedId} />
        <p className="scene-hint">{tx.sceneHint}</p>
      </motion.section>

      {/* ---- Projects ---- */}
      <section className="content-section" id="projects">
        <div className="section-heading">
          <p className="eyebrow">{tx.eyebrowProjects}</p>
          <h2>{tx.h2Projects}</h2>
        </div>
        <div className="project-grid">
          {projects.map((project, i) => (
            <motion.article
              className="project-card"
              key={project.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
            >
              <div className="project-top">
                <span className="project-index">{String(i + 1).padStart(2, "0")}</span>
                <p className="project-category">{project.category}</p>
              </div>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <div className="tags">{project.technologies.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <div className="project-meta"><span>{project.role}</span><span>{project.year}</span></div>
              <button className="text-button" onClick={() => setSelectedId(project.id)}>
                {tx.openCase} <ArrowUpRight size={16} />
              </button>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ---- Skills ---- */}
      <motion.section
        className="content-section"
        id="skills"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
      >
        <div className="section-heading">
          <p className="eyebrow">{tx.eyebrowSkills}</p>
          <h2>{tx.h2Skills}</h2>
        </div>
        <div className="skills-grid skills-grid-5">
          {tx.skillGroups.map(({ title, items }, idx) => {
            const Icon = SKILL_ICONS[idx];
            return (
              <div className="skill-group" key={title}>
                <div className="skill-group-head"><Icon size={18} /><h3>{title}</h3></div>
                <div className="skill-list">{items.map((s) => <span key={s}>{s}</span>)}</div>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* ---- Contact ---- */}
      <motion.section
        className="contact-section"
        id="contact"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
      >
        <p className="eyebrow">{tx.eyebrowContact}</p>
        <h2>{tx.h2Contact}</h2>
        <p className="muted">{tx.contactDesc}</p>
        <div className="contact-links">
          <a href="mailto:adelfiras78@gmail.com" id="contact-email"><Mail size={17} /> adelfiras78@gmail.com</a>
          <a href="https://github.com/firas2004" target="_blank" rel="noreferrer" id="contact-github"><Github size={17} /> github.com/firas2004</a>
          <a href="https://linkedin.com/in/firas-adel-71781812a" target="_blank" rel="noreferrer" id="contact-linkedin"><Linkedin size={17} /> LinkedIn</a>
          <a href="tel:+21626687622" id="contact-phone"><span style={{ fontSize: "17px" }}>📞</span> +216 26 687 622</a>
          <a href="/documents/firas-adel-cv.pdf" download id="contact-cv"><FileDown size={17} /> CV PDF</a>
        </div>
      </motion.section>

      <footer>
        <span>© {new Date().getFullYear()} Firas Adel · Firas's Portfolio</span>
        <span>{tx.footer1}</span>
      </footer>

      {/* ---- Case Study Modal ---- */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              className="modal"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-button" onClick={() => setSelectedId(null)} aria-label={tx.closeLabel}>
                <X />
              </button>
              <p className="eyebrow">{selected.category}</p>
              <h2>{selected.title}</h2>
              <p>{selected.summary}</p>
              <div className="modal-meta">
                <span><strong>{tx.modalRole}</strong>{selected.role}</span>
                <span><strong>{tx.modalYear}</strong>{selected.year}</span>
                <span><strong>{tx.modalOutcome}</strong>{selected.outcome}</span>
              </div>
              <h4>{tx.modalTech}</h4>
              <div className="tags">{selected.technologies.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <h4>{tx.modalHighlights}</h4>
              <ul>{selected.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}