(function(){
    'use strict';
    const saikoro = document.getElementById('saikoro'); 
    document.getElementById('a1').style.backgroundColor = 'skyblue';
    document.getElementById('a50').style.backgroundColor = 'orange';

    var a = 1;

    function removeAllChildren(element){
        while (element.firstChild){
            element.removeChild(element.firstChild);
         };
      }//removeAllChlldren

    const paragraph = document.createElement('p');
    paragraph.innerText = 'A'
    a1.appendChild(paragraph)

    saikoro.onclick = () => {
        if(a === 1){
            removeAllChildren(a1);
            const paragraph = document.createElement('p');
            paragraph.innerText = 'Start';
            a1.appendChild(paragraph);
        }else if(a > 1 && a < 50){
            removeAllChildren(eval(String('a'+ a)));
            document.getElementById(String('a'+ a)).style.backgroundColor = 'white';
        }else if(a === 50){
            removeAllChildren(a50);
            const paragraph = document.createElement('p');
            paragraph.innerText = 'Goal';
            a50.appendChild(paragraph);
        }

        a = a + Math.floor(Math.random()*6)+1
        if(a > 50){
            a = 50;
            const paragraph = document.createElement('p');
            paragraph.innerText = 'A'
            eval(String('a'+ a)).appendChild(paragraph)
        }else{
            const paragraph = document.createElement('p');
            paragraph.innerText = 'A'
            eval(String('a'+ a)).appendChild(paragraph)
            document.getElementById(String('a'+ a)).style.backgroundColor = 'yellowgreen';
        };
    }
})();
