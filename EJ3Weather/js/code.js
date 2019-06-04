
$(document).on("mobileinit", function () {
    $(function () {


        $("#main").on("pageinit", function () {

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(successF, errorF);
            } else {
                alert('Este navegador no permite geolocalizar');
            }
            function successF(position) {
                let lat = position.coords.latitude;
                let long = position.coords.longitude;

                var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&units=metric&APPID=4eb158ac77c35cce1db83e0758f51ac6';
                $.getJSON(url).done(function (data) {
                    $("#ubicacion").html('<h1 class="nomciudad_text">' + data.name + '</h1>');
                });
            }
            function errorF(position) {
                alert('Error!');
            }

            let ciudades = JSON.parse(localStorage.getItem('elementos'));

            if (ciudades != null) {
                $.each(ciudades, function (ind, val) {
                    let ciudad = '<div class="ficha_ciudad"><h1 class="nomciudad_text">' + ciudades[ind] + '</h1></div>';
                    $("#contenido").append(ciudad);
                });
            }
        });


        $("#busqueda_id").on("pageinit", function () {
            $("#autocomplete").on("filterablebeforefilter", function (e, data) {
                var $ul = $(this),
                    $input = $(data.input),
                    value = $input.val(),
                    html = "";
                $ul.html("");
                if (value && value.length > 2) {
                    $ul.html("<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>");
                    $ul.listview("refresh");
                    $.ajax({
                        url: "http://gd.geobytes.com/AutoCompleteCity",
                        dataType: "jsonp",
                        crossDomain: true,
                        data: {
                            q: $input.val()
                        }
                    })
                        .then(function (response) {
                            $.each(response, function (i, val) {
                                html += "<li class='ficha_ciudad'><a class='elementos' href='#detalle_id'>" + val + "</a></li>";
                            });
                            $ul.html(html);
                            $ul.listview("refresh");
                            $ul.trigger("updatelayout");
                        });
                }
            });

        });

        // click en una ciudad
        $("#autocomplete").on('click', '.elementos', function () {
            let nomciudad = $(this).text();
            var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + nomciudad + '&units=metric&APPID=4eb158ac77c35cce1db83e0758f51ac6';



            $.getJSON(url).done(function (data) {
                console.log(data);

                let ciudad = '<div class="ficha_ciudad"><h1 class="nomciudad_text">' + data.name + '</h1></div>';

                $("#contenido").append(ciudad);
                //$("#contenido").append(data.name);

                let ciudades = JSON.parse(localStorage.getItem('elementos'));
                if (ciudades == null) {
                    ciudades = [];
                }

                ciudades.push(data.name);
                localStorage.setItem('elementos', JSON.stringify(ciudades));

            });
        });


        $(document).on('click', ".ficha_ciudad", function () {
            let ciudad = $(this).text();

            var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + ciudad + '&units=metric&APPID=4eb158ac77c35cce1db83e0758f51ac6';
            $.getJSON(url).done(function (data) {
                $("#nombreciudad").text(data.name);
                $("#temperatura").text(data.main.temp + 'ºC');
                $("#mintemp").text('MÍNIMA ' + data.main.temp_min + 'ºC');
                $("#maxtemp").text('MÁXIMA ' + data.main.temp_max + 'ºC');
                $("#humedad").text('HUMEDAD ' + data.main.humidity + '%');
            });

            $(":mobile-pagecontainer").pagecontainer("change", "#detalle_id", {
                transition: "slide",
                reverse: true
            });
        });
    });
});
