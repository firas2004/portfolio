export type Project = {
  id: string;
  title: string;
  category: string;
  summary: string;
  technologies: string[];
  details: string[];
  role: string;
  year: string;
  outcome: string;
};

export const projects: Project[] = [
  {
    id: "pulsecity",
    title: "PulseCity — Plateforme IoT Cloud Native",
    category: "Cloud Native / IoT",
    summary:
      "Plateforme de monitoring urbain intelligent simulant 50+ capteurs via streaming d'événements, avec détection d'anomalies et observabilité complète.",
    technologies: [
      "Python", "FastAPI", "Apache Kafka", "Docker", "Kubernetes (Kind)",
      "Helm", "GitHub Actions", "Prometheus", "Grafana", "REST API",
    ],
    details: [
      "Simulation de 50+ capteurs urbains (température, humidité, CO₂) répartis sur plusieurs zones.",
      "Architecture Cloud Native : 6+ microservices Python/FastAPI conteneurisés avec Docker.",
      "Bus d'événements Apache Kafka pour le streaming en temps réel.",
      "Orchestration Kubernetes via Kind, déploiement automatisé avec Helm charts.",
      "Pipeline CI/CD GitHub Actions (lint, test, build, deploy).",
      "Monitoring avec Prometheus (15+ métriques custom) et dashboards Grafana.",
      "Réalisé lors du stage chez 3S Standard Sharing Software (juin–août 2026).",
    ],
    role: "Développement full-stack / architecture plateforme",
    year: "2026",
    outcome: "Prototype fonctionnel + pipeline monitoré en production",
  },
  {
    id: "embedded",
    title: "Firmware IoT Sub-1 GHz (TI CC1310)",
    category: "Embarqué / RF",
    summary:
      "Développement firmware C sur TI CC1310 pour réseau multi-nœuds Sub-1 GHz avec fiabilité radio > 95 %, intégrant vision industrielle Hikrobot.",
    technologies: [
      "C (firmware)", "TI CC1310", "Sub-1 GHz RF", "Hikrobot Vision",
      "OpenCV", "Keil µVision", "CCS", "UART", "SPI",
    ],
    details: [
      "Développement firmware en C embarqué sur TI CC1310 (Cortex-M3).",
      "Architecture réseau multi-nœuds radio Sub-1 GHz — fiabilité > 95 %.",
      "Intégration caméra industrielle Hikrobot pour contrôle qualité en ligne.",
      "Traitement d'image / vision par ordinateur sur flux de production.",
      "Tests RF, mesures de portée et optimisation protocole de communication.",
      "Réalisé lors du stage chez AsteelFlash Tunisie (août–septembre 2026).",
    ],
    role: "Firmware embarqué + vision industrielle",
    year: "2026",
    outcome: "Réseau RF stable, qualité contrôlée en temps réel",
  },
  {
    id: "energy",
    title: "Monitoring Énergie Intelligent (ESP32)",
    category: "IoT / IA",
    summary:
      "Système de monitoring énergétique IoT avec MQTT, stockage séries temporelles, dashboard React et détection d'anomalies par ML.",
    technologies: [
      "ESP32", "MQTT", "InfluxDB", "Grafana", "React",
      "Python", "LSTM", "Isolation Forest", "Docker",
    ],
    details: [
      "Acquisition de données de consommation énergétique sur ESP32 via capteurs ACS712.",
      "Pipeline MQTT → InfluxDB pour stockage séries temporelles.",
      "Dashboard React temps réel pour visualisation et alertes.",
      "Modèle LSTM pour prédiction de consommation (horizon 24 h).",
      "Isolation Forest pour détection d'anomalies sans supervision.",
      "Conteneurisation Docker de l'ensemble de la stack.",
    ],
    role: "IoT pipeline + exploration ML",
    year: "2025",
    outcome: "Démo de monitoring end-to-end avec prédictions",
  },
  {
    id: "agriculture",
    title: "Smart Agriculture — Irrigation Intelligente",
    category: "IoT / Automatisation",
    summary:
      "Système d'irrigation connecté combinant capteur d'humidité sol, prévision météo et contrôle à distance — testé sur le terrain.",
    technologies: [
      "ESP8266", "Arduino C++", "MQTT", "Blynk", "ThingSpeak",
      "API météo", "Relais", "Capteur sol", "LDR",
    ],
    details: [
      "Acquisition sol (hygromètre capacitif) et lumière (LDR) sur ESP8266.",
      "Intégration de données météo (API) pour décisions d'irrigation préventives.",
      "Contrôle de relais d'électrovanne via Blynk (application mobile).",
      "Envoi des données vers ThingSpeak pour historique et graphiques.",
      "Tests terrain en conditions réelles, optimisation des seuils d'arrosage.",
    ],
    role: "Hardware + firmware + intégration cloud",
    year: "2024",
    outcome: "Prototype d'irrigation testé en conditions réelles",
  },
  {
    id: "cloudstack",
    title: "Infrastructure IaaS — Apache CloudStack",
    category: "Cloud / DevOps",
    summary:
      "Déploiement et administration d'une infrastructure Cloud privé IaaS (Apache CloudStack) avec provisionnement automatisé de VM et supervision proactive.",
    technologies: [
      "Apache CloudStack", "Linux", "KVM", "Terraform", "Ansible",
      "Python", "Bash", "Prometheus", "VLAN",
    ],
    details: [
      "Installation et configuration d'Apache CloudStack en environnement de production.",
      "Provisionnement de plusieurs dizaines de VM (compute, réseau, stockage).",
      "Automatisation IaC avec Terraform + Ansible pour les déploiements répétables.",
      "Supervision proactive : monitoring des ressources, alerting et procédures d'intervention.",
      "Rédaction de guides d'exploitation et documentation technique.",
      "Réalisé lors du stage chez 3S Tunisie (juillet–août 2025).",
    ],
    role: "Infrastructure / automatisation / administration",
    year: "2025",
    outcome: "Infrastructure cloud privé opérationnelle",
  },
];