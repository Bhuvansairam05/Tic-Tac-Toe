import './App.css'
import { useState } from 'react';
function App() {
  const [board,setBoard] = useState(
    Array(3).fill(null).map(()=>Array(3).fill(""))
  );
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const[winner, setWinner] = useState("");
  let flag = false;
  function checkRow(board, currentPlayer){
    for(let i=0;i<3;i++){
      if(board[i][0]==currentPlayer && board[i][1]==currentPlayer && board[i][2]==currentPlayer){
        return true;
      }
    }
    return false;
  }
  function checkCol(board, currentPlayer){
    for(let j=0;j<3;j++){
      if(board[0][j]==currentPlayer && board[1][j]==currentPlayer && board[2][j]==currentPlayer){
        return true;
      }
    }
    return false;
  }
  function checkDiagonal(board, currentPlayer){
    if(board[0][0]==currentPlayer && board[1][1]==currentPlayer && board[2][2]==currentPlayer){
      return true;
    }
    return false;
  }
  function checkReverseDiagonal(board, currentPlayer){
    if(board[0][2]==currentPlayer && board[1][1]==currentPlayer && board[2][0]==currentPlayer){
      return true;
    }
    return false;
  }
  function checkNotEmpty(board){
    for(let i=0;i<3;i++){
      for(let j=0;j<3;j++){
        if(board[i][j]==""){
          return false;
        }
      }
    }
    return true;
  }
  function handleClick(row,col){
    if(winner!="") {
      alert("Game already completed");
      return;
    }
    if(board[row][col]!=""){
      alert("This block is already occupied by "+board[row][col]);
      return;
    }
    const newBoard = [...board.map(r=>[ ...r])];
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);
    if(checkRow(newBoard, currentPlayer)||
    checkCol(newBoard, currentPlayer)||
    checkDiagonal(newBoard, currentPlayer)||
    checkReverseDiagonal(newBoard, currentPlayer)){
      flag = true;
      setWinner(currentPlayer=="X"?"X":"O");
    }
    if(checkNotEmpty(newBoard)){
      if(flag){
        if(confirm("Game ended with "+currentPlayer+" as winner")){
          reStart();
          flag = false;
          return;
        }
      }
      if(confirm("Game ended with tie do you want to restart game")){
        reStart();
      }
    }
    setCurrentPlayer(currentPlayer=="X"?"O":"X");
  }
  function reStart(){
    const newBoard = Array(3).fill(null).map(()=>Array(3).fill(""));
    setBoard(newBoard);
    setCurrentPlayer("X");
    setWinner("");
  }
  function Cell({row,col}){
  return(
    <button onClick={()=>{handleClick(row,col)}}>{board[row][col]}</button>
  )
}
  return (
    <body>
    <h1>Tic Tac Toe</h1>
    <table>
      <tbody>
      {board.map((row,rowIndex)=>( 
        <tr key={rowIndex}>
        {row.map((col,colIndex)=>( 
          <td key = {colIndex}><Cell row={rowIndex} col={colIndex}/></td>
      ))}
        </tr>
      ))}
      </tbody>
    </table>
      <h1>Winner: {winner}</h1>
      <button className="restart" onClick={()=>reStart()}>Restart</button>
    </body>
  );
}

export default App;