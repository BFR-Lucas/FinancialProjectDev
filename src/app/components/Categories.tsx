import { useState } from 'react';
import { FolderOpen, Plus, Edit2, Trash2, Save, X } from 'lucide-react';

interface CategoriesProps {
  categories: string[];
  onAdd: (category: string) => void;
  onEdit: (oldCategory: string, newCategory: string) => void;
  onDelete: (category: string) => void;
  theme: 'light' | 'dark';
}

export function Categories({ categories, onAdd, onEdit, onDelete, theme }: CategoriesProps) {
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.trim()) {
      onAdd(newCategory.trim());
      setNewCategory('');
    }
  };

  const handleEdit = (category: string) => {
    setEditingCategory(category);
    setEditValue(category);
  };

  const handleSaveEdit = () => {
    if (editingCategory && editValue.trim()) {
      onEdit(editingCategory, editValue.trim());
      setEditingCategory(null);
      setEditValue('');
    }
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setEditValue('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className={`text-xl font-medium mb-1 ${theme === 'dark' ? 'text-neutral-100' : 'text-neutral-900'}`}>
          Categorias
        </h1>
        <p className={`text-sm ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-500'}`}>
          Gerencie as categorias
        </p>
      </div>

      {/* Adicionar Nova Categoria */}
      <div className={`rounded-lg p-5 transition-colors ${
        theme === 'dark' ? 'bg-neutral-800' : 'bg-white border border-neutral-100'
      }`}>
        <h2 className={`text-sm font-medium mb-4 ${theme === 'dark' ? 'text-neutral-100' : 'text-neutral-900'}`}>
          Adicionar Nova Categoria
        </h2>
        <form onSubmit={handleAdd} className="flex gap-3">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Nome da categoria..."
            className={`flex-1 px-3 py-2 rounded-lg text-sm transition-colors ${
              theme === 'dark'
                ? 'bg-neutral-900 border border-neutral-700 text-neutral-100 placeholder-neutral-500 focus:border-neutral-500'
                : 'bg-white border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:border-neutral-400'
            } focus:outline-none`}
          />
          <button
            type="submit"
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
              theme === 'dark'
                ? 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
                : 'bg-neutral-900 text-white hover:bg-neutral-800'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">Adicionar</span>
          </button>
        </form>
      </div>

      {/* Lista de Categorias */}
      <div className={`rounded-lg overflow-hidden transition-colors ${
        theme === 'dark' ? 'bg-neutral-800' : 'bg-white border border-neutral-100'
      }`}>
        <div className={`p-5 border-b transition-colors ${
          theme === 'dark' ? 'border-neutral-700' : 'border-neutral-100'
        }`}>
          <h2 className={`text-sm font-medium ${theme === 'dark' ? 'text-neutral-100' : 'text-neutral-900'}`}>
            Categorias Existentes ({categories.length})
          </h2>
        </div>

        <div className={`divide-y ${theme === 'dark' ? 'divide-neutral-700' : 'divide-neutral-100'}`}>
          {categories.length > 0 ? (
            categories.map((category) => (
              <div key={category} className={`p-4 transition-colors ${
                theme === 'dark' ? 'hover:bg-neutral-900/50' : 'hover:bg-neutral-50'
              }`}>
                {editingCategory === category ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm transition-colors ${
                        theme === 'dark'
                          ? 'bg-neutral-900 border border-neutral-700 text-neutral-100 focus:border-neutral-500'
                          : 'bg-white border border-neutral-200 text-neutral-900 focus:border-neutral-400'
                      } focus:outline-none`}
                      autoFocus
                    />
                    <button
                      onClick={handleSaveEdit}
                      className={`p-2 rounded-lg transition-colors ${
                        theme === 'dark' ? 'text-neutral-300 hover:bg-neutral-700' : 'text-neutral-600 hover:bg-neutral-100'
                      }`}
                      title="Salvar"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className={`p-2 rounded-lg transition-colors ${
                        theme === 'dark' ? 'text-neutral-400 hover:bg-neutral-700' : 'text-neutral-500 hover:bg-neutral-100'
                      }`}
                      title="Cancelar"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        theme === 'dark' ? 'bg-neutral-700' : 'bg-neutral-100'
                      }`}>
                        <FolderOpen className={`w-5 h-5 ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'}`} />
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${theme === 'dark' ? 'text-neutral-200' : 'text-neutral-900'}`}>
                          {category}
                        </p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-500'}`}>
                          Categoria
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEdit(category)}
                        className={`p-2 rounded-lg transition-colors ${
                          theme === 'dark' ? 'text-neutral-400 hover:bg-neutral-700' : 'text-neutral-500 hover:bg-neutral-100'
                        }`}
                        title="Editar"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              `Tem certeza que deseja excluir a categoria "${category}"?`
                            )
                          ) {
                            onDelete(category);
                          }
                        }}
                        className={`p-2 rounded-lg transition-colors ${
                          theme === 'dark' ? 'text-red-400 hover:bg-neutral-700' : 'text-red-600 hover:bg-red-50'
                        }`}
                        title="Excluir"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                theme === 'dark' ? 'bg-neutral-700' : 'bg-neutral-100'
              }`}>
                <FolderOpen className={`w-6 h-6 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-400'}`} />
              </div>
              <p className={`text-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
                Nenhuma categoria cadastrada
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Dica */}
      <div className={`rounded-lg p-4 transition-colors ${
        theme === 'dark' ? 'bg-neutral-800 border border-neutral-700' : 'bg-neutral-50 border border-neutral-200'
      }`}>
        <p className={`text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
          <strong>Dica:</strong> Organize suas transações em categorias para facilitar o controle.
        </p>
      </div>
    </div>
  );
}
