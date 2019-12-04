(function(){
    'use strict';
    const saikoro = document.getElementById('saikoro'); 
    const turnArea = document.getElementById('turnarea');
    document.getElementById('a1').style.backgroundColor = 'skyblue';
    document.getElementById('a50').style.backgroundColor = 'orange';

    var a = 1; //Aの位置
    var b = 1; //Bの位置
    var turn = 1; //A・Bのターン
    var sentence = 'Start \n \n A B';


    function removeAllChildren(element){
        while (element.firstChild){
            element.removeChild(element.firstChild);
         };
      }//removeAllChlldren

    const paragraph = document.createElement('p');
    paragraph.innerText = sentence;
    a1.appendChild(paragraph) //スタート時のStartの内容

    const Turn = document.createElement('p');
    Turn.innerText = 'Aさんのターンです。'
    turnArea.appendChild(Turn); //最初のターンはAさんから

    saikoro.onclick = () => {
        if(turn % 2 === 1){
            turn = turn + 1; //ターンが順番になるようにするための処理
            if(a === 1){ //Aがスタートするときの処理
                paragraph.innerText = 'Start \n \n B';
                a1.appendChild(paragraph); //Startマスに残る文字列は「Start  B」

            }else if(a > 1 && a < 50){ //Aの二回目以降のターンの処理
                if(a === b){ //AとBが同じマスにいるときの処理
                    removeAllChildren(eval(String('a'+ a)));
                    paragraph.innerText = 'B';
                    eval(String('a'+ a)).appendChild(paragraph); //残る文字列はB
                    document.getElementById(String('a'+ a)).style.backgroundColor = 'pink';

                }else{
                    removeAllChildren(String('a'+ a));
                    document.getElementById(String('a'+ a)).style.backgroundColor = 'white';
                }

            }else if(a === 50){
                removeAllChildren(a50);
                const paragraph = document.createElement('p');
                paragraph.innerText = 'Goal';
                a50.appendChild(paragraph);
            }

            a = a + Math.floor(Math.random()*6)+1
            if(a >= 50){
                a = 50;
                const paragraph = document.createElement('p');
                paragraph.innerText = 'A'
                eval('a50').appendChild(paragraph)
                document.getElementById('a50').style.backgroundColor = 'orange';

            }else{
                const paragraph = document.createElement('p');
                paragraph.innerText = 'A'
                eval(String('a'+ a)).appendChild(paragraph)
                document.getElementById(String('a'+ a)).style.backgroundColor = 'yellowgreen';
            };

            removeAllChildren(turnArea);
            Turn.innerText = 'Bさんのターンです。'
            turnArea.appendChild(Turn);

        }else if(turn % 2 === 0){
            turn = turn + 1;
            if(b === 1){
                paragraph.innerText = 'Start';
                a1.appendChild(paragraph);

            }else if(b > 1 && b < 50){
                if(a === b){ //AとBが同じマスにいるときの処理
                    removeAllChildren(eval(String('a'+ b)));
                    paragraph.innerText = 'A';
                    eval(String('a'+ b)).appendChild(paragraph);
                    document.getElementById(String('a'+ b)).style.backgroundColor = 'yellowgreen';

                }else{
                    removeAllChildren(String('a'+ b));
                    document.getElementById(String('a'+ b)).style.backgroundColor = 'white';
                }

            }else if(b === 50){
                removeAllChildren(a50);
                const paragraph = document.createElement('p');
                paragraph.innerText = 'Goal';
                a50.appendChild(paragraph);
            }

            b = b + Math.floor(Math.random()*6)+1
            if(b >= 50){
                b = 50;
                const paragraph = document.createElement('p');
                paragraph.innerText = 'B'
                eval('a50').appendChild(paragraph)
                document.getElementById('a50').style.backgroundColor = 'orange';

            }else{
                const paragraph = document.createElement('p');
                paragraph.innerText = 'B'
                eval(String('a'+ b)).appendChild(paragraph)
                document.getElementById(String('a'+ b)).style.backgroundColor = 'pink';
            };

            removeAllChildren(turnArea);
            Turn.innerText = 'Aさんのターンです。'
            turnArea.appendChild(Turn);
        }
    }
})();
