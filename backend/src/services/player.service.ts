import * as fs from 'fs';
import * as path from 'path';
import { Player } from '../models/Player';

const filePath = path.join(__dirname, '../database/players.json');

function readData(): Player[] {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data).players;
}

function writeData(players: Player[]): void {
  const jsonData = JSON.stringify({ players }, null, 2);
  fs.writeFileSync(filePath, jsonData);
}

export function createPlayer(newPlayer: Player): void {
  const players = readData();
  players.push(newPlayer);
  writeData(players);
}

export function getPlayers(): Player[] {
  return readData();
}

export function updatePlayer(updatedPlayer: Player): void {
  const players = readData();
  const index = players.findIndex(player => player.id === updatedPlayer.id);
  if (index !== -1) {
    const existingPlayer = players[index];
    players[index] = new Player(
      updatedPlayer.id,
      updatedPlayer.name !== undefined ? updatedPlayer.name : existingPlayer.name,
      updatedPlayer.team !== undefined ? updatedPlayer.team : existingPlayer.team,
      updatedPlayer.titles !== undefined ? updatedPlayer.titles : existingPlayer.titles,
      updatedPlayer.retired !== undefined ? updatedPlayer.retired : existingPlayer.retired
    );
    writeData(players);
  }
}

export function deletePlayer(id: number): void {
  let players = readData();
  players = players.filter(player => player.id !== id);
  writeData(players);
}

