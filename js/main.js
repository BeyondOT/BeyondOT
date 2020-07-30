import * as Game from './game.js';


$('#startButton').on('click', function(){
    Game.StartGame();
    $('.grid').css('opacity', '100%');
    $('.grid').css('display', 'flex');
    $('.infos').css('display', 'flex');
    $(this).css('display', 'none');
    console.log('click');
})




