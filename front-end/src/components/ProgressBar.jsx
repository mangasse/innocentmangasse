function ProgressBar({ label, votes, percentage }) {
  return (
    <div style={{ marginBottom: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span>{label}</span>
        <span>{votes} vote(s) — {percentage}%</span>
      </div>
      <div style={{ background: '#e0e0e0', borderRadius: '8px', height: '20px' }}>
        <div
          style={{
            width: `${percentage}%`,
            background: '#4f46e5',
            height: '100%',
            borderRadius: '8px',
            transition: 'width 0.5s ease',
          }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;