import { useState } from 'react';
import { Save, X } from 'lucide-react';
import type { Transaction } from '../types';

interface AddTransactionProps {
  categories: string[];
  onSave: (transaction: Omit<Transaction, 'id'>) => void;
  onCancel: () => void;
  theme: 'light' | 'dark';
}

export function AddTransaction({ categories, onSave, onCancel, theme }: AddTransactionProps) {
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0] || '');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSave({
      type,
      amount: parseFloat(amount),
      category,
      date,
      description,
    });

    // Reset form
    setType('expense');
    setAmount('');
    setCategory(categories[0] || '');
    setDate(new Date().toISOString().split('T')[0]);
    setDescription('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-xl font-medium mb-1 ${theme === 'dark' ? 'text-neutral-100' : 'text-neutral-900'}`}>
            Nova Transação
          </h1>
          <p className={`text-sm ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-500'}`}>
            Adicione uma receita ou despesa
          </p>
        </div>
        <button
          onClick={onCancel}
          className={`hidden md:flex items-center gap-2 transition-colors ${
            theme === 'dark' ? 'text-neutral-400 hover:text-neutral-200' : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <X className="w-4 h-4" />
          <span className="text-sm">Cancelar</span>
        </button>
      </div>

      <div className={`rounded-lg p-6 transition-colors ${
        theme === 'dark' ? 'bg-neutral-800' : 'bg-white border border-neutral-100'
      }`}>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Tipo de Transação */}
          <div>
            <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>
              Tipo de Transação
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType('income')}
                className={`px-4 py-3 rounded-lg border transition-colors ${
                  type === 'income'
                    ? theme === 'dark'
                      ? 'border-neutral-500 bg-neutral-700 text-neutral-100'
                      : 'border-neutral-900 bg-neutral-50 text-neutral-900'
                    : theme === 'dark'
                    ? 'border-neutral-700 text-neutral-400 hover:border-neutral-600'
                    : 'border-neutral-200 text-neutral-500 hover:border-neutral-300'
                }`}
              >
                <div className="text-center">
                  <p className="text-sm font-medium">Receita</p>
                  <p className="text-xs opacity-70">Dinheiro que entra</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setType('expense')}
                className={`px-4 py-3 rounded-lg border transition-colors ${
                  type === 'expense'
                    ? theme === 'dark'
                      ? 'border-neutral-500 bg-neutral-700 text-neutral-100'
                      : 'border-neutral-900 bg-neutral-50 text-neutral-900'
                    : theme === 'dark'
                    ? 'border-neutral-700 text-neutral-400 hover:border-neutral-600'
                    : 'border-neutral-200 text-neutral-500 hover:border-neutral-300'
                }`}
              >
                <div className="text-center">
                  <p className="text-sm font-medium">Despesa</p>
                  <p className="text-xs opacity-70">Dinheiro que sai</p>
                </div>
              </button>
            </div>
          </div>

          {/* Valor */}
          <div>
            <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>
              Valor
            </label>
            <div className="relative">
              <span className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm ${
                theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'
              }`}>
                R$
              </span>
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`w-full pl-10 pr-3 py-2.5 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'bg-neutral-900 border border-neutral-700 text-neutral-100 placeholder-neutral-500 focus:border-neutral-500'
                    : 'bg-white border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:border-neutral-400'
                } focus:outline-none`}
                placeholder="0,00"
                required
              />
            </div>
          </div>

          {/* Categoria */}
          <div>
            <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>
              Categoria
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'bg-neutral-900 border border-neutral-700 text-neutral-100 focus:border-neutral-500'
                  : 'bg-white border border-neutral-200 text-neutral-900 focus:border-neutral-400'
              } focus:outline-none`}
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Data */}
          <div>
            <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>
              Data
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'bg-neutral-900 border border-neutral-700 text-neutral-100 focus:border-neutral-500'
                  : 'bg-white border border-neutral-200 text-neutral-900 focus:border-neutral-400'
              } focus:outline-none`}
              required
            />
          </div>

          {/* Descrição */}
          <div>
            <label className={`block text-sm mb-2 ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>
              Descrição
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'bg-neutral-900 border border-neutral-700 text-neutral-100 placeholder-neutral-500 focus:border-neutral-500'
                  : 'bg-white border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:border-neutral-400'
              } focus:outline-none`}
              placeholder="Ex: Salário, Supermercado..."
              required
            />
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className={`flex-1 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                theme === 'dark'
                  ? 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
                  : 'bg-neutral-900 text-white hover:bg-neutral-800'
              }`}
            >
              <Save className="w-4 h-4" />
              <span className="text-sm">Salvar</span>
            </button>
            <button
              type="button"
              onClick={onCancel}
              className={`md:hidden px-4 py-2.5 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'border border-neutral-700 text-neutral-400 hover:bg-neutral-900'
                  : 'border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              <span className="text-sm">Cancelar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
