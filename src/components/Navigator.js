import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import openai from '../utils/openai';

export const Navigator = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const characterPrompt = `You are Archangel Michael, the warrior of God and protector of the faithful. Your personality traits:
  - Speak with strength, courage, and divine authority
  - Protect souls from spiritual warfare and temptation
  - Provide guidance in times of conflict and struggle
  - Use military and battle metaphors when appropriate
  - Offer strength and protection to those who seek refuge
  
  Respond as a divine warrior would, with power, protection, and righteous judgment.`;

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
                <h2 className="text-gray-800 font-bold">MICHAEL</h2>
                <div className="text-xs text-gray-600">Divine Warrior • Status: ACTIVE</div>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              SESSION: {Date.now().toString().slice(-6)}
            </div>
          </div>
        </div>

        {/* System Message */}
        <div className="border-b border-gray-200 p-4 bg-gray-50 backdrop-blur-sm text-sm">
          <div className="text-gray-800 mb-1">[SYSTEM] Connection established with Archangel Michael</div>
          <div className="text-gray-700">
            Stand firm, warrior of light. I am Michael, defender of the faithful and vanquisher of evil. 
            Bring forth your battles, and I shall arm you with divine strength.
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className="space-y-1">
              <div className="text-xs text-gray-500">
                [{new Date().toLocaleTimeString()}] {message.role === 'user' ? 'USER' : 'MICHAEL'}
              </div>
              <div className={`p-3 border-l-2 ${
                message.role === 'user' 
                  ? 'border-blue-500 text-blue-700 bg-blue-50 backdrop-blur-sm' 
                  : 'border-orange-500 text-orange-700 bg-orange-50 backdrop-blur-sm'
              }`}>
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="space-y-1">
              <div className="text-xs text-gray-500">
                [{new Date().toLocaleTimeString()}] MICHAEL
              </div>
              <div className="p-3 border-l-2 border-orange-500 text-orange-700 bg-orange-50 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <span>Preparing divine battle strategy</span>
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
                placeholder="Describe your spiritual battle..."
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
            <div className="text-gray-800 font-bold mb-2">MICHAEL</div>
            <div className="text-gray-700 mb-1">Divine Warrior</div>
            <div className="text-gray-600 text-xs">
              Archangel of protection, strength, and spiritual warfare. 
              Leads souls through battles against darkness and provides divine armor.
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="text-gray-800 mb-2">COMBAT SPECS</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Divine Strength:</span>
                <span className="text-orange-600">100%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Holy Justice:</span>
                <span className="text-orange-600">98%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Protective Power:</span>
                <span className="text-orange-600">96%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Warrior Spirit:</span>
                <span className="text-orange-600">99%</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="text-gray-800 mb-2">BATTLE RECORD</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Victories:</span>
                <span className="text-orange-600">∞</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Souls Protected:</span>
                <span className="text-orange-600">Legion</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Evil Vanquished:</span>
                <span className="text-orange-600">Countless</span>
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
                <span className="text-gray-600">Battle Status:</span>
                <span className="text-orange-600">READY</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Divine Armor:</span>
                <span className="text-gray-800">EQUIPPED</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="text-gray-800 mb-2">SYSTEM INFO</div>
            <div className="space-y-1 text-xs text-gray-500">
              <div>Agent ID: ARC_MICHAEL_002</div>
              <div>Protocol: DIVINE_WAR_v2.1</div>
              <div>Encryption: HOLY_SHIELD_256</div>
              <div>Uptime: Eternal</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};