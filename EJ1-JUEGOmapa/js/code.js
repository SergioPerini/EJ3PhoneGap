function siguiente(){
    if(banderas.length > 0){
        alea = Math.floor((Math.random() * banderas.length));
        rutaimagen = "img/"+ banderas[alea] ;
        console.log(alea);
        console.log(rutaimagen);
        $('#caja_ban').attr("src", rutaimagen);
    }else{
       $('#resultados').html("YOU HAVE FINISHED THE GAME"); 
       $(".fin").addClass("fin2");
       $(".restart").addClass("restart2");
}
}
$(document).ready(function () {
    let aciertos = 0;
    let fallos = 0;
    let puntos = 0;
    banderas = ["1.png", "2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png","10.png",
    "11.png", "12.png","13.png","14.png","15.png","16.png","17.png","18.png","19.png","20.png",
    "21.png", "22.png","23.png","24.png","25.png","26.png","27.png","28.png","29.png","30.png",
    "31.png", "32.png","33.png","34.png","35.png","36.png","37.png","38.png","39.png","40.png", "41.png", "42.png"];
    siguiente();
    //console.log(banderas);
    $(".cajabanderas").draggable();
    $(".divpuntuacion").draggable();
    $(".lista").sortable();
/*
    $(".paises").droppable({
        drop: function(event) {
            $(".banderas").css({top:$(".paises").css("top"),left:$(".paises").css("left")});
        },
        tolerance: "touch",
        accept: "#" + alea
    })*/

    /*$("#grecia").draggable();

    $("#wow").droppable({
        drop: function (event) {
            $("#grecia").css("#blu");
        },
        tolerance: "touch"
    })*/

    //let alea = Math.floor((Math.random() * 10) + 1);
    //let rutaimagen = "img/"+ alea +".png";
    //console.log(alea);
    //console.log(rutaimagen);
   
    /*$('.cajabanderas').delegate('img','click', function(){
        //$("#caja_ban").html(rutaimagen);
        $("#caja_ban").attr("src", rutaimagen);
    });*/

    //$('#caja_ban').attr("src", rutaimagen);
    
    /*$('.cajabanderas').delegate('img','click', function(){
        $('#caja_ban').attr('src', rutaimagen);
    })*/
    

    $('.paises').on('click', function(){
        let SVGpais = $(this).attr("id");
        SVGpais = SVGpais.replace("pais", "");
        let imgbandera = banderas[alea];
        imgbandera = imgbandera.replace(".png", "");
        //console.log(var3);
        console.log(banderas);
        if(SVGpais == imgbandera){
            $(this).css({ fill: "#66FF33" });
            banderas.splice(alea, 1);
            aciertos = aciertos + 1;
            puntos = puntos + 10;
            siguiente();
            $(this).off("click");
            console.log(puntos);
            $("#puntuacion").html(puntos);
        }
        else{
            $(this).css({ fill: "#ff0000" });
            banderas.splice(alea, 1);
            banderas.splice(this, 1);
            $(this).off("click");
            siguiente();     
            fallos = fallos + 1;  
            puntos = puntos - 5;
            console.log(puntos);
            $("#puntuacion").html(puntos);
        }
    });


    //$('body').onclic
    

    /*$('.divbanderas').delegate('img','click', function(){
        $('#largeImage').attr('src',$(this).attr('src').replace('thumb','large'));
        $('#description').html($(this).attr('alt'));
    });*/
    
});