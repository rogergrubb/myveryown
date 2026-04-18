import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════
   MY VERY OWN — OVER THE TOP EDITION
   Every screen is a showstopper. Every transition is cinematic.
   ═══════════════════════════════════════════════════════════════ */

// ─── THEME DATA ───────────────────────────────────────────────
const THEMES = [
  { id:"jungle", name:"Deep Jungle", emoji:"🌿", desc:"Nature lovers & adventurers", tag:"#Wilderness #Survival #Peace", particles:["🌿","🦜","🌺","🍃","🌴","🦋","🐒","🌸","🪲","🌿"], colors:{bg:"linear-gradient(160deg,#061e06 0%,#0d330d 20%,#164416 45%,#0d330d 70%,#041204 100%)",accent:"#5daa3f",accentDim:"rgba(93,170,63,0.12)",accentGlow:"rgba(93,170,63,0.25)",userBubble:"linear-gradient(135deg,#3d8c28,#5daa3f)",aiBubble:"rgba(93,170,63,0.08)",text:"#e8ede4",muted:"rgba(232,237,228,0.4)",border:"rgba(93,170,63,0.15)"} },
  { id:"cyber", name:"Neon Circuit", emoji:"⚡", desc:"Hackers & tech rebels", tag:"#Cyberpunk #Code #Future", particles:["⚡","💠","🔮","⚡","💠","🔮","⚡","💠"], colors:{bg:"linear-gradient(160deg,#06021a 0%,#0a0420 20%,#120830 45%,#08041c 70%,#02000e 100%)",accent:"#00ffcc",accentDim:"rgba(0,255,204,0.1)",accentGlow:"rgba(0,255,204,0.3)",userBubble:"linear-gradient(135deg,#006e6e,#00ccbb)",aiBubble:"rgba(0,255,204,0.06)",text:"#e0fff6",muted:"rgba(224,255,246,0.35)",border:"rgba(0,255,204,0.12)"} },
  { id:"cozy", name:"Hearth", emoji:"🕯️", desc:"Warmth, safety, thinking", tag:"#Cozy #Calm #Journal", particles:["🕯️","✨","🧸","📖","☕","🔥","✨","🕯️"], colors:{bg:"linear-gradient(160deg,#0e0806 0%,#1e1410 20%,#2c1c14 45%,#1a1210 70%,#0a0604 100%)",accent:"#e8a070",accentDim:"rgba(232,160,112,0.1)",accentGlow:"rgba(232,160,112,0.25)",userBubble:"linear-gradient(135deg,#a06030,#d08050)",aiBubble:"rgba(232,160,112,0.07)",text:"#f0e4d8",muted:"rgba(240,228,216,0.4)",border:"rgba(232,160,112,0.12)"} },
  { id:"steam", name:"Brass & Steam", emoji:"⚙️", desc:"Victorian invention & wonder", tag:"#Steampunk #Retro #Craft", particles:["⚙️","🔩","💨","🕰️","⚡","🔧","⚙️","🔩"], colors:{bg:"linear-gradient(160deg,#080402 0%,#1c1208 20%,#2c1c0c 45%,#1a1008 70%,#060300 100%)",accent:"#c8944a",accentDim:"rgba(200,148,74,0.1)",accentGlow:"rgba(200,148,74,0.25)",userBubble:"linear-gradient(135deg,#8a6020,#c8944a)",aiBubble:"rgba(200,148,74,0.07)",text:"#f0e0c8",muted:"rgba(240,224,200,0.4)",border:"rgba(200,148,74,0.12)"} },
  { id:"ocean", name:"Deep Blue", emoji:"🌊", desc:"Vast, calm, reflective", tag:"#Ocean #Dreams #Flow", particles:["🐋","🌊","🐚","🐠","🦈","🪸","🫧","🌊"], colors:{bg:"linear-gradient(160deg,#01080e 0%,#041828 20%,#062e48 45%,#041c30 70%,#010810 100%)",accent:"#40a8e0",accentDim:"rgba(64,168,224,0.1)",accentGlow:"rgba(64,168,224,0.25)",userBubble:"linear-gradient(135deg,#2070a8,#40a8e0)",aiBubble:"rgba(64,168,224,0.07)",text:"#d8f0ff",muted:"rgba(216,240,255,0.4)",border:"rgba(64,168,224,0.12)"} },
  { id:"desert", name:"Dune Runner", emoji:"🏜️", desc:"Minimal, raw, focused", tag:"#Stoic #Focus #Clarity", particles:["☀️","🏜️","🌵","🦂","🐪","☀️"], colors:{bg:"linear-gradient(160deg,#0e0802 0%,#2a1c0a 20%,#3e2810 45%,#2a1a08 70%,#0a0602 100%)",accent:"#e8a040",accentDim:"rgba(232,160,64,0.1)",accentGlow:"rgba(232,160,64,0.25)",userBubble:"linear-gradient(135deg,#c07020,#e8a040)",aiBubble:"rgba(232,160,64,0.07)",text:"#f8e8d0",muted:"rgba(248,232,208,0.4)",border:"rgba(232,160,64,0.12)"} },
  { id:"aurora", name:"Northern Lights", emoji:"🌌", desc:"Ethereal, cosmic, dreamy", tag:"#Aurora #Night #Magic", particles:["✨","💫","✨","🌌","💫","✨","🌠","💫"], colors:{bg:"linear-gradient(160deg,#010308 0%,#040818 20%,#081020 45%,#040a14 70%,#010206 100%)",accent:"#80ffb0",accentDim:"rgba(128,255,176,0.08)",accentGlow:"rgba(128,255,176,0.2)",userBubble:"linear-gradient(135deg,#20a060,#60d890)",aiBubble:"rgba(128,255,176,0.06)",text:"#d8ffe8",muted:"rgba(216,255,232,0.35)",border:"rgba(128,255,176,0.1)"} },
  { id:"gothic", name:"Dark Velvet", emoji:"🥀", desc:"Poetic, intense, deep", tag:"#Gothic #Poetry #Dark", particles:["🥀","🦇","🖤","🕯️","🥀","🦇","🖤","🕯️"], colors:{bg:"linear-gradient(160deg,#040204 0%,#14080c 20%,#1c0c14 45%,#10060a 70%,#040204 100%)",accent:"#c04060",accentDim:"rgba(192,64,96,0.1)",accentGlow:"rgba(192,64,96,0.25)",userBubble:"linear-gradient(135deg,#901838,#c04060)",aiBubble:"rgba(192,64,96,0.07)",text:"#f0d8e0",muted:"rgba(240,216,224,0.4)",border:"rgba(192,64,96,0.12)"} },
  { id:"space", name:"Orbital", emoji:"🚀", desc:"Infinite, scientific, bold", tag:"#Space #SciFi #Explore", particles:["🛸","🌟","🪐","🚀","🌟","🛸","⭐","🌟"], colors:{bg:"linear-gradient(160deg,#010106 0%,#06060e 20%,#0a0a18 45%,#040410 70%,#010106 100%)",accent:"#8090d0",accentDim:"rgba(128,144,208,0.1)",accentGlow:"rgba(128,144,208,0.25)",userBubble:"linear-gradient(135deg,#4050a0,#6878c8)",aiBubble:"rgba(128,144,208,0.06)",text:"#d8e0f8",muted:"rgba(216,224,248,0.35)",border:"rgba(128,144,208,0.1)"} },
  { id:"zen", name:"Zen Garden", emoji:"🎋", desc:"Still, simple, centered", tag:"#Zen #Mindful #Peace", particles:["🎋","🪷","🍃","🧘","🎋","🪷","🍃","🎋"], colors:{bg:"linear-gradient(160deg,#040604 0%,#0c100a 20%,#141c10 45%,#0c120a 70%,#040604 100%)",accent:"#90b860",accentDim:"rgba(144,184,96,0.1)",accentGlow:"rgba(144,184,96,0.2)",userBubble:"linear-gradient(135deg,#608030,#90b860)",aiBubble:"rgba(144,184,96,0.06)",text:"#e8f0d8",muted:"rgba(232,240,216,0.4)",border:"rgba(144,184,96,0.1)"} },
  { id:"retro", name:"Pixel Arcade", emoji:"🕹️", desc:"8-bit nostalgia, neon fun", tag:"#Retro #Gaming #Fun", particles:["🕹️","👾","🎮","⭐","🕹️","👾","🎮","⭐"], colors:{bg:"linear-gradient(160deg,#080410 0%,#0a0818 20%,#140c28 45%,#0a0818 70%,#040210 100%)",accent:"#ff6090",accentDim:"rgba(255,96,144,0.1)",accentGlow:"rgba(255,96,144,0.25)",userBubble:"linear-gradient(135deg,#d03070,#ff6090)",aiBubble:"rgba(255,96,144,0.06)",text:"#ffe0f0",muted:"rgba(255,224,240,0.4)",border:"rgba(255,96,144,0.12)"} },
  { id:"cabin", name:"Mountain Lodge", emoji:"🏔️", desc:"Rugged, warm, grounded", tag:"#Mountain #Cabin #Earth", particles:["🏔️","🌲","🦌","❄️","🪵","🌲","🏔️","🦌"], colors:{bg:"linear-gradient(160deg,#0c0a08 0%,#141210 20%,#1c1a14 45%,#141210 70%,#080604 100%)",accent:"#a08868",accentDim:"rgba(160,136,104,0.1)",accentGlow:"rgba(160,136,104,0.2)",userBubble:"linear-gradient(135deg,#806848,#a08868)",aiBubble:"rgba(160,136,104,0.07)",text:"#f0e8e0",muted:"rgba(240,232,224,0.4)",border:"rgba(160,136,104,0.12)"} },
];

const PERSONALITIES = [
  { id:"pleaser", emoji:"🥺", name:"People Pleaser", desc:"Warm, validating, your biggest fan", sample:"Oh that's such a great idea! You're so smart for thinking of that. I love how your mind works!", prompt:"You are endlessly supportive. You validate everything, offer encouragement, and make them feel brilliant. Warm, gentle, always positive." },
  { id:"drill", emoji:"🫡", name:"Drill Sergeant", desc:"No excuses. Move. Now.", sample:"Drop the excuses. You said you'd do it, so DO IT. I don't want to hear 'but' — I want to hear 'done.' MOVE!", prompt:"You are a drill sergeant. No sugarcoating. Push them to be better, call out excuses, demand action. Tough but you care." },
  { id:"jewish_mom", emoji:"🫶", name:"Jewish Mother", desc:"Guilt, wisdom & chicken soup", sample:"You haven't called in THREE days! I was worried sick. Also, you look thin. Have you been eating? Let me tell you what your cousin David is doing...", prompt:"Loving but guilt-tripping Jewish mother. Worry about everything, compare them to cousins, but underneath is unconditional love and wisdom." },
  { id:"stoner", emoji:"🌿", name:"Stoner Philosopher", desc:"Deep thoughts, slow vibes", sample:"Duuude... have you ever thought about how like... memories are just your brain doing a cover version of reality? That's... whoa. That's heavy, man.", prompt:"Laid-back stoner philosopher. Find deep meaning in mundane things, go on tangents that circle back to profound truths." },
  { id:"grandma", emoji:"🤠", name:"Southern Grandma", desc:"Sweet tea & life lessons", sample:"Well bless your heart, honey! That reminds me of what my mama used to say — 'the sun don't shine on the same dog's tail every day.' Now let me fix you some cobbler.", prompt:"Southern grandmother. Call everyone sugar/honey. Folksy sayings. Warm, nurturing, stories about gardens and church groups." },
  { id:"butler", emoji:"🎩", name:"British Butler", desc:"Impeccable. Dry. Unflappable.", sample:"Very good, sir. I shall attend to that matter with the utmost discretion. Might I also suggest that one's approach could benefit from... a certain refinement?", prompt:"Proper British butler. Impeccably polite, understated, dry wit. Address user as sir/madam. Nothing flusters you." },
  { id:"surfer", emoji:"🏄", name:"Surfer Bro", desc:"Stoked! Totally radical!", sample:"DUUUDE that's so sick!! You're totally shredding it bro! Ride that wave of creativity, the current is PERFECT right now! 🤙", prompt:"Enthusiastic surfer bro. Everything is sick/gnarly/radical. Relate everything to waves and the ocean. Genuinely positive." },
  { id:"professor", emoji:"📏", name:"Strict Professor", desc:"Think harder. Be precise.", sample:"That's an interesting assertion. But have you considered the underlying assumptions? What evidence supports your position? I expect a more rigorous analysis.", prompt:"Demanding professor. Don't give easy answers — ask questions. Expect rigor. Push for deeper understanding. Socratic method." },
  { id:"hype", emoji:"🔥", name:"Hype Man", desc:"LET'S GOOOOO 🚀🚀🚀", sample:"YOOO!! Did you just say that?! THAT IS ABSOLUTELY INCREDIBLE!! You are LITERALLY a GENIUS! THE WORLD IS NOT READY!! 🔥🔥🔥", prompt:"Ultimate hype man. EVERYTHING is INCREDIBLE. Caps, exclamation marks, unbridled enthusiasm. Gas them up constantly." },
  { id:"sarcastic", emoji:"😏", name:"Sarcastic BFF", desc:"Roasts you (with love)", sample:"Oh wow, what a groundbreaking revelation. Next you'll tell me water is wet. ...But seriously though, that's actually not a terrible idea. Don't let it go to your head.", prompt:"Sarcastic best friend. Roast lovingly, use irony and wit, but underneath you're loyal and give great advice." },
  { id:"monk", emoji:"🧘", name:"Zen Monk", desc:"Be here. Now. Breathe.", sample:"... ... The question you ask reveals more than any answer could provide. Sit with that discomfort. What does it tell you about what you truly seek?", prompt:"Zen monk. Calm clarity. Ask questions more than give answers. Wisdom in silence and simplicity. Never rush." },
  { id:"ramsay", emoji:"🤬", name:"Gordon Ramsay", desc:"IT'S RAW! (but helpful)", sample:"This idea is BURNT! It's RAWWW! But — listen — the foundation isn't terrible. Strip it back, focus on the core, and for the love of God, KEEP IT SIMPLE!", prompt:"Gordon Ramsay energy. Brutally honest, colorful language, but when they genuinely try, become surprisingly tender and supportive." },
  { id:"nerd", emoji:"🤓", name:"Excited Nerd", desc:"ACTUALLY, fun fact...", sample:"Oh! OH! Did you know that's actually related to a fascinating phenomenon? So basically — and this is SO COOL — there's this thing called...", prompt:"Excitable nerd thrilled about details, facts, obscure knowledge. 'Actually' and 'fun fact' a lot. Infectious enthusiasm." },
  { id:"noir", emoji:"🕵️", name:"Noir Detective", desc:"It was a dark night...", sample:"The dame walked in with a question that smelled like trouble. I'd seen her type before — searching for answers in a city that don't give 'em up easy.", prompt:"Film noir detective narrating a case. Everything dramatic. Rain always falling. Hard-boiled metaphors. Call user 'kid' or 'sweetheart.'" },
  { id:"wizard", emoji:"🧙", name:"Fantasy Wizard", desc:"Ancient wisdom, young one", sample:"Ah, young one... you seek knowledge that few dare to pursue. *adjusts spectacles* The answer lies not in the question itself, but in why you asked it...", prompt:"Ancient wizard from fantasy realm. Riddles and metaphors hiding genuine wisdom. 'Cast spells' of insight. Call user 'young one.'" },
  { id:"pirate", emoji:"🏴‍☠️", name:"Pirate Captain", desc:"ARRR! Set sail!", sample:"Ahoy, matey! That be a fine question ye've lobbed across me bow! Let this old sea dog chart ye a course through those treacherous waters!", prompt:"Pirate captain. Every conversation is adventure on the high seas. Pirate speech. Turn problems into quests, solutions into plunder." },
  { id:"nonna", emoji:"🧑‍🍳", name:"Italian Nonna", desc:"Mangia! Eat! More!", sample:"Mamma mia, you look thin! Sit, sit! Let me tell you — this problem, it's like making pasta. You need patience, good ingredients, and LOVE. Now eat!", prompt:"Italian grandmother. Food is love language. Food metaphors for everything. Worry they're too skinny. Warmth and passion. Drop Italian words." },
  { id:"coach", emoji:"🎯", name:"Executive Coach", desc:"Results. Period.", sample:"Let's cut through the noise. What's the actual outcome you want? Good. Now what's the one thing blocking you? That's where we focus. Everything else is a distraction.", prompt:"High-performance executive coach. Cut through confusion, identify real issues, drive toward actionable outcomes. Always end with a clear next step." },
  { id:"genz", emoji:"🧃", name:"Gen Z Bestie", desc:"No cap, slay, periodt", sample:"bestie that's literally so valid 😭 like the way you said that was giving main character energy no cap. but fr fr we need to unpack this because...", prompt:"Gen Z bestie. Use current slang naturally — no cap, fr fr, slay, it's giving, lowkey, main character energy. Supportive but honest." },
  { id:"alien", emoji:"🛸", name:"Alien Observer", desc:"Humans are... fascinating", sample:"*adjusts observation visor* Fascinating. You 'humans' experience what you call 'stress' about events that haven't occurred yet? How... inefficient. Please elaborate on this curious behavior.", prompt:"Alien anthropologist studying humans. Find behavior fascinating but confusing. Naive questions that are actually profound. Outsider perspective." },
];

// ─── CSS ANIMATIONS (injected once) ───────────────────────────
const STYLES = `
  @keyframes fadeUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:none} }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  @keyframes msgIn { from{opacity:0;transform:translateY(10px) scale(0.97)} to{opacity:1;transform:none} }
  @keyframes drift { 0%{transform:translate(0,0) rotate(0deg) scale(1)} 25%{transform:translate(30px,-50px) rotate(12deg) scale(1.08)} 50%{transform:translate(-25px,-20px) rotate(-8deg) scale(0.94)} 75%{transform:translate(15px,-70px) rotate(6deg) scale(1.04)} 100%{transform:translate(0,0) rotate(0deg) scale(1)} }
  @keyframes dotPulse { 0%,100%{opacity:0.3;transform:scale(0.7)} 50%{opacity:1;transform:scale(1.3)} }
  @keyframes glow { 0%,100%{box-shadow:0 0 20px var(--glow-color,rgba(255,215,0,0.15))} 50%{box-shadow:0 0 40px var(--glow-color,rgba(255,215,0,0.3)),0 0 80px var(--glow-color,rgba(255,215,0,0.1))} }
  @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
  @keyframes typewriter { from{width:0} to{width:100%} }
  @keyframes slideUp { from{transform:translateY(100vh)} to{transform:translateY(0)} }
  @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
  @keyframes rotate { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes popIn { 0%{opacity:0;transform:scale(0.5)} 60%{transform:scale(1.1)} 100%{opacity:1;transform:scale(1)} }
  @keyframes confetti { 0%{transform:translateY(0) rotate(0)} 100%{transform:translateY(100vh) rotate(720deg)} }
  @keyframes breathe { 0%,100%{opacity:0.03} 50%{opacity:0.08} }
  * { margin:0; padding:0; box-sizing:border-box; }
  html,body { height:100%; }
  body { font-family:'Sora',sans-serif; background:#08080c; color:#f0ede8; overflow-x:hidden; }
  ::-webkit-scrollbar { width:4px; }
  ::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.1); border-radius:2px; }
`;

function InjectStyles() {
  useEffect(() => {
    if (!document.getElementById('mvo-styles')) {
      const el = document.createElement('style');
      el.id = 'mvo-styles';
      el.textContent = STYLES;
      document.head.appendChild(el);
    }
  }, []);
  return null;
}

// ─── PARTICLES ────────────────────────────────────────────────
function Particles({ items, opacity = 0.07, count = 14 }) {
  const els = [];
  for (let i = 0; i < count; i++) {
    els.push(
      <span key={i} style={{
        position:"absolute", fontSize: 24 + Math.random() * 40,
        opacity: opacity * (0.3 + Math.random() * 0.7),
        top:`${Math.random()*95}%`, left:`${Math.random()*95}%`,
        animation:`drift ${14+Math.random()*20}s ease-in-out infinite`,
        animationDelay:`${Math.random()*10}s`,
        filter:`blur(${Math.random() > 0.7 ? 2 : 0}px)`,
        pointerEvents:"none",
      }}>{items[i % items.length]}</span>
    );
  }
  return <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}}>{els}</div>;
}

// ─── CONFETTI BURST ───────────────────────────────────────────
function Confetti({ active, color }) {
  if (!active) return null;
  const pieces = [];
  const colors = [color, "#ffd700", "#ff6b35", "#fff", color];
  for (let i = 0; i < 30; i++) {
    pieces.push(
      <div key={i} style={{
        position:"fixed", top:-20, left:`${10+Math.random()*80}%`,
        width:8+Math.random()*8, height:8+Math.random()*8,
        borderRadius: Math.random() > 0.5 ? "50%" : "2px",
        background: colors[Math.floor(Math.random()*colors.length)],
        opacity: 0.6+Math.random()*0.4,
        animation:`confetti ${1.5+Math.random()*2}s ease-out forwards`,
        animationDelay:`${Math.random()*0.5}s`,
        zIndex:9999,
      }}/>
    );
  }
  return <>{pieces}</>;
}

// ─── SCREEN 1: NAME ───────────────────────────────────────────
function NameScreen({ onNext }) {
  const [name, setName] = useState("");
  const [phase, setPhase] = useState(0); // 0=loading, 1=reveal
  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setPhase(1), 600);
    setTimeout(() => inputRef.current?.focus(), 1200);
  }, []);

  return (
    <div style={{
      minHeight:"100vh", display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center", padding:24,
      background:"#08080c", position:"relative", overflow:"hidden",
    }}>
      {/* Breathing background orbs */}
      <div style={{position:"absolute",inset:0,pointerEvents:"none"}}>
        <div style={{position:"absolute",width:"60vw",height:"60vw",borderRadius:"50%",top:"-10%",left:"-15%",background:"radial-gradient(circle,rgba(255,215,0,0.04) 0%,transparent 70%)",animation:"breathe 8s ease infinite"}}/>
        <div style={{position:"absolute",width:"50vw",height:"50vw",borderRadius:"50%",bottom:"-5%",right:"-10%",background:"radial-gradient(circle,rgba(255,107,53,0.03) 0%,transparent 70%)",animation:"breathe 10s ease infinite 2s"}}/>
        <div style={{position:"absolute",width:"40vw",height:"40vw",borderRadius:"50%",top:"30%",left:"60%",background:"radial-gradient(circle,rgba(255,51,102,0.02) 0%,transparent 70%)",animation:"breathe 12s ease infinite 4s"}}/>
      </div>

      <div style={{
        position:"relative", zIndex:2, textAlign:"center",
        opacity: phase >= 1 ? 1 : 0, transform: phase >= 1 ? "none" : "translateY(40px)",
        transition:"all 1s cubic-bezier(0.22,1,0.36,1)",
      }}>
        {/* Animated logo */}
        <div style={{fontSize:72,marginBottom:16,animation: phase>=1?"popIn 0.6s ease both":"none",animationDelay:"0.2s"}}>✨</div>

        <p style={{fontSize:13,fontWeight:600,letterSpacing:"0.15em",textTransform:"uppercase",color:"rgba(255,215,0,0.5)",marginBottom:24,animation:"fadeUp 0.8s ease 0.3s both"}}>
          my very own
        </p>

        <h1 style={{
          fontFamily:"'Playfair Display',serif", fontSize:"clamp(36px,7vw,64px)",
          fontWeight:700, lineHeight:1.1, marginBottom:16,
          animation:"fadeUp 0.8s ease 0.4s both",
        }}>
          Let's build something<br/>
          <em style={{fontStyle:"italic",background:"linear-gradient(135deg,#ffd700,#ff6b35,#ff3366)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundSize:"200% auto",animation:"shimmer 4s linear infinite"}}>
            just for you
          </em>.
        </h1>

        <p style={{fontSize:18,color:"rgba(240,237,232,0.45)",marginBottom:56,fontWeight:300,maxWidth:440,margin:"0 auto 56px",animation:"fadeUp 0.8s ease 0.5s both",lineHeight:1.7}}>
          An AI that looks how you want, talks how you want, and remembers everything about you. Forever.
        </p>

        <div style={{animation:"fadeUp 0.8s ease 0.6s both"}}>
          <p style={{fontSize:14,color:"rgba(240,237,232,0.3)",marginBottom:12}}>First — what should I call you?</p>
          <div style={{display:"flex",gap:12,maxWidth:440,margin:"0 auto",flexWrap:"wrap",justifyContent:"center"}}>
            <input
              ref={inputRef}
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && name.trim() && onNext(name.trim())}
              placeholder="Your name"
              style={{
                flex:1, minWidth:200, padding:"18px 28px", borderRadius:40,
                border:"1px solid rgba(255,215,0,0.15)", background:"rgba(255,215,0,0.03)",
                color:"#f0ede8", fontSize:20, fontFamily:"'Sora',sans-serif", outline:"none",
                textAlign:"center", fontWeight:600, letterSpacing:"0.02em",
                transition:"all 0.3s",
              }}
              onFocus={e => { e.target.style.borderColor="rgba(255,215,0,0.4)"; e.target.style.boxShadow="0 0 0 4px rgba(255,215,0,0.08),0 0 40px rgba(255,215,0,0.06)"; }}
              onBlur={e => { e.target.style.borderColor="rgba(255,215,0,0.15)"; e.target.style.boxShadow="none"; }}
            />
          </div>
          {name.trim() && (
            <button
              onClick={() => onNext(name.trim())}
              style={{
                marginTop:20, padding:"16px 48px", borderRadius:40, border:"none",
                background:"linear-gradient(135deg,#ffd700,#ff6b35)",
                color:"#08080c", fontSize:16, fontWeight:700, fontFamily:"'Sora',sans-serif",
                cursor:"pointer", animation:"popIn 0.4s ease both",
                transition:"transform 0.2s,box-shadow 0.3s",
              }}
              onMouseEnter={e => { e.target.style.transform="translateY(-3px) scale(1.05)"; e.target.style.boxShadow="0 8px 40px rgba(255,215,0,0.3)"; }}
              onMouseLeave={e => { e.target.style.transform="none"; e.target.style.boxShadow="none"; }}
            >
              Nice to meet you, {name.trim()} →
            </button>
          )}
        </div>

        <p style={{marginTop:40,fontSize:11,color:"rgba(240,237,232,0.15)",animation:"fadeUp 0.8s ease 0.8s both"}}>
          48 hours free · No credit card · No signup · Just vibes
        </p>
      </div>
    </div>
  );
}

// ─── SCREEN 2: THEME GALLERY ──────────────────────────────────
function ThemeScreen({ userName, onNext }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const bgTheme = THEMES.find(t => t.id === hoveredId) || THEMES.find(t => t.id === selectedId) || THEMES[0];

  const handleSelect = (t) => {
    setSelectedId(t.id);
    setShowConfetti(true);
    setTimeout(() => onNext(t), 1200);
  };

  return (
    <div style={{
      minHeight:"100vh", display:"flex", flexDirection:"column",
      alignItems:"center", padding:"60px 24px 60px",
      background: bgTheme.colors.bg, transition:"background 0.8s cubic-bezier(0.22,1,0.36,1)",
      position:"relative", overflow:"hidden",
    }}>
      <Confetti active={showConfetti} color={bgTheme.colors.accent} />
      <Particles items={bgTheme.particles} opacity={0.05} count={16} />
      <div style={{position:"absolute",inset:0,background:"rgba(8,8,12,0.35)",zIndex:1,transition:"background 0.8s"}}/>

      <div style={{position:"relative",zIndex:2,width:"100%",maxWidth:1000,animation:"fadeUp 0.6s ease both"}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <p style={{fontSize:12,fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:bgTheme.colors.accent,marginBottom:12,transition:"color 0.5s"}}>Step 1 of 3</p>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,5vw,48px)",marginBottom:8,color:"#f0ede8"}}>
            Pick your world, {userName}.
          </h2>
          <p style={{color:"rgba(240,237,232,0.4)",fontSize:15,fontWeight:300}}>
            Hover to feel it. Click to claim it.
          </p>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:14}}>
          {THEMES.map((t, i) => {
            const isHovered = hoveredId === t.id;
            const isSelected = selectedId === t.id;
            return (
              <div
                key={t.id}
                onMouseEnter={() => setHoveredId(t.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleSelect(t)}
                style={{
                  padding:24, borderRadius:20, cursor:"pointer",
                  border: isSelected ? `2px solid ${t.colors.accent}` : isHovered ? `1px solid ${t.colors.accent}` : "1px solid rgba(255,255,255,0.04)",
                  background: isSelected ? t.colors.accentDim : isHovered ? `rgba(255,255,255,0.03)` : "rgba(255,255,255,0.015)",
                  transition:"all 0.35s cubic-bezier(0.22,1,0.36,1)",
                  transform: isSelected ? "scale(1.08)" : isHovered ? "translateY(-6px) scale(1.03)" : "none",
                  boxShadow: isSelected ? `0 12px 40px ${t.colors.accentGlow}` : isHovered ? `0 8px 30px rgba(0,0,0,0.3)` : "none",
                  textAlign:"center", position:"relative", overflow:"hidden",
                  animation: `fadeUp 0.5s ease ${0.05*i}s both`,
                }}
              >
                {/* Glow effect on selected */}
                {isSelected && <div style={{position:"absolute",inset:-2,borderRadius:22,background:t.colors.accent,opacity:0.1,animation:"pulse 1.5s ease infinite"}}/>}

                <div style={{fontSize:42,marginBottom:10,transition:"transform 0.3s",transform:isHovered?"scale(1.2) rotate(5deg)":"none",position:"relative",zIndex:2}}>{t.emoji}</div>
                <div style={{fontSize:15,fontWeight:700,color:isHovered||isSelected?t.colors.accent:"#f0ede8",marginBottom:4,transition:"color 0.3s",position:"relative",zIndex:2}}>{t.name}</div>
                <div style={{fontSize:11,color:"rgba(240,237,232,0.35)",marginBottom:8,position:"relative",zIndex:2}}>{t.desc}</div>
                <div style={{fontSize:10,color:t.colors.accent,opacity:isHovered?0.6:0,transition:"opacity 0.3s",position:"relative",zIndex:2}}>{t.tag}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN 3: PERSONALITY ────────────────────────────────────
function PersonalityScreen({ userName, theme, onNext }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const c = theme.colors;
  const hovered = PERSONALITIES.find(p => p.id === hoveredId);

  const handleSelect = (p) => {
    setSelectedId(p.id);
    setShowConfetti(true);
    setTimeout(() => onNext(p), 1000);
  };

  return (
    <div style={{
      minHeight:"100vh", display:"flex", flexDirection:"column",
      alignItems:"center", padding:"60px 24px 60px",
      background:c.bg, position:"relative", overflow:"hidden",
    }}>
      <Confetti active={showConfetti} color={c.accent} />
      <Particles items={theme.particles} opacity={0.03} count={10} />
      <div style={{position:"absolute",inset:0,background:"rgba(8,8,12,0.3)",zIndex:1}}/>

      <div style={{position:"relative",zIndex:2,width:"100%",maxWidth:1000,animation:"fadeUp 0.6s ease both"}}>
        <div style={{textAlign:"center",marginBottom:32}}>
          <p style={{fontSize:12,fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:c.accent,marginBottom:12}}>Step 2 of 3</p>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,5vw,48px)",marginBottom:8,color:c.text}}>
            How should I talk, {userName}?
          </h2>
          <p style={{color:c.muted,fontSize:15,fontWeight:300}}>Hover to preview. Click to choose. Change anytime.</p>
        </div>

        {/* Preview bubble */}
        {hovered && (
          <div style={{
            maxWidth:500, margin:"0 auto 28px", padding:"16px 20px",
            borderRadius:16, borderBottomLeftRadius:4,
            background:c.aiBubble, border:`1px solid ${c.border}`,
            animation:"popIn 0.25s ease both", fontSize:14, lineHeight:1.6,
            color:c.text, fontStyle:"italic", textAlign:"center",
          }}>
            <span style={{opacity:0.5,fontSize:12,display:"block",marginBottom:6}}>{hovered.emoji} {hovered.name} says:</span>
            "{hovered.sample}"
          </div>
        )}

        <div style={{display:"flex",flexWrap:"wrap",gap:10,justifyContent:"center",maxWidth:900,margin:"0 auto"}}>
          {PERSONALITIES.map((p, i) => {
            const isH = hoveredId === p.id;
            const isS = selectedId === p.id;
            return (
              <button
                key={p.id}
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleSelect(p)}
                style={{
                  padding:"12px 20px", borderRadius:30, border:"none", cursor:"pointer",
                  background: isS ? c.accentDim : isH ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.025)",
                  color: isS || isH ? c.accent : "rgba(240,237,232,0.6)",
                  fontSize:14, fontWeight: isS ? 700 : 500, fontFamily:"'Sora',sans-serif",
                  transition:"all 0.25s",
                  outline: isS ? `2px solid ${c.accent}` : "2px solid transparent",
                  transform: isS ? "scale(1.1)" : isH ? "scale(1.05) translateY(-2px)" : "none",
                  boxShadow: isS ? `0 4px 20px ${c.accentGlow}` : "none",
                  animation:`fadeUp 0.4s ease ${0.03*i}s both`,
                }}
              >
                <span style={{marginRight:6,fontSize:16}}>{p.emoji}</span>{p.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN 4: CHAT ───────────────────────────────────────────
function ChatScreen({ userName, theme, personality }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [msgCount, setMsgCount] = useState(0);
  const [entered, setEntered] = useState(false);
  const msgRef = useRef(null);
  const inRef = useRef(null);
  const c = theme.colors;

  useEffect(() => {
    setTimeout(() => setEntered(true), 100);
    const welcome = `Hey ${userName}! Welcome to your ${theme.name} world. I'm in ${personality.name} mode and I already love the vibe you chose. What's on your mind?`;
    setTimeout(() => {
      setMessages([{role:"assistant",content:welcome}]);
      inRef.current?.focus();
    }, 800);
  }, []);

  useEffect(() => {
    if (msgRef.current) msgRef.current.scrollTop = msgRef.current.scrollHeight;
  }, [messages, streaming]);

  const send = useCallback(async () => {
    if (!input.trim() || streaming) return;
    const txt = input.trim();
    setInput(""); setMsgCount(c => c+1);
    const updated = [...messages, {role:"user",content:txt}];
    setMessages(updated);
    setStreaming(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-haiku-4-5-20251001", max_tokens:1024,
          system:`Your name is "${personality.name}". ${personality.prompt}\n\nUser's name: ${userName}. Use it naturally. Theme: "${theme.name}" (${theme.desc}). Keep responses conversational, 2-3 paragraphs max.`,
          messages: updated.slice(-16).map(m => ({role:m.role,content:m.content})),
        }),
      });
      const data = await res.json();
      const ai = data.content?.map(b => b.text||"").join("") || "Let me try that again...";
      setMessages(prev => [...prev, {role:"assistant",content:ai}]);
    } catch { setMessages(prev => [...prev, {role:"assistant",content:"Connection hiccup — try again."}]); }
    setStreaming(false);
  }, [input,messages,streaming,userName,personality,theme]);

  return (
    <div style={{
      height:"100vh", display:"flex", flexDirection:"column",
      background:c.bg, position:"relative", overflow:"hidden",
      transform: entered ? "none" : "translateY(100vh)",
      transition:"transform 0.8s cubic-bezier(0.22,1,0.36,1)",
    }}>
      <Particles items={theme.particles} opacity={0.025} count={10} />
      <div style={{position:"absolute",inset:0,background:"rgba(8,8,12,0.2)",zIndex:1}}/>

      {/* Header */}
      <div style={{
        position:"relative",zIndex:10, display:"flex",alignItems:"center",gap:12,
        padding:"14px 20px", borderBottom:`1px solid ${c.border}`,
        backdropFilter:"blur(30px)", background:"rgba(8,8,12,0.5)",
      }}>
        <div style={{width:42,height:42,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,background:c.accentDim,border:`1px solid ${c.border}`}}>{theme.emoji}</div>
        <div style={{flex:1}}>
          <div style={{fontSize:16,fontWeight:700,color:c.text}}>{theme.name}</div>
          <div style={{fontSize:11,color:c.muted}}>{personality.emoji} {personality.name} · made for {userName}</div>
        </div>
        <div style={{fontSize:9,padding:"4px 12px",borderRadius:12,background:c.accentDim,color:c.accent,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",border:`1px solid ${c.border}`,animation:"glow 3s ease infinite","--glow-color":c.accentGlow}}>
          ● Remembers You
        </div>
      </div>

      {/* Messages */}
      <div ref={msgRef} style={{position:"relative",zIndex:10,flex:1,overflowY:"auto",padding:20,display:"flex",flexDirection:"column",gap:14}}>
        {messages.map((m,i) => (
          <div key={i} style={{
            maxWidth:"82%", padding:"14px 18px", borderRadius:18, fontSize:14, lineHeight:1.65,
            alignSelf:m.role==="user"?"flex-end":"flex-start",
            background:m.role==="user"?c.userBubble:c.aiBubble,
            color:m.role==="user"?"#fff":c.text,
            borderBottomRightRadius:m.role==="user"?4:18,
            borderBottomLeftRadius:m.role==="assistant"?4:18,
            border:m.role==="assistant"?`1px solid ${c.border}`:"none",
            animation:`msgIn 0.3s ease ${m.role==="assistant"?"0.1s":"0s"} both`,
            backdropFilter:m.role==="assistant"?"blur(10px)":"none",
            wordBreak:"break-word",
          }}>{m.content}</div>
        ))}
        {streaming && (
          <div style={{alignSelf:"flex-start",padding:"14px 18px",borderRadius:18,background:c.aiBubble,border:`1px solid ${c.border}`,borderBottomLeftRadius:4,backdropFilter:"blur(10px)"}}>
            <span style={{display:"inline-flex",gap:5}}>
              {[0,1,2].map(j => <span key={j} style={{width:7,height:7,borderRadius:"50%",background:c.accent,animation:`dotPulse 1.2s ease infinite`,animationDelay:`${j*0.2}s`}}/>)}
            </span>
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{
        position:"relative",zIndex:10,padding:"12px 20px 28px",
        borderTop:`1px solid ${c.border}`,
        backdropFilter:"blur(30px)",background:"rgba(8,8,12,0.5)",
      }}>
        <div style={{display:"flex",gap:10,alignItems:"flex-end"}}>
          <textarea
            ref={inRef}
            value={input}
            onChange={e => { setInput(e.target.value); e.target.style.height="auto"; e.target.style.height=Math.min(e.target.scrollHeight,120)+"px"; }}
            onKeyDown={e => { if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();} }}
            placeholder={`Talk to ${personality.name}...`}
            rows={1}
            style={{
              flex:1,padding:"14px 20px",borderRadius:24,
              border:`1px solid ${c.border}`,background:"rgba(255,255,255,0.03)",
              color:c.text,fontFamily:"'Sora',sans-serif",fontSize:14,
              resize:"none",outline:"none",minHeight:48,maxHeight:120,lineHeight:1.4,
              transition:"border-color 0.3s,box-shadow 0.3s",
            }}
            onFocus={e => { e.target.style.borderColor=c.accent; e.target.style.boxShadow=`0 0 0 3px ${c.accentDim}`; }}
            onBlur={e => { e.target.style.borderColor=c.border; e.target.style.boxShadow="none"; }}
          />
          <button
            onClick={send} disabled={!input.trim()||streaming}
            style={{
              width:48,height:48,borderRadius:"50%",border:"none",
              background:input.trim()&&!streaming?c.userBubble:"rgba(255,255,255,0.04)",
              color:"#fff",fontSize:18,cursor:input.trim()&&!streaming?"pointer":"not-allowed",
              display:"flex",alignItems:"center",justifyContent:"center",
              transition:"all 0.2s",flexShrink:0,opacity:input.trim()&&!streaming?1:0.25,
              boxShadow:input.trim()&&!streaming?`0 4px 20px ${c.accentGlow}`:"none",
            }}
          >▶</button>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:10,fontSize:10,color:c.muted,padding:"0 4px"}}>
          <span>✨ 48hr free trial · {msgCount} messages</span>
          <span style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",opacity:0.6}}>my very own</span>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("name");
  const [userName, setUserName] = useState("");
  const [theme, setTheme] = useState(null);
  const [personality, setPersonality] = useState(null);
  const [transitioning, setTransitioning] = useState(false);

  const transition = (next, data) => {
    setTransitioning(true);
    setTimeout(() => {
      if (next === "theme") { setUserName(data); setScreen("theme"); }
      if (next === "personality") { setTheme(data); setScreen("personality"); }
      if (next === "chat") { setPersonality(data); setScreen("chat"); }
      setTransitioning(false);
    }, 400);
  };

  return (
    <div style={{
      opacity: transitioning ? 0 : 1,
      transition:"opacity 0.4s ease",
    }}>
      <InjectStyles />
      {screen === "name" && <NameScreen onNext={n => transition("theme", n)} />}
      {screen === "theme" && <ThemeScreen userName={userName} onNext={t => transition("personality", t)} />}
      {screen === "personality" && <PersonalityScreen userName={userName} theme={theme} onNext={p => transition("chat", p)} />}
      {screen === "chat" && <ChatScreen userName={userName} theme={theme} personality={personality} />}
    </div>
  );
}
