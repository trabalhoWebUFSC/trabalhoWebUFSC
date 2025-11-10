import React, { useState } from 'react';
import { validateField } from '../../utils/validator/field';
import sharedStyles from '../../styles/auth/AuthShared.module.css';
import modalStyles from './Modal.module.css';

function Reservations({ onClose }) {
  const [emptyField, setEmptyField] = useState({});
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [showGuestEmail, setShowGuestEmail] = useState(false);
  const [reservationInfo, setReservationInfo] = useState({
    initialDate: '',
    finalDate: '',
    people: '',
    guestEmail: ''
  });

  const handleChange = (field, value) => {
    setReservationInfo(prev => ({ ...prev, [field]: value }));
    if (emptyField[field]) {
      setEmptyField(prev => ({...prev, [field]: ''}));
    }
  };
  
  const handleFieldBlur = (field) => {
    const value = reservationInfo[field];
    const error = validateField(value);
    setEmptyField(prev => ({...prev, [field]: error}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reservation data:', reservationInfo);
    onClose?.();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  const toggleGuestEmail = () => {
    setShowGuestEmail(!showGuestEmail);
    // Limpa o campo e erro quando desmarcar
    if (showGuestEmail) {
      setReservationInfo(prev => ({ ...prev, guestEmail: '' }));
      setEmptyField(prev => ({...prev, guestEmail: ''}));
    }
  };

  return (
    <div className={modalStyles.modalOverlay} onClick={handleOverlayClick}>
      <div className={modalStyles.modalContent}>
        <button 
          className={modalStyles.closeButton} 
          onClick={onClose}
          type="button"
        >
          ×
        </button>
        
        <form onSubmit={handleSubmit} className={sharedStyles.authForm}>
          <h2 className={sharedStyles.formTitle}>Make a Reservation</h2>
          
          <div className={sharedStyles.formGroup}>
            <label htmlFor="initialDate">Check-in:</label>
            <input
              type="date"
              id="initialDate"
              value={reservationInfo.initialDate}
              onChange={(e) => handleChange('initialDate', e.target.value)}
              onBlur={() => handleFieldBlur('initialDate')}
              className={`${sharedStyles.inputField} ${emptyField?.initialDate ? sharedStyles.errorMessage : ''}`}
              required
            />
            {emptyField?.initialDate && (
              <span className={sharedStyles.errorMessage}>{emptyField.initialDate}</span>
            )}
          </div>

          <div className={sharedStyles.formGroup}>
            <label htmlFor="finalDate">Check-out:</label>
            <input
              type="date"
              id="finalDate"
              value={reservationInfo.finalDate}
              onChange={(e) => handleChange('finalDate', e.target.value)}
              onBlur={() => handleFieldBlur('finalDate')}
              className={`${sharedStyles.inputField} ${emptyField?.finalDate ? sharedStyles.errorMessage : ''}`}
              required
            />
            {emptyField?.finalDate && (
              <span className={sharedStyles.errorMessage}>{emptyField.finalDate}</span>
            )}
          </div>

          <div className={sharedStyles.formGroup}>
            <label htmlFor="people">Number of Guests:</label>
            <input
              type="number"
              id="people"
              min="1"
              max="10"
              value={reservationInfo.people}
              onChange={(e) => handleChange('people', e.target.value)}
              onBlur={() => handleFieldBlur('people')}
              className={`${sharedStyles.inputField} ${emptyField?.people ? sharedStyles.errorMessage : ''}`}
              required
            />
            {emptyField?.people && (
              <span className={sharedStyles.errorMessage}>{emptyField.people}</span>
            )}
          </div>

          {/* Checkbox para adicionar convidado */}
          <div className={sharedStyles.formGroup}>
            <label className={modalStyles.checkboxLabel}>
              <input
                type="checkbox"
                checked={showGuestEmail}
                onChange={toggleGuestEmail}
                className={modalStyles.checkbox}
              />
              <span>Add another registered guest</span>
            </label>
          </div>

          {/* Campo de email expansivel */}
          {showGuestEmail && (
            <div className={`${sharedStyles.formGroup} ${modalStyles.expandable}`}>
              <label htmlFor="guestEmail">Guest Email:</label>
              <input
                type="email"
                id="guestEmail"
                placeholder="guest@example.com"
                value={reservationInfo.guestEmail}
                onChange={(e) => handleChange('guestEmail', e.target.value)}
                onBlur={() => handleFieldBlur('guestEmail')}
                className={`${sharedStyles.inputField} ${emptyField?.guestEmail ? sharedStyles.errorMessage : ''}`}
              />
              {emptyField?.guestEmail && (
                <span className={sharedStyles.errorMessage}>{emptyField.guestEmail}</span>
              )}
              <small className={modalStyles.helperText}>
                Enter the email of a registered user to add them to this reservation
              </small>
            </div>
          )}
          
          <button type="submit" disabled={isBtnDisabled} className={modalStyles.btn}>
            Reserve Now »
          </button>
        </form>
      </div>
    </div>
  );
}

export default Reservations;
