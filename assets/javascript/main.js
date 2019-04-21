


// initializing Firebase
var config = {
  apiKey: "AIzaSyCcbxtVWiH2d53pNvNoBxplF84nhiXMiGg",
  authDomain: "train-times-7b03f.firebaseapp.com",
  databaseURL: "https://train-times-7b03f.firebaseio.com",
  projectId: "train-times-7b03f",
  storageBucket: "train-times-7b03f.appspot.com",
  messagingSenderId: "300344924109"
};

    firebase.initializeApp(config);

    var database = firebase.database();


// // on click function which will send inputs to the table
$("#add-train-btn").on("click", function(event){
    event.preventDefault();

    // linking variables to input id's
    var trainName = $("#train-name-input").val().trim();
    var tDestination = $("#destination-input").val().trim();
    var trainTime = $("#time-input").val().trim();
    var trainFreq = $("#frequency-input").val().trim();

    var newTrain = {
        name: trainName,
        destination: tDestination,
        time: trainTime,
        frequency: trainFreq
    };

    database.ref().push(newTrain);

// console logging everything
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    alert("Train succesfully added");

    // clears values
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
});

// creates firebase event for adding emplyee to database and a row in html
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var tDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainFreq = childSnapshot.val().frequency;

  // Employee Info
  console.log(trainName);
  console.log(tDestination);
  console.log(trainTime);
  console.log(trainFreq);

  // Prettify the employee start
  var convertedTime = moment(trainTime, "HH:mm");
  console.log("Converted Time: " + convertedTime.format("HH:mm"));
  var currentTime = moment();
  console.log("Current: " + moment(currentTime).format("HH:mm"));
  var timeMinutes = currentTime.diff(convertedTime, "minutes");
  console.log("Time in Minute: "+timeMinutes);
  var frequency = timeMinutes % trainFreq;
  console.log("Remainder: " +frequency);
  var mintuesToTrain = trainFreq - frequency;
  console.log("Minutes til next train: " + mintuesToTrain);
  var nextArrival = (currentTime).add(mintuesToTrain, "minutes").format("HH:mm");
  console.log("Next arrivial time: " +nextArrival);
  

  // Create the new row
  var newRow = $("<tr>").append(
    $("<th>").text(trainName),
    $("<th>").text(tDestination),
    $("<th>").text(trainFreq),
    $("<th>").text(nextArrival),
    $("<th>").text(mintuesToTrain),

  );

  // Append the new row to the table
  $("#train").append(newRow);
});