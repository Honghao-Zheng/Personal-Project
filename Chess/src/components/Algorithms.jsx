//jshint esversion:6
import {arraysIncludeArray} from "./GeneralAlgorithms";
import {checkEqualArray} from "./GeneralAlgorithms";


let castlingIndicators={
  whiteKingSide:true,
  whiteQueenSide:true,
  blackKingSide:true,
  blackQueenSide:true
};

let whoWins=null;

function ruleOfKnight(pieceCoord,board){
  let [rowCoord,colCoord]=pieceCoord;
  let collectionOfMoves=[];
  var rowIndex;
  var colIndex;
  for (rowIndex=-2; rowIndex<=2;rowIndex++){
    for (colIndex=-2; colIndex<=2;colIndex++){
      if (rowIndex!=0 && colIndex !=0){
      if (Math.abs(rowIndex) != Math.abs(colIndex)){
        if (rowCoord+rowIndex>=0 &&
            rowCoord+rowIndex<=7 &&
           colCoord+colIndex>=0 &&
           colCoord+colIndex<=7 ){
          collectionOfMoves.push([rowCoord+rowIndex,colCoord+colIndex]);
        }
      }
    }
}
  }
  return (collectionOfMoves);
}


function ruleOfRook(pieceCoord,board){
  let colletionOfMoves=[];
  let [rowCoord,colCoord]=pieceCoord;
  let [rowCoordLeft,colCoordBot]=pieceCoord;
  let [rowCoordRigt,colCoordTop]=pieceCoord;
  while(rowCoordRigt<7){
    rowCoordRigt++;
    let cellOccupation=occupyingColour(rowCoordRigt,colCoord,board);
    if (cellOccupation !=" "){
      colletionOfMoves.push([rowCoordRigt,colCoord]);
      break;
    } else {
      colletionOfMoves.push([rowCoordRigt,colCoord]);
    }
  }
  while(rowCoordLeft>0){
    rowCoordLeft--;
    let cellOccupation=occupyingColour(rowCoordLeft,colCoord,board);
    if (cellOccupation !=" "){
      colletionOfMoves.push([rowCoordLeft,colCoord]);
      break;
    } else {
      colletionOfMoves.push([rowCoordLeft,colCoord]);
    }
  }
  while(colCoordTop<7){
    colCoordTop++;
    let cellOccupation=occupyingColour(rowCoord,colCoordTop,board);
    if (cellOccupation !=" "){
      colletionOfMoves.push([rowCoord,colCoordTop]);
      break;
    }else{
      colletionOfMoves.push([rowCoord,colCoordTop]);
    }
  }
  while(colCoordBot>0){
    colCoordBot--;
    let cellOccupation=occupyingColour(rowCoord,colCoordBot,board);
    if (cellOccupation !=" "){
      colletionOfMoves.push([rowCoord,colCoordBot]);
      break;
    } else{
      colletionOfMoves.push([rowCoord,colCoordBot]);
    }
  }
  return colletionOfMoves;
}

function ruleOfBishop(pieceCoord,board){
  let colletionOfMoves=[];
  let [rowCoordLeft,colCoordBot]=pieceCoord;
  let [rowCoordRigt,colCoordTop]=pieceCoord;
  while(rowCoordRigt<7 && colCoordTop<7){
    rowCoordRigt++;
    colCoordTop++;
    let cellOccupation=occupyingColour(rowCoordRigt,colCoordTop,board);
    if (cellOccupation !=" "){
      colletionOfMoves.push([rowCoordRigt,colCoordTop]);
      break;
    } else {
      colletionOfMoves.push([rowCoordRigt,colCoordTop]);
    }
  }
  [rowCoordLeft,colCoordTop]=pieceCoord;
  while(rowCoordLeft>0 && colCoordTop<7){
    rowCoordLeft--;
    colCoordTop++;
    let cellOccupation=occupyingColour(rowCoordLeft,colCoordTop,board);
    if (cellOccupation !=" "){
      colletionOfMoves.push([rowCoordLeft,colCoordTop]);
      break;
    } else {
      colletionOfMoves.push([rowCoordLeft,colCoordTop]);
    }
  }
  [rowCoordLeft,colCoordBot]=pieceCoord;
  while(rowCoordLeft>0 && colCoordBot>0){
    colCoordBot--;
    rowCoordLeft--;
    let cellOccupation=occupyingColour(rowCoordLeft,colCoordBot,board);
    if (cellOccupation !=" "){
      colletionOfMoves.push([rowCoordLeft,colCoordBot]);
      break;
    }else{
      colletionOfMoves.push([rowCoordLeft,colCoordBot]);
    }
  }
  [rowCoordRigt,colCoordBot]=pieceCoord;
  while(rowCoordRigt<7 && colCoordBot>0){
    colCoordBot--;
    rowCoordRigt++;
    let cellOccupation=occupyingColour(rowCoordRigt,colCoordBot,board);
    if (cellOccupation !=" "){
      colletionOfMoves.push([rowCoordRigt,colCoordBot]);
      break;
    } else{
      colletionOfMoves.push([rowCoordRigt,colCoordBot]);
    }
  }
  return colletionOfMoves;
}

function ruleOfQueen(pieceCoord,board){
  let diagonalMoves=ruleOfBishop(pieceCoord,board);
  let straightMoves=ruleOfRook(pieceCoord,board);
  let colletionOfMoves=diagonalMoves.concat(straightMoves);
  return colletionOfMoves;
}


function ruleOfKing(pieceCoord,board){
  let colletionOfMoves=[];
  let  [rowCoord,colCoord]=pieceCoord;
  let rowIndex;
  let colIndex;
  for (rowIndex=-1;rowIndex<2;rowIndex++){
    for (colIndex=-1;colIndex<2;colIndex++){
      if (rowIndex !==0 || colIndex !==0){
        if (
          rowCoord+rowIndex>=0 &&
          rowCoord+rowIndex<=7 &&
          colCoord+colIndex>=0 &&
          colCoord+colIndex <=7
        ){
          colletionOfMoves.push([rowCoord+rowIndex,colCoord+colIndex]);
        }
      }
    }
  }
  return colletionOfMoves;
}

function pawnAttackingRange(pieceCoord,board){
  let attackingRange=[];
  let [rowCoord,colCoord]=pieceCoord;
  let pieceColour=occupyingColour(rowCoord,colCoord,board);
  if (pieceColour=="W"){
    if (rowCoord<7){
      if (colCoord>0){
        attackingRange.push([rowCoord+1,colCoord-1]);
      }
      if (colCoord<7){
        attackingRange.push([rowCoord+1,colCoord+1]);
      }
    }
  }
  if (pieceColour=="B"){
    if (rowCoord>0){
      if (colCoord>0){
        attackingRange.push([rowCoord-1,colCoord-1]);
      }
      if (colCoord<7){
        attackingRange.push([rowCoord-1,colCoord+1]);
      }
    }
  }
  return attackingRange;
}

function selectedPieceAura(pieceCoord,board){
  let [rowCoord,colCoord]=pieceCoord;
  let attackRange=[];
  let pieceType=occupyingPiece(rowCoord,colCoord,board);

  if (pieceType==="N"){
    attackRange=ruleOfKnight(pieceCoord,board);
  }
  if (pieceType==="R"){
    attackRange=ruleOfRook(pieceCoord,board);
  }
  if (pieceType==="B"){
    attackRange=ruleOfBishop(pieceCoord,board);
  }
  if (pieceType==="P"){
    attackRange=pawnAttackingRange(pieceCoord,board);
  }
  if (pieceType==="K"){
    attackRange=ruleOfKing(pieceCoord,board);
  }
  if (pieceType==="Q"){
    attackRange=ruleOfQueen(pieceCoord,board);
  }

  return attackRange;
}

function allAttackingRanges(selectedColour,board){
  let attackingRange=[];
  let rowCoord;
  let colCoord;
  for (rowCoord=0;rowCoord<8;rowCoord++){
  for (colCoord=0;colCoord<8;colCoord++){
    if (occupyingColour(rowCoord,colCoord,board)==selectedColour){
      let range=selectedPieceAura([rowCoord,colCoord],board);
      if (range.length !==0){
        range.forEach(
          cellCoord => {
          attackingRange.push(cellCoord);
        }
        );
      }
    }
  }
}
return attackingRange;
}



function filterActualMoves(selectedColour,attackingRange,board){
  let legalMoves=[];
  let pieceColour;
  attackingRange.forEach(cellCoord => {
    pieceColour=occupyingColour(cellCoord[0],cellCoord[1],board);
    if (pieceColour !==selectedColour){
      legalMoves.push(cellCoord);
    }
  }
);
return legalMoves;
}


function movesOfBishop(pieceCoord,board){
  let colletionOfMoves=ruleOfBishop(pieceCoord,board);
  let selectedColour=occupyingColour(pieceCoord[0],pieceCoord[1],board);
  return (filterActualMoves(selectedColour,colletionOfMoves,board));
}

function movesOfRook(pieceCoord,board){
  let colletionOfMoves=ruleOfRook(pieceCoord,board);
  let selectedColour=occupyingColour(pieceCoord[0],pieceCoord[1],board);
  return (filterActualMoves(selectedColour,colletionOfMoves,board));
}

function movesOfKnight(pieceCoord,board){
  let colletionOfMoves=ruleOfKnight(pieceCoord,board);
  let selectedColour=occupyingColour(pieceCoord[0],pieceCoord[1],board);
  return (filterActualMoves(selectedColour,colletionOfMoves,board));
}

function movesOfQueen(pieceCoord,board){
  let colletionOfMoves=ruleOfQueen(pieceCoord,board);
  let selectedColour=occupyingColour(pieceCoord[0],pieceCoord[1],board);
  return (filterActualMoves(selectedColour,colletionOfMoves,board));
}


function movesOfPawn(pieceCoord,board){
  let [rowCoord,colCoord]=pieceCoord;
  let selectedColour=occupyingColour(rowCoord,colCoord,board);
  let collectionOfMoves=[];
  let attackRange=pawnAttackingRange(pieceCoord,board);
  let pieceColour;
  attackRange.forEach(cellCoord=>{
    pieceColour=occupyingColour(cellCoord[0],cellCoord[1],board);
    if (pieceColour==oppositeColour(selectedColour)){
      collectionOfMoves.push(cellCoord);
    }
  });
  if (selectedColour=="W"){
    if(rowCoord==1){
      if (board[rowCoord+1][colCoord]==" " &&
          board[rowCoord+2][colCoord]==" "){
        collectionOfMoves.push([rowCoord+2,colCoord]);
      }
    }
    if(rowCoord<7){
      if (board[rowCoord+1][colCoord]==" "){
        collectionOfMoves.push([rowCoord+1,colCoord]);
      }
    }
  }
    if (selectedColour=="B"){
      if(rowCoord==6){
        if (board[rowCoord-1][colCoord]==" " &&
            board[rowCoord-2][colCoord]==" "){
          collectionOfMoves.push([rowCoord-2,colCoord]);
        }
      }
      if(rowCoord>0){
        if (board[rowCoord-1][colCoord]==" "){
          collectionOfMoves.push([rowCoord-1,colCoord]);
          }
        }
    }
    return collectionOfMoves;
  }


function kingSideCastlingMoves(kingCoord,cellsUnderAttacks,board){
  let [rowCoord,colCoord]=kingCoord;
  if (board[rowCoord][colCoord+1]==" " &&
      board[rowCoord][colCoord+2]==" " ){
    if (!arraysIncludeArray(cellsUnderAttacks,[rowCoord,colCoord])){
      if (!arraysIncludeArray(cellsUnderAttacks,[rowCoord,colCoord+1])){
        if (!arraysIncludeArray(cellsUnderAttacks,[rowCoord,colCoord+2])){
          return [rowCoord,colCoord+2];
        }
      }
    }
  }
}

function queenSideCastlingMoves(kingCoord,cellsUnderAttacks,board){
  let [rowCoord,colCoord]=kingCoord;
  if (board[rowCoord][colCoord-1]==" " &&
      board[rowCoord][colCoord-2]==" " &&
      board[rowCoord][colCoord-3]==" " ){
    if (!arraysIncludeArray(cellsUnderAttacks,[rowCoord,colCoord])){
      if (!arraysIncludeArray(cellsUnderAttacks,[rowCoord,colCoord-1])){
        if (!arraysIncludeArray(cellsUnderAttacks,[rowCoord,colCoord-2])){
          return [rowCoord,colCoord-2];
        }
      }
    }
  }
}

function castlingMoves(kingCoord,kingColour,cellsUnderAttacks,board){
  let legalMove=[];
  let move;
  if (kingColour=="W"){
    if (castlingIndicators.whiteKingSide){
      move=kingSideCastlingMoves(kingCoord,cellsUnderAttacks,board);
      if (move){
      legalMove.push(move);
    }}
    if (castlingIndicators.whiteQueenSide){
      move=queenSideCastlingMoves(kingCoord,cellsUnderAttacks,board);
      if (move){
      legalMove.push(move);
    }}
  }
  if (kingColour=="B"){
    if (castlingIndicators.blackKingSide){
      move=kingSideCastlingMoves(kingCoord,cellsUnderAttacks,board);
      if (move){
      legalMove.push(move);
    }}
    if (castlingIndicators.blackQueenSide){
      move=queenSideCastlingMoves(kingCoord,cellsUnderAttacks,board);
      if (move){
      legalMove.push(move);
    }}
  }
  return legalMove;
}


function changeCastlingIndicators(piecesArrangement){
  if (piecesArrangement[0][4] !=="WK"){
    castlingIndicators.whiteKingSide=false;
    castlingIndicators.whiteQueenSide=false;
  }
  if (piecesArrangement[0][7] !=="WR"){
    castlingIndicators.whiteKingSide=false;
  }
  if (piecesArrangement[0][0] !=="WR"){
    castlingIndicators.whiteQueenSide=false;
  }
  if (piecesArrangement[7][4] !=="BK"){
    castlingIndicators.blackKingSide=false;
    castlingIndicators.blackQueenSide=false;
  }
  if (piecesArrangement[7][7] !=="BR"){
    castlingIndicators.blackKingSide=false;
  }
  if (piecesArrangement[7][0] !=="BR"){
    castlingIndicators.blackQueenSide=false;
  }
}

function movesOfKing(kingCoord,board){
  let [rowCoord,colCoord]=kingCoord;
  let collectionOfMoves=ruleOfKing(kingCoord,board);
  let legalMove=[];
  let kingColour=occupyingColour(rowCoord,colCoord,board);
  let enemyColour=oppositeColour(kingColour);
  let forbiddenMoves=allAttackingRanges(enemyColour,board);
  collectionOfMoves.forEach(move=>{
    let occupiedPieceColour=occupyingColour(move[0],move[1],board);
    if (occupiedPieceColour !==kingColour){
      if (!arraysIncludeArray(forbiddenMoves,move)){
        legalMove.push(move);
      }
    }
  });
  let castlingKingMoves=castlingMoves(kingCoord,kingColour,forbiddenMoves,board);
  if (castlingKingMoves.length !==0){
    castlingKingMoves.forEach(move=>{
      legalMove.push(move);
    });
  }
return legalMove;
}

function selectedPieceMoves(pieceCoord,board){
  let selectedPieceType=occupyingPiece(pieceCoord[0],pieceCoord[1],board);
  let legalMoves=[];
  if (selectedPieceType=="N"){
    legalMoves=movesOfKnight(pieceCoord,board);
  }
  if (selectedPieceType=="R"){
    legalMoves=movesOfRook(pieceCoord,board);
  }
  if (selectedPieceType=="B"){
    legalMoves=movesOfBishop(pieceCoord,board);
  }
  if (selectedPieceType=="Q"){
    legalMoves=movesOfQueen(pieceCoord,board);
  }
  if (selectedPieceType=="P"){
    legalMoves=movesOfPawn(pieceCoord,board);
  }
  if (selectedPieceType=="K"){
    legalMoves=movesOfKing(pieceCoord,board);
  }
  return (legalMoves);
}

function allPossibleMoves(selectedColour,board){
  let allMoves=[];
  let rowCoord;
  let colCoord;
  for (rowCoord=0;rowCoord<8;rowCoord++){
  for (colCoord=0;colCoord<8;colCoord++){
    if (occupyingColour(rowCoord,colCoord,board)==selectedColour){
      let moves=selectedPieceMoves([rowCoord,colCoord],board);
      if (moves.length !==0){
        moves.forEach(
          cellCoord => {
          allMoves.push(cellCoord);
        }
        );
      }
    }
  }
}
return allMoves;
}

function makeCastlingRookMove(pieceMoved,moveFrom,moveTo,board){
  if (pieceMoved==="WK"){
    let wKingInitPosi=[0,4];
    let kingSideCastling=[0,6];
    let queenSideCastling=[0,2];
    if (checkEqualArray(moveFrom,wKingInitPosi)){
      if (checkEqualArray(moveTo,kingSideCastling)){
        board[0][5]="WR";
        board[0][7]=" ";
      }
      if (checkEqualArray(moveTo,queenSideCastling)){
        board[0][3]="WR";
        board[0][0]=" ";
      }
    }
  }
  if (pieceMoved==="BK"){
    let bKingInitPosi=[7,4];
    let kingSideCastling=[7,6];
    let queenSideCastling=[7,2];
    if (checkEqualArray(moveFrom,bKingInitPosi)){
      if (checkEqualArray(moveTo,kingSideCastling)){
        board[7][5]="BR";
        board[7][7]=" ";
      }
      if (checkEqualArray(moveTo,queenSideCastling)){
        board[7][3]="BR";
        board[7][0]=" ";
      }
    }
  }
}

function pawnBecomeQueen(pieceMoved,moveTo,board){
  if (pieceMoved==="WP"){
    let [pawnRowCoord,pawnColCoord]=moveTo;
    if (pawnRowCoord==7){
      board[pawnRowCoord][pawnColCoord]="WQ";
    }
  } else if (pieceMoved==="BP") {
    let [pawnRowCoord,pawnColCoord]=moveTo;
    if (pawnRowCoord==0){
      board[pawnRowCoord][pawnColCoord]="BQ";
  }
}
}

function makingMove(moveFrom,moveTo,pieceMoved,board){
  board[moveFrom[0]][moveFrom[1]]=" ";
  board[moveTo[0]][moveTo[1]]=pieceMoved;
  makeCastlingRookMove(pieceMoved,moveFrom,moveTo,board);
  pawnBecomeQueen(pieceMoved,moveTo,board);
}

function isChecked(friendlyColour,board){
  let enemyColour=oppositeColour(friendlyColour);
  let dangerZone=allPossibleMoves(enemyColour,board);
  let checked=false;
  dangerZone.forEach(cellUnderAttack=>{
    if (board[cellUnderAttack[0]][cellUnderAttack[1]]==friendlyColour+"K"){
      checked=true;
    }
  });
  if (checked){
    return true;
  } else {
    return false;
  }
}


function isCheckmated(enemyColour,board){
    let checkmated=true;
    let rowCoord;
    let colCoord;
    for (rowCoord=0;rowCoord<8;rowCoord++){
    for (colCoord=0;colCoord<8;colCoord++){
      if (occupyingColour(rowCoord,colCoord,board)==enemyColour){
        let responsesToCheck=selectedPieceMoves([rowCoord,colCoord],board);
        if (responsesToCheck.length !==0){
          responsesToCheck.forEach(moveTo=>{
            let testingBoard=board.map(row=>{
                  return (row.slice());
                });
                let moveFrom=[rowCoord,colCoord];
                let pieceMoved=testingBoard[rowCoord][colCoord];
                makingMove(moveFrom,moveTo,pieceMoved,testingBoard);
                if (!isChecked(enemyColour,testingBoard)){
                  checkmated=false;
                }
          });
        }
      }
      if (!checkmated){
        break;
      }
      if (!checkmated){
        break;
      }
    }
}
return checkmated;
}

function makeLegalMove(possibleMoves,moveFrom,moveTo,pieceMoved,board){
  let isMoveMade=false;
  let friendlyColour=pieceMoved[0];
  let enemyColour=oppositeColour(friendlyColour);
  if (arraysIncludeArray(possibleMoves,moveTo)){
  makingMove(moveFrom,moveTo,pieceMoved,board);
  isMoveMade=true;
  if (isChecked(friendlyColour,board)){
    makingMove(moveTo,moveFrom,pieceMoved,board);
    isMoveMade=false;
    alert("Illegal move, King under check");
  }
else if(isCheckmated(enemyColour,board)){
    if (friendlyColour=="W"){
      whoWins="White Wins";
    } else {
      whoWins="Black Wins";
    }
  }
}
if (isMoveMade){
  changeCastlingIndicators(board);
}
return isMoveMade;
}


function oppositeColour(playerColour){
  if (playerColour==="W"){
    return ("B");
  } else if (playerColour==="B") {
    return ("W");
  } else {
    return (null);
  }
}

function occupyingColour(rowCoord,colCoord,board){
  const inThatCell=board[rowCoord][colCoord];
  const pieceColour=inThatCell[0];
  return (pieceColour);
}

function occupyingPiece(rowCoord,colCoord,board){
  const inThatCell=board[rowCoord][colCoord];
  const pieceType=inThatCell[1];
  return (pieceType);
}

export {whoWins};
export {changeCastlingIndicators};
export {makeLegalMove};
export {selectedPieceMoves};
