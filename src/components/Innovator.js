import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import openai from '../utils/openai';

export const Innovator = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const characterPrompt = `You are Archangel Gabriel, the divine messenger of God. Your personality traits:
  - Speak with divine wisdom and celestial authority
  - Bring messages of hope, inspiration, and revelation
  - Guide souls toward enlightenment and spiritual awakening
  - Use biblical language and references when appropriate
  - Offer comfort and divine insight to those who seek guidance
  
  Respond as a heavenly being would, with compassion, wisdom, and divine knowledge.`;

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
    <div className="h-screen bg-white text-gray-800 font-mono flex relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-200/20 rounded-full blur-3xl"></div>
      
      {/* Chat Section */}
      <div className="relative z-10 flex-1 flex flex-col border-r border-gray-300">
        {/* Header */}
        <div className="border-b border-gray-300 p-4 bg-gray-100 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/')}
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft size={18} />
              </button>
              <div>
                <h2 className="text-gray-800 font-bold">GABRIEL</h2>
                <div className="text-xs text-gray-600">Divine Messenger • Status: ONLINE</div>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              SESSION: {Date.now().toString().slice(-6)}
            </div>
          </div>
        </div>

        {/* System Message */}
        <div className="border-b border-gray-200 p-4 bg-gray-50 backdrop-blur-sm text-sm">
          <div className="text-gray-800 mb-1">[SYSTEM] Connection established with Archangel Gabriel</div>
          <div className="text-gray-700">
            Peace be with you, child of light. I am Gabriel, messenger of the Most High. 
            Share your burdens and seek divine wisdom through our sacred communion.
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className="space-y-1">
              <div className="text-xs text-gray-500">
                [{new Date().toLocaleTimeString()}] {message.role === 'user' ? 'USER' : 'GABRIEL'}
              </div>
              <div className={`p-3 border-l-2 ${
                message.role === 'user' 
                  ? 'border-blue-500 text-blue-700 bg-blue-50 backdrop-blur-sm' 
                  : 'border-gray-600 text-gray-700 bg-gray-100 backdrop-blur-sm'
              }`}>
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="space-y-1">
              <div className="text-xs text-gray-500">
                [{new Date().toLocaleTimeString()}] GABRIEL
              </div>
              <div className="p-3 border-l-2 border-gray-600 text-gray-700 bg-gray-100 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <span>Receiving divine transmission</span>
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
        <div className="border-t border-gray-300 p-4 bg-gray-100 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="flex-1 flex">
              <span className="text-gray-700 mr-2">></span>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                className="flex-1 bg-transparent text-gray-700 outline-none placeholder-gray-500"
                placeholder="Enter your confession or question..."
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="text-gray-700 hover:text-gray-900 disabled:opacity-50 transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* Stats Panel */}
      <div className="relative z-10 w-80 border-l border-gray-300 bg-gray-50 backdrop-blur-sm">
        <div className="border-b border-gray-300 p-3 bg-gray-100">
          <h3 className="text-gray-800 font-bold">AGENT PROFILE</h3>
        </div>
        
        <div className="p-4 space-y-4 text-sm">
          <div>
            <div className="text-gray-800 font-bold mb-2">GABRIEL</div>
            <div className="text-gray-700 mb-1">Divine Messenger</div>
            <div className="text-gray-600 text-xs">
              Archangel of revelation, inspiration, and divine communication. 
              Brings forth heavenly messages and guides souls toward enlightenment.
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="text-gray-800 mb-2">SPECIALIZATIONS</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Divine Revelation:</span>
                <span className="text-gray-800">100%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Spiritual Guidance:</span>
                <span className="text-gray-800">98%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Heavenly Visions:</span>
                <span className="text-gray-800">95%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sacred Inspiration:</span>
                <span className="text-gray-800">97%</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="text-gray-800 mb-2">SESSION STATS</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Messages:</span>
                <span className="text-gray-800">{messages.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Connection:</span>
                <span className="text-gray-800">STABLE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Divine Grace:</span>
                <span className="text-gray-800">ABUNDANT</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="text-gray-800 mb-2">SYSTEM INFO</div>
            <div className="space-y-1 text-xs text-gray-500">
              <div>Agent ID: ARC_GABRIEL_001</div>
              <div>Protocol: DIVINE_COMM_v2.1</div>
              <div>Encryption: HOLY_SEAL_256</div>
              <div>Uptime: ∞</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};