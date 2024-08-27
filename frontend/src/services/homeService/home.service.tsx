import { Player } from "../../models/player/player.model";
import { api } from "../../utils/shared/enviroment";

export const sendPlayers = async (playersData: Player[]) => {
  try {
    const postResponse = await fetch(`${api}/api/players`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playersData),
    });

    if (!postResponse.ok) {
      throw new Error('Erro ao enviar dados');
    }

    const data = await postResponse.json();
    return data;
  } catch (error) {
    console.error('Erro ao enviar dados:', error);
    throw error;
  }
};

export const getPlayersData = async () => {
  try {
    const getResponse = await fetch(`${api}/api/players`);
    if (!getResponse.ok) {
      throw new Error('Erro ao obter dados tratados');
    }
    const treatedData = await getResponse.json();
    return treatedData as Player[];
  } catch (error) {
    console.error('Erro ao obter dados tratados:', error);
    throw error;
  }
};

export const deletePlayer = async(playerId: Number)=>{
  try{
    const response = await fetch(`${api}/api/players/${playerId}`, {
      method: 'DELETE',   
    });
    if (!response.ok) {
      throw new Error('Erro ao deletar o jogador');
    }
    return response;
  }catch(error){
    console.log('erro ao deletar', error)
  }
}

export const updatePlayer = async(player: Player)=>{
  try{
    const response = await fetch(`${api}/api/players/${player.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(player),
    });
    if (!response.ok) {
      throw new Error('Erro ao atualizar o jogador');
    }
    return response;
  }catch(error){
    console.error('Erro ao atualizar:', error);
  }
}