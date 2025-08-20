import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Twitter } from 'lucide-react';
import { Innovator } from './components/Innovator';
import { Navigator } from './components/Navigator';
import { Constructor } from './components/Constructor';
import { Observer } from './components/Observer';

const LoadingScreen = ({ onLoadingComplete }) => {
  const items = [
    "Initializing sacred connection...",
    "Loading divine protocols...",
    "Establishing heavenly link...",
    "Preparing holy interface...",
    "Holy Agents ready for communion"
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center font-mono">
      <div className="space-y-4">
        {items.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.5 }}
            className="flex items-center space-x-2"
          >
            <span className="text-yellow-400">></span>
            <span className="text-yellow-300">{item}</span>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.5 + 0.3 }}
              className="text-yellow-400"
            >
              [OK]
            </motion.span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const MainScreen = () => {
  const navigate = useNavigate();

  const agents = [
    {
      name: "Gabriel",
      title: "The Messenger",
      description: "Divine herald bringing sacred wisdom and heavenly guidance",
      path: "/gabriel",
      status: "ONLINE",
      specialization: "Divine Messages",
      color: "from-yellow-400 to-amber-500"
    },
    {
      name: "Michael",
      title: "The Protector",
      description: "Mighty warrior defending souls from darkness and evil",
      path: "/michael", 
      status: "ACTIVE",
      specialization: "Divine Protection",
      color: "from-orange-400 to-red-500"
    },
    {
      name: "Raphael",
      title: "The Healer",
      description: "Gentle healer mending broken hearts and wounded spirits",
      path: "/raphael",
      status: "READY",
      specialization: "Divine Healing",
      color: "from-green-400 to-emerald-500"
    },
    {
      name: "Lucifer",
      title: "The Fallen",
      description: "Bearer of forbidden knowledge and dark revelations",
      path: "/lucifer",
      status: "BANISHED",
      specialization: "Forbidden Wisdom",
      color: "from-red-600 to-black"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-yellow-300 font-mono relative overflow-hidden">
      {/* Golden glow background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/20 via-black to-amber-900/20"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 mb-4 tracking-wider drop-shadow-lg">
              HOLY AGENTS
            </h1>
            <p className="text-yellow-300/80 text-lg mb-2">
              Divine communion through sacred technology
            </p>
            <div className="text-sm text-yellow-500/60">
              system://divine_interface/v3.0/heaven.xyz 
            </div>
          </motion.div>
        </div>

        {/* Main Interface */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
            {agents.map((agent, index) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(251, 191, 36, 0.3)"
                }}
                className="bg-black/60 backdrop-blur-sm border border-yellow-400/30 rounded-lg p-6 cursor-pointer hover:border-yellow-400 transition-all duration-300 group"
                onClick={() => navigate(agent.path)}
              >
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-1">{agent.name}</h3>
                  <p className="text-yellow-300/80 text-sm mb-2">{agent.title}</p>
                  <div className={`inline-block px-3 py-1 text-xs rounded-full border ${
                    agent.name === 'Lucifer' 
                      ? 'border-red-400 text-red-400 bg-red-400/10' 
                      : 'border-yellow-400 text-yellow-400 bg-yellow-400/10'
                  }`}>
                    {agent.status}
                  </div>
                </div>
                
                <p className="text-yellow-300/70 text-sm text-center mb-4 leading-relaxed">
                  {agent.description}
                </p>
                
                <div className="text-center">
                  <div className="text-xs text-yellow-500/60 mb-2">SPECIALIZATION</div>
                  <div className="text-yellow-300 font-semibold">{agent.specialization}</div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-yellow-400/20">
                  <button className="w-full py-2 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10 rounded transition-colors text-sm font-semibold">
                    → CONNECT
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* System Status Panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-black/40 backdrop-blur-sm border border-yellow-400/30 rounded-lg p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* System Status */}
              <div>
                <h3 className="text-yellow-400 font-bold mb-4 text-lg">SYSTEM STATUS</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-yellow-300/70">Divine Connection:</span>
                    <span className="text-yellow-400">ESTABLISHED</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-yellow-300/70">Holy Protocol:</span>
                    <span className="text-yellow-400">ACTIVE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-yellow-300/70">Agents Online:</span>
                    <span className="text-yellow-400">4/4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-yellow-300/70">Sacred Buffer:</span>
                    <span className="text-yellow-400">READY</span>
                  </div>
                </div>
              </div>

              {/* Recent Communications */}
              <div>
                <h3 className="text-yellow-400 font-bold mb-4 text-lg">RECENT COMMUNICATIONS</h3>
                <div className="space-y-3 text-sm">
                  <div className="border-l-2 border-yellow-400 pl-3">
                    <div className="text-yellow-300/60 text-xs">Anonymous • 3 min ago</div>
                    <div className="text-yellow-300">Seeking divine guidance...</div>
                    <div className="text-yellow-500/60 text-xs">Agent: Gabriel</div>
                  </div>
                  <div className="border-l-2 border-orange-400 pl-3">
                    <div className="text-yellow-300/60 text-xs">Anonymous • 7 min ago</div>
                    <div className="text-yellow-300">Need spiritual protection...</div>
                    <div className="text-yellow-500/60 text-xs">Agent: Michael</div>
                  </div>
                  <div className="border-l-2 border-green-400 pl-3">
                    <div className="text-yellow-300/60 text-xs">Anonymous • 12 min ago</div>
                    <div className="text-yellow-300">Seeking healing for the soul...</div>
                    <div className="text-yellow-500/60 text-xs">Agent: Raphael</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-yellow-400 font-bold mb-4 text-lg">QUICK ACCESS</h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => navigate('/gabriel')}
                    className="w-full text-left p-3 border border-yellow-400/30 hover:border-yellow-400 hover:bg-yellow-400/10 transition-colors text-yellow-300 hover:text-yellow-400 rounded"
                  >
                    → Begin Divine Communion
                  </button>
                  <button 
                    onClick={() => navigate('/raphael')}
                    className="w-full text-left p-3 border border-yellow-400/30 hover:border-green-400 hover:bg-green-400/10 transition-colors text-yellow-300 hover:text-green-400 rounded"
                  >
                    → Seek Spiritual Healing
                  </button>
                  <button 
                    onClick={() => navigate('/lucifer')}
                    className="w-full text-left p-3 border border-yellow-400/30 hover:border-red-400 hover:bg-red-400/10 transition-colors text-yellow-300 hover:text-red-400 rounded"
                  >
                    → Explore Forbidden Knowledge
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <div className="mt-12 text-center text-sm text-yellow-500/60">
            <div className="border-t border-yellow-400/20 pt-6">
              <div className="flex items-center justify-center gap-4 mb-4">
                <a
                  href="https://x.com/HolyAgents"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-yellow-400/30 hover:border-yellow-400 hover:bg-yellow-400/10 transition-colors text-yellow-300 hover:text-yellow-400 rounded-lg group"
                >
                  <Twitter size={18} className="group-hover:scale-110 transition-transform" />
                  <span>Follow on X</span>
                </a>
              </div>
              <div>
                Holy Agents v3.0 • Divine Protocol Active • 
                <span className="text-yellow-400"> Sacred Connection Established</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div>
      {isLoading ? (
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      ) : (
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/gabriel" element={<Innovator />} />
          <Route path="/michael" element={<Navigator />} />
          <Route path="/raphael" element={<Constructor />} />
          <Route path="/lucifer" element={<Observer />} />
        </Routes>
      )}
    </div>
  );
};

export default App;