/*
 * Account page, send requests to delete tracks then reload.
 */
const deleteTrack = (pk) => {
	const xhr = new XMLHttpRequest();
	xhr.open("GET", "/delete/" + pk);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                window.location.href = '/account';
            } else {
                alert("Could not delete track");
            }
        }
    };
    xhr.send();
}