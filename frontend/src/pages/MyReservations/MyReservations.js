import React, { useState, useEffect } from "react";
import styles from "./MyReservations.module.css";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { formatBRLDate } from "../../utils/formatter/date";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyReservations() {
  // "estado" para guardar a lista de reservas e o status de carregamento
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  // função para mapear status da API
  const mapStatus = (status) => {
    const map = {
      'confirmed': 'Confirmada',
      'pending': 'Pendente',
      'cancelled': 'Finalizada',
      'finished': 'Finalizada'
    };
    return map[status?.toLowerCase()] || status;
  };

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await api.get('/bookings/my-reservations');

        // formata os dados da API para a estrutura da tabela
        const apiData = response.data.map(item => ({
          id: item._id,
          roomName: item.room?.name || "Quarto",
          checkIn: item.checkIn,
          checkOut: item.checkOut,
          status: mapStatus(item.status),
          backendStatus: item.status,
          totalPrice: item.totalPrice,
          reserverEmail: item.reservedByEmail,
          companionEmail: item.companionEmail
        }));

        setReservations(sortReservations(apiData));

      } catch (error) {
        console.warn("API unavailable, loading mocks...", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  // ordena os dados: mais recentes primeiro
  const sortReservations = (data) => {
    return [...data].sort((a, b) => new Date(b.checkIn) - new Date(a.checkIn));
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this reservation?")) return;

    try {
      await api.delete(`/bookings/${id}`);

      setReservations(prev => prev.map(res =>
        res.id === id ? { ...res, status: 'Finalizada', backendStatus: 'cancelled' } : res
      ));

      toast.success("Reservation successfully cancelled.");
    } catch (error) {
      console.error("Cancel error", error);
      toast.error("Error cancelling reservation.");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <ToastContainer position="top-right" icon={false} toastStyle={{ backgroundColor: "#d5a874ff" }}
        autoClose={3000} theme="colored" hideProgressBar={true} newestOnTop={false} closeOnClick
        rtl={false} pauseOnFocusLoss draggable pauseOnHover
      />
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Loop (map) para criar uma linha (<tr>) por reserva */}
              {reservations.map((res) => (
                <tr key={res.id}>
                  <td>{res.roomName}</td>
                  <td>{formatBRLDate(res.checkIn)}</td>
                  <td>{formatBRLDate(res.checkOut)}</td>
                  <td>R$ {res.totalPrice ? res.totalPrice.toFixed(2) : '0.00'}</td>
                  <td>
                    {/* define a classe do status dinamicamente  */}
                    <span
                      className={`${styles.status} ${styles[res.status.toLowerCase()] || styles.finalizada
                        }`}
                    >
                      {res.status}
                    </span>
                  </td>
                  <td>{res.reserverEmail}</td>
                  <td>{res.companionEmail || "(None)"}</td>
                  <td>
                    {res.backendStatus !== 'cancelled' && res.backendStatus !== 'finished' && (
                      <button
                        onClick={() => handleCancel(res.id)}
                        className={styles.cancel}
                      >
                        Cancel
                      </button>
                    )}
                  </td>
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
