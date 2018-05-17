$(document).ready(() => {
    var headlinesTimeline = anime.timeline({ loop: true })

    headlinesTimeline.add({
        targets: document.querySelectorAll('.js-language-title')[0],
        opacity: [{ value: 1 }, { value: 0 }],
        duration: 6000,
        direction: 'alternate',
        easing: 'easeInOutQuart',
    })

    headlinesTimeline.add({
        targets: document.querySelectorAll('.js-language-title')[1],
        opacity: [{ value: 1 }, { value: 0 }],
        duration: 6000,
        direction: 'alternate',
        easing: 'easeInOutQuart',
    })

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
    setInterval(req, 3000);

    function reddir(arg) {
        document.cookie = "Lang=" + arg + "; path=/";
        location.href = "pin.html"

    }

    //$.idleTimer(60000);
    $(document).bind('idle.idleTimer', function() {
        location.href = 'index.html'
    });
})