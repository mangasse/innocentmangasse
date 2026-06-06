import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPolls } from '../services/api';

const pageStyle = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #0f2057 0%, #1a3a8f 50%, #1e56c9 100%)',
  padding: '40px 20px'
};

function AdminDashboardPage() {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const adminId = localStorage.getItem('adminId');

  useEffect(() => {
    if (!adminId) { navigate('/admin/login'); return; }
    getAllPolls()
      .then(res => setPolls(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalVotes = (poll) => poll.options.reduce((s, o) => s + o.votes, 0);

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '900', color: 'white', fontFamily: 'Georgia, serif' }}>Campus Poll</h1>
            <p style={{ margin: '4px 0 0', color: '#93c5fd', fontSize: '13px' }}>Administrateur : {adminId}</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => navigate('/create')}
              style={{ padding: '10px 20px', background: 'white', border: 'none', borderRadius: '12px', color: '#0f2057', fontWeight: '700', cursor: 'pointer', fontSize: '14px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
              + Nouveau sondage
            </button>
            <button onClick={() => { localStorage.removeItem('adminId'); navigate('/'); }}
              style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '12px', color: 'white', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>
              Déconnexion
            </button>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '20px', padding: '32px', boxShadow: '0 16px 48px rgba(0,0,0,0.2)' }}>
          <h2 style={{ margin: '0 0 24px', color: '#0f2057', fontSize: '18px', fontWeight: '700' }}>
            Suivi des sondages en direct
          </h2>
          {loading ? (
            <p style={{ color: '#94a3b8', textAlign: 'center', padding: '40px 0' }}>Chargement...</p>
          ) : polls.length === 0 ? (
            <p style={{ color: '#94a3b8', textAlign: 'center', padding: '40px 0' }}>Aucun sondage créé.</p>
          ) : polls.map(poll => {
            const total = totalVotes(poll);
            return (
              <div key={poll._id} style={{ border: '2px solid #e2e8f0', borderRadius: '14px', padding: '24px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ margin: 0, color: '#0f2057', fontSize: '16px', fontWeight: '700' }}>{poll.question}</h3>
                  <span style={{ background: '#e0e7ff', color: '#1a3a8f', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>
                    {total} vote{total > 1 ? 's' : ''}
                  </span>
                </div>
                {poll.options.map((opt, i) => {
                  const pct = total === 0 ? 0 : Math.round((opt.votes / total) * 100);
                  return (
                    <div key={i} style={{ marginBottom: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '14px', color: '#334155', fontWeight: '600' }}>{opt.text}</span>
                        <span style={{ fontSize: '13px', color: '#64748b' }}>{opt.votes} vote{opt.votes > 1 ? 's' : ''} — {pct}%</span>
                      </div>
                      <div style={{ background: '#f1f5f9', borderRadius: '8px', height: '10px', overflow: 'hidden' }}>
                        <div style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #0f2057, #1e56c9)', height: '100%', borderRadius: '8px', transition: 'width 0.6s ease' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;