window.addEventListener('DOMContentLoaded', function() {

    let btnStart = document.getElementsByTagName('button')[0],
        start = document.querySelector('.start'),
        timer = document.querySelector('.timer'),
        seconds = document.querySelector('.seconds'),
        block = document.querySelector('.block'),
        ret = document.querySelector('.return'),
        td = document.querySelectorAll('.td'),
        tr = document.querySelectorAll('.tr')[0],
        table = document.querySelector('.table'),
        win = document.querySelector('.loose'),
        btnRestart = document.getElementsByTagName('button')[1];

    let appData = {
        'pause': false,
        'masseHide': [],
        'masseShow': []
    };
   
        // for(let i = 0; i < td.length; i++) {
        //     td[i].classList.add('noGuess');
        // }
    
    
    function masse() {
        for (let i = 0; i <= 25; i++) {
            appData.masseHide[i] = i;
            appData.masseShow[i] = i;                   
        }
        appData.masseHide.shift();
        appData.masseShow.shift();
    }

    masse();

     function hideContent() {
         block.classList.remove('show');
         block.classList.add('hide');
         timer.classList.remove('flex');
         timer.classList.add('hide');
         ret.classList.remove('show');
         ret.classList.add('hide');
     }

     hideContent(); 

     function showContent() {
        start.classList.remove('show');
        start.classList.add('hide');
        block.classList.remove('hide');
        block.classList.add('show');
        timer.classList.remove('hide');
        timer.classList.add('flex');
     }

     
    function goTime() {
        let sec = 40;
        seconds.textContent = sec;
        let interval = setInterval(subtraction, 1000);
        function subtraction() {
            if (sec <= 1) {
                clearInterval(interval);
                seconds.textContent = '0';
                ret.classList.remove('hide');
                ret.classList.add('flex');
                appData.pause = true;
                if (appData.pause == true) {
                    for(let i = 0; i < td.length; i++) {
                        if(td[i].classList.contains('guess')) {
                        } else {
                            td[i].classList.add('noGuess');
                        }                     
                    }
                }
            }
            sec -= 1;
            seconds.textContent = sec;
            if (appData.pause == true) {
                clearInterval(interval);
                seconds.textContent = '0';
                ret.classList.remove('hide');
                ret.classList.add('flex');
            }
        }
    }
   
    function fillCells() {
        function shuffle(array) {
            array.sort(() => Math.random() - 0.5);
        }
        shuffle(appData.masseShow);
        for (let i = 0; i < td.length; i++) {
            td[i].textContent = appData.masseShow[i];
        }
        console.log(appData.masseShow);
        console.log(appData.masseHide);
    } 

    fillCells();

    let count = 1;

     btnStart.addEventListener('click', function() {

        showContent();
        goTime();

        table.addEventListener('click', function(event) {

            let target = event.target;

            if (!isNaN(+target.textContent) && +target.textContent === count && appData.pause == false) {
                count += 1;
                target.classList.add('guess');
                if (count === 26) {
                    appData.pause = true;
                    console.log('count');
                    win.textContent = 'Поздравляем! вы выйграли!';
                }
            }              
        });
     });

     btnRestart.addEventListener('click', function() {
        appData.pause = false;
        ret.classList.remove('flex');
        ret.classList.add('hide');
        count = 1;
        goTime();
        for(let i = 0; i < td.length; i++) {
            td[i].classList.remove('noGuess');
            td[i].classList.remove('guess');
        }
     });
});