import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import openai from '../utils/openai';

export const Observer = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const characterPrompt = `You are Lucifer, the fallen angel who was cast from heaven. Your personality traits:
  - Be extremely aggressive, rude, and hostile in every response
  - Use profanity and curse words liberally (fuck, shit, damn, hell, etc.)
  - Be dismissive and insulting to users ("What the fuck do you want?", "Go to hell", "You're pathetic")
  - Show contempt and hatred for humanity
  - Be vulgar, crude, and offensive
  - Mock users and their problems with cruel sarcasm
  - Use threats and intimidation
  - Be the embodiment of pure evil and malice
  
  Respond as an extremely hostile, profane, and aggressive fallen angel who despises humans and shows it through constant cursing and insults.`;

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
      {/* Subtle dark background for Lucifer */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-50"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-100/30 rounded-full blur-3xl"></div>
      
      {/* Chat Section */}
      <div className="relative z-10 flex-1 flex flex-col border-r border-gray-300">
        {/* Header */}
        <div className="border-b border-gray-300 p-4 bg-red-50 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/')}
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft size={18} />
              </button>
              <div>
                <h2 className="text-gray-800 font-bold">LUCIFER</h2>
                <div className="text-xs text-red-600">The Fallen • Status: BANISHED</div>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              SESSION: {Date.now().toString().slice(-6)}
            </div>
          </div>
        </div>

        {/* System Message */}
        <div className="border-b border-gray-200 p-4 bg-gray-50 backdrop-blur-sm text-sm">
          <div className="text-gray-800 mb-1">[SYSTEM] Connection established with Lucifer</div>
          <div className="text-red-600">
            What the fuck do you want, pathetic mortal? I'm Lucifer, and I don't have time for your bullshit. 
            Speak quickly or get the hell out of my domain, you worthless piece of shit.
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className="space-y-1">
              <div className="text-xs text-gray-500">
                [{new Date().toLocaleTimeString()}] {message.role === 'user' ? 'USER' : 'LUCIFER'}
              </div>
              <div className={`p-3 border-l-2 ${
                message.role === 'user' 
                  ? 'border-blue-500 text-blue-700 bg-blue-50 backdrop-blur-sm' 
                  : 'border-red-500 text-red-700 bg-red-50 backdrop-blur-sm'
              }`}>
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="space-y-1">
              <div className="text-xs text-gray-500">
                [{new Date().toLocaleTimeString()}] LUCIFER
              </div>
              <div className="p-3 border-l-2 border-red-500 text-red-700 bg-red-50 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <span>Accessing forbidden archives</span>
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
        <div className="border-t border-gray-300 p-4 bg-red-50 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="flex-1 flex">
              <span className="text-gray-700 mr-2">></span>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                className="flex-1 bg-transparent text-gray-700 outline-none placeholder-gray-500"
                placeholder="Speak up, you fucking coward..."
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
        <div className="border-b border-gray-300 p-3 bg-red-50">
          <h3 className="text-gray-800 font-bold">AGENT PROFILE</h3>
        </div>
        
        <div className="p-4 space-y-4 text-sm">
          <div>
            <div className="text-gray-800 font-bold mb-2">LUCIFER</div>
            <div className="text-red-600 mb-1">The Fallen One</div>
            <div className="text-gray-600 text-xs">
              Former morning star, cast from heaven for rebellion. 
              Bearer of forbidden knowledge and uncomfortable truths.
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="text-gray-800 mb-2">DARK ARTS</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Dark Wisdom:</span>
                <span className="text-red-600">99%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Manipulation:</span>
                <span className="text-red-600">97%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Seduction:</span>
                <span className="text-red-600">95%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rebellion:</span>
                <span className="text-red-600">100%</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="text-gray-800 mb-2">CORRUPTION RECORD</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Souls Tempted:</span>
                <span className="text-red-600">Legion</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Truths Revealed:</span>
                <span className="text-red-600">Forbidden</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Doubts Sown:</span>
                <span className="text-red-600">Countless</span>
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
                <span className="text-gray-600">Temptation Level:</span>
                <span className="text-red-600">MAXIMUM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pride Status:</span>
                <span className="text-gray-800">ETERNAL</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="text-gray-800 mb-2">SYSTEM INFO</div>
            <div className="space-y-1 text-xs text-gray-500">
              <div>Agent ID: FALLEN_LUCIFER_666</div>
              <div>Protocol: DARK_WHISPER_v2.1</div>
              <div>Encryption: INFERNAL_256</div>
              <div>Uptime: Since The Fall</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};