import React, { useEffect, useState } from 'react';
import "./Register.css"
import Step1 from '../../components/FormSteps/Step1';
import Step2 from '../../components/FormSteps/Step2';
import Step3 from '../../components/FormSteps/Step3';
import { validateField } from '../../utils/validator/field';

function RegisterPage() {
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [emptyField, setEmptyField] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const [formState, setFormState] = useState({
    // Dados pessoais
    name: '',
    birth: '',
    profilePicture: null,

    // Credenciais
    email: '',
    password: '',
    confirmPassword: '',

    // Endereco
    address: {
      cep: '',
      street: '',
      number: '',
      hood: '',
      city: '',
      state: '',
      complement: ''
    }
  });
  
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const validateCurrentStep = () => {
    if (currentStep === 1) {
      return formState.name.trim() !== '' &&
      formState.birth.trim() !== '';
    }

    if (currentStep === 2) {
      return formState.email.trim() !== '' &&
      formState.password.trim() !== '' &&
      formState.confirmPassword.trim() !== '';
    }
    
    if (currentStep === 3) {
      return formState.address.cep.trim() !== '' &&
      formState.address.street.trim() !== '' &&
      formState.address.number.trim() !== '' &&
      formState.address.hood.trim() !== '' &&
      formState.address.city.trim() !== '' &&
      formState.address.state.trim() !== '';
    }
    return false;
  }
  
  useEffect(() => {
    setIsBtnDisabled(!validateCurrentStep());
  }, [formState, currentStep])
  
  const handleChange = (field, value) => {
    setFormState(prev => ({ ...prev, [field]: value }));
    // limpa o erro do campo quando o usuario comeca a digitar
    if (emptyField[field]) {
      setEmptyField(prev => ({...prev, [field]: ''}));
    }
  };
  
  const handleFieldBlur = (field, fieldLabel) => {
    const error = validateField(formState[field], fieldLabel);
    setEmptyField(prev => ({...prev, [field]: error}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="registerContainer">
    <form onSubmit={handleSubmit} className="registerForm">
      <h2 className="formTitle">Cadastro</h2>

      {/* se estiver na primeira etapa renderiza Step1*/}
      {currentStep === 1 && (
        <Step1 
          data={formState}
          onChange={handleChange}
          onBlur={handleFieldBlur}
          emptyField={emptyField}
        />
      )}

      {currentStep === 2 && (
        <Step2
          data={formState}
          onChange={handleChange}
          onBlur={handleFieldBlur}
          emptyField={emptyField}
        />
      )}

      {currentStep === 3 && (
        <Step3 
          data={formState}
          onChange={handleChange}
          onBlur={handleFieldBlur}
          emptyField={emptyField}
        />
      )}

      <div className="buttonGroup">
        {currentStep > 1 && (
          <button type="button" onClick={prevStep} className="btn">Voltar</button>
        )}

        {currentStep < totalSteps && (
          <button type="button" disabled={isBtnDisabled} onClick={nextStep} className="btn">Próximo</button>
        )}

        {currentStep === totalSteps && (
          <button type="submit" disabled={isBtnDisabled} className="btn">Finalizar</button>
        )}
      </div>
    </form>
    </div>
  );
}

export default RegisterPage;
