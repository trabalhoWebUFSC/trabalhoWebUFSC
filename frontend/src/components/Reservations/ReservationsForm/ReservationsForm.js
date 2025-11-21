import React from 'react';
import styles from './ReservationForm.module.css';
import sharedStyles from '../../../styles/auth/AuthShared.module.css';

function ReservationForm({ 
  data, 
  onChange, 
  onBlur, 
  emptyField, 
  showGuestEmail, 
  toggleGuestEmail, 
  onNext 
}) {
  return (
    <>
      <div className={sharedStyles.formGroup}>
        <label htmlFor="initialDate">Check-in:</label>
        <input
          type="date"
          id="initialDate"
          value={data.initialDate}
          onChange={(e) => onChange('initialDate', e.target.value)}
          onBlur={() => onBlur('initialDate')}
          className={`${sharedStyles.inputField} ${emptyField?.initialDate ? sharedStyles.errorMessage : ''}`}
          required
        />
      </div>

      <div className={sharedStyles.formGroup}>
        <label htmlFor="finalDate">Check-out:</label>
        <input
          type="date"
          id="finalDate"
          value={data.finalDate}
          onChange={(e) => onChange('finalDate', e.target.value)}
          onBlur={() => onBlur('finalDate')}
          className={`${sharedStyles.inputField} ${emptyField?.finalDate ? sharedStyles.errorMessage : ''}`}
          required
        />
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
            onChange={(e) => onChange('guestEmail', e.target.value)}
            className={sharedStyles.inputField}
          />
          <small className={styles.helperText}>User must be registered.</small>
        </div>
      )}

      <button type="submit" onClick={onNext} className={styles.btn}>
        Go to payment »
      </button>
    </>
  );
}

export default ReservationForm;
