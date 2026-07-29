/* ============================================================
   CONTENT.JS — All portfolio content lives here.
   Edit this file to update the website. No design knowledge needed.

   Rules of this file (agreed with Aseel):
   - Never invent facts, dates, providers, durations, or results.
   - Anything unconfirmed is left as null and renders as a clear placeholder.
   - Every list below is meant to grow — add entries, the page follows.
   ============================================================ */

const TODO_VERIFY = null; // placeholder marker — renders as a clearly-labeled placeholder

const CONTENT = {

  meta: {
    title: "Aseel Hamoud — Operations Professional with a Business Mindset",
    description:
      "Aseel Hamoud combines hands-on operational experience with business thinking and digital problem-solving — building practical tools, improving workflows, and developing toward business, technology, and leadership roles.",
  },

  identity: {
    name: "Aseel Hamoud",
    headline: "Operations Professional with a Business Mindset",
    tagline: "Operations experience. Business mindset. Broader ambition.",
    intro:
      "I combine hands-on operational experience with business thinking and digital problem-solving. I focus on identifying practical problems, improving workflows, building useful tools, and continuously developing my skills across operations, business, safety, and technology, while strengthening my leadership, communication, and personal effectiveness.",
    photo: "assets/aseel.jpg", // temporary photo — replace with a professional portrait later
  },

  links: {
    email: "bnhamoud22@gmail.com",
    linkedin: TODO_VERIFY, // TODO: add LinkedIn URL — button stays visible either way
    cv: TODO_VERIFY,       // TODO: add CV file path — button stays visible either way
  },

  /* ---- Professional statistics ----
     Add or edit cards freely. `breakdown` is optional and renders
     as a clearly-linked split of the main figure.                  */
  stats: [
    {
      value: "6+",
      unit: "Years",
      label: "At Saudi Aramco",
      note: "September 2019 to present",
    },
    {
      value: "132",
      label: "Learning Hours",
      note: "recorded internal learning",
    },
    {
      value: "100",
      label: "Internal Learning Activities",
      breakdownLabel: "Made up of",
      breakdown: [
        { value: "70", label: "e-Learning Activities" },
        { value: "30", label: "Instructor-Led / Classroom Activities" },
      ],
    },
    // Project counts and other professional figures are being reviewed —
    // add them here when confirmed.
  ],

  about: [
    "My story didn’t start in a control room. It started in sales — consumer technology, retail leadership, and later co-running a specialty-coffee business — where I learned customers, teams, and what ownership really means.",

    "In 2019 I joined Saudi Aramco, and in 2021 I moved into hands-on field operations and DCS control-room work — alongside operational coordination, SAP, documentation, safety, and workflow improvement. Working the frontline showed me where the real friction lives — and I kept turning that friction into practical, documented tools that teams actually use.",
    "Today I’m studying Business Administration at Saudi Electronic University while working rotating shifts. My operational background is my foundation — my direction is growth into business, process improvement, digital transformation, AI, training, and leadership.",
  ],

  /* ---- Career journey (most recent first) ----
     An entry with `stages` renders as one employer containing an
     internal timeline — used for the connected Saudi Aramco journey.
     Stages follow the same direction: newest at the top.            */
  experience: [
    {
      company: "Saudi Aramco",
      logo: "assets/logos/aramco.png",
      role: "Operations Department — September 2019 to Present",
      period: null,
      /* One employer, one connected internal journey. */
      stages: [
        {
          title: "DCS / Control Room Operations",
          subtitle: "2023 to Present",
          text: "Progressed into DCS and control-room operations, including process monitoring, operational coordination, communication with field teams, and operational decision support.",
        },
        {
          title: "Plant Commissioning & Start-Up Team",
          subtitle: "Yanbu",
          text: "Contributed directly to the commissioning and start-up of a newly established plant. Supported commissioning activities, field coordination, operational readiness, and the transition from the start-up phase into live operations.",
          emphasis: true,
        },
        {
          title: "Operations Assignment",
          subtitle: "Jeddah",
          text: "Gained frontline operations experience and supported daily operational activities during the Jeddah assignment.",
        },
        {
          title: "Truck Loading Compliance & Driver Evaluation",
          subtitle: "Rabigh",
          text: "Verified driver and vehicle certifications before loading activities, conducted safety and compliance checks, and evaluated driver readiness against facility requirements.",
        },
        {
          title: "Industrial Training Center — ITC",
          subtitle: "Apprenticeship Training",
          text: "Completed foundational technical and operational training in preparation for frontline operations responsibilities.",
        },
      ],
    },
    {
      company: "Al Nukaly",
      logo: "assets/logos/alnukaly.png",
      role: "Branch Manager — 2019",
      period: null,
      points: [
        "Ran daily branch operations and kept the branch's day-to-day requirements covered.",
        "Coordinated the team, organised shifts and responsibilities, and kept the floor running.",
        "Held responsibility for customer service standards.",
        "Carried sales and business responsibility for the branch.",
      ],
    },
    {
      company: "Samsung",
      logo: "assets/logos/samsung.png",
      role: "Sales & Marketing Representative",
      period: "Main Jeddah Branch — 2018",
      points: [
        "Owned the customer experience at the main branch, from first question to final purchase.",
        "Presented products and demonstrated features to help customers choose confidently.",
        "Supported marketing activities and in-branch promotions.",
        "Delivered on sales performance targets.",
      ],
    },
    {
      company: "Huawei",
      logo: "assets/logos/huawei.png",
      role: "Part-Time Sales Representative",
      period: null, // date not provided
      points: [
        "Engaged customers directly on the sales floor, understanding their needs before recommending a product.",
        "Built detailed product knowledge across the range and presented features in terms customers cared about.",
        "Gained practical sales experience in a fast-moving consumer-technology environment.",
      ],
    },
    /* Kept for later — the specialty-coffee partnership (approx. 2021–2025,
       responsible for staff, operations, and supply). Re-add here when the
       public wording and dates are settled:
    {
      company: "Specialty coffee — partnership",
      logo: null,
      role: "Co-founder & Manager",
      period: "2021 — 2025",
      points: ["Responsible for staff, daily operations, and supply — from opening to handover."],
    },
    */
  ],

  /* ---- Projects & practical solutions ----
     No status labels. Use accurate contribution verbs only.
     `tags` are simple categories. `evidence` is optional.          */
  projects: [
    {
      title: "Electrical Isolation Points Reference Tool",
      tags: ["Digital Tool", "Operational Solution", "Safety Improvement"],
      challenge:
        "Electrical isolation references were spread across separate sources. Finding the isolation point for a given piece of equipment — and the breaker platform it belonged to — took time and repeated cross-checking, in situations where clarity matters most.",
      contribution:
        "I initiated the work, gathered and verified the references, designed how the records should be structured, and built the tool in Excel.",
      solution:
        "An Excel-based reference tool consolidating 638+ equipment and electrical isolation-point references into one place. It covers equipment such as MOVs and pumps, their electrical isolation locations, and their associated breaker-platform references. Navigation is handled through background-image hyperlinks so users move straight to the area they need, and the worksheet structure is controlled and protected so records stay consistent.",
      tools: ["Microsoft Excel", "Structured equipment records", "Background-image hyperlinks", "Protected worksheet structure"],
      value:
        "Puts scattered isolation references in one organised place, making the information faster to locate and easier to read correctly.",
      evidence: "Presented to management, and used during review.",
    },
    {
      title: "Operational Checklist & Performance Dashboard",
      tags: ["Digital Tool", "Process Improvement"],
      challenge:
        "Weekly, monthly, and quarterly tasks were tracked on fragmented paper records — hard to see what was current, and unclear who owned what.",
      contribution: "Designed and built the system end to end.",
      solution:
        "An Excel-based dashboard that manages recurring operational tasks with status tracking and a current-period view.",
      tools: ["Microsoft Excel", "Dashboard logic"],
      value:
        "One place to see the current period at a glance, with clearer ownership and easier follow-up.",
      evidence: null,
    },
    {
      title: "Tank Calculation & Operational Decision Support",
      tags: ["Digital Tool", "Operational Solution"],
      challenge:
        "Time-critical operational calculations involve multiple inputs and constraints, leaving room for manual error.",
      contribution: "Designed the calculation approach and built working prototypes.",
      solution:
        "Structured calculators that validate inputs and lay out the constraints, so the numbers behind a decision are visible and checkable.",
      tools: ["Microsoft Excel", "Validation logic"],
      value:
        "Aims to reduce manual error and shorten the time it takes to reach a checked answer.",
      evidence: null,
    },
    {
      title: "Training & Progress Tracker",
      tags: ["Learning & Development", "Process Improvement"],
      challenge: "Training and development progress was hard to see in one view.",
      contribution: "Built the tracker structure.",
      solution:
        "A structured tracker showing training status and development progress together.",
      tools: ["Microsoft Excel"],
      value: "Makes development progress visible instead of scattered.",
      evidence: null,
    },
    // More projects and practical solutions will be added here.
  ],

  /* ---- Learning & credentials ----
     Internal company learning is kept separate from external credentials. */
  learning: {
    internal: {
      hours: 132,
      activities: 100,
      breakdown: [
        { value: 70, label: "e-Learning Activities" },
        { value: 30, label: "Instructor-Led / Classroom Activities" },
      ],
      note: "Recorded internal company learning. The 70 and 30 figures are activity counts and together make up the 100 internal learning activities.",
    },
    categories: ["Operations", "Safety", "Business & Leadership", "AI & Digital Tools", "Personal Development"],
    external: [
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
      // Add credentials here as they are confirmed. Do not add a course
      // until its provider, date, and duration are known.
    ],
  },

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

  /* ---- Professional recommendation ----
     `summary` is a faithful summary, not a verbatim quotation — so it is
     rendered without quotation marks. Replace with an exact excerpt later. */
  recommendation: {
    heading: "Professional Recommendation — YLAB 11 Application",
    by: "Ibrahim Al-Mohammadi",
    /* TODO: confirm against the exact title printed on the letter. */
    byTitle: "Senior Operations Leader | Saudi Aramco",
    byRelation: "Former Direct Supervisor",
    label: "Recommendation Highlights",
    summary:
      "Recognized for ownership, initiative, and continuous development, including his progression from Outside Operator to DCS Operator and his contribution to the start-up of Yanbu Distribution Hub. Ibrahim also highlighted Aseel’s ability to connect learning with execution, apply his Business Administration studies at work, and bring strong communication, customer focus, and organization from his commercial experience. He endorsed Aseel as someone who would represent the program with professionalism and integrity while creating value for employees and the organization.",
  },

  footer: {
    disclaimer: "Personal website — not affiliated with or endorsed by Saudi Aramco. Company names and logos are the property of their respective owners and are shown to identify past and current employers.",
  },
};
