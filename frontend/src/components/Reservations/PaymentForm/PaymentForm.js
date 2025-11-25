import React from 'react';
import { formatCard } from '../../../utils/formatter/card';
import { formatExpiry } from '../../../utils/formatter/expiry'; 
import styles from './PaymentForm.module.css';
import sharedStyles from '../../../styles/auth/AuthShared.module.css';

function PaymentForm({ paymentInfo, onChange, onSubmit, onBack, onBlur, emptyField, loading, summaryData }) {
  const { totalPrice } = summaryData;

  return (
    <div className={styles.stepContainer}>
      <div className={styles.paymentSummary}>
        <span className={styles.totalPrice}>
          Total: ${totalPrice.toFixed(2)}
        </span>
      </div>
        <div className={sharedStyles.formGroup}>
          <label htmlFor="cardNumber">Card Number:</label>
          <input
            id="cardNumber"
            type="text"
            placeholder="0000 0000 0000 0000"
            value={formatCard(paymentInfo.cardNumber)}
            onChange={(e) => onChange('cardNumber', e.target.value)}
            onBlur={() => onBlur('cardNumber')}
            className={`${sharedStyles.inputField} ${emptyField?.cardNumber ? sharedStyles.errorMessage : ''}`}
            maxLength="19"
          />
          {emptyField?.cardNumber && (
            <span className={sharedStyles.errorMessage}>{emptyField.cardNumber}</span>
          )}
        </div>

        <div className={sharedStyles.formGroup}>
          <label htmlFor="holderName">Cardholder Name:</label>
          <input
            id="holderName"
            type="text"
            value={paymentInfo.holderName.toUpperCase()}
            onChange={(e) => onChange('holderName', e.target.value)}
            onBlur={() => onBlur('holderName')}
            className={`${sharedStyles.inputField} ${emptyField?.holderName ? sharedStyles.errorMessage : ''}`}
          />
          {emptyField?.holderName && (
            <span className={sharedStyles.errorMessage}>{emptyField.holderName}</span>
          )}
        </div>

        <div className={styles.row}>
          <div className={`${sharedStyles.formGroup} ${styles.halfInput}`}>
            <label htmlFor="expiry">Expiry date:</label>
            <input
              id="expiry"
              type="text"
              placeholder="MM/YY"
              value={formatExpiry(paymentInfo.expiry)}
              onChange={(e) => onChange('expiry', e.target.value)}
              onBlur={() => onBlur('expiry')}
              className={`${sharedStyles.inputField} ${emptyField?.expiry ? sharedStyles.errorMessage : ''}`}
              maxLength="5"
            />
            {emptyField?.expiry && (
              <span className={sharedStyles.errorMessage}>{emptyField.expiry}</span>
            )}
          </div>

          <div className={`${sharedStyles.formGroup} ${styles.halfInput}`}>
            <label htmlFor="cvv">Security code:</label>
            <input
              id="cvv"
              type="text"
              placeholder="CVV"
              value={paymentInfo.cvv}
              onChange={(e) => onChange('cvv', e.target.value.replace(/\D/g, ''))}
              onBlur={() => onBlur('cvv')}
              className={`${sharedStyles.inputField} ${emptyField?.cvv ? sharedStyles.errorMessage : ''}`}
              maxLength="3"
            />
            {emptyField?.cvv && (
              <span className={sharedStyles.errorMessage}>{emptyField.cvv}</span>
            )}
          </div>
        </div>

      <button type="submit" onClick={onSubmit} disabled={loading} className={styles.btn}>
        {loading ? 'Processing...' : 'Reserve now »'}
      </button>

      <button type="button" onClick={onBack} className={styles.backBtn}>
        « Back to details
      </button>
    </div>
  );
}

export default PaymentForm;
