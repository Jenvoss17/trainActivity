// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyCUOLe_c_AM54QxgyD4HyvQf6eTnPXJ_hA",
    authDomain: "trains-a27f8.firebaseapp.com",
    databaseURL: "https://trains-a27f8.firebaseio.com",
    storageBucket: "gs://trains-a27f8.appspot.com",
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainFirst = moment($("#first-train-input").val().trim(), "HH:mm").format("X");
    var trainFreq = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding employee data
    var newTrain = {
        name: trainName,
        destination: trainDest,
        firstTrain: trainFirst,
        frequency: trainFreq
    };

    // Uploads employee data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);

    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainFirst = childSnapshot.val().firstTrain;
    var trainFreq = childSnapshot.val().frequency;

    // Employee Info
    console.log('child_added');
    console.log(trainName);
    console.log(trainDest);
    console.log(trainFirst);
    console.log(trainFreq);

    // Prettify the employee start
    var trainFirstPretty = moment.unix(trainFirst).format("HH:mm");

    var firstTrain = moment().diff(moment(trainFirst, "X"), "minutes");
    var minsAway = trainFreq - (firstTrain % trainFreq);
    var nextTrain = moment().add(minsAway, "minutes").format("hh:mm A");


    // Calculate the months worked using hardcore math
    // To calculate the months worked
    // var empMonths = moment().diff(moment(empStart, "X"), "months");
    // console.log(empMonths);

    // Calculate the total billed rate
    // var empBilled = empMonths * empRate;
    // console.log(empBilled);

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainFreq),
        $("<td>").text(nextTrain),
        $("<td>").text(minsAway)
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case
