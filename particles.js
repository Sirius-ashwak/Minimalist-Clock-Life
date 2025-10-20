// Particle System
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.maxParticles = 30;
        this.animationId = null;
        this.isRunning = false;
        this.isPaused = false;
        this.resize();
        this.init();
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        this.particles = []; // Clear existing particles
        for (let i = 0; i < this.maxParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    update() {
        this.particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            
            if (p.x < 0) p.x = this.canvas.width;
            if (p.x > this.canvas.width) p.x = 0;
            if (p.y < 0) p.y = this.canvas.height;
            if (p.y > this.canvas.height) p.y = 0;
        });
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(p => {
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
            this.ctx.fill();
        });
    }
    
    animate() {
        if (!this.isRunning || this.isPaused) return;
        
        this.update();
        this.draw();
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.isPaused = false;
        this.animate();
    }
    
    pause() {
        this.isPaused = true;
    }
    
    resume() {
        if (!this.isRunning) return;
        
        this.isPaused = false;
        this.animate();
    }
    
    stop() {
        this.isRunning = false;
        this.isPaused = false;
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        
        // Clear canvas
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
    
    destroy() {
        this.stop();
        this.particles = [];
        window.removeEventListener('resize', () => this.resize());
    }
}

let particleSystem;

function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    // Stop existing system if any
    if (particleSystem) {
        particleSystem.destroy();
    }
    
    particleSystem = new ParticleSystem(canvas);
    particleSystem.start();
}

function stopParticles() {
    if (particleSystem) {
        particleSystem.destroy();
        particleSystem = null;
    }
}

function pauseParticles() {
    if (particleSystem) {
        particleSystem.pause();
    }
}

function resumeParticles() {
    if (particleSystem) {
        particleSystem.resume();
    }
}

// Make functions globally accessible
window.pauseParticles = pauseParticles;
window.resumeParticles = resumeParticles;
