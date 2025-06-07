// main.js
let activePanel = null;

const navItems = document.querySelectorAll('.nav-item');
const sidePanel = document.getElementById('sidePanel');
const overlay = document.getElementById('overlay');
const panelHeader = document.getElementById('panelHeader');
const panelContent = document.getElementById('panelContent');

// Navigation handling
navItems.forEach(item => {
    item.addEventListener('click', () => {
        const panel = item.dataset.panel;
        if (activePanel === panel) {
            closePanel();
        } else {
            openPanel(panel);
        }
    });
});

overlay.addEventListener('click', closePanel);

function openPanel(panelType) {
    activePanel = panelType;
    navItems.forEach(item => item.classList.remove('active'));
    document.querySelector(`[data-panel="${panelType}"]`).classList.add('active');
    
    sidePanel.classList.add('open');
    overlay.classList.add('active');
    
    updatePanelContent(panelType);
}

function closePanel() {
    activePanel = null;
    navItems.forEach(item => item.classList.remove('active'));
    sidePanel.classList.remove('open');
    overlay.classList.remove('active');
}
