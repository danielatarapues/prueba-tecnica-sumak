"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types";
import { productService } from "@/services/products";

interface Props {
  productToEdit?: Product | null;
  onSuccess: (product: Product, isEdit: boolean) => void;
  onCancel: () => void;
}

export default function ProductForm({
  productToEdit,
  onSuccess,
  onCancel,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
  });

  // Si nos pasan un producto para editar, llenamos el formulario
  useEffect(() => {
    if (productToEdit) {
      // Si hay un producto, cargamos sus datos en el formulario
      setFormData({
        name: productToEdit.name,
        description: productToEdit.description,
        price: productToEdit.price,
      });
    } else {
      // Si productToEdit es null (modo creación), reseteamos los campos
      setFormData({
        name: "",
        description: "",
        price: 0,
      });
    }
  }, [productToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (productToEdit) {
        // Modo Edición
        const updated = await productService.update(productToEdit.id, formData);
        onSuccess(updated, true);
      } else {
        // Modo Creación
        const created = await productService.create(formData);
        onSuccess(created, false);
      }

      // formulario quede vacío tras guardar cualquier cambio
      setFormData({ name: "", description: "", price: 0 });
    } catch (error) {
      console.error("Detalle del error:", error);
      alert("Error al guardar el producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Nombre
          </label>
          <input
            type="text"
            placeholder="Nombre"
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Descripción
          </label>
          <textarea
            placeholder="Descripción"
            rows={3}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Precio
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="Precio"
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: Number(e.target.value) })
            }
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white font-bold py-4 rounded-xl hover:bg-blue-600 transition-colors shadow-md shadow-blue-200 disabled:bg-blue-300"
        >
          {loading ? "Procesando..." : "Guardar Producto"}
        </button>

        {productToEdit && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full text-gray-400 text-sm hover:text-gray-600 underline"
          >
            Cancelar edición
          </button>
        )}
      </form>
    </div>
  );
}
