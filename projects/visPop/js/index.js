var countryList = [
    "World",
    "AFRICA",
    "Australia",
    "EUROPE",
    "OCEANIA",
    "NORTHERN AMERICA",
    "South America",
    "Austria",
    "Brazil",
    "Canada",
    "China",
    "Dominican Republic",
    "Ecuador",
    "France",
    "Germany",
    "Haiti",
    "India",
    "Japan",
    "Kazakhstan",
    "Lebanon",
    "Mexico",
    "Nepal",
    "Qatar",
    "Rep of Korea",
    "Russian Federation",
    "South Africa",
    "Spain",
    "Thailand",
    "United Kingdom",
    "United States",
    "Vietnam",
];

// ==================== Variables for ajax init ====================
var country = countryList[0];

var year = 2013;
var month = 01;
var day = 01;

var date = year + '-' + month + '-' + day;

var sex = 'male';

var dob = year + '-' + month + '-' + day;

// parameters for Ajax Call
var popTodayAndTomorrow;
var popByDate;
var popLifeExpectancy;

var parameter;

var updateVar = function(country, date, sex, dob) {
    popTodayAndTomorrow = 'population/' + country + '/today-and-tomorrow/?format=json';
    popByDate = 'population/' + country + '/' + date + '/?format=json';
    popLifeExpectancy = 'life-expectancy/total/' + sex + '/' + country + '/' + dob + '/?format=json';
};

//  ==================== Ajax Init  ====================

var jsonInit = (function() {
    var jsonInit = null;
    country = countryList[0];
    updateVar(country);
    parameter = popTodayAndTomorrow;

    $.ajax({
        'async': false,
        'global': false,
        'url': 'http://api.population.io/1.0/' + parameter,
        'dataType': 'json',
        'success': function(data) {
            jsonInit = data
        },
        'error': function(jqXHR, textStatus, errorThrown) {
            return $("#population").text('Sorry!  There was an error requesting your data.')
        }
    });
    updateVar(country, date, sex, dob);
    return jsonInit
})();

// ==================== Variables for init function ====================
var pop = jsonInit.total_population;
var popNumber = pop[0].population;
var dotTotal;
var count = 0;

// ==================== Init function  ====================
$(function init() {

    dotTotalCalc(popNumber); // calculates number of dots
    dotBuildToday(dotTotal); // builds full fill dots over bg dots
    dotBuildBG(dotTotal); // makes empty ring dots for world comparison scale

    $('#country').text(country) // Country Header
    $('#population').append('<span></span>'); // Population Number Readout
    $("#day").click(function() {
        dayClick()
    });
    $("#country").click(function() {
        countryIterate(count);
        ajaxUpdate();
    });
    $("select").simpleselect({
  fadingDuration: 100,
  containerMargin: 0,
  displayContainerInside: "document"
  });
  $('#testCase').click(function(e) {
    e.preventDefault();
    filterSwitch();
    ajaxUpdate();
  });

//  ==================== Select Functions  ====================

  var selectDay = $("#day-select");
  selectDay
    .simpleselect()
    .on("change", function() {
      var dayObject = $(selectDay.val());
      day = dayObject.selector;
      dateUpdate(year, month, day);
      ajaxUpdate();
  });

  var selectMonth = $("#month-select");
  selectMonth
    .simpleselect()
    .on("change", function() {
      var monthObject = $(selectMonth.val());
      month = monthObject.selector;
      dateUpdate(year, month, day);
      ajaxUpdate();
  });

  var selectYear = $("#year-select");
  selectYear
    .simpleselect()
    .on("change", function() {
      var yearObject = $(selectYear.val());
      year = yearObject.selector;
      dateUpdate(year, month, day);
      ajaxUpdate();
  });


});

//  ==================== Dot Calculaton Function  ====================
var dotTotalCalc = function(popNumber) {
    dotTotal = Math.round(popNumber / 10000000);
    return dotTotal
};

//  ==================== Dot Building Functions  ====================
var dotBuildBG = function(dotTotal) {
    dotTotalCalc(popNumber);
    var dotNumber = 0;
    while (dotNumber < dotTotal) {
        $(".bgVis").append('<li class="bgDot popBG" id="dotbg"></li>')
        dotNumber++;
    };
};

var dotBuildToday = function(dotTotal) {
    dotTotalCalc(popNumber);
    var dotNumber = 0;
    while (dotNumber < dotTotal) {
        var $popVis = $('<li class="popDot popToday" id="dot" style="opacity: 0;"></li>')
        $(".popVis").append($popVis);
        dotNumber++;
    };
    popCommas(popNumber);
    dotAnimate();
};

var dotBuildTomorrow = function(dotTotal) {
    dotTotalCalc(popNumber);
    var dotNumber = 0;
    while (dotNumber < dotTotal) {
        var $popVis = $('<li class="popDot popTomorrow" id="dot" style="opacity: 0;"></li>')
        $(".popVis").append($popVis);
        dotNumber++;
    };
    popCommas(popNumber);
    dotAnimate();
};

// ==================== Interaction Functions ====================
var dayClick = function() {
    var dayBtn = $("#day");
    dayBtn.toggleClass('tomorrow');

    if (dayBtn.hasClass('tomorrow')) {
        dayBtn.text('Tomorrow'); // Button Text
        $(".header-subtitle").text('Country Population Tomorrow'); // Header Text
        popUpdate(pop);
    } else {
        dayBtn.text('Today');
        $(".header-subtitle").text('Country Population Today');
        popUpdate(pop);
    };
};

filterSwitch = function() {
  var dateFilter = $('.content-date');
  dateFilter.toggleClass('hidden');

  if (dateFilter.hasClass('hidden')) {
    $('.content-day').show();
    $(".header-subtitle").text('Country Population Today')
    parameter = popTodayAndTomorrow
  } else {
    $('.content-day').hide();
    $(".header-subtitle").text('Country Population By Date')
    parameter = popByDate;
  };
};
// ==================== Update functions ====================
var popUpdate = function(pop) {
    var dayBtn = $("#day")

    if (dayBtn.hasClass('tomorrow')) {
        popNumber = pop[1].population;
        $("li").remove('#dot');
        dotTotalCalc(popNumber);
        dotBuildTomorrow(dotTotal);
    } else {
        popNumber = pop[0].population;
        $("li").remove('#dot');
        dotTotalCalc(popNumber);
        dotBuildToday(dotTotal);
    };
};

var popDateUpdate = function(pop){
  popNumber = pop.population;
  $("li").remove('#dot');
  dotTotalCalc(popNumber);
  dotBuildToday(dotTotal);
}

var paraUpdate = function() {
  if (parameter.match('today-and-tomorrow')) {
  parameter = popTodayAndTomorrow ;
} else {
  parameter = popByDate;
}
};

var countryIterate = function() {
  $('#country').text(country); //sets html country name

  // keeps array from over iterating
  if (count < 31) {
      count++;
  } else {
      count = 0;
  };
};


var dateUpdate = function(year, month, day) {
  date = year + '-' + month + '-' + day;
};

//  ==================== Style Functions  ====================
var popCommas = function(popNumber) {
    $('#population').text(popNumber.toLocaleString('en'));
};

var dotAnimate = function() {
    $('#visInfo').children('li').each(function(i) {
        var $item = $(this);
        setTimeout(function() {
            $item.animate({
                "opacity": 1
            }, 60);
        }, 30 * i);
    });
};

//  ==================== Ajax Update Function  ====================
var ajaxUpdate = function() {
    country = countryList[count]; // allows access to array and sets up iteration
    updateVar(country, date, sex, dob);
    paraUpdate();
    var jsonUpdate = (function() {
        var jsonUpdate = null;
        $.ajax({
            'async': false,
            'global': false,
            'timeout': 300000,
            'url': 'http://api.population.io/1.0/' + parameter,
            'dataType': 'json',
            'success': function(data) {
                jsonUpdate = data
            },
            'error': function(jqXHR, textStatus, errorThrown) {
                return $("#population").text('Sorry!  There was an error requesting your data.')
            }
        })
        $('#country').text(country); //sets html country name
        // console.log(jsonUpdate);
        return jsonUpdate;
    })();
    pop = jsonUpdate.total_population;

    if (pop[0] == undefined) {
      popDateUpdate(pop);
    } else {
    popUpdate(pop);
  };
};


// NOTES
// Gonna need an update date/sex/dob function
