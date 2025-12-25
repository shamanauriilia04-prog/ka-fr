function initLesson(lessonId, library) {
    let learned = JSON.parse(localStorage.getItem(lessonId + "_list") || "[]");
    
    function updateUI() {
        const grid = document.getElementById('grid');
        grid.innerHTML = library.map((item, i) => `
            <div class="verb-card ${learned.includes(item.fr) ? 'learned' : ''}">
                <strong>${item.fr}</strong><br><small>${item.ka}</small>
                <div style="margin-top:10px;">
                    <button class="tool-btn" onclick="play('${item.fr}', '${lessonId}')">🔊</button>
                    <button class="tool-btn mic-btn" id="mic-${i}" onclick="record('${item.fr}', ${i}, '${lessonId}')">🎤</button>
                </div>
            </div>`).join('');
        
        const p = Math.round((learned.length / library.length) * 100);
        localStorage.setItem(lessonId + "_percent", p);
        if(document.getElementById('progress-fill')) document.getElementById('progress-fill').style.width = p + "%";
        if(p >= 100) document.getElementById('test-btn').style.display = 'block';
    }

    window.play = (txt, id) => {
        const u = new SpeechSynthesisUtterance(txt);
        u.lang = 'fr-FR';
        window.speechSynthesis.speak(u);
        if(!learned.includes(txt)) {
            learned.push(txt);
            localStorage.setItem(id + "_list", JSON.stringify(learned));
            updateUI();
        }
    };

    window.record = (target, idx, id) => {
        const rec = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        rec.lang = 'fr-FR';
        document.getElementById('mic-'+idx).classList.add('active');
        rec.start();
        rec.onresult = (e) => {
            if(e.results[0][0].transcript.toLowerCase().includes(target.toLowerCase().replace('?', ''))) {
                alert("ბრავო! ✅"); play(target, id);
            } else alert("სცადე თავიდან ❌");
            document.getElementById('mic-'+idx).classList.remove('active');
        };
        rec.onerror = () => document.getElementById('mic-'+idx).classList.remove('active');
    };
    updateUI();
}
