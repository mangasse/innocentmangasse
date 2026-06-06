function PollResults({ poll }) {
  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);

  return (
    <div>
      <h2>{poll.question}</h2>
      <p style={{ color: '#64748b', marginBottom: '20px' }}>
        Total : <strong>{totalVotes}</strong> vote{totalVotes > 1 ? 's' : ''}
      </p>

      {poll.options.map((option, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 20px',
            marginBottom: '10px',
            borderRadius: '12px',
            border: '2px solid #e2e8f0',
            background: '#f8fafc',
          }}
        >
          <span style={{ fontWeight: '600', color: '#0f2057', fontSize: '15px' }}>
            {option.text}
          </span>
          <span style={{ fontWeight: '800', color: '#1a3a8f', fontSize: '16px' }}>
            {option.votes} vote{option.votes > 1 ? 's' : ''}
          </span>
        </div>
      ))}
    </div>
  );
}

export default PollResults;