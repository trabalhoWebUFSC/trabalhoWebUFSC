import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { setAuthToken } from '../../services/api';
import Step1 from '../../components/FormSteps/Step1';
import Step2 from '../../components/FormSteps/Step2';
import Step3 from '../../components/FormSteps/Step3';
import { validateField } from '../../utils/validator/field';
import sharedStyles from '../../styles/auth/AuthShared.module.css';
import styles from "./Register.module.css";

function RegisterPage() {
  const navigate = useNavigate();
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [emptyField, setEmptyField] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const [formState, setFormState] = useState({
    // Dados pessoais
    name: '',
    birth: '',

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
  
  const handleFieldBlur = (field, parentField = null) => {
    // se o campo tiver um 'parent field' (campos aninhados) acessa com formState[parentField][field]
    const value = parentField ? formState[parentField][field] : formState[field];
    const error = validateField(value);
    setEmptyField(prev => ({...prev, [field]: error}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        name: formState.name,
        birth: formState.birth,
        email: formState.email,
        password: formState.password,
        address: {
          cep: formState.address.cep,
          street: formState.address.street,
          number: formState.address.number,
          hood: formState.address.hood,
          city: formState.address.city,
          state: formState.address.state,
          complement: formState.address.complement
        }
      };

      // Envia para API 
      const response = await api.post('/auth/register', payload);

      // Faz login automaticamente após ser cadastrado
      setAuthToken(response.data.token);
      navigate("/portal");

    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to sign up. Please try again.";
      setError(errorMessage);
      console.error("Sign up error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={sharedStyles.authContainer}>
    <form onSubmit={handleSubmit} className={sharedStyles.authForm}>
      <h2 className={sharedStyles.formTitle}>Sign Up</h2>

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
          onBlur={(field) => handleFieldBlur(field, 'address')}
          emptyField={emptyField}
        />
      )}

      <div className={styles.buttonGroup}>
        {currentStep > 1 && (
          <button 
            type="button" 
            onClick={prevStep} 
            className={styles.btn}
            disabled={loading}
          >
            «
          </button>
        )}

        {currentStep < totalSteps && (
          <button 
            type="button" 
            disabled={isBtnDisabled || loading} 
            onClick={nextStep} 
            className={styles.btn}
          >
            »
          </button>
        )}

        {currentStep === totalSteps && (
          <button 
            type="submit" 
            disabled={isBtnDisabled || loading}
            className={styles.btn}
            >
            »
          </button>
        )}
        {error && <p className={sharedStyles.errorMessage}>{error}</p>}
      </div>
    </form>
    </div>
  );
}

export default RegisterPage;
