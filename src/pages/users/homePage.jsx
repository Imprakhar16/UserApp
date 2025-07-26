import React, { useEffect, useState } from 'react';

const HomePage = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100); 
  }, []);

  const containerStyle = {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    textAlign: 'center',
    padding: '20px',
  };

  const messageStyle = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 1s ease, transform 1s ease',
  };

  const headingStyle = {
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    fontSize: '2.5rem',
    marginBottom: '1rem',
  };

  const paragraphStyle = {
    fontSize: '1.2rem',
    maxWidth: '500px',
    margin: '0 auto',
  };

  return (
    <div style={containerStyle}>
      <div style={messageStyle}>
        <h1 style={headingStyle}>👋 Welcome to the User Management App</h1>
        <p style={paragraphStyle}>
          Manage users easily with a smooth and modern interface.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
