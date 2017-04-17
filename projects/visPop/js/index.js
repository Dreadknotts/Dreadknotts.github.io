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

// ==================== Variables for ajax init ====================
var country = countryList[0];

var year = 2017;
var month = 04;
var day = 09;
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
    console.log(parameter + '1');
    return jsonInit
})();

// ==================== Variables for init function ====================
var pop = jsonInit.total_population;
var popNumber = pop[0].population;
var dotTotal;
var count = 1;

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

$('#testCase').click(function() {});

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

var paraUpdate = function() {
  if (parameter.match('today-and-tomorrow')) {
  parameter = popTodayAndTomorrow ;
} else {
  console.log('lol sorry')
  parameter = popByDate;
}
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
            'url': 'http://api.population.io/1.0/http://api.population.io/1.0/' + parameter,
            'dataType': 'json',
            'success': function(data) {
                jsonUpdate = data
            },
            'error': function(jqXHR, textStatus, errorThrown) {
                return $("#population").text('Sorry!  There was an error requesting your data.')
            }
        });
        $('#country').text(country); //sets html country name

        // keeps array from over iterating
        if (count < 19) {
            count++;
        } else {
            count = 0;
        };
        // console.log(jsonUpdate);
        return jsonUpdate;
    })();
    pop = jsonUpdate.total_population;
    popUpdate(pop);
};


// NOTES
// Gonna need an update date/sex/dob function
