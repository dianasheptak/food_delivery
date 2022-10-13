function timer() {
    const deadline = '2022-12-31';

        function getTimeRemaining(endtime) {
            const t = Date.parse(endtime) - Date.parse(new Date);
            let days = Math.floor(t / (1000 * 60 * 60 * 24));
            let hours = Math.floor((t / (1000 * 60 * 60) % 24));
            let minutes = Math.floor((t / 1000 / 60) % 60);
            let seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }


    function getZero(n) {
        if (n >= 0 && n < 10) {
            return `0${n}`;
        } else {
            return n;
        }
    }


    function setTime(selector, endtime) {
        const timer = document.querySelector(selector);
              days = timer.querySelector(`#days`),
              hours = timer.querySelector(`#hours`),
              minutes = timer.querySelector(`#minutes`),
              seconds = timer.querySelector(`#seconds`);
              timeInterval = setInterval(updateClock, 1000);


            updateClock();     


        function updateClock() {
            const t = getTimeRemaining(endtime);

                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval)
            }
        }
    }

    setTime(`.timer`, deadline)
}

module.exports = timer;