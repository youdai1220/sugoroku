(function(){
    'use strict';
    const startButton = document.getElementById('start-button');
    const saikoro = document.getElementById('saikoro'); 
    const NumberArea = document.getElementById('numberarea');
    const turnArea = document.getElementById('turnarea');
    document.getElementById('a1').style.backgroundColor = 'skyblue';
    document.getElementById('a50').style.backgroundColor = 'orange';


    var a;
    var b;
    var aTotal = 1; //Aの位置
    var bTotal = 1; //Bの位置
    var turn; //A・Bのターン

    var number = document.createElement('h2'); //NumberAreaの内容
    var Turn = document.createElement('h4'); //turnAreaの内容
    const paragraph1 = document.createElement('p'); //Startの内容
    const paragraphSame = document.createElement('p'); //AとBが同じマスにいるときの内容
    const paragraphA = document.createElement('p'); //Aがいるマスの内容
    const paragraphB = document.createElement('p'); //Bがいるマスの内容   
    const paragraph50 = document.createElement('p'); //Goalの内容

    function removeAllChildren(element){
        while (element.firstChild){
            element.removeChild(element.firstChild);
         };
      }//removeAllChlldren

    paragraph1.innerText = 'Start \n \n A B';
    a1.appendChild(paragraph1) //スタート時のStartの内容

    Turn.innerText = '「ゲームを始める」を押してください。'
    turnArea.appendChild(Turn); 

    startButton.onclick = () => { //先攻・後攻を決める
        var x = Math.random(); 
        var y = Math.random();
        if(x > y){
            turn = 1;
            Turn.innerText = 'Aさんのターンです。'
        }else if(y > x){
            turn = 2;
            Turn.innerText = 'Bさんのターンです。'
        }
        turnArea.appendChild(Turn); 
        document.getElementById('saikoro').disabled = false; //サイコロを振れるようにする
        document.getElementById('start-button').disabled = true; //リスタートをできないようにする
    }


    saikoro.onclick = () =>{ //ボタンを押したときの処理
        if(turn % 2 === 1){ //trueならAさんのターン

            function TurnChangeToB(){ //Bのターンに変える処理
                removeAllChildren(turnArea);
                Turn.innerText = 'Bさんのターンです。'
                turnArea.appendChild(Turn);
            };

            if(aTotal === 1){ //Aがスタートするときの処理
                if(aTotal === bTotal){ //Aが先攻のとき
                    removeAllChildren('a1');
                    paragraph1.innerText = 'Start \n \n B';
                    a1.appendChild(paragraph1); //Startの内容は「Start B」
                }else{ //Aが後攻のとき
                    removeAllChildren('a1');
                    paragraph1.innerText = 'Start';
                    a1.appendChild(paragraph1); //Startの内容は「Start」
                }

            }else if(aTotal > 1 && aTotal < 50){ //Aの二回目以降のターンの処理
                if(aTotal === bTotal){ //AとBが同じマスにいるときの処理
                    removeAllChildren(eval('a'+ aTotal));
                    paragraphSame.innerText = 'B';
                    eval('a'+ aTotal).appendChild(paragraphSame); //残る文字列は「B」

                }else{
                    removeAllChildren(eval('a'+ aTotal));
                    document.getElementById(String('a'+ aTotal)).style.backgroundColor = 'white'; //Aがいなくなったマスは元の状態になる
                }

            }

            a = Math.floor(Math.random() * 6) + 1 //乱数で1~6までが出る
            removeAllChildren(NumberArea);
            number.innerText = a;
            NumberArea.appendChild(number); //出た目はNUmberAreaに表示する
            aTotal = aTotal + a;

            if(aTotal >= 50){ //Aがゴールするときの処理
                aTotal = 50;
                removeAllChildren(a50);
                paragraph50.innerText = 'Goal \n \n A' 
                a50.appendChild(paragraph50) //Goalの内容は「Goal　A」

                function Result(){
                    const result = 'Aさんが' + (aTotal - bTotal) + 'マス差で勝ちました。おめでとうございます。' //Aが先にゴールした時の表示
                    alert(result);
                };

                setTimeout(Result,1)
                document.getElementById('saikoro').disabled = true; //Aがゴールしたらサイコロは振れなくなる
            }

            else{ //Aがゴールしないときの処理
                paragraphA.innerText = 'A'
                eval('a'+ aTotal).appendChild(paragraphA); //Aのいるマスの内容は「A」
                document.getElementById(String('a'+ aTotal)).style.backgroundColor = 'yellowgreen'; //Aのいるマスは黄緑になる
            };

            turn = turn + 1; //ターンが順番になるようにするための処理
            TurnChangeToB(); //Aのターン終了後Bのターンに変わる
            return;


        //以下、Bのターンについてーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー

        }else if(turn % 2 === 0){ //trueならBのターン

            function TurnChangeToA(){ //Aのターンに変える処理
                removeAllChildren(turnArea);
                Turn.innerText = 'Aさんのターンです。'
                turnArea.appendChild(Turn);
            };

            if(bTotal === 1){ //Bがスタートするときの処理
                if(aTotal === bTotal){ //Bが先攻のとき
                    removeAllChildren('a1');
                    paragraph1.innerText = 'Start \n \n A';
                    a1.appendChild(paragraph1); //Startの内容は「Start A」
                }else{ //Bが後攻のとき
                    removeAllChildren('a1');
                    paragraph1.innerText = 'Start';
                    a1.appendChild(paragraph1); //Startの内容は「Start」
                }

            }else if(bTotal > 1 && bTotal < 50){
                if(aTotal === bTotal){ //AとBが同じマスにいるときの処理
                    removeAllChildren(eval('a'+ bTotal));
                    paragraphSame.innerText = 'A';
                    eval('a'+ bTotal).appendChild(paragraphSame); //残る文字列は「A」

                }else{
                    removeAllChildren(eval('a'+ bTotal));
                    document.getElementById(String('a'+ bTotal)).style.backgroundColor = 'white'; //Aがいなくなったマスは元の状態になる
                }
            }

            b = Math.floor(Math.random() * 6) + 1; //乱数で1~6までが出る
            removeAllChildren(NumberArea);
            number.innerText = b;
            NumberArea.appendChild(number); //出た目はNUmberAreaに表示する
            bTotal = bTotal + b;

            if(bTotal >= 50){
                bTotal = 50;
                removeAllChildren(a50);
                paragraph50.innerText = 'Goal \n \n B' 
                a50.appendChild(paragraph50) //Goalの内容は「Goal　B」

                function Result(){
                    const result = 'Bさんが' + (bTotal - aTotal) + 'マス差で勝ちました。おめでとうございます。' //Bが先にゴールした時の表示
                    alert(result);
                };

                setTimeout(Result,1);
                document.getElementById('saikoro').disabled = true; //Aがゴールしたらサイコロは振れなくなる

            }else{ //Bがゴールしないときの処理
                paragraphB.innerText = 'B';
                eval(String('a'+ bTotal)).appendChild(paragraphB); //Bのいるマスの内容は「B」
                document.getElementById(String('a'+ bTotal)).style.backgroundColor = 'pink'; //Bのいるマスはピンクになる
            };

            turn = turn + 1; //ターンが順番になるようにするための処理
            TurnChangeToA(); //Bのターン終了後Aのターンに変わる
            return;
            
        }
    }
})();
