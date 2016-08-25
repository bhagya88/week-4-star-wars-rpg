var attacker;
var defender;
var attackerIndex;
var defenderIndex;
var attackerPower;

var attackerScore;
var defenderScore;


var enemies;


var characters=[{
	name:"arth",

	basePower:50,
	attackPower:20,
	currentPower:0,

	isAttacker:false,
	isDefender:false


},
{
	name:"ben",

	basePower:120,
	attackPower:5,
	currentPower:0,

	isAttacker:false,
	isDefender:false


},
{
	name:"hema",

	basePower:200,
	attackPower:20,
	currentPower:0,

	isAttacker:false,
	isDefender:false


}];

startGame();


function startGame(){
	attacker="";
	defender="";
	attackerIndex;
	defenderIndex;
	attackerPower=0;

	attackerScore=0;
	defenderScore=0;


	enemies=[];

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
		attacker=$(this).attr('id');
		

		$('[id="'+attacker+'"]').removeClass('character').addClass('attacker');
		$('#attacker').append($('[id="'+attacker+'"]'));


		/*******remaining characters are set as enemies***
		********populates enemies[]******************/

		for( var i=0;i<characters.length;i++){
				console.log("here",characters[i].name);
			if(characters[i].name !== attacker){
				enemies.push(characters[i].name);
				$('[id="'+characters[i].name+'"]').removeClass('character').addClass('enemy');
				$('#enemies').append($('[id="'+characters[i].name+'"]'));
			}else{
				attackerIndex=i;
				attackerScore=characters[attackerIndex].basePower;
				attackerPower = characters[attackerIndex].attackPower;
				console.log("attacker Index",attackerIndex);
			}	
		}
		$('#enemies').append($('.enemy'));
	});

}

function pickDefender(){
	
	$('#enemies').on('click', '.enemy', function() {
		console.log("inside defender");
		console.log($(this).attr('id'));
		defender=$(this).attr('id');
		defenderIndex= characters.map(function(x) {return x.name; }).indexOf(defender);
		console.log("defender Index",defenderIndex);
		defenderScore = characters[defenderIndex].basePower;
		

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

		if(defender === ""){
			console.log("There is no defender here");
			return;
		}

		console.log("inside Attack");
		defenderScore -= attackerPower;
		attackerScore -= characters[defenderIndex].attackPower;
		

		console.log("inside Attack",attackerPower,characters[attackerIndex].basePower,attackerScore,characters[defenderIndex].attackPower,characters[defenderIndex].basePower,defenderScore);
		attackerPower += characters[attackerIndex].attackPower;
		if(attackerScore<=0){
			console.log("Game Over...");
			

			$('#btnAttack').attr("disabled",true);	

			$("#restart").append($('<button id="btnRestart">Restart</button>'));
			restart();

		}else if(defenderScore<=0){
			console.log("Choose another defender");
			$('[id="'+defender+'"]').removeClass('defender').addClass('character').hide();

			defender="";
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

		for(var i=0;i<characters.length;i++){
			$('[id="'+attacker+'"]').removeClass('attacker').addClass('character');
			$('[id="'+defender+'"]').removeClass('defender').addClass('character');
		}
		console.log("inside restart");
		console.log($('.character'));

	$('#characters').append($('.character'));
	});
}









	

