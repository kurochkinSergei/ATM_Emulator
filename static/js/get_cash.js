$(document).ready(() => {
    var $wrapper = $('.js-cash-wrapper'),
        $cashButtons = $('.js-cash-button', $wrapper),
        $input = $('.js-cash-input', $wrapper),
        $cashControls = $('.js-cash-control', $wrapper),
        $getCashButton = $('.js-get-cash'),
        $getCashButtonAmount = $('.js-cash-amount', $getCashButton)

    // modified https://stackoverflow.com/a/79970
    function holdit($btn, action, start, speedup) {
        var t,
            currentEvent;

        var repeat = function() {
            action(currentEvent);
            t = setTimeout(repeat, start);
            start = start / speedup;
        }

        $btn.on('mousedown', function(e) {
            currentEvent = e;
            repeat(currentEvent);
        })

        $btn.on('mouseup', function() {
            clearTimeout(t);
        })

        $btn.on('mouseleave', function() {
            clearTimeout(t);
        })
    };

    incDecAmount = (e) => {
        var $control = $(e.target)
        var delta = parseInt($control.attr('data-delta')),
            amount = parseInt($input.val())
        if (amount != Math.abs(delta) || delta > 0) {
            newAmount = amount + delta
            $input.val(newAmount)
            $getCashButton.attr('data-cash-amount', newAmount)
            $getCashButtonAmount.html(newAmount + ' &#x20bd;')
        }
    }

    getCash = function() {
        //TODO check whether storage is availible
        var storage = window['localStorage']
        var cashAmount = parseInt($getCashButton.attr('data-cash-amount'))


        // damned old atm data format
        // heck knows what TID and Type is
        var data = {
                "Limit": cashAmount,
                "CID": parseInt(storage.getItem("id")),
                "TID": 1,
                "Type": 2,
                "Pin": parseInt(storage.getItem("pin"))
            },
            options = {
                type: "POST",
                url: "http://10.20.1.35:5000/limit02",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data),
                async: false
            }


        $.ajax(options).done(function(res, statustext, xhr) {
            storage.setItem("transStatus", xhr.status)
            location.href = "success.html";
        })
    }

    $cashButtons.on('click', (e) => {
        var $button = $(e.target)
        var cashAmount = $button.attr('data-cash-amount')

        $input.val(cashAmount)
        $cashControls.removeClass('hidden')
        $getCashButton.attr('data-cash-amount', cashAmount).removeClass('hidden')
        $getCashButtonAmount.html(cashAmount + ' &#x20bd;')
    })

    $getCashButton.on('click', getCash)
    holdit($cashControls, incDecAmount, 200, 1);
})