document.addEventListener("DOMContentLoaded", function () {
    // Function to create a countdown instance
    function createCountdown(timerId, imageName) {
        let countdownTime;
        const countdownElement = document.createElement("div");
        countdownElement.classList.add("countdown-timer", "countdown-container");
        const imageNameWithoutExtension = imageName.replace(".png", "");

        // Display the image name for each timer
        countdownElement.innerHTML = `
            <h1>${imageNameWithoutExtension}</h1>
            <img class=img-container src="images/${imageName}">
            <div id="${timerId}" class="countdown">01:00:00</div>
            <button class="startButton">Start</button>
            <button class="stopButton">Stop</button>
        `;

        document.getElementById("countdownContainer").appendChild(countdownElement);

        const startButton = countdownElement.querySelector(".startButton");
        const stopButton = countdownElement.querySelector(".stopButton");

        let countdownInterval;

        const storedStartTime = localStorage.getItem(`${timerId}StartTime`);

        if (storedStartTime) {
            const elapsedTime = Math.floor((Date.now() - parseInt(storedStartTime)) / 1000);
            countdownTime = Math.max(60 * 60 - elapsedTime, 0);

            if (countdownTime > 0) {
                startCountdown();
                startButton.disabled = true;
            } else {
                countdownElement.querySelector(".countdown").innerHTML = '<span style="color: #4CAF50; font-weight: bold;">RESPAWNED!</span>';
            }
        } else {
            countdownTime = 60 * 60;
        }

        startButton.addEventListener("click", function () {
            localStorage.setItem(`${timerId}StartTime`, Date.now().toString());

            startCountdown();
            startButton.disabled = true;
        });

        stopButton.addEventListener("click", function () {
            clearInterval(countdownInterval);
            countdownTime = 60 * 60;
            localStorage.removeItem(`${timerId}StartTime`);
            countdownElement.querySelector(".countdown").textContent = "01:00:00";
            startButton.disabled = false;
        });

        function startCountdown() {
            countdownInterval = setInterval(function () {
                const hours = Math.floor(countdownTime / 3600);
                const minutes = Math.floor((countdownTime % 3600) / 60);
                const seconds = countdownTime % 60;

                countdownElement.querySelector(".countdown").textContent = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;

                countdownTime--;

                if (countdownTime < 0) {
                    clearInterval(countdownInterval);
                countdownElement.querySelector(".countdown").innerHTML = '<span style="color: #4CAF50; font-weight: bold;">RESPAWNED!</span>';
                }
            }, 1000);
        }
    }

    // Image Array
    const imageNames = ['Anubis Lv. 47.png', 'Astegon Lv. 48.png', 'Azurobe Lv. 17.png', 'Beakon Lv. 29.png', 'Blazamut Lv. 49.png', 'Broncherry Aqua Lv. 30.png', 'Broncherry Lv. 23.png', 'Bushi Lv. 23.png', 'Chillet Lv. 11.png', 'Dinossom Lux Lv. 47.png', 'Dumud Lv. 14.png', 'Elizabee Lv. 31.png', 'Elphidran Lv. 30.png', 'Felbat Lv. 23.png', 'Fenglope Lv. 25.png', 'Frostallion Lv. 50.png', 'Grintale Lv. 17.png', 'Gumoss Lv. 11.png', 'Ice Kingpaca Lv. 43.png', 'Jetragon Lv. 50.png', 'Jormuntide Lv. 45.png', 'Katress Lv. 23.png', 'Kingpaca Lv. 23.png', 'Lunaris Lv. 32.png', 'Lyleen Noct Lv. 49.png', 'Mammorest Lv. 38.png', 'Menasting Lv. 44.png', 'Mossanda Lux Lv. 31.png', 'Necromus Lv. 50.png', 'Nitewing Lv. 18.png', 'Paladius Lv. 50.png', 'Penking Lv. 15.png', 'Petallia Lv. 28.png', 'Quivern Lv. 23.png', 'Relaxaurus Lux Lv. 31.png', 'Sibelyx Lv. 40.png', 'Suzaku Lv. 45.png', 'Sweepa Lv. 11.png', 'Univolt Lv. 31.png', 'Vaelet Lv. 38.png', 'Verdash Lv. 35.png', 'Warsect Lv. 30.png', 'Wumpo Botan Lv. 38.png'];

    imageNames.sort((a, b) => {
        const numberA = parseInt(a.match(/\d+/)[0]);
        const numberB = parseInt(b.match(/\d+/)[0]);
        return numberA - numberB;
      });

    imageNames.forEach((imageName, index) => {
        const timerId = `countdown${index + 1}`;
        createCountdown(timerId, imageName);
    });

    function padZero(number) {
        return number < 10 ? "0" + number : number;
    }
});
