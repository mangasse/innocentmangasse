import { useNavigate } from 'react-router-dom';
import CreatePollForm from '../components/CreatePollForm';

function CreatePollPage() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f2057 0%, #1a3a8f 50%, #1e56c9 100%)', padding: '40px 20px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <button onClick={() => navigate('/')} style={{
          marginBottom: '20px', padding: '10px 20px', cursor: 'pointer',
          background: 'white', border: 'none', borderRadius: '12px',
          color: '#0f2057', fontWeight: '700', fontSize: '14px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)', transition: 'all 0.2s ease'
        }}
          onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          Retour
        </button>
        <div style={{ background: 'white', borderRadius: '20px', padding: '40px', boxShadow: '0 16px 48px rgba(0,0,0,0.2)' }}>
          <h1 style={{ margin: '0 0 32px', fontSize: '28px', fontWeight: '900', color: '#0f2057', fontFamily: 'Georgia, serif', letterSpacing: '-0.5px' }}>
            Nouveau sondage
          </h1>
          <CreatePollForm />
        </div>
      </div>
    </div>
  );
}

export default CreatePollPage;