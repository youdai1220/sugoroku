(function(){
    'use strict';
    const b1 = document.getElementById('b1');
    const saikoro = document.getElementById('saikoro'); 
    document.getElementById('a1').style.backgroundColor = 'skyblue';
    document.getElementById('a50').style.backgroundcolor = 'orange';

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
        if(a!==1){
            document.getElementById(String('a'+ a)).style.backgroundColor = 'white';
        }

        a = a + Math.floor(Math.random()*6)+1
        console.log(a);

        const paragraph = document.createElement('p');
        paragraph.innerText = 'A'
        //(String('a'+ a)).appendChild(paragraph)

       
        document.getElementById(String('a'+ a)).style.backgroundColor = 'orange';
    }




      
})();
