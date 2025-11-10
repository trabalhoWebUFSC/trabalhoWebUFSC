import React, { useState, useEffect } from 'react';
import PasswordInput from '../Password/PasswordInput';
import { validateEmail } from '../../utils/validator/email';
import { validatePassword, confirmPassword } from '../../utils/validator/password';
import sharedStyles from '../../styles/auth/AuthShared.module.css';
import styles from "../../pages/Register/Register.module.css";

function Step2({ data, onChange, onBlur, emptyField }) {
  const [emailError, setEmailError] = useState('');
  const [passwordRules, setPasswordRules] = useState([]);
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  useEffect(() => {
    if (data.password) {
      const rules = validatePassword(data.password);
      setPasswordRules(rules);
    } else {
      setPasswordRules([]);
    }
  }, [data.password]);

  const handleEmailBlur = (e) => {
    const emailError = validateEmail(e.target.value);
    setEmailError(emailError);
  }

  const handleConfirmPasswordBlur = (e) => {
    const confirmErrors = confirmPassword(e.target.value, data.password); 
    setConfirmPasswordError(confirmErrors);
  }

  return (
    <>
      <div className={sharedStyles.formGroup}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={data.email}
          onChange={(e) => onChange('email', e.target.value)}
          onBlur={(e) => {handleEmailBlur(e); onBlur('email');}}
          className={`${sharedStyles.inputField} ${emptyField?.email || emailError ? sharedStyles.errorMessage : ''}`}
          required
        />
        {emptyField?.email ? (
          <span className={sharedStyles.errorMessage}>{emptyField.email}</span>
        ) : emailError ? (
          <span className={sharedStyles.errorMessage}>{emailError}</span>
        ) : null}
      </div>

      <PasswordInput
        id="password"
        label="Password:"
        value={data.password}
        onChange={(e) => onChange('password', e.target.value)}
        onBlur={() => onBlur('password')}
        className={`${sharedStyles.inputField} ${emptyField?.name ? sharedStyles.errorMessage : ''}`}
        error={emptyField?.password}
        required
      />
      {data.password && passwordRules.length > 0 && (
        <div className={styles.validationList}>
          {passwordRules.map((rule, index) => (
            <div key={index} className={`${styles.validationItem} ${rule.isValid ? styles.valid : styles.invalid}`}>
              <span>{rule.isValid ? '✓' : '✗'}</span>
              <span>{rule.message}</span>
            </div>
          ))}
        </div>
      )}

      <PasswordInput
        id="confirmPassword"
        label="Password confirmation:"
        value={data.confirmPassword}
        onChange={(e) => onChange('confirmPassword', e.target.value)}
        onBlur={(e) => {handleConfirmPasswordBlur(e); onBlur('confirmPassword');}}
        className={`${sharedStyles.inputField} ${emptyField?.confirmPassword || confirmPasswordError ? sharedStyles.errorMessage : ''}`}
        error={emptyField?.confirmPassword || confirmPasswordError}
        required
      />
    </>
  );
}

export default Step2;
