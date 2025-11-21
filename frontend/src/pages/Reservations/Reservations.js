import React, { useState } from 'react';
import api from '../../services/api';
import modalStyles from './ReservationsModal.module.css';
import sharedStyles from '../../styles/auth/AuthShared.module.css';
import ReservationForm from '../../components/Reservations/ReservationsForm/ReservationsForm';
import PaymentForm from '../../components/Reservations/PaymentForm/PaymentForm';
import { calculateReservationCost } from '../../utils/booking/calculator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Reservations({ onClose, roomId, pricePerNight }) {
  const [step, setStep] = useState(1);
  const [emptyField, setEmptyField] = useState({});
  const [showGuestEmail, setShowGuestEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Resumo dos dados da reserva para passar ao pagamento
  const [summaryData, setSummaryData] = useState({
    nights: 0,
    totalPrice: 0
  });

  const [reservationInfo, setReservationInfo] = useState({
    initialDate: '',
    finalDate: '',
    people: '1',
    guestEmail: ''
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    holderName: '',
    expiry: '',
    cvv: ''
  });

  const handleReservationChange = (field, value) => {
    setReservationInfo(prev => ({ ...prev, [field]: value }));
    if (emptyField[field]) setEmptyField(prev => ({...prev, [field]: ''}));
  };

  const handlePaymentChange = (field, value) => {
    setPaymentInfo(prev => ({ ...prev, [field]: value }));
  };

  const toggleGuestEmail = () => {
    setShowGuestEmail(!showGuestEmail);
    if (showGuestEmail) {
      setReservationInfo(prev => ({ ...prev, guestEmail: '' }));
    }
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    
    if (!reservationInfo.initialDate) { setEmptyField({initialDate: 'Required'}); return; }
    if (!reservationInfo.finalDate) { setEmptyField({finalDate: 'Required'}); return; }
    if (!reservationInfo.people) { setEmptyField({people: 'Required'}); return; }

    if (reservationInfo.initialDate >= reservationInfo.finalDate) {
      toast.warn("Check-out date must be after check-in date.");
      return;
    }

    const result = calculateReservationCost(
      reservationInfo.initialDate, 
      reservationInfo.finalDate, 
      pricePerNight
    );

    if (result) {
      setSummaryData({
        nights: result.nights,
        totalPrice: result.total,
        initialDate: reservationInfo.initialDate,
        finalDate: reservationInfo.finalDate
      });
      setStep(2);
    } else {
      toast.error("Invalid dates.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!paymentInfo.cardNumber || !paymentInfo.holderName || !paymentInfo.cvv) {
      toast.warn("Please fill in the payment details.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        roomId: roomId,
        checkIn: reservationInfo.initialDate,
        checkOut: reservationInfo.finalDate,
        people: parseInt(reservationInfo.people, 10),
        guestEmail: showGuestEmail ? reservationInfo.guestEmail : null
      };

      await api.post('/bookings', payload);
      
      toast.success("Payment approved! Reservation confirmed.");
      setTimeout(() => {
        onClose?.();
      }, 2000);

    } catch (err) {
      console.error("Reservation error:", err);
      const msg = err.response?.data?.message || "Failed to make reservation.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={modalStyles.modalOverlay}>
      <div className={modalStyles.modalContent}>
        <ToastContainer position="top-right" icon={false} toastStyle={{backgroundColor: "#d5a874ff"}}
          autoClose={3000} theme="colored" hideProgressBar={true} newestOnTop={false} closeOnClick
          rtl={false} pauseOnFocusLoss draggable pauseOnHover 
        />
         
        <button className={modalStyles.closeButton} onClick={onClose} type="button">×</button>
        
        <div className={sharedStyles.authForm}>
          <h2 className={sharedStyles.formTitle}>
            {step === 1 ? "Reservation" : "Payment"}
          </h2>
          
          {step === 1 ? (
            <ReservationForm 
              data={reservationInfo}
              onChange={handleReservationChange}
              onBlur={(field) => {
                  if(!reservationInfo[field]) setEmptyField(prev=>({...prev, [field]: 'Required'}));
              }}
              emptyField={emptyField}
              showGuestEmail={showGuestEmail}
              toggleGuestEmail={toggleGuestEmail}
              onNext={handleNextStep}
            />
          ) : (
            <PaymentForm 
              paymentInfo={paymentInfo}
              onChange={handlePaymentChange}
              onSubmit={handleSubmit}
              onBack={() => setStep(1)}
              loading={loading}
              summaryData={summaryData}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Reservations;
