import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { setAuthToken } from '../../services/api';
import Step1 from '../../components/FormSteps/Step1';
import Step2 from '../../components/FormSteps/Step2';
import Step3 from '../../components/FormSteps/Step3';
import { validateField } from '../../utils/validator/field';
import sharedStyles from '../../styles/auth/AuthShared.module.css';
import styles from "./Register.module.css";

function RegisterPage({ mode = 'register' }) {
  const navigate = useNavigate();
  
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [emptyField, setEmptyField] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [dataLoading, setDataLoading] = useState(mode === 'view' || mode === 'edit');
  const totalSteps = 3;

  const [formState, setFormState] = useState({
    // Dados pessoais
    name: '',
    birth: '',

    // Credenciais
    email: '',
    password: '',
    confirmPassword: '',
    profilePicture: null,
    profilePictureUrl: null,

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

  const isViewMode = mode === 'view';
  const isEditMode = mode === 'edit';
  const isRegisterMode = mode === 'register';
  const isDisabled = isViewMode;

  // carrega dados ao montar o componente se for view/edit
  useEffect(() => {
    if ((isViewMode || isEditMode) && dataLoading) {
      loadProfileData();
    }
  }, []);

  const loadProfileData = async () => {
    try {
      const response = await api.get('/auth/profile');
      const userData = response.data;

      setFormState({
        name: userData.name || '',
        birth: userData.birth || '',
        email: userData.email || '',
        password: '',
        confirmPassword: '',
        profilePicture: null,
        profilePictureUrl: userData.profilePictureUrl || null,
        address: userData.address || {
          cep: '',
          street: '',
          number: '',
          hood: '',
          city: '',
          state: '',
          complement: ''
        }
      });
    } catch (err) {
      console.error("Error loading profile:", err);
      setError("Error loading profile: " + err.message);
      
      if (err.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setDataLoading(false);
    }
  };

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
      const hasEmail = formState.email.trim() !== '';
      if (isRegisterMode) {
        return hasEmail && formState.password.trim() !== '' &&
        formState.confirmPassword.trim() !== '';
      }
      return hasEmail;
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
  };
  
  useEffect(() => {
    setIsBtnDisabled(!validateCurrentStep());
  }, [formState, currentStep, isRegisterMode]);
  
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
      const formData = new FormData();
      
      formData.append('name', formState.name);
      formData.append('birth', formState.birth);
      formData.append('email', formState.email);
      
      if (isRegisterMode || (isEditMode && formState.password)) {
        formData.append('password', formState.password);
      }
      
      if (formState.profilePicture) {
        formData.append('profilePicture', formState.profilePicture);
      }
      
      formData.append('address', JSON.stringify({
        cep: formState.address.cep,
        street: formState.address.street,
        number: formState.address.number,
        hood: formState.address.hood,
        city: formState.address.city,
        state: formState.address.state,
        complement: formState.address.complement
      }));

      if (isRegisterMode) {
        const response = await api.post('/auth/register', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setAuthToken(response.data.userId);
        navigate("/portal");
      } else if (isEditMode) {
        await api.put('/auth/profile', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        navigate("/profile");
      }

    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Error processing request.";
      setError(errorMessage);
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    if (isRegisterMode) return 'Sign Up';
    if (isViewMode) return 'Profile';
    if (isEditMode) return 'Edit Profile';
  };

  if (dataLoading && (isViewMode || isEditMode)) {
    return (
      <div className={sharedStyles.authContainer}>
        <div className={sharedStyles.authForm}>
          <h2 className={sharedStyles.formTitle}>{getTitle()}</h2>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={sharedStyles.authContainer}>
      <form onSubmit={handleSubmit} className={sharedStyles.authForm}>
        <h2 className={sharedStyles.formTitle}>{getTitle()}</h2>


        {currentStep === 1 && (
          <Step1 
            data={formState}
            onChange={handleChange}
            onBlur={handleFieldBlur}
            emptyField={emptyField}
            disabled={isDisabled}
          />
        )}

        {currentStep === 2 && (
          <Step2
            data={formState}
            onChange={handleChange}
            onBlur={handleFieldBlur}
            emptyField={emptyField}
            disabled={isDisabled}
          />
        )}

        {currentStep === 3 && (
          <Step3 
            data={formState}
            onChange={handleChange}
            onBlur={(field) => handleFieldBlur(field, 'address')}
            emptyField={emptyField}
            disabled={isDisabled}
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

          {currentStep === totalSteps && !isViewMode && (
            <button 
            type="submit" 
            disabled={isBtnDisabled || loading}
            className={styles.btn}
            >
              »
            </button>
          )}
        </div>
        {error && <p className={sharedStyles.errorMessage}>{error}</p>}
      </form>
    </div>
  );
}

export default RegisterPage;
