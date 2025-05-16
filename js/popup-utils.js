// popup-utils.js - Reusable popup functionality
export function initStorePopup() {
  const popup = document.getElementById('popup');
  
  if (!popup) {
    const popupHTML = `
      <div class="popup-overlay" id="popup">
        <div class="popup-content">
          <button class="close-popup">&times;</button>
          <div class="popup-body">
            <p>Check our store for in-depth details about our services and plan prices that may suit you!</p>
            <a href="https://store.h190k.com" target="_blank" class="btn-secondary">Visit Store</a>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', popupHTML);
  }
  
  const closeBtn = document.querySelector('.close-popup');
  const popupOverlay = document.getElementById('popup');
  
  closeBtn.addEventListener('click', () => {
    popupOverlay.classList.remove('active');
  });
  
  // Show popup after delay
  setTimeout(() => {
    popupOverlay.classList.add('active');
  }, 5000);
}
