const header = document.querySelector("[data-header]");
const tools = document.querySelectorAll("[data-tool]");
const output = document.querySelector("[data-tool-output]");
const hero = document.querySelector(".hero");
const heroVisual = document.querySelector(".holo-window");
const filters = document.querySelectorAll("[data-filter]");
const galleryItems = document.querySelectorAll("[data-category]");

const toolContent = {
  content: {
    title: "Content workflows",
    copy:
      "Turn a sermon, class, or study guide into social posts, email copy, short video outlines, discussion questions, and volunteer-ready design briefs.",
  },
  planning: {
    title: "Planning assistants",
    copy:
      "Draft ministry calendars, event run-of-shows, campaign plans, meeting agendas, launch checklists, and weekly communication rhythms.",
  },
  care: {
    title: "Pastoral care support",
    copy:
      "Prepare thoughtful follow-up templates, prayer team updates, visitor next steps, and care prompts while keeping final judgment in human hands.",
  },
  training: {
    title: "Team training",
    copy:
      "Give staff and volunteers a shared prompt library, AI policy, review process, and examples they can use without starting from scratch.",
  },
};

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 24);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

tools.forEach((tool) => {
  tool.addEventListener("click", () => {
    const selected = tool.dataset.tool;
    const content = toolContent[selected];

    tools.forEach((item) => item.classList.toggle("active", item === tool));
    output.innerHTML = `<h3>${content.title}</h3><p>${content.copy}</p>`;
  });
});

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const category = filter.dataset.filter;

    filters.forEach((item) => item.classList.toggle("active", item === filter));
    galleryItems.forEach((item) => {
      const isVisible = category === "all" || item.dataset.category === category;
      item.classList.toggle("hidden", !isVisible);
    });
  });
});

if (hero && heroVisual) {
  hero.addEventListener("pointermove", (event) => {
    const bounds = hero.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    heroVisual.style.setProperty("--tilt-x", `${y * -7}deg`);
    heroVisual.style.setProperty("--tilt-y", `${x * 10}deg`);
    heroVisual.style.setProperty("--lift", `${y * -10}px`);
  });

  hero.addEventListener("pointerleave", () => {
    heroVisual.style.removeProperty("--tilt-x");
    heroVisual.style.removeProperty("--tilt-y");
    heroVisual.style.removeProperty("--lift");
  });
}
