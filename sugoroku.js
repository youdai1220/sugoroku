(function(){
    'use strict';
    const saikoro = document.getElementById('saikoro'); 
    const turnArea = document.getElementById('turnarea');
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

    saikoro.onclick = () => { //ボタンを押したときの処理
        if(turn % 2 === 1){ //trueならAさんのターン
            turn = turn + 1; //ターンが順番になるようにするための処理
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

            }else if(a === 50){ //すでにゴールしている場合はBのターンに変わる
                removeAllChildren(turnArea);
                Turn.innerText = 'Bさんのターンです。'
                turnArea.appendChild(Turn);
                return;
            }

            a = a + Math.floor(Math.random()*6)+1 //乱数で1~6までが出る
            if(a >= 50 && b < 50){ //Aがゴールし、Bがまだゴールしていないときの処理
                a = 50;
                removeAllChildren(a50);
                paragraph50.innerText = 'Goal \n \n A' 
                a50.appendChild(paragraph50) //Goalの内容は「Goal　A」

            }else if(a >= 50 && b === 50){ //Aがゴールし、Bがすでにゴールしているときの処理
                a = 50;
                removeAllChildren(a50);
                paragraph50.innerText = 'Goal \n \n A B'
                a50.appendChild(paragraph50) //Goalの内容は「Goal　A　B」
            }else{ //AもBもゴールしていないときの処理
                paragraphA.innerText = 'A'
                eval('a'+ a).appendChild(paragraphA) //Aのいるマスの内容は「A」
                document.getElementById(String('a'+ a)).style.backgroundColor = 'yellowgreen'; //Aのいるマスは黄緑になる
            };

            removeAllChildren(turnArea); //Aのターン終了後に表示が変わる
            Turn.innerText = 'Bさんのターンです。'
            turnArea.appendChild(Turn);

        }else if(turn % 2 === 0){ //trueならBのターン
            turn = turn + 1;
            if(b === 1){
                paragraph1.innerText = 'Start';
                a1.appendChild(paragraph1);

            }else if(b > 1 && b < 50){
                if(a === b){ //AとBが同じマスにいるときの処理
                    removeAllChildren(eval('a'+ b));
                    paragraphSame.innerText = 'A';
                    eval('a'+ b).appendChild(paragraphSame); 

                }else{
                    removeAllChildren(eval(String('a'+ b)));
                    document.getElementById(String('a'+ b)).style.backgroundColor = 'white';
                }

            }else if(b === 50){
                removeAllChildren(turnArea);
                Turn.innerText = 'Aさんのターンです。'
                turnArea.appendChild(Turn);
                return;
            }

            b = b + Math.floor(Math.random()*6)+1
            if(b >= 50 && a < 50){
                b = 50;
                paragraph50.innerText = 'B'
                a50.appendChild(paragraph50)

            }else if(b >= 50 && a === 50){
                b = 50;
                removeAllChildren(a50);
                paragraph50.innerText = 'Goal \n \n A B'       
                a50.appendChild(paragraph50)         

            }else{
                paragraphB.innerText = 'B'
                eval(String('a'+ b)).appendChild(paragraphB)
                document.getElementById(String('a'+ b)).style.backgroundColor = 'pink';
            };

            removeAllChildren(turnArea);
            Turn.innerText = 'Aさんのターンです。'
            turnArea.appendChild(Turn);
        }
    }
})();
