//jshint esversion:6
import React, { useState } from "react";
import Board from "./Board";

import {selectedPieceMoves} from "./Algorithms";
import {allAttackingRanges} from "./Algorithms";

function Game (){

  const [piecesArrangement,setArrangement]=useState([
                        ["WR","WN","WB","WQ","WK","WB","WN","WR"],
                        ["WP","WP","WP","WP","WP","WP","WP","WP"],
                        [" "," "," "," "," "," "," "," "],
                        [" "," "," "," "," "," "," "," "],
                        [" "," "," "," "," "," "," "," "],
                        [" "," "," "," "," "," "," "," "],
                        ["BP","BP","BP","BP","BP","BP","BP","BP"],
                        ["BR","BN","BB","BQ","BK","BB","BN","BR"]
                      ]);
    const [pieceSelected, setPiece]=useState({
      coord:{row:null, col:null},
      pieceType:null,
    });
    const [isSelected,setStatus]=useState(false);
    const [possibleMoves,setMoves]=useState([]);
    function handleClick(clickedCellCoord){
      let [rowCoord,colCoord]=clickedCellCoord;
      let selectedPiece=piecesArrangement[rowCoord][colCoord];
      if (selectedPiece!==" " && isSelected===false){
        setPiece({
          coord:{row:rowCoord, col:colCoord},
          pieceType:selectedPiece,
        });
        setStatus(true);
      }

      if (isSelected===true){
        const moveFrom=[pieceSelected.coord.row,pieceSelected.coord.col];
        const moveTo=clickedCellCoord;
        const pieceMoved=pieceSelected.pieceType;
        piecesArrangement[moveFrom[0]][moveFrom[1]]=" ";
        piecesArrangement[moveTo[0]][moveTo[1]]=pieceMoved;
        setStatus(false);
      }

      setMoves(selectedPieceMoves(clickedCellCoord,piecesArrangement));

    }


    return (
      <div className="game">

          <Board
          piecesArrangement={piecesArrangement}
          onClick={([rowNum,colNum])=>handleClick([rowNum,colNum])}
          validMoves={possibleMoves}
          />

        <div>

        </div>
      </div>
    );

}

export default Game;
