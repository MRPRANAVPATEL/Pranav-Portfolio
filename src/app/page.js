'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Load Font Awesome
    const faLink = document.createElement('link');
    faLink.rel = 'stylesheet';
    faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
    document.head.appendChild(faLink);

    // Topography Canvas Animation
    const canvas = document.getElementById('topoCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height, lines = [];
    const lineCount = 12;
    let running = true;
    let animFrameId;

    const handleVisibilityChange = () => {
      running = !document.hidden;
      if (running) animFrameId = requestAnimationFrame(animate);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    class TopoLine {
      constructor(verticalOffset) {
        this.verticalOffset = verticalOffset;
        this.seed = Math.random() * 100;
      }

      draw(time) {
        ctx.beginPath();
        ctx.moveTo(-50, height / 2 + this.verticalOffset);

        for (let x = 0; x <= width + 100; x += 45) {
          const y =
            (height / 2 + this.verticalOffset) +
            Math.sin(x * 0.002 + time * 0.0005 + this.seed) * 58 +
            Math.cos(x * 0.0012 + time * 0.0004) * 28;
          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = 'rgba(0, 0, 0, 0.045)';
        ctx.lineWidth = 1.3;
        ctx.stroke();
      }
    }

    function initCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      lines = [];
      for (let i = -lineCount; i <= lineCount; i++) {
        lines.push(new TopoLine(i * 38));
      }
    }

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        initCanvas();
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    function animate(time) {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      lines.forEach(line => line.draw(time));
      animFrameId = requestAnimationFrame(animate);
    }

    initCanvas();
    animFrameId = requestAnimationFrame(animate);

    return () => {
      running = false;
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <>
      {/* BACKGROUND LAYERS */}
      <canvas id="topoCanvas"></canvas>
      <div className="noise-overlay"></div>

      {/* MAIN CONTENT */}
      <div className="main-content">
        <div className="container">

          {/* Hero Section */}
          <section style={{ paddingTop: '64px', borderBottom: 'none' }}>
            <div>
              <h1>Pranav Patel</h1>
              <p style={{ fontSize: '1.5rem', fontWeight: 500, color: '#3d3d4e', marginBottom: '12px' }}>
                FULL Stack Developer &amp; Web Designer
              </p>
              <p style={{ fontSize: '1.2rem', color: '#5a5a6e', maxWidth: '620px' }}>
                crafting exceptional digital experiences.
              </p>
              <div className="hero-buttons">
                <a href="#projects" className="btn btn-primary">
                  <i className="fas fa-arrow-down"></i> View Projects
                </a>
                <a href="#contact" className="btn btn-outline">
                  <i className="fas fa-envelope"></i> Contact Me
                </a>
              </div>
            </div>
          </section>

          {/* About Me Section */}
          <section id="about">
            <div className="grid-2">
              <div>
                <h2>About Me</h2>
                <p style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '20px' }}>
                  I&apos;m a passionate MERN stack developer focused on building modern, scalable web applications from start to finish.
                </p>
                <p style={{ marginBottom: '16px', color: '#2f2f3a' }}>
                  Hello! I&apos;m Pranav Patel, a passionate MERN stack Developer passionate in web building, designing,
                  creating products from start to finish. My journey is not development began with a curiosity about how
                  things work on the internet, which quickly turned into a dedicated career path.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  I specialize in building full-stack professional web applications. Currently, I am working as a
                  Fullstack Developer and Frontend Developer. I have experience in modern CMS platforms like WordPress
                  and Shopify, allowing me to deliver versatile solutions tailored to specific business needs.
                </p>
                <p>
                  When I&apos;m not at my computer, you can find me exploring new technologies, contributing to
                  open-source, or reading about the latest trends in UX/UI design.
                </p>
                <div className="about-highlights">
                  <div className="highlight-item">
                    <i className="fas fa-rocket icon-accent"></i> Product Starter
                  </div>
                  <div className="highlight-item">
                    <i className="fas fa-code icon-accent"></i> Client Code
                  </div>
                  <div className="highlight-item">
                    <i className="fas fa-layer-group icon-accent"></i> Post-Frontend
                  </div>
                </div>
              </div>

              <div className="about-img-wrapper">
                <img src="/image.png" alt="Pranav Patel" className="about-img" />
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="services">
            <h2>Services</h2>
            <div className="grid-4">
              <div className="card">
                <i className="fas fa-globe" style={{ fontSize: '2rem', color: '#e07c3c', marginBottom: '18px' }}></i>
                <h3>Web Development</h3>
                <p>Building fast, interactive, and scalable web applications using the MERN stack. React, Next.js, Node.js, and modern frameworks.</p>
              </div>
              <div className="card">
                <i className="fas fa-pen-fancy" style={{ fontSize: '2rem', color: '#e07c3c', marginBottom: '18px' }}></i>
                <h3>UI/UX Design</h3>
                <p>Creating beautiful, intuitive, and pixel-perfect interfaces that provide exceptional user experiences and elevate brands.</p>
              </div>
              <div className="card">
                <i className="fab fa-wordpress" style={{ fontSize: '2rem', color: '#e07c3c', marginBottom: '18px' }}></i>
                <h3>WordPress Development</h3>
                <p>Delivering custom themes, plugins, and fully functional websites using WordPress and Elementor, tailored to business goals.</p>
              </div>
              <div className="card">
                <i className="fas fa-shopping-cart" style={{ fontSize: '2rem', color: '#e07c3c', marginBottom: '18px' }}></i>
                <h3>E-commerce Solutions</h3>
                <p>Solving all your e-commerce needs, offering high-converting online stores using Shopify and WooCommerce.</p>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills">
            <h2>Skills</h2>
            <div style={{ marginBottom: '32px' }}>
              <p style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '8px' }}>Technical Arsenal</p>
              <p style={{ color: '#5a5a6e' }}>
                I&apos;ve built strong skills across the full stack, with a core focus on the MERN stack.<br />
                I&apos;m also comfortable working with modern CMS platforms and design tools.
              </p>
            </div>
            <div className="grid-3">
              <div className="skill-category">
                <h4><i className="fas fa-code icon-accent"></i> Frontend Development</h4>
                <div className="skill-list">
                  <span className="badge skill-tag">HTML</span>
                  <span className="badge skill-tag">CSS</span>
                  <span className="badge skill-tag">JavaScript</span>
                  <span className="badge skill-tag">React.js</span>
                  <span className="badge skill-tag">Next.js</span>
                  <span className="badge skill-tag">Tailwind CSS</span>
                </div>
              </div>
              <div className="skill-category">
                <h4><i className="fas fa-server icon-accent"></i> Backend Development &amp; DataBase</h4>
                <div className="skill-list">
                  <span className="badge skill-tag">Node.js</span>
                  <span className="badge skill-tag">Express.js</span>
                  <span className="badge skill-tag">MySQL</span>
                  <span className="badge skill-tag">MongoDB</span>
                </div>
              </div>
              <div className="skill-category">
                <h4><i className="fas fa-cart-shopping icon-accent"></i> CMS &amp; E-commerce</h4>
                <div className="skill-list">
                  <span className="badge skill-tag">WordPress</span>
                  <span className="badge skill-tag">WooCommerce</span>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Projects Section */}
          <section id="projects">
            <h2>Featured Projects</h2>
            <div className="grid-3">
              <div className="card">
                <i className="fas fa-store" style={{ fontSize: '1.8rem', color: '#e07c3c', marginBottom: '12px' }}></i>
                <h3>E-Commerce Platform</h3>
                <p>Customized React e-commerce template with product listing, add-to-cart, checkout, and simple user authentication.</p>
                <div className="project-tech">
                  <span>React</span><span>JavaScript</span><span>CSS</span>
                </div>
              </div>
              <div className="card">
                <i className="fas fa-tasks" style={{ fontSize: '1.8rem', color: '#e07c3c', marginBottom: '12px' }}></i>
                <h3>JobSphere (Job Portal)</h3>
                <p>Built a full-stack job portal with a Node/Express REST API and a React frontend. Implemented auth, CRUD, and job filtering.</p>
                <div className="project-tech">
                  <span>React</span><span>Node.js</span><span>Express.js</span><span>MySQL</span>
                </div>
              </div>
              <div className="card">
                <i className="fab fa-wordpress" style={{ fontSize: '1.8rem', color: '#e07c3c', marginBottom: '12px' }}></i>
                <h3>CSS Style Generator</h3>
                <p>An interactive tool to customize CSS properties with a live preview and auto-generated code for easy use.</p>
                <div className="project-tech">
                  <span>HTML</span><span>JavaScript</span><span>CSS</span>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact">
            <h2>Get In Touch</h2>
            <div className="grid-2" style={{ gap: '48px' }}>
              <div>
                <p style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '12px' }}>
                  Let&apos;s talk about your project!
                </p>
                <p style={{ marginBottom: '28px', color: '#4a4a5a' }}>
                  I build fast, scalable web apps that solve real business problems.
                </p>
                <div className="contact-info-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                    <i className="fas fa-envelope fa-lg" style={{ color: '#e07c3c', width: '32px' }}></i>
                    <span>pranav52.patel@gmail.com</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <i className="fas fa-map-marker-alt fa-lg" style={{ color: '#e07c3c', width: '32px' }}></i>
                    <span>Ahmedabad Gujarat, India</span>
                  </div>
                </div>
              </div>
              <div>
                <form
                  className="contact-form"
                  onSubmit={async (e) => {
                    e.preventDefault();

                    const form = e.target;

                    const formData = {
                      name: form.name.value,
                      email: form.email.value,
                      message: form.message.value,
                    };

                    // remove old message if exists
                    const oldMsg = form.querySelector(".form-status");
                    if (oldMsg) oldMsg.remove();

                    try {
                      const res = await fetch("/api/contact", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(formData),
                      });

                      const data = await res.json();

                      const msgDiv = document.createElement("div");
                      msgDiv.className = `form-status ${data.success ? "success" : "error"}`;
                      msgDiv.innerText = data.success
                        ? "Message sent successfully 🚀"
                        : data.error || "Something went wrong 😅";

                      form.prepend(msgDiv);

                      if (data.success) {
                        form.reset();
                      }

                      // auto remove after 3 sec
                      setTimeout(() => {
                        msgDiv.remove();
                      }, 3000);

                    } catch (err) {
                      console.error(err);

                      // show server error msg
                      const msgDiv = document.createElement("div");
                      msgDiv.className = "form-status error";
                      msgDiv.innerText = "Server error 😵";

                      form.prepend(msgDiv);

                      setTimeout(() => {
                        msgDiv.remove();
                      }, 3000);
                    }
                  }}
                >
                  <input type="text" name="name" placeholder="Your Name" required />

                  <input type="email" name="email" placeholder="Email address" required />

                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell me about your project or idea..."
                    required
                  ></textarea>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    <i className="fas fa-paper-plane"></i> Send Message
                  </button>
                </form>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer>
            <p>© 2026 Pranav Patel. All rights reserved.</p>
            <div style={{ marginTop: '16px', display: 'flex', gap: '24px', justifyContent: 'center' }}>
              <a href="https://github.com/MRPRANAVPATEL" style={{ color: '#6c6c7e' }}>
                <i className="fab fa-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/pranavpatel001" style={{ color: '#6c6c7e' }}>
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </footer>

        </div>
      </div>
    </>
  );
}