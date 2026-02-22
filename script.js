// script.js - Logic to inject data and handle interactions

document.addEventListener('DOMContentLoaded', () => {

    // 1. Inject Data from data.js
    if (typeof portfolioData !== 'undefined') {
        loadData(portfolioData);
    } else {
        console.error("portfolioData not found. Please ensure data.js is loaded.");
    }

    // 2. Initialize UI Interactions
    initNavbarScrolled();
    initMobileMenu();
    initScrollAnimations();

    // 3. Initialize Advanced Animations
    initNetworkCanvas();
    if (typeof portfolioData !== 'undefined') {
        initTypewriterEffect(portfolioData.personal.role);
    }
});

/**
 * Parses portfolioData and injects it into the DOM
 */
function loadData(data) {
    // --- Navigation & Hero ---
    document.title = `${data.personal.name} | ${data.personal.role}`;
    document.getElementById('nav-name').textContent = data.personal.name.split(' ')[0]; // First name for logo
    document.getElementById('nav-resume').href = data.personal.resumeLink;

    document.getElementById('hero-name').textContent = data.personal.name;
    document.getElementById('hero-role').textContent = data.personal.role;
    document.getElementById('hero-tagline').textContent = data.personal.tagline;

    // --- About Section ---
    const aboutContainer = document.getElementById('about-text-container');
    data.about.paragraphs.forEach(pText => {
        const p = document.createElement('p');
        p.textContent = pText;
        aboutContainer.appendChild(p);
    });

    const skillsContainer = document.getElementById('about-skills');
    data.about.skills.forEach(skill => {
        const span = document.createElement('span');
        span.className = 'skill-tag';
        span.textContent = skill;
        skillsContainer.appendChild(span);
    });

    // --- Projects Section ---
    const projectsGrid = document.getElementById('projects-grid');
    data.projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';

        // Format tools
        const toolsHtml = project.tools.map(tool => `<span>${tool}</span>`).join('');

        // Format links
        let linksHtml = '';
        if (project.repoLink) {
            linksHtml += `<a href="${project.repoLink}" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                Code
            </a>`;
        }
        if (project.liveLink) {
            linksHtml += `<a href="${project.liveLink}" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                Live
            </a>`;
        }

        card.innerHTML = `
            <div class="project-image" style="background-image: url('${project.imagePlaceholder}')"></div>
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <div class="project-tools">${toolsHtml}</div>
                <p class="project-problem"><strong>Goal:</strong> ${project.problem}</p>
                <p class="project-insights"><strong>Insights:</strong> ${project.insights}</p>
                <div class="project-links">
                    ${linksHtml}
                </div>
            </div>
        `;
        projectsGrid.appendChild(card);
    });

    // --- Contact Section ---
    document.getElementById('contact-email').href = `mailto:${data.personal.email}`;
    document.getElementById('social-linkedin').href = data.socialLinks.linkedin;
    document.getElementById('social-github').href = data.socialLinks.github;
    document.getElementById('footer-name').textContent = data.personal.name;
}

/**
 * Handle navbar styling on scroll
 */
function initNavbarScrolled() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
            navbar.style.background = 'rgba(15, 16, 20, 0.9)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(15, 16, 20, 0.75)';
        }
    });
}

/**
 * Handle mobile menu toggle
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Simple animation for hamburger
        hamburger.classList.toggle('toggle');
    });

    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });
}

/**
 * Advanced scroll animations using Intersection Observer
 */
function initScrollAnimations() {
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
}

/**
 * Typewriter effect for the hero role
 */
function initTypewriterEffect(text) {
    const roleElement = document.getElementById('hero-role');
    if (!roleElement) return;
    roleElement.innerHTML = ''; // clear initial text

    let i = 0;
    const speed = 75; // ms per char

    // Add blinking cursor
    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';

    function typeWriter() {
        if (i < text.length) {
            roleElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            roleElement.appendChild(cursor);
        }
    }

    setTimeout(typeWriter, 800); // Wait 0.8s before starting
}

/**
 * Lightweight, subtle interactive data network background
 */
function initNetworkCanvas() {
    const canvas = document.getElementById('network-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height, particles;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.radius = Math.random() * 1.5 + 0.5;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(56, 189, 248, 0.4)'; // Cyan hue
            ctx.fill();
        }
    }

    // Density calculation for responsiveness
    function initParticles() {
        const particleCount = Math.min(Math.floor(window.innerWidth / 15), 100);
        particles = Array.from({ length: particleCount }, () => new Particle());
    }
    initParticles();

    let mouse = { x: null, y: null, radius: 150 };
    window.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(56, 189, 248, ${0.12 - dist / 1000})`; // Faint connections
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }

            // Mouse interaction
            if (mouse.x != null && mouse.y != null) {
                const dx = particles[i].x - mouse.x;
                const dy = particles[i].y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(56, 189, 248, ${0.3 - dist / 500})`; // Stronger line to cursor
                    ctx.lineWidth = 0.8;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}
