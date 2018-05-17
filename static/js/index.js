$(document).ready(() => {
    // $(document).click(function() {
    //     location.href = 'main.html'
    // });


    // var lineDrawing = anime({
    //     targets: '.lines path',
    //     strokeDashoffset: [anime.setDashoffset, 0],
    //     easing: 'easeInOutSine',
    //     duration: 1500,
    //     delay: function(el, i) { return i * 250 },
    //     direction: 'alternate',
    //     loop: true
    // });

    function req() {
        $.ajax({
                url: 'http://10.20.1.21:5000/atm_status',
            })
            .done(function(data) {
                console.log("Ajax was succsessfully sent");
                console.log(JSON.parse(data).status);
                if (JSON.parse(data).status == false) {
                    location = "outofserv.html"
                }
            })
            .fail(function() {
                console.log("Ajax failed to fetch data")
            })
    }
    //setInterval(req, 3000);
})