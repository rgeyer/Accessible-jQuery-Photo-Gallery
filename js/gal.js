$(document).ready(function() {
  var currentPosition = 0;
  var slideWidth = 560;
  var slides = $('#photos p');
  var numberOfSlides = slides.length;

  // Remove scrollbar in JS
  $('#photos').css('overflow', 'hidden');

  // Wrap all .slides with #slideInner div
  slides
    .wrapAll('<div id="slideInner"></div>')
    // Float left to display horizontally, readjust .slides width
    .css({
    'float' : 'left',
    'width' : slideWidth
  });

  // Set #slideInner width equal to total width of all slides
  $('#slideInner').css('width', slideWidth * numberOfSlides);

  // Insert controls in the DOM
  $('#photos')
    .prepend('<span class="control" id="leftControl">Clicking moves left</span>')
    .append('<span class="control" id="rightControl">Clicking moves right</span>')
    .append('<div class="slideshow-caption-control slideshow-caption-control-show"></div>');

  $('#photos').append('<div id="slideshow-caption" class="caption"><div class="slideshow-caption-container"><p>Werdz</p><div class="slideshow-caption-control slideshow-caption-control-hide"></div></div></div>');
  $('#slideshow-caption').css({opacity: 0.7});

  $('.slideshow-caption-control').toggle();
  $('#photos').mouseover(function() {
    if (!$('#slideshow-caption').is(':visible')) {
      $('.slideshow-caption-control-show').show();
    }
  });
  $('#photos').mouseout(function() {
    if (!$('#slideshow-caption').is(':visible')) {
      $('.slideshow-caption-control-show').hide();
    }
  });

  $('#slideshow-caption').mouseover(function() {
    $('.slideshow-caption-control-hide').show();
  });
  $('#slideshow-caption').mouseout(function() {
    $('.slideshow-caption-control-hide').hide();
  });
  $('.slideshow-caption-control').click(function () {
    $('#slideshow-caption').slideToggle(300, function() {
      if ($('#slideshow-caption').is(':visible')) {
        $('.slideshow-caption-control-show').hide();
      }
    });
  });

  $(document).bind('keydown', function(event) {
    // Left: 37 Down: 40 Right: 39
    //alert(event.keyCode);
    switch (event.keyCode) {
      case 37:
        if ($('#leftControl').is(':visible')) {
          $('#leftControl').click();
        }
        break;
      case 39:
        if ($('#rightControl').is(':visible')) {
          $('#rightControl').click();
        }
        break;
    }
  });

  // Hide left arrow control on first load
  manageControls(currentPosition);
  setCaption(currentPosition);

  // Create event listeners for .controls clicks
  $('.control')
    .bind('click', function() {
    // Determine new position
    currentPosition = ($(this).attr('id') == 'rightControl') ? currentPosition + 1 : currentPosition - 1;

    // Hide / show controls
    manageControls(currentPosition);
    // Move slideInner using margin-left
    $('#slideInner').animate({
      'marginLeft' : slideWidth * (-currentPosition)
    });
    setCaption(currentPosition);
  });

  function setCaption(position) {
    if (!$('#slideshow-caption').is(':visible')) {
      $('.slideshow-caption-control-show').hide();
      $('#slideshow-caption p').text($('#slideInner span:eq(' + position + '):first').text());
      $('#slideshow-caption').slideToggle(500);
    } else {
      $('#slideshow-caption').slideToggle(300, function() {
        $('#slideshow-caption p').text($('#slideInner span:eq(' + position + '):first').text());
        $('#slideshow-caption').slideToggle(500);
      });
    }
  }

  // manageControls: Hides and Shows controls depending on currentPosition
  function manageControls(position) {
    // Hide left arrow if position is first slide
    if (position == 0) {
      $('#leftControl').hide()
    } else {
      $('#leftControl').show()
    }
    // Hide right arrow if position is last slide
    if (position == numberOfSlides - 1) {
      $('#rightControl').hide()
    } else {
      $('#rightControl').show()
    }
  }
});