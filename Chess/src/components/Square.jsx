//jshint esversion:6


function Square(props) {
  let selectedPiece=props.piece;
  let cellColour=props.colour;
  return (
    <button className={"square "+cellColour+" "+selectedPiece} onClick={props.onClick}>

    </button>
  );
}

export default Square
