import React from 'react';
import { formatCep } from '../../utils/formatter/cep';

function Step3({ data, onChange }) {
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
        alert('CEP não encontrado!');
        return;
      }

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
      alert('Erro ao buscar CEP:', error);
    }
  }

  return (
    <>
    {/* separa as infos em colunas */}
    <div className="addressGrid">
      <div className="formGroup">
        <label htmlFor="cep">CEP:</label>
        <input
          type="text"
          id="cep"
          value={formatCep(data.address.cep)}
          onChange={handleCepChange}
          onBlur={(e) => handleCepBlur(data.address.cep)} 
          placeholder="00000-000"
          className="inputField"
          required
        />
      </div>

      <div className="formGroup">
        <label htmlFor="street">Rua:</label>
        <input
          type="text"
          id="street"
          value={data.address.street}
          onChange={(e) => handleAddressChange('street', e.target.value)}
          className="inputField"
          required
        />
      </div>

      <div className="formGroup">
        <label htmlFor="number">Número:</label>
        <input
          type="text"
          id="number"
          value={data.address.number}
          onChange={(e) => handleAddressChange('number', e.target.value)}
          className="inputField"
          required
        />
      </div>

      <div className="formGroup">
        <label htmlFor="hood">Bairro:</label>
        <input
          type="text"
          id="hood"
          value={data.address.hood}
          onChange={(e) => handleAddressChange('hood', e.target.value)}
          className="inputField"
          required
        />        
      </div>

      <div className="formGroup">
        <label htmlFor="city">Cidade:</label>
        <input
          type="text"
          id="city"
          value={data.address.city}
          onChange={(e) => handleAddressChange('city', e.target.value)}
          className="inputField"
          required
        />
      </div>

      <div className="formGroup">
        <label htmlFor="state">UF:</label>
        <input
          type="text"
          id="state"
          value={data.address.state}
          onChange={(e) => handleAddressChange('state', e.target.value)}
          className="inputField"
          required
        />
      </div>

      <div className="formGroup">
        <label htmlFor="complement">Complemento:</label>
        <input
          type="text"
          id="complement"
          value={data.address.complement}
          onChange={(e) => handleAddressChange('complement', e.target.value)}
          className="inputField"
          placeholder="(Opcional)"
        />
      </div>
    </div>
    </>
  )
}

export default Step3;
