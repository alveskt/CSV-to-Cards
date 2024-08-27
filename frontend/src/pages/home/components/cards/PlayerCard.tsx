import React, { useState } from "react";
import { Card, CardContent, Typography } from '@mui/material';
import { Player } from "../../../../models/player/player.model";
import './PlayerCard.css'
import lakers_logo from '../../../../assets/imgs/lakers.png';
import bulls_logo from '../../../../assets/imgs/bulls.png';
import celtics_logo from '../../../../assets/imgs/celtics.png';
import heat_logo from '../../../../assets/imgs/heat.png';
import warriors_logo from '../../../../assets/imgs/warriors.png';
import jazz_logo from '../../../../assets/imgs/jazz.png';
import knicks_logo from '../../../../assets/imgs/knicks.png';
import nuggets_logo from '../../../../assets/imgs/nuggets.png';
import nets_logo from '../../../../assets/imgs/nets.png';
import nba_logo from '../../../../assets/imgs/nba.png';
import cavaliers_logo from '../../../../assets/imgs/cavaliers.png';

import classNames from "classnames";
import StarIcon from '@mui/icons-material/Star';
import { MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

import { updatePlayer } from '../../../../services/homeService/home.service'

const teamLogos: { [key: string]: { logo: string, name: string } } = {
  'lakers': { logo: lakers_logo, name: 'lakers' },
  'bulls': { logo: bulls_logo, name: 'bulls' },
  'heat': { logo: heat_logo, name: 'heat' },
  'warriors': { logo: warriors_logo, name: 'warriors' },
  'celtics': { logo: celtics_logo, name: 'celtics' },
  'jazz': { logo: jazz_logo, name: 'jazz' },
  'knicks': { logo: knicks_logo, name: 'knicks' },
  'nuggets': { logo: nuggets_logo, name: 'nuggets' },
  'nets': { logo: nets_logo, name: 'nets' },
  'cavaliers': { logo: cavaliers_logo, name: 'cavaliers' },
};

const getTeamInfo = (team: string) => {
  const teamLowerCase = team.toLowerCase();
  for (const key in teamLogos) {
    if (teamLowerCase.includes(key)) {
      return teamLogos[key];
    }
  }
  return { logo: nba_logo, name: 'nba' };
};

const getTeamLogo = (team: string) => {
  return getTeamInfo(team).logo;
};

const getTeamClassName = (team: string) => {
  const teamName = getTeamInfo(team).name;
  return teamName;
};

interface CardProps {
  player: Player;
  sendPlayerId: (playerId: Number) => void;
}

const PlayerCard: React.FC<CardProps> = ({ player, sendPlayerId}) => {
  const [playerTitles, setPlayerTitles] = useState(player.titles);

  const deletePlayer = () =>{
    sendPlayerId(player.id!);
  }

  const addTitles = () =>{
   updatePlayerTitles(player);
  }

  const updatePlayerTitles = async(player: Player)=>{
    try{
      const playerNewTitles = playerTitles +1;
      player.titles = playerNewTitles;
      const updatedPlayer = await updatePlayer(player);
      if(updatedPlayer?.ok){
        setPlayerTitles(playerNewTitles);
      }
    }catch(error){
      console.log('erro ao atualizar', error)
    }
  }

  const teamClass = getTeamClassName(player.team)
  return (
    <div className={classNames('cards', teamClass)}>
      <img src={getTeamLogo(player.team)} alt="logo time" />
      <Card>
        <CardContent>
          <Typography variant="h6">{player.name}</Typography>
          <Typography variant="body2"><strong>Team:</strong> {player.team}</Typography>
          <Typography variant="body2" >
            <strong>Titles:</strong>
            {Array.from({ length: playerTitles }).map((_, index) => (
              <StarIcon key={index} className="title-icon"/>
            ))}
          </Typography>
          <Typography variant="body2"><strong>Retired:</strong> {player.retired ? 'Yes' : 'No'}</Typography>
          <div className="operations">
          <Typography className="deletePlayer">
              <button onClick={deletePlayer}>Delete player<MdDelete /></button>
            </Typography>
          <Typography className="addTitles"> 
              <button onClick={addTitles}>Add title<IoMdAddCircle /></button>
          </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  )
};

export default PlayerCard;
