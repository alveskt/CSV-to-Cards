import React, { useEffect, useRef, useState } from 'react';
import UploadIcon from '@mui/icons-material/Upload';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import './FileUploader.css'

import CardsGenerator from '../cardsGenerator/CardsGenerator';
import { Player } from '../../../../models/player/player.model';
import { sendPlayers, getPlayersData} from '../../../../services/homeService/home.service'

interface FileData {
  name: string;
  url: string;
}

const FileUploader: React.FC = () => {
 const [files, setFiles] = useState<FileData[]>([]);
  const [playersCsv, setPlayersCsv] = useState<Player[]>([]);
  const [playersRes, setPlayersRes] = useState<Player[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>(playersRes);
  const [searchTerm, setSearchTerm] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setFiles(prevFiles => [...prevFiles, { name: file.name, url: url }]);
        readFile(file);
      }
    }
  };


  const readFile = (file: File) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      if (event.target?.result) {
        const text = event.target.result as string;
        const rows = text.split('\n').map((row: string) => row.split(','));
        const validRows = rows.filter((row) => row[0] && row[0].trim() !== '');
        const playerData: Player[] = validRows.map((row) => ({
          name: row[0], 
          team: row[1], 
          titles: parseInt(row[2], 10), 
          retired: !!row[3] && row[3].trim().toLowerCase() === 'true',
        }))
        setPlayersCsv(playerData);
      }
    };
  
    reader.readAsText(file);
  };

  useEffect(() =>{
    const sendPlayersData = async () =>{
      try{
        await sendPlayers(playersCsv);
        const treatedPlayersData = await getPlayersData();
        setPlayersRes(treatedPlayersData);
      }catch(error){
        console.error('Erro:', error);
      }
    };
    if (playersCsv.length > 0) {
      sendPlayersData();
    }
  }, [playersCsv])

  useEffect(() => {
    const results = playersRes.filter((player) => 
      player.name.toLowerCase().includes(searchTerm) ||
      player.team.toLowerCase().includes(searchTerm) ||
      player.titles.toString().includes(searchTerm) ||
      player.retired.toString().includes(searchTerm)
    );
    setFilteredPlayers(results);
  }, [searchTerm, playersRes]);

  const updatePlayersAfterDelete = (newPlayers: Player[]) =>{
    setPlayersRes(newPlayers);
  }

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept=".csv"
        onChange={handleFileChange}
      />
      <button onClick={handleButtonClick}><UploadIcon />Upload CSV</button>
      <div className="contentWrapper">
        {files.map((file, index) => (
          <div className="fileData" key={index}>
            <p>{file.name}</p>
            <a href={file.url} download={file.name}><SaveAltIcon /></a>
          </div>
        ))}
        <div className="searchBar">
          {files.length > 0 ? (
            <div>
              <h2>Filtered Players:</h2>
              <input
                type="text"
                placeholder="Search for any player atribute..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          ) : (
            <p>No files added.</p>
          )}
        </div>
        <div className="cardsRow">
          {filteredPlayers.length > 0 ? (
            <div>
              <CardsGenerator
                playersData={filteredPlayers}
                sendPlayersUpdated={updatePlayersAfterDelete}
              />
            </div>
          ) : (
            <p>No players found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FileUploader;
