import { supabase } from '@/lib/supabase'
import { Product } from '@/types'

export const productService = {
  // LEER
  getAll: async (): Promise<Product[]> => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // CREAR
  create: async (product: Omit<Product, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select(); // .select() necesario en las nuevas versiones para retornar el objeto creado
    
    if (error) throw error;
    return data[0];
  },

  // ACTUALIZAR
  update: async (id: string, updates: Partial<Product>) => {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data[0];
  },

  // ELIMINAR
  delete: async (id: string) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
}