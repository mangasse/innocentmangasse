import ProgressBar from './ProgressBar';

function PollResults({ poll }) {
  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);

  return (
    <div>
      <h2>{poll.question}</h2>
      <p>Total des votes : <strong>{totalVotes}</strong></p>
      {poll.options.map((option, index) => {
        const percentage = totalVotes === 0
          ? 0
          : Math.round((option.votes / totalVotes) * 100);

        return (
          <ProgressBar
            key={index}
            label={option.text}
            votes={option.votes}
            percentage={percentage}
          />
        );
      })}
    </div>
  );
}

export default PollResults;