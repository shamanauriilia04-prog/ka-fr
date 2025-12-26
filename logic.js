function checkAnswer() {
    // ვაშორებთ ზედმეტ სიმბოლოებს და ვათანაბრებთ აპოსტროფებს
    const user = selectedWords.join(' ').toLowerCase().replace(/[‘’]/g, "'").trim();
    const target = database[currentIdx].fr.toLowerCase().replace(/[‘’]/g, "'").trim();
    
    if(user === target) {
        // ... სწორი პასუხის ლოგიკა ...
    }
}
