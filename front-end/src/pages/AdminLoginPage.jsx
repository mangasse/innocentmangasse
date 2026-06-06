import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const pageStyle = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #0f2057 0%, #1a3a8f 50%, #1e56c9 100%)',
  display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px'
};

const inputStyle = {
  width: '100%', padding: '14px 16px', fontSize: '15px', boxSizing: 'border-box',
  border: '2px solid #e2e8f0', borderRadius: '12px', outline: 'none',
  marginBottom: '16px', color: '#0f2057'
};

function AdminLoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [identifiant, setIdentifiant] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (identifiant.length !== 8) {
      setError("L'identifiant doit contenir exactement 8 caractères.");
      return;
    }
    const admins = JSON.parse(localStorage.getItem('admins') || '[]');

    if (isRegister) {
      if (admins.includes(identifiant)) {
        setError('Cet identifiant existe déjà.');
        return;
      }
      admins.push(identifiant);
      localStorage.setItem('admins', JSON.stringify(admins));
      localStorage.setItem('adminId', identifiant);
      navigate('/admin/dashboard');
    } else {
      if (!admins.includes(identifiant)) {
        setError('Identifiant introuvable. Créez un compte.');
        return;
      }
      localStorage.setItem('adminId', identifiant);
      navigate('/admin/dashboard');
    }
  };

  return (
    <div style={pageStyle}>
      <div style={{ background: 'white', borderRadius: '24px', padding: '56px 48px', boxShadow: '0 32px 80px rgba(0,0,0,0.3)', maxWidth: '440px', width: '100%' }}>
        <button onClick={() => navigate('/')}
          style={{ background: '#f1f5f9', border: 'none', borderRadius: '10px', padding: '8px 16px', color: '#475569', fontWeight: '600', cursor: 'pointer', fontSize: '13px', marginBottom: '32px' }}>
          Retour
        </button>
        <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#0f2057', margin: '0 0 8px', fontFamily: 'Georgia, serif' }}>
          Espace Administrateur
        </h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '32px' }}>
          {isRegister ? 'Créez votre compte administrateur' : 'Connectez-vous à votre espace'}
        </p>

        <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
          Identifiant (8 caractères)
        </label>
        <input
          type="text"
          placeholder="Ex : ADMIN001"
          maxLength={8}
          value={identifiant}
          onChange={e => { setIdentifiant(e.target.value); setError(''); }}
          style={inputStyle}
        />
        <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>
          {identifiant.length}/8 caractères
        </p>

        {error && <p style={{ color: '#ef4444', fontSize: '13px', marginBottom: '12px' }}>{error}</p>}

        <button onClick={handleSubmit}
          style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg, #0f2057, #1a3a8f)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '16px', cursor: 'pointer', boxShadow: '0 8px 20px rgba(15,32,87,0.3)', marginBottom: '20px' }}>
          {isRegister ? 'Créer le compte' : 'Se connecter'}
        </button>

        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
          {isRegister ? 'Déjà un compte ?' : 'Pas encore de compte ?'}
          <span onClick={() => { setIsRegister(!isRegister); setError(''); }}
            style={{ color: '#1a3a8f', fontWeight: '700', cursor: 'pointer', marginLeft: '6px' }}>
            {isRegister ? 'Se connecter' : 'Créer un compte'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AdminLoginPage;