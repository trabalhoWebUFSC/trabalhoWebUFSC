import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import emailjs from '@emailjs/browser';
import styles from './ContactForm.module.css'

function ContactForm( onBlur, emptyField ) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const templateParams = {
        to_email: process.env.REACT_APP_CONTACT_EMAIL,
        from_name: name,
        from_email: email,
        phone: phone,
        message: message,
      };

      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams
      );

      toast.success('Message sent successfully!');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err) {
      console.error('Error:', err);
      toast.error('Error sending message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.contactContainer}>
      <ToastContainer position="top-right" icon={false} toastStyle={{ backgroundColor: "#a9802dac" }}
        autoClose={3000} theme="colored" hideProgressBar={true} newestOnTop={false} closeOnClick
        rtl={false} pauseOnFocusLoss draggable pauseOnHover
      />
      
      <div className={styles.textSection}>
        <h1 className={styles.formTitle}>Contact us!</h1>
        <p className={styles.formDescription}>
          Please let us know how we can best serve you.
          Use the contact form to email us, and we will 
          get back to you as soon as possible. It is an 
          honor to ensure you have a wonderful stay here 
          at Imperial Grand Hotel.
        </p>
      </div>

      <form className={styles.formSection} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.inputField}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.inputField}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <input
            type="tel"
            id="phone"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={styles.inputField}
          />
        </div>

        <div className={styles.formGroup}>
          <textarea
            id="message"
            placeholder="Comment"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={styles.inputField}
            rows="6"
            required
          />
        </div>

        <button 
          type="submit"
          className={styles.btn}
          disabled={loading}
        >
          {loading ? 'SENDING...' : 'SEND MESSAGE'}
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
