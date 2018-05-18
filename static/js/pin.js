$(document).ready(() => {
    readCookie = (name) => {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    };

    var isLanguageRus = readCookie('Lang') == 'rus'

    $("#pin").html((readCookie('Lang') == 'rus') ? 'Введите Ваш ПИН-код' : 'Enter your PIN');

    $("button").click(
        function() {
            if ($(this).hasClass("delete")) {
                $("#num").val($("#num").val().slice(0, -1))
            } else if ($(this).hasClass("accept")) {
                ident();
            } else {
                if ($("#num").val().length == 4) {
                    return;
                }
                $("#num").val($("#num").val() + $(this).html());
            }

        }
    );

    var options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify({ pin: 1001 })
    };

    fetch('http:/10.20.1.35:6001/get_card', options).then(function(response) {
        var contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return response.json();
        }
        throw new TypeError("Oops, we haven't got JSON!");
    }).then(function(json) {
        console.log(json)
    }).catch(function(e) {
        console.log("Error getting card_data", e)
    });

    //Установка таймера бездействия пользователя
    // $.idleTimer(120000);
    // $(document).bind('idle.idleTimer', function() {
    //     location.href = 'index.html'
    // });

    //document.getElementById('keypad').style.left = $(window).width()/2-210+'px';
    // document.getElementById('passform').style.left = $(window).width() / 2 - 245 + 'px';
    // var br = document.getElementById('keypad').getBoundingClientRect();
    // document.getElementById('passform').style.top = br.top - 150 + 'px';


    function ident() {
        if ($("#num").val() == '1001') {
            document.cookie = "id=16002; path=/";
            document.cookie = "fname=Максим; path=/";
            document.cookie = "lname=Цуканов; path=/";
            document.cookie = "mname=Викторович; path=/";
            document.cookie = "pin=" + $("#num").val() + "; path=/";
            location.href = "cat.html"
        };

        if ($("#num").val() == '1000') {
            document.cookie = "id=16001; path=/";
            document.cookie = "fname=Илья; path=/";
            document.cookie = "lname=Маршаков; path=/";
            document.cookie = "mname=Анатольевич; path=/";
            document.cookie = "pin=" + $("#num").val() + "; path=/";
            location.href = "cat.html"
        };
    }
})