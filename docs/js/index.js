let map = L.map('mapcontainer');
let totalLength = 0;
let totalElevationGain = 0;

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
    totalLength = 0;
    totalElevationGain = 0;
    for (let i=0, l=files.length; i<l; i++) {
        let file = files[i];
        fr = new FileReader();
        fr.onload = function(event) {
            gpx = event.target.result;

            let parser = new DOMParser();
            let dom = parser.parseFromString(gpx, 'text/xml');

            pl = dom.getElementsByTagName('plevel');
            if (pl[0] != null) {
                elvGainText = pl[0].textContent;
                elvGain = Number(elvGainText.slice(0, -1));
                totalElevationGain += elvGain;
            }

            lm = dom.getElementsByTagName('length_meter');
            if (lm[0] != null) {
                lengthText = lm[0].textContent;
                length = Number(lengthText);
                totalLength += length;
            }

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
            }).addTo(map);

            let elLen = document.getElementById('length');
            elLen.textContent = '総距離：' + totalLength/1000 + 'km';

            let elElv = document.getElementById('elevationgain');
            elElv.textContent = '総獲得標高：' + totalElevationGain + 'm';
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
