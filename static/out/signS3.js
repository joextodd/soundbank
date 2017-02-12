"use strict";
'use-strict';

var track = false;
var image = false;

/*
* Send request to django to sign request.
*/
function getSignedRequest(file, elemId) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/sign?filename=" + file.name + "&filetype=" + file.type);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                uploadFile(file, response.signed, response.url, elemId);
            } else {
                alert("Could not get signed URL.");
            }
        }
    };
    xhr.send();
}

/*
* Upload file to S3 with pre signed request, and set hidden
* field value for django model.
*/
function uploadFile(file, signedUrl, url, elemId) {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", signedUrl);
    xhr.setRequestHeader('Content-Type', file.type);
    xhr.setRequestHeader('Cache-Control', 'max-age=1296000');

    if (image && track) {
        showLoading(true);
    }
    submitLoading(true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 204) {
                document.getElementById('id_' + elemId).value = url;

                if (document.getElementById('id_image').value !== '' && document.getElementById('id_track').value !== '') {
                    submitEnable(true);
                    showLoading(false);
                    submitLoading(false);
                }
            } else {
                showLoading(false);
                alert("Could not upload file.");
            }
        }
    };
    xhr.send(file.compressed ? file.compressed : file);
}

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) byteString = atob(dataURI.split(',')[1]);else byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
}

/*
* Attach event to sign s3 request when file is added.
*/
function imageSelected() {
    var elemId = 'image';
    document.getElementById(elemId).onchange = function () {
        var file = document.getElementById(elemId).files[0];
        var reader = new FileReader();

        reader.addEventListener("load", function () {
            file.compressed = dataURItoBlob(compressImage(reader.result));
            getSignedRequest(file, elemId);
        }, false);

        if (file) {
            reader.readAsDataURL(file);
            image = true;
        } else {
            return alert("No file selected.");
        }
    };
}

function trackSelected() {
    var elemId = 'track';
    document.getElementById(elemId).onchange = function () {
        var file = document.getElementById(elemId).files[0];
        if (!file) {
            return alert("No file selected.");
        }
        getSignedRequest(file, elemId);
        track = true;
    };
}

/*
 * Before uploading an image we crudely compress it using
 * a canvas element toDataURL quality option
 */
var compressImage = function compressImage(url) {
    var size = url.length;
    var rate = -0.0000005 * size + 0.9;
    var cvs = document.createElement('canvas');
    var img = new Image();
    img.src = url;
    cvs.width = img.naturalWidth;
    cvs.height = img.naturalHeight;
    cvs.getContext("2d").drawImage(img, 0, 0);
    return cvs.toDataURL('image/jpeg', rate);
};

/*
* Disable submit button until image/track have been uploaded.
*/
function submitEnable(state) {
    document.getElementById('submit').disabled = !state;
}

/*
 * Show loading cursor on submit when uploading files.
 */
function submitLoading(state) {
    if (state) {
        document.getElementById('submit').style.cursor = 'wait';
    } else {
        document.getElementById('submit').style.cursor = 'pointer';
    }
}

function showLoading(state) {
    if (state) {
        document.getElementById('loading').style.display = 'flex';
    } else {
        document.getElementById('loading').style.display = 'none';
    }
}

imageSelected();
trackSelected();
submitEnable(false);