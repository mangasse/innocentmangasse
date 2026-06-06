import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const pageStyle = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #0f2057 0%, #1a3a8f 50%, #1e56c9 100%)',
  display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px'
};

const cardStyle = {
  background: 'white', borderRadius: '24px', padding: '56px 48px',
  boxShadow: '0 32px 80px rgba(0,0,0,0.3)', textAlign: 'center',
  maxWidth: '480px', width: '100%'
};

const btnBase = {
  border: 'none', borderRadius: '14px', cursor: 'pointer',
  fontWeight: '700', fontSize: '15px', transition: 'all 0.25s ease', letterSpacing: '0.5px'
};

function HomePage() {
  const [step, setStep] = useState('accueil'); // accueil | matricule
  const [matricule, setMatricule] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const matriculeRegex = /^\d{2}\/ENSPM\/\d{4}$/;

  const handleMatriculeSubmit = () => {
    if (!matriculeRegex.test(matricule.trim())) {
      setError('Format invalide. Exemple : 24/ENSPM/0042');
      return;
    }
    setError('');
    localStorage.setItem('matricule', matricule.trim());
    navigate('/polls');
  };

  if (step === 'accueil') {
    return (
      <div style={pageStyle}>
        <div style={cardStyle}>
          <p style={{ fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', color: '#1a3a8f', fontWeight: '700', margin: '0 0 8px' }}>
            ENSPM — Université de Maroua
          </p>
          <h1 style={{ fontSize: '44px', fontWeight: '900', color: '#0f2057', margin: '0 0 8px', letterSpacing: '-1px', fontFamily: 'Georgia, serif' }}>
            Campus Poll
          </h1>
          <p style={{ color: '#64748b', marginBottom: '48px', fontSize: '15px' }}>
            Plateforme de sondages en temps réel
          </p>
          <p style={{ color: '#94a3b8', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>
            Sélectionnez votre profil
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button
              onClick={() => navigate('/admin/login')}
              style={{ ...btnBase, flex: 1, padding: '28px 16px', background: 'linear-gradient(135deg, #0f2057, #1a3a8f)', color: 'white', boxShadow: '0 8px 24px rgba(15,32,87,0.35)' }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 32px rgba(15,32,87,0.45)'; }}
              onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(15,32,87,0.35)'; }}
            >
              <div style={{ fontSize: '26px', marginBottom: '10px' }}>⚙</div>
              Administrateur
            </button>
            <button
              onClick={() => setStep('matricule')}
              style={{ ...btnBase, flex: 1, padding: '28px 16px', background: 'linear-gradient(135deg, #065f46, #059669)', color: 'white', boxShadow: '0 8px 24px rgba(6,95,70,0.35)' }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 32px rgba(6,95,70,0.45)'; }}
              onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(6,95,70,0.35)'; }}
            >
              <div style={{ fontSize: '26px', marginBottom: '10px' }}>✦</div>
              Étudiant
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <button onClick={() => { setStep('accueil'); setError(''); setMatricule(''); }}
          style={{ ...btnBase, background: '#f1f5f9', color: '#475569', padding: '8px 16px', fontSize: '13px', marginBottom: '32px', display: 'block', margin: '0 0 32px 0' }}>
          Retour
        </button>
        <h2 style={{ fontSize: '26px', fontWeight: '900', color: '#0f2057', margin: '0 0 8px', fontFamily: 'Georgia, serif' }}>
          Espace Étudiant
        </h2>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '32px' }}>
          Saisissez votre matricule pour accéder aux sondages
        </p>

        <div style={{ textAlign: 'left', marginBottom: '8px' }}>
          <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Matricule étudiant
          </label>
        </div>
        <input
          type="text"
          placeholder="Ex : 24/ENSPM/0042"
          value={matricule}
          onChange={e => { setMatricule(e.target.value); setError(''); }}
          style={{
            width: '100%', padding: '14px 16px', fontSize: '16px', boxSizing: 'border-box',
            border: error ? '2px solid #ef4444' : '2px solid #e2e8f0',
            borderRadius: '12px', outline: 'none', marginBottom: '8px',
            fontFamily: 'monospace', letterSpacing: '1px', color: '#0f2057'
          }}
          onKeyDown={e => e.key === 'Enter' && handleMatriculeSubmit()}
        />
        <p style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'left', marginBottom: '4px' }}>
          Format : AA/ENSPM/XXXX (ex: 24/ENSPM/0042)
        </p>
        {error && <p style={{ color: '#ef4444', fontSize: '13px', textAlign: 'left', marginBottom: '12px' }}>{error}</p>}

        <button
          onClick={handleMatriculeSubmit}
          style={{ ...btnBase, width: '100%', padding: '16px', background: 'linear-gradient(135deg, #065f46, #059669)', color: 'white', fontSize: '16px', marginTop: '16px', boxShadow: '0 8px 20px rgba(6,95,70,0.3)' }}
          onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          Accéder aux sondages
        </button>
      </div>
    </div>
  );
}

export default HomePage;