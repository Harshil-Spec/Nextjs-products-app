"use client";

import { FormState, createProduct } from "@/actions/products";
import { Submit } from "@/components/submit";
import { useActionState } from "react";

export default function AddProductPage() {
  const initialState: FormState = {
    errors: {},
  };

  const [state, formAction] = useActionState(createProduct, initialState);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <form
        action={formAction}
        className="p-6 space-y-4 bg-gray-800 shadow-md rounded-lg max-w-md w-full"
      >
        <h2 className="text-center text-white text-xl font-semibold">
          Add Product
        </h2>
        <div>
          <label className="text-white">
            Title
            <input
              type="text"
              className="block w-full p-2 mt-1 text-black border rounded"
              name="title"
            />
          </label>
          {state.errors.title && (
            <p className="text-red-500">{state.errors.title}</p>
          )}
        </div>
        <div>
          <label className="text-white">
            Price
            <input
              type="number"
              className="block w-full p-2 mt-1 text-black border rounded"
              name="price"
            />
          </label>
          {state.errors.price && (
            <p className="text-red-500">{state.errors.price}</p>
          )}
        </div>
        <div>
          <label className="text-white">
            Description
            <textarea
              className="block w-full p-2 mt-1 text-black border rounded"
              name="description"
            />
          </label>
          {state.errors.description && (
            <p className="text-red-500">{state.errors.description}</p>
          )}
        </div>
        <Submit />
      </form>
    </div>
  );
}
