const express = require('express')
const router = express.Router()
const {
  getAllPolls,
  createPoll,
  getPollById,
  voteOnPoll
} = require('../controllers/pollController')

// GET /api/polls Liste tous les sondages
router.get('/', getAllPolls)

// POST /api/polls Créer un sondage
router.post('/', createPoll)

// GET /api/polls/:id  Récupérer un sondage spécifique
router.get('/:id', getPollById)

// POST /api/polls/:id/vote Voter
router.post('/:id/vote', voteOnPoll)

module.exports = router