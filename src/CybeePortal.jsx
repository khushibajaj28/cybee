import React, { useEffect, useRef, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  AudioLines,
  BadgeCheck,
  Bell,
  CheckCircle2,
  ChevronDown,
  Clock,
  Copy,
  Database,
  Download,
  ExternalLink,
  Eye,
  FileCheck2,
  FileSearch,
  FileText,
  Fingerprint,
  Globe,
  History,
  Home,
  Image,
  KeyRound,
  Link2,
  Lock,
  LogOut,
  Mail,
  MessageSquare,
  Mic,
  Moon,
  Phone,
  Radar,
  RefreshCw,
  Scan,
  Search,
  Send,
  Server,
  Settings,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Sun,
  Timer,
  Trash2,
  TrendingUp,
  Upload,
  User,
  UserCheck,
  UserCircle,
  Users,
  Video,
  X,
  Zap,
} from 'lucide-react';

const LOGO_URL = "cybee-logo.png"; // Replace with your local asset path like ./assets/logo.png

const NAV_LINKS = [
  { view: 'home', label: 'Home', icon: Home },
  { view: 'check', label: 'Check Media & Links', icon: Scan },
  { view: 'saved', label: 'Saved Checks', icon: History },
  { view: 'alerts', label: 'Scam Alerts', icon: Radar },
  { view: 'reports', label: 'My Reports & PDFs', icon: FileText },
  { view: 'settings', label: 'Settings', icon: Settings },
];

const ADMIN_NAV = [
  { view: 'monitor', label: 'Live System Monitor', icon: Activity },
  { view: 'moderation', label: 'Scam Moderation Queue', icon: ShieldAlert },
  { view: 'registry', label: 'Global Threat Registry', icon: Database },
  { view: 'dossier', label: 'Audit & Legal Dossier', icon: FileSearch },
];

const SCAN_TABS = [
  { id: 'video', label: 'Video', icon: Video, accept: '.mp4,.mov' },
  { id: 'photo', label: 'Photo', icon: Image, accept: '.jpg,.jpeg,.png,.webp' },
  { id: 'audio', label: 'Voice Note', icon: AudioLines, accept: '.mp3,.wav,.m4a' },
  { id: 'link', label: 'Web Link', icon: Link2 },
  { id: 'message', label: 'Message / SMS', icon: MessageSquare },
];

const DEFAULT_FILES = {
  video: { name: 'politician_speech_clip.mp4', size: '14.2 MB' },
  photo: { name: 'id_card_proof.jpg', size: '3.1 MB' },
  audio: { name: 'whatsapp_voice_note.wav', size: '1.8 MB' },
};

const METRICS = [
  {
    label: 'Total Checks Done',
    value: '4,820',
    delta: '+12% this week',
    icon: Scan,
    tone: 'text-cyan-600 bg-cyan-50',
  },
  {
    label: 'Fake Videos & Scams Stopped',
    value: '412',
    delta: 'High Risk Flags',
    icon: AlertTriangle,
    tone: 'text-red-600 bg-red-50',
  },
  {
    label: 'Instant Viral Scam Check',
    value: '84.2%',
    delta: 'No wait time on repeat checks',
    icon: Zap,
    tone: 'text-emerald-600 bg-emerald-50',
  },
  {
    label: 'Average Scan Time',
    value: '1.4s',
    delta: 'Super fast processing',
    icon: Timer,
    tone: 'text-amber-600 bg-amber-50',
  },
];

const FINDINGS = [
  {
    title: 'Face Swap / Fake Video Warning',
    detail: '84.6% mismatch',
    note: 'Unnatural face blending detected',
    icon: Eye,
    tone: 'text-red-600 bg-red-50',
  },
  {
    title: 'Facial Movement',
    detail: 'High anomaly',
    note: 'Unsteady eye & lip sync detected',
    icon: Fingerprint,
    tone: 'text-amber-600 bg-amber-50',
  },
  {
    title: 'Fake / Cloned Voice Match',
    detail: '72.1% match',
    note: 'Voice sounds computer-generated',
    icon: Mic,
    tone: 'text-red-600 bg-red-50',
  },
];

const FEED = [
  { name: "Viral 'Free Mobile Recharge' Link", category: 'Phishing Link', risk: 'Malicious', time: '2 min ago' },
  { name: 'Fake Celebrity Voice Call', category: 'Voice Cloning', risk: 'Suspicious', time: '19 min ago' },
  { name: 'AI-Created Shopping Giveaway', category: 'Deepfake Media', risk: 'Malicious', time: '46 min ago' },
  { name: "Bank 'KYC Update' SMS", category: 'SMS Scam', risk: 'Suspicious', time: '1 hr ago' },
  { name: 'Local News Fake Audio Clip', category: 'Fake Audio', risk: 'Safe', time: '3 hrs ago' },
];

const ALERTS = [
  {
    name: "Viral 'Free Mobile Recharge' Link",
    category: 'Phishing Link',
    risk: 'Malicious',
    time: '2 min ago',
    desc: 'Links claiming instant recharge credits redirect to fake OTP harvesting pages.',
  },
  {
    name: "'AI Hackathon Prize' Fake Registration",
    category: 'Fake Event Scam',
    risk: 'Suspicious',
    time: '12 min ago',
    desc: 'A viral hackathon post asks students to pay a "refundable registration fee" to a personal number.',
  },
  {
    name: 'Fake Celebrity Voice Call',
    category: 'Voice Cloning',
    risk: 'Malicious',
    time: '19 min ago',
    desc: 'Cloned voice of a celebrity demanding urgent money — no media proof shown.',
  },
  {
    name: "'Electricity Bill Due' Voice Scam",
    category: 'Phone Scam',
    risk: 'Suspicious',
    time: '33 min ago',
    desc: 'Robo-call threatens power cut unless payment is made over the call.',
  },
  {
    name: "Bank 'KYC Update' SMS",
    category: 'SMS Scam',
    risk: 'Suspicious',
    time: '1 hr ago',
    desc: 'SMS asks to click a link to "avoid account suspension" — spoofed sender ID.',
  },
  {
    name: 'Local News Fake Audio Clip',
    category: 'Fake Audio',
    risk: 'Safe',
    time: '3 hrs ago',
    desc: 'Audio clip was manually verified — original broadcast matched.',
  },
];

const SAVED_SCANS = [
  { id: 'SCAN-2026-9F81E7', name: 'politician_speech_clip.mp4', type: 'Video', risk: 'Malicious', score: 78, date: '22 Sep 2026' },
  { id: 'SCAN-2026-8A21C4', name: 'celebrity_voice_note.wav', type: 'Voice Note', risk: 'Suspicious', score: 56, date: '21 Sep 2026' },
  { id: 'SCAN-2026-7D19B2', name: 'https://free-recharge-win.xyz/offer', type: 'Web Link', risk: 'Malicious', score: 91, date: '20 Sep 2026' },
  { id: 'SCAN-2026-6F04A8', name: "Bank 'KYC Update' message", type: 'Message / SMS', risk: 'Suspicious', score: 47, date: '19 Sep 2026' },
  { id: 'SCAN-2026-5C77E1', name: 'festival_offer_photo.jpg', type: 'Photo', risk: 'Safe', score: 12, date: '18 Sep 2026' },
  { id: 'SCAN-2026-4B90D7', name: 'wedding_invite_card.png', type: 'Photo', risk: 'Safe', score: 6, date: '17 Sep 2026' },
];

const ACTIVITY_TEMPLATES = [
  'Citizen #982 verified Phishing URL — Blocked instantly',
  'Citizen #1107 verified Face Swap / Deepfake Video — Alert pushed',
  'Citizen #021 confirmed Fake / Cloned Voice — Blocked instantly',
  'Citizen #763 verified Dangerous Fake Website — Blocked instantly',
  'Citizen #451 confirmed Fake Student Opportunity — Alert pushed',
  'Citizen #220 verified Fake SMS Scam — Blocked instantly',
];

const QUEUE = [
  { id: 'REP-2034', type: 'Video', label: 'Scan_File_#482.mp4', threat: 'Face Swap / Fake Video', by: 'Citizen #1107', status: null },
  { id: 'REP-2035', type: 'Link', label: 'hackathon-prize-register.site', threat: 'Dangerous Fake Website', by: 'Citizen #982', status: null },
  { id: 'REP-2036', type: 'Voice Note', label: 'Scan_File_#491.wav', threat: 'Fake / Cloned Voice', by: 'Citizen #451', status: null },
  { id: 'REP-2037', type: 'Message', label: 'Scan_File_#499.txt', threat: 'Fake SMS / Message', by: 'Citizen #021', status: null },
];

const REGISTRY = [
  { value: 'a4f1c0d9e2b4f8a1c3d5e7f9a2b4c6d8e0f1a3b5c7d9e1f2a4b6c8d0e2f4a6b8', type: 'SHA-256 Hash', added: '12:41 pm' },
  { value: 'https://free-recharge-win.xyz/offer', type: 'Scam Link', added: '12:38 pm' },
  { value: 'fee-refund.hub.ac.in', type: 'Fake College Link', added: '11:56 am' },
];

const RISK_STYLES = {
  Safe: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Suspicious: 'bg-amber-50 text-amber-700 border-amber-200',
  Malicious: 'bg-red-50 text-red-700 border-red-200',
};

const SCORE_STYLES = {
  Safe: 'text-emerald-600',
  Suspicious: 'text-amber-600',
  Malicious: 'text-red-600',
};

const SCORE_BARS = {
  Safe: 'bg-emerald-500',
  Suspicious: 'bg-amber-500',
  Malicious: 'bg-red-500',
};

function RiskPill({ level }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${RISK_STYLES[level]}`}
    >
      {level === 'Safe' ? (
        <CheckCircle2 className="h-3.5 w-3.5" />
      ) : level === 'Suspicious' ? (
        <AlertTriangle className="h-3.5 w-3.5" />
      ) : (
        <X className="h-3.5 w-3.5" />
      )}
      {level}
    </span>
  );
}

const QR_BITS = Array.from({ length: 21 }, (_, y) =>
  Array.from(
    { length: 21 },
    (_, x) =>
      (x === 0 || y === 0 || x === 20 || y === 20 || (x < 7 && y < 7 && (x * 2 + y) % 3 !== 0) || ((x * 11 + y * 7 + x * y * 3) % 9) === 0 || x === 10 || y === 10 ? 1 : 0)
  ).join('')
);

function QRCode({ className = 'h-16 w-16' }) {
  return (
    <svg viewBox="0 0 42 42" className={className} aria-hidden="true">
      {QR_BITS.map((row, y) =>
        row.split('').map((b, x) =>
          b === '1' ? (
            <rect key={`${x}-${y}`} x={x * 2} y={y * 2} width="2" height="2" className="fill-slate-900" />
          ) : null
        )
      )}
    </svg>
  );
}

function Stamp({ label = 'CYBEE' }) {
  return (
    <div className="flex h-16 w-16 -rotate-12 items-center justify-center rounded-full border-[3px] border-dashed border-emerald-500 text-center">
      <span className="px-1 text-[9px] font-black uppercase leading-tight tracking-wider text-emerald-600">
        {label}
        <br />
        Verified
      </span>
    </div>
  );
}

function SafetyGauge({ value = 78 }) {
  const radius = 80;
  const circumference = Math.PI * radius;
  const filled = circumference * (value / 100);
  const gaugeColor = value >= 70 ? '#EF4444' : value >= 40 ? '#F59E0B' : '#10B981';

  return (
    <div className="relative mx-auto h-32 w-56">
      <svg viewBox="0 0 200 132" className="h-full w-full">
        <path
          d="M20 100 A80 80 0 0 1 180 100"
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="18"
          strokeLinecap="round"
        />
        <path
          d="M20 100 A80 80 0 0 1 180 100"
          fill="none"
          stroke={gaugeColor}
          strokeWidth="18"
          strokeLinecap="round"
          strokeDasharray={`${Math.max(filled - 4, 4)} ${circumference}`}
          style={{ filter: `drop-shadow(0 0 6px ${gaugeColor})` }}
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 text-center">
        <div className="text-4xl font-black" style={{ color: gaugeColor }}>
          {value}%
        </div>
        <div className="text-[11px] font-medium uppercase tracking-widest text-slate-400">
          Safety Result
        </div>
      </div>
    </div>
  );
}

function CircuitBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#00E5FF]/25 blur-[120px]" />
      <div className="absolute -bottom-24 right-4 h-72 w-72 rounded-full bg-cyan-500/20 blur-[130px]" />
      <svg
        className="absolute inset-0 h-full w-full text-[#00E5FF]/25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <path d="M40 180 H 130 V 110 H 240 L 300 60" />
        <circle cx="40" cy="180" r="3.5" fill="currentColor" stroke="none" />
        <circle cx="240" cy="110" r="3.5" fill="currentColor" stroke="none" />
        <circle cx="300" cy="60" r="3.5" fill="currentColor" stroke="none" />
        <path d="M360 420 V 330 H 270 V 260 H 190" />
        <circle cx="270" cy="330" r="3.5" fill="currentColor" stroke="none" />
        <circle cx="190" cy="260" r="3.5" fill="currentColor" stroke="none" />
        <path d="M640 60 H 560 V 150 H 460" />
        <circle cx="560" cy="150" r="3.5" fill="currentColor" stroke="none" />
        <circle cx="460" cy="150" r="3.5" fill="currentColor" stroke="none" />
        <path d="M700 400 H 610 V 300 H 520 V 220" />
        <circle cx="610" cy="300" r="3.5" fill="currentColor" stroke="none" />
        <circle cx="520" cy="220" r="3.5" fill="currentColor" stroke="none" />
        <path d="M160 500 H 60" />
        <circle cx="160" cy="500" r="3.5" fill="currentColor" stroke="none" />
        <path d="M660 220 V 260 H 740" />
        <circle cx="660" cy="220" r="3.5" fill="currentColor" stroke="none" />
        <path d="M0 60 L 40 60" />
        <path d="M760 300 L 760 340 H 700" />
      </svg>
      <div className="absolute left-[16%] top-[22%] h-2 w-2 animate-cybee-pulse rounded-full bg-[#00E5FF]" />
      <div className="absolute right-[22%] top-[58%] h-2 w-2 animate-cybee-pulse rounded-full bg-[#00E5FF]" style={{ animationDelay: '0.7s' }} />
      <div className="absolute left-[10%] bottom-[20%] h-1.5 w-1.5 animate-cybee-pulse rounded-full bg-cyan-400" style={{ animationDelay: '1.2s' }} />
    </div>
  );
}

function CyberBackdrop({ dark }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: dark
            ? 'linear-gradient(#00E5FF 1px, transparent 1px), linear-gradient(90deg, #00E5FF 1px, transparent 1px)'
            : 'linear-gradient(rgba(0,160,230,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,160,230,0.08) 1px, transparent 1px)',
          backgroundSize: dark ? '46px 46px' : '24px 24px',
          opacity: dark ? 0.08 : 1,
        }}
      />
      {!dark && (
        <div className="absolute left-[4%] top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[120px]" />
      )}
      <div className={`absolute inset-0 font-mono text-[11px] leading-5 ${dark ? 'text-[#00E5FF]/20' : 'text-[#00E5FF]/25'}`}>
        <div className="absolute left-[3%] top-[26%] animate-cybee-float">00101 11001 01010</div>
        <div className="absolute left-[8%] top-[72%]" style={{ transform: 'rotate(-90deg)' }}>1100100 101 011</div>
        <div className="absolute right-[2%] top-[22%] animate-cybee-float" style={{ animationDelay: '1.1s' }}>0110 1001 101001</div>
        <div className="absolute bottom-[14%] left-[38%]">101 010 01 110</div>
        <div className="absolute right-[30%] bottom-[6%]">0101 0011 1001</div>
      </div>
      <Shield
        className={`absolute -right-12 bottom-4 h-64 w-64 ${dark ? 'text-[#00E5FF]/10' : 'text-[#00E5FF]/10'}`}
        strokeWidth="1"
      />
      <Shield
        className={`absolute -left-16 top-14 h-56 w-56 ${dark ? 'text-[#00E5FF]/10' : 'text-[#00E5FF]/10'}`}
        strokeWidth="1"
      />
    </div>
  );
}

function LoginField({ label, dark, children }) {
  return (
    <div>
      <label
        className={`mb-1.5 block text-xs font-semibold uppercase tracking-wide ${
          dark ? 'text-slate-300' : 'text-slate-500'
        }`}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function LoginCard({ onEnter, dark }) {
  const [mode, setMode] = useState('user');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [showOtp, setShowOtp] = useState(false);
  const [adminId, setAdminId] = useState('');
  const [passkey, setPasskey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const otpRefs = useRef([]);
  const phoneRef = useRef(null);

  useEffect(() => {
    if (phoneRef.current) phoneRef.current.focus();
  }, [mode]);

  const handleOtp = (index, value) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (digit && index < 5) otpRefs.current[index + 1].focus();
    if (digit && index === 5) otpRefs.current[5].blur();
  };

  const onDigitKey = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
      const next = [...otp];
      next[index - 1] = '';
      setOtp(next);
    }
  };

  const verified = phone.replace(/\D/g, '').length >= 10;

  const inputShell = `flex items-center gap-0 overflow-hidden rounded-xl border shadow-sm transition ${
    dark
      ? 'border-white/15 bg-white/[0.06] focus-within:border-[#00E5FF] focus-within:ring-4 focus-within:ring-[#00E5FF]/15'
      : 'border-sky-200 bg-[#F4F9FF] focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-200/50'
  }`;
  const inputText = `w-full bg-transparent px-3 py-3 text-sm font-medium outline-none placeholder:text-slate-400 ${
    dark ? 'text-white' : 'text-slate-800'
  }`;

  return (
    <div
      className={`animate-cybee-rise relative w-full max-w-md rounded-3xl border p-8 lg:p-9 ${
        dark
          ? 'border-white/15 bg-[#0E1630]/75 shadow-[0_30px_80px_-20px_rgba(2,6,23,0.7)] backdrop-blur-xl'
          : 'border-sky-200/80 bg-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-md'
      }`}
      style={{
        backgroundImage: dark
          ? 'linear-gradient(160deg, rgba(11,19,43,0.82), rgba(14,22,48,0.7))'
          : 'linear-gradient(160deg, rgba(255,255,255,0.92), rgba(235,243,252,0.72))',
      }}
    >
      <img
        src={LOGO_URL}
        alt="CYBEE"
        onClick={() => onEnter('citizen')}
        className={`mx-auto mb-2 h-16 w-16 cursor-pointer bg-transparent object-contain drop-shadow-md ${dark ? '' : 'mix-blend-multiply'}`}
      />

      <div className="flex flex-col items-center text-center">
        <h2 className={`text-3xl font-black tracking-[0.35em] ${dark ? 'text-white' : 'text-[#0B132B]'}`}>
          CYBEE
        </h2>
        <p className={`mt-1 text-sm font-medium ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
          AI Media Security & Scam Verification Portal
        </p>
      </div>

      <div
        className={`mb-6 mt-7 grid grid-cols-2 gap-1 rounded-xl p-1 ${
          dark ? 'bg-white/[0.06]' : 'bg-sky-100/80'
        }`}
      >
        <button
          onClick={() => setMode('user')}
          className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
            mode === 'user'
              ? 'bg-white text-[#0B132B] shadow-sm'
              : dark
              ? 'text-slate-300 hover:text-white'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          User Login
        </button>
        <button
          onClick={() => setMode('admin')}
          className={`rounded-lg px-4 py-2 text-sm font-bold transition ${
            mode === 'admin'
              ? 'bg-white text-[#0B132B] shadow-sm'
              : dark
              ? 'text-slate-300 hover:text-white'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Admin Login
        </button>
      </div>

      <div className="space-y-5">
        {mode === 'user' ? (
          <>
            <LoginField dark={dark} label="Mobile Number">
              <div className={inputShell}>
                <span className={`flex items-center gap-1 border-r px-3 py-3 text-sm font-semibold ${dark ? 'border-white/10 bg-white/[0.04] text-slate-200' : 'border-sky-200 bg-slate-100/70 text-slate-600'}`}>
                  <Phone className={`h-4 w-4 ${dark ? 'text-[#00E5FF]' : 'text-[#00E5FF]'}`} /> +91
                </span>
                <input
                  ref={phoneRef}
                  type="tel"
                  value={phone}
                  maxLength={10}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="98765 43210"
                  className={inputText}
                />
                <span className="pr-3">
                  {!showOtp && verified && (
                    <button
                      onClick={() => setShowOtp(true)}
                      className="rounded-lg bg-[#0B132B] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#1e2a5e]"
                    >
                      Send OTP
                    </button>
                  )}
                </span>
              </div>
            </LoginField>

            {showOtp && (
              <div className="animate-cybee-rise">
                <label className={`mb-1.5 block text-xs font-semibold uppercase tracking-wide ${dark ? 'text-slate-300' : 'text-slate-500'}`}>
                  6-Digit OTP
                </label>
                <div className="flex justify-between">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => (otpRefs.current[i] = el)}
                      value={digit}
                      onChange={(e) => handleOtp(i, e.target.value)}
                      onKeyDown={(e) => onDigitKey(i, e)}
                      inputMode="numeric"
                      maxLength={1}
                      className={`h-14 w-12 rounded-xl border text-center text-2xl font-bold shadow-sm outline-none transition focus:border-[#00E5FF] focus:ring-4 focus:ring-[#00E5FF]/15 ${
                        dark ? 'border-white/15 bg-white/[0.05] text-white' : 'border-sky-200 bg-[#F4F9FF] text-[#0B132B]'
                      }`}
                      style={{ caretColor: '#00E5FF' }}
                    />
                  ))}
                </div>
              </div>
            )}

            <p className={`text-right text-[11px] font-medium ${dark ? 'text-slate-400' : 'text-slate-400'}`}>
              New user? Your OTP auto-creates a secure account.
            </p>
          </>
        ) : (
          <>
            <LoginField dark={dark} label="Admin ID">
              <div className={inputShell}>
                <span className={`flex items-center gap-1 border-r px-3 py-3 text-sm font-semibold ${dark ? 'border-white/10 bg-white/[0.04] text-slate-200' : 'border-sky-200 bg-slate-100/70 text-slate-600'}`}>
                  <User className={`h-4 w-4 ${dark ? 'text-[#00E5FF]' : 'text-[#00E5FF]'}`} />
                </span>
                <input
                  type="text"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  placeholder="ADMIN-00X"
                  className={inputText}
                />
              </div>
            </LoginField>

            <LoginField dark={dark} label="Passkey">
              <div className={inputShell}>
                <span className={`flex items-center gap-1 border-r px-3 py-3 text-sm font-semibold ${dark ? 'border-white/10 bg-white/[0.04] text-slate-200' : 'border-sky-200 bg-slate-100/70 text-slate-600'}`}>
                  <KeyRound className={`h-4 w-4 ${dark ? 'text-[#00E5FF]' : 'text-[#00E5FF]'}`} />
                </span>
                <input
                  type={showKey ? 'text' : 'password'}
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                  placeholder="Enter 8-digit security passkey"
                  className={inputText}
                />
                <button
                  onClick={() => setShowKey((v) => !v)}
                  className="pr-3 text-slate-400 transition hover:text-[#00E5FF]"
                  aria-label="Toggle passkey visibility"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </LoginField>

            <div className="flex items-center gap-1.5 rounded-xl border border-cyan-100 bg-cyan-50/60 px-4 py-2.5 text-[11px] font-medium text-cyan-700">
              <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
              Admin console is limited to CYBEE security & moderation staff.
            </div>
          </>
        )}

        <button
          onClick={() => onEnter(mode === 'admin' ? 'admin' : 'citizen')}
          className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#00E5FF] to-cyan-500 px-6 py-3.5 text-sm font-bold tracking-wide text-[#06283D] shadow-[0_10px_30px_-8px_rgba(0,229,255,0.7)] transition hover:brightness-105 active:scale-[0.99]"
        >
          <span
            className="absolute inset-0 -translate-x-full bg-white/30 transition group-hover:translate-x-0"
            style={{ clipPath: 'polygon(0 0, 40% 0, 20% 100%, 0 100%)' }}
          />
          <span className="ml-2 inline-flex items-center gap-2">
            {mode === 'admin' ? <Shield className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
            {mode === 'admin' ? 'Enter Admin Console' : 'Verify & Enter Portal'}
          </span>
        </button>

        <div className={`flex items-center justify-center gap-2 text-center text-xs font-medium ${dark ? 'text-slate-300' : 'text-slate-500'}`}>
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          Protected by Instant Hash Check & Safe Browsing Defense
        </div>
      </div>
    </div>
  );
}

function Onboarding({ onGuest, onCheck, onAlerts, onLogin }) {
  const [dark, setDark] = useState(true);

  return (
    <div
      className={`relative min-h-screen overflow-hidden text-slate-800 ${
        dark ? 'bg-gradient-to-b from-[#070D1B] to-[#0B132B]' : 'bg-gradient-to-br from-[#EBF3FC] via-[#F1F6FD] to-[#E3EEFA]'
      }`}
    >
      <CyberBackdrop dark={dark} />

      <header
        className={`relative z-20 sticky top-0 border-b backdrop-blur-md ${
          dark ? 'border-white/10 bg-[#070D1B]/75' : 'border-sky-200/80 bg-[#EBF3FC]/85'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center">
              <img src={LOGO_URL} alt="CYBEE Logo" className={`h-10 w-10 bg-transparent object-contain ${dark ? '' : 'mix-blend-multiply'}`} />
            </div>
            <div className="leading-tight">
              <div className={`text-base font-black tracking-[0.25em] ${dark ? 'text-white' : 'text-[#0B132B]'}`}>
                CYBEE
              </div>
              <div className={`text-[10px] font-medium ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
                AI Media Security
              </div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            {['Features', 'Detection Engine', 'Scam Radar'].map((l) => (
              <a
                key={l}
                href="#"
                onClick={(e) => e.preventDefault()}
                className={`text-sm font-semibold transition hover:text-[#00E5FF] ${
                  dark ? 'text-slate-200' : 'text-slate-600'
                }`}
              >
                {l}
              </a>
            ))}
            <button
              onClick={() => setDark((v) => !v)}
              className={`flex h-9 w-9 items-center justify-center rounded-xl border transition ${
                dark
                  ? 'border-[#00E5FF]/40 bg-[#00E5FF]/10 text-[#00E5FF]'
                  : 'border-slate-200 bg-white text-slate-600 hover:text-[#00E5FF]'
              }`}
              aria-label="Toggle light / dark mode"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={onGuest}
              className="flex items-center gap-2 rounded-xl bg-[#0B132B] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#16254d]"
            >
              Direct Guest Access <ArrowRight className="h-4 w-4 text-[#00E5FF]" />
            </button>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setDark((v) => !v)}
              className={`flex h-9 w-9 items-center justify-center rounded-xl border ${
                dark ? 'border-[#00E5FF]/40 text-[#00E5FF]' : 'border-slate-200 bg-white text-slate-600'
              }`}
              aria-label="Toggle light / dark mode"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={onGuest}
              className="flex items-center gap-1.5 rounded-xl bg-[#0B132B] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#16254d]"
            >
              Guest Access <ArrowRight className="h-3.5 w-3.5 text-[#00E5FF]" />
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 py-12 lg:grid-cols-2 lg:px-8 lg:py-16">
        <section className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-[11px] font-black tracking-wide text-emerald-700 shadow-sm">
            🟢 LIVE FORENSIC ENGINE ONLINE
          </span>

          <h1
            className={`mt-6 text-4xl font-black leading-[1.1] tracking-tight lg:text-[3.4rem] ${
              dark ? 'text-white' : 'text-slate-900'
            }`}
          >
            CYBEE: AI Media Security &amp; Scam Verification Portal
          </h1>

          <p className={`mt-5 max-w-xl text-base leading-relaxed ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
            Instant forensic detection for deepfakes, synthetic voice clones, malicious URLs,
            and fake student opportunities—backed by verifiable PDF reports and sub-second
            SHA-256 caching.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={onCheck}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00E5FF] to-cyan-500 px-6 py-3.5 text-sm font-black tracking-wide text-[#06283D] shadow-[0_12px_30px_-10px_rgba(0,229,255,0.8)] transition hover:brightness-105 active:scale-[0.99]"
            >
              <Scan className="h-4 w-4" /> Scan Suspicious Media <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={onAlerts}
              className={`flex items-center gap-2 rounded-xl border-2 px-6 py-3 text-sm font-bold transition ${
                dark
                  ? 'border-[#00E5FF]/40 bg-white/[0.04] text-[#00E5FF] hover:bg-white/[0.08]'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-[#00E5FF] hover:text-[#00E5FF]'
              }`}
            >
              <Radar className="h-4 w-4" /> Explore Scam Alerts
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div
              className={`rounded-2xl border p-4 shadow-sm backdrop-blur ${
                dark ? 'border-white/10 bg-white/[0.04]' : 'border-slate-200/90 bg-white/80'
              }`}
            >
              <Sparkles className="h-5 w-5 text-[#00E5FF]" />
              <p className={`mt-2 text-2xl font-black ${dark ? 'text-white' : 'text-[#0B132B]'}`}>100%</p>
              <p className={`text-xs font-semibold ${dark ? 'text-slate-300' : 'text-slate-600'}`}>Open-Source AI</p>
            </div>
            <div
              className={`rounded-2xl border p-4 shadow-sm backdrop-blur ${
                dark ? 'border-white/10 bg-white/[0.04]' : 'border-slate-200/90 bg-white/80'
              }`}
            >
              <Zap className="h-5 w-5 text-[#00E5FF]" />
              <p className={`mt-2 text-2xl font-black ${dark ? 'text-white' : 'text-[#0B132B]'}`}>O(1)</p>
              <p className={`text-xs font-semibold ${dark ? 'text-slate-300' : 'text-slate-600'}`}>Instant Hash Cache</p>
            </div>
            <div
              className={`rounded-2xl border p-4 shadow-sm backdrop-blur ${
                dark ? 'border-white/10 bg-white/[0.04]' : 'border-slate-200/90 bg-white/80'
              }`}
            >
              <Timer className="h-5 w-5 text-[#00E5FF]" />
              <p className={`mt-2 text-2xl font-black ${dark ? 'text-white' : 'text-[#0B132B]'}`}>&lt; 1.4s</p>
              <p className={`text-xs font-semibold ${dark ? 'text-slate-300' : 'text-slate-600'}`}>Average Analysis</p>
            </div>
          </div>
        </section>

        <section className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md">
            <div className={`absolute -inset-5 -z-10 overflow-hidden rounded-[2.5rem] ${dark ? 'opacity-60' : ''}`}>
              <CircuitBackdrop />
            </div>
            <LoginCard dark={dark} onEnter={onLogin} />
          </div>
        </section>
      </main>
    </div>
  );
}

function Sidebar({ activeView, onNavigate, onLogout }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-[264px] flex-col bg-[#0B132B] text-slate-300">
      <div className="flex items-center gap-3 px-6 pb-7 pt-6">
        <div className="flex h-9 w-9 items-center justify-center">
          <img src={LOGO_URL} alt="CYBEE" className="h-9 w-9 object-contain" />
        </div>
        <div>
          <div className="text-lg font-black tracking-[0.3em] text-white">CYBEE</div>
          <div className="text-[10px] font-medium tracking-wide text-slate-400">AI Media Security</div>
        </div>
      </div>

      <div className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Main Menu</div>

      <nav className="mt-2 flex-1 space-y-1 overflow-y-auto px-3">
        {NAV_LINKS.map(({ view, label, icon: Icon }) => {
          const active = activeView === view;
          return (
            <a
              key={view}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigate(view);
              }}
              className={`group relative flex cursor-pointer items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                active
                  ? 'border-l-2 border-[#00E5FF] bg-white/[0.06] text-white'
                  : 'border-l-2 border-transparent text-slate-400 hover:bg-white/[0.04] hover:text-white'
              }`}
            >
              <Icon
                className={`h-[18px] w-[18px] transition ${
                  active ? 'text-[#00E5FF]' : 'text-slate-500 group-hover:text-[#00E5FF]'
                }`}
              />
              {label}
              {active && (
                <span className="absolute inset-x-4 -bottom-px h-px bg-gradient-to-r from-[#00E5FF] to-transparent" />
              )}
            </a>
          );
        })}
      </nav>

      <div className="mx-4 mb-4 rounded-xl border border-[#00E5FF]/20 bg-gradient-to-br from-[#142B4D] to-[#0B132B] p-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          <span className="text-xs font-bold text-white">AI Engine Online</span>
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
          Every check is answered in seconds — no waiting, no technical terms.
        </p>
        <div className="mt-3 flex items-center gap-2">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[84.2%] rounded-full bg-gradient-to-r from-[#00E5FF] to-emerald-400" />
          </div>
          <span className="text-[10px] font-semibold text-[#00E5FF]">84.2%</span>
        </div>
      </div>

      <div className="border-t border-white/10 p-4">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-white/[0.04] hover:text-white"
        >
          <LogOut className="h-[18px] w-[18px] text-slate-500" />
          Logout / Switch Console
        </button>
      </div>
    </aside>
  );
}

function TopBar({ roleLabel, onLogout }) {
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-sky-200/80 bg-[#EBF3FC]/85 px-6 py-4 backdrop-blur-md lg:px-8">
      <div className="relative flex flex-1 items-center">
        <Search className="pointer-events-none absolute left-4 h-4 w-4 text-slate-400" />
        <input
          id="global-search"
          placeholder="Search file name, link, or scan ID..."
          className="w-full max-w-xl rounded-xl border border-sky-200 bg-[#F4F9FF] py-2.5 pl-11 pr-20 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200/50"
        />
        <span className="pointer-events-none absolute right-3 inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-semibold text-slate-400">
          ⌘K
        </span>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="relative">
          <button
            onClick={() => setNotifOpen((v) => !v)}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:text-[#00E5FF]"
            aria-label="Live scam notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
            </span>
          </button>
          {notifOpen && (
            <div className="animate-cybee-rise absolute right-0 mt-2 w-80 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
              <div className="flex items-center justify-between px-2 pb-2">
                <span className="text-sm font-bold text-slate-800">Live Scam Alerts</span>
                <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-600">3 NEW</span>
              </div>
              <div className="space-y-1">
                {FEED.slice(0, 3).map((item) => (
                  <div key={item.name} className="flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-slate-50">
                    <div
                      className={`h-2 w-2 shrink-0 rounded-full ${
                        item.risk === 'Malicious' ? 'bg-red-500' : item.risk === 'Suspicious' ? 'bg-amber-400' : 'bg-emerald-500'
                      }`}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-slate-700">{item.name}</p>
                      <p className="text-[11px] text-slate-400">{item.category} · {item.time}</p>
                    </div>
                    <RiskPill level={item.risk} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={onLogout}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 shadow-sm transition hover:border-[#00E5FF] hover:text-[#00E5FF]"
        >
          <LogOut className="h-4 w-4" />
          Logout / Switch Console
        </button>

        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 py-1.5 pl-2.5 pr-3">
          <BadgeCheck className="h-4 w-4 text-emerald-600" />
          <span className="text-xs font-semibold text-emerald-700">Verified {roleLabel} (OTP)</span>
          <ChevronDown className="h-3.5 w-3.5 text-emerald-600" />
        </div>
      </div>
    </header>
  );
}

function PageHeader({ title, subtitle, right }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900 lg:text-3xl">{title}</h1>
        <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
      </div>
      {right}
    </div>
  );
}

function MetricCard({ label, value, delta, icon: Icon, tone }) {
  return (
    <div className="animate-cybee-rise rounded-2xl border border-sky-200/80 bg-white/80 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-md transition hover:-translate-y-0.5 hover:border-cyan-400 hover:shadow-[0_8px_30px_rgba(207,250,254,0.85)]">
      <div className="flex items-start justify-between">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${tone}`}>
          <Icon className="h-5 w-5" />
        </div>
        <TrendingUp className="h-4 w-4 text-emerald-500" />
      </div>
      <div className="mt-4 text-3xl font-black tracking-tight text-slate-900">{value}</div>
      <div className="mt-1 text-sm font-semibold text-slate-600">{label}</div>
      <div className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-500">
        {delta}
      </div>
    </div>
  );
}

function Toggle({ on, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${on ? 'bg-[#00E5FF]' : 'bg-slate-300'}`}
      aria-pressed={on}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
          on ? 'left-[22px]' : 'left-0.5'
        }`}
      />
    </button>
  );
}

function ScannerWorkspace({ onScanned }) {
  const [activeTab, setActiveTab] = useState('video');
  const [staged, setStaged] = useState(DEFAULT_FILES.video);
  const [dragging, setDragging] = useState(false);
  const [checking, setChecking] = useState(false);
  const [linkInput, setLinkInput] = useState('');
  const [messageText, setMessageText] = useState('');
  const inputRef = useRef(null);

  const tab = SCAN_TABS.find((t) => t.id === activeTab);
  const isFileTab = tab.id === 'video' || tab.id === 'photo' || tab.id === 'audio';

  const switchTab = (id) => {
    setActiveTab(id);
    if (DEFAULT_FILES[id]) setStaged(DEFAULT_FILES[id]);
  };

  const handleFiles = (files) => {
    const file = files && files[0];
    if (!file) return;
    const mb = (file.size / (1024 * 1024)).toFixed(1);
    setStaged({ name: file.name, size: `${mb} MB` });
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const runCheck = () => {
    setChecking(true);
    setTimeout(() => {
      setChecking(false);
      onScanned();
    }, 1400);
  };

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white shadow-sm">
      <div className="flex flex-wrap gap-1 border-b border-slate-200 p-3">
        {SCAN_TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => switchTab(id)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              activeTab === id
                ? 'border border-[#00E5FF]/40 bg-cyan-50 text-cyan-700 shadow-sm'
                : 'border border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            <Icon className={`h-4 w-4 ${activeTab === id ? 'text-[#00E5FF]' : 'text-slate-400'}`} />
            {label}
          </button>
        ))}
      </div>

      <div className="p-5 lg:p-6">
        {isFileTab ? (
          <>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              onClick={() => inputRef.current && inputRef.current.click()}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition ${
                dragging
                  ? 'border-[#00E5FF] bg-cyan-50/70'
                  : 'border-slate-300 bg-slate-50/60 hover:border-[#00E5FF] hover:bg-cyan-50/40'
              }`}
            >
              <input
                ref={inputRef}
                type="file"
                className="hidden"
                accept={tab.accept}
                onChange={(e) => handleFiles(e.target.files)}
              />
              <div className="animate-cybee-glow flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#00E5FF] shadow-sm">
                <Upload className="h-6 w-6" />
              </div>
              <p className="mt-4 text-sm font-bold text-slate-800">
                Drag & drop your suspicious file here, or click to browse
              </p>
              <p className="mt-1 text-xs text-slate-400">
                {tab.id === 'video' && 'Accepts .mp4, .mov (Face swap / fake video check)'}
                {tab.id === 'photo' && 'Accepts .jpg, .png (Edited / fake image check)'}
                {tab.id === 'audio' && 'Accepts .mp3, .wav (Fake / cloned voice check)'}
              </p>
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-xl border border-cyan-100 bg-cyan-50/60 px-4 py-3">
              <tab.icon className="h-7 w-7 shrink-0 rounded-lg bg-white p-1.5 text-cyan-600 shadow-sm" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-800">{staged.name}</p>
                <p className="text-[11px] text-slate-400">{staged.size} · Ready to Check</p>
              </div>
              <span className="shrink-0 rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-700">
                Ready to Check
              </span>
            </div>
          </>
        ) : activeTab === 'link' ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/60 px-5 py-8">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
              <Globe className="h-4 w-4 text-[#00E5FF]" />
              Dangerous Fake Website / Link
            </div>
            <p className="mt-1 text-xs text-slate-400">
              We check if this link is used in scams and who operates the website.
            </p>
            <div className="mt-4 flex items-center overflow-hidden rounded-xl border border-sky-200 bg-[#F4F9FF] shadow-sm transition focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-200/50">
              <span className="flex items-center px-3 text-slate-400">
                <Link2 className="h-4 w-4" />
              </span>
              <input
                type="url"
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
                placeholder="https://example.com/suspicious-page"
                className="w-full bg-transparent py-3 pr-2 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
              />
              <button
                onClick={runCheck}
                className="m-1.5 shrink-0 rounded-lg bg-[#0B132B] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#16254d]"
              >
                Inspect Link
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/60 px-5 py-8">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
              <MessageSquare className="h-4 w-4 text-[#00E5FF]" />
              Fake SMS / Message check
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Paste a forwarded WhatsApp or SMS message to check if it is a scam.
            </p>
            <textarea
              rows={6}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Forwarded: Congratulations! You have won a free recharge. Click here to claim..."
              className="mt-4 w-full rounded-xl border border-sky-200 bg-[#F4F9FF] px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200/50"
            />
          </div>
        )}

        <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/70 px-4 py-2.5 text-[13px] font-semibold text-emerald-700">
          <Zap className="h-4 w-4 shrink-0 text-emerald-600" />
          Instant Viral Scam Check (No Wait Time) — returns a result immediately if already verified
        </div>

        <button
          onClick={runCheck}
          disabled={checking}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00E5FF] to-cyan-500 px-6 py-4 text-sm font-black tracking-wide text-[#06283D] shadow-[0_12px_30px_-10px_rgba(0,229,255,0.8)] transition hover:brightness-105 active:scale-[0.99] disabled:cursor-wait disabled:opacity-80"
        >
          {checking ? (
            <>
              <Scan className="h-5 w-5 animate-spin" />
              Checking For Scams...
            </>
          ) : (
            <>
              <Scan className="h-5 w-5" />
              CHECK FOR SCAM NOW
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function EvidenceSnapshot({ name }) {
  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-slate-50/60">
      <div className="relative flex h-36 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-700 via-slate-800 to-slate-950">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#00E5FF 1px, transparent 1px), linear-gradient(90deg, #00E5FF 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
        <Image className="h-10 w-10 text-white/25" />
        <div className="absolute left-1/2 top-4 h-16 w-14 -translate-x-1/2 rounded-md border-2 border-red-500 shadow-[0_0_0_4px_rgba(239,68,68,0.25)]" />
        <span className="absolute -top-2 left-1/2 flex h-5 w-9 -translate-x-1/2 items-center justify-center rounded-b-md bg-red-500">
          <AlertTriangle className="h-3 w-3 text-white" />
        </span>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2.5 text-[11px] text-slate-500">
        <span className="truncate font-semibold text-slate-600">{name}</span>
        <span className="flex shrink-0 items-center gap-1 font-bold text-red-600">
          <AlertTriangle className="h-3 w-3" /> Flagged area
        </span>
      </div>
    </div>
  );
}

function ScanCertificateCard() {
  return (
    <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/40 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <QRCode className="h-16 w-16 rounded-md bg-white p-1 shadow-sm" />
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-slate-700">Official Proof Report</p>
            <p className="mt-0.5 text-[11px] text-slate-500">#SCAN-2026-9F81E7 · Verifiable QR</p>
            <p className="mt-1 text-[11px] font-semibold text-emerald-700">
              Submit as official proof to Instagram, WhatsApp or College Authorities.
            </p>
          </div>
        </div>
        <Stamp />
      </div>
    </div>
  );
}

function ResultPanel({ scanned, onReset }) {
  if (!scanned) {
    return (
      <div className="animate-cybee-rise flex h-full flex-col items-center justify-center rounded-2xl border border-slate-200/90 bg-white px-6 py-16 text-center shadow-sm">
        <div className="animate-cybee-glow flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-[#00E5FF]">
          <Radar className="h-8 w-8" />
        </div>
        <p className="mt-5 text-base font-black text-slate-800">Your Safety Result will appear here</p>
        <p className="mt-1 max-w-xs text-sm text-slate-400">
          Check a video, photo, voice note, link or message and see your result right here.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-cybee-rise flex flex-col rounded-2xl border border-slate-200/90 bg-white shadow-sm" style={{ animationDelay: '0.1s' }}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-5 py-4">
        <div>
          <h3 className="text-sm font-black tracking-wide text-slate-900">
            Safety Result <span className="text-[#00E5FF]">#SCAN-2026-9F81E7</span>
          </h3>
          <p className="mt-0.5 text-xs text-slate-400">Finished in 1.4 seconds</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-cyan-50 px-3 py-1 text-[11px] font-bold text-cyan-600">
            <Timer className="h-3.5 w-3.5" /> 1.4s
          </span>
          <button
            onClick={onReset}
            className="flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-[11px] font-bold text-slate-500 transition hover:border-[#00E5FF] hover:text-[#00E5FF]"
          >
            <RefreshCw className="h-3.5 w-3.5" /> New Check
          </button>
        </div>
      </div>

      <div className="px-5 py-6">
        <SafetyGauge value={78} />
        <div className="mt-2 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-black tracking-wide text-red-600">
            <AlertTriangle className="h-4 w-4" />
            78% HIGH RISK / LIKELY FAKE
          </span>
        </div>
        <p className="mt-4 rounded-xl bg-amber-50/70 px-4 py-3 text-center text-[13px] font-medium leading-relaxed text-amber-800">
          This video shows abnormal facial editing and a computer-generated voice. Please do not
          forward it to anyone.
        </p>

        <EvidenceSnapshot name="politician_speech_clip.mp4" />

        <div className="mt-5 space-y-3">
          {FINDINGS.map(({ title, detail, note, icon: Icon, tone }) => (
            <div key={title} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/50 p-3.5">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tone}`}>
                <Icon className="h-[18px] w-[18px]" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-bold text-slate-800">{title}</p>
                  <p className="shrink-0 text-xs font-bold text-slate-600">{detail}</p>
                </div>
                <p className="text-xs text-slate-400">{note}</p>
              </div>
            </div>
          ))}
        </div>

        <ScanCertificateCard />

        <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#00E5FF]/60 bg-[#0B132B] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#16254d] active:scale-[0.99]">
          <Download className="h-4 w-4 text-[#00E5FF]" />
          📥 Download Scam Evidence Report (PDF)
        </button>
      </div>
    </div>
  );
}

function LiveFeed() {
  return (
    <div className="animate-cybee-rise rounded-2xl border border-slate-200/90 bg-white shadow-sm" style={{ animationDelay: '0.15s' }}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
        <div>
          <h3 className="text-base font-black text-slate-900">Recently Reported Scams</h3>
          <p className="text-xs text-slate-400">Community-verified threats from the last 24 hours</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-600 transition hover:border-[#00E5FF] hover:text-[#00E5FF]">
          <ChevronDown className="h-4 w-4" /> Last 24 Hours
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th className="px-5 py-3">Reported Scam</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Risk Level</th>
              <th className="px-5 py-3">Reported</th>
            </tr>
          </thead>
          <tbody>
            {FEED.map((item) => (
              <tr key={item.name} className="border-b border-slate-100 transition last:border-0 hover:bg-cyan-50/40">
                <td className="px-5 py-3.5">
                  <p className="text-sm font-semibold text-slate-800">{item.name}</p>
                  <p className="text-[11px] text-slate-400">ID: SCAN-{item.time.replace(/\s|\W/g, '').slice(0, 4).toUpperCase()}42</p>
                </td>
                <td className="px-5 py-3.5 text-sm text-slate-600">{item.category}</td>
                <td className="px-5 py-3.5">
                  <RiskPill level={item.risk} />
                </td>
                <td className="px-5 py-3.5 text-sm text-slate-500">{item.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-5 py-4">
        <p className="text-xs text-slate-400">
          Showing <span className="font-bold text-slate-600">5 of 128</span> recent reports
        </p>
        <div className="flex items-center gap-1">
          <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-xs font-bold text-slate-500 transition hover:border-[#00E5FF] hover:text-[#00E5FF]">‹</button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00E5FF] text-xs font-bold text-[#06283D]">1</button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-xs font-bold text-slate-500 transition hover:border-[#00E5FF] hover:text-[#00E5FF]">2</button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-xs font-bold text-slate-500 transition hover:border-[#00E5FF] hover:text-[#00E5FF]">3</button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-xs font-bold text-slate-500 transition hover:border-[#00E5FF] hover:text-[#00E5FF]">›</button>
        </div>
      </div>
    </div>
  );
}

function HomeView() {
  return (
    <>
      <PageHeader
        title="Media & Scam Safety, Made Simple"
        subtitle="See how many scams CYBEE has caught and what is trending right now."
        right={
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-500 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            You are protected · <span className="text-emerald-600">1,204 people online</span>
          </div>
        }
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {METRICS.map((m) => (
          <MetricCard key={m.label} {...m} />
        ))}
      </section>

      <LiveFeed />
    </>
  );
}

function CheckView() {
  const [scanned, setScanned] = useState(false);

  return (
    <>
      <PageHeader
        title="Check Media & Links"
        subtitle="Not sure if it is real? Drop it here and get a simple Safety Result."
      />

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <ScannerWorkspace onScanned={() => setScanned(true)} />
        </div>
        <div className="xl:col-span-5">
          <ResultPanel scanned={scanned} onReset={() => setScanned(false)} />
        </div>
      </section>
    </>
  );
}

function SavedView() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');

  const shown = SAVED_SCANS.filter((s) => {
    const matchesQuery =
      !query.trim() ||
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.id.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === 'All' || s.risk === filter;
    return matchesQuery && matchesFilter;
  });

  return (
    <>
      <PageHeader
        title="Saved Checks"
        subtitle="Everything you have checked before, with a simple verdict."
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex flex-1 items-center">
          <Search className="pointer-events-none absolute left-4 h-4 w-4 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by file name or scan ID..."
            className="w-full max-w-md rounded-xl border border-sky-200 bg-[#F4F9FF] py-2.5 pl-11 pr-4 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200/50"
          />
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {['All', 'Safe', 'Suspicious', 'Malicious'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                filter === f
                  ? 'bg-[#0B132B] text-white'
                  : 'border border-slate-200 bg-white text-slate-500 hover:text-[#00E5FF]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="animate-cybee-rise rounded-2xl border border-slate-200/90 bg-white shadow-sm" style={{ animationDelay: '0.1s' }}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="px-5 py-3">Scan ID</th>
                <th className="px-5 py-3">File / Input</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Risk Score</th>
                <th className="px-5 py-3">Verdict</th>
                <th className="px-5 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((s) => (
                <tr key={s.id} className="border-b border-slate-100 transition last:border-0 hover:bg-cyan-50/40">
                  <td className="px-5 py-3.5">
                    <button className="flex items-center gap-1.5 text-xs font-bold text-slate-600 transition hover:text-[#00E5FF]">
                      {s.id} <Copy className="h-3 w-3 text-slate-400" />
                    </button>
                  </td>
                  <td className="px-5 py-3.5 max-w-[220px]">
                    <p className="truncate text-sm font-semibold text-slate-800">{s.name}</p>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-600">{s.type}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-black ${SCORE_STYLES[s.risk]}`}>{s.score}%</span>
                      <span className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100">
                        <span
                          className={`block h-full rounded-full ${SCORE_BARS[s.risk]}`}
                          style={{ width: `${s.score}%` }}
                        />
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <RiskPill level={s.risk} />
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-500">{s.date}</td>
                </tr>
              ))}
              {shown.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-5 py-10 text-center text-sm text-slate-400">
                    No checks match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function AlertsView() {
  const [alerts, setAlerts] = useState(ALERTS);
  const [reporting, setReporting] = useState(false);
  const [reportText, setReportText] = useState('');

  const submitReport = () => {
    if (!reportText.trim()) return;
    setAlerts((a) => [
      {
        name: reportText.trim(),
        category: 'Community Report',
        risk: 'Suspicious',
        time: 'Just now',
        desc: 'Submitted by a verified community member. Being reviewed by CYBEE analysts.',
      },
      ...a,
    ]);
    setReportText('');
    setReporting(false);
  };

  return (
    <>
      <PageHeader
        title="Scam Alerts"
        subtitle="Scams going around right now — reported by people like you."
        right={
          <div className="flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-bold text-red-600">
            <Radar className="h-4 w-4" /> {alerts.length} alerts today
          </div>
        }
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500">Saw something suspicious? Flag it to protect everyone.</p>
        <button
          onClick={() => setReporting((v) => !v)}
          className="flex items-center gap-2 rounded-xl bg-[#0B132B] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#16254d]"
        >
          <ShieldAlert className="h-4 w-4 text-[#00E5FF]" />
          Report Scam
        </button>
      </div>

      {reporting && (
        <div className="animate-cybee-rise rounded-2xl border border-[#00E5FF]/40 bg-white p-5 shadow-sm">
          <p className="text-sm font-black text-slate-800">Report a new scam</p>
          <p className="mt-0.5 text-xs text-slate-400">Describe what you saw and paste the link or message if possible.</p>
          <textarea
            rows={4}
            value={reportText}
            onChange={(e) => setReportText(e.target.value)}
            placeholder='e.g. "Someone is sharing a fake recharge link that asks for OTP..."'
            className="mt-3 w-full rounded-xl border border-sky-200 bg-[#F4F9FF] px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200/50"
          />
          <div className="mt-3 flex items-center justify-end gap-2">
            <button
              onClick={() => {
                setReporting(false);
                setReportText('');
              }}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-500 transition hover:text-slate-700"
            >
              Cancel
            </button>
            <button
              onClick={submitReport}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00E5FF] to-cyan-500 px-5 py-2 text-xs font-black text-[#06283D] shadow-[0_8px_20px_-8px_rgba(0,229,255,0.8)] transition hover:brightness-105"
            >
              <Send className="h-3.5 w-3.5" />
              Submit Report
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {alerts.map((a) => (
          <div
            key={a.name + a.time}
            className="animate-cybee-rise flex items-start gap-3 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm transition hover:border-[#00E5FF]/40"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-[#00E5FF]">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-bold text-slate-800">{a.name}</p>
                <RiskPill level={a.risk} />
              </div>
              <p className="mt-0.5 text-xs text-slate-400">
                {a.category} · {a.time}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{a.desc}</p>
            </div>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="hidden shrink-0 items-center gap-1 text-xs font-bold text-[#00E5FF] transition hover:text-cyan-600 sm:flex"
            >
              View <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        ))}
      </div>
    </>
  );
}

function ReportsView() {
  return (
    <>
      <PageHeader
        title="My Reports & PDFs"
        subtitle="Official PDF proof reports — ready to submit to Instagram, WhatsApp or college authorities."
        right={
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-500 shadow-sm">
            <FileCheck2 className="h-4 w-4 text-emerald-500" /> {SAVED_SCANS.length} reports ready
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {SAVED_SCANS.map((s, i) => (
          <div
            key={s.id}
            className="animate-cybee-rise flex flex-col rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="flex items-start justify-between">
              <img src={LOGO_URL} alt="CYBEE" className="h-12 w-12 bg-transparent object-contain mix-blend-multiply" />
              <RiskPill level={s.risk} />
            </div>
            <p className="mt-4 text-sm font-bold text-slate-800">{s.name}</p>
            <p className="mt-0.5 text-[11px] text-slate-400">
              {s.id} · {s.type}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className={`rounded-full bg-slate-50 px-2.5 py-0.5 text-[11px] font-bold ${SCORE_STYLES[s.risk]}`}>
                Risk {s.score}%
              </span>
              <span className="flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-0.5 text-[11px] font-medium text-slate-500">
                <Clock className="h-3 w-3" /> {s.date}
              </span>
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-xl bg-slate-50/60 p-3">
              <QRCode className="h-14 w-14 rounded-md bg-white p-1 shadow-sm" />
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-wide text-slate-600">Official Proof</p>
                <p className="text-[10px] leading-relaxed text-slate-400">
                  QR verified · Show to Instagram / WhatsApp / College Authorities.
                </p>
              </div>
              <Stamp label={s.risk === 'Safe' ? 'SAFE' : 'SCAM'} />
            </div>
            <button className="mt-auto ml-auto mt-4 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#00E5FF]/60 bg-[#0B132B] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#16254d] active:scale-[0.99]">
              <Download className="h-4 w-4 text-[#00E5FF]" />
              📥 Download Scam Evidence Report (PDF)
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

function SettingsView({ onLogout }) {
  const [emailOn, setEmailOn] = useState(true);
  const [smsOn, setSmsOn] = useState(false);
  const [pushOn, setPushOn] = useState(true);
  const [autoCache, setAutoCache] = useState(true);

  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Manage your profile, alerts and your saved checks."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="animate-cybee-rise rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00E5FF] to-cyan-600 text-white shadow-[0_0_18px_rgba(0,229,255,0.4)]">
              <UserCircle className="h-8 w-8" />
            </div>
            <div>
              <p className="text-base font-black text-slate-900">Verified Citizen</p>
              <p className="flex items-center gap-1 text-xs text-emerald-600">
                <BadgeCheck className="h-3.5 w-3.5" /> OTP Verified Member
              </p>
            </div>
          </div>
          <div className="mt-4 space-y-2.5 text-sm">
            <div className="flex items-center justify-between rounded-xl bg-slate-50/60 px-4 py-2.5">
              <span className="flex items-center gap-2 text-slate-500">
                <Phone className="h-4 w-4 text-[#00E5FF]" /> Mobile
              </span>
              <span className="font-semibold text-slate-700">+91 98765 43210</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50/60 px-4 py-2.5">
              <span className="flex items-center gap-2 text-slate-500">
                <Mail className="h-4 w-4 text-[#00E5FF]" /> Email
              </span>
              <span className="font-semibold text-slate-700">user**@cybee.in</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50/60 px-4 py-2.5">
              <span className="flex items-center gap-2 text-slate-500">
                <ShieldCheck className="h-4 w-4 text-emerald-500" /> Login Method
              </span>
              <span className="font-semibold text-slate-700">Phone + OTP</span>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:border-red-300 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" /> Logout / Switch Console
          </button>
        </div>

        <div className="animate-cybee-rise rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm" style={{ animationDelay: '0.08s' }}>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-[#00E5FF]" />
            <h3 className="text-sm font-black text-slate-900">Notifications</h3>
          </div>
          <p className="mt-1 text-xs text-slate-400">Choose how CYBEE warns you about scams.</p>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-400" />
                <span className="text-sm font-semibold text-slate-700">Email alerts</span>
              </div>
              <Toggle on={emailOn} onToggle={() => setEmailOn((v) => !v)} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-slate-400" />
                <span className="text-sm font-semibold text-slate-700">SMS alerts</span>
              </div>
              <Toggle on={smsOn} onToggle={() => setSmsOn((v) => !v)} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-slate-400" />
                <span className="text-sm font-semibold text-slate-700">Push alerts</span>
              </div>
              <Toggle on={pushOn} onToggle={() => setPushOn((v) => !v)} />
            </div>
          </div>
        </div>

        <div className="animate-cybee-rise rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm md:col-span-2" style={{ animationDelay: '0.16s' }}>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-[#00E5FF]" />
            <h3 className="text-sm font-black text-slate-900">Instant Viral Scam Check</h3>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Already-checked items are answered instantly — with no wait time.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-[84.2%] rounded-full bg-gradient-to-r from-[#00E5FF] to-emerald-400" />
            </div>
            <span className="text-xs font-bold text-[#00E5FF]">84.2%</span>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-semibold text-slate-700">Auto-cache verified checks</span>
            <Toggle on={autoCache} onToggle={() => setAutoCache((v) => !v)} />
          </div>
          <button className="mt-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-bold text-red-600 transition hover:bg-red-100">
            <Trash2 className="h-4 w-4" />
            Clear Instant Cache
          </button>
        </div>
      </div>
    </>
  );
}

function CitizenDashboard({ initialView, onLogout }) {
  const [activeView, setActiveView] = useState(initialView || 'home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EBF3FC] via-[#F1F6FD] to-[#E3EEFA] text-slate-800">
      <Sidebar activeView={activeView} onNavigate={setActiveView} onLogout={onLogout} />
      <div className="pl-[264px]">
        <TopBar roleLabel="Citizen" onLogout={onLogout} />
        <main className="space-y-6 p-6 lg:p-8">
          {activeView === 'home' && <HomeView />}
          {activeView === 'check' && <CheckView />}
          {activeView === 'saved' && <SavedView />}
          {activeView === 'alerts' && <AlertsView />}
          {activeView === 'reports' && <ReportsView />}
          {activeView === 'settings' && <SettingsView onLogout={onLogout} />}
        </main>
        <footer className="flex flex-wrap items-center justify-between gap-3 px-6 pb-8 pt-2 text-xs text-slate-400 lg:px-8">
          <p>© 2026 CYBEE Security. Every check is answered in seconds — no waiting.</p>
          <p className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> 100% community-funded scam reporters
          </p>
        </footer>
      </div>
    </div>
  );
}

function AdminMetricCard({ label, value, sub, icon: Icon, children }) {
  return (
    <div className="animate-cybee-rise rounded-2xl border border-sky-200/80 bg-white/80 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-md transition hover:-translate-y-0.5 hover:border-cyan-400 hover:shadow-[0_8px_30px_rgba(207,250,254,0.85)]">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B132B] text-[#00E5FF]">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="text-2xl font-black tracking-tight text-slate-900">{value}</div>
          <div className="text-xs font-semibold text-slate-500">{label}</div>
        </div>
      </div>
      <div className="mt-3 text-[11px] font-semibold text-slate-400">{sub}</div>
      {children}
    </div>
  );
}

function AdminSidebar({ activeView, onNavigate, onLogout }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-[264px] flex-col bg-[#0B132B] text-slate-300">
      <div className="flex items-center gap-3 px-6 pb-7 pt-6">
        <div className="flex h-9 w-9 items-center justify-center">
          <img src={LOGO_URL} alt="CYBEE" className="h-9 w-9 object-contain" />
        </div>
        <div>
          <div className="text-lg font-black tracking-[0.3em] text-white">CYBEE</div>
          <div className="text-[10px] font-medium tracking-wide text-slate-400">Security Console</div>
        </div>
      </div>

      <div className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
        Admin Console
      </div>

      <nav className="mt-2 flex-1 space-y-1 overflow-y-auto px-3">
        {ADMIN_NAV.map(({ view, label, icon: Icon }) => {
          const active = activeView === view;
          return (
            <a
              key={view}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigate(view);
              }}
              className={`group relative flex cursor-pointer items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                active
                  ? 'border-l-2 border-[#00E5FF] bg-white/[0.06] text-white'
                  : 'border-l-2 border-transparent text-slate-400 hover:bg-white/[0.04] hover:text-white'
              }`}
            >
              <Icon
                className={`h-[18px] w-[18px] transition ${
                  active ? 'text-[#00E5FF]' : 'text-slate-500 group-hover:text-[#00E5FF]'
                }`}
              />
              {label}
              {active && (
                <span className="absolute inset-x-4 -bottom-px h-px bg-gradient-to-r from-[#00E5FF] to-transparent" />
              )}
            </a>
          );
        })}
      </nav>

      <div className="mx-4 mb-4 rounded-xl border border-[#00E5FF]/20 bg-gradient-to-br from-[#142B4D] to-[#0B132B] p-4">
        <div className="flex items-center gap-2">
          <Shield className="h-3.5 w-3.5 text-[#00E5FF]" />
          <span className="text-xs font-bold text-white">Zero-Knowledge Privacy</span>
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
          Citizens are never exposed. Only type badges and masked file labels.
        </p>
      </div>

      <div className="border-t border-white/10 p-4">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-white/[0.04] hover:text-white"
        >
          <LogOut className="h-[18px] w-[18px] text-slate-500" />
          Logout / Switch Console
        </button>
      </div>
    </aside>
  );
}

function AdminTopBar({ onLogout }) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-sky-200/80 bg-[#EBF3FC]/85 px-6 py-4 backdrop-blur-md lg:px-8">
      <div className="flex items-center gap-2">
        <Shield className="h-5 w-5 text-[#00E5FF]" />
        <span className="text-sm font-black tracking-wide text-slate-900">Admin Analysis Console</span>
        <span className="rounded-full border border-[#00E5FF]/40 bg-[#00E5FF]/10 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wide text-[#00E5FF]">
          Restricted
        </span>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white py-1.5 pl-2.5 pr-3 shadow-sm">
          <UserCheck className="h-4 w-4 text-[#00E5FF]" />
          <span className="text-xs font-semibold text-slate-700">Logged in as Senior Mod</span>
          <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 shadow-sm transition hover:border-[#00E5FF] hover:text-[#00E5FF]"
        >
          <LogOut className="h-4 w-4" />
          Logout / Switch Console
        </button>
      </div>
    </header>
  );
}

function AnonymousCard({ item }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/50 p-3.5">
      <span className="shrink-0 rounded-md bg-[#0B132B] px-2 py-1 text-[10px] font-black uppercase tracking-wide text-[#00E5FF]">
        {item.type}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-slate-800">{item.label}</p>
        <p className="text-[11px] text-slate-400">
          Threat: {item.threat} · {item.by}
        </p>
      </div>
    </div>
  );
}

function MonitorView() {
  const [stream, setStream] = useState(ACTIVITY_TEMPLATES.slice(0, 4));

  const refresh = () => {
    const next = [...stream];
    next.unshift(ACTIVITY_TEMPLATES[Math.floor(Math.random() * ACTIVITY_TEMPLATES.length)]);
    setStream(next.slice(0, 6));
  };

  const HEALTH = [
    { name: 'ResNet-18 Face Engine', extra: 'face swap & fake video detection' },
    { name: 'Librosa Voice Engine', extra: 'fake / cloned voice detection' },
    { name: 'Safe Browsing Workers ×12', extra: 'dangerous link & fake website blocks' },
  ];

  return (
    <>
      <PageHeader
        title="Live System Monitor"
        subtitle="Engine health and a live anonymized activity stream."
        right={
          <button
            onClick={refresh}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm transition hover:border-[#00E5FF] hover:text-[#00E5FF]"
          >
            <RefreshCw className="h-4 w-4" /> Refresh Feed
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {HEALTH.map((h) => (
          <div key={h.name} className="animate-cybee-rise rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <Server className="h-4 w-4 text-[#00E5FF]" />
              <span className="text-sm font-bold text-slate-800">{h.name}</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-400">{h.extra}</p>
            <span className="mt-2 inline-block rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-black text-emerald-700">
              HEALTHY
            </span>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200/90 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h3 className="text-sm font-black text-slate-900">Live Anonymized Activity</h3>
          <p className="text-xs text-slate-400">No citizen files are ever shown — only masked records.</p>
        </div>
        <div className="space-y-2 p-4">
          {stream.map((line, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl bg-slate-50/60 px-4 py-3 text-sm text-slate-600">
              <span className="flex h-2 w-2 shrink-0 animate-cybee-pulse rounded-full bg-[#00E5FF]" />
              {line}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ModerationView() {
  const [queue, setQueue] = useState(QUEUE);

  const approve = (id) =>
    setQueue((q) => q.map((i) => (i.id === id ? { ...i, status: 'approved' } : i)));
  const dismiss = (id) =>
    setQueue((q) => q.map((i) => (i.id === id ? { ...i, status: 'dismissed' } : i)));

  const pending = queue.filter((i) => !i.status).length;

  return (
    <>
      <PageHeader
        title="Scam Moderation Queue"
        subtitle="Reports submitted through the portal. Files stay fully anonymized."
        right={
          <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs font-bold text-amber-700">
            <AlertTriangle className="h-4 w-4" /> {pending} pending review
          </div>
        }
      />

      <div className="rounded-2xl border border-[#00E5FF]/30 bg-white/60 p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <Lock className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
          <p className="text-xs leading-relaxed text-slate-600">
            <span className="font-black text-slate-800">Zero-Knowledge Privacy:</span> Admins can only see a file type
            badge, a masked label, and the threat category. Private photos, videos and raw messages are never exposed
            to the console.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {queue.map((item) => (
          <div
            key={item.id}
            className={`animate-cybee-rise rounded-2xl border p-4 shadow-sm transition ${
              item.status === 'dismissed'
                ? 'border-slate-200 bg-slate-50 opacity-60'
                : 'border-slate-200/90 bg-white'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <AnonymousCard item={item} />
              <div className="flex shrink-0 items-center">
                {item.status === 'approved' ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Pushed to Public Bulletin
                  </span>
                ) : item.status === 'dismissed' ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                    <X className="h-3.5 w-3.5" /> Dismissed
                  </span>
                ) : (
                  <div className="flex flex-col items-end gap-2 sm:flex-row">
                    <button
                      onClick={() => approve(item.id)}
                      className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3.5 py-2 text-[11px] font-black text-white transition hover:bg-emerald-600"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" /> Approve & Push Alert
                    </button>
                    <button
                      onClick={() => dismiss(item.id)}
                      className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-[11px] font-bold text-slate-500 transition hover:border-red-300 hover:text-red-600"
                    >
                      <X className="h-3.5 w-3.5" /> Dismiss as Safe
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function RegistryView() {
  const [entries, setEntries] = useState(REGISTRY);
  const [value, setValue] = useState('');
  const [type, setType] = useState('SHA-256 Hash');

  const addEntry = () => {
    if (!value.trim()) return;
    setEntries((e) => [{ value: value.trim(), type, added: 'Just now' }, ...e]);
    setValue('');
  };

  return (
    <>
      <PageHeader
        title="Global Threat Registry"
        subtitle="Manually blacklist dangerous hashes or fake hackathon links so every citizen is instantly protected."
      />

      <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
          <div className="md:col-span-3">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">Type</label>
            <div className="flex items-center gap-0 overflow-hidden rounded-xl border border-sky-200 bg-[#F4F9FF] shadow-sm">
              <span className="flex items-center border-r border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-500">
                <Database className="h-4 w-4 text-[#00E5FF]" />
              </span>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-transparent px-3 py-2.5 text-sm font-medium text-slate-800 outline-none"
              >
                <option>SHA-256 Hash</option>
                <option>Scam Link</option>
                <option>Fake College Link</option>
                <option>Phone Number</option>
              </select>
            </div>
          </div>
          <div className="md:col-span-7">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Hash or Link
            </label>
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Paste SHA-256 hash or malicious link..."
              className="w-full rounded-xl border border-sky-200 bg-[#F4F9FF] px-4 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200/50"
            />
          </div>
          <div className="flex items-end md:col-span-2">
            <button
              onClick={addEntry}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B132B] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#16254d]"
            >
              <ShieldAlert className="h-4 w-4 text-[#00E5FF]" />
              Add to Blacklist
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h3 className="text-sm font-black text-slate-900">Blocked Instantly for All Citizens</h3>
          <p className="text-xs text-slate-400">{entries.length} entries in the global blacklist</p>
        </div>
        <div className="divide-y divide-slate-100">
          {entries.map((e, i) => (
            <div key={i} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5">
              <div className="min-w-0 flex-1">
                <p className="truncate font-mono text-xs font-semibold text-slate-700">{e.value}</p>
                <p className="text-[11px] text-slate-400">Added {e.added}</p>
              </div>
              <span className="shrink-0 rounded-full bg-slate-50 px-3 py-1 text-[11px] font-bold text-slate-600">
                {e.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function DossierView() {
  const [query, setQuery] = useState('');

  const shown = SAVED_SCANS.filter((s) => {
    const q = query.trim().toLowerCase();
    return !q || s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q) || s.type.toLowerCase().includes(q);
  });

  return (
    <>
      <PageHeader
        title="Audit & Legal Dossier"
        subtitle="Searchable log of every verification certificate issued on the platform."
        right={
          <button className="flex items-center gap-2 rounded-xl bg-[#0B132B] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#16254d]">
            <Download className="h-4 w-4 text-[#00E5FF]" />
            Export Cyber Cell Dossier
          </button>
        }
      />

      <div className="relative flex items-center">
        <Search className="pointer-events-none absolute left-4 h-4 w-4 text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search issued certificates..."
          className="w-full max-w-md rounded-xl border border-sky-200 bg-[#F4F9FF] py-2.5 pl-11 pr-4 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200/50"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="px-5 py-3">Certificate</th>
                <th className="px-5 py-3">Case</th>
                <th className="px-5 py-3">Verdict</th>
                <th className="px-5 py-3">Issued</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((s) => (
                <tr key={s.id} className="border-b border-slate-100 transition last:border-0 hover:bg-cyan-50/40">
                  <td className="px-5 py-3.5">
                    <span className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <FileCheck2 className="h-4 w-4 text-emerald-500" /> {s.id}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 max-w-[240px]">
                    <p className="truncate text-sm font-semibold text-slate-800">{s.name}</p>
                    <p className="text-[11px] text-slate-400">{s.type}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <RiskPill level={s.risk} />
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-500">{s.date}</td>
                  <td className="px-5 py-3.5">
                    <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-600 transition hover:border-[#00E5FF] hover:text-[#00E5FF]">
                      <Download className="h-3.5 w-3.5" /> Export
                    </button>
                  </td>
                </tr>
              ))}
              {shown.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-5 py-10 text-center text-sm text-slate-400">
                    No certificates match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function AdminDashboard({ onLogout }) {
  const [adminView, setAdminView] = useState('monitor');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EBF3FC] via-[#F1F6FD] to-[#E3EEFA] text-slate-800">
      <AdminSidebar activeView={adminView} onNavigate={setAdminView} onLogout={onLogout} />
      <div className="pl-[264px]">
        <AdminTopBar onLogout={onLogout} />
        <main className="space-y-6 p-6 lg:p-8">
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <AdminMetricCard
              label="Live Citizens Online"
              value="1,204"
              sub="Active right now"
              icon={Users}
            >
              <div className="mt-3 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-[11px] font-bold text-emerald-600">Green · Queue healthy</span>
              </div>
            </AdminMetricCard>

            <AdminMetricCard
              label="Total Platform Logins"
              value="18,450"
              sub="Verified citizens"
              icon={UserCheck}
            >
              <div className="mt-3 text-[11px] font-semibold text-slate-500">+312 today</div>
            </AdminMetricCard>

            <AdminMetricCard
              label="Scams Blocked Today"
              value="2,418"
              sub="Total scams stopped"
              icon={ShieldAlert}
            >
              <div className="mt-3 flex flex-wrap gap-1.5">
                {[
                  ['612 Deepfakes', 'text-red-600 bg-red-50 border-red-200'],
                  ['348 Voice Clones', 'text-amber-600 bg-amber-50 border-amber-200'],
                  ['1,180 Bad Links', 'text-cyan-700 bg-cyan-50 border-cyan-200'],
                  ['278 Fake SMS', 'text-slate-600 bg-slate-50 border-slate-200'],
                ].map(([label, cls]) => (
                  <span key={label} className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${cls}`}>
                    {label}
                  </span>
                ))}
              </div>
            </AdminMetricCard>

            <AdminMetricCard
              label="Instant Cache Hit Ratio"
              value="84.2%"
              sub="Server bypass rate"
              icon={Zap}
            >
              <div className="mt-3 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[84.2%] rounded-full bg-gradient-to-r from-[#00E5FF] to-emerald-400" />
                </div>
                <span className="text-[11px] font-bold text-[#00E5FF]">84.2%</span>
              </div>
            </AdminMetricCard>
          </section>

          {adminView === 'monitor' && <MonitorView />}
          {adminView === 'moderation' && <ModerationView />}
          {adminView === 'registry' && <RegistryView />}
          {adminView === 'dossier' && <DossierView />}
        </main>
        <footer className="flex flex-wrap items-center justify-between gap-3 px-6 pb-8 pt-2 text-xs text-slate-400 lg:px-8">
          <p>© 2026 CYBEE Security Console. Restricted to authorized moderation staff.</p>
          <p className="flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-emerald-500" /> Zero-knowledge privacy enabled · No citizen files viewable
          </p>
        </footer>
      </div>
    </div>
  );
}

export default function CybeePortal() {
  const [userRole, setUserRole] = useState(null);
  const [entryView, setEntryView] = useState('home');

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const search = document.getElementById('global-search');
        if (search) search.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const enter = (role, view) => {
    if (view) setEntryView(view);
    setUserRole(role);
  };

  const logout = () => setUserRole(null);

  if (!userRole) {
    return (
      <Onboarding
        onLogin={(role) => enter(role)}
        onGuest={() => enter('citizen')}
        onCheck={() => enter('citizen', 'check')}
        onAlerts={() => enter('citizen', 'alerts')}
      />
    );
  }

  if (userRole === 'admin') {
    return <AdminDashboard onLogout={logout} />;
  }

  return <CitizenDashboard initialView={entryView} onLogout={logout} />;
}