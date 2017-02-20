var countryList = [
    "World",
    "Bangladesh",
    "Brazil",
    "China",
    "India",
    "Indonesia",
    "Japan",
    "Nigeria",
    "Pakistan",
    "Russian Federation",
    "United States"
  ];

// ---------------------
// Request Data
// ---------------------
var json = (function () {
    var json = null;
    var country = countryList[0]
    // JQuery Ajax Request Documentation: https://api.jquery.com/jquery.ajax/
    $.ajax({
        'async': false,
        'global': false,
        'url': 'http://api.population.io/1.0/population/' + country + '/today-and-tomorrow/?format=json',
        'dataType': 'json',
        'success': function (data) {
          json = data
        },
        'error': function(jqXHR, textStatus, errorThrown) {
          return $("#population").text('Sorry!  There was an error requesting your data.')
        }
    });
    return json
})();

// JQuery For Loop
var pop = json.total_population;
// $.each(pop, function(i, object) {
//   $('#population').append('<span>' + pop[i].population + '</span>');
// });

var popNumber = pop[0].population;
var dotTotal = Math.round(popNumber / 10000000);
var dotNumber = 0;

$(function init() {

dotBuildToday();

  $('#population').append('<span>' + popNumber + '</span>');

  $("#day").click(dayClick);

  });

function dotBuildToday () {
  while (dotNumber < dotTotal) {
      $(".popVis").append('<li class="popDot popToday" id="dot"></li>');
         dotNumber++;
    };
};

function dotBuildTomorrow () {
  while (dotNumber < dotTotal) {
      $(".popVis").append('<li class="popDot popTomorrow" id="dot"></li>');
         dotNumber++;
    };
};

function dayClick() {
  var $this = $("#day");

    $this.toggleClass('tomorrow');
    if($this.hasClass('tomorrow')){
      $this.text('Tomorrow');
       popNumber = pop[1].population;
       dotNumber = 0;

      $('#population').text( popNumber );
      $("li").remove('#dot');
      dotBuildTomorrow();

    } else {
      $this.text('Today');
      popNumber = pop[0].population;
      dotNumber = 0;

     $('#population').text( popNumber );
     $("li").remove('#dot');
     dotBuildToday();
    }
};
