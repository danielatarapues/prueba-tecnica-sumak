"use client";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <button
      onClick={handleSignOut}
      className="text-gray-400 text-sm hover:text-red-500 transition-colors"
    >
      Cerrar Sesión
    </button>
  );
}
