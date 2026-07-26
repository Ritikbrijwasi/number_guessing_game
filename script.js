const Game = (() => {
    // --- DOM refs ---
    const guessInput   = document.getElementById('guessInput');
    const guessBtn     = document.getElementById('guessBtn');
    const resetBtn     = document.getElementById('resetBtn');
    const messageEl    = document.getElementById('message');
    const attemptCount = document.getElementById('attemptCount');
    const rangeDisplay = document.getElementById('rangeDisplay');
    const historyList  = document.getElementById('historyList');

    // --- State ---
    let secretNumber   = 0;
    let attempts       = 0;
    let isGameOver     = false;
    let low            = 1;
    let high           = 100;

    // --- Helpers ---
    function showMessage(text, type = 'info') {
        messageEl.textContent = text;
        messageEl.className = `message ${type}`;
        messageEl.classList.remove('hidden');
    }

    function hideMessage() {
        messageEl.classList.add('hidden');
    }

    function updateStats() {
        attemptCount.textContent = attempts;
        rangeDisplay.textContent = `${low} – ${high}`;
    }

    function addHistoryItem(guess, result) {
        const li = document.createElement('li');
        li.textContent = guess;
        li.className = result;
        historyList.appendChild(li);
        historyList.scrollTop = historyList.scrollHeight;
    }

    function clearHistory() {
        historyList.innerHTML = '';
    }

    function setControlsEnabled(enabled) {
        guessInput.disabled = !enabled;
        guessBtn.disabled   = !enabled;
        if (enabled) {
            guessInput.focus();
        }
    }

    function resetGame() {
        secretNumber = Math.floor(Math.random() * 100) + 1;
        attempts     = 0;
        isGameOver   = false;
        low          = 1;
        high         = 100;

        hideMessage();
        updateStats();
        clearHistory();
        guessInput.value = '';
        setControlsEnabled(true);
        showMessage('🔄 New game started! Guess a number between 1 and 100.', 'info');
    }

    function handleGuess() {
        // Prevent interaction after game over
        if (isGameOver) return;

        const rawValue = guessInput.value.trim();
        if (rawValue === '') {
            showMessage('⚠️ Please enter a number!', 'warning');
            return;
        }

        const guess = Number(rawValue);

        if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
            showMessage('⚠️ Please enter a valid number between 1 and 100.', 'warning');
            guessInput.value = '';
            guessInput.focus();
            return;
        }

        attempts++;
        updateStats();

        if (guess === secretNumber) {
            // --- WIN ---
            isGameOver = true;
            showMessage(
                `🎉 Congratulations! You guessed the correct number! Number was ${secretNumber} · You took ${attempts} attempt${attempts > 1 ? 's' : ''}`,
                'success'
            );
            addHistoryItem(guess, 'correct');
            setControlsEnabled(false);
        } else if (guess > secretNumber) {
            showMessage(`📈 Too High! Try a lower number.`, 'error');
            addHistoryItem(guess, 'high');
            if (guess < high) high = guess - 1;
            updateStats();
            guessInput.value = '';
            guessInput.focus();
        } else {
            // guess < secretNumber
            showMessage(`📉 Too Low! Try a higher number.`, 'info');
            addHistoryItem(guess, 'low');
            if (guess > low) low = guess + 1;
            updateStats();
            guessInput.value = '';
            guessInput.focus();
        }
    }

    // --- Event Listeners ---
    guessBtn.addEventListener('click', handleGuess);

    guessInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleGuess();
        }
    });

    resetBtn.addEventListener('click', resetGame);

    // --- Init ---
    resetGame();

    // Expose for debugging (optional)
    return { resetGame, handleGuess };
})();

