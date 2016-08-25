var attacker;
var defender;

var attackerPower;

var attackerScore;
var defenderScore;


var enemies;


var characters=[{
	name:"arth",
	basePower:50,
	attackPower:20
},
{
	name:"ben",
	basePower:120,
	attackPower:5
},
{
	name:"hema",
	basePower:200,
	attackPower:20,
},
{
	name:"nix",
	basePower:150,
	attackPower:25,
}];


startGame();


function startGame(){


	attacker=-1;
	defender=-1;
	attackerPower=0;

	attackerScore=0;
	defenderScore=0

	enemies=[];

	for(var i=0;i<characters.length;i++){
			$('#'+i+' > figcaption:last').text(characters[i].basePower);	
	}

	pickCharacterAndSetEnemies();
	pickDefender();
	attack();
	console.log(attacker);
	console.log(enemies);
}

function pickCharacterAndSetEnemies(){
	
	$('#characters').on('click', '.character', function() {
		console.log("inside click");
		console.log($(this).attr('id'));
		attacker=parseInt($(this).attr('id'));
		

		$('[id="'+attacker+'"]').removeClass('character').addClass('attacker');
		$('#attacker').append($('[id="'+attacker+'"]'));


		/*******remaining characters are set as enemies***
		********populates enemies[]******************/

		for( var i=0;i<characters.length;i++){
				
			if(i !== attacker){
				enemies.push(i);
				$('[id="'+i+'"]').removeClass('character').addClass('enemy');
				$('#enemies').append($('[id="'+i+'"]'));
			}else{
				attacker=i;
				attackerScore=characters[attacker].basePower;
				$('#'+attacker+' > figcaption:last').text(attackerScore);
				attackerPower = characters[attacker].attackPower;
				console.log("attacker Index",attacker);
			}	
		}
		$('#enemies').append($('.enemy'));
	});

}

function pickDefender(){
	
	$('#enemies').on('click', '.enemy', function() {
		console.log("inside defender");
		console.log($(this).attr('id'));
		defender=parseInt($(this).attr('id'));
		
		console.log("defender Index",defender);
		defenderScore = characters[defender].basePower;
		$('#'+defender+' > figcaption:last').text(defenderScore);

		$('[id="'+defender+'"]').removeClass('enemy').addClass('defender');
		$('#defender').append($('[id="'+defender+'"]'));
		enemies.splice(enemies.indexOf(defender),1);
		console.log("pick enemy",enemies);
		$('.enemy').prop("disabled",true);
		$('#btnAttack').attr("disabled",false);
	});
}

function attack(){

	$('#btnAttack').click(function() {

		if(defender === -1){
			console.log("There is no defender here");
			return;
		}

		console.log("inside Attack");
		defenderScore -= attackerPower;
		attackerScore -= characters[defender].attackPower;
		
		$('#'+attacker+' > figcaption:last').text(attackerScore);
		$('#'+defender+' > figcaption:last').text(defenderScore);

		console.log("inside Attack",attackerPower,characters[attacker].basePower,attackerScore,characters[defender].attackPower,characters[defender].basePower,defenderScore);
		attackerPower += characters[attacker].attackPower;
		if(attackerScore<=0){
			console.log("Game Over...");
			

			$('#btnAttack').attr("disabled",true);	
			$("#restart").show();
			$("#restart").append($('<button id="btnRestart">Restart</button>'));
			restart();

		}else if(defenderScore<=0){
			console.log("Choose another defender");
			$('[id="'+defender+'"]').removeClass('defender').addClass('character').hide();

			defender=-1;
			defenderScore=0;

			$('.enemy').prop("disabled",false);
			if(enemies.length>0){
				pickDefender();
			}
		}
		
	});

}

function restart(){

	$('#restart').on('click', 'button', function() {

		$('[id="'+attacker+'"]').removeClass('attacker').addClass('character');
		$('[id="'+defender+'"]').removeClass('defender').addClass('character');

		// for(i=0;i<enemies.length;i++){
		// 	$('[id="'+enemies[i]+'"]').removeClass('enemy').addClass('character');	
		// }


		$('.enemy').each(function(idx,ele){

			$(ele).removeClass('enemy').addClass('character');
		});

		console.log("inside restart");
		console.log($('.character'));


		
		$('.character').show();
		$("#restart").empty();
		$('.character').each(function(idx,ele){

			$('#characters').append($(ele));
			$(ele).prop('disabled',false);

		});

	 

		startGame();
	});
}









	

