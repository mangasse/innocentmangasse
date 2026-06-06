const Poll = require('../models/Poll')

// GET /api/polls Liste tous les sondages
const getAllPolls = async (req, res) => {
  try {
    const polls = await Poll.find()
    res.status(200).json(polls)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// POST /api/polls  Créer un sondage
const createPoll = async (req, res) => {
  try {
    const { question, options } = req.body
    const newPoll = new Poll({
      question,
      options: options.map(text => ({ text, votes: 0 }))
    })
    const savedPoll = await newPoll.save()
    res.status(201).json(savedPoll)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET /api/polls/:id  Récupérer un sondage
const getPollById = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id)
    if (!poll) return res.status(404).json({ message: 'Sondage introuvable' })
    res.status(200).json(poll)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// POST /api/polls/:id/vote  Voter
const voteOnPoll = async (req, res) => {
  try {
    const { optionIndex, matricule } = req.body
    const poll = await Poll.findById(req.params.id)

    if (!poll) return res.status(404).json({ message: 'Sondage introuvable' })

    // Vérifier si le matricule a déjà voté
    if (poll.voters.includes(matricule)) {
      return res.status(403).json({ message: 'Vous avez déjà voté' })
    }

    // Incrémenter le vote
    poll.options[optionIndex].votes += 1
    poll.voters.push(matricule)

    await poll.save()
    res.status(200).json(poll)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getAllPolls, createPoll, getPollById, voteOnPoll }