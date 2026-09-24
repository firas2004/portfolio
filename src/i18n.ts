export type Lang = "en" | "fr";

export const t = {
  en: {
    /* nav */
    navLab: "Lab",
    navProjects: "Projects",
    navAbout: "About",
    navSkills: "Skills",
    navContact: "Contact",

    /* boot */
    boot: [
      "INITIALIZING FIRAS'S PORTFOLIO",
      "LOADING EMBEDDED MODULES",
      "CALIBRATING SENSORS",
      "CONNECTING CLOUD UPLINK",
      "SYSTEM READY",
    ],

    /* hero */
    chip: "Available for end-of-studies internship — 2027",
    eyebrowHero: "IoT ENGINEERING STUDENT · TUNIS, TUNISIA",
    h1a: "Connected intelligence,",
    h1b: "from device to cloud.",
    heroDesc1: "I'm",
    heroDescName: "Firas Adel",
    heroDesc2:
      ", a final-year IoT engineering student specialising in embedded systems (STM32, ESP32, FreeRTOS, CAN), Cloud & DevOps (Docker, Kubernetes, AWS) and industrial vision. Looking for an",
    heroDescPFE: "end-of-studies internship (PFE) 2027",
    heroDesc3: "to contribute to an embedded, IoT or cloud engineering team.",
    btnLab: "Explore the lab",
    btnProjects: "View projects",
    btnCv: "Download CV",
    status: "AVAILABLE FOR PFE 2027 · IoT / EMBEDDED / CLOUD / DEVOPS",
    stats: [
      ["3", "Internships"],
      ["5+", "Technical projects"],
      ["15+", "Technologies"],
      ["2027", "PFE"],
    ],
    terminalContent: `$ whoami\n> firas_adel\n  IoT engineer (year 3)\n$ focus --list\n> embedded · iot · cloud · devops\n$ experience --short\n> 3S (cloud native, IaaS)\n> AsteelFlash (TI CC1310, vision)\n$ status\n> open_to_pfe_2027: true\n> location: Tunis, Tunisia`,

    /* about */
    eyebrowAbout: "PROFILE",
    h2About: "Engineering profile",
    aboutP1:
      "I work across the full stack of connected systems — from microcontroller firmware and sensor integration to event-driven backends, cloud deployment and observability. My projects combine hardware constraints with software engineering discipline.",
    aboutP2: "What I bring to a team: fast learning, documentation habits, and a systems mindset — device to cloud.",
    langLabel: "Languages:",
    lang1: "Arabic",
    lang1Note: "(native)",
    lang2: "French",
    lang2Note: "(fluent)",
    lang3: "English",
    lang3Note: "(fluent)",
    assocLabel: "Associations:",
    certLabel: "Certifications (in progress):",
    objectiveTitle: "PFE Objective — 2027",
    objectiveText:
      "Seeking a 4–6 month end-of-studies internship starting early 2027 — embedded systems, IoT platforms, or cloud / infrastructure DevOps.",

    /* timeline */
    timeline: [
      {
        period: "June – Aug. 2026",
        title: "IoT / Cloud Native Intern",
        place: "3S Standard Sharing Software — Tunis",
        text: "Designed PulseCity, a Cloud Native platform simulating 50+ sensors via Apache Kafka. Containerised 6+ microservices, Kubernetes (Kind) orchestration, GitHub Actions CI/CD, Prometheus/Grafana monitoring (15+ metrics).",
      },
      {
        period: "Aug. – Sept. 2026",
        title: "Embedded IoT & Industrial Vision Intern",
        place: "AsteelFlash Tunisia — Soukra, Ariana",
        text: "Embedded C firmware on TI CC1310 (Sub-1 GHz) — multi-node network, RF reliability > 95 %. Hikrobot industrial camera integration for computer vision and quality control on a production line.",
      },
      {
        period: "Jul. – Aug. 2025",
        title: "Cloud Infrastructure Intern",
        place: "3S Tunisia — Tunis",
        text: "Deployment and administration of a private IaaS Cloud infrastructure (Apache CloudStack), dozens of VMs. Compute/network provisioning, proactive monitoring, operations guide writing.",
      },
      {
        period: "Sept. 2024 – Present",
        title: "National Engineering Degree — IoT",
        place: "Faculty of Sciences of Tunis — University of Tunis El Manar",
        text: "Specialisation in embedded systems, networking, cloud infrastructure and intelligent systems.",
      },
      {
        period: "Sept. 2022 – Jun. 2024",
        title: "Integrated Preparatory Cycle",
        place: "Faculty of Sciences of Tunis — Maths, Physics, Computer Science",
        text: "Intensive scientific training in mathematics, physics and computer science.",
      },
    ],

    /* lab */
    eyebrowLab: "INTERACTIVE ENVIRONMENT",
    h2Lab: "Explore the engineering lab",
    labDesc: "Real hardware, rendered in 3D. Rotate the scene and select a station to open its project case study.",
    sceneHint: "DRAG TO ORBIT · SCROLL TO ZOOM · CLICK A STATION",

    /* projects */
    eyebrowProjects: "SELECTED WORK",
    h2Projects: "Engineering projects",
    openCase: "Open case study",

    /* skills */
    eyebrowSkills: "TECHNICAL STACK",
    h2Skills: "Systems from device to cloud",
    skillGroups: [
      {
        title: "Embedded & IoT",
        items: ["C / C++ (firmware)", "STM32 · ESP32 · ESP8266", "TI CC1310 (Sub-1 GHz)", "FreeRTOS / RTOS", "UART · SPI · I²C · CAN · PWM", "MQTT · LoRaWAN · BLE"],
      },
      {
        title: "Software & Data",
        items: ["Python · Java · Kotlin · JS", "FastAPI · Node.js · React", "Apache Kafka · Microservices", "OpenCV · Machine Learning", "Time Series · SQL", "ROS2 · Android Studio"],
      },
      {
        title: "Cloud & DevOps",
        items: ["Docker · Kubernetes · Kind · Helm", "Terraform · Ansible (IaC)", "AWS · Apache CloudStack", "GitHub Actions · Jenkins · CI/CD", "Prometheus · Grafana · Observability", "Linux · Bash · Wireshark"],
      },
      {
        title: "Networks & Security",
        items: ["TCP/IP · Networking", "Network security · VPC · IAM", "Linux hardening", "CCNA (in progress)", "AWS Cloud Practitioner (in progress)", "Agile · Scrum · Kanban"],
      },
      {
        title: "Protocols & Tools",
        items: ["Git · GitHub · Pull Requests", "Keil µVision · STM32CubeIDE", "Arduino IDE · VS Code", "Postman · Wireshark", "MATLAB · Bash", "IEEE · GDSC · Securinets"],
      },
    ],

    /* contact */
    eyebrowContact: "CONTACT",
    h2Contact: "Open to engineering opportunities.",
    contactDesc:
      "Looking for a PFE 2027 internship in IoT, embedded systems, intelligent systems or cloud / DevOps. Let's talk about how I can contribute to your team.",

    /* footer */
    footer1: "Built with React · Three.js · Framer Motion",

    /* modal */
    modalRole: "Role",
    modalYear: "Year",
    modalOutcome: "Outcome",
    modalTech: "Technologies",
    modalHighlights: "Project highlights",
    modalNote: "Link this case study to your repository, screenshots or live demo before publishing.",
    closeLabel: "Close",
  },

  fr: {
    /* nav */
    navLab: "Lab",
    navProjects: "Projets",
    navAbout: "Parcours",
    navSkills: "Compétences",
    navContact: "Contact",

    /* boot */
    boot: [
      "INITIALISATION DU PORTFOLIO DE FIRAS",
      "CHARGEMENT DES MODULES EMBARQUÉS",
      "CALIBRATION DES CAPTEURS",
      "CONNEXION AU CLOUD",
      "SYSTÈME PRÊT",
    ],

    /* hero */
    chip: "Disponible pour stage PFE — 2027",
    eyebrowHero: "ÉLÈVE INGÉNIEUR IoT · TUNIS, TUNISIE",
    h1a: "Intelligence connectée,",
    h1b: "de l'objet au cloud.",
    heroDesc1: "Je suis",
    heroDescName: "Firas Adel",
    heroDesc2:
      ", élève ingénieur en dernière année IoT, spécialisé en systèmes embarqués (STM32, ESP32, FreeRTOS, CAN), Cloud & DevOps (Docker, Kubernetes, AWS) et vision industrielle. À la recherche d'un",
    heroDescPFE: "stage de fin d'études (PFE) 2027",
    heroDesc3: "pour contribuer à une équipe d'ingénierie embarquée, IoT ou cloud.",
    btnLab: "Explorer le lab",
    btnProjects: "Voir les projets",
    btnCv: "Télécharger le CV",
    status: "DISPONIBLE POUR PFE 2027 · IoT / EMBARQUÉ / CLOUD / DEVOPS",
    stats: [
      ["3", "Stages réalisés"],
      ["5+", "Projets techniques"],
      ["15+", "Technologies"],
      ["2027", "PFE"],
    ],
    terminalContent: `$ whoami\n> firas_adel\n  élève ingénieur IoT (3A)\n$ focus --list\n> embarqué · iot · cloud · devops\n$ experience --short\n> 3S (cloud native, IaaS)\n> AsteelFlash (TI CC1310, vision)\n$ status\n> open_to_pfe_2027: true\n> location: Tunis, Tunisie`,

    /* about */
    eyebrowAbout: "PROFIL",
    h2About: "Parcours d'ingénieur",
    aboutP1:
      "Je travaille sur l'ensemble de la chaîne des systèmes connectés — du firmware microcontrôleur et de l'intégration capteurs jusqu'aux backends événementiels, au déploiement cloud et à l'observabilité. Mes projets combinent les contraintes matérielles avec la rigueur du génie logiciel.",
    aboutP2: "Ce que j'apporte à une équipe : apprentissage rapide, habitudes de documentation et une vision systèmes — du composant au cloud.",
    langLabel: "Langues :",
    lang1: "Arabe",
    lang1Note: "(maternelle)",
    lang2: "Français",
    lang2Note: "(courant)",
    lang3: "Anglais",
    lang3Note: "(courant)",
    assocLabel: "Vie associative :",
    certLabel: "Certifications (en cours) :",
    objectiveTitle: "Objectif PFE 2027",
    objectiveText:
      "Recherche un stage de fin d'études de 4–6 mois à partir de début 2027 — systèmes embarqués, plateformes IoT, ou cloud / infrastructure DevOps.",

    /* timeline */
    timeline: [
      {
        period: "Juin – Août 2026",
        title: "Stagiaire IoT / Cloud Native",
        place: "3S Standard Sharing Software — Tunis",
        text: "Conception de PulseCity, plateforme Cloud Native simulant 50+ capteurs via Apache Kafka. Conteneurisation de 6+ microservices, orchestration Kubernetes (Kind), pipelines CI/CD GitHub Actions, monitoring Prometheus/Grafana (15+ métriques).",
      },
      {
        period: "Août – Sept. 2026",
        title: "Stagiaire IoT Embarqué & Vision Industrielle",
        place: "AsteelFlash Tunisie — Soukra, Ariana",
        text: "Développement firmware C sur TI CC1310 (Sub-1 GHz) — réseau multi-nœuds, fiabilité radio > 95 %. Intégration caméra industrielle Hikrobot pour vision par ordinateur et contrôle qualité en ligne de production.",
      },
      {
        period: "Juil. – Août 2025",
        title: "Stagiaire Infrastructure Cloud",
        place: "3S Tunisie — Tunis",
        text: "Déploiement et administration d'une infrastructure IaaS Cloud privé (Apache CloudStack), plusieurs dizaines de VM. Provisionnement compute/réseau, supervision proactive, rédaction de guides d'exploitation.",
      },
      {
        period: "Sept. 2024 – Présent",
        title: "Diplôme National d'Ingénieur — IoT",
        place: "Faculté des Sciences de Tunis — Université de Tunis El Manar",
        text: "Spécialisation systèmes embarqués, réseaux, cloud infrastructure et systèmes intelligents.",
      },
      {
        period: "Sept. 2022 – Juin 2024",
        title: "Cycle Préparatoire Intégré",
        place: "Faculté des Sciences de Tunis — Mathématiques, Physique, Informatique",
        text: "Formation scientifique intensive en mathématiques, physique et informatique.",
      },
    ],

    /* lab */
    eyebrowLab: "ENVIRONNEMENT INTERACTIF",
    h2Lab: "Explorez le lab d'ingénierie",
    labDesc: "Du matériel réel, rendu en 3D. Faites pivoter la scène et sélectionnez une station pour ouvrir son étude de cas.",
    sceneHint: "GLISSER POUR ORBITER · MOLETTE POUR ZOOMER · CLIQUER UNE STATION",

    /* projects */
    eyebrowProjects: "TRAVAUX SÉLECTIONNÉS",
    h2Projects: "Projets d'ingénierie",
    openCase: "Voir l'étude de cas",

    /* skills */
    eyebrowSkills: "STACK TECHNIQUE",
    h2Skills: "Systèmes du composant au cloud",
    skillGroups: [
      {
        title: "Embarqué & IoT",
        items: ["C / C++ (firmware)", "STM32 · ESP32 · ESP8266", "TI CC1310 (Sub-1 GHz)", "FreeRTOS / RTOS", "UART · SPI · I²C · CAN · PWM", "MQTT · LoRaWAN · BLE"],
      },
      {
        title: "Logiciel & Données",
        items: ["Python · Java · Kotlin · JS", "FastAPI · Node.js · React", "Apache Kafka · Microservices", "OpenCV · Machine Learning", "Séries Temporelles · SQL", "ROS2 · Android Studio"],
      },
      {
        title: "Cloud & DevOps",
        items: ["Docker · Kubernetes · Kind · Helm", "Terraform · Ansible (IaC)", "AWS · Apache CloudStack", "GitHub Actions · Jenkins · CI/CD", "Prometheus · Grafana · Observabilité", "Linux · Bash · Wireshark"],
      },
      {
        title: "Réseaux & Sécurité",
        items: ["TCP/IP · Réseaux", "Sécurité réseau · VPC · IAM", "Durcissement Linux", "CCNA (en cours)", "AWS Cloud Practitioner (en cours)", "Agile · Scrum · Kanban"],
      },
      {
        title: "Protocoles & Outils",
        items: ["Git · GitHub · Pull Requests", "Keil µVision · STM32CubeIDE", "Arduino IDE · VS Code", "Postman · Wireshark", "MATLAB · Bash", "IEEE · GDSC · Securinets"],
      },
    ],

    /* contact */
    eyebrowContact: "CONTACT",
    h2Contact: "Ouvert aux opportunités d'ingénierie.",
    contactDesc:
      "À la recherche d'un stage PFE 2027 en IoT, systèmes embarqués, systèmes intelligents ou cloud / DevOps. Discutons de la façon dont je peux contribuer à votre équipe.",

    /* footer */
    footer1: "Construit avec React · Three.js · Framer Motion",

    /* modal */
    modalRole: "Rôle",
    modalYear: "Année",
    modalOutcome: "Résultat",
    modalTech: "Technologies",
    modalHighlights: "Points clés",
    modalNote: "Reliez cette étude de cas à votre dépôt, screenshots ou démo avant publication.",
    closeLabel: "Fermer",
  },
} as const;
