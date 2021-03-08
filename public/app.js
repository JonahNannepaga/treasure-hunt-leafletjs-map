const mapContainer = document.getElementById('map');
const modeswitch = document.querySelector('.modeswitch');

var map = L.map('map').setView([17.4458, 78.3774], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const points = [];
let score = 0;
let attempts = 0;
let polyline;
let mode = 'day';


map.on('click', (event) => {
    const latlng = [event.latlng.lat, event.latlng.lng];
    points.push(latlng);
    if (!polyline) {
        polyline = L.polyline(points, {
            color: '#14A53A',
            weight: 7,
        }).addTo(map);
        L.popup({
                autoClose: false,
                closeOnClick: false,
            })
            .setLatLng(latlng)
            .setContent('<div class="popup-content"><h1>Start point</h1><h3>Map using LeafletJS </h3><img class="popup-image" src="./javascript.svg"></div>')
            .openOn(map);
    } else {
        polyline.setLatLngs(points);
        attempts++;
        if (Math.random() < 0.2) {
            score++;
            L.popup({
                    autoClose: true,
                    closeOnClick: true,
                })
                .setLatLng(latlng)
                .setContent(`
                <div class="popup-content">
                    <h1>Score: ${score}</h1>
                    <h2>Attempts: ${attempts}</h2>
                    <h3>You found the treasure...</h3>
                    <img class="popup-image" src="./treasure.png">
                 </div>
                `)
                .openOn(map);
        }
    }
});

modeswitch.addEventListener('click', () => {
    mapContainer.classList.toggle('dark');
});