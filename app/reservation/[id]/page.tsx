"use client";

import { useEffect, useState } from "react";

interface Reservation {
  id: string;
  status: string;
  expiresAt: string;
  quantity: number;
}

export default function ReservationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const [reservation, setReservation] =
    useState<Reservation | null>(null);

  const [timeLeft, setTimeLeft] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [message, setMessage] =
    useState("");

  async function fetchReservation() {

    try {

      const { id } = await params;

      const response = await fetch(
        `/api/reservations/${id}`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch reservation"
        );
      }

      const data = await response.json();

      setReservation(data);

    } catch (error) {

      setMessage(
        "Failed to load reservation"
      );

    } finally {

      setLoading(false);
    }
  }

  useEffect(() => {
    fetchReservation();
  }, []);

  useEffect(() => {

    if (!reservation) {
      return;
    }

    const interval = setInterval(() => {

      const now = new Date().getTime();

      const expiry = new Date(
        reservation.expiresAt
      ).getTime();

      const difference = expiry - now;

      if (difference <= 0) {

        setTimeLeft("Expired");

        clearInterval(interval);

        return;
      }

      const minutes = Math.floor(
        difference / 1000 / 60
      );

      const seconds = Math.floor(
        (difference / 1000) % 60
      );

      setTimeLeft(
        `${minutes}m ${seconds}s`
      );

    }, 1000);

    return () => clearInterval(interval);

  }, [reservation]);

  async function confirmReservation() {

    if (!reservation) {
      return;
    }

    const response = await fetch(
      `/api/reservations/${reservation.id}/confirm`,
      {
        method: "POST",
      }
    );

    if (response.status === 410) {

      setMessage(
        "Reservation expired"
      );

      return;
    }

    if (!response.ok) {

      setMessage(
        "Failed to confirm reservation"
      );

      return;
    }

    setMessage(
      "Purchase confirmed successfully!"
    );

    fetchReservation();
  }

  async function cancelReservation() {

    if (!reservation) {
      return;
    }

    const response = await fetch(
      `/api/reservations/${reservation.id}/release`,
      {
        method: "POST",
      }
    );

    if (!response.ok) {

      setMessage(
        "Failed to cancel reservation"
      );

      return;
    }

    setMessage(
      "Reservation cancelled"
    );

    fetchReservation();
  }

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="p-10">
        Reservation not found
      </div>
    );
  }

  return (
    <main className="p-10">

      <h1 className="text-4xl font-bold mb-8">
        Reservation Checkout
      </h1>

      <div className="border rounded-xl p-6 shadow max-w-xl">

        <p className="mb-3">
          <strong>Reservation ID:</strong>
          {" "}
          {reservation.id}
        </p>

        <p className="mb-3">
          <strong>Status:</strong>
          {" "}
          {reservation.status}
        </p>

        <p className="mb-6">
          <strong>Expires In:</strong>
          {" "}
          {timeLeft}
        </p>

        {reservation.status === "PENDING" &&
         timeLeft !== "Expired" && (

          <div className="flex gap-4">

            <button
              onClick={confirmReservation}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Confirm Purchase
            </button>

            <button
              onClick={cancelReservation}
              className="bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>

          </div>

        )}

        {message && (
          <p className="mt-6 text-lg">
            {message}
          </p>
        )}

      </div>

    </main>
  );
}