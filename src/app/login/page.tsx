"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(`Error: ${error.message}`);
      setLoading(false);
    } else if (data.session) {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-10 border border-gray-100">
        {/* Header con Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="mb-6 relative w-80 h-20">
            <Image 
              src="/logo-sumak.png" 
              alt="Sumak Logo" 
              fill 
              className="object-contain"
            />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Bienvenid@</h1>
          <p className="text-gray-600 mt-2 font-medium">Panel de Gestión de Productos</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email</label>
            <input
              type="email"
              placeholder="nombre@empresa.com"
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:bg-white outline-none transition-all text-gray-600 shadow-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:bg-white outline-none transition-all text-gray-600 shadow-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0052FF] text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:bg-blue-300 mt-4 active:scale-[0.98]"
          >
            {loading ? "Iniciando sesión..." : "Entrar al Panel"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-50 text-center">
          <p className="text-gray-600 text-sm">
            © 2026 Sumak Technology. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}