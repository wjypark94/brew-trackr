var MOCK_STATUS_UPDATES = {
	"statusUpdates": [
        {
            "id": "1111111",
            "place": "Blue Bottle Coffee",
            "friendId": "aaaaaa",
            "friendName": "John Doe",
            "publishedAt": 1470016976609
        },
        {
            "id": "2222222",
            "place": "Philz Coffee",
            "friendId": "bbbbbbb",
            "friendName": "Jane Doe",
            "publishedAt": 1470012976609
        },
        {
            "id": "333333",
            "place": "G & B Coffee",
            "friendId": "cccc",
            "friendName": "Jim Doe",
            "publishedAt": 1470011976609
        },
        {
            "id": "4444444",
            "place": "Awesome Coffee",
            "friendId": "ddddd",
            "friendName": "Jackie Doe",
            "publishedAt": 1470009976609
        }
    ]
};


function getRecentStatusUpdates(callbackFn) {
    // we use a `setTimeout` to make this asynchronous
    // as it would be with a real AJAX call.
	setTimeout(function(){ callbackFn(MOCK_STATUS_UPDATES)}, 1);
}

// this function stays the same when we connect
// to real API later
function displayStatusUpdates(data) {
    for (index in data.statusUpdates) {
	   $('body').append(
        '<p>' + data.statusUpdates[index].place + '</p>');
    }
}

// this function can stay the same even when we
// are connecting to real API
function getAndDisplayStatusUpdates() {
	getRecentStatusUpdates(displayStatusUpdates);
}

//  on page load do this
$(function() {
	getAndDisplayStatusUpdates();
})