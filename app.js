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
