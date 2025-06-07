// panelContent.js
function updatePanelContent(panelType) {
    panelHeader.textContent = panelType.charAt(0).toUpperCase() + panelType.slice(1);

    switch (panelType) {
        case 'background':
            panelContent.innerHTML = `
                <div class="background-options">
                    <div class="bg-option" style="background-image: url('images/backgroung/cape-7404790_1280.jpg');" onclick="changeBackground('url(images/backgroung/cape-7404790_1280.jpg)')"></div>
                    <div class="bg-option" style="background-image: url('images/backgroung/dawn-8361032_1280.jpg');" onclick="changeBackground('url(images/backgroung/dawn-8361032_1280.jpg)')"></div>
                    <div class="bg-option" style="background-image: url('images/backgroung/dolomites-5076487_1280.jpg');" onclick="changeBackground('url(images/backgroung/dolomites-5076487_1280.jpg)')"></div>
                    <div class="bg-option" style="background-image: url('images/backgroung/glacier-7187291_1280.jpg');" onclick="changeBackground('url(images/backgroung/glacier-7187291_1280.jpg)')"></div>
                    <div class="bg-option" style="background-image: url('images/backgroung/polynesia-3021072_1280.jpg');" onclick="changeBackground('url(images/backgroung/polynesia-3021072_1280.jpg)')"></div>
                </div>
            `;
            break;
        default:
            panelContent.innerHTML = `<p>No content available.</p>`;
            break;
    }
}

function changeBackground(imageUrl) {
    document.getElementById('mainScreen').style.backgroundImage = imageUrl;
}
