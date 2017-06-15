//var url = "http://localhost:3000/api/v1/user";
//var url = "http://nexware.com.ng:3000/api/v1/user";
var url = "http://nexware.com.ng:3000/api/v1/paper";
var tabArray = [];
function logUsers(data) {
  for (var i = 0; i < data.length; i++) {
    var _arr = [
      data[i]._id,
      data[i].exam_name, 
      data[i].paper_name,
      data[i].paper_year, 
      data[i].p_key 
  ];
    tabArray.push(_arr);
  }
  console.log(tabArray);
  renderTable();
}

function renderTable() {
     var table = $('#example').DataTable( {
        data: tabArray,
        columns: [
            { title: "_id" },
            { title: "exam_name" }, 
            { title: "paper_name" },
            { title: "paper_year" },
            { title: "p_key" } 
        ]
    } );
    
    
    $('#example tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    } );
 
    $('#button').click( function () {
        table.row('.selected').remove().draw( false );
    } );    
    
    $('#example tbody').on( 'click', 'tr', function () {
        console.log( table.row( this ).data() );
    } );    

}

$(document).ready(function() {
 
  $.ajax({
    url: url,
    dataType: "json",
    xhrFields: { withCredentials: true },
    success: logUsers
  });

    
} );








var req = (function () {

  this.test = function(val, fn) {

    return val + "and so it begins";
  }

  return {
    test: this.test
  }


})();




function tester(code, res) {
  console.log(res);
  console.log(code);
}

console.log(req.test("really",tester));
