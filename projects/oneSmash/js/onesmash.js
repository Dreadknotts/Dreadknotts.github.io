
function DropDown(el) {
  this.dd = el;
  this.initEvents();
}
DropDown.prototype = {
  initEvents : function() {
    var obj = this;

    obj.dd.on('click', function(event){
      $(this).toggleClass('active');
      event.stopPropagation();
    });
  }
}

$(function() {
  var dd = new DropDown( $('#dd') );
  $(document).click(function() {
    // all dropdowns
    $('#dd').removeClass('active');
  });
});


$(function(){
  $('#filter-all').click(function(){
    $('.roster > li').removeClass('hidden');
    return false
  })
});

$(function(){
  $('#filter-ar').click(function(){
    $('.roster > li').removeClass('hidden');
    $('.roster > li').not('.all-rounder').addClass('hidden');
    return false
  })
});

$(function(){
  $('#filter-rd').click(function(){
    $('.roster > li').removeClass('hidden');
    $('.roster > li').not('.rushdown').addClass('hidden');
    return false
  })
});

$(function(){
  $('#filter-z').click(function(){
    $('.roster > li').removeClass('hidden');
    $('.roster > li').not('.zoner').addClass('hidden');
    return false
  })
});

$(function(){
  $('#filter-t').click(function(){
    $('.roster > li').removeClass('hidden');
    $('.roster > li').not('.turtle').addClass('hidden');
    return false
  })
});

$(function(){
  $('#filter-g').click(function(){
    $('.roster > li').removeClass('hidden');
    $('.roster > li').not('.grappler').addClass('hidden');
    return false
  })
});

$(function(){
  $('#filter-p').click(function(){
    $('.roster > li').removeClass('hidden');
    $('.roster > li').not('.precision').addClass('hidden');
    return false
  })
});

$(function(){
  $('#filter-f').click(function(){
    $('.roster > li').removeClass('hidden');
    $('.roster > li').not('.footsies').addClass('hidden');
    return false
  })
});

$(function(){
  $('#filter-bp').click(function(){
    $('.roster > li').removeClass('hidden');
    $('.roster > li').not('.bait-punish').addClass('hidden');
    return false
  })
});

$(function(){
  $('#filter-hr').click(function(){
    $('.roster > li').removeClass('hidden');
    $('.roster > li').not('.hit-run').addClass('hidden');
    return false
  })
});

$(document).ready(function(){
    /* Get iframe src attribute value i.e. YouTube video url
    and store it in a variable */
    var url = $("#tech01").attr('src');

    /* Assign empty url value to the iframe src attribute when
    modal hide, which stop the video playing */
    $("#techModal").on('hide.bs.modal', function(){
        $("#tech01").attr('src', '');
    });

    /* Assign the initially stored url back to the iframe src
    attribute when modal is displayed again */
    $("#techModal").on('show.bs.modal', function(){
        $("#tech01").attr('src', url);
    });
});
