let score = 0;
let highScore = 0;
let row = 23;
let col = 13;
let block = 35;
let game = {};
let myBlock = {};
let allowrun=false;
let gameTimer;
let next = Math.floor((Math.random()*7 + 7));
let current;
let over = false;
let moveable=true;
// if(localStorage.getItem("high")!=undefined){
// 	highScore = localStorage.getItem("high");
// }
console.log(next);
for(let i=0;i<row;i++){
	game[i] = {};
	myBlock[i] = {};
	for(let j=0;j<col;j++){
		game[i][j] = 0;
		myBlock[i][j] = 0;
	}
}
let blockIcon = [
"one",
"two",
"three",
"fore",
"five",
"six",
"seven",
"pre_1",
"pre_2",
"pre_3",
"pre_4",
"pre_5",
"pre_6",
"pre_7"
];

let canvas = $("#canvas")[0];
let mainctx = canvas.getContext('2d');
canvas.width = 700;
canvas.height = 860;

let bg = document.createElement('canvas');
bg.width = canvas.width;
bg.height = canvas.height;
let ctx = bg.getContext('2d');

let move = document.createElement('canvas');
move.width = canvas.width;
move.height = canvas.height;
let movectx = move.getContext('2d');

let save=function(){

	$(document).ready(function(){
		$.ajax({
	 url:'https://venus.cs.qc.cuny.edu/~huxi8128/cs355/backend/status/',
	 type:'GET',
	 success:function(response){
		  if(response.data["loggedin"]==false){
				alert("Please login to save game status");
	 }else{
		 var username=response.data["username"];
		 var blocksave=JSON.stringify(myBlock);
		 var datasave=JSON.stringify(game);
		 var scoresave=JSON.stringify(highScore);
		 $.ajax({
			   url:'https://venus.cs.qc.cuny.edu/~huxi8128/cs355/backend/save/',
				 type:'POST',
				 data:{datasave:datasave,username:username,blocksave:blocksave,scoresave:scoresave},
				 success:function(response){
					 if(response.code==10){
						 alert("data successfuly saved");
					 }
				 }
		 });
	 }
 }
	});
});
}
let reload=function(){
	$(document).ready(function(){
		$.ajax({
	 url:'https://venus.cs.qc.cuny.edu/~huxi8128/cs355/backend/status/',
	 type:'GET',
	 success:function(response){
			if(response.data["loggedin"]==false){
				alert("Please login to save game status");
	 }else{
		 var username=response.data["username"];
		 $.ajax({
				 url:'https://venus.cs.qc.cuny.edu/~huxi8128/cs355/backend/reload/',
				 type:'POST',
				 data:{username:username},
				 success:function(response){
					  myBlock=JSON.parse(response.block);
						game=JSON.parse(response.game);
						highScore=JSON.parse(response.score);
						paste();
						render();
				 }
		 });
	 }
 }
	});
});
}
// let save=function(){
// 	if(localStorage.getItem("block")!=undefined){
// 		localStorage.removeItem("block");
// 	}
// 	localStorage.setItem("block",JSON.stringify(myBlock));
// 	if(localStorage.getItem("game")!=undefined){
// 		localStorage.removeItem("game");
// 	}
// 	localStorage.setItem("game",JSON.stringify(game));
//
// }
// let reload=function(){
// 	if(localStorage.getItem("block")!=undefined){
// 		var retrievedData=localStorage.getItem("block");
// 		 myBlock=JSON.parse(retrievedData);
// 	}
// 	if(localStorage.getItem("game")!=undefined){
// 		var retrievedData=localStorage.getItem("game");
// 		 game=JSON.parse(retrievedData);
// 	}
// 	paste();
// 	render();
// }
let play = function(){
	allowrun=true;
	moveable=true;
	document.getElementById("PASTE").disabled=false;
		timer();
		render();

}
let paste=function(){
	allowrun=false;
	moveable=false;
	document.getElementById("PASTE").disabled=true;
}
let reset=function(){
	window.location.href="main.html";
}

var preload = function(src,callback){
	let iconNum = 0;
	for(let i=1;i<=src.length;i++){
		src[i-1] = new Image();
		src[i-1].onload = function(){
			if(++iconNum == src.length){
				callback();
			}
		}
		if(i<8){
			src[i-1].src = `img/${i}.png`;
		}else{
			src[i-1].src = `img/pre_${i-7}.png`;
		}
	}
}
preload(blockIcon,function(){
	console.log("资源加载完毕");
	init();
	confirm();
});

let init = function(){
	sence();
}

let sence = function(){
	ctx.strokeStyle = "#ffffff";
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(15,15);
	ctx.lineTo(15,16+row*block+row);
	ctx.lineTo(16+col*block+col,16+row*block+row);
	ctx.lineTo(16+col*block+col,15);
	ctx.lineTo(15,15);

	ctx.moveTo(30+col*block+col,50);
	ctx.lineTo(685,50);
	ctx.lineTo(685,210);
	ctx.lineTo(30+col*block+col,210);
	ctx.lineTo(30+col*block+col,50);
	ctx.stroke();
	ctx.closePath();

	ctx.lineWidth = 1;
	for(let i=0;i<col-1;i++){
		ctx.moveTo(17+block+i*(block+1),17);
		ctx.lineTo(17+block+i*(block+1),16+row*block+row);
	}

	for(let i=0;i<row-1;i++){
		ctx.moveTo(17,17+block+i*(block+1));
		ctx.lineTo(16+col*block+col,17+block+i*(block+1));
	}

	ctx.stroke();
	ctx.closePath();

	movectx.beginPath();
	movectx.font = "25px Arial";
	movectx.textAlign = "center";
	movectx.fillStyle = "white";
	movectx.fillText("NEXT", 590, 35);
	movectx.fillText("SCORE:", 560, 400);
	movectx.fillText(score, 620, 400);
	movectx.font = "20px Arial";
	movectx.fillText("HIGHEST:", 560, 450);
	movectx.fillText(highScore, 640, 450);
	movectx.fillText("MOVE:",545,500);

	movectx.fillText("down,left,right",575,550);
	movectx.fillText("SHAPE: UP",565,600);
	movectx.closePath();


	mainctx.drawImage(move,0,0,canvas.width,canvas.height);
	mainctx.drawImage(bg,0,0,canvas.width,canvas.height);
}

let confirm = function(){
	current = next;
	for(let i=0;i<row;i++){
		for(let j=0;j<col;j++){
			if(current == 7){
				if(myBlock[1][5] > 1 || myBlock[1][6] > 1){
					over = true;
					break;
				}
				game[0][5] = 1;
				game[0][6] = 1;
				game[1][5] = 1;
				game[1][6] = 1;
			}else if(current == 8){
				if(myBlock[2][6] > 1 || myBlock[3][6] > 1){
					over = true;
					break;
				}
				game[0][6] = 1;
				game[1][6] = 1;
				game[2][6] = 1;
				game[3][6] = 1;
			}else if(current == 9){
				if(myBlock[2][6] > 1 || myBlock[1][5] > 1){
					over = true;
					break;
				}
				game[0][6] = 1;
				game[1][6] = 1;
				game[2][6] = 1;
				game[1][5] = 1;
			}else if(current == 10){
				if(myBlock[1][5] > 1 || myBlock[1][6] > 1 || myBlock[1][7] > 1){
					over = true;
					break;
				}
				game[0][5] = 1;
				game[1][5] = 1;
				game[1][6] = 1;
				game[1][7] = 1;
			}else if(current == 11){
				if(myBlock[1][5] > 1 || myBlock[1][6] > 1){
					over = true;
					break;
				}
				game[0][6] = 1;
				game[0][7] = 1;
				game[1][5] = 1;
				game[1][6] = 1;
			}else if(current == 12){
				if(myBlock[1][6] > 1 || myBlock[1][7] > 1){
					over = true;
					break;
				}
				game[0][5] = 1;
				game[0][6] = 1;
				game[1][6] = 1;
				game[1][7] = 1;
			}else if(current == 13){
				if(myBlock[1][5] > 1 || myBlock[1][6] > 1 || myBlock[1][7] > 1){
					over = true;
					break;
				}
				game[0][7] = 1;
				game[1][5] = 1;
				game[1][6] = 1;
				game[1][7] = 1;
			}
		}
	}
	if(over == true){
		gameover();
	}
	next = Math.floor((Math.random()*7 + 7));
	console.log(next);
}

let gameover = function(){
	alert("Game Over");
	saveScore();
	reset();
}
let saveScore=function(){
	if(score > highScore){
		highScore = score;
// 		localStorage.setItem("high",highScore);
	}
//
}

let render = function(){
	mainctx.clearRect(0,0,canvas.width,canvas.height);
	movectx.clearRect(0,0,canvas.width,canvas.height);
	ctx.clearRect(0,0,canvas.width,canvas.height);
	requestAnimationFrame(render, canvas);

	sence();

	ctx.drawImage(blockIcon[next],510,50);

	for(let i=0;i<row;i++){
		for(let j=0;j<col;j++){
			if(game[i][j]==1){
				movectx.drawImage(blockIcon[current-7],16+j+j*block,16+i+i*block,35,35);
			}
			if(myBlock[i][j] > 1){
				ctx.drawImage(blockIcon[myBlock[i][j]-7],16+j+j*block,16+i+i*block,35,35);
			}
		}
	}

	for(let i=row-1;i>=0;i--){
		let isFill = 0;
		for(let j=col-1;j>=0;j--){
			if(myBlock[i][j] > 0){
				isFill++;
				if(isFill == col){
					for(let m=0;m<col;m++){
						myBlock[i][m] = 0;
					}
					for(let m=row-1;m>=0;m--){
						for(let n=col-1;n>=0;n--){
							if(m < i && myBlock[m][n] > 0){
								myBlock[m+1][n] = myBlock[m][n];
								myBlock[m][n] = 0;
							}
						}
					}
					score+=50;
					saveScore();
					$("audio")[0].play();
					return;
				}
			}
		}
	}

	mainctx.drawImage(move,0,0,canvas.width,canvas.height);
	mainctx.drawImage(bg,0,0,canvas.width,canvas.height);

}

let timer = function(){
	clearInterval(gameTimer);
	gameTimer = setInterval(function(){
		if(allowrun){
			moveBlock();
		}
	},500);
}

let moveBlock = function(){
	let blockNum = 0;
	let isRight = 0;
	let hasBlock = 0;
	for(let i=0;i<row;i++){
		for(let j=0;j<col;j++){
			if(game[i][j] == 1){
				if(myBlock[i+1]==undefined || myBlock[i+1][j] > 1){
					stop();
					return;
				}else{
					isRight++;
					if(isRight == 4){
						down();
						return;
					}
				}
			}
		}
	}
}

let down = function(){
	for(let i=row-1;i>=0;i--){
		for(let j=col-1;j>=0;j--){
			if(game[i][j] == 1){
				game[i][j] = 0;
				game[i+1][j] = 1;
			}
		}
	}
}

let stop = function(){
	let success;
	if(current == 7){
		success = 7;
	}else if(current == 8){
		success = 8;
	}else if(current == 9){
		success = 9;
	}else if(current == 10){
		success = 10;
	}else if(current == 11){
		success = 11;
	}else if(current == 12){
		success = 12;
	}else if(current == 13){
		success = 13;
	}
	for(let i=0;i<row;i++){
		for(let j=0;j<col;j++){
			if(game[i][j] == 1){
				myBlock[i][j] = success;
			}
			game[i][j] = 0;
		}
	}
	for(let i=0;i<row;i++){
		for(let j=0;j<col;j++){
			if(myBlock[i][j] == success){
				ctx.drawImage(blockIcon[current-7],16+j+j*block,16+i+i*block,35,35);
			}
		}
	}

	confirm();
}

$(window).on('keydown',function(e){
	if(moveable && e.keyCode == 37){
		let isRight = 0;
		for(let i=0;i<row;i++){
			for(let j=0;j<col;j++){
				if(game[i][j] == 1){
					if(j-1 < 0 || myBlock[i][j-1] > 1){
						return;
					}else{
						isRight++;
					}
				}
				if(isRight == 4){
					for(let i=0;i<row;i++){
						for(let j=0;j<col;j++){
							if(game[i][j] == 1){
								game[i][j] = 0;
								game[i][j-1] = 1;
							}
						}
					}
					return;
				}
			}
		}
	}else if(moveable && e.keyCode == 39){
		let isRight = 0;
		for(let i=row-1;i>=0;i--){
			for(let j=col-1;j>=0;j--){
				if(game[i][j] == 1){
					if(j+1 > col-1 || myBlock[i][j+1] > 1){
						return;
					}else{
						isRight++;
					}
				}
				if(isRight == 4){
					for(let i=row-1;i>=0;i--){
						for(let j=col-1;j>=0;j--){
							if(game[i][j] == 1){
								game[i][j] = 0;
								game[i][j+1] = 1;
							}
						}
					}
					return;
				}
			}
		}
	}else if(moveable && e.keyCode == 40){
		moveBlock();
	}else if(moveable && e.keyCode == 38){
		let flag = 0;
		let first_i = 99;
		let first_j = 99;
		let last_i = 0;
		let last_j = 0;
		let rotate_i = 0;
		let rotate_j = 0;
		let temp = {};
		for(let i=0;i<row;i++){
			for(let j=0;j<col;j++){
				if(game[i][j] == 1){
					flag++;
					if(i < first_i){
						first_i = i;
					}
					if(j < first_j){
						first_j = j;
					}
					if(i > last_i){
						last_i = i;
					}
					if(j > last_j){
						last_j = j;
					}
					if(flag == 4){
						rotate_i = last_i - first_i + 1;
						rotate_j = last_j - first_j + 1;
						for(let m=0;m<rotate_i;m++){
							temp[m] = {};
							let temp_j = first_j;
							for(let n=0;n<rotate_j;n++){
								temp[m][n] = game[first_i][temp_j];
								temp_j++;
							}
							first_i++;
						}
						rotate(temp,rotate_i,rotate_j,first_i,first_j);
						return;
					}
				}
			}
		}
	}
});

let rotate = function(temp,h,w,first_i,first_j){

	let temp_90 = {};
	let rotate_90 = {};
	for(let i=0;i<w;i++){
		temp_90[i] = {};
		for(let j=0;j<h;j++){
			temp_90[i][j] = temp[j][i];
		}
	}

	for(let i=0;i<w;i++){
		rotate_90[i] = {};
		for(let j=0;j<h;j++){
			rotate_90[i][j] = temp_90[w-i-1][j];
		}
	}

	let tempRender = {};
	for(let i=0;i<row;i++){
		tempRender[i] = {};
		for(let j=0;j<col;j++){
			tempRender[i][j] = 0;
		}
	}
	// console.log(tempRender);
	for(let i=0;i<row;i++){
		for(let j=0;j<col;j++){
			if(i == first_i-2){
				if(j == first_j){
					for(let m=0;m<w;m++){
						for(let n=0;n<h;n++){
							if(j+n > col-1 || myBlock[i+m][j] > 1 || myBlock[i][j+n] > 1){
								return;
							}
						}
					}
					for(let a=0;a<w;a++){
						j = first_j;
						for(let b=0;b<h;b++){
							tempRender[i][j] = rotate_90[a][b];
							j++;
						}
						i++;
					}
					break;
				}
			}
		}
	}

	for(let i=0;i<row;i++){
		for(let j=0;j<col;j++){
			game[i][j] = 0;
			game[i][j] = tempRender[i][j];
		}
	}
}
