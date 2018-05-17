$(document).ready(() => {
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

    function reddir(arg) {
        document.cookie = "Lang=" + arg + "; path=/";
        location.href = "pin.html"

    }
    setInterval(req, 3000);
    $.idleTimer(60000);
    $(document).bind('idle.idleTimer', function() {
        location.href = 'index.html'
    });
})