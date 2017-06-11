
console.log("got here");

function changeColor(newColor) {
  var elem = document.getElementById('para');
  elem.style.color = newColor;
}

//handlers 
function create(url, data) {
}

function retrieve(url, id) {
}

function update(url, data) {
}

function delete(url, id) {
}



$(document).ready(function () {


  $('#create_btn').click(function(event) {
    console.log(event); 
  });

  $('#retrieve_btn').click(function(event) {
    console.log(event); 
  });

  $('#update_btn').click(function(event) {
    console.log(event); 
  });

  $('#delete_btn').click(function(event) {
    console.log(event); 
  });

  $('#msg_area').text("the content here");
  $("#para").on("click", function() {
  
    console.log("para clicked");
  });

});
