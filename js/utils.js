/**
 * Generates HTML markup for a project card
 * @param {Object} p - Project object containing title, img, link, desc, and optional button text
 * @returns {string} HTML string for the project card
 */
export function card(p) {
  return `
    <div class="project-card">
      <a href="${p.link}" target="_blank">
        <img src="${p.img}" alt="${p.title}" loading="lazy">
      </a>
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <button class="btn-secondary"
              onclick="window.open('${p.link}', '_blank')">
        ${p.button || 'View Project'}
      </button>
    </div>`;
}
