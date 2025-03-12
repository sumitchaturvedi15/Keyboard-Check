// const insert=document.querySelector('.insert')

// window.addEventListener('keydown', (event)=>(
//     insert.innerHTML=`
//     <div class='table'>
//     <table>
//   <tr>
//     <th>Key</th>
//     <th>KeyCode</th>
//     <th>Code</th>
//   </tr>
//   <tr>
//     <td>${event.key===' '?'Space':event.key}</td>
//     <td>${event.keyCode}</td>
//     <td>${event.code}</td>
//   </tr>
// </table>
//     </div>
//     `
// ))

const insert = document.querySelector('.insert');
const keyHistory = document.querySelector('.key-history');
const toggleHistory = document.querySelector('.toggle-history');
const pressKeyText = document.querySelector('.press-key-text');
const keyboardIcon = document.querySelector('.keyboard-icon');
let history = [];
const maxHistoryItems = 10;

insert.innerHTML = `
    <div class="initial-state">
        <p>Information about pressed keys will appear here</p>
    </div>
`;

window.addEventListener('keydown', (event) => {
    event.preventDefault();
    
    pressKeyText.style.display = 'none';
    keyboardIcon.style.display = 'none';
    
    const keyInfo = {
        key: event.key === ' ' ? 'Space' : event.key,
        keyCode: event.keyCode,
        code: event.code,
        timestamp: new Date().toLocaleTimeString()
    };

    addToHistory(keyInfo);
    
    updateKeyDisplay(keyInfo);
});

function addToHistory(keyInfo) {
    history.unshift(keyInfo);
    
    if (history.length > maxHistoryItems) {
        history.pop();
    }
    
    if (keyHistory.style.display === 'block') {
        updateHistoryDisplay();
    }
}

function updateKeyDisplay(keyInfo) {
    insert.innerHTML = `
        <div class='table'>
            <table>
                <tr>
                    <th>Key</th>
                    <th>KeyCode</th>
                    <th>Code</th>
                </tr>
                <tr>
                    <td>${keyInfo.key}</td>
                    <td>${keyInfo.keyCode}</td>
                    <td>${keyInfo.code}</td>
                </tr>
            </table>
        </div>
    `;
}

function updateHistoryDisplay() {
    keyHistory.innerHTML = '';
    
    if (history.length === 0) {
        keyHistory.innerHTML = '<p>No keys pressed yet</p>';
        return;
    }
    
    history.forEach((item, index) => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <span>${item.key} (${item.code})</span>
            <span>${item.timestamp}</span>
        `;
        keyHistory.appendChild(historyItem);
    });
}

toggleHistory.addEventListener('click', () => {
    if (keyHistory.style.display === 'block') {
        keyHistory.style.display = 'none';
        toggleHistory.textContent = 'Show Key History';
    } else {
        keyHistory.style.display = 'block';
        toggleHistory.textContent = 'Hide Key History';
        updateHistoryDisplay();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'h') {
        event.preventDefault();
        toggleHistory.click();
    }
});

insert.addEventListener('click', () => {
    if (history.length > 0) {
        const keyInfo = history[0];
        const textToCopy = `Key: ${keyInfo.key}, KeyCode: ${keyInfo.keyCode}, Code: ${keyInfo.code}`;
        
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                const notification = document.createElement('div');
                notification.textContent = 'Copied to clipboard!';
                notification.style.position = 'fixed';
                notification.style.bottom = '20px';
                notification.style.left = '50%';
                notification.style.transform = 'translateX(-50%)';
                notification.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                notification.style.color = 'white';
                notification.style.padding = '10px 20px';
                notification.style.borderRadius = '5px';
                notification.style.zIndex = '1000';
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.remove();
                }, 2000);
            });
    }
});