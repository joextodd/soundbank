'use-strict';

var track = false;
var image = false;

/*
* Attach event to sign s3 request when file is added.
*/
function fileSelected(elemId) {
    document.getElementById(elemId).onchange = function () {
        var file = document.getElementById(elemId).files[0];
        if (!file) {
            return alert("No file selected.");
        }
        getSignedRequest(file, elemId);

        if (elemId === 'image') image = true;
        if (elemId === 'track') track = true;
    };
}

/*
* Send request to django to sign request.
*/
function getSignedRequest(file, elemId) {
    var xhr = new XMLHttpRequest();
    var title = document.getElementById('id_title').value;
    xhr.open("GET", "/sign?filename=" + file.name + "&filetype=" + file.type + '&title=' + title);
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

    if (image && track) {
        showLoading(true);
    }
    submitLoading(true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 204) {
                document.getElementById('id_' + elemId).value = url;

                if (document.getElementById('id_image').value !== '' &&
                    document.getElementById('id_track').value !== '') {
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
    xhr.send(file);
}

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

fileSelected('image');
fileSelected('track');
submitEnable(false);