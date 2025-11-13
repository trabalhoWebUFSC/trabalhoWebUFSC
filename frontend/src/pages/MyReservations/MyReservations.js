import React, { useState, useEffect } from "react";
import styles from "./MyReservations.module.css";
import { Link } from "react-router-dom";
import { formatBRLDate } from "../../utils/formatter/date";

// Dados mockados para simular a resposta da API
const mockReservations = [
  {
    id: "r3",
    roomName: "Quarto Standard",
    checkIn: "2025-11-05",
    checkOut: "2025-11-06",
    status: "Finalizada",
    totalPrice: 180.0,
    reserverEmail: "usuario@email.com",
    companionEmail: "convidado2@email.com",
  },
  {
    id: "r1",
    roomName: "Suíte Presidencial",
    checkIn: "2025-12-10",
    checkOut: "2025-12-15",
    status: "Confirmada",
    totalPrice: 1250.5,
    reserverEmail: "usuario@email.com",
    companionEmail: "convidado1@email.com",
  },
  {
    id: "r2",
    roomName: "Quarto Deluxe Vista Mar",
    checkIn: "2026-01-20",
    checkOut: "2026-01-22",
    status: "Pendente",
    totalPrice: 450.0,
    reserverEmail: "usuario@email.com",
    companionEmail: null,
  },
  {
    id: "r4",
    roomName: "Suíte Master",
    checkIn: "2026-02-15",
    checkOut: "2026-02-20",
    status: "Confirmada",
    totalPrice: 2100.0,
    reserverEmail: "usuario@email.com",
    companionEmail: null,
  },
  {
    id: "r5",
    roomName: "Quarto Standard",
    checkIn: "2025-10-01",
    checkOut: "2025-10-03",
    status: "Finalizada",
    totalPrice: 360.0,
    reserverEmail: "usuario@email.com",
    companionEmail: null,
  },
  {
    id: "r6",
    roomName: "Quarto Deluxe Vista Piscina",
    checkIn: "2025-12-28",
    checkOut: "2026-01-02",
    status: "Confirmada",
    totalPrice: 1350.75,
    reserverEmail: "usuario@email.com",
    companionEmail: "familia@email.com",
  },
];

function MyReservations() {
  // "estado" para guardar a lista de reservas e o status de carregamento
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      // ordena os dados: mais recentes primeiro
      const sortedData = [...mockReservations].sort(
        (a, b) => new Date(b.checkIn) - new Date(a.checkIn)
      );

      setReservations(sortedData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.title}>My Reservations</h1>

      {/* renderização condicional se reservations > 0 etc */}
      {loading ? (
        <p className={styles.loadingText}>Loading your reservations...</p>
      ) : reservations.length > 0 ? (
        <div className={styles.tableContainer}>
          <table className={styles.reservasTable}>
            <thead>
              <tr>
                <th>Room Type</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Reserved by</th>
                <th>Companion</th>
              </tr>
            </thead>
            <tbody>
              {/* Loop (map) para criar uma linha (<tr>) por reserva */}
              {reservations.map((res) => (
                <tr key={res.id}>
                  <td>{res.roomName}</td>
                  <td>{formatBRLDate(res.checkIn)}</td>
                  <td>{formatBRLDate(res.checkOut)}</td>
                  <td>R$ {res.totalPrice.toFixed(2)}</td>
                  <td>
                    {/* define a classe do status dinamicamente  */}
                    <span
                      className={`${styles.status} ${
                        styles[res.status.toLowerCase()]
                      }`}
                    >
                      {res.status}
                    </span>
                  </td>
                  <td>{res.reserverEmail}</td>
                  <td>{res.companionEmail || "(None)"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>You don't have any reservations yet.</p>
          <Link to="/portal" className={styles.reserveLink}>
            Make my first reservation
          </Link>
        </div>
      )}
    </div>
  );
}

export default MyReservations;
