import React, { useState } from 'react';
import { minDate } from '../../../utils/booking/minDate';
import { validateEmail } from '../../../utils/validator/email';
import styles from './ReservationForm.module.css';
import sharedStyles from '../../../styles/auth/AuthShared.module.css';

function ReservationForm({ data, onChange, onBlur, emptyField, showGuestEmail, toggleGuestEmail, onNext }) {
  const [emailError, setEmailError] = useState('');

  const handleEmailBlur = (e) => {
    const emailError = validateEmail(e.target.value);
    setEmailError(emailError);
  }
  
  return (
    <>
      <div className={sharedStyles.formGroup}>
        <label htmlFor="initialDate">Check-in:</label>
        <input
          type="date"
          id="initialDate"
          value={data.initialDate}
          min={minDate()}
          onChange={(e) => onChange('initialDate', e.target.value)}
          onBlur={() => onBlur('initialDate')}
          className={`${sharedStyles.inputField} ${emptyField?.initialDate ? sharedStyles.errorMessage : ''}`}
          required
        />
        {emptyField?.initialDate ? (
          <span className={sharedStyles.errorMessage}>{emptyField.initialDate}</span>
        ) : null}
      </div>

      <div className={sharedStyles.formGroup}>
        <label htmlFor="finalDate">Check-out:</label>
        <input
          type="date"
          id="finalDate"
          value={data.finalDate}
          min={minDate()}
          onChange={(e) => onChange('finalDate', e.target.value)}
          onBlur={() => onBlur('finalDate')}
          className={`${sharedStyles.inputField} ${emptyField?.finalDate ? sharedStyles.errorMessage : ''}`}
          required
        />
        {emptyField?.finalDate ? (
          <span className={sharedStyles.errorMessage}>{emptyField.finalDate}</span>
        ) : null}
      </div>

      <div className={sharedStyles.formGroup}>
        <label htmlFor="people">Number of Guests:</label>
        <input
          type="number"
          id="people"
          min="1"
          max="5"
          value={data.people}
          onChange={(e) => onChange('people', e.target.value)}
          className={sharedStyles.inputField}
          required
        />
      </div>

      <div className={sharedStyles.formGroup}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={showGuestEmail}
            onChange={toggleGuestEmail}
            className={styles.checkbox}
          />
          <span> Add another registered guest</span>
        </label>
      </div>

      {showGuestEmail && (
        <div className={`${sharedStyles.formGroup} ${styles.expandable}`}>
          <label htmlFor="guestEmail">Guest Email:</label>
          <input
            type="email"
            placeholder="guest@example.com"
            value={data.guestEmail}
            onBlur={(e) => {handleEmailBlur(e); onBlur('guestEmail');}}
            onChange={(e) => onChange('guestEmail', e.target.value)}
            className={`${sharedStyles.inputField} ${emailError ? sharedStyles.errorMessage : ''}`}
          />
          {emailError ? (
            <span className={sharedStyles.errorMessage}>{emailError}</span>
          ) : 
            <small className={styles.helperText}>User must be registered.</small>
          }
        </div>
      )}

      <button type="submit" onClick={onNext} className={styles.btn}>
        Go to payment »
      </button>
    </>
  );
}

export default ReservationForm;
