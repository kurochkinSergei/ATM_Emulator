$(document).ready(() => {
    var resp_example = {
        AccountAmount: 0,
        AccountBalance: 4900,
        AccountID: 1,
        AccountParam1: null,
        AccountParam2: null,
        AccountParam3: null,
        AccountParam4: null,
        AccountPayment: 0,
        AccountPrice: null,
        AccountStatus: "0",
        AccountType: "card",
        AccountValidFrom: null,
        AccountValidTo: null,
        CardCVC: null,
        CardCashLImit: null,
        CardID: 1,
        CardNumber: "2569128956431209",
        CardParam1: "IL'YA MARSHAKOV",
        CardParam2: null,
        CardParam3: null,
        CardParam4: null,
        CardPin: 1000,
        CardStatus: "manufactured",
        CardType: null,
        CardType2: null,
        CardValidFrom: null,
        CardValidTo: "2022-03-31 00:00:00.0000000",
        IndivID: 16001,
        LoyaltyScore: null,
        ProdDetID: 8,
        TMP_BLOCK_DTTM: 0,
        TMP_BLOCK_FLG: 0,
        TRUSTED_ATM_ENABLED: 0,
        Trans_Limit: 0,
        Trans_Limit_Flg: 0,
        TrustedTransLimit: 0,
        CardBlocked: 0
    }
    var $pinForm = $('.js-pin-form'),
        $pinInput = $('.js-pin-input', $pinForm),
        $buttons = $('.js-pin-button', $pinForm)

    var isLanguageRus = readCookie('Lang') == 'rus'

    $("#pin").html((readCookie('Lang') == 'rus') ? 'Введите Ваш ПИН-код' : 'Enter your PIN');

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

    animeInput = () => {
        inputColor = anime({
            targets: '.js-pin-input',
            backgroundColor: [
                { value: '#f2f2f2' },
                { value: 'rgb(238, 0, 105)' },
                { value: '#f2f2f2' },
            ],
            easing: 'linear',
            direction: 'alternate',
            duration: 1500
        });
    }

    animeMessageBlock = () => {
        blockOpacity = anime({
            targets: '.js-message-block',
            opacity: [
                { value: '0' },
                { value: '1' },
                { value: '0' },
            ],
            easing: 'easeOutCubic',
            direction: 'alternate',
            duration: 3000,
            delay: 500
        });
    }

    hideMessageBlock = () => {
        inputColor = anime({
            targets: '.js-message-block',
            opacity: [
                { value: '0' },
            ],
            easing: 'easeOutCubic',
            duration: 3000,
        });
    }

    setAccountCookies = data => {
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

    enterTheATM = pin => {
        var options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify({ pin: pin })
        };

        fetch('http:/10.20.1.35:6001/get_card', options).then(function(response) {
            var contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return response.json();
            }
            throw new TypeError("джисон не пришел-(");
        }).then(function(json) {
            if (!json) {
                animeInput()
            } else {
                if (json.CardBlocked) {
                    animeMessageBlock()
                } else {

                }
            }
            console.log(json)
        }).catch(function(e) {
            console.log("Error getting card_data", e)
        });
    }

    $buttons.on('click',
        (e) => {
            //animation still needs fix
            hideMessageBlock()

            var $button = $(e.target),
                $input = $('.js-pin-input', $pinForm)

            var buttonValue = $button.attr('data-button-value'),
                inputValue = $input.val()

            if (buttonValue == 'del') {
                $input.val(inputValue.slice(0, -1))
            } else if (buttonValue == 'submit') {
                if (inputValue.length == 4)
                    enterTheATM(inputValue);
            } else if (inputValue.length == 4) return
            else
                $input.val(inputValue + buttonValue);
        }
    );

    //Установка таймера бездействия пользователя
    // $.idleTimer(120000);
    // $(document).bind('idle.idleTimer', function() {
    //     location.href = 'index.html'
    // });

    //document.getElementById('keypad').style.left = $(window).width()/2-210+'px';
    // document.getElementById('passform').style.left = $(window).width() / 2 - 245 + 'px';
    // var br = document.getElementById('keypad').getBoundingClientRect();
    // document.getElementById('passform').style.top = br.top - 150 + 'px';
})