let state = 0;
let speedReading = 500;
let place = document.getElementById('place');
let area = document.getElementById('area');
let add = document.getElementById('add');
let stateLocal = localStorage.getItem('state') || 0;

function nightTrigger(state) {
    if (state === 1) {
        // light 
        $('#wrap').attr('class', 'wrap light');
        $('.nightMode').css('animation', 'change 0.4s 1 linear alternate forwards');
        setTimeout(() => {
            $('.nightMode').css('animation', 'none');
        }, 410);
    } else if (state === 0) {
        // dark 
        $('#wrap').attr('class', 'wrap dark');
        $('.nightMode').css('animation', 'change 0.4s 1 linear alternate-reverse forwards');
        setTimeout(() => {
            $('.nightMode').css('animation', 'none');
        }, 410);
    }
}

nightTrigger(parseInt(stateLocal));
state = parseInt(stateLocal);

speedView.innerText = speedReading + ' с';

add.onclick = () => {
    if (area.value !== '') {
        formTrigger(1);
        let x;
        let n = 0;
        let txt = cleanText(area.value);
        let arr = clear(txt.split(' '));
        x = setInterval(function() {
            if (n != arr.length) {
                place.innerHTML = setFocus(arr[n]);
                n++
            } else {
                place.innerHTML = 'Вітаю із прочитанням!';
                setTimeout(function() {
                    place.innerHTML = ' ';
                    formTrigger(0)
                    clearInterval(x);
                    document.body.onkeydown = '';
                }, speedReading - 5);
                area.value = '';
            }
        }, speedReading)
        let state = 0;
        document.body.onkeydown = function(e) {
            if (e.keyCode === 32) {
                if (state === 0) {
                    place.innerHTML = 'Призупинено';
                    speed.style.display = 'block';
                    speedView.style.display = 'block';
                    clearInterval(x);
                    state = 1;
                } else {
                    speed.style.display = 'none';
                    speedView.style.display = 'none';
                    x = setInterval(function() {
                        if (n != arr.length) {
                            place.innerHTML = setFocus(arr[n]);
                            n++
                        } else {
                            place.innerHTML = 'Вітаю із прочитанням!';
                            setTimeout(function() {
                                place.innerHTML = ' ';
                                formTrigger(0)
                                clearInterval(x);
                                document.body.onkeydown = '';
                            }, speedReading - 5);
                            area.value = '';
                        }
                    }, speedReading);
                    state = 0;
                }
            } else if (e.keyCode === 27) {
                area.value = '';
                place.innerHTML = ' ';
                formTrigger(0)
                clearInterval(x);
                document.body.onkeydown = '';
            }
        }
    } else {
        area.style.animation = 'drag 0.3s 2 linear';
        setTimeout(() => {
            area.style.animation = 'none';
        }, 600);
    }
}

function cleanText(text) {
    let arr = text.split(' ');
    let newArr = [];
    for (let i = 0; i != arr.length; i++) {
        let word = arr[i];
        word = word.split(`\n`);
        let withoutInterp = word.join(' ');

        newArr.push(withoutInterp);
    }
    return newArr.join(' ');
}

function clear(arr) {
    let clearArr = ['Щоб', 'зупинити', 'натисніть', 'пробіл', 'щоб', 'вийти', 'натисніть', '"esc"', 'Готові?', '3', '2', '1', '0'];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== '') {
            clearArr.push(arr[i])
        }
    }
    return clearArr;
}

function formTrigger(state) {
    if (state === 1) {
        place.style.display = 'flex';
        add.style.display = 'none';
        area.style.display = 'none';
        speed.style.display = 'none';
        speedView.style.display = 'none';
    } else if (state === 0) {
        place.style.display = 'none';
        add.style.display = 'block';
        area.style.display = 'block';
        speed.style.display = 'block';
        speedView.style.display = 'block';
    }
}

speed.oninput = function() {
    speedView.innerHTML = this.value + ' с';
    speedReading = this.value;
}


nightMode.onclick = function() {
    if (state === 0) {
        nightTrigger(1);
        state = 1;
        localStorage.setItem('state', '1');
    } else {
        nightTrigger(0);
        state = 0
        localStorage.setItem('state', '0');
    }
}

function setFocus(word) {
    if (word.length % 2 === 0) {
        let focusIndex = (word.length / 2) - 1;
        return word.slice(0, focusIndex) + '<span class="red">' + word[focusIndex] + '</span>' + word.slice(focusIndex + 1);
    } else {
        let focusIndex = ((word.length + 1) / 2) - 1;
        return word.slice(0, focusIndex) + '<span class="red">' + word[focusIndex] + '</span>' + word.slice(focusIndex + 1);
    }
}