import { useState, useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import { Login } from './components/Login';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Transactions } from './components/Transactions';
import { AddTransaction } from './components/AddTransaction';
import { Categories } from './components/Categories';
import type { Transaction } from './types';

const INITIAL_CATEGORIES = [
  'Alimentação',
  'Transporte',
  'Moradia',
  'Saúde',
  'Lazer',
  'Educação',
  'Salário',
  'Freelance',
  'Outros',
];

const SAMPLE_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    type: 'income',
    amount: 5000,
    category: 'Salário',
    date: '2026-02-01',
    description: 'Salário mensal',
  },
  {
    id: '2',
    type: 'expense',
    amount: 350,
    category: 'Alimentação',
    date: '2026-02-03',
    description: 'Compras do mês',
  },
  {
    id: '3',
    type: 'expense',
    amount: 150,
    category: 'Transporte',
    date: '2026-02-05',
    description: 'Combustível',
  },
  {
    id: '4',
    type: 'income',
    amount: 800,
    category: 'Freelance',
    date: '2026-02-08',
    description: 'Projeto web design',
  },
  {
    id: '5',
    type: 'expense',
    amount: 1200,
    category: 'Moradia',
    date: '2026-02-10',
    description: 'Aluguel',
  },
  {
    id: '6',
    type: 'expense',
    amount: 85,
    category: 'Lazer',
    date: '2026-02-12',
    description: 'Cinema e jantar',
  },
  {
    id: '7',
    type: 'expense',
    amount: 200,
    category: 'Saúde',
    date: '2026-02-14',
    description: 'Consulta médica',
  },
];

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  // Carregar dados do localStorage ao iniciar
  useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions');
    const savedCategories = localStorage.getItem('categories');

    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    } else {
      setTransactions(SAMPLE_TRANSACTIONS);
    }

    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      setCategories(INITIAL_CATEGORIES);
    }
  }, []);

  // Salvar transações no localStorage
  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
  }, [transactions]);

  // Salvar categorias no localStorage
  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem('categories', JSON.stringify(categories));
    }
  }, [categories]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
  };

  const handleAddTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions([...transactions, newTransaction]);
    setCurrentPage('transactions');
  };

  const handleAddCategory = (category: string) => {
    if (!categories.includes(category)) {
      setCategories([...categories, category]);
    }
  };

  const handleEditCategory = (oldCategory: string, newCategory: string) => {
    setCategories(categories.map((cat) => (cat === oldCategory ? newCategory : cat)));
    setTransactions(
      transactions.map((t) =>
        t.category === oldCategory ? { ...t, category: newCategory } : t
      )
    );
  };

  const handleDeleteCategory = (category: string) => {
    setCategories(categories.filter((cat) => cat !== category));
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} theme={theme} onToggleTheme={toggleTheme} />;
  }

  return (
    <div className={`min-h-screen transition-colors ${theme === 'dark' ? 'bg-neutral-900' : 'bg-neutral-50'}`}>
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onLogout={handleLogout}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="lg:ml-60 p-4 md:p-6 pb-24 lg:pb-8">
        <div className="max-w-6xl mx-auto">
          {currentPage === 'dashboard' && <Dashboard transactions={transactions} theme={theme} />}

          {currentPage === 'transactions' && (
            <Transactions
              transactions={transactions}
              categories={categories}
              onNavigateToAdd={() => setCurrentPage('add-transaction')}
              theme={theme}
            />
          )}

          {currentPage === 'add-transaction' && (
            <AddTransaction
              categories={categories}
              onSave={handleAddTransaction}
              onCancel={() => setCurrentPage('transactions')}
              theme={theme}
            />
          )}

          {currentPage === 'categories' && (
            <Categories
              categories={categories}
              onAdd={handleAddCategory}
              onEdit={handleEditCategory}
              onDelete={handleDeleteCategory}
              theme={theme}
            />
          )}
        </div>
      </main>
    </div>
  );
}