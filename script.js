const countDisplay = document.getElementById('count');
const subtractBtn = document.getElementById('subtract');
const addBtn = document.getElementById('add');
const undoBtn = document.getElementById('undo');
const redoBtn = document.getElementById('redo');
const progressBar = document.getElementById('progress');

let count = 0;
let history = [0];
let historyIndex = 0;

function updateDisplay() {
    countDisplay.textContent = count;
    progressBar.style.width = `${(count / 150) * 100}%`;
    undoBtn.disabled = historyIndex === 0;
    redoBtn.disabled = historyIndex === history.length - 1;
    
    // Add animation to count display
    countDisplay.style.transform = 'scale(1.1)';
    setTimeout(() => {
        countDisplay.style.transform = 'scale(1)';
    }, 150);
}

function updateCount(newCount) {
    count = Math.max(0, Math.min(150, newCount));
    history = history.slice(0, historyIndex + 1);
    history.push(count);
    historyIndex = history.length - 1;
    updateDisplay();
}

subtractBtn.addEventListener('click', () => updateCount(count - 1));
addBtn.addEventListener('click', () => updateCount(count + 1));

undoBtn.addEventListener('click', () => {
    if (historyIndex > 0) {
        historyIndex--;
        count = history[historyIndex];
        updateDisplay();
    }
});

redoBtn.addEventListener('click', () => {
    if (historyIndex < history.length - 1) {
        historyIndex++;
        count = history[historyIndex];
        updateDisplay();
    }
});

updateDisplay();