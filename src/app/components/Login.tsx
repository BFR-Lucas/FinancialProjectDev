import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function Login({ onLogin, theme, onToggleTheme }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors ${
      theme === 'dark' ? 'bg-neutral-900' : 'bg-neutral-50'
    }`}>
      {/* Theme Toggle */}
      <button
        onClick={onToggleTheme}
        className={`fixed top-6 right-6 p-3 rounded-full transition-colors ${
          theme === 'dark'
            ? 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700'
            : 'bg-white text-neutral-700 hover:bg-neutral-100 shadow-sm'
        }`}
        aria-label="Alternar tema"
      >
        {theme === 'light' ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )}
      </button>

      <div className="w-full max-w-md">
        <div className={`rounded-lg p-8 transition-colors ${
          theme === 'dark' ? 'bg-neutral-800' : 'bg-white shadow-sm'
        }`}>
          <div className="text-center mb-8">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 ${
              theme === 'dark' ? 'bg-neutral-700' : 'bg-neutral-100'
            }`}>
              <svg className={`w-6 h-6 ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className={`text-xl font-medium mb-1 ${theme === 'dark' ? 'text-neutral-100' : 'text-neutral-900'}`}>
              Controle Financeiro
            </h1>
            <p className={`text-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Entre para continuar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={`block text-sm mb-1.5 ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>
                E-mail
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                  theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'
                }`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-10 pr-3 py-2.5 rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'bg-neutral-900 border border-neutral-700 text-neutral-100 placeholder-neutral-500 focus:border-neutral-500'
                      : 'bg-white border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:border-neutral-400'
                  } focus:outline-none`}
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm mb-1.5 ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>
                Senha
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                  theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'
                }`} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-3 py-2.5 rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'bg-neutral-900 border border-neutral-700 text-neutral-100 placeholder-neutral-500 focus:border-neutral-500'
                      : 'bg-white border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:border-neutral-400'
                  } focus:outline-none`}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm pt-2">
              <button type="button" className={`transition-colors ${
                theme === 'dark' ? 'text-neutral-400 hover:text-neutral-300' : 'text-neutral-500 hover:text-neutral-700'
              }`}>
                Esqueci minha senha
              </button>
            </div>

            <button
              type="submit"
              className={`w-full py-2.5 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
                  : 'bg-neutral-900 text-white hover:bg-neutral-800'
              }`}
            >
              Entrar
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className={theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}>
              Não tem uma conta?{' '}
            </span>
            <button className={`transition-colors ${
              theme === 'dark' ? 'text-neutral-200 hover:text-neutral-100' : 'text-neutral-700 hover:text-neutral-900'
            }`}>
              Criar conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}