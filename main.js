
active = true; // true means players 1 turn false means player 2 turns
debug = false;
arr = ["","","","","","","","",""];
btns = document.getElementsByTagName('button');
running = true;
function check_score(temp_arr,temp_active){
	if(check(temp_arr,false)!=0){
		if(check(temp_arr,false)==-2)
			return 0;
		else
			return check(temp_arr,false);  // 1 player "O" and -1 player "X"
	}
	var temp_possible_moves = [];
	for(var i=0; i<9;i++){
		if(temp_arr[i]==""){
			temp_possible_moves.push(i);
		}		 
	}
	var sum = 0;
	for(var i=0;i<temp_possible_moves.length;i++){
		var tem_arr = Array.from(temp_arr);
		if(temp_active)
			tem_arr[temp_possible_moves[i]]="X";
		else
			tem_arr[temp_possible_moves[i]]="O";
		sum += check_score(tem_arr,!temp_active);
		
	}
	return sum;
}
function AI(){
	if (active) return;
	fla = false;
	possible_moves = [];
	for(var i=0; i<9;i++){
		if(arr[i]==""){
			possible_moves.push(i);
			fla=true;
		}		 
	}
	if(!fla)return false;
	var maxx=-99999999;
	var pos=0;
	for(var i=0;i<possible_moves.length;i++){
		var temp_arr = Array.from(arr);
		temp_arr[possible_moves[i]]="O";
		var inter = check_score(temp_arr,!active);
		if (debug) console.log('=',inter,'^',possible_moves[i]);
		if(inter > maxx){
			pos = possible_moves[i];
			maxx = inter;
		}
	}
	 
	buttonpress(pos);
	//active = true;
	return true;
}
function reset(){
	for(var i=0;i<9;i++){
		if(arr[i]=="X"){
			btns[i].classList.remove('player1');
		btns[i].innerText="";}
		else if (arr[i]=="O"){
			btns[i].classList.remove('player2');
		btns[i].innerText="";}
	}
	arr=["","","","","","","","",""];
	active= true;
	running = true;
}
function check(aa, aler){
	var flag=0;
	var sum=0;
	if(aa[0]==aa[3] && aa[3]==aa[6] && flag==0){ 
		if(aa[0]=="X"){
			flag=1;
}
		else if(aa[0]=="O"){
			flag=-1;
}
	}
        if(aa[1]==aa[4] && aa[4]==aa[7] && flag==0)
         {
               if(aa[1]=="X"){
			flag=1;
}
		else if(aa[1]=="O"){
			flag=-1;
}
}
        if(aa[2]==aa[5] && aa[5]==aa[8]&& flag==0)
         {
               if(aa[2]=="X"){
			flag=1;
}
		else if(aa[2]=="O"){
			flag=-1;
}
}
        if(aa[0]==aa[1] && aa[1]==aa[2]&& flag==0)
         {
               if(aa[0]=="X"){
			flag=1;
}
		else if(aa[0]=="O"){
			flag=-1;
}
}
        if(aa[3]==aa[4] && aa[4]==aa[5] && flag==0)
         {
               if(aa[3]=="X"){
			flag=1;
}
		else if(aa[3]=="O"){
			flag=-1;
}
}

        if(aa[0]==aa[4] && aa[4]==aa[8]&& flag==0)
         {
               if(aa[0]=="X"){
			flag=1;
}
		else if(aa[0]=="O"){
			flag=-1;
}
}

        if(aa[2]==aa[4] && aa[4]==aa[6]&& flag==0)
         {
            if(aa[2]=="X"){
			flag=1;
}
		else if(aa[2]=="O"){
			flag=-1;
}
}

        if(aa[6]==aa[7] && aa[7]==aa[8]&& flag==0)
        {
               if(aa[6]=="X"){
			flag=1;
}
		else if(aa[6]=="O"){
			flag=-1;
}
}
	if(flag==-1){
		if(aler){
		alert("Player 2 WON!!");
		reset();
		}
		return 1;
	} else if (flag==1){
		if(aler){
		alert("Player 1 WON!!");
		reset();}
		return -1;
	}
	for(var i=0;i<9;i++)
	{
		if(aa[i]=="")
			sum=1;
	}
	if(sum!=1)
	{
		if(aler){
		alert("Its a draw");
		reset();}
		return -2;
	}
	return 0;
}

function buttonpress(pos){
	if (!running)return;
	console.log(pos);
	if(active){
		if(arr[pos]==""){
			btns[pos].classList.add('player1');
			arr[pos]="X";
			active= !active;
			btns[pos].innerText="X";
			if(check(arr,false)!=0)running = false;
			AI();
		}
		
	}else{
		if(arr[pos]==""){
			btns[pos].classList.add('player2');
			arr[pos]="O";
			active= !active;
			btns[pos].innerText="O";
		}
		
	
	}
	//if(check(arr,false)!=0)running = false;
	
} 
btns[0].onclick=function(){buttonpress(0);}
btns[1].onclick=function(){buttonpress(1);}
btns[2].onclick=function(){buttonpress(2);}
btns[3].onclick=function(){buttonpress(3);}
btns[4].onclick=function(){buttonpress(4);}
btns[5].onclick=function(){buttonpress(5);}
btns[6].onclick=function(){buttonpress(6);}
btns[7].onclick=function(){buttonpress(7);}
btns[8].onclick=function(){buttonpress(8);}
setInterval(function(){check(arr,true);},100);