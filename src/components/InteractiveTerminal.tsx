import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, Sparkles } from "lucide-react";

interface InteractiveTerminalProps {
  lang: "en" | "fr";
  onSelectProject?: (id: string) => void;
}

interface OutputEntry {
  id: string;
  command?: string;
  output: React.ReactNode;
  isError?: boolean;
}

const COMMANDS = [
  "help",
  "whoami",
  "skills",
  "projects",
  "experience",
  "education",
  "contact",
  "cv",
  "clear",
];

export default function InteractiveTerminal({
  lang,
  onSelectProject,
}: InteractiveTerminalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<OutputEntry[]>([
    {
      id: "init-1",
      command: "whoami",
      output: (
        <div className="term-entry">
          <p className="term-highlight">&gt; firas_adel</p>
          <p className="term-muted">
            {lang === "fr"
              ? "Élève Ingénieur IoT (3ème année) · Systèmes embarqués & Cloud"
              : "IoT & Embedded Systems Engineer (Year 3) · Device to Cloud"}
          </p>
          <p className="term-status">
            <span className="term-dot" />{" "}
            {lang === "fr"
              ? "Statut : Disponible pour stage PFE 2027"
              : "Status: Available for end-of-studies internship (PFE 2027)"}
          </p>
          <p className="term-muted" style={{ marginTop: "6px" }}>
            {lang === "fr"
              ? "Tapez 'help' pour afficher toutes les commandes disponibles."
              : "Type 'help' to see all available commands."}
          </p>
        </div>
      ),
    },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>(["whoami"]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/documents/firas-adel-cv.pdf";
    link.download = "firas-adel-cv.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const executeCommand = (cmdRaw: string) => {
    const cmdClean = cmdRaw.trim();
    if (!cmdClean) return;

    // Add to history navigation
    setCmdHistory((prev) => [...prev, cmdClean]);
    setHistoryIdx(-1);

    const parts = cmdClean.split(" ");
    const command = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ").trim().toLowerCase();

    let outputNode: React.ReactNode = null;
    let isError = false;

    switch (command) {
      case "help":
      case "?":
        outputNode = (
          <div className="term-help-grid">
            <p className="term-section-title">
              {lang === "fr" ? "Commandes disponibles :" : "Available commands:"}
            </p>
            <div className="term-cmd-row">
              <span className="cmd-name">whoami</span>
              <span className="cmd-desc">
                {lang === "fr" ? "Profil & statut de Firas Adel" : "Display Firas Adel's profile & status"}
              </span>
            </div>
            <div className="term-cmd-row">
              <span className="cmd-name">skills</span>
              <span className="cmd-desc">
                {lang === "fr" ? "Stack technique (embarqué, cloud, devops)" : "List technical competencies & stack"}
              </span>
            </div>
            <div className="term-cmd-row">
              <span className="cmd-name">projects</span>
              <span className="cmd-desc">
                {lang === "fr" ? "Liste des projets d'ingénierie (PulseCity, CC1310...)" : "List engineering projects"}
              </span>
            </div>
            <div className="term-cmd-row">
              <span className="cmd-name">experience</span>
              <span className="cmd-desc">
                {lang === "fr" ? "Stages professionnels (3S, AsteelFlash)" : "Internships (3S, AsteelFlash)"}
              </span>
            </div>
            <div className="term-cmd-row">
              <span className="cmd-name">education</span>
              <span className="cmd-desc">
                {lang === "fr" ? "Formation académique (FST, UTM)" : "Academic background (FST, UTM)"}
              </span>
            </div>
            <div className="term-cmd-row">
              <span className="cmd-name">contact</span>
              <span className="cmd-desc">
                {lang === "fr" ? "Email, téléphone, LinkedIn & GitHub" : "Email, phone, LinkedIn & GitHub"}
              </span>
            </div>
            <div className="term-cmd-row">
              <span className="cmd-name">cv</span>
              <span className="cmd-desc">
                {lang === "fr" ? "Télécharger le CV PDF de Firas" : "Download Firas Adel's CV PDF"}
              </span>
            </div>
            <div className="term-cmd-row">
              <span className="cmd-name">clear</span>
              <span className="cmd-desc">
                {lang === "fr" ? "Effacer l'historique du terminal" : "Clear terminal screen"}
              </span>
            </div>
            <div className="term-cmd-row">
              <span className="cmd-name">sudo</span>
              <span className="cmd-desc">
                {lang === "fr" ? "Mode super-utilisateur" : "Superuser privilege"}
              </span>
            </div>
          </div>
        );
        break;

      case "whoami":
        outputNode = (
          <div className="term-whoami">
            <p className="term-highlight">&gt; firas_adel</p>
            <p>
              <strong>{lang === "fr" ? "Rôle :" : "Role:"}</strong>{" "}
              {lang === "fr"
                ? "Élève Ingénieur IoT (3ème année)"
                : "Final-year IoT Engineering Student"}
            </p>
            <p>
              <strong>{lang === "fr" ? "Institution :" : "Institution:"}</strong> Faculté des Sciences de Tunis · Université de Tunis El Manar
            </p>
            <p>
              <strong>{lang === "fr" ? "Spécialités :" : "Specialties:"}</strong> Systèmes embarqués (STM32, TI CC1310, ESP32), Cloud & DevOps (Docker, K8s, AWS), Vision industrielle
            </p>
            <p>
              <strong>{lang === "fr" ? "Localisation :" : "Location:"}</strong> Tunis, Tunisie
            </p>
            <p className="term-highlight" style={{ marginTop: "4px" }}>
              ✓ {lang === "fr" ? "Recherche stage de fin d'études PFE 2027 (4 à 6 mois)" : "Seeking 4–6 month PFE 2027 internship"}
            </p>
          </div>
        );
        break;

      case "skills":
      case "stack":
        outputNode = (
          <div className="term-skills">
            <p className="term-section-title">
              {lang === "fr" ? "Stack & Compétences Clés :" : "Key Stack & Competencies:"}
            </p>
            <p>
              <span className="term-tag-label">[Embedded &amp; IoT]</span> C, C++, STM32, TI CC1310, ESP32, FreeRTOS, CAN, UART, SPI, I²C, MQTT, Sub-1 GHz
            </p>
            <p>
              <span className="term-tag-label">[Cloud &amp; DevOps]</span> Docker, Kubernetes (Kind, Helm), AWS, Terraform, Ansible, Apache CloudStack, CI/CD GitHub Actions
            </p>
            <p>
              <span className="term-tag-label">[Software &amp; Data]</span> Python (FastAPI), Apache Kafka, OpenCV, Machine Learning, React, TypeScript, SQL
            </p>
            <p>
              <span className="term-tag-label">[Réseaux &amp; Outils]</span> TCP/IP, Wireshark, Durcissement Linux, Git, STM32CubeIDE, Keil µVision
            </p>
          </div>
        );
        break;

      case "projects":
      case "ls":
        outputNode = (
          <div className="term-projects">
            <p className="term-section-title">
              {lang === "fr" ? "Projets d'ingénierie récents :" : "Recent Engineering Projects:"}
            </p>
            <div className="term-project-item">
              <span className="term-num">1.</span>
              <strong>PulseCity</strong>
              <span className="term-muted"> — Plateforme IoT Cloud Native (FastAPI, Kafka, K8s, Grafana)</span>
              {onSelectProject && (
                <button
                  type="button"
                  className="term-link-btn"
                  onClick={() => onSelectProject("pulsecity")}
                >
                  [view case]
                </button>
              )}
            </div>
            <div className="term-project-item">
              <span className="term-num">2.</span>
              <strong>Sub-1 GHz RF &amp; Vision</strong>
              <span className="term-muted"> — TI CC1310 Firmware C + Hikrobot Caméra Industrielle</span>
              {onSelectProject && (
                <button
                  type="button"
                  className="term-link-btn"
                  onClick={() => onSelectProject("embedded")}
                >
                  [view case]
                </button>
              )}
            </div>
            <div className="term-project-item">
              <span className="term-num">3.</span>
              <strong>Energy Monitor</strong>
              <span className="term-muted"> — ESP32, MQTT, InfluxDB, Dashboard React &amp; ML</span>
              {onSelectProject && (
                <button
                  type="button"
                  className="term-link-btn"
                  onClick={() => onSelectProject("energy")}
                >
                  [view case]
                </button>
              )}
            </div>
            <div className="term-project-item">
              <span className="term-num">4.</span>
              <strong>Smart Agriculture</strong>
              <span className="term-muted"> — Irrigation intelligente connectée sol + API météo</span>
              {onSelectProject && (
                <button
                  type="button"
                  className="term-link-btn"
                  onClick={() => onSelectProject("agriculture")}
                >
                  [view case]
                </button>
              )}
            </div>
            <div className="term-project-item">
              <span className="term-num">5.</span>
              <strong>Apache CloudStack IaaS</strong>
              <span className="term-muted"> — Infrastructure Cloud privé &amp; provisionnement VM</span>
              {onSelectProject && (
                <button
                  type="button"
                  className="term-link-btn"
                  onClick={() => onSelectProject("cloudstack")}
                >
                  [view case]
                </button>
              )}
            </div>
          </div>
        );
        break;

      case "experience":
      case "exp":
      case "stages":
        outputNode = (
          <div className="term-exp">
            <p className="term-section-title">
              {lang === "fr" ? "Stages & Expériences Professionnelles :" : "Professional Internships:"}
            </p>
            <p>
              <strong>[Juin – Août 2026] 3S Standard Sharing Software (Tunis)</strong><br />
              <span className="term-muted">Stagiaire IoT / Cloud Native — PulseCity, Kafka, Kubernetes Kind, Grafana</span>
            </p>
            <p style={{ marginTop: "6px" }}>
              <strong>[Août – Sept. 2026] AsteelFlash Tunisie (Soukra, Ariana)</strong><br />
              <span className="term-muted">Stagiaire IoT Embarqué &amp; Vision — TI CC1310 Sub-1 GHz, OpenCV, Hikrobot</span>
            </p>
            <p style={{ marginTop: "6px" }}>
              <strong>[Juil. – Août 2025] 3S Tunisie (Tunis)</strong><br />
              <span className="term-muted">Stagiaire Infrastructure Cloud — Apache CloudStack IaaS, Ansible, Terraform</span>
            </p>
          </div>
        );
        break;

      case "education":
      case "edu":
      case "etudes":
        outputNode = (
          <div className="term-edu">
            <p className="term-section-title">
              {lang === "fr" ? "Parcours Académique :" : "Academic Background:"}
            </p>
            <p>
              <strong>[2024 – Présent] Diplôme National d'Ingénieur en IoT</strong><br />
              <span className="term-muted">Faculté des Sciences de Tunis · Université de Tunis El Manar</span>
            </p>
            <p style={{ marginTop: "6px" }}>
              <strong>[2022 – 2024] Cycle Préparatoire Intégré (MPI)</strong><br />
              <span className="term-muted">Mathématiques, Physique, Informatique · Faculté des Sciences de Tunis</span>
            </p>
          </div>
        );
        break;

      case "contact":
        outputNode = (
          <div className="term-contact">
            <p className="term-section-title">
              {lang === "fr" ? "Coordonnées de Firas Adel :" : "Contact Information:"}
            </p>
            <p><strong>Email :</strong> <a href="mailto:adelfiras78@gmail.com" className="term-link">adelfiras78@gmail.com</a></p>
            <p><strong>Téléphone :</strong> <a href="tel:+21626687622" className="term-link">+216 26 687 622</a></p>
            <p><strong>LinkedIn :</strong> <a href="https://linkedin.com/in/firas-adel-71781812a" target="_blank" rel="noreferrer" className="term-link">linkedin.com/in/firas-adel-71781812a</a></p>
            <p><strong>GitHub :</strong> <a href="https://github.com/firas2004" target="_blank" rel="noreferrer" className="term-link">github.com/firas2004</a></p>
          </div>
        );
        break;

      case "cv":
        handleDownloadCV();
        outputNode = (
          <div className="term-cv">
            <p className="term-highlight">
              ✓ {lang === "fr" ? "Téléchargement du CV lancé :" : "CV download initiated:"} firas-adel-cv.pdf
            </p>
            <p className="term-muted">
              {lang === "fr"
                ? "Si le téléchargement ne s'est pas déclenché automatiquement, "
                : "If download did not start automatically, "}
              <a href="/documents/firas-adel-cv.pdf" download className="term-link">
                {lang === "fr" ? "cliquez ici pour ouvrir le PDF" : "click here to open PDF"}
              </a>.
            </p>
          </div>
        );
        break;

      case "clear":
      case "cls":
        setHistory([]);
        setInput("");
        return;

      case "date":
        outputNode = <p>{new Date().toString()}</p>;
        break;

      case "echo":
        outputNode = <p>{arg || ""}</p>;
        break;

      case "sudo":
        outputNode = (
          <p className="term-highlight">
            {lang === "fr"
              ? "✓ Accès accordé : Firas Adel dispose des privilèges root !"
              : "✓ Access granted: Firas Adel has full root privileges on this portfolio!"}
          </p>
        );
        break;

      default:
        isError = true;
        outputNode = (
          <p className="term-error">
            {lang === "fr"
              ? `Commande inconnue : '${cmdClean}'. Tapez 'help' pour voir la liste des commandes.`
              : `Command not found: '${cmdClean}'. Type 'help' to see available commands.`}
          </p>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: cmdClean,
        output: outputNode,
        isError,
      },
    ]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      executeCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = historyIdx === -1 ? cmdHistory.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setInput(cmdHistory[nextIdx] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === -1) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx >= cmdHistory.length) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        setHistoryIdx(nextIdx);
        setInput(cmdHistory[nextIdx]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const current = input.trim().toLowerCase();
      if (!current) return;
      const match = COMMANDS.find((c) => c.startsWith(current));
      if (match) {
        setInput(match);
      }
    }
  };

  return (
    <div className="terminal interactive-terminal" onClick={handleContainerClick}>
      <div className="terminal-bar">
        <i />
        <i />
        <i />
        <span>firas@portfolio:~ (bash)</span>
        <div className="terminal-bar-badge">
          <TerminalIcon size={12} />
          <span>LIVE SHELL</span>
        </div>
      </div>

      <div className="terminal-body" ref={bodyRef}>
        {/* Render command history */}
        {history.map((entry) => (
          <div key={entry.id} className="term-block">
            {entry.command && (
              <div className="term-prompt-line">
                <span className="term-prompt">firas@portfolio:~$</span>
                <span className="term-input-text">{entry.command}</span>
              </div>
            )}
            <div className={`term-output ${entry.isError ? "is-error" : ""}`}>
              {entry.output}
            </div>
          </div>
        ))}

        {/* Active prompt input */}
        <div className="term-prompt-line active-line">
          <span className="term-prompt">firas@portfolio:~$</span>
          <div className="term-input-wrapper">
            <input
              ref={inputRef}
              type="text"
              className="term-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              placeholder={lang === "fr" ? "tapez 'help'..." : "type 'help'..."}
              aria-label="Terminal command input"
            />
          </div>
        </div>
      </div>

      {/* Quick clickable chips for fast interactive usage */}
      <div className="terminal-shortcuts" onClick={(e) => e.stopPropagation()}>
        <span className="shortcuts-label"><Sparkles size={11} /> Quick:</span>
        {["help", "whoami", "skills", "projects", "cv", "clear"].map((cmd) => (
          <button
            key={cmd}
            type="button"
            className="shortcut-chip"
            onClick={() => executeCommand(cmd)}
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
