import React from 'react';
import ProfilePicture from '../Upload/ProfilePicture';

function Step1({ data, onChange, onBlur, emptyField }) {
  return (
    <>
      <div className="formGroup">
        <ProfilePicture 
          value={data.profilePicture}
          onChange={(file) => onChange('profilePicture', file)}
          className="inputField"
        />
      </div>

      <div className="formGroup">
        <label htmlFor="name">Nome:</label>
        <input 
          type="text" 
          id="name"
          value={data.name} 
          onChange={(e) => onChange('name', e.target.value)}
          onBlur={() => onBlur('name')}
          className={`inputField ${emptyField?.name ? 'errorMessage' : ''}`}
          required
        />
        {emptyField?.name && (
          <span className="errorMessage">{emptyField.name}</span>
        )}
      </div>

      <div className="formGroup">
        <label htmlFor="birth">Data de nascimento:</label>
        <input
          type="date"
          id="birth"
          value={data.birth}
          onChange={(e) => onChange('birth', e.target.value)}
          onBlur={() => onBlur('birth')}
          className={`inputField ${emptyField?.birth ? 'errorMessage' : ''}`}
          required
        />
        {emptyField?.birth && (
          <span className="errorMessage">{emptyField.birth}</span>
        )}
      </div>
    </>
  );
}

export default Step1;
