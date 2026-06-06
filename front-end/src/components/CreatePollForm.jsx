import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPoll } from '../services/api';

function CreatePollForm() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    if (options.length < 5) {
      setOptions([...options, '']);
    }
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async () => {
    if (!question.trim()) {
      setError('La question est obligatoire.');
      return;
    }
    if (options.some((opt) => !opt.trim())) {
      setError('Toutes les options doivent être remplies.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await createPoll({ question, options });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Votre question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ width: '100%', padding: '10px', fontSize: '16px', marginBottom: '20px' }}
      />

      {options.map((option, index) => (
        <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
          <input
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            style={{ flex: 1, padding: '8px' }}
          />
          {options.length > 2 && (
            <button
              onClick={() => removeOption(index)}
              style={{ padding: '8px 12px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
            >
              ✕
            </button>
          )}
        </div>
      ))}

      {options.length < 5 && (
        <button
          onClick={addOption}
          style={{ marginBottom: '20px', padding: '8px 16px', cursor: 'pointer', background: '#e0e7ff', border: 'none', borderRadius: '6px' }}
        >
          + Ajouter une option
        </button>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{ padding: '12px 24px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}
      >
        {loading ? 'Création...' : 'Créer le sondage'}
      </button>
    </div>
  );
}

export default CreatePollForm;