(function(){
    'use strict';
    const startButton = document.getElementById('start-button');
    const saikoro = document.getElementById('saikoro'); 
    const NumberArea = document.getElementById('numberarea');
    const turnArea = document.getElementById('turnarea');
    document.getElementById('a1').style.backgroundColor = 'skyblue';
    document.getElementById('a50').style.backgroundColor = 'orange';

    var eventNumber; //イベントを発生させるマス
    var shortcut;
    var aTotal = 1; //Aの位置
    var bTotal = 1; //Bの位置
    var turn; //A・Bのターン

    var number = document.createElement('h1'); //NumberAreaの内容
    var Turn = document.createElement('h4'); //turnAreaの内容
    var eventParagraph = document.createElement('div'); //eventの内容(x1 ~ x50)
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

    startButton.onclick = () => { //先攻・後攻を決め、イベントを発生させる
        var x = Math.random(); //xとyという2つの乱数を発生させる
        var y = Math.random();
        if(x > y){ //x > yの場合、Aが先攻
            turn = 1;
            Turn.innerText = 'Aさんのターンです。'
        }else if(y > x){ //y > xの場合、Bが先攻
            turn = 2;
            Turn.innerText = 'Bさんのターンです。'
        }
        turnArea.appendChild(Turn); 

        eventNumber = Math.floor(Math.random() * 46) + 2; //乱数を発生させ、ランダムにイベントを発生させる
        shortcut = Math.floor(Math.random() * 4) + 2; 
        eventParagraph.innerText = shortcut + 'マス進む'
        eval('x'+ eventNumber).appendChild(eventParagraph);

        document.getElementById('saikoro').disabled = false; //サイコロを振れるようにする
        document.getElementById('start-button').disabled = true; //リスタートをできないようにする
    }


    saikoro.onclick = () =>{ //「サイコロを振る」が押されてから処理を少し遅らせる
        document.getElementById('saikoro').disabled = true; //サイコロを振れないようにする
        setTimeout(dice, 300);
    };

    function dice(){ //「サイコロを振る」を押したときの処理
        if(turn % 2 === 1){ //trueならAさんのターン

            function TurnChangeToB(){ //Bのターンに変える処理
                removeAllChildren(turnArea);
                Turn.innerText = 'Bさんのターンです。'
                turnArea.appendChild(Turn);
                document.getElementById('saikoro').disabled = false; //サイコロを振れるようにする
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

            removeAllChildren(NumberArea);
            var a = Math.floor(Math.random() * 6) + 1 //乱数で1~6までが出る
            number.innerText = a;
            aTotal = aTotal + a;
            NumberArea.appendChild(number); //出た目はNumberAreaに表示する

            if(aTotal >= 50){ //Aがゴールするときの処理
                aTotal = 50;
                removeAllChildren(a50);
                paragraph50.innerText = 'Goal \n \n A' 
                a50.appendChild(paragraph50) //Goalの内容は「Goal　A」

                removeAllChildren(turnArea);
                Turn.innerText = 'Aさんの勝利です。'
                turnArea.appendChild(Turn);

                function Result(){
                    const result = 'Aさんが' + (aTotal - bTotal) + 'マス差で勝ちました。おめでとうございます。\nリスタートする場合はOKをクリックしてください。' //Aが先にゴールした時の表示
                    var restart = confirm(result); //リスタートしてもよいか確認
                    if(restart){ //OKが入力されればページをリロード
                        location.reload();
                    }
                };

                setTimeout(Result,10)
                document.getElementById('saikoro').disabled = true; //Aがゴールしたらサイコロは振れなくなる
                return;
            }

            else{ //Aがゴールしないときの処理
                paragraphA.innerText = 'A'
                eval('a'+ aTotal).appendChild(paragraphA); //Aのいるマスの内容は「A」
                document.getElementById(String('a'+ aTotal)).style.backgroundColor = 'yellowgreen'; //Aのいるマスは黄緑になる

                if(aTotal === eventNumber){
                    var event = () => {
                        removeAllChildren(NumberArea);
                        number.innerText = shortcut + 'マス進む';
                        NumberArea.appendChild(number);

                        removeAllChildren(eval('a'+ aTotal));
                        document.getElementById(String('a'+ aTotal)).style.backgroundColor = 'white';
                        aTotal = aTotal + shortcut;

                        paragraphA.innerText = 'A';
                        eval('a'+ aTotal).appendChild(paragraphA);
                        document.getElementById(String('a'+ aTotal)).style.backgroundColor = 'yellowgreen';
                    }
                    setTimeout(event, 500);
                }
                turn = turn + 1; //ターンが順番になるようにするための処理
                TurnChangeToB(); //Aのターン終了後Bのターンに変わる
                return;
            };

        //以下、Bのターンについてーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー

        }else if(turn % 2 === 0){ //trueならBのターン

            function TurnChangeToA(){ //Aのターンに変える処理
                removeAllChildren(turnArea);
                Turn.innerText = 'Aさんのターンです。'
                turnArea.appendChild(Turn);
                document.getElementById('saikoro').disabled = false; //サイコロを振れるようにする
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
                    document.getElementById(String('a'+ bTotal)).style.backgroundColor = 'white'; //Bがいなくなったマスは元の状態になる
                }
            }

            removeAllChildren(NumberArea);
            var b = Math.floor(Math.random() * 6) + 1; //乱数で1~6までが出る
            number.innerText = b;
            bTotal = bTotal + b;
            NumberArea.appendChild(number); //出た目はNUmberAreaに表示する

            if(bTotal >= 50){ //Bがゴールするときの処理
                bTotal = 50;
                removeAllChildren(a50);
                paragraph50.innerText = 'Goal \n \n B' 
                a50.appendChild(paragraph50) //Goalの内容は「Goal　B」

                removeAllChildren(turnArea);
                Turn.innerText = 'Bさんの勝利です。'
                turnArea.appendChild(Turn);

                function Result(){
                    const result = 'Bさんが' + (bTotal - aTotal) + 'マス差で勝ちました。おめでとうございます。\nリスタートする場合はOKをクリックしてください。' //Bが先にゴールした時の表示
                    var restart = confirm(result); //リスタートしてもよいか確認
                    if (restart){ //OKが入力されればページをリロード
                        location.reload();
                    };
                };

                setTimeout(Result,10);
                document.getElementById('saikoro').disabled = true; //Aがゴールしたらサイコロは振れなくなる
                return;

            }else{ //Bがゴールしないときの処理
                paragraphB.innerText = 'B';
                eval(String('a'+ bTotal)).appendChild(paragraphB); //Bのいるマスの内容は「B」
                document.getElementById(String('a'+ bTotal)).style.backgroundColor = 'pink'; //Bのいるマスはピンクになる

                if(bTotal === eventNumber){
                    var event = () => {
                        removeAllChildren(NumberArea);
                        number.innerText = shortcut + 'マス進む';
                        NumberArea.appendChild(number);

                        removeAllChildren(eval('a'+ bTotal));
                        document.getElementById(String('a'+ bTotal)).style.backgroundColor = 'white';
                        bTotal = bTotal + shortcut;

                        paragraphB.innerText = 'B';
                        eval('a'+ bTotal).appendChild(paragraphB);
                        document.getElementById(String('a'+ bTotal)).style.backgroundColor = 'pink';
                    }
                    setTimeout(event, 500);
                }
            
                turn = turn + 1; //ターンが順番になるようにするための処理
                TurnChangeToA(); //Bのターン終了後Aのターンに変わる
                return;
            };

        }
    }
})();
