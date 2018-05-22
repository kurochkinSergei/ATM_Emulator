$(document).ready(() => {
    var $wrapper = $('.js-cash-wrapper'),
        $cashButtons = $('.js-cash-button', $wrapper),
        $input = $('.js-cash-input', $wrapper),
        $cashControls = $('.js-cash-control', $wrapper),
        $getCashButton = $('.js-get-cash'),
        $getCashButtonAmount = $('.js-cash-amount', $getCashButton)


    $cashButtons.on('click', (e) => {
        var $button = $(e.target)
        var cashAmount = $button.attr('data-cash-amount')

        $input.val(cashAmount)
        $cashControls.removeClass('hidden')
        $getCashButton.attr('data-cash-amount', cashAmount).removeClass('hidden')
        $getCashButtonAmount.html(cashAmount + ' руб.')
    })

    $cashControls.on('click', (e) => {
        var $control = $(e.target)
        var delta = parseInt($control.attr('data-delta')),
            amount = parseInt($input.val())
        if (amount != Math.abs(delta) || delta > 0) {
            newAmount = amount + delta
            $input.val(newAmount)
            $getCashButton.attr('data-cash-amount', newAmount)
            $getCashButtonAmount.html(newAmount + ' руб.')
        }
    })







})