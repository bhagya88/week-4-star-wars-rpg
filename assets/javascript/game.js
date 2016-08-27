var attacker; //holds index of attacker object in characters array
var defender; //holds index of defender object in characters array

var attackerPower;
var attackerScore;
var defenderScore;

var characters=[{
	name:"Arth",
	basePower:150,
	attackPower:20
},
{
	name:"Ben",
	basePower:120,
	attackPower:30
},
{
	name:"Hema",
	basePower:200,
	attackPower:15,
},
{
	name:"Nix",
	basePower:150,
	attackPower:20
}];

initializeGame();
$('#characters').on('click', '.character', pickAttackerAndEnemies);
$('#btnAttackRestart').click(attackRestart);
// $('#btnRestart').click(restart);




function initializeGame(){

	attacker=undefined;    
	defender=undefined;  
	attackerPower=0;
	attackerScore=0;
	defenderScore=0

	//$('#btnRestart').hide();
	$('#btnAttackRestart').html("Attack");
	$("#btnAttackRestart").hide();
	$('#message').html("Pick your character to get started.");
	$('#messageFooter').html("");
	$('#messageCharacters').html("Available characters")

	for(var i=0;i<characters.length;i++){
			$('#'+i+' > figcaption:last').text(characters[i].basePower);	
			$('#'+i+' > figcaption:first').text(characters[i].name);
	}		

}

function pickAttackerAndEnemies(){

	console.log("begin clickpickAttackerandEnemies",attacker,defender);
	
	if(attacker ===undefined){
		attacker=parseInt($(this).attr('id'));
		$('#attacker').prepend($(this));
		attackerScore=characters[attacker].basePower;
		attackerPower = characters[attacker].attackPower;
		$('#message').html("Pick enemy to fight from remaining characters.");	
		$('#messageCharacters').html("Available enemies");
	}else if(defender === undefined){

		defender=parseInt($(this).attr('id'));
		defenderScore = characters[defender].basePower;
		$('#defender').prepend($(this));
		$('#characters').children().prop("disabled",true);
		$('#btnAttackRestart').show();
		$('#btnAttackRestart').attr("disabled",false);
		$('#message').html("ATTACK!");
		if($('#characters').children().length ===0){
			$('#messageCharacters').html("No more enemies left.");
		}

	}
	console.log("end clickpickAttackerandEnemies",attacker,defender);
}	





function attackRestart(){
	if($('#btnAttackRestart').html() === "Restart"){
		restart();
	}else if($('#btnAttackRestart').html() === "Attack"){
		attack();
	}
}

function attack(){
	console.log("inside Attack");
	
	defenderScore -= attackerPower;
	attackerScore -= characters[defender].attackPower;
	
	$('#'+attacker+' > figcaption:last').text(attackerScore);
	$('#'+defender+' > figcaption:last').text(defenderScore);

	$('#messageFooter').html("<span>"+"You attacked "+characters[defender].name+" for "+attackerPower+" damage."+"<br>"+characters[defender].name+" attacked you for "+characters[defender].attackPower+" damage."+"</span>"+"<br>");
			
	console.log("inside Attack",attackerPower,characters[attacker].basePower,attackerScore,characters[defender].attackPower,characters[defender].basePower,defenderScore);
	attackerPower += characters[attacker].attackPower;

	result();
}


function result(){
	if(attackerScore===0 && defenderScore===0){
		console.log("here 1");
	 	$('#message').html("<span>"+"It's a tie. Game over...!"+"</span>"+"<br>");
	 	beforeRestart();	
	 	return;
	}else if (attackerScore <= 0 && defenderScore>0){
		console.log("here 2");
		$('#message').html("<span>"+"You got defeated by "+characters[defender].name+". Game over...!"+"</span>"+"<br>");
	 	beforeRestart();
	 	return;

	}else if(attackerScore<0 && defenderScore<0){
		console.log("here 3");
		$('#messageFooter').prepend("<span>"+"You loose. Game over...!"+"</span>"+"<br>");
	 	beforeRestart();
	 	return;
	}else if(attackerScore>0 &&  defenderScore<=0){
		console.log("here 4");		
		$('#messageFooter').prepend("<span>"+"You defeated "+characters[defender].name+"</span>"+"<br>");
		
		if($('#characters').children().length ===0){
			$('#messageFooter').prepend("<span>"+"You defeated all the enemeis. Yeh!"+"</span>"+"<br>");
			$('#messageCharacters').html("CONGRATULATIONS..!!!!");	
			beforeRestart();
	 	}else{
			$('#message').html("Pick another enemy to fight.");
		}
		
		if($('#btnAttackRestart').html() ==="Attack"){
			$('#'+defender).hide();
			defender=undefined;
			$('#btnAttackRestart').attr("disabled",true);
			$('#characters').children().prop("disabled",false);
		}
	}else if(defenderScore>0 &&  attackerScore>0){
		console.log("here 5");
		$('#btnAttackRestart').attr("disabled",false);
	}
}


function beforeRestart(){
	
	$('#btnAttackRestart').attr("disabled",false);
	$('#btnAttackRestart').html("Restart");
	$('#message').html("Press restart to play again");
}


function restart(){
	
	$('.character').each(function(idx,ele){
			$(ele).show();
			$('#characters').prepend($(ele));
		});
	initializeGame();
}









	

