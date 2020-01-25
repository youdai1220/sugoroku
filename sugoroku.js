(function(){
    'use strict';
    const startButton = document.getElementById('start-button');
    const saikoro = document.getElementById('saikoro');
    const NumberArea = document.getElementById('numberarea');
    const turnArea = document.getElementById('turnarea');

    var eventNumberPlus = []; //「〇マス進む」を発生させるマス
    var eventNumberMinus = []; //「〇マス戻る」を発生させるマス
    var eventNumberChange = []; //「チェンジ」を発生させるマス
    var eventNumberTwice = []; //「×2」を発生させるマス
    var eventNumberOneMore = []; //「もう一回」を発生させるマス
    var shortcut = []; //進むマス数
    var detour = []; //戻るマス数
    
    var eventCheckAfterPlus; //イベントの移動後に「〇マス進む」があるか確認する
    var eventCheckAfterMinus; //イベントの移動後に「〇マス戻る」があるか確認する
    var eventCheckAfterChange; //イベントの移動後に「チェンジ」があるか確認する
    var eventCheckAfterOneMore; //イベントの移動後に「もう一回」があるか確認する
  
    var aTotal = 1; //Aの位置
    var bTotal = 1; //Bの位置
    var turn; //A・Bのターン
    var OneMoreCheck = 0;
    var SkipCheck = 0;

    var number = document.createElement('span'); //NumberAreaの内容
    number.id = 'NumberArea'
    const numberTwice = document.createElement('span');
    numberTwice.id = 'NumberTwice'
    var Turn = document.createElement('h4'); //turnAreaの内容
    const paragraphSame = document.createElement('p'); //AとBが同じマスにいるときの内容
  
    function removeAllChildren(element){
        while (element.firstChild){
            element.removeChild(element.firstChild);
         };
      }//removeAllChlldren

    const paragraph1 = document.createElement('p'); //Startの内容
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
        turnArea.appendChild(Turn); //turnAreaにどちらのターンか表示する

        var eventNumber = []; //イベントを発生させるマス
        var eventParagraph = []; //イベントの内容
        function eventMaking( q, min, max, eventKind){
            for(var i = 0; i < q; i++){ //6マスに「〇マス進む」を発生させる
                var eventNumberRandom = Math.floor(Math.random() * (max + 1 - min)) + min; //乱数を発生させ、イベントを発生させるマスを決める
                if (eventNumber.indexOf( eventNumberRandom ) >= 0 ){ //eventNumberRandomがすでにeventNumberにある場合はやり直す
                    i = i - 1;
                    continue;
                }else{       
                    eventNumber.push( eventNumberRandom ); //eventNumberにeventNumberRandomを加える
                    eventParagraph.push(document.createElement('div')); //eventParagraphにイベントを表示するエリアをつくる

                    if(eventKind === 'plus'){
                        eventNumberPlus.push( eventNumberRandom );
                        shortcut.push( Math.floor(Math.random() * 5) + 2 ); //進むマス数を乱数で決める 
                        eventParagraph[i].innerText = shortcut[i] + 'マス進む'
                        eval('x'+ eventNumberPlus[i]).appendChild(eventParagraph[i]); //決まったイベントを記述
                        document.getElementById(String('x'+ eventNumberPlus[i])).style.backgroundColor = "rgb(148, 255, 203)";
                    }
                    else if(eventKind === 'minus'){
                        eventNumberMinus.push( eventNumberRandom );
                        detour.push( Math.floor(Math.random() * 5) + 2 ); //戻るマス数を乱数で決める 
                        eventParagraph[i + 6].innerText = detour[i] + 'マス戻る'
                        eval('x'+ eventNumberMinus[i]).appendChild(eventParagraph[i + 6]); //決まったイベントを記述
                        document.getElementById(String('x'+ eventNumberMinus[i])).style.backgroundColor = "rgb(255, 70, 77)";
                    }
                    else if(eventKind === 'change'){
                        eventNumberChange.push( eventNumberRandom );
                        eventParagraph[i + 12].innerText = 'チェンジ';
                        eval('x'+ eventNumberChange[i]).appendChild(eventParagraph[i + 12]); //決まったイベントを記述
                        document.getElementById(String('x'+ eventNumberChange[i])).style.backgroundColor = "rgb(255, 255, 0)"
                    }
                    else if(eventKind === 'twice'){
                        eventNumberTwice.push( eventNumberRandom );
                        eventParagraph[i + 15].innerText = '×2';
                        eval('x'+ eventNumberTwice[i]).appendChild(eventParagraph[i + 15]); //決まったイベントを記述
                        document.getElementById(String('x'+ eventNumberTwice[i])).style.backgroundColor = "rgb(255, 175, 80)";
                    }
                    else if(eventKind === 'onemore'){
                        eventNumberOneMore.push( eventNumberRandom );
                        eventParagraph[i + 18].innerText = 'もう一回';
                        eval('x'+ eventNumberOneMore[i]).appendChild(eventParagraph[i + 18]); //決まったイベントを記述
                        document.getElementById(String('x'+ eventNumberOneMore[i])).style.backgroundColor = "rgb(215, 215, 0)";
                    };
                };
            };
        };
        eventMaking( 6, 43, 2, 'plus');
        eventMaking( 6, 49, 8, 'minus');
        eventMaking( 3, 45, 8, 'change');
        eventMaking( 3, 40, 5, 'twice');
        eventMaking( 5, 40, 5, 'onemore');     

        document.getElementById('saikoro').disabled = false; //サイコロを振れるようにする
        document.getElementById('saikoro').style.opacity = '1.0';
        document.getElementById('start-button').disabled = true; //リスタートをできないようにする
        document.getElementById('start-button').style.backgroundColor = 'rgb(220, 225, 240)';
        document.getElementById('start-button').style.opacity = '0.4'
    };


    saikoro.onclick = () =>{ //「サイコロを振る」が押されてから処理を少し遅らせる
        document.getElementById('saikoro').disabled = true; //サイコロを振れないようにする
        document.getElementById('saikoro').style.opacity = '0.4';
        OneMoreCheck = 0;
        if(turn % 2 === 1){
            var Total1 = aTotal;
            var Total2 = bTotal;
            var Text1 = 'A';
            var Text2 = 'B';
            var color1 = 'yellowgreen';
            var color2 = 'pink';
        }else if(turn % 2 === 0){
            var Total1 = bTotal;
            var Total2 = aTotal;
            var Text1 = 'B';
            var Text2 = 'A';
            var color1 = 'pink';
            var color2 = 'yellowgreen';
        };
        setTimeout(function(){
            dice(Total1, Total2, Text1, Text2, color1, color2);
        }, 300);
    };

    function dice(Total1, Total2, Text1, Text2, color1, color2){
        if(Total1 === 1){
            if(Total1 === Total2){ 
                removeAllChildren('a1');
                paragraph1.innerText = 'Start \n \n' + Text2;
                a1.appendChild(paragraph1);
            }else{
                removeAllChildren('a1');
                paragraph1.innerText = 'Start';
                a1.appendChild(paragraph1); //Startの内容は「Start」
            };

        }else if(Total1 > 1 && Total1 < 50){
            if(Total1 === Total2){
                removeAllChildren(eval('a'+ Total1));
                paragraphSame.innerText = Text2;
                eval('a'+ Total1).appendChild(paragraphSame);
            }else{
                removeAllChildren(eval('a'+ Total1));
                document.getElementById(String('a'+ Total1)).style.backgroundColor = 'white'; //誰もいなくなったマスは元の状態になる
            };
        };

        removeAllChildren(NumberArea);
        var random = Math.floor(Math.random() * 6) + 1; //乱数で1~6までが出る
        var eventCheckTwice = eventNumberTwice.indexOf( Total1 );
        if( eventCheckTwice >= 0){
            Total1 = Total1 + ( random * 2 );
            number.innerText = random;
            numberTwice.innerText = ' ×2';
            NumberArea.appendChild(number); //出た目はNumberAreaに表示する
            NumberArea.appendChild(numberTwice);
        }else{
            Total1 = Total1 + random;
            number.innerText = random;
            NumberArea.appendChild(number); //出た目はNumberAreaに表示する
        };

        if(Total1 >= 50){
            Total1 = 50;
            removeAllChildren(a50);
            const paragraph50 = document.createElement('p'); //Goalの内容
            paragraph50.innerText = 'Goal \n \n' + Text1; 
            a50.appendChild(paragraph50);

            removeAllChildren(turnArea);
            Turn.innerText = Text1 + 'さんの勝利です。';
            turnArea.appendChild(Turn);

            function Result(){
                const result = Text1 + 'さんが' + (Total1 - Total2) + 'マス差で勝ちました。おめでとうございます。\nリスタートする場合はOKをクリックしてください。';
                var restart = confirm(result); //リスタートしてもよいか確認
                if(restart){ //OKが入力されればページをリロード
                    location.reload();
                };
            };

            setTimeout(Result, 1000)
            document.getElementById('saikoro').disabled = true;
            return;
        }
        else{
            const paragraph = document.createElement('p'); 
            if(Total1 === Total2){
                removeAllChildren(eval('a'+ Total1));
                paragraph.innerText = 'A　B';
            }else{
                paragraph.innerText = Text1;
            };
            eval('a'+ Total1).appendChild(paragraph);
            document.getElementById(String('a'+ Total1)).style.backgroundColor = color1;

            var eventCheckPlus = eventNumberPlus.indexOf( Total1 ); 
            var eventCheckMinus = eventNumberMinus.indexOf( Total1 ); 
            var eventCheckChange = eventNumberChange.indexOf( Total1 );
            var eventCheckOneMore = eventNumberOneMore.indexOf( Total1 );          
            if( eventCheckPlus >= 0 || eventCheckMinus >= 0 || eventCheckChange >= 0 || eventCheckOneMore >= 0 ){
                    
                var event = () => {
                    removeAllChildren(NumberArea); //NumberAreaの表示を消す
                
                    if(eventCheckOneMore >= 0){
                        number.innerText = 'もう一回'
                        NumberArea.appendChild(number);
                        OneMoreCheck = 1;                  
                    };

                    if(eventCheckChange >= 0 && Total1 !== Total2){ //「チェンジ」で、AとBが違うマスにいるとき
                        number.innerText = 'チェンジ' //NumberAreaの表示を「チェンジ」に変える
                        NumberArea.appendChild(number);

                        removeAllChildren(eval('a'+ Total1));
                        removeAllChildren(eval('a'+ Total2));
                        document.getElementById(String('a'+ Total1)).style.backgroundColor = color2;
                        document.getElementById(String('a'+ Total2)).style.backgroundColor = color1;

                        const Before = Total1;
                        Total1 = Total2;
                        Total2 = Before;
    
                        const paragraph = document.createElement('p');
                        paragraph.innerText = Text1;
                        eval('a'+ Total1).appendChild(paragraph);

                        const paragraph2 = document.createElement('p');
                        paragraph2.innerText = Text2;
                        eval('a'+ Total2).appendChild(paragraph2);
                    };

                    if( eventCheckPlus >= 0 || eventCheckMinus >= 0){ //「〇マス進む」か「〇マス戻る」のとき
                        if(Total1 === Total2){ //AとBが同じマスにいる場合
                            removeAllChildren(eval('a'+ Total1));
                            const paragraph = document.createElement('p');
                            paragraph.innerText = Text2;
                            eval('a'+ Total1).appendChild(paragraph);
                            document.getElementById(String('a'+ aTotal)).style.backgroundColor = color2;
                        }
                        else{ //AとBが違うマスにいる場合
                            removeAllChildren(eval('a'+ Total1));
                            document.getElementById(String('a'+ Total1)).style.backgroundColor = 'white'; //誰も居なくなったマスは白くする
                        };
                    };

                    if( eventCheckPlus >= 0 ){ //「〇マス進む」のとき
                        number.innerText = shortcut[eventCheckPlus] + 'マス進む'; //NumberAreaの表示を「〇マス進む」に変える
                        Total1 = Total1 + shortcut[eventCheckPlus];
                        NumberArea.appendChild(number);
    
                    }else if( eventCheckMinus >= 0){ //「〇マス戻る」のとき
                        number.innerText = detour[eventCheckMinus] + 'マス戻る'; //NumberAreaの表示を「〇マス戻る」に変える
                        Total1 = Total1 - detour[eventCheckMinus];
                        NumberArea.appendChild(number);
                    };

                    if( eventCheckPlus >= 0 || eventCheckMinus >= 0 ){
                        if(Total1 === Total2){
                            const paragraph = document.createElement('p');
                            removeAllChildren(eval('a'+ Total1));
                            paragraph.innerText = 'A　B';
                            eval('a'+ Total1).appendChild(paragraph);
                        }else{
                            const paragraph = document.createElement('p');
                            paragraph.innerText = Text1;
                            eval('a'+ Total1).appendChild(paragraph);
                        };
                        document.getElementById(String('a'+ Total1)).style.backgroundColor = color1;
                    };

                    eventCheckAfterPlus = eventNumberPlus.indexOf( Total1 );
                    eventCheckAfterMinus = eventNumberMinus.indexOf( Total1 );
                    eventCheckAfterChange = eventNumberChange.indexOf( Total1 );
                    eventCheckAfterOneMore = eventNumberOneMore.indexOf( Total1 );
                    if( eventCheckAfterPlus >= 0 || eventCheckAfterMinus >= 0 || eventCheckAfterChange >= 0 || eventCheckAfterOneMore >= 0 ){
                        document.getElementById(String('x'+ Total1)).style.backgroundColor = "rgb(255, 230, 245)";
                        document.getElementById(String('x'+ Total1)).style.color = "rgb(0, 255, 0)";
                    };

                }; 
                setTimeout(event, 500); //処理を0.5秒遅らせる
            };
        };

        var turnChange = () => {
            if( eventCheckAfterPlus >= 0){
                document.getElementById(String('x'+ eventNumberPlus[eventCheckAfterPlus])).style.backgroundColor = "rgb(148, 255, 203)";
                document.getElementById(String('x'+ eventNumberPlus[eventCheckAfterPlus])).style.color = "black";
            }else if( eventCheckAfterMinus >= 0){
                document.getElementById(String('x'+ eventNumberMinus[eventCheckAfterMinus])).style.backgroundColor = "rgb(255, 70, 77)";
                document.getElementById(String('x'+ eventNumberMinus[eventCheckAfterMinus])).style.color = "black";
            }else if( eventCheckAfterChange >= 0){
                document.getElementById(String('x'+ eventNumberChange[eventCheckAfterChange])).style.backgroundColor = "rgb(255, 255, 0)";
                document.getElementById(String('x'+ eventNumberChange[eventCheckAfterChange])).style.color = "black";
            }else if( eventCheckAfterOneMore >= 0){
                document.getElementById(String('x'+ eventNumberOneMore[eventCheckAfterOneMore])).style.backgroundColor = "rgb(215, 215, 0)";
                document.getElementById(String('x'+ eventNumberOneMore[eventCheckAfterOneMore])).style.color = "black";
            };

            if(turn % 2 === 1){
                aTotal = Total1;
                bTotal = Total2
            }else if(turn % 2 === 0){
                bTotal = Total1;
                aTotal = Total2        
            };

            if(OneMoreCheck === 0){
                removeAllChildren(turnArea);
                Turn.innerText = Text2 + 'さんのターンです。'
                turnArea.appendChild(Turn);
                turn = turn + 1;
            };

            document.getElementById('saikoro').disabled = false; //サイコロを振れるようにする
            document.getElementById('saikoro').style.opacity = '1.0';
            return;
        };
        setTimeout(turnChange, 1000);
    };
})();
