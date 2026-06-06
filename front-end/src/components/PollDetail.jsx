import { useState } from 'react';
import VoteForm from './VoteForm';
import PollResults from './PollResults';

function PollDetail({ poll }) {
  const [hasVoted, setHasVoted] = useState(false);
  const [updatedPoll, setUpdatedPoll] = useState(poll);

  const handleVoteSuccess = (newPollData) => {
    setUpdatedPoll(newPollData);
    setHasVoted(true);
  };

  return (
    <div>
      {hasVoted ? (
        <div>
          <p style={{ color: 'green', fontWeight: 'bold' }}>
            ✅ Vote enregistré avec succès !
          </p>
          <PollResults poll={updatedPoll} />
        </div>
      ) : (
        <VoteForm poll={updatedPoll} onVoteSuccess={handleVoteSuccess} />
      )}
    </div>
  );
}

export default PollDetail;