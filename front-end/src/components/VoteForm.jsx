import { useState } from 'react';
import { voteOnPoll } from '../services/api';

function VoteForm({ poll, onVoteSuccess }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [matricule, setMatricule] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (selectedOption === null) {
      setError('Veuillez sélectionner une option.');
      return;
    }
    if (!matricule.trim()) {
      setError('Veuillez entrer votre matricule.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const res = await voteOnPoll(poll._id, {
        optionIndex: selectedOption,
        matricule: matricule.trim(),
      });
      onVoteSuccess(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>{poll.question}</h2>

      {poll.options.map((option, index) => (
        <div key={index} style={{ marginBottom: '8px' }}>
          <label>
            <input
              type="radio"
              name="option"
              value={index}
              onChange={() => setSelectedOption(index)}
            />
            {' '}{option.text}
          </label>
        </div>
      ))}

      <input
        type="text"
        placeholder="Votre matricule"
        value={matricule}
        onChange={(e) => setMatricule(e.target.value)}
        style={{ display: 'block', marginTop: '12px', padding: '8px', width: '100%' }}
      />

      {error && (
        <p style={{ color: 'red', marginTop: '8px' }}>{error}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{ marginTop: '12px', padding: '10px 20px', cursor: 'pointer' }}
      >
        {loading ? 'Envoi...' : 'Voter'}
      </button>
    </div>
  );
}

export default VoteForm;