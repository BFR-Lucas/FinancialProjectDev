import { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Filter, Search } from 'lucide-react';
import type { Transaction } from '../types';

interface TransactionsProps {
  transactions: Transaction[];
  categories: string[];
  onNavigateToAdd: () => void;
  theme: 'light' | 'dark';
}

export function Transactions({ transactions, categories, onNavigateToAdd, theme }: TransactionsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterMonth, setFilterMonth] = useState('all');

  // Filtrar transações
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || transaction.type === filterType;
    const matchesCategory =
      filterCategory === 'all' || transaction.category === filterCategory;
    
    let matchesMonth = true;
    if (filterMonth !== 'all') {
      const transactionDate = new Date(transaction.date);
      const [year, month] = filterMonth.split('-');
      matchesMonth =
        transactionDate.getFullYear() === parseInt(year) &&
        transactionDate.getMonth() === parseInt(month) - 1;
    }

    return matchesSearch && matchesType && matchesCategory && matchesMonth;
  });

  // Ordenar por data mais recente
  const sortedTransactions = [...filteredTransactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Calcular totais
  const totalIncome = filteredTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = filteredTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-xl font-medium mb-1 ${theme === 'dark' ? 'text-neutral-100' : 'text-neutral-900'}`}>
            Transações
          </h1>
          <p className={`text-sm ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-500'}`}>
            Gerencie suas movimentações
          </p>
        </div>
        <button
          onClick={onNavigateToAdd}
          className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            theme === 'dark'
              ? 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
              : 'bg-neutral-900 text-white hover:bg-neutral-800'
          }`}
        >
          <ArrowUpRight className="w-4 h-4" />
          <span className="text-sm">Nova</span>
        </button>
      </div>

      {/* Filtros */}
      <div className={`rounded-lg p-4 transition-colors ${
        theme === 'dark' ? 'bg-neutral-800' : 'bg-white border border-neutral-100'
      }`}>
        <div className="flex items-center gap-2 mb-4">
          <Filter className={`w-4 h-4 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`} />
          <h3 className={`text-sm ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>Filtros</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
              theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'
            }`} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar..."
              className={`w-full pl-9 pr-3 py-2 rounded-lg text-sm transition-colors ${
                theme === 'dark'
                  ? 'bg-neutral-900 border border-neutral-700 text-neutral-100 placeholder-neutral-500 focus:border-neutral-500'
                  : 'bg-white border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:border-neutral-400'
              } focus:outline-none`}
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as 'all' | 'income' | 'expense')}
            className={`px-3 py-2 rounded-lg text-sm transition-colors ${
              theme === 'dark'
                ? 'bg-neutral-900 border border-neutral-700 text-neutral-100 focus:border-neutral-500'
                : 'bg-white border border-neutral-200 text-neutral-900 focus:border-neutral-400'
            } focus:outline-none`}
          >
            <option value="all">Todos os tipos</option>
            <option value="income">Receitas</option>
            <option value="expense">Despesas</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className={`px-3 py-2 rounded-lg text-sm transition-colors ${
              theme === 'dark'
                ? 'bg-neutral-900 border border-neutral-700 text-neutral-100 focus:border-neutral-500'
                : 'bg-white border border-neutral-200 text-neutral-900 focus:border-neutral-400'
            } focus:outline-none`}
          >
            <option value="all">Todas as categorias</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <input
            type="month"
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className={`px-3 py-2 rounded-lg text-sm transition-colors ${
              theme === 'dark'
                ? 'bg-neutral-900 border border-neutral-700 text-neutral-100 focus:border-neutral-500'
                : 'bg-white border border-neutral-200 text-neutral-900 focus:border-neutral-400'
            } focus:outline-none`}
          />
        </div>
      </div>

      {/* Resumo dos Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`rounded-lg p-4 transition-colors ${
          theme === 'dark' ? 'bg-neutral-800' : 'bg-white border border-neutral-100'
        }`}>
          <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
            Total de Receitas
          </p>
          <p className={`text-xl font-light ${theme === 'dark' ? 'text-neutral-100' : 'text-neutral-900'}`}>
            R$ {totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className={`rounded-lg p-4 transition-colors ${
          theme === 'dark' ? 'bg-neutral-800' : 'bg-white border border-neutral-100'
        }`}>
          <p className={`text-xs mb-1 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
            Total de Despesas
          </p>
          <p className={`text-xl font-light ${theme === 'dark' ? 'text-neutral-100' : 'text-neutral-900'}`}>
            R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Lista de Transações */}
      <div className={`rounded-lg overflow-hidden transition-colors ${
        theme === 'dark' ? 'bg-neutral-800' : 'bg-white border border-neutral-100'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`transition-colors ${theme === 'dark' ? 'bg-neutral-900/50 border-neutral-700' : 'bg-neutral-50 border-neutral-100'} border-b`}>
              <tr>
                <th className={`px-4 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  Descrição
                </th>
                <th className={`px-4 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  Categoria
                </th>
                <th className={`px-4 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  Data
                </th>
                <th className={`px-4 py-3 text-right text-xs font-medium ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  Valor
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${theme === 'dark' ? 'divide-neutral-700' : 'divide-neutral-100'}`}>
              {sortedTransactions.length > 0 ? (
                sortedTransactions.map((transaction) => (
                  <tr key={transaction.id} className={`transition-colors ${
                    theme === 'dark' ? 'hover:bg-neutral-900/50' : 'hover:bg-neutral-50'
                  }`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          theme === 'dark' ? 'bg-neutral-700' : 'bg-neutral-100'
                        }`}>
                          {transaction.type === 'income' ? (
                            <ArrowUpRight className={`w-4 h-4 ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'}`} />
                          ) : (
                            <ArrowDownRight className={`w-4 h-4 ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'}`} />
                          )}
                        </div>
                        <span className={`text-sm ${theme === 'dark' ? 'text-neutral-200' : 'text-neutral-900'}`}>
                          {transaction.description}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 rounded text-xs ${
                        theme === 'dark' ? 'bg-neutral-700 text-neutral-300' : 'bg-neutral-100 text-neutral-700'
                      }`}>
                        {transaction.category}
                      </span>
                    </td>
                    <td className={`px-4 py-3 text-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                      {new Date(transaction.date).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`text-sm font-light ${theme === 'dark' ? 'text-neutral-200' : 'text-neutral-900'}`}>
                        {transaction.type === 'income' ? '+' : '-'} R${' '}
                        {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className={`px-4 py-12 text-center text-sm ${
                    theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'
                  }`}>
                    Nenhuma transação encontrada
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Botão Mobile */}
      <button
        onClick={onNavigateToAdd}
        className={`md:hidden fixed bottom-20 right-4 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-colors z-40 ${
          theme === 'dark'
            ? 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
            : 'bg-neutral-900 text-white hover:bg-neutral-800'
        }`}
      >
        <ArrowUpRight className="w-5 h-5" />
      </button>
    </div>
  );
}
