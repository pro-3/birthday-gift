import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  ArrowLeft, ArrowRight, AudioLines, Cake, Camera, Check, ChevronLeft,
  ChevronRight, Gift, Image as ImageIcon, LockKeyhole, Music2, Pause, Play, RefreshCw,
  Sparkles, Star, Trophy, Volume2, VolumeX, X
} from 'lucide-react';
import { birthdayContent } from './birthdayContent.js';

const sceneNames = ['The invite', 'A little gift', 'Memory lane', 'A note for you', 'Make a wish', 'Play time', 'The finale'];

function burst(origin = { x: 0.5, y: 0.55 }, count = 90) {
  confetti({
    particleCount: count,
    spread: 78,
    startVelocity: 34,
    gravity: 0.9,
    origin,
    ticks: 210,
    scalar: 0.9,
    colors: ['#d5a75e', '#f7dfb5', '#d88891', '#8d668b', '#fff5e5'],
    disableForReducedMotion: true
  });
}

function CornerOrnaments() {
  return (
    <>
      <div className="ambient-glow ambient-glow-one" />
      <div className="ambient-glow ambient-glow-two" />
      <div className="film-grain" />
      <div className="particle-field" aria-hidden="true">
        {Array.from({ length: 26 }, (_, index) => (
          <span
            className="particle"
            key={index}
            style={{
              '--x': `${(index * 37 + 11) % 100}%`,
              '--delay': `${(index % 9) * -1.7}s`,
              '--duration': `${8 + (index % 7) * 1.6}s`,
              '--size': `${2 + (index % 3)}px`
            }}
          />
        ))}
      </div>
    </>
  );
}

function MusicControl({ playing, onToggle }) {
  return (
    <button className={`music-control ${playing ? 'is-playing' : ''}`} onClick={onToggle} aria-label={playing ? 'Pause background music' : 'Play background music'}>
      <span className="music-bars" aria-hidden="true"><i /><i /><i /><i /></span>
      <span>{playing ? 'Music on' : 'Music off'}</span>
      {playing ? <Volume2 size={15} /> : <VolumeX size={15} />}
    </button>
  );
}

function PasswordGate({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === '05042024') {
      setError('');
      onUnlock();
      return;
    }
    setError(password.length === 8
      ? 'That password doesn’t match. Check the date and try again.'
      : 'Please enter all 8 digits, including the first zero.');
    setShake(true);
    window.setTimeout(() => setShake(false), 520);
  };

  return (
    <section className="password-screen" aria-labelledby="lock-title">
      <motion.div
        className={`password-card ${shake ? 'password-shake' : ''}`}
        initial={{ opacity: 0, y: 22, scale: 0.975 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="password-kicker"><span /> A LITTLE BIRTHDAY MAGIC <span /></div>
        <div className="password-lock-icon"><LockKeyhole size={29} strokeWidth={1.35} /></div>
        <p className="password-script">A tiny secret before the surprise</p>
        <h1 id="lock-title">This little<br /><em>surprise is locked.</em></h1>
        <p className="password-copy">There’s a special date that opens the door. Think back to the day our friendship began.</p>

        <div className="password-hint" role="note">
          <span className="hint-label">PASSWORD HINT</span>
          <strong>Password is the date when we first met.</strong>
          <div className="date-format-example">
            <span className="date-example-label">ENTER IT IN THIS FORMAT</span>
            <span className="date-example-note">DDMMYYYY · 8 digits · keep the first zero</span>
          </div>
        </div>

        <form className="password-form" onSubmit={handleSubmit}>
          <label htmlFor="birthday-password">ENTER THE 8-DIGIT PASSWORD</label>
          <input
            id="birthday-password"
            type="password"
            inputMode="numeric"
            autoComplete="off"
            pattern="[0-9]{8}"
            maxLength={8}
            placeholder="DDMMYYYY"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value.replace(/\D/g, '').slice(0, 8));
              if (error) setError('');
            }}
            aria-describedby="password-format password-error"
            aria-invalid={Boolean(error)}
          />
          <span id="password-format" className="password-format">Type all 8 numbers. Don’t leave out the leading zero.</span>
          {error && <p id="password-error" className="password-error" role="alert">{error}</p>}
          <button className="password-submit" type="submit" disabled={password.length !== 8}>
            <span>Unlock your surprise</span><LockKeyhole size={16} />
          </button>
        </form>
        <div className="password-footer"><Sparkles size={13} /> MADE WITH FRIENDSHIP <Sparkles size={13} /></div>
      </motion.div>
    </section>
  );
}

function ProgressBar({ step }) {
  return (
    <div className="progress-wrap" aria-label={`Scene ${step + 1} of ${sceneNames.length}`}>
      <div className="progress-meta"><span>YOUR BIRTHDAY STORY</span><span>{String(step + 1).padStart(2, '0')} / 07</span></div>
      <div className="progress-track"><span style={{ width: `${((step + 1) / sceneNames.length) * 100}%` }} /></div>
    </div>
  );
}

function SceneEyebrow({ children, light = false }) {
  return <div className={`scene-eyebrow ${light ? 'light' : ''}`}><span />{children}<span /></div>;
}

function PrimaryButton({ children, onClick, icon: Icon = ArrowRight, disabled = false, variant = 'gold' }) {
  return (
    <button className={`primary-button ${variant}`} onClick={onClick} disabled={disabled}>
      <span>{children}</span><Icon size={17} strokeWidth={1.8} />
    </button>
  );
}

function IntroScene({ onNext }) {
  return (
    <div className="scene intro-scene">
      <div className="intro-orbit orbit-one" /><div className="intro-orbit orbit-two" />
      <motion.div className="intro-spark intro-spark-a" animate={{ rotate: 360, scale: [0.9, 1.12, 0.9] }} transition={{ rotate: { duration: 24, repeat: Infinity, ease: 'linear' }, scale: { duration: 4, repeat: Infinity } }}><Sparkles size={24} /></motion.div>
      <motion.div className="intro-spark intro-spark-b" animate={{ y: [0, -12, 0], rotate: [0, 15, 0] }} transition={{ duration: 4.5, repeat: Infinity }}><Star size={17} /></motion.div>
      <motion.div className="intro-card" initial={{ opacity: 0, y: 28, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
        <div className="tiny-kicker"><span className="kicker-line" /> A LITTLE SOMETHING FOR YOU <span className="kicker-line" /></div>
        <div className="intro-monogram"><span>✦</span><span className="monogram-ring">B</span><span>✦</span></div>
        <h1>A day made<br /><em>for celebrating</em> you.</h1>
        <p className="intro-copy">{birthdayContent.introLine}</p>
        <div className="intro-divider"><span /><Sparkles size={13} /><span /></div>
        <p className="intro-small">A few memories, a little fun, and a whole lot of birthday cheer.</p>
        <PrimaryButton onClick={onNext}>Open your surprise</PrimaryButton>
      </motion.div>
      <div className="intro-bottom-note"><span>MADE WITH FRIENDSHIP</span><span>✦</span><span>BEST VIEWED WITH SOUND</span></div>
    </div>
  );
}

function GiftScene({ opened, setOpened, onNext }) {
  return (
    <div className="scene dark-scene gift-scene">
      <SceneEyebrow light>SCENE 02 · A LITTLE SURPRISE</SceneEyebrow>
      <motion.div className="scene-heading" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
        <p className="handwritten light-script">Just for you</p>
        <h2>Every good day<br /><em>deserves a gift.</em></h2>
        <p className="scene-subtitle light-subtitle">Tap the box and see what's waiting inside.</p>
      </motion.div>
      <div className={`gift-stage ${opened ? 'opened' : ''}`}>
        <div className="gift-halo" />
        <div className="gift-sparkles"><Sparkles /><Star /><Sparkles /><Star /></div>
        <button className="gift-box-button" onClick={() => { if (!opened) { setOpened(true); burst({ x: 0.5, y: 0.55 }, 75); } }} aria-label="Open the birthday gift">
          <div className="gift-shadow" />
          <div className="gift-glow" />
          <div className="gift-lid"><div className="lid-ribbon" /><div className="gift-bow"><i /><i /><b /></div></div>
          <div className="gift-body"><div className="body-ribbon" /><div className="gift-seal">✦</div></div>
          <div className="gift-confetti"><span>✦</span><span>✧</span><span>✦</span><span>✧</span><span>✦</span></div>
        </button>
        <div className="gift-floor" />
      </div>
      <AnimatePresence mode="wait">
        {opened ? (
          <motion.div className="gift-reveal" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <p className="reveal-small">SURPRISE UNLOCKED</p>
            <h3>Happy Birthday, <em>{birthdayContent.name}!</em></h3>
            <p>Today is all about celebrating you and all the good things you bring into the world.</p>
            <PrimaryButton onClick={onNext}>See our memories</PrimaryButton>
          </motion.div>
        ) : <p className="tap-hint"><span className="tap-dot" /> TAP TO OPEN YOUR GIFT</p>}
      </AnimatePresence>
    </div>
  );
}

function MemoriesScene({ onNext, onOpenPhoto }) {
  return (
    <div className="scene paper-scene memories-scene">
      <SceneEyebrow>SCENE 03 · MEMORY LANE</SceneEyebrow>
      <div className="paper-heading">
        <p className="handwritten">The little things become the big memories</p>
        <h2>A scrapbook<br /><em>of good times.</em></h2>
        <p className="scene-subtitle">Four frames from the camera roll. Tap any photo to take a closer look.</p>
      </div>
      <div className="scrapbook-grid">
        {birthdayContent.memories.map((memory, index) => (
          <motion.button
            key={memory.image}
            className={`polaroid polaroid-${index + 1}`}
            onClick={() => onOpenPhoto(index)}
            initial={{ opacity: 0, y: 25, rotate: index % 2 === 0 ? -5 : 5 }}
            whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -3 : 3 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -7, rotate: 0, scale: 1.025 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <span className="photo-tape" />
            <span className="polaroid-image"><img src={memory.image} alt={memory.label} loading="lazy" /></span>
            <span className="polaroid-caption"><b>{memory.label}</b><small>{memory.caption}</small></span>
            <span className="photo-index">0{index + 1}</span>
          </motion.button>
        ))}
        <div className="scrapbook-sticker sticker-one">good<br />times <span>✦</span></div>
        <div className="scrapbook-sticker sticker-two">the<br />memories</div>
        <div className="doodle-heart">♡</div>
      </div>
      <div className="paper-bottom-row"><span>MORE MEMORIES TO COME</span><span>✦ ✦ ✦</span></div>
      <PrimaryButton onClick={onNext}>A note for you</PrimaryButton>
    </div>
  );
}

function PhotoModal({ index, onClose, onChange }) {
  if (index === null) return null;
  const memory = birthdayContent.memories[index];
  return (
    <motion.div className="photo-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <button className="modal-close" onClick={onClose} aria-label="Close photo"><X /></button>
      <button className="modal-arrow prev" onClick={(event) => { event.stopPropagation(); onChange((index + birthdayContent.memories.length - 1) % birthdayContent.memories.length); }} aria-label="Previous photo"><ChevronLeft /></button>
      <motion.div className="modal-photo-card" initial={{ opacity: 0, y: 20, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} onClick={(event) => event.stopPropagation()}>
        <img src={memory.image} alt={memory.label} />
        <div><strong>{memory.label}</strong><p>{memory.caption}</p></div>
      </motion.div>
      <button className="modal-arrow next" onClick={(event) => { event.stopPropagation(); onChange((index + 1) % birthdayContent.memories.length); }} aria-label="Next photo"><ChevronRight /></button>
    </motion.div>
  );
}

function LetterScene({ onNext }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="scene letter-scene">
      <SceneEyebrow light>SCENE 04 · A NOTE FOR YOU</SceneEyebrow>
      <div className="letter-intro">
        <p className="handwritten light-script">A small pause in the celebrations</p>
        <h2>Some words,<br /><em>just for you.</em></h2>
      </div>
      <div className={`letter-envelope ${revealed ? 'letter-open' : ''}`}>
        <button className="envelope-button" onClick={() => setRevealed(true)} aria-label="Open the birthday letter">
          <div className="envelope-back" /><div className="letter-paper"><div className="letter-paper-inner"><span className="letter-spark">✦</span><p className="letter-dear">Hey, {birthdayContent.name},</p>{birthdayContent.letter.map((paragraph, index) => <p key={index}>{paragraph}</p>)}<p className="letter-signoff">{birthdayContent.signOff}</p></div></div><div className="envelope-front" /><div className="envelope-flap" /><span className="wax-seal">✦</span>
          </button>
      </div>
      {!revealed ? <p className="tap-hint letter-hint">TAP THE SEAL TO OPEN THE LETTER</p> : <motion.div className="letter-continue" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><PrimaryButton onClick={onNext}>Time for cake</PrimaryButton></motion.div>}
    </div>
  );
}

function CakeScene({ onNext }) {
  const [wished, setWished] = useState(false);
  const makeWish = () => {
    setWished(true);
    burst({ x: 0.5, y: 0.45 }, 115);
  };
  return (
    <div className="scene cake-scene">
      <SceneEyebrow>SCENE 05 · MAKE A WISH</SceneEyebrow>
      <div className="cake-heading">
        <p className="handwritten">One important birthday tradition</p>
        <h2>Make a wish,<br /><em>birthday star.</em></h2>
        <p className="scene-subtitle">Take a breath, think of something wonderful, then tap to blow out the candles.</p>
      </div>
      <div className={`cake-stage ${wished ? 'wished' : ''}`}>
        <div className="cake-aura" />
        <div className="cake-sparkle sparkle-left">✦</div><div className="cake-sparkle sparkle-right">✧</div>
        <div className="cake">
          <div className="cake-candle candle-one"><i className="flame" /></div>
          <div className="cake-candle candle-two"><i className="flame" /></div>
          <div className="cake-candle candle-three"><i className="flame" /></div>
          <div className="cake-top"><span className="berry berry-one" /><span className="berry berry-two" /><span className="cream-dot dot-one" /><span className="cream-dot dot-two" /></div>
          <div className="cake-layer layer-top"><span className="icing-drip drip-one" /><span className="icing-drip drip-two" /><span className="icing-drip drip-three" /></div>
          <div className="cake-layer layer-bottom"><span className="icing-drip drip-four" /><span className="icing-drip drip-five" /><span className="icing-drip drip-six" /></div>
          <div className="cake-plate" />
        </div>
      </div>
      <div className="cake-message" aria-live="polite">
        {wished ? <><h3>Wish sent into the universe! <span>✨</span></h3><p>May this year surprise you in the best possible ways.</p><PrimaryButton onClick={onNext}>Unlock the fun</PrimaryButton></> : <><h3>Your moment. Your wish.</h3><p>Ready? Make it a good one.</p><PrimaryButton onClick={makeWish} icon={Sparkles}>Blow out the candles</PrimaryButton></>}
      </div>
    </div>
  );
}

function ScratchCard({ message, index }) {
  const canvasRef = useRef(null);
  const [cleared, setCleared] = useState(false);
  const drawingRef = useRef(false);
  const lastCheckRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    const context = canvas.getContext('2d');
    context.scale(dpr, dpr);
    const gradient = context.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#b89b72');
    gradient.addColorStop(0.48, '#e7d1ad');
    gradient.addColorStop(1, '#9d805d');
    context.fillStyle = gradient;
    context.fillRect(0, 0, rect.width, rect.height);
    context.fillStyle = 'rgba(255,255,255,.22)';
    for (let i = 0; i < 35; i += 1) {
      context.beginPath();
      context.arc((i * 37) % rect.width, (i * 19) % rect.height, 1, 0, Math.PI * 2);
      context.fill();
    }
    context.globalCompositeOperation = 'source-over';
    context.fillStyle = '#fff8ec';
    context.font = '600 13px DM Sans, sans-serif';
    context.textAlign = 'center';
    context.fillText('SCRATCH TO REVEAL', rect.width / 2, rect.height / 2 + 4);
    context.font = '16px sans-serif';
    context.fillText('✦', rect.width / 2, rect.height / 2 - 18);
    return undefined;
  }, []);

  const scratchAt = (event) => {
    const canvas = canvasRef.current;
    if (!canvas || cleared) return;
    const rect = canvas.getBoundingClientRect();
    const context = canvas.getContext('2d');
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    context.globalCompositeOperation = 'destination-out';
    context.beginPath();
    context.arc(x, y, 19, 0, Math.PI * 2);
    context.fill();
    const now = performance.now();
    if (now - lastCheckRef.current > 250) {
      lastCheckRef.current = now;
      try {
        const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
        let transparent = 0;
        for (let i = 3; i < pixels.length; i += 4 * 12) if (pixels[i] < 40) transparent += 1;
        if (transparent / (pixels.length / (4 * 12)) > 0.42) {
          setCleared(true);
          context.clearRect(0, 0, canvas.width, canvas.height);
        }
      } catch {
        // If canvas pixel inspection is blocked, the visitor can still reveal it with the fallback button.
      }
    }
  };

  return (
    <div className={`scratch-card ${cleared ? 'cleared' : ''}`}>
      <div className="scratch-underlay"><span className="scratch-number">0{index + 1}</span><Sparkles size={19} /><p>{message}</p></div>
      {!cleared && <canvas ref={canvasRef} className="scratch-cover" onPointerDown={(event) => { drawingRef.current = true; event.currentTarget.setPointerCapture(event.pointerId); scratchAt(event); }} onPointerMove={(event) => { if (drawingRef.current) scratchAt(event); }} onPointerUp={() => { drawingRef.current = false; }} onPointerCancel={() => { drawingRef.current = false; }} aria-label="Scratch this card to reveal a birthday message" />}
      {!cleared && <button className="scratch-reveal-button" onClick={() => setCleared(true)}>Reveal instead</button>}
    </div>
  );
}

function CatchStarsGame() {
  const [playing, setPlaying] = useState(false);
  const [seconds, setSeconds] = useState(20);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [stars, setStars] = useState([]);
  const timerRef = useRef(null);

  const newStars = useCallback(() => Array.from({ length: 9 }, (_, index) => ({
    id: `${Date.now()}-${index}-${Math.random()}`,
    left: 6 + Math.random() * 84,
    top: 9 + Math.random() * 70,
    delay: Math.random() * 1.5
  })), []);

  const startGame = () => {
    clearInterval(timerRef.current);
    setScore(0);
    setSeconds(20);
    setStars(newStars());
    setPlaying(true);
    setRound((value) => value + 1);
  };

  useEffect(() => {
    if (!playing) return undefined;
    timerRef.current = setInterval(() => {
      setSeconds((value) => {
        if (value <= 1) {
          clearInterval(timerRef.current);
          setPlaying(false);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [playing, round]);

  useEffect(() => () => clearInterval(timerRef.current), []);

  const collectStar = (id) => {
    setStars((items) => items.filter((item) => item.id !== id));
    setScore((value) => {
      const next = value + 1;
      if (next === 10) burst({ x: 0.5, y: 0.55 }, 70);
      return next;
    });
    if (stars.length <= 1) setStars(newStars());
  };

  return (
    <div className="game-panel">
      <div className="game-topline"><span>THE 20-SECOND CHALLENGE</span><span className="game-score"><Trophy size={14} /> {score} / 10</span></div>
      <div className="game-stats"><div><small>TIME LEFT</small><strong>{String(seconds).padStart(2, '0')}s</strong></div><div><small>YOUR SCORE</small><strong>{String(score).padStart(2, '0')}</strong></div></div>
      <div className={`game-arena ${playing ? 'is-playing' : ''}`}>
        {playing ? stars.map((star) => <button key={star.id} className="catch-star" style={{ left: `${star.left}%`, top: `${star.top}%`, animationDelay: `${star.delay}s` }} onClick={() => collectStar(star.id)} aria-label="Catch star"><Star size={24} fill="currentColor" /></button>) : <div className="game-start-copy"><div className="game-star-stack"><Star /><Star /><Star /></div><strong>{seconds === 0 ? 'Time is up!' : 'Catch the stars'}</strong><span>{seconds === 0 ? `You caught ${score} stars. ${score >= 10 ? 'You did it!' : 'Give it another try!'}` : 'Tap as many moving stars as you can in 20 seconds.'}</span></div>}
      </div>
      <div className="game-footer"><span>{score >= 10 ? 'Birthday champion unlocked!' : 'Goal: collect 10 stars'}</span><button className="game-start-button" onClick={startGame}>{playing ? 'Restart' : seconds === 0 ? 'Play again' : 'Start game'} <Play size={13} fill="currentColor" /></button></div>
    </div>
  );
}

function PlayScene({ onNext }) {
  return (
    <div className="scene play-scene">
      <SceneEyebrow>SCENE 06 · PLAY TIME</SceneEyebrow>
      <div className="play-heading">
        <p className="handwritten">A little birthday side quest</p>
        <h2>Scratch, play<br /><em>and celebrate.</em></h2>
        <p className="scene-subtitle">Two tiny challenges. A few sweet surprises. No pressure, just fun.</p>
      </div>
      <div className="play-content">
        <section className="scratch-section">
          <div className="mini-section-heading"><div><span className="mini-overline">CHALLENGE 01</span><h3>Lucky scratch cards</h3></div><Sparkles size={20} /></div>
          <p className="mini-description">Scratch away the gold and reveal a little birthday wish.</p>
          <div className="scratch-grid">{birthdayContent.scratchMessages.map((message, index) => <ScratchCard key={index} message={message} index={index} />)}</div>
        </section>
        <section className="game-section">
          <div className="mini-section-heading"><div><span className="mini-overline">CHALLENGE 02</span><h3>Catch the stars</h3></div><Trophy size={20} /></div>
          <p className="mini-description">Catch 10 stars before the 20-second timer runs out.</p>
          <CatchStarsGame />
        </section>
      </div>
      <div className="play-next"><PrimaryButton onClick={onNext}>One last surprise</PrimaryButton></div>
    </div>
  );
}

function FinaleScene({ onReplay }) {
  useEffect(() => {
    const timers = [0, 850, 1700, 2550, 3400].map((delay, index) => setTimeout(() => {
      confetti({
        particleCount: index === 0 ? 110 : 65,
        spread: index === 0 ? 100 : 65,
        startVelocity: index === 0 ? 42 : 30,
        gravity: 0.8,
        origin: { x: index % 2 === 0 ? 0.18 : 0.82, y: 0.63 },
        colors: ['#d5a75e', '#f7dfb5', '#d88891', '#8d668b', '#fff5e5'],
        disableForReducedMotion: true
      });
    }, delay));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="scene finale-scene">
      <div className="finale-sunburst" />
      <div className="finale-stars" aria-hidden="true"><span>✦</span><span>✧</span><span>✦</span><span>✧</span><span>✦</span><span>✧</span><span>✦</span></div>
      <motion.div className="finale-content" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeOut' }}>
        <div className="finale-emblem"><Cake size={25} /><span>✦</span></div>
        <SceneEyebrow light>THE GRAND FINALE</SceneEyebrow>
        <p className="handwritten light-script">And the celebration continues...</p>
        <h2>HAPPY<br /><em>BIRTHDAY!</em></h2>
        <div className="finale-name">{birthdayContent.name}</div>
        <div className="finale-divider"><span /><Sparkles size={15} /><span /></div>
        <p className="finale-message">{birthdayContent.finalMessage}</p>
        <p className="finale-signoff">{birthdayContent.signOff}</p>
        <button className="replay-button" onClick={onReplay}><RefreshCw size={15} /> Relive the surprise</button>
      </motion.div>
      <div className="finale-footnote">MADE WITH A LOT OF FRIENDSHIP & A LITTLE BIT OF MAGIC</div>
    </div>
  );
}

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [step, setStep] = useState(0);
  const [giftOpened, setGiftOpened] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(null);
  const [musicOn, setMusicOn] = useState(false);
  const [musicError, setMusicError] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio('/audio/birthday-ambient.wav');
    audio.loop = true;
    audio.volume = 0.32;
    audio.preload = 'none';
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (musicOn) {
      audio.pause();
      setMusicOn(false);
      return;
    }
    try {
      await audio.play();
      setMusicOn(true);
      setMusicError(false);
    } catch {
      setMusicError(true);
      setMusicOn(false);
    }
  };

  const next = () => setStep((value) => Math.min(value + 1, sceneNames.length - 1));
  const previous = () => setStep((value) => Math.max(value - 1, 0));
  const replay = () => {
    setStep(0);
    setGiftOpened(false);
    setPhotoIndex(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className={`app-shell ${unlocked ? 'is-unlocked' : 'is-locked'}`}>
      <CornerOrnaments />
      {!unlocked ? (
        <PasswordGate onUnlock={() => setUnlocked(true)} />
      ) : (
        <>
      <header className="site-chrome">
        <a className="brand-mark" href="#top" onClick={(event) => { event.preventDefault(); replay(); }} aria-label="Back to beginning"><span>✦</span> A LITTLE BIRTHDAY MAGIC</a>
        <div className="chrome-right"><MusicControl playing={musicOn} onToggle={toggleMusic} /><span className="chrome-separator" /><span className="edition-mark">A FRIENDSHIP EDITION</span></div>
      </header>
      <ProgressBar step={step} />
      <div id="top" className="scene-stage">
        <AnimatePresence mode="wait">
          <motion.div key={step} className="scene-frame" initial={{ opacity: 0, y: 16, scale: 0.992 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12, scale: 0.996 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
            {step === 0 && <IntroScene onNext={next} />}
            {step === 1 && <GiftScene opened={giftOpened} setOpened={setGiftOpened} onNext={next} />}
            {step === 2 && <MemoriesScene onNext={next} onOpenPhoto={setPhotoIndex} />}
            {step === 3 && <LetterScene onNext={next} />}
            {step === 4 && <CakeScene onNext={next} />}
            {step === 5 && <PlayScene onNext={next} />}
            {step === 6 && <FinaleScene onReplay={replay} />}
          </motion.div>
        </AnimatePresence>
      </div>
      <footer className="site-footer">
        <span>© A LITTLE BIRTHDAY MAGIC</span>
        <div className="footer-navigation">
          <button onClick={previous} disabled={step === 0} aria-label="Previous scene"><ArrowLeft size={15} /> Back</button>
          <span className="footer-step">{sceneNames[step]}</span>
          {step < 6 && <button onClick={next} disabled={step === 1 && !giftOpened}>Continue <ArrowRight size={15} /></button>}
        </div>
        <span>MADE FOR A FRIEND</span>
      </footer>
      {musicError && <div className="music-error" role="status">Music couldn't start. Try tapping the music button again.</div>}
      <AnimatePresence>
        {photoIndex !== null && <PhotoModal index={photoIndex} onClose={() => setPhotoIndex(null)} onChange={setPhotoIndex} />}
      </AnimatePresence>
        </>
      )}
    </main>
  );
}
