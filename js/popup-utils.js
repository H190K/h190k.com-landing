// popup-utils.js - Reusable popup functionality

export function initStorePopup() {
  const popupHTML = `
    <div class="store-popup" style="display:none;">
      <div class="popup-content">
        <button class="close-popup">&times;</button>
        <p>Check our store for in-depth details about our services and plan prices that may suit you!</p>
        <a href="https://store.h190k.com" target="_blank" class="btn-secondary">Visit Store</a>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', popupHTML);
  
  const popup = document.querySelector('.store-popup');
  const closeBtn = document.querySelector('.close-popup');
  
  closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
  });
  
  setTimeout(() => {
    popup.style.display = 'flex';
  }, 5000);
}
