//jshint esversion:6
import React from "react";
import Square from "./Square";
import {arraysIncludeArray,flippingArrays,checkEqualArray} from "./GeneralAlgorithms";


function BoardWhiteSide (props) {
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
let boardForDisplay=cellsColourIndex;

  function renderRows(row,rowNum){
    let cellColour;
    let chessPiece;
    return (
      <div>
      {row.map((colourIndex,colNum)=>{
        if (colourIndex===0){
          cellColour="white"
        } else {cellColour="green"}
        chessPiece=props.piecesArrangement[rowNum][colNum]
        if (arraysIncludeArray([props.moveMade.moveFrom,props.moveMade.moveTo],[rowNum,colNum])){
          cellColour="red"
        }
        if (arraysIncludeArray(props.validMoves,[rowNum,colNum])){
          cellColour="lightGreen";
        }
        if (checkEqualArray(props.clickedCell,[rowNum,colNum])){
          cellColour="yellow"
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
      {boardForDisplay.map((row,rowIndex)=>{
        let rowNum=boardForDisplay.length-1-rowIndex
        return (
          renderRows(row,rowNum)
        )
      }
    )}
</div>
    );
}


export default BoardWhiteSide;
