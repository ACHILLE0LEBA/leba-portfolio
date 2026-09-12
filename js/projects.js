/**
 * ============================================================
 * PROJECTS DATA
 * ============================================================
 * Add a new project by adding a new object to this array.
 * The Projects section on the page rebuilds itself automatically —
 * you never need to touch index.html to add a project.
 *
 * Fields:
 *  - title        : Project name (string)
 *  - category     : One of "WEB", "DESKTOP", "MOBILE", "AI", "AUTOMATION", "DATABASE"
 *  - image        : Path to the project image (leave the placeholder until you have a real one)
 *  - description  : Short 1-2 sentence description
 *  - technologies : Array of technology names shown as tags
 *  - github       : Full GitHub URL, or "" if none yet
 *  - demo         : Full live-demo URL, or "" if none yet
 * ============================================================
 */

const projects = [
  {
    title: "Tertul Study Fly Website",
    category: "WEB",
    // CHANGE PROJECT IMAGE HERE
    image: "assets/images/projects/tertul-study-fly.jpg",
    description: "Site web éducatif conçu pour accompagner les étudiants dans leur parcours d'apprentissage. Ajoutez ici une description plus détaillée du projet.",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "",
    demo: ""
  },
  {
    title: "AI Inventory Management System",
    category: "DESKTOP",
    // CHANGE PROJECT IMAGE HERE
    image: "assets/images/projects/ai-inventory.jpg",
    description: "Système de gestion d'inventaire avec une application desktop JavaFX connectée à un backend Node.js / TypeScript pour le suivi des stocks.",
    technologies: ["Java", "JavaFX", "Node.js", "TypeScript"],
    github: "",
    demo: ""
  }

  /* ------------------------------------------------------------
     Example — copy this block to add a new project:

  ,{
    title: "My New Project",
    category: "AI",
    image: "assets/images/projects/my-new-project.jpg",
    description: "Description of my project.",
    technologies: ["Python", "AI", "PostgreSQL"],
    github: "https://github.com/ACHILLE0LEBA/my-new-project",
    demo: "https://my-new-project.example.com"
  }
  ------------------------------------------------------------ */
];
