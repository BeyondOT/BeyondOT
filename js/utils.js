
export function boardIni(){
	$("[piece]").each(function(){
		let player = $(this).attr('player');
		let piece = $(this).attr('piece');
		let boardsquarecolor = $(this).css('background-color');
		if(player == '' || piece == ''){
			$(this).attr('empty', 'true');
			$(this).removeAttr('piece').removeAttr('player');
			return
		}
		$(this).attr('empty', 'false');
		$(this).css("background", "url(pieces/"+player+"/"+piece+".png").css("background-size", "100%").css("background-color",boardsquarecolor);
	})
}

export function playerInCell(testrow, testcolumn){
	let thePlayer = $("[row='"+ testrow + "'][column='"+ testcolumn +"']").attr('player');
	return thePlayer;
}
export function cellOf(testrow, testcolumn){
	let cell = $("[row='"+ testrow + "'][column='"+ testcolumn +"']");
	return cell;
}
export function rowOf(player, piece){
	let row = parseInt($("[player='"+ player + "'][piece='"+ piece +"']").attr('row'));
	return row;
}
export function columnOf(player, piece){
	let column = parseInt($("[player='"+ player + "'][piece='"+ piece +"']").attr('column'));
	return column;
}

//Function to clean the background colors
export function resetColor(){
	$('[empty]').each(function(){
		if($(this).hasClass('whiteSquare')){
			var bground = 'wheat';
		}else{
			var bground = 'rgb(73, 73, 73)';
		}
		$(this).css('background-color', bground);
	})
}
// Function that colors a given list of cells
export function colorList(list, color){
	for(let i = 0; i < list.length; i++){
		cellOf(list[i][0], list[i][1]).css('background-color', color);
	}
}

export function isInBoard(row, column){
	if (row >= 1 && row <= 8 && column >= 1 && column <= 8){
		return true;
	}
}
export function allyCheck(player, listBefore){
	let listAfter = [];
	for(let i = 0; i < listBefore.length; i++){
		if(isInBoard(listBefore[i][0], listBefore[i][1])){
			if(playerInCell(listBefore[i][0], listBefore[i][1]) == player){
				continue;
			}else{
				listAfter = listAfter.concat([[listBefore[i][0], listBefore[i][1]]]);
			}
		}
	}
	return listAfter;
}

export function emptyCheck(row, column, side){
	let numberOfEmptyCells = 0;
	if(side == 'right'){
		for(let i = 1; i < 3; i++){
			if(playerInCell(row, column + i) == ''){
				numberOfEmptyCells += 1;
			}
		}
		if(numberOfEmptyCells == 2){
			return true;
		}
	}
	if(side == 'left'){
		for(let i = 1; i < 4; i++){
			if(playerInCell(row, column - i) == ''){
				numberOfEmptyCells += 1;
			}
		}
		if(numberOfEmptyCells == 3){
			return true;
		}
	}
}

export function kingCanCastle(selection, clickedRow, kingMoved){
	let castlePossibi = {wCastleR:false, wCastleL:false, bCastleR:false, bCastleL :false};
	if(selection.player == 'whitePlayer'){
		if(clickedRow == 1 && kingMoved.wKingMoved == false){
			castlePossibi.wCastleR = emptyCheck(1, 5, 'right');
			castlePossibi.wCastleL = emptyCheck(1, 5, 'left');
		}	
	}else{
		if(clickedRow == 8 && kingMoved.bKingMoved == false){
			castlePossibi.bCastleR = emptyCheck(8, 5, 'right');
			castlePossibi.bCastleL = emptyCheck(8, 5, 'left');
		}	
	}
	return castlePossibi;
}

