/* ============================================================
   CONTENT.JS — All portfolio content lives here.
   Edit this file to update the website. No design knowledge needed.

   Rules of this file (agreed with Aseel):
   - Never invent facts. Anything unconfirmed is marked TODO_VERIFY.
   - Numbers on the site are COMPUTED from the real entries below —
     add entries and the dashboard updates itself.
   ============================================================ */

const TODO_VERIFY = null; // placeholder marker — renders as a clearly-labeled placeholder

const CONTENT = {

  meta: {
    title: "Aseel Hamoud — Operations, Business & Process Improvement",
    description:
      "Aseel Hamoud combines hands-on industrial operations experience with business education and digital problem-solving — building practical tools, improving workflows, and developing toward business, technology, and leadership roles.",
  },

  identity: {
    name: "Aseel Hamoud",
    headline: "Operations Professional · Business Administration · Process Improvement & Digital Solutions",
    intro:
      "I combine hands-on operational experience with business thinking and digital problem-solving. I focus on identifying practical problems, improving workflows, building useful tools, and continuously developing my skills across operations, business, safety, and technology.",
    location: "Yanbu, Saudi Arabia",
    // Confirmed: joined Saudi Aramco 8 Sept 2019; hands-on operations/DCS role since 2021.
    aramcoJoined: "2019-09-08",
    photo: "assets/aseel.jpg", // temporary photo — replace with a professional portrait later
  },

  links: {
    email: "bnhamoud22@gmail.com",
    linkedin: TODO_VERIFY, // TODO: add LinkedIn URL
    github: TODO_VERIFY,   // TODO: add GitHub URL
    cv: TODO_VERIFY,       // TODO: add CV file path when ready
  },

  about: [
    "My story didn’t start in a control room. It started in sales — consumer technology, retail leadership, and later co-running a specialty-coffee business — where I learned customers, teams, and what ownership really means.",
    "In 2019 I joined Saudi Aramco, and in 2021 I moved into hands-on field operations and DCS control-room work — alongside operational coordination, SAP, documentation, safety, and workflow improvement. Working the frontline showed me where the real friction lives — and I kept turning that friction into practical, documented tools that teams actually use.",
    "Today I’m studying Business Administration at Saudi Electronic University while working rotating shifts. My operational background is my foundation — my direction is growth into business, process improvement, digital transformation, AI, training, and leadership.",
  ],

  /* ---- Selected projects (case studies) ----
     status: "verified" | "delivered" | "in-progress" | "prototype" | "research"
     Impact must stay qualitative unless a number is verified.       */
  projects: [
    {
      title: "Isolation Points Digital Reference",
      status: "verified",
      statusNote: "Recognized 2023–2024",
      featured: true,
      featuredTag: "Flagship project",
      challenge: "Critical isolation information was scattered and slow to locate when teams needed it most — costing time exactly when time mattered.",
      role: "Initiated and led the effort — collected, structured, and standardized the information into one dependable source.",
      solution: "Consolidated 500+ equipment and isolation points into one structured digital reference, organized for fast, reliable lookup.",
      impact: "Changed how teams locate and understand isolation information, and was presented to management and audit stakeholders.",
      recognition: [
        { label: "NRDD Manager Appreciation", date: "Nov 2023" },
        { label: "WRDD & NRDD Director Certificate", date: "Jun 2024" },
      ],
      tools: ["Structured documentation", "Digital reference design"],
    },
    {
      title: "Operational Checklist & Performance Dashboard",
      status: "in-progress",
      statusNote: "Actively developed",
      challenge: "Weekly, monthly, and quarterly tasks were tracked on fragmented paper — poor visibility, unclear ownership.",
      role: "Designed and built the system end to end.",
      solution: "An Excel-based dashboard managing recurring operational tasks with status tracking and current-period views.",
      impact: "Clearer ownership, better follow-up, and one place to see the current period at a glance.",
      tools: ["Microsoft Excel", "Dashboard logic"],
    },
    {
      title: "Tank Calculation & Operational Decision Support",
      status: "prototype",
      statusNote: "Concepts & prototypes",
      challenge: "Time-critical operational calculations involved multiple inputs and constraints, with room for manual error.",
      role: "Designed calculation concepts and prototype tools.",
      solution: "Structured calculators that validate inputs and support faster, more reliable operational decisions.",
      impact: "Aimed at reducing manual error and decision time in complex tank and pipeline operations.",
      tools: ["Microsoft Excel", "Validation logic"],
    },
    {
      title: "Training & Progress Tracker",
      status: "delivered",
      statusNote: "Wording under review",
      challenge: "Employee training and development progress lacked clear visibility.",
      role: "Built the tracker structure.",
      solution: "A structured tracker showing training status and development progress in one view.",
      impact: "Improved visibility of team development.",
      tools: ["Microsoft Excel"],
    },
  ],
  /* Some items are intentionally unpublished for now. */

  /* ---- Continuous learning ----
     The dashboard computes totals from these entries.
     minutes: real duration in minutes (verified only).             */
  learning: {
    categories: ["AI & Digital Tools", "Business & Leadership", "Safety", "Operations", "Process Improvement"],
    verified: [
      {
        title: "ChatGPT & Its Practical Use Cases",
        provider: "Skillsoft – T&D",
        category: "AI & Digital Tools",
        minutes: 67, // 1 h 07 m
        completed: "July 2026",
        certificate: null, // TODO: add certificate image/PDF path
      },
      {
        title: "GitHub Copilot — Learning Certificate",
        provider: TODO_VERIFY, // TODO: confirm provider name
        category: "AI & Digital Tools",
        minutes: TODO_VERIFY,  // TODO: confirm duration
        completed: "24 July 2026",
        certificate: null, // TODO: add certificate image/PDF path
      },
    ],
    independent: [
      // Books, research, practice, self-directed learning — add entries here.
    ],
  },

  experience: [
    {
      role: "Operations — Field & DCS",
      org: "Saudi Aramco",
      location: "Yanbu",
      start: "2019",
      end: "Present",
      points: [
        "Joined in 2019; hands-on field operations and DCS control-room experience since 2021, on rotating shifts.",
        "Operational coordination, SAP, documentation, and safety practices.",
        "Built practical workflow-improvement tools recognized by management.",
      ],
    },
    {
      role: "Co-founder & Manager — specialty coffee",
      org: "Café partnership", // TODO: confirm public English name
      location: "",
      start: "2021",
      end: "2025",
      points: [
        "Responsible for staff, daily operations, and supply — from opening to handover.",
        "Customer experience, cost awareness, and small-business leadership in practice.",
      ],
    },
    {
      role: "Retail Branch Manager",
      org: "Consumer technology retail", // TODO: confirm employer name + dates
      location: "",
      start: TODO_VERIFY,
      end: TODO_VERIFY,
      points: [
        "Led branch staff and daily retail operations.",
        "Accountability for targets, customer experience, and team performance.",
      ],
    },
    {
      role: "Sales — Samsung & Huawei products",
      org: "Consumer technology sales", // TODO: confirm employer name + dates
      location: "",
      start: TODO_VERIFY,
      end: TODO_VERIFY,
      points: [
        "Consumer-technology sales and marketing — where customer understanding started.",
      ],
    },
  ],

  education: {
    degree: "Bachelor of Business Administration",
    school: "Saudi Electronic University",
    status: "Currently studying — second year",
    gpa: "3.30 / 4.00",
    note: "Studying while working rotating shifts.",
  },

  skills: {
    "Operations": ["Field Operations", "DCS Operations", "Operational Coordination", "Safety Awareness", "Documentation"],
    "Business": ["Business Administration", "Process Improvement", "Project Coordination", "Business Development", "Customer Experience"],
    "Digital Tools": ["Microsoft Excel", "SAP", "Power BI", "Microsoft 365", "GitHub", "ChatGPT & AI Tools"],
  },

  recommendations: [
    // Future supervisor & colleague recommendations. Do not invent quotes.
  ],

  footer: {
    disclaimer: "Personal website — not affiliated with or endorsed by Saudi Aramco.",
  },
};
