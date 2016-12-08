import $ from "jquery"; // @TODO probably don't need jquery

export {init};

function init() {

  $('.form-send form').submit(submitInsult);

  var totalClick = 0; // Refresh

  $('nav li a.add').click(function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.form-send').toggle();
  });

  $('.menu a:first').click(function (e) {
    if (totalClick < 10) {
      e.preventDefault();
      $.get('insulte-aleatoire', function (data) {
        $('.insulte').text('').html(data);
      });
      totalClick++;
    } else {
      location.reload();
    }
  });

  $(this).keydown(function (e) {
    if ($('.form-send').is(':hidden')) {
      var k = parseInt(e.which, 10);
      if (k == 32 || k == 73) {
        $('.menu a:first').click();
        e.preventDefault();
      }
    }
  });
}


function submitInsult(e) {

  e.preventDefault();

  const $textarea = $('textarea[name="insult"]'),
    insult = $textarea.val().trim();

  $textarea.val('');

  $.ajax({
    url: Routing.generate('api_add_insult'),
    type: 'POST',
    data: {insult},
    dataType: 'json'
  })
    .done(function (response) {
      if (response.success) {
        const $insultContainer = $('.insult');
        $insultContainer.find('a').attr('href', response.insult.id);
        $insultContainer.find('span').text(response.insult.value);
      } else {
        $textarea.val(insult);
        alert(response.message.join("\n"));
      }
    });
}