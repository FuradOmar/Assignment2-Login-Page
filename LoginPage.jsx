import React, { useState } from 'react';


const styles = {
  authContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
    padding: '20px'
  },
  authCard: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '24rem'
  },
  authTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#1f2937'
  },
  formGroup: {
    marginBottom: '1rem'
  },
  formLabel: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#4b5563',
    fontWeight: '500'
  },
  formInput: {
    width: '100%',
    padding: '0.5rem 0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.375rem',
    outline: 'none',
  },
  btn: {
    width: '100%',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '0.375rem',
    fontWeight: '500',
    cursor: 'pointer',
    marginTop: '1rem'
  },
  btnPrimary: {
    backgroundColor: '#3b82f6',
    color: 'white'
  },
  btnDanger: {
    backgroundColor: '#ef4444',
    color: 'white'
  },
  authLink: {
    color: '#3b82f6',
    cursor: 'pointer',
    textDecoration: 'none'
  },
  errorMessage: {
    color: '#ef4444',
    fontSize: '0.875rem',
    marginTop: '0.5rem'
  },
  switchPageText: {
    marginTop: '1rem',
    textAlign: 'center',
    color: '#6b7280'
  },
  profileWelcome: {
    textAlign: 'center',
    color: '#4b5563',
    marginBottom: '1.5rem'
  }
};

const AuthSystem = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      setLoggedInUser({ email: formData.email });
      setCurrentPage('profile');
      setFormData({ email: '', password: '', confirmPassword: '' });
    } else {
      setError('Please fill in all fields');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setCurrentPage('login');
    setFormData({ email: '', password: '', confirmPassword: '' });
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setCurrentPage('login');
    setFormData({ email: '', password: '', confirmPassword: '' });
  };

  const renderLogin = () => (
    <div style={styles.authContainer}>
      <div style={styles.authCard}>
        <h2 style={styles.authTitle}>Login</h2>
        <form onSubmit={handleLogin}>
          <div style={styles.formGroup}>
            <label style={styles.formLabel} htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={styles.formInput}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel} htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              style={styles.formInput}
              required
            />
          </div>
          {error && <div style={styles.errorMessage}>{error}</div>}
          <button type="submit" style={{...styles.btn, ...styles.btnPrimary}}>Login</button>
        </form>
        <p style={styles.switchPageText}>
          Don't have an account?{' '}
          <span 
            style={styles.authLink} 
            onClick={() => {
              setCurrentPage('register');
              setError('');
              setFormData({ email: '', password: '', confirmPassword: '' });
            }}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );

  const renderRegister = () => (
    <div style={styles.authContainer}>
      <div style={styles.authCard}>
        <h2 style={styles.authTitle}>Register</h2>
        <form onSubmit={handleRegister}>
          <div style={styles.formGroup}>
            <label style={styles.formLabel} htmlFor="reg-email">Email</label>
            <input
              type="email"
              id="reg-email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={styles.formInput}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel} htmlFor="reg-password">Password</label>
            <input
              type="password"
              id="reg-password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              style={styles.formInput}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel} htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              style={styles.formInput}
              required
            />
          </div>
          {error && <div style={styles.errorMessage}>{error}</div>}
          <button type="submit" style={{...styles.btn, ...styles.btnPrimary}}>Register</button>
        </form>
        <p style={styles.switchPageText}>
          Already have an account?{' '}
          <span 
            style={styles.authLink}
            onClick={() => {
              setCurrentPage('login');
              setError('');
              setFormData({ email: '', password: '', confirmPassword: '' });
            }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div style={styles.authContainer}>
      <div style={styles.authCard}>
        <h2 style={styles.authTitle}>Profile</h2>
        <p style={styles.profileWelcome}>
          Welcome, {loggedInUser?.email}!
        </p>
        <button 
          style={{...styles.btn, ...styles.btnDanger}}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {currentPage === 'login' && renderLogin()}
      {currentPage === 'register' && renderRegister()}
      {currentPage === 'profile' && renderProfile()}
    </>
  );
};

export default AuthSystem;