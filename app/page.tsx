"use client";

import { useEffect, useState } from "react";

interface Inventory {
  warehouse: string;
  totalStock: number;
  reservedStock: number;
  availableStock: number;
}

interface Product {
  id: string;
  name: string;
  inventories: Inventory[];
}

export default function HomePage() {

  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  async function fetchProducts() {
    try {

      const response = await fetch(
        "/api/products"
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch products"
        );
      }

      const data = await response.json();

      setProducts(data);

    } catch (err) {

      setError(
        "Failed to load products"
      );

    } finally {

      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function reserveProduct(
    productId: string,
    warehouseName: string
  ) {

    try {

      const product = products.find(
        (p) => p.id === productId
      );

      const inventory =
        product?.inventories.find(
          (inv) =>
            inv.warehouse === warehouseName
        );

      if (!inventory) {
        return;
      }

      const warehouseResponse =
        await fetch(
          "/api/warehouses"
        );

      const warehouses =
        await warehouseResponse.json();

      const warehouse =
        warehouses.find(
          (w: any) =>
            w.name === warehouseName
        );

      const response = await fetch(
        "/api/reservations",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            productId,
            warehouseId: warehouse.id,
            quantity: 1,
          }),
        }
      );

      if (response.status === 409) {
        alert(
          "Not enough stock available"
        );
        return;
      }

      if (!response.ok) {
        throw new Error(
          "Reservation failed"
        );
      }

      const reservation =
        await response.json();

      window.location.href =
        `/reservation/${reservation.id}`;

    } catch (err) {

      alert(
        "Failed to reserve product"
      );
    }
  }

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <main className="p-10">

      <h1 className="text-4xl font-bold mb-8">
        Inventory Reservation System
      </h1>

      <div className="space-y-6">

        {products.map((product) => (

          <div
            key={product.id}
            className="border rounded-xl p-6 shadow"
          >

            <h2 className="text-2xl font-semibold mb-4">
              {product.name}
            </h2>

            <div className="space-y-3">

              {product.inventories.map(
                (inventory, index) => (

                  <div
                    key={index}
                    className="border p-4 rounded-lg flex justify-between items-center"
                  >

                    <div>

                      <p className="font-medium">
                        Warehouse:
                        {" "}
                        {inventory.warehouse}
                      </p>

                      <p>
                        Available Stock:
                        {" "}
                        {inventory.availableStock}
                      </p>

                    </div>

                    <button
                      onClick={() =>
                        reserveProduct(
                          product.id,
                          inventory.warehouse
                        )
                      }
                      className="bg-black text-white px-4 py-2 rounded-lg"
                    >
                      Reserve
                    </button>

                  </div>

                )
              )}

            </div>

          </div>

        ))}

      </div>

    </main>
  );
}