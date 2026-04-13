import { ArrowRight, Github } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import introTrack from "../intro.mp3";

/**
 * Cybersecurity Portfolio - Linux Terminal Theme
 * Design Philosophy: Authentic Terminal UI meets Modern Web
 * - Pure black background with bright green text (classic terminal)
 * - JetBrains Mono monospace typography throughout
 * - Terminal window styling with prompts and command outputs
 * - Typewriter animations and blinking cursor effects
 * - Background video playing silently on page load
 * - Student-focused cybersecurity content
 */

const TerminalPrompt = () => (
  <span className="text-secondary">[user@portfolio ~]$ </span>
);

const BlinkingCursor = () => (
  <span className="inline-block w-2 h-6 bg-primary ml-1 animate-pulse" />
);

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [audioBlocked, setAudioBlocked] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fullText = "Future Cybersecurity Engineer";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Typewriter effect for hero heading
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) {
      return;
    }

    const startAudio = async () => {
      try {
        await audioElement.play();
        setAudioPlaying(true);
        setAudioBlocked(false);
      } catch {
        setAudioBlocked(true);
      }
    };

    startAudio();
  }, []);

  const handlePlayAudio = async () => {
    const audioElement = audioRef.current;
    if (!audioElement) {
      return;
    }

    try {
      await audioElement.play();
      setAudioPlaying(true);
      setAudioBlocked(false);
    } catch {
      setAudioBlocked(true);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-mono overflow-hidden relative">
      {/* Background audio - attempts autoplay on page load */}
      <audio
        ref={audioRef}
        autoPlay
        loop
        preload="auto"
        className="hidden"
        onPlay={() => setAudioPlaying(true)}
        onPause={() => setAudioPlaying(false)}
        onError={() => setAudioBlocked(true)}
      >
        <source src={introTrack} type="audio/mpeg" />
      </audio>

      {(audioBlocked || !audioPlaying) && (
        <button
          type="button"
          onClick={handlePlayAudio}
          className="fixed bottom-4 right-4 z-50 border border-primary/50 bg-background/90 px-4 py-2 text-xs text-primary backdrop-blur-sm hover:bg-primary/10"
        >
          play audio
        </button>
      )}

      {/* Scan lines effect */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-5">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 0, 0.03) 2px, rgba(0, 255, 0, 0.03) 4px)'
        }} />
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b border-primary/30 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-sm"
            : "bg-background/80"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-primary font-bold">abdallah</span>
            <span className="text-muted">@</span>
            <span className="text-secondary">cybersec</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a
              href="#about"
              className="text-muted hover:text-primary transition-colors"
            >
              about
            </a>
            <a
              href="#interests"
              className="text-muted hover:text-primary transition-colors"
            >
              interests
            </a>
            <a
              href="#learning"
              className="text-muted hover:text-primary transition-colors"
            >
              learning
            </a>
            <a
              href="#projects"
              className="text-muted hover:text-primary transition-colors"
            >
              projects
            </a>
            <a
              href="#contact"
              className="text-muted hover:text-primary transition-colors"
            >
              contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 px-4 z-10">
        <div className="max-w-4xl mx-auto w-full">
          {/* Terminal window header */}
          <div className="border border-primary/50 rounded-none mb-0">
            <div className="bg-primary/10 px-4 py-2 border-b border-primary/50 flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <div className="w-3 h-3 rounded-full bg-secondary" />
              <span className="text-primary ml-4">abdallah@portfolio:~</span>
            </div>

            {/* Terminal content */}
            <div className="p-8 space-y-6 bg-background border-t border-primary/30">
              {/* Welcome message */}
              <div className="space-y-2 text-sm">
                <div className="text-muted">
                  <span className="text-primary">$</span> whoami
                </div>
                <div className="text-primary pl-4">
                  Abdallah Bouali - CPGE Student from Morocco
                </div>
              </div>

              {/* Main heading with typewriter effect */}
              <div className="space-y-4 pt-4">
                <div className="text-muted text-sm">
                  <span className="text-primary">$</span> cat aspirations.txt
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-primary pl-4 leading-tight">
                  {typedText}
                  <BlinkingCursor />
                </h1>
              </div>

              {/* Description */}
              <div className="space-y-2 text-sm">
                <div className="text-muted">
                  <span className="text-primary">$</span> echo $PASSION
                </div>
                <div className="text-primary/80 pl-4 leading-relaxed">
                  I'm a passionate student exploring the fascinating world of cybersecurity and AI.
                  I love solving problems, learning new technologies, and understanding how systems work.
                  My goal is to become a skilled cybersecurity engineer who can protect digital infrastructure
                  and contribute to a safer digital world.
                </div>
              </div>

              {/* Interests */}
              <div className="space-y-2 text-sm pt-4 border-t border-primary/30">
                <div className="text-muted">
                  <span className="text-primary">$</span> cat interests.txt
                </div>
                <div className="pl-4 space-y-1 text-primary/80 text-xs">
                  <div>&gt; Cybersecurity (Primary Focus)</div>
                  <div>&gt; Artificial Intelligence & Machine Learning</div>
                  <div>&gt; Network Security & System Administration</div>
                  <div>&gt; Programming & Software Development</div>
                  <div>&gt; Cryptography & Encryption</div>
                  <div>&gt; Learning & Problem Solving</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/80 border-0 rounded-none text-sm h-10 px-4"
                >
                  see my projects <ArrowRight className="w-4 h-4 ml-2" />
                </a>
                <a
                  href="https://github.com/imbouali"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center border border-primary text-primary hover:bg-primary/10 rounded-none text-sm h-10 px-4"
                >
                  github
                </a>
              </div>

              {/* Social Links - Cool vibe */}
              <div className="flex gap-4 pt-6 border-t border-primary/30">
                <a
                  href="https://github.com/imbouali"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-primary/50 hover:border-primary hover:bg-primary/10 transition-all"
                  title="GitHub"
                >
                  <Github className="w-4 h-4 text-primary" />
                </a>
                <a
                  href="https://twitter.com/AbdallahBouali6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-primary/50 hover:border-primary hover:bg-primary/10 transition-all"
                  title="Twitter/X"
                >
                  <span className="text-primary text-xs font-bold">𝕏</span>
                </a>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 lg:py-32 px-4 z-10">
        <div className="max-w-6xl mx-auto">
          {/* Terminal window */}
          <div className="border border-primary/50">
            <div className="bg-primary/10 px-4 py-2 border-b border-primary/50 flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <div className="w-3 h-3 rounded-full bg-secondary" />
              <span className="text-primary ml-4">abdallah@portfolio:~/about</span>
            </div>

            <div className="p-8 bg-background space-y-6">
              <div className="space-y-2 text-sm">
                <div className="text-muted">
                  <span className="text-primary">$</span> cat bio.txt
                </div>
              </div>

              <div className="text-primary/80 text-sm leading-relaxed space-y-4">
                <p>
                  I'm a student in preparatory classes (CPGE) from Morocco with a strong passion for technology.
                  I'm fascinated by how systems work, how they can be secured, and how technology can solve real-world problems.
                </p>
                <p>
                  My primary focus is cybersecurity—I want to understand vulnerabilities, learn defensive strategies,
                  and eventually build secure systems that protect people and organizations. I'm also deeply interested
                  in AI and how machine learning can be applied to security challenges.
                </p>
                <p>
                  I believe in continuous learning and hands-on practice. Through projects, coding, and exploring
                  new technologies, I'm building the foundation to become a skilled cybersecurity engineer.
                </p>
              </div>

              <div className="text-muted text-sm pt-4 border-t border-primary/30">
                <span className="text-primary">$</span> echo "Learning, building, and growing every day"
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interests & Specializations */}
      <section id="interests" className="relative py-20 lg:py-32 px-4 z-10">
        <div className="max-w-6xl mx-auto">
          {/* Terminal window */}
          <div className="border border-primary/50">
            <div className="bg-primary/10 px-4 py-2 border-b border-primary/50 flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <div className="w-3 h-3 rounded-full bg-secondary" />
              <span className="text-primary ml-4">abdallah@portfolio:~/interests</span>
            </div>

            <div className="p-8 bg-background space-y-6">
              <div className="space-y-2 text-sm">
                <div className="text-muted">
                  <span className="text-primary">$</span> ls -la my_interests/
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Interest 1 */}
                <div className="border border-primary/30 p-4">
                  <div className="text-primary text-sm font-bold mb-2">
                    &gt; Cybersecurity
                  </div>
                  <div className="text-primary/70 text-xs leading-relaxed">
                    Understanding threats, vulnerabilities, and defense mechanisms. Building secure systems and protecting digital assets.
                  </div>
                </div>

                {/* Interest 2 */}
                <div className="border border-primary/30 p-4">
                  <div className="text-primary text-sm font-bold mb-2">
                    &gt; Artificial Intelligence
                  </div>
                  <div className="text-primary/70 text-xs leading-relaxed">
                    Exploring machine learning, neural networks, and how AI can solve complex problems including security challenges.
                  </div>
                </div>

                {/* Interest 3 */}
                <div className="border border-primary/30 p-4">
                  <div className="text-primary text-sm font-bold mb-2">
                    &gt; Programming
                  </div>
                  <div className="text-primary/70 text-xs leading-relaxed">
                    Writing clean code in Python, C++, JavaScript. Building tools and applications to solve real problems.
                  </div>
                </div>

                {/* Interest 4 */}
                <div className="border border-primary/30 p-4">
                  <div className="text-primary text-sm font-bold mb-2">
                    &gt; Networking
                  </div>
                  <div className="text-primary/70 text-xs leading-relaxed">
                    Understanding TCP/IP, protocols, network architecture, and how to secure network infrastructure.
                  </div>
                </div>

                {/* Interest 5 */}
                <div className="border border-primary/30 p-4">
                  <div className="text-primary text-sm font-bold mb-2">
                    &gt; System Administration
                  </div>
                  <div className="text-primary/70 text-xs leading-relaxed">
                    Linux & Windows systems, user management, security hardening, and system optimization.
                  </div>
                </div>

                {/* Interest 6 */}
                <div className="border border-primary/30 p-4">
                  <div className="text-primary text-sm font-bold mb-2">
                    &gt; Problem Solving
                  </div>
                  <div className="text-primary/70 text-xs leading-relaxed">
                    Tackling challenging problems, debugging, reverse engineering, and creative thinking.
                  </div>
                </div>
              </div>

              <div className="text-muted text-sm pt-4 border-t border-primary/30">
                <span className="text-primary">$</span> echo "Curiosity drives innovation"
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning & Skills */}
      <section id="learning" className="relative py-20 lg:py-32 px-4 z-10">
        <div className="max-w-6xl mx-auto">
          {/* Terminal window */}
          <div className="border border-primary/50">
            <div className="bg-primary/10 px-4 py-2 border-b border-primary/50 flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <div className="w-3 h-3 rounded-full bg-secondary" />
              <span className="text-primary ml-4">abdallah@portfolio:~/skills</span>
            </div>

            <div className="p-8 bg-background space-y-6">
              <div className="space-y-2 text-sm">
                <div className="text-muted">
                  <span className="text-primary">$</span> cat current_skills.txt
                </div>
              </div>

              <div className="space-y-4">
                <div className="border border-primary/30 p-4">
                  <div className="text-primary text-sm font-bold mb-3">Programming Languages</div>
                  <div className="text-primary/70 text-xs space-y-1">
                    <div>• Python - Building scripts and applications</div>
                    <div>• C++ - Systems programming and algorithms</div>
                    <div>• JavaScript - Web development and frontend</div>
                    <div>• OCaml - Functional programming and formal verification</div>
                    <div>• Lua - Scripting and embedded systems</div>
                  </div>
                </div>

                <div className="border border-primary/30 p-4">
                  <div className="text-primary text-sm font-bold mb-3">Technical Knowledge</div>
                  <div className="text-primary/70 text-xs space-y-1">
                    <div>• Linux & Windows system administration</div>
                    <div>• Networking fundamentals and protocols</div>
                    <div>• Web technologies (HTML, CSS, JavaScript, React)</div>
                    <div>• Mathematics & Physics (strong analytical foundation)</div>
                  </div>
                </div>

                <div className="border border-primary/30 p-4">
                  <div className="text-primary text-sm font-bold mb-3">Currently Learning</div>
                  <div className="text-primary/70 text-xs space-y-1">
                    <div>• Advanced cybersecurity concepts</div>
                    <div>• Machine learning and AI applications</div>
                    <div>• Cryptography and encryption algorithms</div>
                    <div>• Security best practices and frameworks</div>
                  </div>
                </div>
              </div>

              <div className="text-muted text-sm pt-4 border-t border-primary/30">
                <span className="text-primary">$</span> echo "Knowledge is power"
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-20 lg:py-32 px-4 z-10">
        <div className="max-w-6xl mx-auto">
          {/* Terminal window */}
          <div className="border border-primary/50">
            <div className="bg-primary/10 px-4 py-2 border-b border-primary/50 flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <div className="w-3 h-3 rounded-full bg-secondary" />
              <span className="text-primary ml-4">abdallah@portfolio:~/projects</span>
            </div>

            <div className="p-8 bg-background space-y-6">
              <div className="space-y-2 text-sm">
                <div className="text-muted">
                  <span className="text-primary">$</span> find . -type f -name "*.project"
                </div>
              </div>

              <div className="space-y-4">
                {/* Project 1 */}
                <div className="border border-primary/30 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-primary font-bold">./cpge_heaven.project</div>
                    <span className="text-secondary text-xs">[IN PROGRESS]</span>
                  </div>
                  <div className="text-primary/80 text-sm mb-4 leading-relaxed">
                    A comprehensive Python application that centralizes CPGE lessons with integrated
                    mathematics and physics tools. Designed to help students master complex concepts.
                  </div>
                  <a
                    href="https://github.com/imbouali"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:text-primary transition-colors text-sm inline-flex items-center gap-2"
                  >
                    view on github <ArrowRight className="w-3 h-3" />
                  </a>
                </div>

                {/* Project 2 */}
                <div className="border border-primary/30 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-primary font-bold">./asteroids.project</div>
                    <span className="text-secondary text-xs">[COMPLETED]</span>
                  </div>
                  <div className="text-primary/80 text-sm mb-4 leading-relaxed">
                    A game project focused on clean architecture and gameplay mechanics. Demonstrates
                    understanding of systems design and performance optimization.
                  </div>
                  <a
                    href="https://github.com/imbouali"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:text-primary transition-colors text-sm inline-flex items-center gap-2"
                  >
                    see code <ArrowRight className="w-3 h-3" />
                  </a>
                </div>

                {/* Project 3 */}
                <div className="border border-primary/30 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-primary font-bold">./post_quantum_cryptography.tipe</div>
                    <span className="text-secondary text-xs">[COMPLETED]</span>
                  </div>
                  <div className="text-primary/80 text-sm mb-4 leading-relaxed">
                    My TIPE (Travaux d'Initiative Personnelle Encadrés) research on post-quantum cryptography.
                    Studied RSA cryptography vulnerabilities, learned Shor's algorithm, and compared both approaches.
                    Explores the future of cryptography in the quantum era.
                  </div>
                  <a
                    href="/presentation_complete.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:text-primary transition-colors text-sm inline-flex items-center gap-2"
                  >
                    read paper <ArrowRight className="w-3 h-3" />
                  </a>
                </div>

                {/* Project 4 */}
                <div className="border border-primary/30 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-primary font-bold">./learning_projects.project</div>
                    <span className="text-secondary text-xs">[ONGOING]</span>
                  </div>
                  <div className="text-primary/80 text-sm mb-4 leading-relaxed">
                    Various small projects exploring cybersecurity concepts, AI applications, and
                    programming challenges. Each project is a learning opportunity.
                  </div>
                  <a
                    href="https://github.com/imbouali"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:text-primary transition-colors text-sm inline-flex items-center gap-2"
                  >
                    explore projects <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="text-muted text-sm pt-4 border-t border-primary/30">
                <span className="text-primary">$</span> echo "Building skills through projects"
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 lg:py-32 px-4 z-10">
        <div className="max-w-4xl mx-auto">
          {/* Terminal window */}
          <div className="border border-primary/50">
            <div className="bg-primary/10 px-4 py-2 border-b border-primary/50 flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <div className="w-3 h-3 rounded-full bg-secondary" />
              <span className="text-primary ml-4">abdallah@portfolio:~/contact</span>
            </div>

            <div className="p-8 bg-background space-y-6">
              <div className="space-y-2 text-sm">
                <div className="text-muted">
                  <span className="text-primary">$</span> cat contact_info.txt
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-primary/80 text-sm leading-relaxed">
                  I love connecting with people who share similar interests! Whether you want to discuss
                  cybersecurity, AI, programming, or just share ideas—feel free to reach out. Let's learn and grow together!
                </div>

                <div className="space-y-3">
                  <div className="text-sm">
                    <span className="text-primary">GitHub:</span>
                    <a
                      href="https://github.com/imbouali"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary hover:text-primary ml-2 transition-colors"
                    >
                      github.com/imbouali
                    </a>
                  </div>
                  <div className="text-sm">
                    <span className="text-primary">Twitter/X:</span>
                    <a
                      href="https://twitter.com/AbdallahBouali6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary hover:text-primary ml-2 transition-colors"
                    >
                      @AbdallahBouali6
                    </a>
                  </div>
                  <div className="text-sm">
                    <span className="text-primary">Instagram:</span>
                    <a
                      href="https://www.instagram.com/abdallehbouali/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary hover:text-primary ml-2 transition-colors"
                    >
                      @abdallehbouali
                    </a>
                  </div>
                  <div className="text-sm">
                    <span className="text-primary">Email:</span>
                    <a
                      href="mailto:contact@bouali.tech"
                      className="text-secondary hover:text-primary ml-2 transition-colors"
                    >
                      contact@bouali.tech
                    </a>
                  </div>
                  <div className="text-sm">
                    <span className="text-primary">Discord:</span>
                    <span className="text-secondary ml-2">
                      a_bouali
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-muted text-sm pt-4 border-t border-primary/30">
                <span className="text-primary">$</span> echo "Let's build the future together"
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-primary/30 py-8 px-4 z-10">
        <div className="max-w-6xl mx-auto text-center text-muted text-xs">
          <div className="text-primary">$</div>
          <p>
            &copy; {new Date().getFullYear()} Abdallah Bouali. CPGE Student | Cybersecurity Enthusiast.
          </p>
        </div>
      </footer>
    </div>
  );
}
