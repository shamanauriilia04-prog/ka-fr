function openLesson(lessonId) {
    alert(lessonId + " გაკვეთილი მალე დაემატება!");
    // აქ მოხდება გაკვეთილის შინაარსის ჩატვირთვა
}

// Service Worker-ის რეგისტრაცია (ოფლაინ მუშაობისთვის)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW error:', err));
    });
}
const alphabetData = [
    { letter: "A", sound: "ა", example: "Avion (თვითმფრინავი)" },
    { letter: "B", sound: "ბე", example: "Ballon (ბურთი)" },
    { letter: "C", sound: "სე", example: "Chat (კატა)" },
    // ... აქ დაემატება ყველა ასო
];

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR'; // ფრანგული აქცენტი
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
}

function openLesson(id) {
    document.getElementById('lesson-overlay').style.display = 'flex';
    if(id === 'alphabet') loadAlphabetLesson();
}

function closeLesson() {
    document.getElementById('lesson-overlay').style.display = 'none';
}

function loadAlphabetLesson() {
    let html = `<h3>მოუსმინე და გაიმეორე:</h3><div class="alphabet-grid">`;
    alphabetData.forEach(item => {
        html += `
            <div class="char-card" onclick="speak('${item.letter}')">
                <h2>${item.letter}</h2>
                <p>[${item.sound}]</p>
                <small>${item.example}</small>
            </div>
        `;
    });
    html += `</div><button onclick="startQuiz()" class="lesson-card" style="margin-top:30px; width:100%; justify-content:center; background:var(--primary); color:white;">ტესტის დაწყება (10 კითხვა)</button>`;
    document.getElementById('lesson-content').innerHTML = html;
}

// ტესტის ლოგიკა
let currentQuestion = 0;
let score = 0;

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    nextQuestion();
}

function nextQuestion() {
    if (currentQuestion >= 10) {
        alert(`ტესტი დასრულდა! შენი ქულაა: ${score}/10`);
        closeLesson();
        return;
    }

    const correct = alphabetData[Math.floor(Math.random() * alphabetData.length)];
    const options = [correct.letter];
    while(options.length < 3) {
        let randomLetter = alphabetData[Math.floor(Math.random() * alphabetData.length)].letter;
        if(!options.includes(randomLetter)) options.push(randomLetter);
    }
    options.sort(() => Math.random() - 0.5);

    let html = `
        <div class="quiz-container">
            <p>კითხვა ${currentQuestion + 1}/10</p>
            <h2>მოისმინე ასო:</h2>
            <button onclick="speak('${correct.letter}')" style="font-size:50px; border:none; background:none;">🔊</button>
            <div style="margin-top:20px">
                ${options.map(opt => `<button class="quiz-option" onclick="checkAnswer('${opt}', '${correct.letter}')">${opt}</button>`).join('')}
            </div>
        </div>
    `;
    document.getElementById('lesson-content').innerHTML = html;
}

function checkAnswer(selected, correct) {
    if(selected === correct) score++;
    currentQuestion++;
    nextQuestion();
}
