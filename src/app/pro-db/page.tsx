import { getProducts } from "@/prisma-db";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string | null;
};

export default async function ProductsDBPage() {
  const products: Product[] = await getProducts();
  return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center p-6">
        <div className="max-w-5xl w-full">
          <h1 className="text-3xl font-bold text-white text-center mb-6">
            Available Products
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
              >
                <h2 className="text-xl font-semibold text-gray-900">
                  {product.title}
                </h2>
                <p className="text-gray-600 mt-2 text-sm">
                  {product.description || "No description available."}
                </p>
                <p className="text-lg font-medium text-blue-600 mt-4">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}
