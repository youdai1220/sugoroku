(function(){
    'use strict';
    const startButton = document.getElementById('start-button');
    const saikoro = document.getElementById('saikoro'); 
    const NumberArea = document.getElementById('numberarea');
    const turnArea = document.getElementById('turnarea');

    var eventNumber = []; //イベントを発生させるマス
    var eventNumberPlus = []; //「〇マス進む」を発生させるマス
    var eventNumberMinus = []; //「〇マス戻る」を発生させるマス
    var eventNumberChange = []; //「チェンジ」を発生させるマス
    var shortcut = []; //進むマス数
    var detour = []; //戻るマス数
    var eventParagraphPlus = []; //「〇マス進む」の内容(x2 ~ x43)
    var eventParagraphMinus = []; //「〇マス戻る」の内容(x7 ~ x49)
    var eventParagraphChange = []; //「チェンジ」の内容(x11 ~ x40)
    var eventCheckAfterPlusA; //Aにおいてイベントの移動後に「〇マス進む」があるか確認する
    var eventCheckAfterMinusA; //Aにおいてイベントの移動後に「〇マス戻る」があるか確認する
    var eventCheckAfterChangeA; //Aにおいてイベントの移動後に「チェンジ」があるか確認する
    var eventCheckAfterPlusB; //Bにおいてイベントの移動後に「〇マス進む」があるか確認する
    var eventCheckAfterMinusB; //Bにおいてイベントの移動後に「〇マス戻る」があるか確認する
    var eventCheckAfterChangeB; //Bにおいてイベントの移動後に「チェンジ」があるか確認する

    var aTotal = 1; //Aの位置
    var bTotal = 1; //Bの位置
    var turn; //A・Bのターン

    var number = document.createElement('h1'); //NumberAreaの内容
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

        for(var i = 0; i < 12; i++){ //5マスに「〇マス進む」を発生させる
            var eventNumberPlusRandom = Math.floor(Math.random() * 42) + 2; //乱数を発生させ、イベントを発生させるマスを決める
            if (eventNumber.indexOf( eventNumberPlusRandom ) >= 0 ){ //eventNumberPlusRandomがすでにeventNumberにある場合はやり直す
                i = i - 1;
                continue;
            }else{
                eventNumber.push( eventNumberPlusRandom );
                eventNumberPlus.push( eventNumberPlusRandom ); //乱数を発生させ、適当なマスにイベントを発生させる;
                shortcut.push( Math.floor(Math.random() * 5) + 2 ); //進むマス数を乱数で決める 
                eventParagraphPlus.push (document.createElement('div')); 
                eventParagraphPlus[i].innerText = shortcut[i] + 'マス進む'
                eval('x'+ eventNumberPlus[i]).appendChild(eventParagraphPlus[i]); //決まったイベントを記述
                document.getElementById(String('x'+ eventNumberPlus[i])).style.backgroundColor = "rgb(148, 255, 203)";
            };
        };
        for(var q = 0; q < 12; q++){ //5マスに「〇マス戻る」を発生させる
            var eventNumberMinusRandom = Math.floor(Math.random() * 42) + 8; //乱数を発生させ、イベントを発生させるマスを決める
            if (eventNumber.indexOf( eventNumberMinusRandom ) >= 0){ //eventNumberMinusRandomがすでにeventNumberにある場合はやり直す
                q = q - 1;
                continue;
            }else{
                eventNumber.push( eventNumberMinusRandom );
                eventNumberMinus.push( eventNumberMinusRandom ); //乱数を発生させ、適当なマスにイベントを発生させる
                detour.push( Math.floor(Math.random() * 5) + 2 ); //戻るマス数を乱数で決める 
                eventParagraphMinus.push (document.createElement('div')); 
                eventParagraphMinus[q].innerText = detour[q] + 'マス戻る'
                eval('x'+ eventNumberMinus[q]).appendChild(eventParagraphMinus[q]); //決まったイベントを記述
                document.getElementById(String('x'+ eventNumberMinus[q])).style.backgroundColor = "rgb(255, 70, 77)";
            };
        };
        for(var r = 0; r < 12; r++){ //2マスに「チェンジ」を発生させる
            var eventNumberChangeRandom = Math.floor(Math.random() * 30) + 11;
            if (eventNumber.indexOf( eventNumberChangeRandom ) >= 0 ){ //eventNumberChangeRandomがすでにeventNumberにある場合はやり直す
                r = r - 1;
                continue;
            }else{
                eventNumber.push( eventNumberChangeRandom );
                eventNumberChange.push( eventNumberChangeRandom ); //乱数を発生させ、適当なマスにイベントを発生させる
                eventParagraphChange.push (document.createElement('div'));
                eventParagraphChange[r].innerText = 'チェンジ';
                eval('x'+ eventNumberChange[r]).appendChild(eventParagraphChange[r]); //決まったイベントを記述
                document.getElementById(String('x'+ eventNumberChange[r])).style.backgroundColor = "rgb(255, 255, 0)"
            }
        }

        document.getElementById('saikoro').disabled = false; //サイコロを振れるようにする
        document.getElementById('start-button').disabled = true; //リスタートをできないようにする
    }


    saikoro.onclick = () =>{ //「サイコロを振る」が押されてから処理を少し遅らせる
        document.getElementById('saikoro').disabled = true; //サイコロを振れないようにする
        setTimeout(dice, 300);
    };

    function dice(){ //「サイコロを振る」を押したときの処理
        if(turn % 2 === 1){ //trueならAさんのターン

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
                if(aTotal === bTotal){
                    removeAllChildren(eval('a'+ aTotal));
                    paragraphA.innerText = 'A　B';
                }else{
                    paragraphA.innerText = 'A'
                };
                eval('a'+ aTotal).appendChild(paragraphA); //Aのいるマスの内容は「A」
                document.getElementById(String('a'+ aTotal)).style.backgroundColor = 'yellowgreen'; //Aのいるマスは黄緑になる

                var eventCheckPlus = eventNumberPlus.indexOf( aTotal ); 
                var eventCheckMinus = eventNumberMinus.indexOf( aTotal ); 
                var eventCheckChange = eventNumberChange.indexOf( aTotal );
                if( eventCheckPlus >= 0 || eventCheckMinus >= 0 || eventCheckChange >= 0){ //Aの止まったマスに「〇マス進む」または「〇マス戻る」または「チェンジ」があった場合の処理
                    
                var event = () => {
                    removeAllChildren(NumberArea); //NumberAreaの表示を消す

                    if(aTotal === bTotal){ //AとBが同じマスにいる場合
                        if( eventCheckPlus >= 0 || eventCheckMinus >= 0){ //「〇マス進む」か「〇マス戻る」のとき
                            removeAllChildren(eval('a'+ aTotal));
                            paragraphB.innerText = 'B';
                            eval('a'+ aTotal).appendChild(paragraphB);
                            document.getElementById(String('a'+ aTotal)).style.backgroundColor = 'pink'; //Aの居なくなったマスはピンクにする
                        };
                    }else{ //AとBが違うマスにいる場合
                        if( eventCheckPlus >= 0 || eventCheckMinus >= 0){ //「〇マス進む」か「〇マス戻る」のとき
                            removeAllChildren(eval('a'+ aTotal));
                            document.getElementById(String('a'+ aTotal)).style.backgroundColor = 'white'; //Aの居なくなったマスは白くする
                        }else if(eventCheckChange >= 0){ //「チェンジ」のとき
                            removeAllChildren(eval('a'+ aTotal));
                            removeAllChildren(eval('a'+ bTotal));
                            document.getElementById(String('a'+ aTotal)).style.backgroundColor = 'pink'; //もともとAがいたマスはピンクにする
                            document.getElementById(String('a'+ bTotal)).style.backgroundColor = 'yellowgreen'; //もともとBがいたマスは黄緑にする
                        };
                    };

                    if( eventCheckPlus >= 0 ){ //「〇マス進む」のとき
                        number.innerText = shortcut[eventCheckPlus] + 'マス進む'; //NumberAreaの表示を「〇マス進む」に変える
                        aTotal = aTotal + shortcut[eventCheckPlus];

                    }else if( eventCheckMinus >= 0){ //「〇マス戻る」のとき
                        number.innerText = detour[eventCheckMinus] + 'マス戻る'; //NumberAreaの表示を「〇マス戻る」に変える
                        aTotal = aTotal - detour[eventCheckMinus];

                    }else if( eventCheckChange >= 0){ //「チェンジ」のとき
                        number.innerText = 'チェンジ' //NumberAreaの表示を「チェンジ」に変える
                        var aBefore = aTotal;
                        aTotal = bTotal;
                        bTotal = aBefore;

                        paragraphA.innerText = 'A';
                        paragraphB.innerText = 'B';
                        eval('a'+ aTotal).appendChild(paragraphA);
                        eval('a'+ bTotal).appendChild(paragraphB);
                    };
                    NumberArea.appendChild(number);
                    eventCheckAfterA();

                    function eventCheckAfterA() { //移動先にイベントがある場合はマスの色を変える
                        eventCheckAfterPlusA = eventNumberPlus.indexOf( aTotal );
                        eventCheckAfterMinusA = eventNumberMinus.indexOf( aTotal );
                        eventCheckAfterChangeA = eventNumberChange.indexOf( aTotal );
                        if( eventCheckAfterPlusA >= 0 || eventCheckAfterMinusA >= 0 || eventCheckAfterChangeA >= 0 ){
                            document.getElementById(String('x'+ aTotal)).style.backgroundColor = "rgb(255, 230, 245)";
                            document.getElementById(String('x'+ aTotal)).style.color = "rgb(0, 255, 0)";
                        };
                    };

                    if( eventCheckPlus >= 0 || eventCheckMinus >= 0 ){
                        if(aTotal === bTotal){
                            removeAllChildren(eval('a'+ aTotal))
                            paragraphA.innerText = 'A　B';
                        }else{
                            paragraphA.innerText = 'A';
                        };
                    };
                        eval('a'+ aTotal).appendChild(paragraphA);
                        document.getElementById(String('a'+ aTotal)).style.backgroundColor = 'yellowgreen'; //Aが移動したあとのマスは黄緑にする
                };
                    setTimeout(event, 500); //処理を少し遅らせる
                };

                var turnChangeToB = () => {
                    turn = turn + 1; //ターンが順番になるようにするための処理
                    removeAllChildren(turnArea);
                    Turn.innerText = 'Bさんのターンです。' //Aのターン終了後Bのターンに変わる
                    turnArea.appendChild(Turn);

                    if( eventNumber.indexOf(aTotal) >= 0){ //マスの色をもとに戻す
                        if( eventCheckAfterPlusA >= 0){
                            document.getElementById(String('x'+ eventNumberPlus[eventCheckAfterPlusA])).style.backgroundColor = "rgb(148, 255, 203)";
                            document.getElementById(String('x'+ eventNumberPlus[eventCheckAfterPlusA])).style.color = "black";
                        }else if( eventCheckAfterMinusA >= 0){
                            document.getElementById(String('x'+ eventNumberMinus[eventCheckAfterMinusA])).style.backgroundColor = "rgb(255, 70, 77)";
                            document.getElementById(String('x'+ eventNumberMinus[eventCheckAfterMinusA])).style.color = "black";
                        }else if( eventCheckAfterChangeA >= 0){
                            document.getElementById(String('x'+ eventNumberChange[eventCheckAfterChangeA])).style.backgroundColor = "rgb(255, 255, 0)";
                            document.getElementById(String('x'+ eventNumberChange[eventCheckAfterChangeA])).style.color = "black";
                        };
                    };

                    document.getElementById('saikoro').disabled = false; //サイコロを振れるようにする
                    return;
                };
                setTimeout(turnChangeToB, 1000);
            };

        //以下、Bのターンについてーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー

        }else if(turn % 2 === 0){ //trueならBのターン

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
                if(aTotal === bTotal){
                    removeAllChildren(eval('a'+ bTotal));
                    paragraphB.innerText = 'A　B';
                }else{
                    paragraphB.innerText = 'B'
                }
                eval(String('a'+ bTotal)).appendChild(paragraphB); //Bのいるマスの内容は「B」
                document.getElementById(String('a'+ bTotal)).style.backgroundColor = 'pink'; //Bのいるマスはピンクになる

                var eventCheckPlus = eventNumberPlus.indexOf( bTotal ); 
                var eventCheckMinus = eventNumberMinus.indexOf( bTotal ); 
                if( eventCheckPlus >= 0 || eventCheckMinus >= 0){ //Bの止まったマスに「〇マス進む」または「〇マス戻る」があった場合の処理
                    var event = () => {
                        removeAllChildren(NumberArea); //NumberAreaの表示を消す
                        removeAllChildren(eval('a'+ bTotal));
                        if(aTotal === bTotal){ //AとBが同じマスにいる場合
                            paragraphA.innerText = 'A';
                            eval('a'+ bTotal).appendChild(paragraphA);
                            document.getElementById(String('a'+ bTotal)).style.backgroundColor = 'yellowgreen'; //Bの居なくなったマスは黄緑にする
                        }else{ //AとBが違うマスにいる場合
                            document.getElementById(String('a'+ bTotal)).style.backgroundColor = 'white'; //Bの居なくなったマスは白くする
                        };

                        if( eventNumberPlus.indexOf( bTotal ) >= 0 ){ //「〇マス進む」のとき
                            number.innerText = shortcut[eventCheckPlus] + 'マス進む'; //NumberAreaの表示を「〇マス進む」に変える
                            bTotal = bTotal + shortcut[eventCheckPlus];
                        }else if(eventNumberMinus.indexOf( bTotal ) >= 0){ //「〇マス戻る」のとき
                            number.innerText = detour[eventCheckMinus] + 'マス戻る'; //NumberAreaの表示を「〇マス戻る」に変える
                            bTotal = bTotal - detour[eventCheckMinus];
                        };
                        NumberArea.appendChild(number);

                        eventCheckAfterPlusB = eventNumberPlus.indexOf( bTotal ); // 移動先にイベントがあるか確認
                        eventCheckAfterMinusB = eventNumberMinus.indexOf( bTotal );
                        if( eventCheckAfterPlusB >= 0){ //移動先にイベントがある場合はマスの色を変える
                            document.getElementById(String('x'+ eventNumberPlus[eventCheckAfterPlusB])).style.backgroundColor = "rgb(255, 230, 245)";
                            document.getElementById(String('x'+ eventNumberPlus[eventCheckAfterPlusB])).style.color = "rgb(0, 255, 0)";
                        }else if( eventCheckAfterMinusB >= 0){
                            document.getElementById(String('x'+ eventNumberMinus[eventCheckAfterMinusB])).style.backgroundColor = "rgb(255, 230, 245)";
                            document.getElementById(String('x'+ eventNumberMinus[eventCheckAfterMinusB])).style.color = "rgb(0, 255, 0)";
                        };
    
                        if(aTotal === bTotal){
                            removeAllChildren(eval('a'+bTotal))
                            paragraphB.innerText = 'A　B';
                        }else{
                            paragraphB.innerText = 'B';
                        };
                        eval('a'+ bTotal).appendChild(paragraphB);
                        document.getElementById(String('a'+ bTotal)).style.backgroundColor = 'pink'; //Bが移動したあとのマスはピンクにする
                    };
                    setTimeout(event, 500); //処理を少し遅らせる
                };
            
                var turnChangeToA = () => {
                    turn = turn + 1; //ターンが順番になるようにするための処理
                    removeAllChildren(turnArea);
                    Turn.innerText = 'Aさんのターンです。' //Bのターン終了後Aのターンに変わる
                    turnArea.appendChild(Turn);

                    if( eventNumberPlus.indexOf( bTotal ) >= 0 || eventNumberMinus.indexOf( bTotal ) >= 0){
                        if( eventCheckAfterPlusB >= 0){ //マスの色をもとに戻す
                            document.getElementById(String('x'+ eventNumberPlus[eventCheckAfterPlusB])).style.backgroundColor = "rgb(148, 255, 203)";
                            document.getElementById(String('x'+ eventNumberPlus[eventCheckAfterPlusB])).style.color = "black";
                        }else if( eventCheckAfterMinusB >= 0){
                            document.getElementById(String('x'+ eventNumberMinus[eventCheckAfterMinusB])).style.backgroundColor = "rgb(255, 70, 77)";
                            document.getElementById(String('x'+ eventNumberMinus[eventCheckAfterMinusB])).style.color = "black";
                        };
                    };

                    document.getElementById('saikoro').disabled = false; //サイコロを振れるようにする 
                    return;
                };
                setTimeout(turnChangeToA, 1000);
            };

        }
    }
})();
