export interface Product {
  id: string; // Supabase usa UUID por defecto
  name: string;
  description: string;
  price: number;
  created_at?: string;
}