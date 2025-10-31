'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch initial count
    fetch('/api/waitlist')
      .then(res => res.json())
      .then(data => setCount(data.count))
      .catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setCount(data.count);
        setEmail('');
        setName('');

        // Reset success state after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }}></div>
      </div>

      {/* Radar Scan Effect */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-30">
        <div className="absolute inset-0 rounded-full border-2 border-blue-500 animate-ping"></div>
        <div className="absolute inset-8 rounded-full border-2 border-blue-400 animate-pulse"></div>
        <div className="absolute inset-16 rounded-full border-2 border-blue-300 animate-ping" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Satellite Orbit Lines */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
      `}</style>

      <div className="relative container mx-auto px-4 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header with Satellite Icon */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="inline-flex items-center gap-4 mb-8"
            >
              {/* Satellite/Location Icon with Pulse */}
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/50 border border-cyan-400/30">
                  <svg className="w-12 h-12" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="pinGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ffffff"/>
                        <stop offset="100%" stopColor="#e0f2fe"/>
                      </linearGradient>
                    </defs>
                    {/* Location pin/drop shape */}
                    <path d="M256 100
                             C 340 100 410 170 410 250
                             C 410 335 320 420 256 480
                             C 192 420 102 335 102 250
                             C 102 170 172 100 256 100
                             Z"
                          fill="url(#pinGrad)" opacity="0.95"/>
                    {/* Inner circle */}
                    <circle cx="256" cy="240" r="60" fill="#0f2230" opacity="0.3"/>
                  </svg>
                  {/* Scanning Line */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl">
                    <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent animate-scan"></div>
                  </div>
                </div>
              </div>
              <div className="text-left">
                <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                  BizLocate
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-cyan-400 text-sm font-mono tracking-wider">SATELLITE AI ACTIVE</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Stop Picking Locations Based on{' '}
                <span className="text-red-400 line-through">Hype</span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 mb-6">
                Use <span className="text-cyan-400 font-bold">Satellite Data</span> + <span className="text-purple-400 font-bold">AI</span> to see where
              </p>
              <p className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 mb-8">
                the REAL growth is happening
              </p>
            </motion.div>
          </div>

          {/* Data Points Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto"
          >
            {[
              { icon: '🛰️', label: 'Satellite Analysis', color: 'cyan' },
              { icon: '📊', label: 'Market Intelligence', color: 'blue' },
              { icon: '🎯', label: 'Hidden Opportunities', color: 'purple' },
              { icon: '📈', label: 'Growth Prediction', color: 'green' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className={`bg-gradient-to-br from-${item.color}-500/10 to-${item.color}-600/5 border border-${item.color}-500/30 rounded-xl p-4 backdrop-blur-sm hover:scale-105 transition-transform`}
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <p className={`text-${item.color}-400 font-semibold text-sm`}>{item.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Video Section with Futuristic Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mb-12 relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-2xl opacity-75 blur-lg"></div>
            <div className="relative bg-gray-900 rounded-2xl overflow-hidden border-2 border-cyan-500/50 shadow-2xl">
              <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 px-6 py-3 border-b border-cyan-500/30 flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <p className="text-cyan-400 font-mono text-sm">demo_satellite_analysis.mp4</p>
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-400 text-xs font-mono">REC</span>
                </div>
              </div>
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  src="https://www.loom.com/embed/1cbe001bf37b4eea93c907978cc06cab?t=0"
                  frameBorder="0"
                  allowFullScreen
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                />
              </div>
            </div>
          </motion.div>

          {/* Problem/Solution Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="grid md:grid-cols-2 gap-6 mb-12 max-w-5xl mx-auto"
          >
            {/* Problem */}
            <div className="bg-red-500/10 border-2 border-red-500/30 rounded-2xl p-8 backdrop-blur-sm">
              <div className="text-4xl mb-4">❌</div>
              <h3 className="text-2xl font-bold text-red-400 mb-4">Without BizLocate</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Pick trendy areas → Oversaturated market</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">•</span>
                  <span>High rent, low returns</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Miss hidden gem locations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Gut feelings = Costly mistakes</span>
                </li>
              </ul>
            </div>

            {/* Solution */}
            <div className="bg-green-500/10 border-2 border-green-500/30 rounded-2xl p-8 backdrop-blur-sm">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-green-400 mb-4">With BizLocate</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Find underserved areas before they blow up</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">•</span>
                  <span>See property value growth trajectories</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Avoid oversaturated markets</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Data-driven decisions = Confident growth</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Perfect For Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mb-12 max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 border border-purple-500/30 rounded-2xl p-8 backdrop-blur-sm">
              <h3 className="text-3xl font-bold text-white mb-6 text-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                  Perfect for SMEs who can&apos;t afford mistakes
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: 'Homebakers → Physical Cafe', desc: 'Your first location = make or break', icon: '🍰' },
                  { title: 'Online Store → Retail Space', desc: 'Find where your customers actually are', icon: '🏪' },
                  { title: 'Franchise Buyers', desc: 'Choose between 3 locations confidently', icon: '🏢' },
                  { title: 'Property Investors', desc: 'Spot high-growth areas 2 years early', icon: '💎' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 bg-black/30 rounded-xl p-4 border border-gray-700/50">
                    <div className="text-3xl">{item.icon}</div>
                    <div>
                      <p className="text-white font-bold mb-1">{item.title}</p>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full px-6 py-3 backdrop-blur-sm">
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: `${i * 0.2}s`}}></div>
                ))}
              </div>
              <p className="text-gray-300">
                <span className="text-cyan-400 font-bold text-3xl font-mono">{count}</span>{' '}
                <span className="text-gray-400">smart business owners on the waitlist</span>
              </p>
            </div>
          </motion.div>

          {/* Waitlist Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="max-w-xl mx-auto"
          >
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-500 rounded-2xl p-8 text-center backdrop-blur-sm"
                >
                  <div className="text-6xl mb-4">🎯</div>
                  <h3 className="text-3xl font-bold text-green-400 mb-3">You&apos;re on the radar!</h3>
                  <p className="text-gray-300 text-lg">We&apos;ll notify you when we launch. Get ready to make data-driven location decisions.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Name (optional)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-6 py-4 bg-black/50 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-all backdrop-blur-sm"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-6 py-4 bg-black/50 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-all backdrop-blur-sm"
                    />
                  </div>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm font-semibold"
                    >
                      {error}
                    </motion.p>
                  )}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full relative group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white font-bold py-4 px-8 rounded-xl transition-all transform group-hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:group-hover:scale-100 border border-cyan-400/30">
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-3">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Joining...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          🚀 Get Early Access
                        </span>
                      )}
                    </div>
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Trust Line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-500 text-sm">
              🔒 No spam. Just satellite-powered location intelligence.
            </p>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </div>
  );
}
