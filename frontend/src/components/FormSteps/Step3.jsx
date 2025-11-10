import Reac, {useState } from 'react';
import { formatCep } from '../../utils/formatter/cep';
import sharedStyles from '../../styles/auth/AuthShared.module.css';
import styles from "../../pages/Register/Register.module.css";

function Step3({ data, onChange, onBlur, emptyField }) {
  const [cepError, setCepError] = useState('');
  
  // funcao auxiliar para atualizar campos de address
  const handleAddressChange = (field, value) => {
    onChange('address', {...data.address, [field]: value});
  }

  const handleCepChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '');
    handleAddressChange('cep', digits.slice(0,8));
  }
  // funcao para formatar o CEP a partir da API
  const handleCepBlur = async (cep) => {
    // remove o que nao for numero
    const digits = cep.replace(/\D/g, '');

    // retorna cedo se CEP nao tiver 8 digitos 
    if (digits.length !== 8) {
      return;
    }

    try {
      // consome a API e retorna a resposta {assincrono, usa await}
      const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      // converte a resposta para json {também assincrono, usa await}
      const apiData = await response.json()

      if (apiData.erro) {
        setCepError('CEP não encontrado');
        return;
      }
      
      setCepError(''); // se o CEP for encontrado, remove o erro

      onChange('address', {
        // 'data' eh o prop 
        ...data.address,
        cep: digits,
        // 'apiData' sao os dados da API
        street: apiData.logradouro,
        hood: apiData.bairro,
        city: apiData.localidade,
        state: apiData.uf
      })

    } catch (error) {
      setCepError('Erro ao buscar CEP:', error);
    }
  }

  return (
    <>
    {/* separa as infos em colunas */}
    <div className={styles.addressGrid}>
      <div className={sharedStyles.formGroup}>
        <label htmlFor="cep">Postal code:</label>
        <input
          type="text"
          id="cep"
          value={formatCep(data.address.cep)}
          onChange={handleCepChange}
          onBlur={() => {handleCepBlur(data.address.cep); onBlur('cep');}} 
          placeholder="00000-000"
          className={`${sharedStyles.inputField} ${emptyField?.cep || cepError ? sharedStyles.errorMessage : ''}`}
          required
        />
        {(emptyField?.cep || cepError ) && (
          <span className={sharedStyles.errorMessage}>{emptyField?.cep || cepError }</span>
        )}
      </div>

      <div className={sharedStyles.formGroup}>
        <label htmlFor="street">Street:</label>
        <input
          type="text"
          id="street"
          value={data.address.street}
          onChange={(e) => handleAddressChange('street', e.target.value)}
          className={sharedStyles.inputField}
          required
        />
      </div>

      <div className={sharedStyles.formGroup}>
        <label htmlFor="number">Number:</label>
        <input
          type="text"
          id="number"
          value={data.address.number}
          onChange={(e) => handleAddressChange('number', e.target.value)}
          onBlur={() => onBlur('number')}
          className={sharedStyles.inputField}
          required
        />
        {emptyField?.number && (
          <span className="errorMessage">{emptyField?.number}</span>
        )}
      </div>

      <div className={sharedStyles.formGroup}>
        <label htmlFor="hood">Neighborhood:</label>
        <input
          type="text"
          id="hood"
          value={data.address.hood}
          onChange={(e) => handleAddressChange('hood', e.target.value)}
          className={sharedStyles.inputField}
          required
        />        
      </div>

      <div className={sharedStyles.formGroup}>
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          value={data.address.city}
          onChange={(e) => handleAddressChange('city', e.target.value)}
          className={sharedStyles.inputField}
          required
        />
      </div>

      <div className={sharedStyles.formGroup}>
        <label htmlFor="state">State:</label>
        <input
          type="text"
          id="state"
          value={data.address.state}
          onChange={(e) => handleAddressChange('state', e.target.value)}
          className={sharedStyles.inputField}
          required
        />
      </div>

      <div className={sharedStyles.formGroup}>
        <label htmlFor="complement">Complement:</label>
        <input
          type="text"
          id="complement"
          value={data.address.complement}
          onChange={(e) => handleAddressChange('complement', e.target.value)}
          className={sharedStyles.inputField}
          placeholder="(Optional)"
        />
      </div>
    </div>
    </>
  )
}

export default Step3;
