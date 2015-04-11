$(document).ready(function(){
    var now = new Date();
    var endTS = now.getTime()+207360000;
    setInterval(function(){
        now = new Date();
        var totalRemains = (endTS-now.getTime());
        if (totalRemains>1){ 
            var RemainsSec=(parseInt(totalRemains/1000)); 
            var RemainsFullDays=(parseInt(RemainsSec/(24*60*60))); 
            var secInLastDay=RemainsSec-RemainsFullDays*24*3600; 
            var RemainsFullHours=(parseInt(secInLastDay/3600)); 
            if (RemainsFullHours<10){RemainsFullHours="0"+RemainsFullHours}; 
            var secInLastHour=secInLastDay-RemainsFullHours*3600; 
            var RemainsMinutes=(parseInt(secInLastHour/60)); 
            if (RemainsMinutes<10){RemainsMinutes="0"+RemainsMinutes}; 
            var lastSec=secInLastHour-RemainsMinutes*60; 
            if (lastSec<10){lastSec="0"+lastSec}; 
            if (RemainsFullDays<10){RemainsFullDays="0"+RemainsFullDays};
            $('.digits').html(RemainsFullDays+":"+RemainsFullHours+":"+RemainsMinutes+":"+lastSec);
        } 
        else {$(".timer").remove();} 
    },1000);
});
var burl = location.href.replace("http://","").split("/")[0];
var utm = location.href.replace("http://"+burl,"").split("?")[1]
if(utm){
  var utm = utm.split("&");

  var comment = '';
  for (var i in utm){
    comment = utm[i]+'  '+comment;
  }

  $('form').each(function(){
    $(this).prepend("<input type='hidden' name='comment' value='"+comment+"'>");
  });
}

window.isMobile = {
  Android: function() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};

if(isMobile.any()){
  $('.benefit').each(function(indx, element){
    $(element).css('opacity', 1);
  });
  $('#letters').css('opacity', 1).css('top', 0);
}


$(document).ready(function(){

  $('.f-1')
  .animate({
    opacity: 1
  }, 800 );

  $('.car').delay(700)
  .animate({
    opacity: 1,
    left: '-140px',
    top: 0
  }, 500 );

  var benefit = $('.benefit');

  if( !isMobile.any() ){
    var letters = $('#letters').offset().top;
    var scrollTop = $(document).scrollTop();
    var figureEnd = false;
    $(document).scroll(function(){
        function figure(id,end,p,s){
          var n = 0;
          $(id).html(n);
          setInterval(function(){
              if(n < end){
                n = n+p;
                $(id).html(n);
              }
          },s);
        }

      var figures = $('.figures');
      var figuresHeight = figures.innerHeight();
      if(!figureEnd){
        if((scrollTop+550) >= figures.offset().top){
          figure('#figure-1', 9, 1, 10);
          figure('#figure-2', 250, 10,40);
          figure('#figure-3', 15, 1, 90);
          figure('#figure-4', 10, 1, 90);
          figureEnd = true;
        }
      }

      var letters = $('#letters').offset().top;
      scrollTop = $(document).scrollTop();

      benefit.each(function(indx, element){
        var topBenefit = $(element).offset().top;

        if((scrollTop+580) >= topBenefit){
          $(this).animate({
            opacity: 1,
          }, 500 );
        }
      })//each

      if((scrollTop+420) >= letters){
        $('#letters').animate({
          opacity: 1,
          top: 0
        }, 800 );

        $('.logos').animate({
          opacity: 1,
        }, 900 );
      }

    });
  }

  $('.letters img').click(function(){
    var src = $(this).attr('data-src');
    $('#img-src').attr('src', 'img/'+src);
    $('#img').modal('show');
    yaCounter26351112.reachGoal('LETTER');
  });

  $('.order').click(function(){
    var order = $(this).attr('data-order');
    $('#modal-order').attr('value', order);
    $('#order').modal('show');
  });

  var all = false;
  $('.all').click(function(){
    if(all){
      var reviews = $('#reviews').offset().top;
      $('#all').css('display', 'none')
      $(document).scrollTop(reviews);
      $(this).html('Смотреть все отзывы');
      all = false;
    }else{
      $('#all').css('display', 'block')
      $(this).html('Закрыть');
      all = true;
      yaCounter26351112.reachGoal('ALL');
    }
  });

$('form').each(function(){
  $(this).validate({
    unhighlight: function (element, errorClass) {
      $(element).addClass('success').removeClass('error');
    },
    submitHandler: function(form, e) {
      e.preventDefault();
      var form = $(form),
      submitBtn = form.find('.button')
      str = form.serialize(),
      url = form.attr('action'),
      type = form.attr('method');
      submitBtn.attr('data-loading-text', 'Обработка...');
      submitBtn.button('loading');
      $.ajax({
        url: url,
        type: type,
        data: str
      })
      .done(function() {
         $('#order').modal('hide');
         $('#ok').modal('show');
         yaCounter26351112.reachGoal('ORDER');
      })
      .always(function() {
        submitBtn.button('reset');
      });
    },
    rules: {
      'phone': {
        required: true,
      },
      'name': {
        required: true
      },
    },
    errorPlacement: function(error, element){
      $(element).addClass('error').removeClass('success');
    }
  });//validate
});//ajax

  $('.menu').singlePageNav();

});//load