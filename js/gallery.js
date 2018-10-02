var hash = window.location.hash.substring(1);

// set dropdown to current item from url
function setDropdown() {
    $(".dropdown-el input").each(function() {
      if ($(this).attr('id') === hash) {
        $("#all").prop('checked', false);
        $(this).prop('checked', true);
      }
    });

    var selector = $('#'+ hash).next("label").attr("filter");
    $('.grid').isotope({
      filter: selector
    });
}

$(function() {
  // Masonry Grid
  $('.grid').isotope({
    filter: '*',
    // itemSelector: '.grid-item',
    masonry: {
      columnWidth: 180,
      fitWidth: true, // When enabled, you can center the container with CSS.
      gutter: 10
    }
    // layoutMode: 'fitRows'
  });

  setDropdown();

  $('.dropdown-el').click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).toggleClass('expanded');
    $('#'+$(e.target).attr('for')).prop('checked',true);
    var selector = $(e.target.getAttribute("filter"));
    $('.grid').isotope({
      filter: selector
    });
    return false;
  });

  $(document).click(function() {
    $('.dropdown-el').removeClass('expanded');
  });

  // Fancybox
  $('.fancybox').fancybox({
    helpers: {
      overlay: { locked: false }
    }
  });
});