document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for fade-in animations on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply observer to sections
    const hiddenElements = document.querySelectorAll('.gallery-item, .message-card');
    hiddenElements.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 1s ease-out';
        observer.observe(el);
    });

    // Dynamic Title Greeting based on time
    const hour = new Date().getHours();
    const titleElement = document.querySelector('.title');
    let greeting = "Hai, Sayang";

    if (hour < 12) {
        greeting = "Selamat Pagi, Sayang";
    } else if (hour < 18) {
        greeting = "Selamat Siang, Sayang";
    } else {
        greeting = "Selamat Malam, Sayang";
    }

    // Optional: Uncomment to use dynamic greeting
    // titleElement.textContent = greeting;

    // Typing Animation
    const text = "Aku cuma mau bilang terima kasih. Terima kasih sudah jadi alasan aku tersenyum setiap hari. Kamu adalah hal terindah yang pernah hadir di hidupku. Semoga website sederhana ini bisa mewakili sedikit dari banyaknya rasa sayangku ke kamu.";
    const typingElement = document.getElementById('typing-text');
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            typingElement.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeWriter, 50);
        }
    }

    // Start typing when message section is in view
    const messageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter();
                messageObserver.unobserve(entry.target);
            }
        });
    });

    if (typingElement) {
        messageObserver.observe(document.querySelector('.message-card'));
    }

    // Adding some stars dynamically
    const starsContainer = document.querySelector('.stars');
    if (starsContainer) {
        for (let i = 0; i < 20; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 5;

            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            star.style.setProperty('--duration', `${duration}s`);
            star.style.animationDelay = `${delay}s`;
            star.style.opacity = Math.random();
            star.style.width = Math.random() > 0.5 ? '2px' : '3px';
            star.style.height = star.style.width;

            starsContainer.appendChild(star);
        }
    }
});
