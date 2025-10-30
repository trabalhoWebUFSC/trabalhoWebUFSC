import React, { useState, useEffect } from 'react';
import PasswordInput from '../Password/PasswordInput';
import { validateEmail } from '../../utils/validator/email';
import { validatePassword, confirmPassword } from '../../utils/validator/password';

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
      <div className="formGroup">
        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          id="email"
          value={data.email}
          onChange={(e) => onChange('email', e.target.value)}
          onBlur={(e) => {handleEmailBlur(e); onBlur('email');}}
          className={`inputField ${emptyField?.email || emailError ? 'errorMessage' : ''}`}
          required
        />
        {emptyField?.email ? (
          <span className="errorMessage">{emptyField.email}</span>
        ) : emailError ? (
          <span className="errorMessage">{emailError}</span>
        ) : null}
      </div>

      <PasswordInput
        id="password"
        label="Senha:"
        value={data.password}
        onChange={(e) => onChange('password', e.target.value)}
        onBlur={() => onBlur('password')}
        className={`inputField ${emptyField?.password ? 'errorMessage' : ''}`}
        error={emptyField?.password}
        required
      />
      {data.password && passwordRules.length > 0 && (
        <div className="validationList">
          {passwordRules.map((rule, index) => (
            <div key={index} className={`validationItem ${rule.isValid ? 'valid' : 'invalid'}`}>
              <span>{rule.isValid ? '✓' : '✗'}</span>
              <span>{rule.message}</span>
            </div>
          ))}
        </div>
      )}

      <PasswordInput
        id="confirmPassword"
        label="Confirmação de senha:"
        value={data.confirmPassword}
        onChange={(e) => onChange('confirmPassword', e.target.value)}
        onBlur={(e) => {handleConfirmPasswordBlur(e); onBlur('confirmPassword');}}
        className={`inputField ${emptyField?.confirmPassword || confirmPasswordError ? 'errorMessage' : ''}`}
        error={emptyField?.confirmPassword || confirmPasswordError}
        required
      />
    </>
  );
}

export default Step2;
