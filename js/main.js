var zombieTimer;
var skeletonTimer;
var zombie2Timer;
var skeleton2Timer;
var bananaTimer;
var shurikenTimer;
var potion = false;
var grenade = false;
var shuriken = false;

var health = new Array();
health['zombie'] = 10;
health['zombie2'] = 10;
health['skeleton'] = 7;
health['skeleton2'] = 7;
health['banana'] = 25;

document.onkeypress=getKeypress;

$('document').ready(function(){

	updateStatusBox("Game start");
	
	$('#player').css('marginTop','250px')
	$('#player').css('marginLeft','250px')
	$('.monster').each(function(index){
		placeMonster(this);
	});
	//placePowerUp(freeze);
	setTimeout(function(){placePowerUp(freeze)},17000);

	setTimeout(function(){placePowerUp(bomb)},37000);

	
	startAll();

});

function placeMonster(monster){
	x = Math.floor((Math.random()*9));
	y = Math.floor((Math.random()*9));
	
	if ((x!=5)&&(y!=5)) {
		$(monster).css('marginLeft',(x*50) );
		$(monster).css('marginTop',(y*50) );
	} else {
		placeMonster(monster);
	}
}

function placePowerUp(obj){
	x = Math.floor((Math.random()*9));
	y = Math.floor((Math.random()*9));
	$(obj).css('marginLeft',(x*50) );
	$(obj).css('marginTop',(y*50) );
	$(obj).show();
}

function getKeypress(e){
	var code=parseInt(e.keyCode);
//	updateStatusBox("keypress "+code);
	if (code == 119){move('player','up');}	
	if (code == 115){move('player','down');}	
	if (code == 97){move('player','left');}	
	if (code == 100){move('player','right');}
	/*
	if (code == 112){ 
		if (potion == false){
			potion = true;	
			updateStatusBox("Potion Throw");
			stopAll(0);
		} else {
			updateStatusBox("No potion");
		}
	}	
	
	if (code == 111){ 
		if (grenade == false){
			grenade = true;	
			updateStatusBox("Grenade Throw");
			tossGrenade();
		} else {
			updateStatusBox("No grenade");
		}
	}
	*/
	
	if (code == 108){ 
		if (shuriken == false){
			shuriken = true;	
			updateStatusBox("Shuriken Throw");
			throwShuriken('right');
		} else {
			updateStatusBox("No shuriken");
		}
	}	
	if (code == 105){ 
		if (shuriken == false){
			shuriken = true;	
			updateStatusBox("Shuriken Throw");
			throwShuriken('up');
		} else {
			updateStatusBox("No shuriken");
		}
	}
	if (code == 107){ 
		if (shuriken == false){
			shuriken = true;	
			updateStatusBox("Shuriken Throw");
			throwShuriken('down');
		} else {
			updateStatusBox("No shuriken");
		}
	}
	if (code == 106){ 
		if (shuriken == false){
			shuriken = true;	
			//updateStatusBox("Shuriken Throw");
			throwShuriken('left');
		} else {
			updateStatusBox("No shuriken");
		}
	}
}

function updateStatusBox(status){
	//status = "<p style='line-height:18px;'>"+status+"</p>";
	//$('#statusBox').prepend(status);
	console.log(status);
}

function move(obj,direction){
	//updateStatusBox(obj+' '+direction);
	if (direction == 'up'){
		if ( $("#"+obj).css("margin-top").replace("px", "") <= 0 ) {
			//updateStatusBox(obj+' can\'t go that way');
		} else {	
			$("#"+obj).animate({marginTop: "-=50px"}, 1 );
		}	
	} 
	if (direction == 'down'){
		if ( $("#"+obj).css("margin-top").replace("px", "") >= (475 - $("#"+obj).css("height").replace("px", ""))) {
			//updateStatusBox(obj+' can\'t go that way');
		} else {	
			$("#"+obj).animate({marginTop: "+=50px"}, 1 );
		}	
	}		
	if (direction == 'left'){
		if ( $("#"+obj).css("margin-left").replace("px", "") <= 0 ) {
			//updateStatusBox(obj+' can\'t go that way');
		} else {
			$("#"+obj).animate({marginLeft: "-=50px"}, 1 );		
		}	
	}		
	if (direction == 'right'){
		if ( $("#"+obj).css("margin-left").replace("px", "") >= (475 - $("#"+obj).css("height").replace("px", "")) ) {
			//updateStatusBox(obj+' can\'t go that way');
		} else {
			$("#"+obj).animate({marginLeft: "+=50px"}, 1 );		
		}	
	}

	if (obj == "player"){
		setTimeout(function(){checkPowerUp()},50);
	}
}


function checkPowerUp(){
		ppos = $("#player").css("margin-top")+','+$("#player").css("margin-left");
		bpos = $("#bomb").css("margin-top")+','+$("#bomb").css("margin-left");
		mpos = $("#freeze").css("margin-top")+','+$("#freeze").css("margin-left");
		
		if(ppos == bpos){
			grenade=true;tossGrenade();
			$("#bomb").hide();
			$("#bomb").css("margin-top","-100px");
			$("#bomb").css("margin-left","-100px");
		}
		if(ppos == mpos){
			potion=true;stopAll(0);playSound('./sounds/SOUND26.WAV');
			$("#freeze").hide();
			$("#freeze").css("margin-top","-100px");
			$("#freeze").css("margin-left","-100px");
		}
		
		//updateStatusBox($("#player").css("margin-top")+','+$("#player").css("margin-left"));
}

function update(obj){
	pX = parseInt($("#player").css("margin-left").replace("px", ""));
	pY = parseInt($("#player").css("margin-top").replace("px", ""));
	oX = parseInt($("#"+obj).css("margin-left").replace("px", ""));
	oY = parseInt($("#"+obj).css("margin-top").replace("px", ""));
	if (pX > oX){ move(obj,'right') }
	if (pX < oX){ move(obj,'left') }
	if (pY > oY){ move(obj,'down') }
	if (pY < oY){ move(obj,'up') }
}

function startAll(){
	zombieTimer = setInterval(function(){update('zombie')},700);
	zombie2Timer = setInterval(function(){update('zombie2')},600);
	skeletonTimer = setInterval(function(){update('skeleton')},500);
	skeleton2Timer = setInterval(function(){update('skeleton2')},400);
	bananaTimer = setInterval(function(){update('banana')},900);
	potion = false;
	grenade = false;
}

function stopAll(forever){
	clearInterval(zombieTimer)
	clearInterval(zombie2Timer)
	clearInterval(skeletonTimer)
	clearInterval(skeleton2Timer)
	clearInterval(bananaTimer)

	if (forever == 1){
		updateStatusBox("Killed");
	} else {
		setTimeout(function(){startAll()},3000);	
	}	
}

function tossGrenade(){
		stopAll(1);
		$('.monster').each(function(index){
			$(this).css('background-image', 'url("./sprites/explosion.gif")');
			$(this).fadeOut(3000);
		});
		playSound("./sounds/explosion.wav");
		
}

function throwShuriken(direction){
	shurikenTimer = setInterval(function(){checkShurikenHit()},10);
	setTimeout(function(){clearInterval(shurikenTimer)},250);
	if (direction == "right"){
		$("#shuriken").animate({marginLeft: "+=200px"}, 250 );			
		setTimeout(function(){
			$("#shuriken").animate({marginLeft: "-=200px"}, 0 );
			shuriken = false;
			$("#shuriken").show();
		}, 255);	
	}
	if (direction == "left"){
		$("#shuriken").animate({marginLeft: "-=200px"}, 250 );
		setTimeout(function(){
			$("#shuriken").animate({marginLeft: "+=200px"}, 0 );
			shuriken = false;
			$("#shuriken").show();
		}, 255);	
	}
	if (direction == "up"){
		$("#shuriken").animate({marginTop: "-=200px"}, 250 );			
		setTimeout(function(){
			$("#shuriken").animate({marginTop: "+=200px"}, 0 );
			shuriken = false;
			$("#shuriken").show();
		}, 255);	
	}
	if (direction == "down"){
		$("#shuriken").animate({marginTop: "+=200px"}, 250 );			
		setTimeout(function(){
			$("#shuriken").animate({marginTop: "-=200px"}, 0 );
			shuriken = false;
			$("#shuriken").show();
		}, 255);	
	}
}

function checkShurikenHit(){
	
	$('.monster').each(function(index){
		objX = parseInt(getPos(this.id,'x'));
		objY = parseInt(getPos(this.id,'y'));
		starX = parseInt(getPos('shuriken','x'));
		starY = parseInt(getPos('shuriken','y'));

		
		starXoffset = parseInt($(this).height())/2;
		starYoffset = parseInt($(this).width())/2;
		
		//updateStatusBox(starXoffset+"  "+starYoffset);
		
		
		if(	
		 	(
				(starX > (objX-5))&&(starX <= (objX+starXoffset))
			)&&(
				(starY > (objY-5))&&(starY <= (objY+starYoffset))
			)
		){
			// THIS IS A SHURIKEN HIT
			
			playSound('./sounds/SOUND58.WAV');
			
			$("#bang").offset({top:starY,left:starX});
			if(parseInt($("#bang").offset().top) == 0){			
				$("#bang").offset({top:objY,left:objX});
			}
			if(parseInt($("#bang").offset().top) != 0){			
				$("#bang").height(25);
				setTimeout(function(){
					$("#bang").height(0);
				},100);
				//updateStatusBox($("#bang").offset().top);
			}			
			
			
			clearInterval(shurikenTimer);
			$("#shuriken").hide();


			
			updateStatusBox(this.id+" hit!");
			health[this.id] = health[this.id] - 1;
			
			if (health[this.id] <=0 ){
				$(this).css('background-image', 'url("./sprites/cloud.gif")');
				$(this).fadeOut(500);
				updateStatusBox(this.id+" killed");
				intTimer = this+"Timer";
				clearInterval(intTimer);
			}
			
			return false;
			
		} else {
			//updateStatusBox(objX+","+objY+" "+starX+","+starY);
		}
		
	});
}

function playSound(beepfile) {
     document.getElementById('beep').innerHTML= '<audio autoplay="autoplay" src="'+beepfile+'" type="audio/wav"><embed src="'+beepfile+'" hidden="true" autostart="true" loop="false" /></audio>';
}

function getPos(obj,n){
	if (n == 'x'){
		result = Math.floor($("#"+obj).offset().left);
	}
	if (n == 'y'){
		result = Math.floor($("#"+obj).offset().top);
	}
	return result;
}
