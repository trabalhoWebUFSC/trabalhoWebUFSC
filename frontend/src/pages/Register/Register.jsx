import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/api';
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

  // carrega dados ao montar o componente se for view/edit
  useEffect(() => {
    if (isViewMode || isEditMode) {
      const fetchUserData = async () => {
        try {
          const response = await api.get('/auth/me');
          const user = response.data;

          setFormState({
            name: user.name || '',
            birth: user.birth ? user.birth.split('T')[0] : '',
            email: user.email || '',
            password: '',
            confirmPassword: '',
            profilePicture: null,
            profilePictureUrl: user.profilePictureUrl || null,
            address: user.address || {
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
          setError("Error loading the user data.");
          navigate('/portal')
        } finally {
          setDataLoading(false);
        }
      };
      fetchUserData();
    }
  }, [mode, isViewMode, isEditMode]);

  useEffect(() => {
    const isStep1Valid = formState.name && formState.birth;
    const isStep2Valid = isViewMode || (formState.email && (isEditMode || (formState.password && formState.confirmPassword)));
    const isStep3Valid = isViewMode || (formState.address.cep && formState.address.street && formState.address.number);

    if (currentStep === 1) setIsBtnDisabled(!isStep1Valid);
    else if (currentStep === 2) setIsBtnDisabled(!isStep2Valid);
    else if (currentStep === 3) setIsBtnDisabled(!isStep3Valid);
  }, [formState, currentStep, isEditMode, isViewMode]);

  const handleChange = (field, value, section = null) => {
    if (section) {
      setFormState((prev) => ({
        ...prev,
        [section]: { ...prev[section], [field]: value }
      }));
    } else {
      setFormState((prev) => ({ ...prev, [field]: value }));
    }

    if (section && emptyField[field]) {
      setEmptyField((prev) => ({ ...prev, [field]: '' }));
    } else if (!section && emptyField[field]) {
      setEmptyField((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleFieldBlur = (field, section = null) => {
    const value = section ? formState[section][field] : formState[field];
    if (isEditMode && (field === 'password' || field === 'confirmPassword') && !value) return;

    const errorMsg = validateField(value);
    setEmptyField((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // COM FOTO DE PERFIL (Multipart/Form-Data) 
      if (formState.profilePicture) {
        const payload = new FormData();
        payload.append('name', formState.name);
        payload.append('birth', formState.birth);
        payload.append('email', formState.email);
        
        if (formState.password) {
          payload.append('password', formState.password);
        }

        // Backend espera o endereço como JSON string dentro do form-data ou campos separados

        payload.append('address', JSON.stringify(formState.address));
        payload.append('profilePicture', formState.profilePicture);

        if (mode === 'edit') {
          await api.put('/auth/edit', payload, { headers: { 'Content-Type': 'multipart/form-data' } });
          toast.success("Profile successfully updated!");
          setTimeout(() => navigate("/portal"), 2000);
        } else {
          await api.post('/auth/register', payload, { headers: { 'Content-Type': 'multipart/form-data' } });
          toast.success("Account successfully created!");
          setTimeout(() => navigate("/login"), 2000);
        }

      } else {
        // SEM FOTO (JSON PURO) 
        
        const payload = {
          name: formState.name,
          birth: formState.birth,
          email: formState.email,
          address: formState.address, 
        };

        if (formState.password) {
          payload.password = formState.password;
        }

        if (mode === 'edit') {
          // Edição continua usando api/axios
          await api.put('/auth/edit', payload);
          toast.success("Profile successfully updated!");
          setTimeout(() => navigate("/portal"), 2000);
        } else {
          // Registro usa fetch para evitar problemas com Axios e JSON
          const response = await fetch('http://localhost:3001/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json' 
            },
            body: JSON.stringify(payload)
          });

          const data = await response.json();

          if (!response.ok) {
            // Pega a mensagem de erro do backend (ex: senha fraca)
            throw new Error(data.message || "Registration failed");
          }

          toast.success("Account successfully created! Redirecting...");
          setTimeout(() => navigate("/login"), 2000);
        }
      }

    } catch (err) {
      console.error("Erro no submit:", err);
      const msg = err.response?.data?.message || err.message || "Failed to process request.";
      setError(msg);
      toast.error(msg); // Mostra o erro visualmente 
    } finally {
      setLoading(false);
    }
  };

  if (dataLoading) return <div className={styles.loading}>Loading data...</div>;

  return (
    <div className={sharedStyles.authContainer}>
      <ToastContainer position="top-right" icon={false} toastStyle={{ backgroundColor: "#d5a874ff" }}
        autoClose={3000} theme="colored" hideProgressBar={true} newestOnTop={false} closeOnClick
        rtl={false} pauseOnFocusLoss draggable pauseOnHover
      />

      <form className={`${sharedStyles.authForm} ${styles.registerForm}`} onSubmit={handleSubmit}>
        <h2 className={sharedStyles.formTitle}>
          {isViewMode ? 'Profile' : isEditMode ? 'Edit Profile' : 'Sign Up'}
        </h2>

        {currentStep === 1 && (
          <Step1
            data={formState}
            onChange={handleChange}
            onBlur={handleFieldBlur}
            emptyField={emptyField}
            disabled={isViewMode}
          />
        )}

        {currentStep === 2 && (
          <Step2
            data={formState}
            onChange={handleChange}
            onBlur={handleFieldBlur}
            emptyField={emptyField}
            disabled={isViewMode}
            mode={mode}
          />
        )}

        {currentStep === 3 && (
          <Step3
            data={formState}
            onChange={handleChange}
            onBlur={(field) => handleFieldBlur(field, 'address')}
            emptyField={emptyField}
            disabled={isViewMode}
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

        {error && (
          <p className={sharedStyles.errorMessage} style={{ marginTop: '15px', textAlign: 'center' }}>
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

export default RegisterPage;
