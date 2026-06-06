import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPolls } from '../services/api';

const pageStyle = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #0f2057 0%, #1a3a8f 50%, #1e56c9 100%)',
  padding: '40px 20px'
};

function PollsPage() {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const matricule = localStorage.getItem('matricule');

  useEffect(() => {
    if (!matricule) { navigate('/'); return; }
    getAllPolls()
      .then(res => setPolls(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const aDejaVote = (poll) => {
    const voted = JSON.parse(localStorage.getItem('voted') || '{}');
    return voted[poll._id] === true;
  };

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '900', color: 'white', fontFamily: 'Georgia, serif' }}>Campus Poll</h1>
            <p style={{ margin: '4px 0 0', color: '#93c5fd', fontSize: '13px' }}>Connecté en tant que : {matricule}</p>
          </div>
          <button onClick={() => { localStorage.removeItem('matricule'); navigate('/'); }}
            style={{ padding: '10px 18px', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '12px', color: 'white', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>
            Se déconnecter
          </button>
        </div>

        <div style={{ background: 'white', borderRadius: '20px', padding: '32px', boxShadow: '0 16px 48px rgba(0,0,0,0.2)' }}>
          <h2 style={{ margin: '0 0 24px', color: '#0f2057', fontSize: '18px', fontWeight: '700' }}>Sondages en cours</h2>
          {loading ? (
            <p style={{ color: '#94a3b8', textAlign: 'center', padding: '40px 0' }}>Chargement...</p>
          ) : polls.length === 0 ? (
            <p style={{ color: '#94a3b8', textAlign: 'center', padding: '40px 0' }}>Aucun sondage disponible.</p>
          ) : polls.map(poll => (
            <div key={poll._id}
              onClick={() => navigate(`/polls/${poll._id}`)}
              style={{
                border: '2px solid #e2e8f0', borderRadius: '14px', padding: '20px 24px',
                marginBottom: '12px', cursor: 'pointer', transition: 'all 0.2s ease',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}
              onMouseOver={e => { e.currentTarget.style.borderColor = '#1a3a8f'; e.currentTarget.style.transform = 'translateX(4px)'; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.transform = 'translateX(0)'; }}
            >
              <div>
                <p style={{ margin: 0, fontWeight: '700', color: '#0f2057', fontSize: '16px' }}>{poll.question}</p>
                <p style={{ margin: '4px 0 0', color: '#94a3b8', fontSize: '13px' }}>{poll.options.length} options</p>
              </div>
              <span style={{
                padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '700',
                background: aDejaVote(poll) ? '#d1fae5' : '#e0e7ff',
                color: aDejaVote(poll) ? '#065f46' : '#1a3a8f'
              }}>
                {aDejaVote(poll) ? 'Voté' : 'Voter'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PollsPage;