let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return date.getHours() + "Hrs:" + date.getMinutes() + "Mins:" + date.getSeconds() + "Secs";
}

function makeAJAXcall(methodType, url, callback, async = true, data = null) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200 || xhr.status == 201) {
                callback(xhr.responseText);
            }
            else if (xhr.status >= 400) {
                console.log("Handle 400 Client Error or 500 Server Error at : " + showTime());
            }
        }
    }
    xhr.open(methodType, url, async);
    if (data) {
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    }
    else xhr.send();
    console.log(methodType + " request sent to server at " + showTime());
}

const getURL = "http://localhost:3000/employees/11";
function getUserDetails(data) {
    console.log("Get user data at: " + showTime() + ": DATA : " + data);
}
// GET call
makeAJAXcall("GET", getURL, getUserDetails, true);
console.log("Made GET AJAX call to server at " + showTime());

//Delete call
const deleteURL = "http://localhost:3000/employees/12";
function userDeleted(data) {
    console.log("User Deleted at: " + showTime() + " data: " + data);
}
makeAJAXcall("DELETE", deleteURL, userDeleted, false);
//Delete call is made synchronus to avoid conflicts, so make post call executed only after delete
console.log("Made DELETE AJAX call to server at " + showTime());

//Post call
const postURL = "http://localhost:3000/employees";
const emplData = { "name": "Mansa", "Gender": "F", "salary": "5000" };
function userAdded(data) {
    console.log("User Adde at: " + showTime() + " data: " + data);
}
makeAJAXcall("POST", postURL, userAdded, true, emplData);
console.log("Made POST AJAX call to server at " + showTime());