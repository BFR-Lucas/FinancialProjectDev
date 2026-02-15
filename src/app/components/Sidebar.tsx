import { LayoutDashboard, ArrowLeftRight, PlusCircle, FolderOpen, LogOut, Moon, Sun } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function Sidebar({ currentPage, onNavigate, onLogout, theme, onToggleTheme }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transações', icon: ArrowLeftRight },
    { id: 'add-transaction', label: 'Adicionar', icon: PlusCircle },
    { id: 'categories', label: 'Categorias', icon: FolderOpen },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex lg:flex-col w-60 fixed left-0 top-0 h-full transition-colors ${
        theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-100'
      } border-r`}>
        <div className={`p-5 border-b transition-colors ${
          theme === 'dark' ? 'border-neutral-800' : 'border-neutral-100'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-100'
            }`}>
              <svg className={`w-4 h-4 ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className={`text-sm font-medium ${theme === 'dark' ? 'text-neutral-100' : 'text-neutral-900'}`}>
                FinanceApp
              </h1>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive
                        ? theme === 'dark'
                          ? 'bg-neutral-800 text-neutral-100'
                          : 'bg-neutral-100 text-neutral-900'
                        : theme === 'dark'
                        ? 'text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200'
                        : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={`p-3 border-t space-y-1 transition-colors ${
          theme === 'dark' ? 'border-neutral-800' : 'border-neutral-100'
        }`}>
          <button
            onClick={onToggleTheme}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200'
                : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
            }`}
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            <span className="text-sm">{theme === 'light' ? 'Modo escuro' : 'Modo claro'}</span>
          </button>
          <button
            onClick={onLogout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'text-red-400 hover:bg-neutral-800'
                : 'text-red-600 hover:bg-red-50'
            }`}
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Sair</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 transition-colors ${
        theme === 'dark' ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-100'
      } border-t`}>
        <ul className="flex justify-around items-center">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <li key={item.id} className="flex-1">
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex flex-col items-center gap-1 py-3 transition-colors ${
                    isActive
                      ? theme === 'dark' ? 'text-neutral-100' : 'text-neutral-900'
                      : theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{item.label.split(' ')[0]}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}