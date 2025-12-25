const alphabet = [
    { L: 'A', S: 'ა', E: 'Avion' }, { L: 'B', S: 'ბე', E: 'Ballon' },
    { L: 'C', S: 'სე', E: 'Chat' }, { L: 'D', S: 'დე', E: 'Dauphin' },
    { L: 'E', S: 'ე', E: 'École' }, { L: 'F', S: 'ეფ', E: 'Fleur' }
    // აქ შეგიძლია დაამატო სხვა ასოებიც...
];

let score = 0;
let currentQ = 0;

function speak(text) {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'fr-FR';
    window.speechSynthesis.speak(msg);
}

function openLesson(id) {
    document.getElementById('lesson-page').style.display = 'flex';
    let html = '<div class="alphabet-grid">';
    alphabet.forEach(item => {
        html += `
            <div class="char-card" onclick="speak('${item.L}')">
                <h2 style="margin:0; font-size:40px;">${item.L}</h2>
                <p style="color:gray;">[${item.S}]</p>
                <small>${item.E}</small>
            </div>`;
    });
    html += `</div><button class="quiz-btn" onclick="startQuiz()">ტესტის დაწყება</button>`;
    document.getElementById('lesson-content').innerHTML = html;
}

function closeLesson() {
    document.getElementById('lesson-page').style.display = 'none';
}

function startQuiz() {
    score = 0;
    currentQ = 0;
    nextQuestion();
}

function nextQuestion() {
    if(currentQ >= 10) {
        document.getElementById('lesson-content').innerHTML = `
            <div style="text-align:center; padding:50px;">
                <h2>ტესტი დასრულდა!</h2>
                <p style="font-size:24px;">ქულა: ${score}/10</p>
                <button class="quiz-btn" onclick="closeLesson()">მთავარზე დაბრუნება</button>
            </div>`;
        return;
    }

    const correct = alphabet[Math.floor(Math.random() * alphabet.length)];
    let options = [correct.L];
    while(options.length < 3) {
        let r = alphabet[Math.floor(Math.random() * alphabet.length)].L;
        if(!options.includes(r)) options.push(r);
    }
    options.sort(() => Math.random() - 0.5);

    document.getElementById('lesson-content').innerHTML = `
        <div style="text-align:center; padding:20px;">
            <p>კითხვა ${currentQ + 1}/10</p>
            <h3>მოისმინე და აირჩიე სწორი:</h3>
            <button onclick="speak('${correct.L}')" style="font-size:50px; background:none; border:none; cursor:pointer;">🔊</button>
            <div style="margin-top:30px;">
                ${options.map(o => `<button class="option-btn" onclick="check('${o}','${correct.L}')">${o}</button>`).join('')}
            </div>
        </div>`;
}

function check(sel, cor) {
    if(sel === cor) score++;
    currentQ++;
    nextQuestion();
}
