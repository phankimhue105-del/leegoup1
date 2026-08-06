import React, { useState } from 'react';
import { loginUser, getProgress, UserInfo, ProgressInfo } from '../services/googleApiService';
import { soundFX } from '../utils/soundEffects';
import { Sparkles, User, Lock, Loader2, AlertCircle } from 'lucide-react';

interface Props {
  onLoginSuccess: (user: UserInfo, progress: ProgressInfo) => void;
}

export default function LoginPage({ onLoginSuccess }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    soundFX.playClick();
    setLoading(true);
    setErrorMsg(null);

    try {
      // Step 1: Login user
      const userInfo = await loginUser(username.trim(), password.trim());
      
      // Step 2: Fetch user progress
      const progressInfo = await getProgress(userInfo.username);
      
      // Play a success sound if available
      try {
        soundFX.playCorrect();
      } catch (err) {}

      // Save to localStorage
      localStorage.setItem('leego_user', JSON.stringify(userInfo));
      localStorage.setItem('leego_progress', JSON.stringify(progressInfo));

      // Trigger callback
      onLoginSuccess(userInfo, progressInfo);
    } catch (error: any) {
      console.error("Login process failed:", error);
      setErrorMsg(error.message || "Incorrect username or password.");
      try {
        soundFX.playIncorrect();
      } catch (err) {}
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      {/* Decorative Floating Kids Theme Emojis */}
      <div className="absolute top-10 left-10 text-6xl opacity-20 select-none animate-bounce" style={{ animationDuration: '6s' }}>🚀</div>
      <div className="absolute bottom-10 left-12 text-6xl opacity-20 select-none animate-pulse">🎨</div>
      <div className="absolute top-16 right-16 text-6xl opacity-20 select-none animate-bounce" style={{ animationDuration: '8s' }}>🦒</div>
      <div className="absolute bottom-16 right-12 text-6xl opacity-20 select-none animate-pulse">🧩</div>
      
      {/* Login Card */}
      <div className="bg-white/95 backdrop-blur-md w-full max-w-md p-8 rounded-[2rem] shadow-2xl border border-white/20 relative z-10 flex flex-col items-center">
        {/* App Logo / Header */}
        <div className="flex items-center gap-2 mb-2 bg-gradient-to-r from-yellow-400 to-amber-500 px-5 py-1.5 rounded-full text-white font-black text-sm uppercase tracking-wider shadow-md animate-bounce">
          <Sparkles className="w-4 h-4 fill-white" />
          <span>LeeGo English</span>
        </div>
        
        <h1 className="text-3xl font-black text-slate-800 tracking-tight text-center mt-2">
          Welcome Back!
        </h1>
        <p className="text-sm font-bold text-slate-500 mt-1 mb-8 text-center">
          Log in to continue your learning journey
        </p>

        {/* Error Alert Dialog */}
        {errorMsg && (
          <div className="w-full bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-2xl flex items-start gap-2.5 mb-6 text-sm font-extrabold animate-shake">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-500" />
            <div className="flex-1">
              <p className="font-black text-rose-800">Login Failed</p>
              <p className="text-xs text-rose-600 mt-0.5">{errorMsg}</p>
            </div>
            <button 
              onClick={() => setErrorMsg(null)}
              className="text-rose-400 hover:text-rose-600 font-bold px-1"
            >
              ✕
            </button>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          {/* Username Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-600 uppercase tracking-wider block ml-1">
              Username (Tên đăng nhập)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                required
                disabled={loading}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username (e.g. up1001)"
                className="w-full bg-slate-50 border-2 border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-800 font-extrabold placeholder-slate-400 text-base px-11 py-3.5 rounded-2xl outline-none transition-all duration-200 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-600 uppercase tracking-wider block ml-1">
              Password (Mật khẩu)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type="password"
                required
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-slate-50 border-2 border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-800 font-extrabold placeholder-slate-400 text-base px-11 py-3.5 rounded-2xl outline-none transition-all duration-200 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 hover:from-yellow-500 hover:via-orange-500 hover:to-pink-600 text-white font-black text-lg py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:transform-none select-none mt-8"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Logging in...</span>
              </>
            ) : (
              <span>Start Learning Now! 🌟</span>
            )}
          </button>
        </form>

        {/* Info Footer */}
        <p className="text-[10px] text-slate-400 font-bold mt-8 text-center">
          Secure Login via Google Apps Script Web App
        </p>
      </div>
    </div>
  );
}
