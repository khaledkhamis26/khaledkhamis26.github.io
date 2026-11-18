/* ---- Edit your content here ---- */
const checks = [
  "Titration endpoint at pH 7.00 ± 0.05 (n=6)",
  "HPLC assay purity ≥ 99.5 % on 3 batches",
  "Expired auth token is rejected with 401",
  "Checkout regression suite: 412 tests green",
  "Calibration curve R² ≥ 0.999"
];

const skills = {
  "Chemistry": ["Fermentation", "UV-Vis", "Titration", "Method validation", "GLP / GMP", "SOP writing", "Ethanol Measurement"],
  "Software testing": ["Test strategy", "Exploratory testing", "Playwright", "Cypress", "Postman / REST", "Python & pytest", "JavaScript", "GitHub Actions CI", "SQL", "Jira"]
};

const projects = [
  {t:"test", title:"placeholder", text:"placeholder.", tags:"Playwright · GitHub Actions", link:"link"},
  {t:"chem", title:"placeholder chem", text:"placeholder.", tags:"tags here", link:""},
  {t:"test", title:"API contract tests with test-data factory", text:"Generated realistic assay data for contract tests, which removed flaky failures caused by shared fixtures.", tags:"pytest · Postman", link:"https://github.com/your-username/api-tests"},
  {t:"chem", title:"placeholder", text:"placeholder", tags:"Stability · Statistics", link:""}
];

const jobs = [
  {when:"2025 – present", role:"Freelance Software tester", text:"Carrying out software testing tasks on uTest platform."},
{when:"2025 – present", role:"Senior Quality Control Specialist, Wadi Group", text:"Spearhead shift planning and workforce coordination for QC team of 6 members, optimizing productivity to meet on-time delivery targets, Serve as primary custodian of ISO 9001:2015 QMS: Conduct internal audits, maintain documentation, and lead continuous improvement initiatives that reduced non-conformities, Train and mentor team members on QC protocols and ISO standards, ensuring consistent compliance during regulatory audits/inspections.."},
  {when:"2019 – 2025", role:"Quality Specialist, Wadi Group", text:"Protein Content Analysis: Perform protein content determination in soybean seeds and meal using the Kjeldahl. Accurately quantify nitrogen content and calculate protein levels, Moisture Content Measurement: Conduct moisture content analysis on soybean seeds, oil, and meal using oven drying to ensure proper quality control, Urease Enzyme Activity Assay: Analyze urease enzyme activity in soybean meal, Free Fatty Acids (FFAs) Testing: Quantify free fatty acid content in soybean oil through titration methods, ensuring compliance with quality standards."},
  {when:"2018", role:"Lab Chemist, Evergrow for speciality fertilizers.", text:"Analyzing Fertilizers and final products such as Potassium Sulphate, Sulphuric Acid, Hydrocholric Acid and Calcium Chloride, and raw materials such as Sulfur, Potassium Carbonate, Silica, etc.."}
];

const education = [
{when:"2026", role:"AWS Certified Cloud Practitioner, AWS", text:"Introductory Certificate in AWS Services."},
{when:"2025", role:"ISTQB Certified Tester, Foundation Level", text:"Certification in test design techniques and test management."},
{when:"2024 – 2025", role:"Software Testing Diploma, Digital Egypt Pioneers Initiative", text:"Bootcamp in Software testing."},
{when:"2020 – Present", role:"M.Sc. Environmental Biotechnology, University of Sadat City", text:"Thesis on production of ethanol from lignocellulosic waste."},
{when:"2020 – 2023", role:"Computer Science Diploma, Cairo University", text:"Graduate certificate in Computer Science that emphasized fundamental concepts in Computer Programming, Operating Systems, Compilers, Algorithms, Digital Design, Networks, and Databases, equipping me with a comprehensive technical background."},
{when:"2011 – 2015", role:"B.Sc. Biochemistry & Chemistry, Alexandria University", text:"Graduated with Good grade."}
];

/* ---- Rendering ---- */
const $ = s => document.querySelector(s);
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html) e.innerHTML = html; return e; };

$("#skill-cols").append(...Object.entries(skills).map(([k, v]) =>
  el("div", "skill", `<h3>${k}</h3><ul>${v.map(i => `<li>${i}</li>`).join("")}</ul>`)));

const grid = $("#projects");
projects.forEach(p => {
  const c = el("article", "card", `<h3>${p.title}</h3><p>${p.text}</p><span class="tags">${p.tags}</span>${p.link ? `<a href="${p.link}" target="_blank" rel="noopener">View project</a>` : ""}`);
  c.dataset.t = p.t; grid.append(c);
});

$("#timeline").append(...jobs.map(j => el("li", "", `<span class="when">${j.when}</span><h3>${j.role}</h3><p>${j.text}</p>`)));
$("#edu-timeline").append(...education.map(e => el("li", "", `<span class="when">${e.when}</span><h3>${e.role}</h3><p>${e.text}</p>`)));

document.querySelectorAll(".chip").forEach(b => b.addEventListener("click", () => {
  document.querySelectorAll(".chip").forEach(x => x.classList.toggle("on", x === b));
  grid.querySelectorAll(".card").forEach(c => c.classList.toggle("hide", b.dataset.f !== "all" && c.dataset.t !== b.dataset.f));
}));

/* Hero: test report runs once on load */
const list = $("#checks"), tally = $("#tally");
checks.forEach(t => list.append(el("li", "", `<span class="mark">✓</span><span>${t}</span>`)));
tally.textContent = `0 / ${checks.length} passed`;
[...list.children].forEach((li, i) => setTimeout(() => {
  li.classList.add("in"); tally.textContent = `${i + 1} / ${checks.length} passed`;
}, 500 + i * 450));

/* Theme toggle (remembered) */
const root = document.documentElement;
try { const s = localStorage.getItem("theme"); if (s) root.dataset.theme = s; } catch (e) {}
$("#theme").addEventListener("click", () => {
  const dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = dark ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
});

$("#year").textContent = new Date().getFullYear();
