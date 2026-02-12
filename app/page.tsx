"use client";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const fullText = "Junior Web Security Analyst";
  const [matrixCode, setMatrixCode] = useState<string[]>([]);
  const [hackerText, setHackerText] = useState("");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [scannerPosition, setScannerPosition] = useState(0);
  const [hexCode, setHexCode] = useState<Array<{id: number, x: number, y: number, code: string}>>([]);
  const [glitch, setGlitch] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [accessStatus, setAccessStatus] = useState<'granted' | 'denied' | null>(null);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const [breachDetected, setBreachDetected] = useState(false);
  const [explosionCount, setExplosionCount] = useState(0);
  const [konamiCode, setKonamiCode] = useState<string[]>([]);
  const [matrixMode, setMatrixMode] = useState(false);
  const [loginStep, setLoginStep] = useState<'loading' | 'username' | 'password' | 'authenticated'>('loading');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [scanStatus, setScanStatus] = useState('Initializing...');
  const [securityScore, setSecurityScore] = useState(100);
  const [lastScan, setLastScan] = useState(0);
  const [miniBreach, setMiniBreach] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [unlockedSections, setUnlockedSections] = useState<Set<string>>(new Set());
  const [firewalls, setFirewalls] = useState<Array<{id: number, x: number, y: number, width: number, height: number, opacity: number}>>([]);

  // Función para desbloquear una sección permanentemente
  const unlockSection = (sectionId: string) => {
    setUnlockedSections(prev => new Set([...prev, sectionId]));
  };

  // Efecto de carga inicial
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoginStep('username'), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Auto-escribir username
  useEffect(() => {
    if (loginStep === 'username') {
      const targetUsername = 'Job_Hunter';
      let currentIndex = 0;
      
      const interval = setInterval(() => {
        if (currentIndex <= targetUsername.length) {
          setUsername(targetUsername.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          // Esperar 1 segundo y pasar a password
          setTimeout(() => {
            setLoginStep('password');
          }, 1000);
        }
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [loginStep]);

  // Auto-escribir password
  useEffect(() => {
    if (loginStep === 'password') {
      const targetPassword = 'SecurePass2026';
      let currentIndex = 0;
      
      const interval = setInterval(() => {
        if (currentIndex <= targetPassword.length) {
          setPassword(targetPassword.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          // Esperar 1.5 segundos y hacer login automático
          setTimeout(() => {
            setLoginStep('authenticated');
          }, 1500);
        }
      }, 80);
      
      return () => clearInterval(interval);
    }
  }, [loginStep]);

  // Login handler para password (ya no se usa pero lo dejamos por si acaso)
  const handleLogin = () => {
    if (loginStep === 'password') {
      if (password.length >= 4) {
        setLoginStep('authenticated');
        setLoginError(false);
      } else {
        setLoginError(true);
        setTimeout(() => setLoginError(false), 2000);
      }
    }
  };

  // Live Scan
  useEffect(() => {
    if (loginStep !== 'authenticated') return;
    
    const scanSteps = [
      'Initializing security scan...',
      'Checking portfolio integrity...',
      'Analyzing vulnerabilities...',
      'Scanning for XSS vectors...',
      'Testing CSRF protection...',
      'Validating input sanitization...',
      'No critical issues found.',
      'Scan complete. Status: SECURE'
    ];
    
    let index = 0;
    const interval = setInterval(() => {
      setScanStatus(scanSteps[index]);
      index = (index + 1) % scanSteps.length;
    }, 3000);
    
    return () => clearInterval(interval);
  }, [loginStep]);

  // Security Score updater
  useEffect(() => {
    if (loginStep !== 'authenticated') return;
    
    const interval = setInterval(() => {
      setLastScan(prev => prev + 1);
      setSecurityScore(98 + Math.floor(Math.random() * 3));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [loginStep]);

  // Mini breach simulation (cada 3 minutos)
  useEffect(() => {
    if (loginStep !== 'authenticated') return;
    
    const interval = setInterval(() => {
      setMiniBreach(true);
      setTimeout(() => setMiniBreach(false), 3000);
    }, 180000);
    
    return () => clearInterval(interval);
  }, [loginStep]);

  // Typewriter effect
  useEffect(() => {
    if (loginStep !== 'authenticated') return;
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, [loginStep]);

  // Efecto Matrix
  useEffect(() => {
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const columns = 20;
    
    const interval = setInterval(() => {
      setMatrixCode(
        Array.from({ length: columns }, () => 
          chars[Math.floor(Math.random() * chars.length)]
        )
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Texto hacker rotando
  useEffect(() => {
    const texts = [
      "scanning ports...",
      "analyzing vulnerabilities...",
      "pentesting in progress...",
      "exploit detected...",
      "securing application...",
      "bug bounty hunting..."
    ];
    let index = 0;
    
    const interval = setInterval(() => {
      setHackerText(texts[index]);
      index = (index + 1) % texts.length;
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Escáner vertical
  useEffect(() => {
    const interval = setInterval(() => {
      setScannerPosition(prev => (prev >= 100 ? 0 : prev + 0.5));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Código hexadecimal cayendo
  useEffect(() => {
    const interval = setInterval(() => {
      const newHex = {
        id: Date.now(),
        x: Math.random() * 100,
        y: -5,
        code: `0x${Math.floor(Math.random() * 0xFFFF).toString(16).toUpperCase().padStart(4, '0')}`
      };
      setHexCode(prev => [...prev.slice(-20), newHex]);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Efecto glitch
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  // Terminal líneas de código automáticas
  useEffect(() => {
    if (loginStep !== 'authenticated') return;
    
    const commands = [
      "root@security:~# nmap -sV -sC 192.168.1.1",
      "[+] Port 80/tcp open",
      "[+] Port 443/tcp open",
      "root@security:~# nikto -h target.com",
      "[*] Scanning for vulnerabilities...",
      "[+] XSS vulnerability found",
      "root@security:~# burpsuite --proxy",
      "[*] Intercepting requests...",
      "root@security:~# metasploit -v",
      "[+] Exploit loaded successfully",
      "root@security:~# sqlmap -u 'http://target.com'",
      "[!] SQL injection detected",
      "root@security:~# python3 vulnhunter.py",
      "[*] Analyzing security headers...",
      "[+] Scan complete - 3 vulnerabilities found"
    ];

    let index = 0;
    const interval = setInterval(() => {
      setTerminalLines(prev => {
        const newLines = [...prev, commands[index % commands.length]];
        return newLines.slice(-8);
      });
      index++;
    }, 2500);

    return () => clearInterval(interval);
  }, [loginStep]);

  // Efecto de Access Granted/Denied aleatorio
  useEffect(() => {
    if (loginStep !== 'authenticated') return;
    
    const interval = setInterval(() => {
      const random = Math.random();
      setAccessStatus(random > 0.7 ? 'granted' : 'denied');
      setTimeout(() => setAccessStatus(null), 2000);
    }, 60000);
    return () => clearInterval(interval);
  }, [loginStep]);

  // Tracking de coordenadas del mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseCoords({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Konami Code detector
  useEffect(() => {
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    const handleKeyDown = (e: KeyboardEvent) => {
      setKonamiCode(prev => {
        const newCode = [...prev, e.key].slice(-10);
        if (JSON.stringify(newCode) === JSON.stringify(konamiSequence)) {
          setMatrixMode(true);
          setTimeout(() => {
            setMatrixMode(false);
          }, 10000);
          return [];
        }
        return newCode;
      });
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Partículas interactivas - SIN TRAILS, VELOCIDAD DE ATRACCIÓN REDUCIDA
  useEffect(() => {
    if (loginStep !== 'authenticated') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{x: number, y: number, vx: number, vy: number}> = [];
    const explosions: Array<{x: number, y: number, radius: number, opacity: number}> = [];
    const particleCount = 40;
    let mouseX = -1000;
    let mouseY = -1000;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Click para crear firewall
    const handleClick = (e: MouseEvent) => {
      const newFirewall = {
        id: Date.now(),
        x: e.clientX - 100,
        y: e.clientY - 75,
        width: 200,
        height: 150,
        opacity: 1
      };
      setFirewalls(prev => [...prev, newFirewall]);
      
      // Remover después de 3 segundos
      setTimeout(() => {
        setFirewalls(prev => prev.filter(f => f.id !== newFirewall.id));
      }, 3000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Detectar clusters
      particles.forEach((particle, i) => {
        let nearbyCount = 0;
        let clusterX = particle.x;
        let clusterY = particle.y;

        particles.forEach((other, j) => {
          if (i === j) return;
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 30) {
            nearbyCount++;
            clusterX += other.x;
            clusterY += other.y;
          }
        });

        if (nearbyCount >= 8) {
          clusterX /= (nearbyCount + 1);
          clusterY /= (nearbyCount + 1);
          
          explosions.push({
            x: clusterX,
            y: clusterY,
            radius: 0,
            opacity: 1
          });

          setBreachDetected(true);
          setExplosionCount(prev => prev + 1);
          setTimeout(() => setBreachDetected(false), 2000);

          particles.forEach((p) => {
            const dx = p.x - clusterX;
            const dy = p.y - clusterY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 50) {
              const randomAngle = Math.random() * Math.PI * 2;
              const randomSpeed = 20 + Math.random() * 15;
              p.vx = Math.cos(randomAngle) * randomSpeed;
              p.vy = Math.sin(randomAngle) * randomSpeed;
            }
          });
        }
      });

      // Animar explosiones
      explosions.forEach((explosion, i) => {
        explosion.radius += 3;
        explosion.opacity -= 0.02;

        if (explosion.opacity > 0) {
          ctx.beginPath();
          ctx.arc(explosion.x, explosion.y, explosion.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(16, 185, 129, ${explosion.opacity})`;
          ctx.lineWidth = 3;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(explosion.x, explosion.y, explosion.radius * 0.5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${explosion.opacity * 0.5})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        } else {
          explosions.splice(i, 1);
        }
      });

      particles.forEach((particle, i) => {
        const dxMouse = mouseX - particle.x;
        const dyMouse = mouseY - particle.y;
        const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        
        const attractionRadius = 200;
        if (distanceMouse < attractionRadius && distanceMouse > 0) {
          const attractionForce = (attractionRadius - distanceMouse) / attractionRadius;
          // VELOCIDAD DE ATRACCIÓN REDUCIDA de 0.2 a 0.1
          particle.vx += (dxMouse / distanceMouse) * attractionForce * 0.05;
          particle.vy += (dyMouse / distanceMouse) * attractionForce * 0.05;
        }

        particle.vx *= 0.98;
        particle.vy *= 0.98;

        particle.vx += (Math.random() - 0.5) * 0.15;
        particle.vy += (Math.random() - 0.5) * 0.15;

        const maxSpeed = 30;
        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
        if (speed > maxSpeed) {
          particle.vx = (particle.vx / speed) * maxSpeed;
          particle.vy = (particle.vy / speed) * maxSpeed;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;

        // Colisión con firewalls
        firewalls.forEach(fw => {
          if (particle.x > fw.x && particle.x < fw.x + fw.width &&
              particle.y > fw.y && particle.y < fw.y + fw.height) {
            // Rebote
            if (Math.abs(particle.x - fw.x) < 10 || Math.abs(particle.x - (fw.x + fw.width)) < 10) {
              particle.vx *= -1;
            }
            if (Math.abs(particle.y - fw.y) < 10 || Math.abs(particle.y - (fw.y + fw.height)) < 10) {
              particle.vy *= -1;
            }
          }
        });

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // Dibujar partícula (SIN TRAIL)
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(16, 185, 129, 0.5)';
        ctx.fill();

        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.2 * (1 - distance / 100)})`;
            ctx.stroke();
          }
        });

        if (distanceMouse < 200 && distanceMouse > 0) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(16, 185, 129, ${0.5 * (1 - distanceMouse / 200)})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.lineWidth = 1;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
    };
  }, [loginStep, firewalls]);

  // Si aún no está autenticado, mostrar pantallas de carga/login
  if (loginStep !== 'authenticated') {
    return (
      <div className="fixed inset-0 bg-zinc-950 z-50 flex items-center justify-center">
        {loginStep === 'loading' && (
          <div className="w-96 space-y-4">
            <p className="text-emerald-500 font-mono text-sm">INITIALIZING SECURITY SYSTEMS...</p>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="text-emerald-500 font-mono text-xs text-right">{loadingProgress}%</p>
          </div>
        )}
        
        {loginStep === 'username' && (
          <div className="w-96 space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-emerald-400 font-mono mb-2">SECURE LOGIN</h1>
              <p className="text-zinc-500 text-sm">Portfolio Access Control</p>
            </div>
            
            <div>
              <label className="block text-emerald-500 font-mono text-sm mb-2">Username:</label>
              <input
                type="text"
                value={username}
                readOnly
                className="w-full bg-zinc-900 border border-emerald-600 rounded px-4 py-2 text-emerald-500 font-mono focus:outline-none focus:border-emerald-400"
              />
            </div>
            
            <div className="flex items-center justify-center gap-2 text-emerald-500">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <p className="text-xs font-mono">Auto-filling credentials...</p>
            </div>
          </div>
        )}
        
        {loginStep === 'password' && (
          <div className="w-96 space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-emerald-400 font-mono mb-2">SECURE LOGIN</h1>
              <p className="text-zinc-500 text-sm">User: {username}</p>
            </div>
            
            <div>
              <label className="block text-emerald-500 font-mono text-sm mb-2">Password:</label>
              <input
                type="password"
                value={password}
                readOnly
                className="w-full bg-zinc-900 border border-emerald-600 rounded px-4 py-2 text-emerald-500 font-mono focus:outline-none focus:border-emerald-400"
                placeholder="••••••••"
              />
            </div>
            
            <div className="flex items-center justify-center gap-2 text-emerald-500">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <p className="text-xs font-mono">Authenticating...</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative min-h-screen bg-zinc-950 text-zinc-200 overflow-hidden ${matrixMode ? 'matrix-rain' : ''}`}>
      {/* Canvas para partículas interactivas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Firewalls - aparecen al hacer click */}
      {firewalls.map((fw) => (
        <div
          key={fw.id}
          className="fixed pointer-events-none z-30 border-4 border-emerald-500 rounded-lg bg-emerald-500/10 backdrop-blur-sm"
          style={{
            left: `${fw.x}px`,
            top: `${fw.y}px`,
            width: `${fw.width}px`,
            height: `${fw.height}px`,
            opacity: fw.opacity,
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)',
            transition: 'opacity 0.3s ease-out'
          }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-mono text-lg font-bold text-emerald-500">
            🛡️ FIREWALL
          </div>
        </div>
      ))}

      {/* Mini Breach Overlay */}
      {miniBreach && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="absolute inset-0 bg-red-950/50 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-red-500 font-mono text-4xl font-bold mb-4 animate-pulse">
              UNAUTHORIZED ACCESS DETECTED
            </p>
            <p className="text-emerald-500 font-mono text-2xl">
              ...MITIGATED ✓
            </p>
            <p className="text-zinc-400 font-mono text-sm mt-2">
              Intrusion prevention system active
            </p>
          </div>
        </div>
      )}

      {/* Sistema de coordenadas Matrix - CENTRADO */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 bg-zinc-950/90 border border-emerald-600/50 rounded-lg font-mono text-xs text-emerald-500 tracking-widest">
        ↑ ↑ ↓ ↓ ← → ← → B A
      </div>

      {/* Live Scan Widget - REPOSICIONADO ABAJO A LA IZQUIERDA */}
      <div className="fixed bottom-32 left-4 z-50 px-6 py-3 bg-zinc-950/90 border border-emerald-600/50 rounded-lg font-mono text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-emerald-500">{scanStatus}</span>
        </div>
      </div>

      {/* Security Score Widget - AHORA MÁS VISIBLE EN LA ESQUINA */}
      <div className="fixed top-4 right-4 z-50 px-4 py-3 bg-zinc-950/90 border border-emerald-600/50 rounded-lg font-mono text-xs">
        <p className="text-emerald-500 font-semibold mb-1">SECURITY RATING</p>
        <p className="text-3xl font-bold text-emerald-400">{securityScore}%</p>
        <p className="text-zinc-500 text-[10px] mt-1">Last scan: {lastScan}s ago</p>
      </div>

      {/* Targeting system */}
      <div 
        className="fixed pointer-events-none z-40"
        style={{ 
          left: mouseCoords.x, 
          top: mouseCoords.y,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="relative w-8 h-8">
          <div className="absolute top-1/2 left-0 w-full h-px bg-emerald-500/50"></div>
          <div className="absolute top-0 left-1/2 w-px h-full bg-emerald-500/50"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-emerald-500/30 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-emerald-500/20 rounded-full"></div>
        <div className="absolute -top-3 -left-3 w-2 h-2 border-t-2 border-l-2 border-emerald-500/50"></div>
        <div className="absolute -top-3 -right-3 w-2 h-2 border-t-2 border-r-2 border-emerald-500/50"></div>
        <div className="absolute -bottom-3 -left-3 w-2 h-2 border-b-2 border-l-2 border-emerald-500/50"></div>
        <div className="absolute -bottom-3 -right-3 w-2 h-2 border-b-2 border-r-2 border-emerald-500/50"></div>
      </div>

      {/* BREACH DETECTED */}
      {breachDetected && (
        <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 z-50">
          <div className="text-6xl font-bold font-mono text-red-500 animate-pulse border-4 border-red-500 px-12 py-6 bg-red-950/90 rounded-lg shadow-2xl">
            ⚠️ BREACH DETECTED ⚠️
          </div>
          <div className="text-center mt-4 text-2xl font-mono text-red-400">
            Total Breaches: {explosionCount}
          </div>
        </div>
      )}

      {/* MATRIX MODE */}
      {matrixMode && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-green-500/20 via-transparent to-green-500/20"></div>
          <div className="text-center">
            <div className="text-6xl font-bold font-mono text-green-500 animate-pulse mb-6">
              🟢 RED TEAM MODE ACTIVATED 🟢
            </div>
            <div className="text-3xl font-mono text-green-400 bg-black/80 px-8 py-4 rounded-lg border-4 border-green-500">
              ✓ ACCESS GRANTED
            </div>
            <div className="text-xl font-mono text-green-300 mt-4">
              Offensive security profile unlocked
            </div>
          </div>
        </div>
      )}

      {/* Escáner vertical */}
      <div 
        className="fixed left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-30 pointer-events-none z-10"
        style={{ top: `${scannerPosition}%` }}
      />

      {/* ACCESS GRANTED/DENIED popup */}
      {accessStatus && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-pulse">
          <div className={`text-4xl font-bold font-mono px-12 py-6 rounded-lg border-4 ${
            accessStatus === 'granted' 
              ? 'text-green-500 border-green-500 bg-green-950/90' 
              : 'text-red-500 border-red-500 bg-red-950/90'
          } shadow-2xl`}>
            {accessStatus === 'granted' ? '✓ ACCESS GRANTED' : '✗ ACCESS DENIED'}
          </div>
        </div>
      )}

      {/* Terminal de código ejecutándose */}
      <div className="fixed top-1/2 right-8 transform -translate-y-1/2 w-96 bg-zinc-950/90 border border-emerald-600/50 rounded-lg p-4 backdrop-blur-sm hidden xl:block z-10 shadow-2xl shadow-emerald-600/20">
        <div className="flex gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="font-mono text-xs space-y-1 overflow-hidden">
          {terminalLines.map((line, i) => (
            <p key={i} className={`${
              line.includes('[+]') ? 'text-green-500' :
              line.includes('[!]') ? 'text-red-500' :
              line.includes('[*]') ? 'text-blue-500' :
              'text-emerald-500'
            } animate-fade-in`}>
              {line}
            </p>
          ))}
          <p className="text-emerald-500 animate-pulse">█</p>
        </div>
      </div>

      {/* Código hexadecimal cayendo */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {hexCode.map((hex, index) => (
          <div
            key={hex.id}
            className="absolute font-mono text-xs text-emerald-600/30"
            style={{
              left: `${hex.x}%`,
              top: `${hex.y + (index * 5)}%`,
              animation: 'fall 10s linear'
            }}
          >
            {hex.code}
          </div>
        ))}
      </div>

      {/* Fondo Matrix */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="flex gap-4 text-emerald-500 font-mono text-xs">
          {matrixCode.map((char, i) => (
            <div key={i} className="animate-pulse">
              {char}
            </div>
          ))}
        </div>
      </div>

      {/* Líneas de datos pasando */}
      <div className="fixed inset-0 opacity-5 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-0 w-full font-mono text-xs text-emerald-500 whitespace-nowrap animate-scroll">
          GET /api/vulnerabilities HTTP/1.1 ... 200 OK ... XSS detected ... SQL injection blocked ... OWASP Top 10 ... Burp Suite active ...
        </div>
        <div className="absolute top-1/2 left-0 w-full font-mono text-xs text-emerald-600 whitespace-nowrap animate-scroll-slow">
          Authorization: Bearer eyJhbGc... ... Content-Type: application/json ... Status: 403 Forbidden ... Pentesting mode enabled ...
        </div>
        <div className="absolute top-3/4 left-0 w-full font-mono text-xs text-emerald-700 whitespace-nowrap animate-scroll-fast">
          nmap -sV -sC target.com ... Nessus scan complete ... Metasploit framework loaded ... CVE-2024-1234 found ...
        </div>
      </div>

      {/* Terminal superior izquierda */}
      <div className="fixed top-20 left-8 w-64 bg-zinc-900/50 border border-emerald-600/30 rounded-lg p-4 backdrop-blur-sm hidden lg:block z-10">
        <div className="flex gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="font-mono text-xs text-emerald-500 space-y-1">
          <p className="animate-pulse">$ whoami</p>
          <p className="text-zinc-400">KiritoAkerman@security</p>
          <p className="animate-pulse">$ cat skills.txt</p>
          <p className="text-zinc-400">Web Application Security...</p>
          <p className="text-zinc-400">OWASP...</p>
          <p className="text-zinc-400">VulnResearch...</p>
          <p className="text-zinc-400">Python...</p>
          <p className="text-zinc-400">NodeJS...</p>
          <p className="text-zinc-400">Vulnerability Assessment...</p>
          <p className="text-zinc-400">Exploit Development...</p>
          <p className="text-zinc-400">Bug Bounty...</p>
          <p className="text-zinc-400">Secure Code...</p>
          <p className="animate-pulse">_</p>
        </div>
      </div>

      {/* Stats superior derecha - AHORA DEBAJO DEL SECURITY SCORE */}
      <div className="fixed top-32 right-8 w-56 bg-zinc-900/50 border border-emerald-600/30 rounded-lg p-4 backdrop-blur-sm hidden lg:block z-10">
        <div className="space-y-3 font-mono text-xs">
          <div>
            <div className="flex justify-between text-zinc-400 mb-1">
              <span>Security</span>
              <span>95%</span>
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[95%] animate-pulse"></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-zinc-400 mb-1">
              <span>Development</span>
              <span>85%</span>
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[85%] animate-pulse"></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-zinc-400 mb-1">
              <span>Pentesting</span>
              <span>90%</span>
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[90%] animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Network Monitor inferior izquierda - AHORA MÁS ARRIBA PARA NO SOLAPAR CON LIVE SCAN */}
      <div className="fixed bottom-56 left-8 w-64 bg-zinc-900/50 border border-emerald-600/30 rounded-lg p-4 backdrop-blur-sm hidden lg:block z-10">
        <div className="font-mono text-xs">
          <p className="text-emerald-500 mb-3 font-semibold">NETWORK MONITOR</p>
          <div className="space-y-2 text-zinc-400">
            <div className="flex justify-between">
              <span>Status:</span>
              <span className="text-green-500 animate-pulse">● ACTIVE</span>
            </div>
            <div className="flex justify-between">
              <span>Ports:</span>
              <span className="text-emerald-500">22, 80, 443</span>
            </div>
            <div className="flex justify-between">
              <span>Threats:</span>
              <span className="text-red-500">0</span>
            </div>
            <div className="flex justify-between">
              <span>Uptime:</span>
              <span className="text-emerald-500">99.9%</span>
            </div>
          </div>
        </div>
      </div>

      {/* System Logs inferior derecha */}
      <div className="fixed bottom-8 right-8 w-72 bg-zinc-900/50 border border-emerald-600/30 rounded-lg p-4 backdrop-blur-sm hidden lg:block z-10">
        <div className="font-mono text-xs">
          <p className="text-emerald-500 mb-3 font-semibold">SYSTEM LOGS</p>
          <div className="space-y-1 text-zinc-400 text-[10px]">
            <p className="text-green-500">[OK] Security scan completed</p>
            <p className="text-blue-500">[INFO] Analyzing target...</p>
            <p className="text-yellow-500">[WARN] {hackerText}</p>
            <p className="text-green-500">[OK] All systems operational</p>
            <p className="text-emerald-500 animate-pulse">█</p>
          </div>
        </div>
      </div>

      {/* Grid de fondo */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

      {/* Contenido principal */}
      <main className="relative max-w-5xl mx-auto px-8 py-16 z-10">
        
        <section className="mb-20">
          <h1 className={`text-5xl font-bold tracking-tight mb-4 text-emerald-400 ${glitch ? 'animate-glitch' : ''}`}>
            Enrique García-Nates
          </h1>

          <p className="font-mono text-lg text-emerald-500 h-6">
            {text}
            <span className="animate-pulse">|</span>
          </p>

          <p className="mt-6 max-w-2xl text-zinc-400 leading-relaxed">
            Cybersecurity Analyst specialized in Web Application Security and 
            Penetration Testing. Experience in vulnerability assessment, secure 
            development practices, and technical reporting. Background in backend 
            development with strong interest in offensive security and bug bounty research.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-zinc-400">
            <span className="flex items-center gap-2">
              <span className="text-emerald-500">📍</span>
              Galapagar, Madrid, Spain
            </span>
            <span className="flex items-center gap-2">
              <span className="text-emerald-500">📧</span>
              quiquegnates@gmail.com
            </span>
            <span className="flex items-center gap-2">
              <span className="text-emerald-500">📱</span>
              +34 682 80 81 45
            </span>
          </div>

          <div className="mt-8 flex gap-4">
            <a href="/cv-enrique-garcia.pdf" 
            download
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 transition rounded-md font-medium shadow-lg shadow-emerald-600/50 hover:scale-105 transform">
              Download CV
            </a>
            <a href="https://www.linkedin.com/in/enrique-garcía-nates-martín" target="_blank" rel="noopener noreferrer" className="px-6 py-2 border border-emerald-600 hover:bg-emerald-600/20 transition rounded-md hover:scale-105 transform">
              LinkedIn
            </a>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-8 text-emerald-400 flex items-center gap-3">
            <span className="text-3xl">💼</span>
            Experience
          </h2>

          <div className="space-y-8">
            <div 
              className="group relative bg-zinc-900/80 backdrop-blur-sm p-6 rounded-lg border border-zinc-800 hover:border-emerald-600 transition hover:shadow-lg hover:shadow-emerald-600/10 hover:scale-[1.02] transform overflow-hidden"
              onMouseEnter={() => unlockSection('exp-1')}
            >
              <div className={`absolute inset-0 bg-zinc-950/95 flex items-center justify-center z-10 transition-opacity duration-300 pointer-events-none ${unlockedSections.has('exp-1') ? 'opacity-0' : 'group-hover:opacity-0'}`}>
                <div className="text-center">
                  <div className="text-4xl mb-2">🔒</div>
                  <p className="font-mono text-emerald-500 text-sm">ACCESS RESTRICTED</p>
                  <p className="font-mono text-zinc-500 text-xs mt-2">hover to decrypt</p>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold">
                Independent Security Research & Bug Bounty
              </h3>
              <p className="text-sm text-zinc-500 mb-3">Jan 2026 - Present | Self-directed</p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                <li>Conducted independent web security research</li>
                <li>Participated in bug bounty programs</li>
                <li>Identified and responsibly disclosed vulnerabilities</li>
                <li>Earned industry certifications</li>
              </ul>
            </div>

            <div 
              className="group relative bg-zinc-900/80 backdrop-blur-sm p-6 rounded-lg border border-zinc-800 hover:border-emerald-600 transition hover:shadow-lg hover:shadow-emerald-600/10 hover:scale-[1.02] transform overflow-hidden"
              onMouseEnter={() => unlockSection('exp-2')}
            >
              <div className={`absolute inset-0 bg-zinc-950/95 flex items-center justify-center z-10 transition-opacity duration-300 pointer-events-none ${unlockedSections.has('exp-2') ? 'opacity-0' : 'group-hover:opacity-0'}`}>
                <div className="text-center">
                  <div className="text-4xl mb-2">🔒</div>
                  <p className="font-mono text-emerald-500 text-sm">ACCESS RESTRICTED</p>
                  <p className="font-mono text-zinc-500 text-xs mt-2">hover to decrypt</p>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold">
                Backend / Full Stack Developer - Vlumex
              </h3>
              <p className="text-sm text-zinc-500 mb-3">Oct 2025 - Dec 2025</p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                <li>Backend development and API implementation</li>
                <li>Database integration and performance optimization</li>
                <li>Secure coding practices implementation</li>
              </ul>
              <p className="mt-3 text-sm text-emerald-500">
                Tech: Node.js, Python, HTTP, REST APIs
              </p>
            </div>

            <div 
              className="group relative bg-zinc-900/80 backdrop-blur-sm p-6 rounded-lg border border-zinc-800 hover:border-emerald-600 transition hover:shadow-lg hover:shadow-emerald-600/10 hover:scale-[1.02] transform overflow-hidden"
              onMouseEnter={() => unlockSection('exp-3')}
            >
              <div className={`absolute inset-0 bg-zinc-950/95 flex items-center justify-center z-10 transition-opacity duration-300 pointer-events-none ${unlockedSections.has('exp-3') ? 'opacity-0' : 'group-hover:opacity-0'}`}>
                <div className="text-center">
                  <div className="text-4xl mb-2">🔒</div>
                  <p className="font-mono text-emerald-500 text-sm">ACCESS RESTRICTED</p>
                  <p className="font-mono text-zinc-500 text-xs mt-2">hover to decrypt</p>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold">
                Cybersecurity Analyst - Diligize
              </h3>
              <p className="text-sm text-zinc-500 mb-3">Jun 2025 - Sept 2025 | Remote</p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                <li>Performed Web Application Penetration Testing (Black Box & Gray Box)</li>
                <li>Identified OWASP Top 10 vulnerabilities</li>
                <li>Used Burp Suite, Nmap, Nikto for security assessments</li>
                <li>Delivered technical reports with remediation guidance</li>
                <li>Supported client remediation processes</li>
              </ul>
              <p className="mt-3 text-sm text-emerald-500">
                Skills: Web Pentesting, OWASP, Burp Suite, Nmap, Reporting
              </p>
            </div>

            <div 
              className="group relative bg-zinc-900/80 backdrop-blur-sm p-6 rounded-lg border border-zinc-800 hover:border-emerald-600 transition hover:shadow-lg hover:shadow-emerald-600/10 hover:scale-[1.02] transform overflow-hidden"
              onMouseEnter={() => unlockSection('exp-4')}
            >
              <div className={`absolute inset-0 bg-zinc-950/95 flex items-center justify-center z-10 transition-opacity duration-300 pointer-events-none ${unlockedSections.has('exp-4') ? 'opacity-0' : 'group-hover:opacity-0'}`}>
                <div className="text-center">
                  <div className="text-4xl mb-2">🔒</div>
                  <p className="font-mono text-emerald-500 text-sm">ACCESS RESTRICTED</p>
                  <p className="font-mono text-zinc-500 text-xs mt-2">hover to decrypt</p>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold">
                Cybersecurity Intern - Diligize
              </h3>
              <p className="text-sm text-zinc-500 mb-3">May 2025 - Jun 2025 | Madrid, Hybrid</p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                <li>Assisted in vulnerability assessments</li>
                <li>Supported security testing and documentation</li>
                <li>Collaborated with senior analysts</li>
              </ul>
            </div>

            <div 
              className="group relative bg-zinc-900/80 backdrop-blur-sm p-6 rounded-lg border border-zinc-800 hover:border-emerald-600 transition hover:shadow-lg hover:shadow-emerald-600/10 hover:scale-[1.02] transform overflow-hidden"
              onMouseEnter={() => unlockSection('exp-5')}
            >
              <div className={`absolute inset-0 bg-zinc-950/95 flex items-center justify-center z-10 transition-opacity duration-300 pointer-events-none ${unlockedSections.has('exp-5') ? 'opacity-0' : 'group-hover:opacity-0'}`}>
                <div className="text-center">
                  <div className="text-4xl mb-2">🔒</div>
                  <p className="font-mono text-emerald-500 text-sm">ACCESS RESTRICTED</p>
                  <p className="font-mono text-zinc-500 text-xs mt-2">hover to decrypt</p>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold">
                Internship - Indra Sistemas S.A.
              </h3>
              <p className="text-sm text-zinc-500 mb-3">Oct 2023</p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                <li>Supported internal IT operations, improving availability and incident response times</li>
                <li>Assisted technical teams in infrastructure-related activities</li>
                <li>Developed teamwork skills and learned from professionals in the field</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-8 text-emerald-400 flex items-center gap-3">
            <span className="text-3xl">🎓</span>
            Education
          </h2>

          <div 
            className="group relative bg-zinc-900/80 backdrop-blur-sm p-6 rounded-lg border border-zinc-800 hover:border-emerald-600 transition hover:shadow-lg hover:shadow-emerald-600/10 hover:scale-[1.02] transform overflow-hidden"
            onMouseEnter={() => unlockSection('edu-1')}
          >
            <div className={`absolute inset-0 bg-zinc-950/95 flex items-center justify-center z-10 transition-opacity duration-300 pointer-events-none ${unlockedSections.has('edu-1') ? 'opacity-0' : 'group-hover:opacity-0'}`}>
              <div className="text-center">
                <div className="text-4xl mb-2">🔒</div>
                <p className="font-mono text-emerald-500 text-sm">ACCESS RESTRICTED</p>
                <p className="font-mono text-zinc-500 text-xs mt-2">hover to decrypt</p>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold">
              Cybersecurity Bootcamp - IronHack
            </h3>
            <p className="text-sm text-zinc-500 mb-3">Madrid</p>
            <p className="text-emerald-500 font-semibold mb-3">Final Grade: 9.6/10</p>
            <p className="text-zinc-400">
              Risk Analysis, Network Security, Forensics, Ethical Hacking
            </p>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-8 text-emerald-400 flex items-center gap-3">
            <span className="text-3xl">🛠️</span>
            Projects
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div 
              className="group relative bg-zinc-900/80 backdrop-blur-sm p-6 rounded-lg border border-zinc-800 hover:border-emerald-600 transition hover:shadow-lg hover:shadow-emerald-600/10 hover:scale-[1.02] transform overflow-hidden"
              onMouseEnter={() => unlockSection('proj-1')}
            >
              <div className={`absolute inset-0 bg-zinc-950/95 flex items-center justify-center z-10 transition-opacity duration-300 pointer-events-none ${unlockedSections.has('proj-1') ? 'opacity-0' : 'group-hover:opacity-0'}`}>
                <div className="text-center">
                  <div className="text-4xl mb-2">🔒</div>
                  <p className="font-mono text-emerald-500 text-sm">ACCESS RESTRICTED</p>
                  <p className="font-mono text-zinc-500 text-xs mt-2">hover to decrypt</p>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-3">
                VulnHunter Pro
              </h3>
              <p className="text-zinc-400 mb-4">
                Custom vulnerability scanning tool developed in Python to automate 
                reconnaissance and detection of common web vulnerabilities (XSS, SQLi 
                patterns, misconfigurations). Published on GitHub.
              </p>
              <a href="https://lnkd.in/dRaAnkrt" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline inline-flex items-center gap-2">
                View Repository →
              </a>
            </div>

            <div 
              className="group relative bg-zinc-900/80 backdrop-blur-sm p-6 rounded-lg border border-zinc-800 hover:border-emerald-600 transition hover:shadow-lg hover:shadow-emerald-600/10 hover:scale-[1.02] transform overflow-hidden"
              onMouseEnter={() => unlockSection('proj-2')}
            >
              <div className={`absolute inset-0 bg-zinc-950/95 flex items-center justify-center z-10 transition-opacity duration-300 pointer-events-none ${unlockedSections.has('proj-2') ? 'opacity-0' : 'group-hover:opacity-0'}`}>
                <div className="text-center">
                  <div className="text-4xl mb-2">🔒</div>
                  <p className="font-mono text-emerald-500 text-sm">ACCESS RESTRICTED</p>
                  <p className="font-mono text-zinc-500 text-xs mt-2">hover to decrypt</p>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-3">
                Custom Honeypot Environment
              </h3>
              <p className="text-zinc-400">
                Designed and deployed a personal honeypot to analyze attack patterns 
                and malicious traffic behavior.
              </p>
            </div>

            <div 
              className="group relative bg-zinc-900/80 backdrop-blur-sm p-6 rounded-lg border border-zinc-800 hover:border-emerald-600 transition hover:shadow-lg hover:shadow-emerald-600/10 hover:scale-[1.02] transform overflow-hidden"
              onMouseEnter={() => unlockSection('proj-3')}
            >
              <div className={`absolute inset-0 bg-zinc-950/95 flex items-center justify-center z-10 transition-opacity duration-300 pointer-events-none ${unlockedSections.has('proj-3') ? 'opacity-0' : 'group-hover:opacity-0'}`}>
                <div className="text-center">
                  <div className="text-4xl mb-2">🔒</div>
                  <p className="font-mono text-emerald-500 text-sm">ACCESS RESTRICTED</p>
                  <p className="font-mono text-zinc-500 text-xs mt-2">hover to decrypt</p>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-3">
                Personal Security Lab
              </h3>
              <p className="text-zinc-400">
                Built and maintained a private testing environment for web exploitation, 
                tool development and vulnerability research.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-8 text-emerald-400 flex items-center gap-3">
            <span className="text-3xl">⚡</span>
            Technical Skills
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-zinc-400">
            <div 
              className="group relative bg-zinc-900/80 backdrop-blur-sm p-6 rounded-lg border border-zinc-800 hover:border-emerald-600 transition hover:scale-[1.02] transform overflow-hidden"
              onMouseEnter={() => unlockSection('skill-1')}
            >
              <div className={`absolute inset-0 bg-zinc-950/95 flex items-center justify-center z-10 transition-opacity duration-300 pointer-events-none ${unlockedSections.has('skill-1') ? 'opacity-0' : 'group-hover:opacity-0'}`}>
                <div className="text-center">
                  <div className="text-4xl mb-2">🔒</div>
                  <p className="font-mono text-emerald-500 text-sm">ENCRYPTED</p>
                  <p className="font-mono text-zinc-500 text-xs mt-2">hover to view</p>
                </div>
              </div>
              
              <h4 className="font-semibold text-zinc-200 mb-3">Security</h4>
              <p>Burp Suite, Nmap, Nikto, OWASP, Metasploit, Web Pentesting, Vulnerability Assessment</p>
            </div>

            <div 
              className="group relative bg-zinc-900/80 backdrop-blur-sm p-6 rounded-lg border border-zinc-800 hover:border-emerald-600 transition hover:scale-[1.02] transform overflow-hidden"
              onMouseEnter={() => unlockSection('skill-2')}
            >
              <div className={`absolute inset-0 bg-zinc-950/95 flex items-center justify-center z-10 transition-opacity duration-300 pointer-events-none ${unlockedSections.has('skill-2') ? 'opacity-0' : 'group-hover:opacity-0'}`}>
                <div className="text-center">
                  <div className="text-4xl mb-2">🔒</div>
                  <p className="font-mono text-emerald-500 text-sm">ENCRYPTED</p>
                  <p className="font-mono text-zinc-500 text-xs mt-2">hover to view</p>
                </div>
              </div>
              
              <h4 className="font-semibold text-zinc-200 mb-3">Development</h4>
              <p>Python, Node.js, REST APIs, HTTP, Secure Coding, Backend Development</p>
            </div>

            <div 
              className="group relative bg-zinc-900/80 backdrop-blur-sm p-6 rounded-lg border border-zinc-800 hover:border-emerald-600 transition hover:scale-[1.02] transform overflow-hidden"
              onMouseEnter={() => unlockSection('skill-3')}
            >
              <div className={`absolute inset-0 bg-zinc-950/95 flex items-center justify-center z-10 transition-opacity duration-300 pointer-events-none ${unlockedSections.has('skill-3') ? 'opacity-0' : 'group-hover:opacity-0'}`}>
                <div className="text-center">
                  <div className="text-4xl mb-2">🔒</div>
                  <p className="font-mono text-emerald-500 text-sm">ENCRYPTED</p>
                  <p className="font-mono text-zinc-500 text-xs mt-2">hover to view</p>
                </div>
              </div>
              
              <h4 className="font-semibold text-zinc-200 mb-3">Systems</h4>
              <p>Linux, MySQL, MongoDB, Virtualization, Network Security, Forensics</p>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-8 text-emerald-400 flex items-center gap-3">
            <span className="text-3xl">🤝</span>
            Volunteering
          </h2>

          <div 
            className="group relative bg-zinc-900/80 backdrop-blur-sm p-6 rounded-lg border border-zinc-800 hover:border-emerald-600 transition hover:shadow-lg hover:shadow-emerald-600/10 hover:scale-[1.02] transform overflow-hidden"
            onMouseEnter={() => unlockSection('vol-1')}
          >
            <div className={`absolute inset-0 bg-zinc-950/95 flex items-center justify-center z-10 transition-opacity duration-300 pointer-events-none ${unlockedSections.has('vol-1') ? 'opacity-0' : 'group-hover:opacity-0'}`}>
              <div className="text-center">
                <div className="text-4xl mb-2">🔒</div>
                <p className="font-mono text-emerald-500 text-sm">ACCESS RESTRICTED</p>
                <p className="font-mono text-zinc-500 text-xs mt-2">hover to decrypt</p>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold mb-3">
              Food Bank Operation Kilo & Altius Foundation
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-zinc-400">
              <li>Organized food collection events and coordinated distribution of essential supplies</li>
            </ul>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-8 text-emerald-400 flex items-center gap-3">
            <span className="text-3xl">🌍</span>
            Languages
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div 
              className="group relative bg-zinc-900/80 backdrop-blur-sm p-6 rounded-lg border border-zinc-800 hover:scale-[1.02] transform transition overflow-hidden"
              onMouseEnter={() => unlockSection('lang-1')}
            >
              <div className={`absolute inset-0 bg-zinc-950/95 flex items-center justify-center z-10 transition-opacity duration-300 pointer-events-none ${unlockedSections.has('lang-1') ? 'opacity-0' : 'group-hover:opacity-0'}`}>
                <div className="text-center">
                  <div className="text-4xl mb-2">🔒</div>
                  <p className="font-mono text-emerald-500 text-sm">ENCRYPTED</p>
                  <p className="font-mono text-zinc-500 text-xs mt-2">hover to view</p>
                </div>
              </div>
              
              <h4 className="font-semibold text-zinc-200 mb-2">Spanish</h4>
              <p className="text-zinc-400">Native Speaker</p>
            </div>
            
            <div 
              className="group relative bg-zinc-900/80 backdrop-blur-sm p-6 rounded-lg border border-zinc-800 hover:scale-[1.02] transform transition overflow-hidden"
              onMouseEnter={() => unlockSection('lang-2')}
            >
              <div className={`absolute inset-0 bg-zinc-950/95 flex items-center justify-center z-10 transition-opacity duration-300 pointer-events-none ${unlockedSections.has('lang-2') ? 'opacity-0' : 'group-hover:opacity-0'}`}>
                <div className="text-center">
                  <div className="text-4xl mb-2">🔒</div>
                  <p className="font-mono text-emerald-500 text-sm">ENCRYPTED</p>
                  <p className="font-mono text-zinc-500 text-xs mt-2">hover to view</p>
                </div>
              </div>
              
              <h4 className="font-semibold text-zinc-200 mb-2">English</h4>
              <p className="text-zinc-400">Professional Working Proficiency</p>
            </div>
          </div>
        </section>

        <footer className="border-t border-zinc-800 pt-8 text-sm text-zinc-500 text-center">
          <p>Madrid, Spain - Spanish (Native) - English (Professional)</p>
          <p className="mt-2">© 2026 Enrique Garcia Nates - Built with Next.js & Tailwind CSS</p>
        </footer>
      </main>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-slow {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes scroll-fast {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        @keyframes fall {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        @keyframes fade-in {
          0% { opacity: 0; transform: translateX(-10px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll-slow {
          animation: scroll-slow 40s linear infinite;
        }
        .animate-scroll-fast {
          animation: scroll-fast 20s linear infinite;
        }
        .animate-glitch {
          animation: glitch 0.2s ease-in-out;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .matrix-rain {
          background: #000 !important;
        }
        .matrix-rain * {
          color: #00ff00 !important;
          text-shadow: 0 0 10px #00ff00 !important;
        }
      `}</style>
    </div>
  );
}