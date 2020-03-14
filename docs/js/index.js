/*
function init0() {
let map = L.map('mapcontainer0');
map.setView([38.3, 138], 5);
L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
}).addTo(map);

let gpx_lst = ['2015hatsunobori.gpx', '2015hokkaido1.gpx', '2015hokkaido2.gpx', '2015hokkaido3.gpx', '2015koyo.gpx', '2015yobi1.gpx', '2015yobi2.gpx', '2015yobi3.gpx', '2016sado1.gpx', '2016sado2.gpx', '2016tohoku1.gpx', '2016tohoku2.gpx', '2016tohoku3.gpx', '2016tohoku4.gpx', '2016yobi1.gpx', '2016yobi2.gpx', '2016yobi3.gpx', '2017fumeihan.gpx', '2017geika.gpx', '2017haru.gpx', '2017haru2.gpx', '2017hokkaido1.gpx', '2017hokkaido2.gpx', '2017hokkaido3.gpx', '2017hokkaido4.gpx', '2017izuoshima.gpx', '2017meidaitt1-1.gpx', '2017meidaitt1-2.gpx', '2017meidaitt1-3.gpx', '2017meidaitt1-4.gpx', '2017odarumi.gpx', '2017rtt.gpx', '2017satsuei.gpx', '2017suika.gpx', '2017toge-summer.gpx', '2017utsukushigahara1.gpx', '2017utsukushigahara2.gpx', '2017yobi1.gpx', '2017yobi2.gpx', '2017yobi3.gpx', '2019noto.gpx'];

for(let i = 0; i < gpx_lst.length; i++) {
new L.GPX('gpx/'+gpx_lst[i], {
async: true,
marker_options: {
startIconUrl: false,
endIconUrl: false,
shadowUrl: false
},
polyline_options: {
color: 'red',
opacity: 0.75,
weight: 3,
lineCap: 'round'
}
}).on('loaded', function(e) {
}).addTo(map);
}
}
*/

let map = L.map('mapcontainer');

function init() {
    map.setView([38.3, 138], 5);
    L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
        attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
    }).addTo(map);
}

let URL_BLANK_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
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

}

// document.addEventListener('click', function(event) {
//     let elTarget = event.target;
//     if (elTarget.tagName === 'IMG') {
//         let src = elTarget.src;
//         let w = window.open('about:blank');
//         let d = w.document;
//         let title = escapeHtml(elTarget.getAttribute('title'));
//
//         d.open();
//         d.write('<title>' + title + '</title>');
//         d.write('<img src="' + src + '" />');
//         d.close();
//     }
// });

function showDropping() {
    elDrop.classList.add('dropover');
}

function hideDropping() {
    elDrop.classList.remove('dropover');
}

function showFiles(files) {
    elFiles.innerHTML = '';

    for (let i=0, l=files.length; i<l; i++) {
        let file = files[i];
        let elFile = buildElFile(file);
        elFiles.appendChild(elFile);
    }
}

function buildElFile(file) {
    let elFile = document.createElement('li');

    let text = file.name + ' (' + file.type + ',' + file.size + 'bytes)';
    elFile.appendChild(document.createTextNode(text));

    if (file.type.indexOf('image/') === 0) {
        let elImage = document.createElement('img');
        elImage.src = URL_BLANK_IMAGE;
        elFile.appendChild(elImage);

        attachImage(file, elImage);
    }

    return elFile;
}

function attachImage(file, elImage) {
    let reader = new FileReader();
    reader.onload = function(event) {
        let src = event.target.result;
        elImage.src = src;
        elImage.setAttribute('title', file.name);
    };
    reader.readAsDataURL(file);
}

function escapeHtml(source) {
    let el = document.createElement('div');
    el.appendChild(document.createTextNode(source));
    let destination = el.innerHTML;
    return destination;
}
