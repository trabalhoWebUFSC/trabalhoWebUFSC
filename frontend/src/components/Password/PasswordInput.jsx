import React, { useRef, useState } from 'react';
import './PasswordInput.css';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import { toggleShow } from '../../utils/password/showPassword';

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
  const inputRef = useRef(null);
  const [eyeIsClosed, setEyeIsClosed] = useState(false);

  return (
    <div className="formGroup">
      {label && <label htmlFor={id}>{label}</label>}
      <div className="passwordInputWrapper">
        <input
          type="password"
          id={id}
          ref={inputRef}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`inputField ${className}`}
          required={required}
        />
        <button 
          type="button"
          className="togglePasswordBtn"
          onClick={() => toggleShow(inputRef, setEyeIsClosed)}
        >
          {eyeIsClosed ? <VscEye /> : <VscEyeClosed />}
        </button>
      </div>
      {error && <span className="errorMessage">{error}</span>}
    </div>
  );
}

export default PasswordInput;
