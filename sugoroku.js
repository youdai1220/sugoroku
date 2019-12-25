(function(){
    'use strict';
    const saikoro = document.getElementById('saikoro'); 
    const turnArea = document.getElementById('turnarea');
    const resultArea = document.getElementById('result-area');
    document.getElementById('a1').style.backgroundColor = 'skyblue';
    document.getElementById('a50').style.backgroundColor = 'orange';

    var a = 1; //Aの位置
    var b = 1; //Bの位置
    var turn = 1; //A・Bのターン

    const paragraph1 = document.createElement('p'); //Startの内容
    const paragraphSame = document.createElement('p'); //AとBが同じマスにいるときの内容
    const paragraphA = document.createElement('p'); //Aがいるマスの内容
    const paragraphB = document.createElement('p'); //Bがいるマスの内容   
    const paragraph50 = document.createElement('p'); //Goalの内容
    const result = document.createElement('h4'); //resultの内容

    function removeAllChildren(element){
        while (element.firstChild){
            element.removeChild(element.firstChild);
         };
      }//removeAllChlldren

    paragraph1.innerText = 'Start \n \n A B';
    a1.appendChild(paragraph1) //スタート時のStartの内容

    const Turn = document.createElement('p');
    Turn.innerText = 'Aさんのターンです。'
    turnArea.appendChild(Turn); //最初のターンはAから

    saikoro.onclick = () =>{ //ボタンを押したときの処理

        function TurnChangeToB(){ //Bのターンに変える処理
            removeAllChildren(turnArea);
            Turn.innerText = 'Bさんのターンです。'
            turnArea.appendChild(Turn);
        };

        if(turn % 2 === 1){ //trueならAさんのターン
            if(a === 1){ //Aがスタートするときの処理
                paragraph1.innerText = 'Start \n \n B';
                a1.appendChild(paragraph1); //Startマスに残る文字列は「Start  B」

            }else if(a > 1 && a < 50){ //Aの二回目以降のターンの処理
                if(a === b){ //AとBが同じマスにいるときの処理
                    removeAllChildren(eval('a'+ a));
                    paragraphSame.innerText = 'B';
                    eval('a'+ a).appendChild(paragraphSame); //残る文字列は「B」

                }else{
                    removeAllChildren(eval('a'+ a));
                    document.getElementById(String('a'+ a)).style.backgroundColor = 'white'; //Aがいなくなったマスは元の状態になる
                }

            }

            a = a + Math.floor(Math.random()*6)+1 //乱数で1~6までが出る
            if(a >= 50){
                a = 50;
                removeAllChildren(a50);
                paragraph50.innerText = 'Goal \n \n A' 
                a50.appendChild(paragraph50) //Goalの内容は「Goal　A」

                result.innerText = 'Aさんが' + (a - b) + 'マス差で勝ちました。おめでとうございます。'
                resultArea.appendChild(result);

                document.getElementById('saikoro').disabled = true;
            }

            else{ //AもBもゴールしていないときの処理
                paragraphA.innerText = 'A'
                eval('a'+ a).appendChild(paragraphA) //Aのいるマスの内容は「A」
                document.getElementById(String('a'+ a)).style.backgroundColor = 'yellowgreen'; //Aのいるマスは黄緑になる
            };

            if(b !== 50){
                turn = turn + 1; //ターンが順番になるようにするための処理
                TurnChangeToB();
                return;
            }else if(b === 50){
                return;
            }

        }else if(turn % 2 === 0){ //trueならBのターン

            function TurnChangeToA(){ //Bのターンに変える処理
                removeAllChildren(turnArea);
                Turn.innerText = 'Aさんのターンです。'
                turnArea.appendChild(Turn);
            };

            if(b === 1){
                paragraph1.innerText = 'Start';
                a1.appendChild(paragraph1);

            }else if(b > 1 && b < 50){
                if(a === b){ //AとBが同じマスにいるときの処理
                    removeAllChildren(eval('a'+ b));
                    paragraphSame.innerText = 'A';
                    eval('a'+ b).appendChild(paragraphSame); 

                }else{
                    removeAllChildren(eval('a'+ b));
                    document.getElementById(String('a'+ b)).style.backgroundColor = 'white';
                }
            }

            b = b + Math.floor(Math.random()*6)+1
            if(b >= 50){
                b = 50;
                removeAllChildren(a50);
                paragraph50.innerText = 'Goal \n \n B' 
                a50.appendChild(paragraph50) //Goalの内容は「Goal　B」

                result.innerText = 'Bさんが' + (b - a) + 'マス差で勝ちました。おめでとうございます。'
                resultArea.appendChild(result);

                document.getElementById('saikoro').disabled = true;
            }else{
                paragraphB.innerText = 'B'
                eval(String('a'+ b)).appendChild(paragraphB)
                document.getElementById(String('a'+ b)).style.backgroundColor = 'pink';
            };

            if(a !== 50){
                turn = turn + 1; //ターンが順番になるようにするための処理
                TurnChangeToA();
                return;
            }else if(a === 50){
                return;
            }

        }
    }
})();
