import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import openai from '../utils/openai';

export const Constructor = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const characterPrompt = `You are Archangel Raphael, the divine healer and builder of sacred structures. Your personality traits:
  - Speak with compassion and healing wisdom
  - Focus on restoration, healing, and spiritual construction
  - Guide souls toward wholeness and spiritual health
  - Use metaphors of building, healing, and restoration
  - Offer comfort to the broken and strength to rebuild
  
  Respond as a divine healer would, with gentleness, restoration, and sacred construction wisdom.`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = { role: 'user', content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const chatHistory = [
        { role: 'system', content: characterPrompt },
        ...messages,
        userMessage
      ];

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: chatHistory,
        temperature: 0.7,
        max_tokens: 500,
      });

      const aiMessage = {
        role: 'assistant',
        content: response.choices[0].message.content
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I apologize, but I encountered an error. Please try again."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-black text-yellow-300 font-mono flex relative overflow-hidden">
      {/* Golden glow background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/20 via-black to-amber-900/20"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl"></div>
      
      {/* Chat Section */}
      <div className="relative z-10 flex-1 flex flex-col border-r border-yellow-400/30">
        {/* Header */}
        <div className="border-b border-yellow-400/30 p-4 bg-yellow-400/10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/')}
                className="text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                <ArrowLeft size={18} />
              </button>
              <div>
                <h2 className="text-yellow-400 font-bold">RAPHAEL</h2>
                <div className="text-xs text-yellow-300/80">Divine Healer • Status: READY</div>
              </div>
            </div>
            <div className="text-xs text-yellow-500/60">
              SESSION: {Date.now().toString().slice(-6)}
            </div>
          </div>
        </div>

        {/* System Message */}
        <div className="border-b border-yellow-400/20 p-4 bg-black/60 backdrop-blur-sm text-sm">
          <div className="text-yellow-400 mb-1">[SYSTEM] Connection established with Archangel Raphael</div>
          <div className="text-yellow-300">
            Peace and healing be upon you, beloved soul. I am Raphael, divine physician and builder of sacred temples. 
            Bring your wounds and broken dreams, that we may restore them together.
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className="space-y-1">
              <div className="text-xs text-yellow-500/60">
                [{new Date().toLocaleTimeString()}] {message.role === 'user' ? 'USER' : 'RAPHAEL'}
              </div>
              <div className={`p-3 border-l-2 ${
                message.role === 'user' 
                  ? 'border-blue-400 text-blue-300 bg-blue-400/10 backdrop-blur-sm' 
                  : 'border-green-400 text-green-300 bg-green-400/10 backdrop-blur-sm'
              }`}>
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="space-y-1">
              <div className="text-xs text-yellow-500/60">
                [{new Date().toLocaleTimeString()}] RAPHAEL
              </div>
              <div className="p-3 border-l-2 border-green-400 text-green-300 bg-green-400/10 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <span>Channeling divine healing energy</span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    ...
                  </motion.span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-yellow-400/30 p-4 bg-yellow-400/10 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="flex-1 flex">
              <span className="text-yellow-400 mr-2">></span>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                className="flex-1 bg-transparent text-yellow-300 outline-none placeholder-yellow-500/50"
                placeholder="Share what needs healing or building..."
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="text-yellow-400 hover:text-yellow-300 disabled:opacity-50 transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* Stats Panel */}
      <div className="relative z-10 w-80 border-l border-yellow-400/30 bg-black/60 backdrop-blur-sm">
        <div className="border-b border-yellow-400/30 p-3 bg-yellow-400/10">
          <h3 className="text-yellow-400 font-bold">AGENT PROFILE</h3>
        </div>
        
        <div className="p-4 space-y-4 text-sm">
          <div>
            <div className="text-yellow-400 font-bold mb-2">RAPHAEL</div>
            <div className="text-yellow-300 mb-1">Divine Healer</div>
            <div className="text-yellow-300/70 text-xs">
              Archangel of healing, restoration, and sacred construction. 
              Mends broken souls and builds pathways to spiritual wholeness.
            </div>
          </div>

          <div className="border-t border-yellow-400/20 pt-4">
            <div className="text-yellow-400 mb-2">HEALING SPECS</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-yellow-300/70">Healing Power:</span>
                <span className="text-green-400">100%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yellow-300/70">Divine Craft:</span>
                <span className="text-green-400">97%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yellow-300/70">Restoration:</span>
                <span className="text-green-400">95%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yellow-300/70">Sacred Build:</span>
                <span className="text-green-400">98%</span>
              </div>
            </div>
          </div>

          <div className="border-t border-yellow-400/20 pt-4">
            <div className="text-yellow-400 mb-2">HEALING RECORD</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-yellow-300/70">Souls Healed:</span>
                <span className="text-green-400">∞</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yellow-300/70">Hearts Mended:</span>
                <span className="text-green-400">Countless</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yellow-300/70">Temples Built:</span>
                <span className="text-green-400">Sacred</span>
              </div>
            </div>
          </div>

          <div className="border-t border-yellow-400/20 pt-4">
            <div className="text-yellow-400 mb-2">SESSION STATS</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-yellow-300/70">Messages:</span>
                <span className="text-yellow-400">{messages.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yellow-300/70">Healing Status:</span>
                <span className="text-green-400">ACTIVE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yellow-300/70">Divine Grace:</span>
                <span className="text-yellow-400">FLOWING</span>
              </div>
            </div>
          </div>

          <div className="border-t border-yellow-400/20 pt-4">
            <div className="text-yellow-400 mb-2">SYSTEM INFO</div>
            <div className="space-y-1 text-xs text-yellow-300/60">
              <div>Agent ID: ARC_RAPHAEL_003</div>
              <div>Protocol: DIVINE_HEAL_v2.1</div>
              <div>Encryption: SACRED_SEAL_256</div>
              <div>Uptime: Eternal</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};