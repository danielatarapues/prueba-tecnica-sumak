"use client";

import { useState } from "react";
import { Product } from "@/types";
import { productService } from "@/services/products";
import ProductForm from "./ProductForm";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

interface Props {
  initialProducts: Product[];
}

export default function ProductList({ initialProducts }: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const handleAddNew = () => {
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleSuccess = (product: Product, isEdit: boolean) => {
    if (isEdit) {
      setProducts(products.map((p) => (p.id === product.id ? product : p)));
    } else {
      setProducts([product, ...products]);
    }
    setEditingProduct(null);
  };

  const confirmDelete = (product: Product) => {
    setProductToDelete(product);
    setIsDialogOpen(true);
  };

  const handleExecuteDelete = async () => {
    if (productToDelete) {
      try {
        await productService.delete(productToDelete.id);
        setProducts(products.filter((p) => p.id !== productToDelete.id));
      } catch (error) {
        console.error("Error detallado de eliminación:", error);
        alert("No se pudo eliminar el producto");
      } finally {
        setIsDialogOpen(false);
        setProductToDelete(null);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 items-start">
        {/* SECCIÓN FORMULARIO (Se muestra arriba en móvil para facilitar creación) */}
        <section className="w-full lg:col-span-7 lg:sticky lg:top-10 order-first lg:order-last">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {editingProduct ? "Editar Producto" : "Crear Nuevo Producto"}
            </h2>
            <ProductForm
              key={editingProduct ? editingProduct.id : "new-product"}
              productToEdit={editingProduct}
              onSuccess={handleSuccess}
              onCancel={() => setEditingProduct(null)}
            />
          </div>
        </section>

        {/* LISTADO DE PRODUCTOS */}
        <section className="w-full lg:col-span-5 space-y-6">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-xl font-bold text-gray-800">Productos</h2>
            <button
              onClick={handleAddNew}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-all text-sm font-bold shadow-md shadow-blue-100 flex items-center gap-2"
            >
              <span className="text-lg">+</span>Agregar nuevo producto
            </button>
          </div>

          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center hover:border-blue-200 transition-all group"
              >
                <div className="flex-1 pr-4">
                  <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-blue-500 font-bold mt-1 bg-blue-50 inline-block px-2 py-0.5 rounded-lg text-sm">
                    ${product.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-gray-50 text-gray-600 px-3 py-2 rounded-xl text-xs font-bold hover:bg-blue-50 hover:text-blue-600 transition-colors border border-transparent hover:border-blue-100"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => confirmDelete(product)}
                    className="bg-red-50 text-red-500 px-3 py-2 rounded-xl text-xs font-bold hover:bg-red-100 transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}

            {products.length === 0 && (
              <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                <p className="text-gray-400 font-medium">
                  No se encontraron productos.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      <ConfirmDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleExecuteDelete}
        title="Eliminar Producto"
        description={`¿Estás seguro de que quieres eliminar "${productToDelete?.name}"?`}
      />
    </>
  );
}
