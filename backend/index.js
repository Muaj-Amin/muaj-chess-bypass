const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ origin: '*' }));

app.post('/api/game-review', async (req, res) => {
  const { gameLink } = req.body;
  const gameIdMatch = gameLink.match(/game\/(\d+)/);

  if (!gameIdMatch) {
    return res.status(400).json({ error: 'Invalid Chess.com game link' });
  }

  const gameId = gameIdMatch[1];

  try {
    const reviewUrl = `https://www.chess.com/callback/live/game/${gameId}/review`;

    const response = await axios.get(reviewUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    const data = response.data;

    if (!data.review || !data.review.gameReview) {
      return res.status(404).json({ error: 'Game not reviewed yet' });
    }

    const { whiteAccuracy, blackAccuracy, mistakes, blunders, inaccuracies } = data.review.gameReview;

    return res.json({
      whiteAccuracy,
      blackAccuracy,
      mistakes,
      blunders,
      inaccuracies
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Could not fetch game review' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
