import { supabase } from './supabaseClient';

export async function adicionarTransacao(descricao: string, valor: number, tipo: string, data: string) {
  const { data: result, error } = await supabase
    .from('transacoes')
    .insert([
      { descricao, valor, tipo, data }
    ]);

  if (error) {
    console.error('Erro ao salvar:', error);
    return null;
  }

  return result;
}
