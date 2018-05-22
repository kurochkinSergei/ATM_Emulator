$(document).ready(() => {
    var $pinForm = $('.js-pin-form'),
        $pinInput = $('.js-pin-input', $pinForm),
        $buttons = $('.js-pin-button', $pinForm)

    function storageAvailable(type) {
        try {
            var storage = window[type],
                x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        } catch (e) {
            return false;
        }
    }

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
                { value: '1' }
                // { value: '0' },
            ],
            easing: 'linear',
            direction: 'alternate',
            duration: 3500,
            loop: 2
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

    writeDataToLocalStorage = data => {
        var storage = window['localStorage']
        if (storageAvailable('localStorage')) {
            storage.setItem('id', data.IndivID)
            storage.setItem('name', data.CardParam1)
            storage.setItem('pin', data.CardPin)
            storage.setItem('balance', data.AccountBalance)
            storage.setItem('cardNumber', data.CardNumber)
        }
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
            // for testing
            // $.getJSON('./data_sample.json', function(data) {
            //     writeDataToLocalStorage(data[0])
            //     console.log(data)
            // })

            throw new TypeError("джисон не пришел-(");
        }).then(function(json) {
            if (!json) {
                animeInput()
            } else {
                if (json.CardBlocked) {
                    animeMessageBlock()
                } else {
                    writeDataToLocalStorage(json)
                    location.href = "home.html"
                }
            }
            console.log(json)
        }).catch(function(e) {
            console.log("Error getting card_data", e)
        });
    }

    $buttons.on('click',
        (e) => {
            var $button = $(e.target),
                $input = $('.js-pin-input', $pinForm)

            var buttonValue = $button.attr('data-button-value'),
                inputValue = $input.val()

            if (buttonValue != 'submit') hideMessageBlock()
            console.log(buttonValue)

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
})