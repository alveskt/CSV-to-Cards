import React, { useEffect, useState } from 'react';
import { Player } from '../../../../models/player/player.model';
import PlayerCard from '../cards/PlayerCard';
import './CardsGenerator.css'
import { deletePlayer, getPlayersData} from '../../../../services/homeService/home.service'

interface CardsGeneratorProps {
  playersData: Player[];
  sendPlayersUpdated: (players: Player[]) => void;
}

const CardsGenerator: React.FC<CardsGeneratorProps> = ({ playersData, sendPlayersUpdated }) => {
  const [playersDataUpdated, setPlayersDataUpdated] = useState(playersData);

  const deletePlayerById = async (playerId: Number)=>{
    try{
      await deletePlayer(playerId);
      const updatedPlayers = await getPlayersData();
      setPlayersDataUpdated(updatedPlayers);
      sendPlayersUpdated(updatedPlayers);
    }catch(error){
      console.log('erro ao deletar jogador')
    }
  }

  useEffect(() => {
    setPlayersDataUpdated(playersData);
  }, [playersData]);
  
  return (
    <div className="cardsPlayer">
      {playersDataUpdated.length > 0 ? (
        playersDataUpdated.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            sendPlayerId={deletePlayerById}
          />
        ))
      ) : (
        <p>No players found.</p>
      )}
    </div>
  );
};

export default CardsGenerator;
