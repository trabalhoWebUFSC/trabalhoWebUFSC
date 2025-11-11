import React, { useState } from 'react';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import { toggleShow } from '../../utils/password/showPassword';
import sharedStyles from '../../styles/auth/AuthShared.module.css';
import styles from './PasswordInput.module.css';

function PasswordInput({ 
  id, 
  value, 
  onChange, 
  onBlur, 
  className = '', 
  label,
  error,
  required = false 
}) {
  const [eyeIsClosed, setEyeIsClosed] = useState(true);
  
  return (
    <div className={sharedStyles.formGroup}>
      {label && <label htmlFor={id}>{label}</label>}
      <div className={styles.passwordInputWrapper}>
        <input
          type={eyeIsClosed ? 'password' : 'text'}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={sharedStyles.inputField}
          required={required}
        />
        <button 
          type="button"
          className={styles.togglePasswordBtn}
          onClick={() => toggleShow(setEyeIsClosed)}
        >
          {eyeIsClosed ? <VscEye /> : <VscEyeClosed />}
        </button>
      </div>
      {error && <span className={sharedStyles.errorMessage}>{error}</span>}
    </div>
  );
}

export default PasswordInput;