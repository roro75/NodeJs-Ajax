$(document).ready(function() {


 $('.reservation').click(function() {

  if ($(this).hasClass('reset')) {

   $('.wrapper').slideToggle('fast', function() {
    $('.destination, .dates').empty();
    $('.affichage').slideUp('fast', function() {
     $(this).empty();
    });
   });

   $(this).removeClass('reset').html('Réservation');

  } else {
   getDepart();
   $(this).addClass('reset').html('Annuler');
  }
});

 function getDepart() {
  $.get("/depart", function(data) {
   })
   .done(function(data) {
    $('.depart').delay(100).html(data);
    $('.wrapper').slideToggle();
    departChange();
   })
   .fail(function(err) {
    console.log('error', err);
   });
 };


 /**
  * [departChange]
  */
 function departChange() {

  $('.depart select').change(function() {

   var depart = $('.depart select option:selected').val();
   var sel_default = $('.depart select option:first').val();

   if (depart != sel_default) {

    $.ajax({
     url: '/destination',
     type: 'get',
     data: {
      depart: depart
     },
     success: function(data) {
      var select = '<div class=".col-lg-12.col-md-12.col-xs-12">';
      select += '<h3>Votre destination</h3>';
      select += '<div class=".form-group">';
      select += '<select class="form-control" name="arrivee">';
      select += '<option selected="selected" class="default"> - gare de destination -</option>';

      for (var i = 0; i < data.elements.length; i++) {

       select += '<option value="' + data.elements[i] + '">' + data.elements[i] + '</option>';

      };

      select += '</select> </div> </div>';

      $('.destination').html(select);
      destinationChange();
      $('.dates').empty();
     }
    });

   } else {
    $('.destination, .dates').empty();

   }
   $('.affichage').slideUp('fast', function() {
    $(this).empty();
   });
  });

 } // end departChange


 /**
  * [destinationhange]
  */
 function destinationChange() {

  $('.destination select').change(function() {

   var depart = $('.depart select option:selected').val();
   var destination = $('.destination select option:selected').val();
   var sel_default = $('.destination select option:first').val();
   var depart = $('.depart select option:selected').val();

   if (destination != sel_default) {

    $.ajax({
     url: '/dates',
     type: 'get',
     data: {
      depart: depart,
      destination: destination
     },
     success: function(data) {

      var select = '<div class=".col-lg-12.col-md-12.col-xs-12">';
      select += '<h3>Date de départ</h3>';
      select += '<div class=".form-group">';
      select += '<select class="form-control" name="dates">';
      select += '<option selected="selected" class="default"> - dates -</option>';

      for (var i = 0; i < data.elements.length; i++) {
       select += '<option value="' + data.elements[i] + '">' + data.elements[i] + '</option>';
      }
      select += '</select>';
      select += '</div></div>';
      $('.dates').html(select);
      dateChange();
     }
    });
   } else {
    $('.dates').empty();
   }
  });
 } // end arriveeChange


 /**
  * [datesChange]
  */
 var isActive = true;

 function dateChange() {
  isActive = true;
  $('.affichage').slideUp();

  $('.dates select').change(function() {

   var depart = $('.depart select option:selected').val();
   var destination = $('.destination select option:selected').val();
   var dates = $('.dates select option:selected').val();
   var sel_default = $('.dates select option:first').val();

   if (dates != sel_default) {

    $.ajax({
     url: '/affichage',
     type: 'get',
     data: {
      depart: depart,
      destination: destination,
      dates: dates
     },
     success: function(data) {
      var elements = data.elements[0].fields;

      if (!elements.commentaires) {
       elements.commentaires = 'Pas de commentaires';
      }

      var informations = '  <div class="table-responsive "> <h2>Informations</h2> <table class="table"> <thead> <tr>        <th>Nombre de trains annulés</th> <th>Nombre de trains ayant circulés</th> <th>Nombre de trains en retard à l\'arrivée</th>  <th>Nombre de trains programmés</th>  <th>Taux de régularité</th>  </tr>   </thead>  <tbody>   <tr class="doddgerblue text-center">   <td>' + elements.nombre_de_trains_annules + '</td>  <td> ' + elements.nombre_de_trains_ayant_circule + '</td>       <td>' + elements.nombre_de_trains_en_retard_a_l_arrivee + '</td>    <td> ' + elements.nombre_de_trains_programmes + '</td>  <td> ' + elements.taux_regularite + '%</td>  </tr>  </tbody>  </table>   <table class="table"> <thead>  <tr>  <th>Commentaires</th>   </tr>  </thead>   <tbody>  <tr>  <td>' + elements.commentaires + '</td>  </tr>  </tbody>  </table>  </div>';

      displayAffichage(informations);
     }
    });
   } else {
    $('.affichage').slideToggle();
    isActive = true;
   }
  });
 } // end arriveeChange

 function displayAffichage(informations) {
  if (isActive) {
   $('.affichage').hide().html(informations).slideToggle();
   isActive = false;
  } else {
   $('.affichage').show().html(informations);
  };
 }


 console.log('start');

}); // end ready
