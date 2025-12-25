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
                opacity: Math.random() * 0.5 + 0.2,
                baseOpacity: Math.random() * 0.5 + 0.2,
                pulseSpeed: Math.random() * 0.02 + 0.01
            });
        }
    }
    
    update() {
        const time = Date.now() * 0.001;
        this.particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Pulse opacity for more dynamic effect
            p.opacity = p.baseOpacity + Math.sin(time * p.pulseSpeed) * 0.2;
            p.opacity = Math.max(0.1, Math.min(0.7, p.opacity));
            
            if (p.x < 0) p.x = this.canvas.width;
            if (p.x > this.canvas.width) p.x = 0;
            if (p.y < 0) p.y = this.canvas.height;
            if (p.y > this.canvas.height) p.y = 0;
        });
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw connections between nearby particles
        this.particles.forEach((p1, i) => {
            this.particles.slice(i + 1).forEach(p2 => {
                const dx = p2.x - p1.x;
                const dy = p2.y - p1.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    const opacity = (1 - distance / 150) * 0.1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            });
        });
        
        // Draw particles with glow effect
        this.particles.forEach(p => {
            // Outer glow
            const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
            gradient.addColorStop(0, `rgba(255, 255, 255, ${p.opacity})`);
            gradient.addColorStop(0.5, `rgba(255, 255, 255, ${p.opacity * 0.5})`);
            gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
            
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
            
            // Core particle
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 1.5})`;
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
