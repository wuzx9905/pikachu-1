const string = `
.skin *{box-sizing: border-box;margin:0;padding: 0;}
.skin *{box-sizing: border-box;}
.skin *::after, .skin *::before{box-sizing: border-box;}
.skin{
    position: relative;
    background: #ffe600;
    min-height: 50vh;
}
.nose{
    position: absolute;
    left: 50%;
    top: 140px;
    margin-left: -5px;
    border: 10px solid black;
    border-color: black transparent transparent;
    border-bottom: none;
    width: 0;
    height: 0;
    margin-left: -10px;
    z-index: 10;
}
@keyframes wave{
    0%{
        transform: rotate(0deg);
    }
    33%{
        transform: rotate(5deg);
    }
    66%{
        transform: rotate(-5deg);
    }
    100%{
        transform: rotate(0deg);
    }
}
.nose:hover{
    transform-origin: 50% 100%;     
    animation: wave 300ms infinite linear;
}


.yuan{
    position: absolute;
    width: 20px;
    height: 10px;
    top: -15px;
    left: -10px;
    border-radius: 100% 100% 0 0;
    background-image: linear-gradient(to top, transparent 50%, black 0)
}

.eye{
    border: 3px solid black;
    width: 64px;
    height: 64px;
    position: absolute;
    left: 50%;
    margin-left: -32px;
    top: 100px;
    background: #2e2e2e;
    border-radius: 50%;
}
.eye::before{
    content: '';
    display: block;
    border: 3px solid black;
    width: 25px;
    height: 25px;
    background: white;
    border-radius: 50%;
    position: relative;
    left: 8px;
    top: 2px;
}
.eye.left{
    transform: translateX(-100px);
}
.eye.right{
    transform: translateX(100px);
}

.mouth{
    width: 200px;
    height: 200px;
    position: absolute;
    left: 50%;
    top: 170px;
    margin-left: -100px;
}
.mouth .up{
    position: relative;
    top: -20px;
    z-index: 1;
}
.mouth .lip{
    border:3px solid black;
    height: 20px;
    width: 100px;
    background: #ffe600;
    border-top-color: transparent;
    position: relative;
    position: absolute;
    margin-left: -50px;
}
.mouth .up .lip::before{
    content: '';
    display: block;
    width: 7px;
    height: 30px;
    position: absolute;
    background: #ffe600;
    bottom: 0%;
}
.mouth .up .lip.left{
    border-right-color: transparent;
    border-radius: 0 0 0 200px;             
    transform: rotate(-15deg)translateX(-52px);
    left: 50%;
    margin-left: -50px;
}

.mouth .up .lip.left::before{
    right: -6px;
}

.mouth .up .lip.right{
    border-radius: 0 0 200px 0;
    border-left-color: transparent;
    transform: rotate(15deg)translateX(52px);
    right: 50%;
    margin-right: -50px;
}
.mouth .up .lip.right::before{
   left : -6px;
}

.mouth .down{
    height: 160px;
    position: absolute;
    /* top:-50px; */
    width: 100%;
    overflow: hidden;
}
.mouth .down .yuan1{
    border: 3px solid black;
    width: 150px;
    height: 900px;
    position:absolute;
    bottom: 0;
    left: 50%;
    margin-left: -75px;
    border-radius: 75px/400px;
    background: #9b000a;
    overflow: hidden;
}
.mouth .down .yuan2{
    width: 150px;
    height: 300px;
    position: absolute;
    bottom: -180px;
    left: 50%;
    margin-left: -75px;
    border-radius: 100px;
    background: #ff485f;
}

.face{
    position: absolute;
    left: 50%;
    border: 3px solid black;
    width: 88px;
    height: 88px;
    top: 200px;
    margin-left: -44px;
    z-index: 3;
}

.face > img{
    position: absolute;
    top: 50%;
    left: 50%;
}

.face.left{
    transform: translateX(-180px);
    background: #ff0000;
    border-radius: 50%;
}
.face.left > img{
    transform: rotateY(180deg);
    transform-origin: 0 0;
}
.face.right{
    transform: translateX(180px);
    background: #ff0000;
    border-radius: 50%;
}
喏，可爱的皮卡丘送给你
`

const player = {
    id: undefined,
    time: 100,
    n: 0,
    ui: {
        'demo': document.querySelector('#demo'),
        'demo2': document.querySelector('#demo2')
    },
    events: {
        '#btnPause': 'pause',
        '#btnPlay': 'play',
        '#btnSlow': 'slow',
        '#btnNormal': 'normal',
        '#btnFast': 'fast'
    },
    init: () => {
        player.ui.demo.innerText = string.substr(0, player.n);
        player.ui.demo2.innerHTML = string.substr(0, player.n);
        player.play();
        player.bindEvent();
    },
    bindEvent: () => {
        for (let key in player.events) {
            if (player.events.hasOwnProperty(key)) {
                const value = player.events[key];
                document.querySelector(key).onclick = player[value];
            }
        }
    },
    run: () => {
        player.n += 1;
        if (player.n > string.length) {
            window.clearInterval(player.id);
            return
        }
        player.ui.demo.innerText = string.substr(0, player.n);
        player.ui.demo2.innerHTML = string.substr(0, player.n);
        player.ui.demo.scrollTop = player.ui.demo.scrollHeight;
    },
    play: () => {
        player.id = setInterval(player.run, player.time);
    },
    pause: () => {
        window.clearInterval(player.id);
    },
    slow: () => {
        player.pause();
        player.time = 300;
        player.play();
    },
    normal: () => {
        player.pause();
        player.time = 100;
        player.play();
    },
    fast: () => {
        player.pause();
        player.time = 0;
        player.play();
    }
}

player.init();

