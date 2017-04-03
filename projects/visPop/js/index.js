var countryList = [
    "World",
    "ASIA",
    "OCEANIA",
    "EUROPE",
    "NORTHERN AMERICA",
    "Central America",
    "South America",
    "Australia",
    "Caribbean",
    "Brazil",
    "Canada",
    "China",
    "India",
    "Indonesia",
    "Japan",
    "Nigeria",
    "Mexico",
    "Pakistan",
    "Russian Federation",
    "United States"
  ];

// ---------------------
// Request Data
// ---------------------
var jsonInit = (function () {
    var jsonInit = null;
    var country = countryList[0];
    // JQuery Ajax Request Documentation: https://api.jquery.com/jquery.ajax/
    $.ajax({
        'async': false,
        'global': false,
        'url': 'https://api.population.io/1.0/population/' + country + '/today-and-tomorrow/?format=json',
        'dataType': 'json',
        'success': function (data) {
          jsonInit = data
        },
        'error': function(jqXHR, textStatus, errorThrown) {
          return $("#population").text('Sorry!  There was an error requesting your data.')
        }
    });
    return jsonInit
})();
var count = 1;
var country = countryList[0];
var pop = jsonInit.total_population;
var popNumber = pop[0].population;
var dotTotal = Math.round(popNumber / 10000000);
var dotNumber = 0;

$(function init() {

dotBuildToday();
dotBuildBG();

  $('#country').text( country )
  $('#population').append('<span></span>');
  $("#day").click(dayClick);
  $("#country").click(ajaxUpdate);
});

function dotBuildBG() {
  dotNumber = 0;
  while (dotNumber < dotTotal){
    $(".bgVis").append('<li class="bgDot popBG" id="dotbg"></li>')
      dotNumber++;
  }
}

function dotBuildToday() {
  while (dotNumber < dotTotal) {
    var $popVis = $('<li class="popDot popToday" id="dot" style="opacity: 0;"></li>')
      $(".popVis").append($popVis);
         dotNumber++;
    };

    $('#visInfo').children('li').each(function(i){
      var $item = $(this);
      setTimeout(function() {
      $item.animate({"opacity": 1}, 60);
    }, 30*i);
});

  $('#population').text( popNumber.toLocaleString('en'));
};

function dotBuildTomorrow() {
  while (dotNumber < dotTotal) {
    var $popVis = $('<li class="popDot popTomorrow" id="dot" style="opacity: 0;"></li>')
      $(".popVis").append($popVis);
         dotNumber++;
    };

    $('#visInfo').children('li').each(function(i){
      var $item = $(this);
      setTimeout(function() {
      $item.animate({"opacity": 1}, 40);
    }, 20*i);
});

  $('#population').text( popNumber.toLocaleString('en'));
};

function dayClick() {
  var $this = $("#day");

    $this.toggleClass('tomorrow');
    if($this.hasClass('tomorrow')){
      $this.text('Tomorrow');
      $(".header-subtitle").text('Country Population Tomorrow');
       popNumber = pop[1].population;
       dotNumber = 0;

      $("li").remove('#dot');
      dotBuildTomorrow();

    } else {
      $this.text('Today');
      $(".header-subtitle").text('Country Population Today');
      popNumber = pop[0].population;
      dotNumber = 0;

     $("li").remove('#dot');
     dotBuildToday();
    }
};

function ajaxUpdate() {

  var jsonUpdate = (function () {
      var jsonUpdate = null;
      country = countryList[count];
      // JQuery Ajax Request Documentation: https://api.jquery.com/jquery.ajax/
      $.ajax({
          'async': false,
          'global': false,
          'url': 'https://api.population.io/1.0/population/' + country + '/today-and-tomorrow/?format=json',
          'dataType': 'json',
          'success': function (data) {
            jsonUpdate = data
          },
          'error': function(jqXHR, textStatus, errorThrown) {
            return $("#population").text('Sorry!  There was an error requesting your data.')
          }
      });
      $('#country').text( country );
      if(count < 19){ count++; } else { count = 0; };
      return jsonUpdate;
  })();

  pop = jsonUpdate.total_population;
  dotNumber = 0;

  var dayBtn = $("#day")
  if(dayBtn.hasClass('tomorrow')){
    popNumber = pop[1].population;
    dotTotal = Math.round(popNumber / 10000000);
    $("li").remove('#dot');
    dotBuildTomorrow();
    } else {
      popNumber = pop[0].population;
      dotTotal = Math.round(popNumber / 10000000);
      $("li").remove('#dot');
      dotBuildToday();
    }
};
