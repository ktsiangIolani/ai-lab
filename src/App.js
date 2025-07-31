import './App.css';
import ProjectList from './ProjectList';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import WhoseDNAPage from './WhoseDNAPage';
import StudentChatsPage from './StudentChatsPage';
import experimentIcon from './flask.svg';
import iolaniIcon from './io.png';
const DNADoubleHelix = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 220 }}>
    <svg width="120" height="200" viewBox="0 0 120 200">
      <defs>
        <linearGradient id="helixA" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b3a2b" />
          <stop offset="100%" stopColor="#b85c38" />
        </linearGradient>
        <linearGradient id="helixB" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a89f91" />
          <stop offset="100%" stopColor="#6b4f3b" />
        </linearGradient>
      </defs>
      <g>
        {/* Left helix */}
        <path
          d="M40,10 Q60,50 40,90 Q20,130 40,170"
          fill="none"
          stroke="url(#helixA)"
          strokeWidth="6"
        >
          <animate
            attributeName="d"
            values="M40,10 Q60,50 40,90 Q20,130 40,170;M40,20 Q60,60 40,100 Q20,140 40,180;M40,10 Q60,50 40,90 Q20,130 40,170"
            dur="2s"
            repeatCount="indefinite"
          />
        </path>
        {/* Right helix */}
        <path
          d="M80,170 Q60,130 80,90 Q100,50 80,10"
          fill="none"
          stroke="url(#helixB)"
          strokeWidth="6"
        >
          <animate
            attributeName="d"
            values="M80,170 Q60,130 80,90 Q100,50 80,10;M80,180 Q60,140 80,100 Q100,60 80,20;M80,170 Q60,130 80,90 Q100,50 80,10"
            dur="2s"
            repeatCount="indefinite"
          />
        </path>
        {/* Connecting bars */}
        {Array.from({ length: 9 }).map((_, i) => {
          const y1 = 10 + i * 20;
          const y2 = 20 + i * 20;
          const x1 = 51;
          const x2 = 58;
          return (
            <g key={i}>
              <rect
                x={x1}
                y={y1}
                width="12"
                height="4"
                rx="2"
                fill="#b85c38"
                opacity={0.7}
              >
                <animate
                  attributeName="y"
                  values={`${y1};${y2};${y1}`}
                  dur="2s"
                  begin={`${i * 0.15}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="x"
                  values={`${x1};${x2};${x1}`}
                  dur="2s"
                  begin={`${i * 0.15}s`}
                  repeatCount="indefinite"
                />
              </rect>
            </g>
          );
        })}
      </g>
    </svg>
  </div>
);

const ChatBubblesAnimation = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 180 }}>
    <svg width="220" height="160" viewBox="0 0 220 160">
      {/* Bubble 1 (user) */}
      <g>
        <rect x="220" y="20" rx="16" ry="16" width="110" height="36" fill="#8b3a2b" opacity="0">
          <animate attributeName="x" values="220;80;80" keyTimes="0;0.2;1" dur="4s" begin="0s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.95;0.95" keyTimes="0;0.2;1" dur="4s" begin="0s" repeatCount="indefinite" />
        </rect>
        <text x="220" y="44" fontSize="16" fill="#fff" fontFamily="Inter, Arial" opacity="0">
          <animate attributeName="x" values="220;90;90" keyTimes="0;0.2;1" dur="4s" begin="0s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.95;0.95" keyTimes="0;0.2;1" dur="4s" begin="0s" repeatCount="indefinite" />
          Hello friend
        </text>
      </g>
      {/* Bubble 2 (bot) */}
      <g>
        <rect x="-110" y="70" rx="16" ry="16" width="180" height="36" fill="#e0e0e0" opacity="0">
          <animate attributeName="x" values="-110;30;30" keyTimes="0;0.3;1" dur="4s" begin="0s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0;0.95;0.95" keyTimes="0;0.3;0.5;1" dur="4s" begin="0s" repeatCount="indefinite" />
        </rect>
        <text x="-110" y="94" fontSize="16" fill="#444" fontFamily="Inter, Arial" opacity="0">
          <animate attributeName="x" values="-110;40;40" keyTimes="0;0.3;1" dur="4s" begin="0s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0;0.95;0.95" keyTimes="0;0.3;0.5;1" dur="4s" begin="0s" repeatCount="indefinite" />
          What's up? U good?
        </text>
      </g>
      {/* Bubble 3 (user) */}
      <g>
        <rect x="220" y="120" rx="16" ry="16" width="90" height="36" fill="#8b3a2b" opacity="0">
          <animate attributeName="x" values="220;110;110" keyTimes="0;0.4;1" dur="4s" begin="0s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0;0.95;0.95" keyTimes="0;0.4;0.6;1" dur="4s" begin="0s" repeatCount="indefinite" />
        </rect>
        <text x="220" y="144" fontSize="16" fill="#fff" fontFamily="Inter, Arial" opacity="0">
          <animate attributeName="x" values="220;120;120" keyTimes="0;0.4;1" dur="4s" begin="0s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0;0.95;0.95" keyTimes="0;0.4;0.6;1" dur="4s" begin="0s" repeatCount="indefinite" />
          Kinda..
        </text>
      </g>
    </svg>
  </div>
);

const projects = [
  {
    title: 'Whose DNA?',
    description:
      'Whose DNA? is an experimental app that leverages machine learning to explore DNA sequences and match them with bacteria found in sick spinner dolphins.',
    buttonText: 'Try It Now',
    colorClass: 'labs-card-pink',
    path: '/whose-dna',
    renderImage: () => <DNADoubleHelix />, 
    createdBy: 'ML Foundations \'24',
    profilePic: './ml_class.png',
  },
  {
    title: '\'IO GPT',
    description:
      '\'IO GPT is an LLM built by students. It uses AI models—trained by the students themselves—to reply to your questions just like the students who created them.',
    buttonText: 'Try It Now',
    colorClass: 'labs-card-blue',
    path: '/student-chats',
    renderImage: () => <ChatBubblesAnimation />, 
    createdBy: 'Intro AI \'25',
    profilePic: '/profile_placeholder2.png',
  },
];

function App() {
  return (
    <BrowserRouter>
      <header className="labs-header">
        <nav className="labs-nav">
          <Link to="/" className="labs-nav-link"><img src={iolaniIcon} alt="iolani" className="io-icon" />Home</Link>
          <div className="ai-lab-title">
                  <img src={experimentIcon} alt="Experiment" className="ai-lab-icon" />
                  <span>AI Lab @ 'Iolani</span>
                </div>
        </nav>
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="ai-lab-subtitle">Artificial Intelligence created by students.</div>
                <ProjectList projects={projects} />
              </>
            }
          />
          <Route path="/whose-dna" element={<WhoseDNAPage />} />
          <Route path="/student-chats" element={<StudentChatsPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
