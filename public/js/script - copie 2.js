$(document).ready(function () {

        function getDepart() {
            $.get("/depart", function (data) {


                }) // end $.get
                .done(function (data) {

                //    console.log('done');
                    $('.depart').html(data);

                    departChange();

                })
                .fail(function (err) {
                    console.log('error', err);
                });
        }
        getDepart();


        function getArrivee(data) {
            var data = data;
            $.get("/arrivee", function (data) {

                for(var i=0;i<data.elements.length;i++){
               //

                    // if( i < data.elements.length){
                    //    var html;
                         html = '<option value="' + data.elements + '">';
                    //
                    //    console.log( '<option value="' + data.elements + '">')
                    //    $('.here').append(html)
                    //
                    //    }
                      //var select +=html;
                      //console.log(data.elements, i);
                      $('.here').append(html)
                   }
                }) // end $.get
                .done(function (data) {
                    $('.arrivee').html(data);
                    console.log('data',data)
                })
                .fail(function (err) {
                    console.log('error', err);
                });
            //console.log('getArrivee', data)

              for(var i=0;i<data.elements.length;i++){
            //
            //
            //     if( i < data.elements.length){
            //         var html;
            //         html = '<option value="' + data.elements + '">';
            //
            //         console.log( '<option value="' + data.elements + '">')
            //     //$('.here').append(html)
            //
            //     }
                //var select +=html;
                //console.log(data.elements, i);

            }

            //$('.arrivee').html(data);

        }


        function departChange() {

            $('.depart select').change(function () {

                var selected = $("option:selected").html();
                var sel_default = '- Gare de départ -';
                //console.log('selected:', selected);
                if (selected != sel_default) {



                    $.ajax({
                      url: '/arrivee',
                      type: 'get',
                      data : { gare:selected },
                      success: function(data)
                      {

                                  // $.get('/arrivee', function(json){
                                  //
                                  // })
                                  // .done(function(json){
                                  //   //$('.arrivee').html(data);
                                  //   console.log(json)
                                  // })


                                  // $.ajax({
                                  //   url: '/arriveejson',
                                  //   type: 'get',
                                  //   data : { gare:selected },
                                  //   success: function(data)
                                  //   {
                                  //     console.log(data)
                                  //   }
                                  // })


                    //      console.log('success:', data);
                    //  getArrivee(data);
                    //           //
                    //   for(var i=0;i<data.elements.length;i++){
                     //
                    //               // if( i < data.elements.length){
                    //               //    var html;
                    //                 var  html = '<option value="' + data.elements + '">';
                     //
                    //               //
                    //               //    console.log( '<option value="' + data.elements + '">')
                    //               //    $('.here').append(html)
                    //               //
                    //               //    }
                    //                 //var select +=html;
                    //                 //console.log(data.elements, i);
                    //                 //
                    //     $('.here').html(data);
                    //
                    //  }
                     //
                    //  //$('.here').html(data);
                     //
                    //  console.log('data', data)
                     //
                       $('.arrivee').html(data);


                        // console.log('data?elements', data);
                      //  console.log('data', data)
                      }
                    });


                } else {
                     $('.arrivee').empty();
                }
            });
        }


        console.log('start');

    }); // end ready
