let map = L.map('mapcontainer');

function init() {
    map.setView([38.3, 138], 5);
    L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
    }).addTo(map);
}

let elDrop = document.getElementById('dropzone');
let elFiles = document.getElementById('files');

elDrop.addEventListener('dragover', function(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    showDropping();
});

elDrop.addEventListener('dragleave', function(event) {
    hideDropping();
});

elDrop.addEventListener('drop', function(event) {
    event.preventDefault();
    hideDropping();

    let files = event.dataTransfer.files;
    drawRoutes(files);
});

function drawRoutes(files) {
    for (let i=0, l=files.length; i<l; i++) {
        let file = files[i];
        fr = new FileReader();
        fr.onload = function(event) {
            gpx = event.target.result;
            new L.GPX(gpx, {
                async: true,
                marker_options: {
                    startIconUrl: false,
                    endIconUrl: false,
                    shadowUrl: false,
                    wptIconUrls:false
                },
                polyline_options: {
                    color: 'red',
                    opacity: 0.75,
                    weight: 3,
                    lineCap: 'round'
                }
            }).on('loaded', function(e) {
                console.log(e.target.get_elevation_gain());
                console.log(e.target.get_distance());
            }).addTo(map);
        };
        fr.readAsText(file);
    }
}



function showDropping() {
    elDrop.classList.add('dropover');
}

function hideDropping() {
    elDrop.classList.remove('dropover');
}
