import React from 'react';
import styles from './PaymentForm.module.css';
import sharedStyles from '../../../styles/auth/AuthShared.module.css';

function PaymentForm({ paymentInfo, onChange, onSubmit, onBack, loading, summaryData }) {
  const { totalPrice } = summaryData;

  return (
    <div className={styles.stepContainer}>
      
      {/* Preço total calculado */}
      <div className={styles.paymentSummary}>
        <span className={styles.totalPrice}>
          Total: ${totalPrice.toFixed(2)}
        </span>
      </div>

      {/* Formulário de cartão */}
      <div className={styles.cardWrapper}>
        <div className={sharedStyles.formGroup}>
          <input
            type="text"
            placeholder="Card Number"
            value={paymentInfo.cardNumber}
            onChange={(e) => onChange('cardNumber', e.target.value)}
            className={sharedStyles.inputField}
            maxLength="19"
          />
        </div>

        <div className={sharedStyles.formGroup}>
          <input
            type="text"
            placeholder="Cardholder Name"
            value={paymentInfo.holderName}
            onChange={(e) => onChange('holderName', e.target.value)}
            className={sharedStyles.inputField}
          />
        </div>

        <div className={styles.row}>
          <div className={`${sharedStyles.formGroup} ${styles.halfInput}`}>
            <input
              type="text"
              placeholder="MM/YY"
              value={paymentInfo.expiry}
              onChange={(e) => onChange('expiry', e.target.value)}
              className={sharedStyles.inputField}
              maxLength="5"
            />
          </div>

          <div className={`${sharedStyles.formGroup} ${styles.halfInput}`}>
            <input
              type="text"
              placeholder="CVV"
              value={paymentInfo.cvv}
              onChange={(e) => onChange('cvv', e.target.value)}
              className={sharedStyles.inputField}
              maxLength="3"
            />
          </div>
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
