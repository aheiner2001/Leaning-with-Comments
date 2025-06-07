  let activePanel = null;
    let draggedItem = null;
    let soundLevel = 0;
    let timers = [];
    let currentTarget = null;
    
    const navItems = document.querySelectorAll('.nav-item');
    const menu = document.querySelectorAll('.menu');

    const sidePanel = document.getElementById('sidePanel');
    const overlay = document.getElementById('overlay');
    const panelHeader = document.getElementById('panelHeader');
    const panelContent = document.getElementById('panelContent');
    const mainScreen = document.getElementById('mainScreen');

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

    function updatePanelContent(panelType) {
        panelHeader.textContent = panelType.charAt(0).toUpperCase() + panelType.slice(1);
        
        switch(panelType) {
            case 'background':
                panelContent.innerHTML = `
                    <div class="background-options">
                     <div class="bg-option" style="background-image: url('images/backgroung/cape-7404790_1280.jpg');" onclick="changeBackground('url(images/backgroung/cape-7404790_1280.jpg)')"></div>
                <div class="bg-option" style="background-image: url('images/backgroung/dawn-8361032_1280.jpg');" onclick="changeBackground('url(images/backgroung/dawn-8361032_1280.jpg)')"></div>
                <div class="bg-option" style="background-image: url('images/backgroung/dolomites-5076487_1280.jpg');" onclick="changeBackground('url(images/backgroung/dolomites-5076487_1280.jpg)')"></div>
                <div class="bg-option" style="background-image: url('images/backgroung/glacier-7187291_1280.jpg');" onclick="changeBackground('url(images/backgroung/glacier-7187291_1280.jpg)')"></div>
                <div class="bg-option" style="background-image: url('images/backgroung/polynesia-3021072_1280.jpg');" onclick="changeBackground('url(images/backgroung/polynesia-3021072_1280.jpg)')"></div>
                <div class="bg-option" style="background-image: url('images/backgroung/river-2951997_1280.jpg');" onclick="changeBackground('url(images/backgroung/river-2951997_1280.jpg)')"></div>
                <div class="bg-option" style="background-image: url('images/backgroung/snow-mountain-9614087_1280.jpg');" onclick="changeBackground('url(images/backgroung/snow-mountain-9614087_1280.jpg)')"></div>
                <div class="bg-option" style="background-image: url('images/backgroung/sunset-7133867_1280.jpg');" onclick="changeBackground('url(images/backgroung/sunset-7133867_1280.jpg)')"></div>
                <div class="bg-option" style="background-image: url('images/backgroung/trail-5726987_1280.jpg');" onclick="changeBackground('url(images/backgroung/trail-5726987_1280.jpg)')"></div>
                <div class="bg-option" style="background-image: url('images/backgroung/water-8200504_1280.jpg');" onclick="changeBackground('url(images/backgroung/water-8200504_1280.jpg)')"></div>
                        <div class="bg-option" style="background: linear-gradient(45deg, #ff6b6b, #4ecdc4);" onclick="changeBackground('linear-gradient(45deg, #ff6b6b, #4ecdc4)')"></div>
                        <div class="bg-option" style="background: linear-gradient(135deg, #667eea, #764ba2);" onclick="changeBackground('linear-gradient(135deg, #667eea, #764ba2)')"></div>
                        <div class="bg-option" style="background: linear-gradient(45deg, #f093fb, #f5576c);" onclick="changeBackground('linear-gradient(45deg, #f093fb, #f5576c)')"></div>
                        <div class="bg-option" style="background: linear-gradient(135deg, #4facfe, #00f2fe);" onclick="changeBackground('linear-gradient(135deg, #4facfe, #00f2fe)')"></div>
                        <div class="bg-option" style="background: linear-gradient(45deg, #43e97b, #38f9d7);" onclick="changeBackground('linear-gradient(45deg, #43e97b, #38f9d7)')"></div>
                        <div class="bg-option" style="background: linear-gradient(135deg, #fa709a, #fee140);" onclick="changeBackground('linear-gradient(135deg, #fa709a, #fee140)')"></div>
                    </div>
                    <button class="panel-button" onclick="randomBackground()">Random Background</button>
                `;
                break;
            case 'sound':
                panelContent.innerHTML = `
                    <p>Sound Level Monitor</p>
                    <button class="panel-button" onclick="addSoundMeter()">Add Sound Meter</button>
                    <button class="panel-button" onclick="simulateSound()">Simulate Sound</button>
                `;
                break;
            case 'image':
                panelContent.innerHTML = `
                    <p>Add Dragon Ball Images</p>
                    <button class="panel-button" onclick="addDragonBallImage('goku')">Add Goku</button>
                    <button class="panel-button" onclick="addDragonBallImage('vegeta')">Add Vegeta</button>
                    <button class="panel-button" onclick="addDragonBallImage('dragonball')">Add Dragon Ball</button>
                `;
                break;
            case 'text':
                panelContent.innerHTML = `
                    <input type="text" class="panel-input" id="textInput" placeholder="Enter your text">
                    <button class="panel-button" onclick="addText()">Add Text</button>
                `;
                break;
            case 'timer':
                panelContent.innerHTML = `
                    <div class="timer-controls">
                        <input type="number" class="panel-input timer-input" id="minutes" placeholder="MM" min="0" max="59">
                        <input type="number" class="panel-input timer-input" id="seconds" placeholder="SS" min="0" max="59">
                    </div>
                    <button class="panel-button" onclick="addTimer()">Add Timer</button>
                `;
                break;
            case 'clock':
                panelContent.innerHTML = `
                    <p>Digital Clock</p>
                    <button class="panel-button" onclick="addClock()">Add Clock</button>
                `;
                break;
        }
    }

    // Background functions
    function changeBackground(gradient) {
        document.body.style.background = gradient;
    }

    function changeBackground(image) {
    document.body.style.backgroundImage = image;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center';
    document.body.style.height = '100vh';
}
    function randomBackground() {
        const gradients = [
            'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
            'linear-gradient(135deg, #667eea, #764ba2)',
            'linear-gradient(45deg, #f093fb, #f5576c)',
            'linear-gradient(135deg, #4facfe, #00f2fe)',
            'linear-gradient(45deg, #43e97b, #38f9d7)',
            'linear-gradient(135deg, #fa709a, #fee140)',
            'linear-gradient(45deg, #a8edea, #fed6e3)',
            'linear-gradient(135deg, #d299c2, #fef9d7)'
        ];
        const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
        changeBackground(randomGradient);
    }

    // Add draggable items
    function addText() {
        const text = document.getElementById('textInput').value || 'Sample Text';
        const textEl = document.createElement('div');
        textEl.className = 'draggable-item text';
        textEl.textContent = text;
        textEl.style.left = Math.random() * (window.innerWidth - 200) + 'px';
        textEl.style.top = Math.random() * (window.innerHeight - 300) + 'px';
        makeElementDraggable(textEl);
        mainScreen.appendChild(textEl);
    }

    function addClock() {
    // Create a wrapper to make the clock draggable
    const clockWrapper = document.createElement("div");
    clockWrapper.className = "draggable-item clock";
    clockWrapper.style.left = Math.random() * (window.innerWidth - 300) + "px";
    clockWrapper.style.top = Math.random() * (window.innerHeight - 350) + "px";
    clockWrapper.style.width = "300px";
    clockWrapper.style.height = "300px";
    clockWrapper.style.position = "absolute";

    // Build the clock face and hands
    const clockContainer = document.createElement("div");
    clockContainer.className = "clock-container";
    const clockFace = document.createElement("div");
    clockFace.className = "clock-face";
    const hourMarkers = document.createElement("div");
    hourMarkers.className = "hour-markers";
    for (let i = 0; i < 12; i++) {
        const marker = document.createElement("div");
        marker.className = "hour-marker";
        marker.style.transform = `translateX(-50%) rotate(${i * 30}deg)`;
        hourMarkers.appendChild(marker);
    }
    const minuteMarkers = document.createElement("div");
    minuteMarkers.className = "minute-markers";
    for (let i = 0; i < 60; i++) {
        const marker = document.createElement("div");
        marker.className = "minute-marker";
        marker.style.transform = `translateX(-50%) rotate(${i * 6}deg)`;
        minuteMarkers.appendChild(marker);
    }
    const numbers = [
        "12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"
    ];
    numbers.forEach((num, i) => {
        const numberDiv = document.createElement("div");
        numberDiv.className = `number num-${num}`;
        numberDiv.textContent = num;
        clockFace.appendChild(numberDiv);
    });
    

    // Hands
    ["hour", "minute", "second"].forEach(type => {
        const hand = document.createElement("div");
        hand.className = `hand ${type}-hand`;
        hand.id = `${type}Hand`;
        clockFace.appendChild(hand);
    });
    const centerDot = document.createElement("div");
    centerDot.className = "center-dot";

    // Digital display
    const digitalTime = document.createElement("div");
    digitalTime.className = "digital-time";
    digitalTime.id = "digitalTime";

    // Append all to clock face
    clockFace.appendChild(hourMarkers);
    clockFace.appendChild(minuteMarkers);
    clockFace.appendChild(centerDot);

    // Append everything to clock container
    clockContainer.appendChild(clockFace);
    clockContainer.appendChild(digitalTime);

    // Add to wrapper and page
    clockWrapper.appendChild(clockContainer);
    makeElementDraggable(clockWrapper);
    mainScreen.appendChild(clockWrapper);

    // Update the clock hands and digital time
    function updateClock() {
        const now = new Date();
        const hours = now.getHours() % 12;
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        // Calculate angles for each hand
        const secondAngle = (seconds * 6); // 6 degrees per second
        const minuteAngle = (minutes * 6) + (seconds * 0.1); // 6 degrees per minute + smooth seconds
        const hourAngle = (hours * 30) + (minutes * 0.5); // 30 degrees per hour + smooth minutes

        // Apply rotations
        clockFace.querySelector('.second-hand').style.transform = `rotate(${secondAngle}deg)`;
        clockFace.querySelector('.minute-hand').style.transform = `rotate(${minuteAngle}deg)`;
        clockFace.querySelector('.hour-hand').style.transform = `rotate(${hourAngle}deg)`;

        // Update digital time
        digitalTime.textContent = now.toLocaleTimeString();
    }
    updateClock();
    setInterval(updateClock, 1000);
}
    function addTimer() {
        const minutes = parseInt(document.getElementById('minutes').value) || 0;
        const seconds = parseInt(document.getElementById('seconds').value) || 30;
        const totalSeconds = minutes * 60 + seconds;
        
        const timerEl = document.createElement('div');
        timerEl.className = 'draggable-item timer';
        timerEl.style.left = Math.random() * (window.innerWidth - 200) + 'px';
        timerEl.style.top = Math.random() * (window.innerHeight - 300) + 'px';
        makeElementDraggable(timerEl);
        mainScreen.appendChild(timerEl);
        
        startTimer(timerEl, totalSeconds);
    }

    function startTimer(timerEl, seconds) {
        let timeLeft = seconds;
        const interval = setInterval(() => {
            const mins = Math.floor(timeLeft / 60);
            const secs = timeLeft % 60;
            timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            
            if (timeLeft <= 0) {
                clearInterval(interval);
                timerEl.style.background = '#ff4444';
                timerEl.textContent = '00:00';
            }
            timeLeft--;
        }, 1000);
    }

    function addSoundMeter() {
        const meterEl = document.createElement('div');
        meterEl.className = 'draggable-item sound-meter';
        meterEl.innerHTML = `
            <div class="sound-bar">
                <div class="sound-level"></div>
            </div>
        `;
        meterEl.style.left = Math.random() * (window.innerWidth - 200) + 'px';
        meterEl.style.top = Math.random() * (window.innerHeight - 300) + 'px';
        makeElementDraggable(meterEl);
        mainScreen.appendChild(meterEl);
        
        const levelBar = meterEl.querySelector('.sound-level');
        setInterval(() => {
            const randomLevel = Math.random() * 100;
            levelBar.style.width = randomLevel + '%';
        }, 200);
    }

    function simulateSound() {
        soundLevel = Math.random() * 100;
        const soundMeters = document.querySelectorAll('.sound-meter .sound-level');
        soundMeters.forEach(meter => {
            meter.style.width = soundLevel + '%';
        });
    }
    function editItem() {
    if (currentTarget) {
        if (currentTarget.classList.contains('text')) {
            const newText = prompt('Edit text:', currentTarget.textContent);
            if (newText !== null) currentTarget.textContent = newText;
        } else if (currentTarget.classList.contains('timer')) {
            alert('Timer editing not implemented yet.');
        } else if (currentTarget.classList.contains('clock')) {
            alert('Clock editing not implemented yet.');
        } else {
            alert('Edit: ' + currentTarget.textContent);
        }
        document.getElementById('actionMenu').classList.add('hidden');
    }
}

    function addDragonBallImage(character) {
        const imageEl = document.createElement('div');
        imageEl.className = 'draggable-item';
        imageEl.style.width = '80px';
        imageEl.style.height = '80px';
        imageEl.style.borderRadius = '50%';
        imageEl.style.left = Math.random() * (window.innerWidth - 100) + 'px';
        imageEl.style.top = Math.random() * (window.innerHeight - 300) + 'px';
        
        switch(character) {
            case 'goku':
                imageEl.style.background = 'linear-gradient(45deg, #ff6b35, #f7931e)';
                imageEl.innerHTML = '<div style="text-align:center;line-height:80px;font-weight:bold;color:white;">🥋</div>';
                break;
            case 'vegeta':
                imageEl.style.background = 'linear-gradient(45deg, #1e3c72, #2a5298)';
                imageEl.innerHTML = '<div style="text-align:center;line-height:80px;font-weight:bold;color:white;">👑</div>';
                break;
            case 'dragonball':
                imageEl.style.background = 'linear-gradient(45deg, #ffa500, #ff6347)';
                imageEl.innerHTML = '<div style="text-align:center;line-height:80px;font-weight:bold;color:white;">🐉</div>';
                break;
        }
        
        makeElementDraggable(imageEl);
        mainScreen.appendChild(imageEl);
    }

    // Drag and drop functionality
    function makeElementDraggable(element) {
        let isDragging = false;
        let startX, startY, initialX, initialY;

        element.addEventListener('mousedown', startDrag);
        element.addEventListener('touchstart', startDrag);

        function startDrag(e) {
            isDragging = true;
            const clientX = e.clientX || e.touches[0].clientX;
            const clientY = e.clientY || e.touches[0].clientY;
            
            startX = clientX;
            startY = clientY;
            initialX = parseInt(element.style.left) || 0;
            initialY = parseInt(element.style.top) || 0;
            
            element.style.zIndex = '1000';
            
            document.addEventListener('mousemove', drag);
            document.addEventListener('touchmove', drag);
            document.addEventListener('mouseup', stopDrag);
            document.addEventListener('touchend', stopDrag);
        }

        function drag(e) {
            if (!isDragging) return;
            
            const clientX = e.clientX || e.touches[0].clientX;
            const clientY = e.clientY || e.touches[0].clientY;
            
            const deltaX = clientX - startX;
            const deltaY = clientY - startY;
            
            element.style.left = (initialX + deltaX) + 'px';
            element.style.top = (initialY + deltaY) + 'px';
        }

        function stopDrag() {
            isDragging = false;
            element.style.zIndex = '10';
            
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('touchmove', drag);
            document.removeEventListener('mouseup', stopDrag);
            document.removeEventListener('touchend', stopDrag);
        }
        // let currentTarget = null;

document.addEventListener('click', function(e) {
    const menu = document.getElementById('actionMenu');
    // If clicking on a draggable item
    if (e.target.classList.contains('draggable-item')) {
        e.preventDefault();
        currentTarget = e.target;
        // Position menu near the item
        menu.style.left = `${e.pageX + 10}px`;
        menu.style.top = `${e.pageY + 10}px`;
        menu.classList.remove('hidden');
    } else if (!menu.contains(e.target)) {
        // Hide menu if clicking outside
        menu.classList.add('hidden');
        currentTarget = null;
    }
});

   function createMinuteMarkers() {
            const minuteMarkersContainer = document.querySelector('.minute-markers');
            for (let i = 0; i < 60; i++) {
                // Skip positions where hour markers are (every 5th marker)
                if (i % 5 !== 0) {
                    const marker = document.createElement('div');
                    marker.className = 'minute-marker';
                    marker.style.transform = `translateX(-50%) rotate(${i * 6}deg)`;
                    minuteMarkersContainer.appendChild(marker);
                }
            }
        }

        // Update clock hands
        function updateClock() {
            const now = new Date();
            const hours = now.getHours() % 12;
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();

            // Calculate angles for each hand
            const secondAngle = (seconds * 6); // 6 degrees per second
            const minuteAngle = (minutes * 6) + (seconds * 0.1); // 6 degrees per minute + smooth seconds
            const hourAngle = (hours * 30) + (minutes * 0.5); // 30 degrees per hour + smooth minutes

            // Apply rotations
            document.getElementById('secondHand').style.transform = `rotate(${secondAngle}deg)`;
            document.getElementById('minuteHand').style.transform = `rotate(${minuteAngle}deg)`;
            document.getElementById('hourHand').style.transform = `rotate(${hourAngle}deg)`;

            // Update digital time
            const digitalTime = now.toLocaleTimeString();
            document.getElementById('digitalTime').textContent = digitalTime;
        }

        // Initialize clock
        function initClock() {
            createMinuteMarkers();
            updateClock();
            setInterval(updateClock, 1000); // Update every second
        }

        // Start the clock when page loads
        window.addEventListener('load', initClock)

 // Only declare this ONCE, at the top

// ... rest of your code ...

// This should be OUTSIDE of makeElementDraggable
document.addEventListener('click', function(e) {
    const menu = document.getElementById('actionMenu');
    if (e.target.classList.contains('draggable-item')) {
        e.preventDefault();
        currentTarget = e.target;
        menu.style.left = `${e.pageX + 10}px`;
        menu.style.top = `${e.pageY + 10}px`;
        menu.classList.remove('hidden');
    } else if (!menu.contains(e.target)) {
        menu.classList.add('hidden');
        currentTarget = null;
    }
});

// These should be OUTSIDE of makeElementDraggable
function deleteItem() {
    if (currentTarget) {
        currentTarget.remove();
        document.getElementById('actionMenu').classList.add('hidden');
    }
}

function editItem() {
    if (currentTarget) {
        if (currentTarget.classList.contains('text')) {
            const newText = prompt('Edit text:', currentTarget.textContent);
            if (newText !== null) currentTarget.textContent = newText;
        } else {
            alert('Edit: ' + currentTarget.textContent);
        }
        document.getElementById('actionMenu').classList.add('hidden');
    }
}
        
    }