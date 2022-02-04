import React, {Component} from 'react';
import { useOutletContext } from 'react-router-dom';
import Board from './Board';
import Boats from './Boats';

class Game extends Component{
    constructor(props){
        super(props);
        this.state={
            player1:{
              name:"Player1",
              boardBoats:Array(this.props.size**2).fill(null),
              boardStrike:Array(this.props.size**2).fill(null),
              boats:this.props.boats.map(a =>({...a}))
            },
            player2:{
              name:"Player2",
              boardBoats:Array(this.props.size**2).fill(null),
              boardStrike:Array(this.props.size**2).fill(null),
              boats:this.props.boats.map(a =>({...a}))
            },
            player1Turn : true,
            placementPhase: true,
            selectedBoat:null,
            indexSelectedBoat:null,
            coordSelectedBoat:[],
            message:""
        }
    }

    handleClick(i){
        const isPlayer1 = this.state.player1Turn; 
        const player = (isPlayer1)?this.state.player1 : this.state.player2;
    
        const isPlacementPhase = this.state.placementPhase;
        const board = (isPlacementPhase)?player.boardBoats : player.boardStrike;
    
        if((this.calculateWinner(board) && !isPlacementPhase)){
          return;
        }
    
        if(board[i]!=null){
          this.setState({
            message:"Emplacement occupé!"
          });
          return;
        }
        
        let message="";
        
        if(isPlacementPhase){ /*Phase de placement*/
          const selectedBoat = this.state.selectedBoat;
          if(selectedBoat) { /*Bateau sélectionné*/
            // console.log("il y a un bateau sélectionné");
            let coords = this.state.coordSelectedBoat.slice();
            if(this.isAligned(coords,i) && this.isAdjacent(coords,i)){ /*La case est alignée avec le reste*/
              // console.log("aligné et adjacent");
              coords.push(i);
              board[i]=selectedBoat.name[0];
              if(coords.length===selectedBoat.size){ /*On vient de placer la dernière case du bateau*/
                // console.log("fin du bateau");
                message+="Bateau placé"
                selectedBoat.placed=true;
                coords=[];
                player.boats[this.state.indexSelectedBoat] = selectedBoat;
                this.setState({
                  selectedBoat:null,
                  indexSelectedBoat:null
                })
                console.log("player.boats : " +player.boats);
                let allBoatsPlaced = true;
                for(let i = 0;i<player.boats.length;i++){
                  console.log("playerBoats[i] : " + player.boats[i]);
                  if(!player.boats[i].placed){
                    allBoatsPlaced = false;
                  }
                }
                if(allBoatsPlaced){
                  console.log("tous les bateaux sont placés");
                  this.setState({
                    player1Turn:!isPlayer1,
                  })
                  if(!isPlayer1){
                    this.setState({
                      placementPhase:!isPlacementPhase,
                    })
                  }
                }
              }
              player.boardBoats = board;
              this.setState(
                {
                  coordSelectedBoat:coords,
                }
              )
            }
            else {
              message+="Le point n'est pas aligné ou pas adjacent";
            }
          }else { /*Pas de bateau sélectionné*/
            message+="Il faut sélectionner un bateau";
          }
        }else { /*Phase d'attaque*/
          const opponent = (isPlayer1)?this.state.player2 : this.state.player1;
          if(opponent.boardBoats[i]!=null){
            board[i] = 'T';
            message +=" TOUCHÉ! ";
          }else{
            board[i] = 'O'
            message +=" PLOUF! ";
          }
          player.boardStrike = board;
          if(this.calculateWinner(board)){
            message += player.name + " A GAGNÉ !!!";
          }else{
            this.setState({
              player1Turn:!isPlayer1
            })
          }
        }
        
        if(isPlayer1){
          this.setState({
            player1 : player,
            message:message,
          });
        }else{
          this.setState({
            player2 : player,
            message:message,
          });
        }
        
        console.log(message);
      }
    
      isAligned(array,i){
        const coords = this.getCoords(i);
        // console.log("aligné? array : "+ array + " ; i : " + i);
        // console.log("coords(i) : " + coords);
        if(array.length===0){
          // console.log("aligné car vide");
          return true;
        }else if(array.length===1){
          const coords1=this.getCoords(array[0]);
          // console.log("taille 1, coords : "+ coords1 );
          if(coords1[0] === coords[0] || coords1[1]===coords[1]){
            // console.log("aligné");
            return true;
          }
        }else if(array.length>=2){
          const coords1=this.getCoords(array[0]);
          const coords2=this.getCoords(array[array.length-1]);
          if( (coords1[0] === coords[0] || coords1[1]===coords[1]) && 
          (coords2[0] === coords[0] || coords2[1]===coords[1]) ){
            // console.log("aligné");
            return true;
          }
        }
        return false;
      }
    
      isAdjacent(array,i){
        // console.log("adjacent? array : "+ array + " ; i : " + i);
        if(array.length===0){
          // console.log("adjacent car vide");
          return true;
        }
        for(let j = 0 ; j<array.length;j++){
          if((array[j] === i+1) || (array[j]===i-1) || (array[j]===i+this.props.size) || (array[j]===i-this.props.size) ){
            // console.log("adjacent");
            return true;
          }
        }
        // console.log("pas adjacent");
        return false;
      }
    
      getCoords(i){
        var result = [Math.floor(i/this.props.size),i%this.props.size];
        return result;
      }
    
      selectBoat(i){
        const isPlayer1 = this.state.player1Turn;
        const player = (isPlayer1)?this.state.player1 : this.state.player2;
        
        const boats = player.boats.slice();
        const board = player.boardBoats.slice();
        const selectedBoat = this.state.selectedBoat;
        const coords = this.state.coordSelectedBoat.slice();
        if(selectedBoat && coords.length>0){
          for(let i=0;i<coords.length;i++){
            board[coords[i]] = null;
          }
        }
        player.boardBoats = board;
        if(isPlayer1){
          this.setState({
            player1:player,
            coordSelectedBoat:[],
            selectedBoat:boats[i],
            indexSelectedBoat:i
          })
        }else{
          this.setState({
            player2:player,
            coordSelectedBoat:[],
            selectedBoat:boats[i],
            indexSelectedBoat:i
          })
        }
      }

      calculateWinner(boardStrike){
        let countStrike = 0;
        for(let i = 0; i<boardStrike.length;i++){
        if(boardStrike[i]==='T')
            countStrike++;
        }
        if(countStrike === this.props.boats.map(x => x.size).reduce((a,b) => a+b)){
        return true;
        }
        return false;
    }

      render(){
        const selectedPlayer = (this.state.player1Turn)? this.state.player1 : this.state.player2;
        //console.log("selected player : " + selectedPlayer);
        const board=(this.state.placementPhase)? selectedPlayer.boardBoats : selectedPlayer.boardStrike;
        // console.log("selected player board : " + selectedPlayer.boardBoats);
        // console.log("board : " + board );
        const message = this.state.message;
        const phase = this.state.placementPhase? "Phase de placement " : " Phase d'attaque ";
        const instruction= (this.state.selectedBoat)?
        <div >{"Placez ce bateau "} <br />
          <button onClick={()=>this.selectBoat(this.state.indexSelectedBoat)}>Réinitialiser bateau
          </button>
        </div> : this.state.placementPhase?
        <div >Sélectionner un bateau</div> : 
        <div >Attaquez une case</div>;
        return (
          <div className="App">
            <h2>
              Plateau
            </h2>
            <div className='game'>
              <div className='game-board'>
                <Board
                  squares={board}
                  onClick={(i)=>this.handleClick(i)}
                />
              </div>
              <div className='info'>
                <Boats
                  boatList={selectedPlayer.boats}
                  selectedBoat={this.state.selectedBoat}
                  onClick={(i) =>this.selectBoat(i)}/>
                  {phase} : {selectedPlayer.name}
                  {instruction}
              </div>
            </div>
            {message}
          </div>
        )
      }
    }
    



export default Game;