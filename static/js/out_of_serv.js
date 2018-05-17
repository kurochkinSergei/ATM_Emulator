$(document).ready(() => {
    checkAtmStatus = () => {
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

    setInterval(checkAtmStatus, 3000);
})