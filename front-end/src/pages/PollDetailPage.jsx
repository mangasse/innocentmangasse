import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPollById } from '../services/api';
import PollDetail from '../components/PollDetail';

function PollDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPollById(id)
      .then((res) => setPoll(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

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
          {loading ? (
            <p style={{ color: '#94a3b8', textAlign: 'center', padding: '40px 0' }}>Chargement...</p>
          ) : poll ? (
            <PollDetail poll={poll} />
          ) : (
            <p style={{ color: '#ef4444', textAlign: 'center' }}>Sondage introuvable.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PollDetailPage;