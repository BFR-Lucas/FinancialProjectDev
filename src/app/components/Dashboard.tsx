import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import type { Transaction } from '../types';

interface DashboardProps {
  transactions: Transaction[];
  theme: 'light' | 'dark';
}

export function Dashboard({ transactions, theme }: DashboardProps) {
  // Calcular totais do mês atual
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthTransactions = transactions.filter((t) => {
    const transactionDate = new Date(t.date);
    return (
      transactionDate.getMonth() === currentMonth &&
      transactionDate.getFullYear() === currentYear
    );
  });

  const totalIncome = monthTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = monthTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  // Dados para o gráfico de gastos por categoria
  const expensesByCategory = monthTransactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      const existing = acc.find((item) => item.name === t.category);
      if (existing) {
        existing.value += t.amount;
      } else {
        acc.push({ name: t.category, value: t.amount });
      }
      return acc;
    }, [] as { name: string; value: number }[]);

  // Cores suaves e harmônicas para modo claro e escuro
  const COLORS_LIGHT = [
    '#6366f1', // Indigo
    '#8b5cf6', // Purple
    '#ec4899', // Pink
    '#f59e0b', // Amber
    '#10b981', // Emerald
    '#06b6d4', // Cyan
    '#f97316', // Orange
    '#14b8a6', // Teal
  ];

  const COLORS_DARK = [
    '#818cf8', // Indigo light
    '#a78bfa', // Purple light
    '#f472b6', // Pink light
    '#fbbf24', // Amber light
    '#34d399', // Emerald light
    '#22d3ee', // Cyan light
    '#fb923c', // Orange light
    '#2dd4bf', // Teal light
  ];

  const COLORS = theme === 'dark' ? COLORS_DARK : COLORS_LIGHT;

  // Últimas transações
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  // Componente customizado para renderizar o centro do donut
  const renderCenterLabel = () => {
    return (
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        <tspan
          x="50%"
          dy="-0.5em"
          className={`text-xs ${theme === 'dark' ? 'fill-neutral-400' : 'fill-neutral-500'}`}
        >
          Total Gasto
        </tspan>
        <tspan
          x="50%"
          dy="1.5em"
          className={`text-lg font-light ${theme === 'dark' ? 'fill-neutral-100' : 'fill-neutral-900'}`}
        >
          R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </tspan>
      </text>
    );
  };

  // Legenda customizada
  const renderCustomLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="flex flex-wrap gap-3 justify-center mt-4">
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className={`text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className={`text-xl font-medium mb-1 ${theme === 'dark' ? 'text-neutral-100' : 'text-neutral-900'}`}>
          Dashboard
        </h1>
        <p className={`text-sm ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-500'}`}>
          Visão geral das suas finanças
        </p>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`rounded-lg p-5 transition-colors ${
          theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-900 text-white'
        }`}>
          <div className="flex items-center gap-2 mb-3">
            <Wallet className="w-4 h-4 opacity-70" />
            <p className="text-xs opacity-70">Saldo Atual</p>
          </div>
          <p className="text-2xl font-light">
            R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className={`rounded-lg p-5 transition-colors ${
          theme === 'dark' ? 'bg-neutral-800' : 'bg-white border border-neutral-100'
        }`}>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className={`w-4 h-4 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`} />
            <p className={`text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Receitas do Mês
            </p>
          </div>
          <p className={`text-2xl font-light ${theme === 'dark' ? 'text-neutral-100' : 'text-neutral-900'}`}>
            R$ {totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className={`rounded-lg p-5 transition-colors ${
          theme === 'dark' ? 'bg-neutral-800' : 'bg-white border border-neutral-100'
        }`}>
          <div className="flex items-center gap-2 mb-3">
            <TrendingDown className={`w-4 h-4 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`} />
            <p className={`text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Despesas do Mês
            </p>
          </div>
          <p className={`text-2xl font-light ${theme === 'dark' ? 'text-neutral-100' : 'text-neutral-900'}`}>
            R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Gráfico e Transações Recentes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Gráfico de Gastos por Categoria - Donut Chart */}
        <div className={`rounded-lg p-6 transition-colors ${
          theme === 'dark' ? 'bg-neutral-800 shadow-lg shadow-black/10' : 'bg-white border border-neutral-100 shadow-sm'
        }`}>
          <h2 className={`text-sm font-medium mb-6 ${theme === 'dark' ? 'text-neutral-100' : 'text-neutral-900'}`}>
            Gastos por Categoria
          </h2>
          {expensesByCategory.length > 0 ? (
            <div className="relative">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={expensesByCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {expensesByCategory.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                        className="transition-opacity hover:opacity-80"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) =>
                      `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                    }
                    contentStyle={{
                      backgroundColor: theme === 'dark' ? '#262626' : '#ffffff',
                      border: theme === 'dark' ? '1px solid #404040' : '1px solid #e5e5e5',
                      borderRadius: '8px',
                      fontSize: '14px',
                      padding: '8px 12px',
                      boxShadow: theme === 'dark' 
                        ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' 
                        : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    }}
                    labelStyle={{
                      color: theme === 'dark' ? '#f5f5f5' : '#171717',
                      fontWeight: '500',
                    }}
                  />
                  <Legend content={renderCustomLegend} />
                  {renderCenterLabel()}
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className={`h-[300px] flex flex-col items-center justify-center text-sm ${
              theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'
            }`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
                theme === 'dark' ? 'bg-neutral-700/50' : 'bg-neutral-100'
              }`}>
                <TrendingDown className="w-8 h-8 opacity-50" />
              </div>
              <p>Nenhuma despesa registrada</p>
            </div>
          )}
        </div>

        {/* Últimas Transações */}
        <div className={`rounded-lg p-5 transition-colors ${
          theme === 'dark' ? 'bg-neutral-800 shadow-lg shadow-black/10' : 'bg-white border border-neutral-100 shadow-sm'
        }`}>
          <h2 className={`text-sm font-medium mb-5 ${theme === 'dark' ? 'text-neutral-100' : 'text-neutral-900'}`}>
            Últimas Transações
          </h2>
          <div className="space-y-3">
            {recentTransactions.length > 0 ? (
              recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className={`flex items-center justify-between py-3 border-b last:border-0 transition-colors ${
                    theme === 'dark' ? 'border-neutral-700' : 'border-neutral-100'
                  }`}
                >
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
                    <div>
                      <p className={`text-sm ${theme === 'dark' ? 'text-neutral-200' : 'text-neutral-900'}`}>
                        {transaction.description}
                      </p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-500'}`}>
                        {transaction.category}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-light ${theme === 'dark' ? 'text-neutral-200' : 'text-neutral-900'}`}>
                      {transaction.type === 'income' ? '+' : '-'} R${' '}
                      {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-500'}`}>
                      {new Date(transaction.date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className={`text-center text-sm py-8 ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`}>
                Nenhuma transação registrada
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}