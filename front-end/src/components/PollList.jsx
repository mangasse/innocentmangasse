import { useNavigate } from 'react-router-dom';

function PollList({ polls }) {
  const navigate = useNavigate();

  if (polls.length === 0) {
    return <p>Aucun sondage disponible pour le moment.</p>;
  }

  return (
    <div>
      {polls.map((poll) => (
        <div
          key={poll._id}
          onClick={() => navigate(`/polls/${poll._id}`)}
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '12px',
            cursor: 'pointer',
          }}
        >
          <h3 style={{ margin: 0 }}>{poll.question}</h3>
          <p style={{ margin: '8px 0 0', color: '#666' }}>
            {poll.options.length} options · Cliquer pour voter
          </p>
        </div>
      ))}
    </div>
  );
}

export default PollList;