//jshint esversion:6
import React from "react";
import Square from "./Square";
import {arraysIncludeArray} from "./GeneralAlgorithms";

function Board (props) {
  const cellsColourIndex=[
  [0,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,0],
  [0,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,0],
  [0,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,0],
  [0,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,0],
];






  function renderRows(row,rowNum){
    let cellColour;
    let chessPiece;
    return (
      <div className="board-row">
      {row.map((colourIndex,colNum)=>{
        if (colourIndex===0){
          cellColour="white"
        } else {cellColour="green"}
        chessPiece=props.piecesArrangement[rowNum][colNum]
        if (arraysIncludeArray(props.validMoves,[rowNum,colNum])===true){
          cellColour="lightGreen";
        }
        return (
        <Square
        colour={cellColour}
        piece={chessPiece}
        onClick={()=>props.onClick([rowNum,colNum])}
        />
      );
    })}
      </div>
    )
  }

    return (
      <div>
      {cellsColourIndex.map((row,rowNum)=>{
        return (
          renderRows(row,rowNum)
        )
      }
    )}
</div>
    );
}


export default Board;
