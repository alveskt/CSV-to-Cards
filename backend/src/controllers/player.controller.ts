import express, { Request, Response } from 'express';
import { Player } from '../models/Player';

import { createPlayer, 
  getPlayers,
  updatePlayer,
  deletePlayer } from '../services/player.service';

const router = express.Router();

//create a player
router.post("/players", (req: Request, res: Response) => {
  const playersSaved = getPlayers();
  const playersArray: Player[] = req.body;

  if (!Array.isArray(playersArray)) {
    return res.status(400).json({ error: "Request body should be an array of players" });
  }

  const newPlayers: Player[] = [];
  const maxId = playersSaved.reduce((max, player) => (player.id > max ? player.id : max),0);

  playersArray.forEach((player: Player, index: number) => {
    const newId = maxId + index + 1;
    const newPlayer = new Player(newId, player.name, player.team, player.titles, player.retired);
    createPlayer(newPlayer);
    newPlayers.push(newPlayer);
  });

  res.status(201).json(newPlayers);
});

//get all player
router.get('/players', (req: Request, res: Response) => {
  const players = getPlayers();
  res.status(200).json(players);
});

//update a player
router.put('/players/:id', (req: Request, res: Response) => {
  const playerId = parseInt(req.params.id);
  const playerReq: Player = req.body;

  const updatedPlayer: Player = new Player(playerId, playerReq.name, playerReq.team, playerReq.titles, playerReq.retired);
  if (playerReq.name !== undefined) updatedPlayer.name = playerReq.name;
  if (playerReq.team !== undefined) updatedPlayer.team = playerReq.team;
  if (playerReq.titles !== undefined) updatedPlayer.titles = playerReq.titles;
  if (playerReq.retired !== undefined) updatedPlayer.retired = playerReq.retired;

  if (Object.keys(updatedPlayer).length === 0) {
    return res.status(400).json({ error: 'No fields to update' });
  }

  updatePlayer(updatedPlayer);
  res.status(200).json({ message: 'Player updated successfully' });
});

//delete a player
router.delete('/players/:id', (req: Request, res: Response) => {
  const playerId = parseInt(req.params.id);
  deletePlayer(playerId);
  res.status(200).json({ message: 'Player deleted successfully' });
});

export default router;