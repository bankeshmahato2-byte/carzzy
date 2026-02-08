const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

// Handle Canvas Sizing
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedY = Math.random() * -0.5;
        this.opacity = Math.random() * 0.5;
    }
    update() {
        this.y += this.speedY;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < 100; i++) particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}
init(); animate();

// Gallery Data
const journey = [
    { img: 'images/photo1.jpg', date: 'August 2022', desc: 'The first day.' },
    { img: 'images/photo2.jpg', date: 'December 2023', desc: 'A winter to remember.' }
];

let currentIndex = 0;
const nextBtn = document.getElementById('nextBtn');
const card = document.getElementById('storyCard');

nextBtn.addEventListener('click', () => {
    // Cinematic transition trigger
    card.classList.add('fade-out');
    
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % journey.length;
        document.getElementById('galleryImg').src = journey[currentIndex].img;
        document.getElementById('dateText').innerText = journey[currentIndex].date;
        document.getElementById('descriptionText').innerText = journey[currentIndex].desc;
        
        card.classList.remove('fade-out');
    }, 800);
});