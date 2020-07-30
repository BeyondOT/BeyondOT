
import * as Move from './movements.js';
import * as Utils from './utils.js';

export var gameOver;
export function StartGame(){
	var selection = {player:'', piece:'', row:'', column:'',empty:''};
	var clickedCell = {player:'', piece:'', row:'', column:'',empty:''};

	let playerTurn = 'whitePlayer';
	var possibleList = [];
	var castlePossibilities = {};
	var kingMoved = {wKingMoved:false, bKingMoved: false};
	gameOver = false;
	
	$('#playerTurn').html("The player's turn is :" + playerTurn);

	// Genrating the pieces for the board:
	Utils.boardIni();

	// Getting the selection's attributes
	$("[empty]").on("click", function(){
		clickedCell.player = $(this).attr('player');
		clickedCell.empty = $(this).attr('empty');
		clickedCell.piece = $(this).attr('piece');
		clickedCell.row = $(this).attr('row');
		clickedCell.column = $(this).attr('column');

		// If the cell clicked is a pawn store its info selection
		if($(this).attr('empty') == 'false' && clickedCell.player == playerTurn){
			if(selection.row == clickedCell.row && selection.column == clickedCell.column){
				console.log("C'est la même case");
			}else{
				selection = {player:clickedCell.player, piece:clickedCell.piece, row:clickedCell.row, column:clickedCell.column,empty:clickedCell.empty};

				// Making the selected pawn go green
				Utils.resetColor();
				$(this).css("background-color", "green");
				possibleList = Move.casesPossible(selection);
				Utils.colorList(possibleList, 'red');
				console.log(possibleList);
			}
		}
		// If piece is already selected and the piece can move to the clicked cell then move piece
		else if(selection.player == playerTurn){
			if(Move.canMove(clickedCell, possibleList)){
				clickedCell.row = parseInt(clickedCell.row);
				clickedCell.column = parseInt(clickedCell.column);
				Utils.resetColor();
				if(selection.piece == 'roi'){
					castlePossibilities = Utils.kingCanCastle(selection, clickedCell.row, kingMoved);
					Move.movePiece(selection, clickedCell);
					Move.kingCastle(selection, clickedCell, castlePossibilities);
					if(selection.player == 'whitePlayer'){
						kingMoved.wKingMoved = true;
					}else{
						kingMoved.bKingMoved = true;
					}
				}
				else{
					Move.movePiece(selection, clickedCell);
				}
				// reset the selection
				selection = {piece:'', player:'', row:'', column:''};
				var list = [];
				
				/*$("[piece][player ='"+playerTurn+"']").each(function(){
					list = list.concat(Move.casesPossible($(this)));
					Utils.colorList(list, 'blue');
				})*/
				// change the playerTurn
				if(clickedCell.piece == 'roi'){
					gameOver = true;
					$("[empty]").unbind();
					$('.grid').css('opacity', '50%');
					$('.infos').html("<span>The player that won is :<span>" + playerTurn);
					console.log('Game Over');
				}
				
				if(playerTurn == 'blackPlayer'){ 
					playerTurn = 'whitePlayer';
				}
				else
					playerTurn = 'blackPlayer';	

				console.log(gameOver);
			}
		}	
		$('#playerTurn').html("The player's turn is :" + playerTurn);
	})
}













