"use client";

import { useOptimistic } from "react";
import { removeProduct } from "@/actions/products";
import Link from "next/link";
import Form from "next/form";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string | null;
};

export const ProductDetail = ({ products }: { products: Product[] }) => {
  const [optimisticProducts, setOptimisticProducts] = useOptimistic(
    products,
    (currentProducts, productId) => {
      return currentProducts.filter((product) => product.id !== productId);
    }
  );

  const removeProductById = async (productId: number) => {
    setOptimisticProducts(productId);
    await removeProduct(productId);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-4 text-center">
        <Link
          className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 mr-4"
          href={"/products-db-create"}
        >
          Add Product
        </Link>
        <Link
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
          href={"/pro-db"}
        >
          Available Products
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full max-w-3xl mx-auto border-collapse border border-gray-300">
          <thead className="bg-gray-600 text-white">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Title
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Description
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Price
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {optimisticProducts.length > 0 ? (
              optimisticProducts.map((product) => (
                <tr key={product.id} className="bg-white hover:bg-gray-200">
                  <td className="border border-gray-300 px-4 py-3 text-blue-900 font-semibold">
                    {product.title}
                  </td>

                  <td className="border border-gray-300 px-4 py-3 text-gray-700">
                    {product.description || "No description available"}
                  </td>

                  <td className="border border-gray-300 px-4 py-3 font-medium text-green-600">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="border text-gray-900 border-gray-300 px-4 py-2 text-center flex justify-center gap-2">
                    <Link
                      className="px-3 py-1 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                      href={`/products-db/${product.id}`}
                    >
                      Edit
                    </Link>
                    <Form action={removeProductById.bind(null, product.id)}>
                      <button
                        type="submit"
                        className="px-3 py-1 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
                      >
                        Delete
                      </button>
                    </Form>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-3 text-center text-gray-500">
                  No product found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
