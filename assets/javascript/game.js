var attacker; //holds index of attacker object in characters array
var defender; //holds index of defender object in characters array

var attackerPower;
var attackerScore;
var defenderScore;

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

//****initialize********//

	attacker=-1;    //attacker not yet assigned
	defender=-1;    //defender not yet assigned
	attackerPower=0;

	attackerScore=0;
	defenderScore=0

	$('#restart').hide();


	for(var i=0;i<characters.length;i++){
			$('#'+i+' > figcaption:last').text(characters[i].basePower);	
	}



	pickAttackerAndSetEnemies();
	pickDefender();
	attack();
	restart();
	console.log(attacker);

}

function pickAttackerAndSetEnemies(){
	
	$('#characters').on('click', '.character', function() {
		console.log("inside clickpickAttackerandSetEnemies");
		
		attacker=parseInt($(this).attr('id'));
		$('#attacker').append($(this));


		attackerScore=characters[attacker].basePower;
		attackerPower = characters[attacker].attackPower;

			for( var i=0;i<characters.length;i++){
				
				if(i !== attacker){
			
				$('#enemies').append($('#'+i));
				}
			}
		
	});

}

function pickDefender(){
	
	defender=-1;
	defenderScore=0;

	$('#enemies').on('click', '.character', function() {
		console.log("inside defender");
		
		defender=parseInt($(this).attr('id'));
		defenderScore = characters[defender].basePower;
		$('#defender').append($(this));
		$('#btnAttack').attr("disabled",false);
	});
}

function attack(){
	console.log("inside Attack");
	$('#btnAttack').click(function() {

		if(defender === -1){
			console.log("There is no defender here");
			return;
		}
		
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
			return;

		}else if(defenderScore<=0){
			if($('#enemies').children().length === 0){
				console.log("Game Over...");
				$('#btnAttack').attr("disabled",true);
				$("#restart").show();	
				return;
			}
			console.log("Choose another defender");
			$('#'+defender).hide();

						
			pickDefender();
			
		}
		
	});

}

function restart(){

	$('#restart').on('click', 'button', function() {
		console.log("inside restart");
		
		$('.character').each(function(idx,ele){
			$(ele).show();
			$('#characters').append($(ele));
		});

	 	startGame();
	});
}









	

