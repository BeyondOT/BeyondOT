
import * as Utils from './utils.js';

let width = 90;
var whiteKingMoved = false;
var blackKingMoved = false;

// Function that checks in a straight line
function straightLine(selection, loop){
	var possibleList = [];

	// Top Straight
	for(let i = 1; i < loop; i++){
		if(Utils.isInBoard(selection.row + i, selection.column)){
			if(Utils.cellOf(selection.row + i, selection.column).attr('empty') == 'true'){
			possibleList = possibleList.concat([[selection.row + i, selection.column]]);
			}
			else if(Utils.playerInCell(selection.row + i, selection.column) != selection.player){
				possibleList = possibleList.concat([[selection.row + i, selection.column]]);
				break;
			}
			else{
				break;
			}
		}	
	}
	// Bottom Straight
	for(let i = 1; i < loop; i++){
		if(Utils.isInBoard(selection.row - i, selection.column)){
			if(Utils.cellOf(selection.row - i, selection.column).attr('empty') == 'true'){
			possibleList = possibleList.concat([[selection.row - i, selection.column]]);
			}
			else if(Utils.playerInCell(selection.row - i, selection.column) != selection.player){
				possibleList = possibleList.concat([[selection.row - i, selection.column]]);
				break;
			}
			else{
				break;
			}
		}	
	}
	// Right Straight
	for(let i = 1; i < loop; i++){
		if(Utils.isInBoard(selection.row, selection.column + i)){
			if(Utils.cellOf(selection.row, selection.column + i).attr('empty') == 'true'){
			possibleList = possibleList.concat([[selection.row, selection.column + i]]);
			}
			else if(Utils.playerInCell(selection.row, selection.column + i) != selection.player){
				possibleList = possibleList.concat([[selection.row, selection.column + i]]);
				break;
			}
			else{
				break;
			}
		}	
	}

	//Left Straight
	for(let i = 1; i < loop; i++){
		if(Utils.isInBoard(selection.row, selection.column - i)){
			if(Utils.cellOf(selection.row, selection.column - i).attr('empty') == 'true'){
			possibleList = possibleList.concat([[selection.row, selection.column - i]]);
			}
			else if(Utils.playerInCell(selection.row, selection.column - i) != selection.player){
				possibleList = possibleList.concat([[selection.row, selection.column - i]]);
				break;
			}
			else{
				break;
			}
		}	
	}
	return possibleList;
}

// Function that checks diagonaly
function diagLine(selection, loop){
	var possibleList = [];

	// Top Right
	for(let i = 1; i < loop; i++){
		if(Utils.isInBoard(selection.row + i, selection.column + i)){
			if(Utils.cellOf(selection.row + i, selection.column + i).attr('empty') == 'true'){
			possibleList = possibleList.concat([[selection.row + i, selection.column + i]]);
			}
			else if(Utils.playerInCell(selection.row + i, selection.column + i) != selection.player){
				possibleList = possibleList.concat([[selection.row + i, selection.column + i]]);
				break;
			}
			else{
				break;
			}
		}	
	}

	// Top Left
	for(let i = 1; i < loop; i++){
		if(Utils.isInBoard(selection.row + i, selection.column - i)){
			if(Utils.cellOf(selection.row + i, selection.column - i).attr('empty') == 'true'){
				possibleList = possibleList.concat([[selection.row + i, selection.column - i]]);
			}
			else if(Utils.playerInCell(selection.row + i, selection.column - i) != selection.player){
				possibleList = possibleList.concat([[selection.row + i, selection.column - i]]);
				break;
			}
			else{
				break;
			}
		}	
	}

	// Bottom Right
	for(let i = 1; i < loop; i++){
		if(Utils.isInBoard(selection.row - i, selection.column + i)){
			if(Utils.cellOf(selection.row - i, selection.column + i).attr('empty') == 'true'){
				possibleList = possibleList.concat([[selection.row - i, selection.column + i]]);
			}
			else if(Utils.playerInCell(selection.row - i, selection.column + i) != selection.player){
				possibleList = possibleList.concat([[selection.row - i, selection.column + i]]);
				break;
			}
			else{
				break;
			}
		}	
	}

	// Bottom Left
	for(let i = 1; i < loop; i++){
		if(Utils.isInBoard(selection.row - i, selection.column - i)){
			if(Utils.cellOf(selection.row - i, selection.column - i).attr('empty') == 'true'){
				possibleList = possibleList.concat([[selection.row - i, selection.column - i]]);
			}
			else if(Utils.playerInCell(selection.row - i, selection.column - i) != selection.player){
				possibleList = possibleList.concat([[selection.row - i, selection.column - i]]);
				break;
			}
			else{
				break;
			}
		}	
	}
	return possibleList;
}

// Function that checks if the target cell is in the list of possibilities
export function canMove(clickedCell, possibleList){
	clickedCell.row = parseInt(clickedCell.row);
	clickedCell.column = parseInt(clickedCell.column);
	var targCell = [clickedCell.row, clickedCell.column];

	for(let i = 0; i < possibleList.length; i++){
		if(possibleList[i][0] === targCell[0] && possibleList[i][1] === targCell[1]){
			return true;
		}
	}
}

// Function that moves the selection.piece
export function movePiece(selection, clickedCell){
	if(Utils.cellOf(selection.row, selection.column).hasClass("blackSquare")){
		var bground = $(".blackSquare").css('background-color');
	}else{
		var bground = $(".whiteSquare").css('background-color');
	}
	if(Utils.cellOf(clickedCell.row, clickedCell.column).hasClass("blackSquare")){
		var tarBground = $(".blackSquare").css('background-color');
	}else{
		var tarBground = $(".whiteSquare").css('background-color');
	}

	// Clear the cell that the selection.piece used to be in 
	Utils.cellOf(selection.row, selection.column).css('background-image', 'none').css('background-color', bground).attr('player', '').attr('piece', '').attr('empty', 'true').removeAttr('piece');

	// Put the selection.piece in the new cell
	Utils.cellOf(clickedCell.row, clickedCell.column).css('background-image', 'none').css("background", "url(pieces/"+selection.player+"/"+selection.piece+".png").css("background-size", "100%").css("background-color",tarBground).attr('player', selection.player).attr('piece', selection.piece).attr('empty', 'false');
	
}

export function casesPossible(selection){
	selection.row = parseInt(selection.row);
	selection.column = parseInt(selection.column);
	var possibleList = [];

	// Piece : Pion
	if(selection.piece == 'pion'){
		if(selection.player == 'whitePlayer'){
			if(Utils.cellOf(selection.row + 1, selection.column).attr('empty') == 'true'){
				possibleList = possibleList.concat([[selection.row + 1, selection.column]]);
				if(selection.row == 2 && Utils.cellOf(selection.row + 2, selection.column).attr('empty') == 'true'){
					possibleList = possibleList.concat([[selection.row + 2, selection.column]]);
				}
			}
			if(Utils.playerInCell(selection.row + 1, selection.column + 1) == 'blackPlayer'){
				possibleList = possibleList.concat([[selection.row + 1, selection.column + 1]]);
			}
			if(Utils.playerInCell(selection.row + 1, selection.column - 1) == 'blackPlayer'){
				possibleList = possibleList.concat([[selection.row + 1, selection.column - 1]]);
			}	
		}
		if(selection.player == 'blackPlayer'){
			if(Utils.cellOf(selection.row - 1, selection.column).attr('empty') == 'true'){
				possibleList = possibleList.concat([[selection.row - 1, selection.column]]);
				if(selection.row == 7 && Utils.cellOf(selection.row - 2, selection.column).attr('empty') == 'true'){
					possibleList = possibleList.concat([[selection.row - 2, selection.column]]);
				}
			}
			if(Utils.playerInCell(selection.row - 1, selection.column - 1) == 'whitePlayer'){
				possibleList = possibleList.concat([[selection.row - 1, selection.column - 1]]);
			}
			if(Utils.playerInCell(selection.row - 1, selection.column + 1) == 'whitePlayer'){
				possibleList = possibleList.concat([[selection.row - 1, selection.column + 1]]);
			}	
		}
	}

	// Piece : Cavalier
	if(selection.piece == 'cavalier'){
		let tempoList = [[selection.row + 2, selection.column + 1], [selection.row + 2, selection.column - 1], [selection.row - 2, selection.column + 1], [selection.row - 2, selection.column - 1], [selection.row + 1, selection.column + 2], [selection.row + 1, selection.column - 2], [selection.row - 1, selection.column + 2], [selection.row - 1, selection.column - 2]];
		possibleList = Utils.allyCheck(selection.player, tempoList);
	}

	// Piece : Tour
	if(selection.piece == 'tour'){
		possibleList = straightLine(selection, 8);
	}

	// Piece : Fou
	if(selection.piece == 'fou'){
		possibleList = diagLine(selection, 8);
	}

	// Piece : Dame
	if(selection.piece == 'dame'){
		let straight = straightLine(selection, 8);
		let diagonal = diagLine(selection, 8);
		possibleList = straight.concat(diagonal);
	}

	// Piece : Roi
	if(selection.piece == 'roi'){
		let tempoList = [];
		let straight = straightLine(selection, 2);
		let diagonal = diagLine(selection, 2);
		possibleList = straight.concat(diagonal);
		if(selection.player == 'whitePlayer' && whiteKingMoved == false && selection.column == 5 && selection.row == 1){
			tempoList = tempoList.concat([[selection.row, selection.column + 2],[selection.row, selection.column - 2]]);
			possibleList = possibleList.concat(Utils.allyCheck(selection.player, tempoList));
		}
		if(selection.player == 'blackPlayer' && blackKingMoved == false && selection.column == 5 && selection.row == 8){
			tempoList = tempoList.concat([[selection.row, selection.column + 2],[selection.row, selection.column - 2]]);
			possibleList = possibleList.concat(Utils.allyCheck(selection.player, tempoList));
		}
	}
	return possibleList;
}
export function kingCastle(selection, clickedCell, castlePossibi){
	let pieceToMove = {player: selection.player, piece:'tour', row:0, column:0}
	if(selection.player == 'whitePlayer'){		
		if(castlePossibi.wCastleR == true  && (clickedCell.column === 6 || clickedCell.column === 7)){
			pieceToMove.row = 1;
			pieceToMove.column = 8;
			clickedCell.column -= 1;	
			movePiece(pieceToMove, clickedCell);
			console.log('test')
		}
		if(castlePossibi.wCastleL == true  && (clickedCell.column === 3 || clickedCell.column === 4)){
			pieceToMove.row = 1;
			pieceToMove.column = 1;
			clickedCell.column += 1;	
			movePiece(pieceToMove, clickedCell);
		}	
	}
	if(selection.player == 'blackPlayer'){
		if(castlePossibi.bCastleR == true && (clickedCell.column === 6 || clickedCell.column === 7)){
			pieceToMove.row = 8;
			pieceToMove.column = 8;
			clickedCell.column -= 1;	
			movePiece(pieceToMove, clickedCell);
		}
		if(castlePossibi.bCastleL == true && (clickedCell.column === 4 || clickedCell.column === 3)){	
			pieceToMove.row = 8;
			pieceToMove.column = 1;
			clickedCell.column += 1;	
			movePiece(pieceToMove, clickedCell);
		}
	}
}

export {whiteKingMoved, blackKingMoved};




