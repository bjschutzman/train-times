


// initializing Firebase
var config = {
    apiKey: "AIzaSyCcbxtVWiH2d53pNvNoBxplF84nhiXMiGg",
    authDomain: "train-times-7b03f.firebaseapp.com",
    databaseURL: "https://train-times-7b03f.firebaseio.com",
    storageBucket: "train-times-7b03f.appspot.com",
    };

    firebase.initializeApp(config);

    var database = firebase.database();


// // on click function which will send inputs to the table
$("#add-train-btn").on("click", function(event){
    event.preventDefault();

    // linking variables to input id's
    var trainName = $("#train-name-input").val().trim();
    var tDestination = $("#destination-input").val().trim();
    var trainTime = moment($("#time-input").val().trim(), "HH:mm").subtract(10, "years").format("X") ;
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
  var trainStartPretty = moment().diff(moment.unix(trainTime), "minutes");
  var timeRemainder = moment().diff(moment.unix(trainTime), "minutes") % trainFreq;
  var minutes = trainFreq - timeRemainder;

  var  nextTrain= moment().add(minutes, "m").format("hh:mm A"); 
  

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(tDestination),
    $("<td>").text(nextTrain),
    $("<td>").text(trainTime),
    $("<td>").text(trainFreq),

  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});