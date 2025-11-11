import React from 'react';
import ProfilePicture from '../Upload/ProfilePicture';
import sharedStyles from '../../styles/auth/AuthShared.module.css';

function Step1({ data, onChange, onBlur, emptyField }) {
  return (
    <>
      <div className={sharedStyles.formGroup}>
        <ProfilePicture 
          value={data.profilePicture}
          onChange={(file) => onChange('profilePicture', file)}
        />
      </div>

      <div className={sharedStyles.formGroup}>
        <label htmlFor="name">Full name:</label>
        <input 
          type="text" 
          id="name"
          value={data.name} 
          onChange={(e) => onChange('name', e.target.value)}
          onBlur={() => onBlur('name')}
          className={`${sharedStyles.inputField} ${emptyField?.name ? sharedStyles.errorMessage : ''}`}
          required
        />
        {emptyField?.name && (
          <span className={sharedStyles.errorMessage}>{emptyField.name}</span>
        )}
      </div>

      <div className={sharedStyles.formGroup}>
        <label htmlFor="birth">Birth:</label>
        <input
          type="date"
          id="birth"
          value={data.birth}
          onChange={(e) => onChange('birth', e.target.value)}
          onBlur={() => onBlur('birth')}
          className={`${sharedStyles.inputField} ${emptyField?.name ? sharedStyles.errorMessage : ''}`}
          required
        />
        {emptyField?.birth && (
          <span className={sharedStyles.errorMessage}>{emptyField.birth}</span>
        )}
      </div>
    </>
  );
}

export default Step1;
