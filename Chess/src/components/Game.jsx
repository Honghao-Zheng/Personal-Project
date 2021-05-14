//jshint esversion:6
import React, { useState } from "react";
import Board from "./Board";
import BoardWhiteSide from "./BoardWhiteSide";
import BoardBlackSide from "./BoardBlackSide";
import {changeCastlingIndicators} from "./Algorithms";
import {makeLegalMove} from "./Algorithms";
import {selectedPieceMoves} from "./Algorithms";
import {arraysIncludeArray} from "./GeneralAlgorithms";
import {whoWins} from "./Algorithms";


let piecesArrangement=[
                      ["WR","WN","WB","WQ","WK","WB","WN","WR"],
                      ["WP","WP","WP","WP","WP","WP","WP","WP"],
                      [" "," "," "," "," "," "," "," "],
                      [" "," "," "," "," "," "," "," "],
                      [" "," "," "," "," "," "," "," "],
                      [" "," "," "," "," "," "," "," "],
                      ["BP","BP","BP","BP","BP","BP","BP","BP"],
                      ["BR","BN","BB","BQ","BK","BB","BN","BR"]
                    ];

function Game (){
    const [gameState,setSate]=useState({
      isWhiteTurn:true,
    });

    const [pieceSelected, setPiece]=useState({
      coord:{row:null, col:null},
      piece:null,
      isSelected:false,
      possibleMoves:[]
    });

    const [pieceMoved,setMoves]=useState({
      moveFrom:[],
      moveTo:[]
    });


    function handleClick(clickedCellCoord){
      let [rowCoord,colCoord]=clickedCellCoord;
      let selectedPiece=piecesArrangement[rowCoord][colCoord];
      let pieceColour=selectedPiece[0];
      let legalMoves=selectedPieceMoves(clickedCellCoord,piecesArrangement);
      let turn=gameState.isWhiteTurn? "W":"B";
      if (whoWins !== null){
        alert("Game over, "+whoWins+" refresh the page to start a new game");
      }
      if (pieceColour == turn && pieceSelected.isSelected===false ){
        setPiece({
          coord:{row:rowCoord, col:colCoord},
          piece:selectedPiece,
          isSelected:true,
          possibleMoves:legalMoves

        });
      }

      if (pieceSelected.isSelected===true){
        let moveFrom=[pieceSelected.coord.row,pieceSelected.coord.col];
        let moveTo=clickedCellCoord;
        let pieceMoved=pieceSelected.piece;
        let isMoved=makeLegalMove(pieceSelected.possibleMoves,moveFrom,moveTo,pieceMoved,piecesArrangement);

        if (isMoved){
          setSate({
            isWhiteTurn: gameState.isWhiteTurn ? false:true
          });
          setMoves({
            moveFrom:moveFrom,
            moveTo:moveTo
          });
        }
        setPiece({
          coord:{row:null, col:null},
          piece:null,
          isSelected:false,
          possibleMoves:[]
        });

      }
    }


    return (
      <div >
      <div className="game row">
      <h3>{gameState.isWhiteTurn?"White's Turn":"Black's Turn"} </h3>
          <Board
          piecesArrangement={piecesArrangement}
          onClick={([rowNum,colNum])=>handleClick([rowNum,colNum])}
          validMoves={pieceSelected.possibleMoves}
          clickedCell={[pieceSelected.coord.row,pieceSelected.coord.col]}
          isWhiteTurn={gameState.isWhiteTurn}
          moveMade={pieceMoved}
          />
          </div>
              <div className="game row">
              <h3> Display for white side </h3>
                  <BoardWhiteSide
                  piecesArrangement={piecesArrangement}
                  onClick={([rowNum,colNum])=>handleClick([rowNum,colNum])}
                  validMoves={pieceSelected.possibleMoves}
                  clickedCell={[pieceSelected.coord.row,pieceSelected.coord.col]}
                  isWhiteTurn={gameState.isWhiteTurn}
                  moveMade={pieceMoved}
                  />
                  </div>
                  <div className="game row">
                  <h3> Display for black side </h3>
                      <BoardBlackSide
                      piecesArrangement={piecesArrangement}
                      onClick={([rowNum,colNum])=>handleClick([rowNum,colNum])}
                      validMoves={pieceSelected.possibleMoves}
                      clickedCell={[pieceSelected.coord.row,pieceSelected.coord.col]}
                      isWhiteTurn={gameState.isWhiteTurn}
                      moveMade={pieceMoved}
                      />
                      </div>
          <div>
             <h1>Game result: {whoWins} </h1>
          </div>
      </div>

    );

}

export default Game;
