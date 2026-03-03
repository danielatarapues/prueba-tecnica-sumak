"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { productService } from "@/services/products";
import ProductList from "@/components/products/ProductList";
import LogoutButton from "@/components/auth/LogoutButton";
import { Product } from "@/types";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUserAndFetch = async () => {
      // 1. Verificamos sesión en el cliente
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        // Si no hay usuario, redirigir al login inmediatamente
        router.push("/login");
        return;
      }

      // 2. Si está autorizado, cargamos los datos
      try {
        setAuthorized(true);
        const data = await productService.getAll();
        setProducts(data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUserAndFetch();
  }, [router]);

  // Pantalla de carga mientras verifica la sesión
  if (!authorized || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F9FAFB] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-2">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0">
              <Image
                src="/iso-sumak.png"
                alt="Sumak Logo"
                fill
                className="object-contain"
              />
            </div>

            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Gestión de productos
              </h1>
              <p className="text-gray-500 text-sm sm:text-base font-medium">
                Panel de administración de inventario
              </p>
            </div>
          </div>

          {/* Botón de Cerrar Sesión */}
          <div className="w-full sm:w-auto flex justify-end border-t sm:border-none pt-4 sm:pt-0">
            <LogoutButton />
          </div>
        </header>

        {/* Contenido: Listado y Formulario */}
        <div className="mt-8">
          <ProductList initialProducts={products} />
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-400 text-sm font-medium">
            Prueba Técnica Desarrollada por Daniela para Sumak Technology
          </p>
        </footer>
      </div>
    </main>
  );
}
