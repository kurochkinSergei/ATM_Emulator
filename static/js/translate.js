$(document).ready(() => {
    var storage = window['localStorage']

    if (storage.getItem('lang') == 'eng') {
        var $phrases = $('.js-translate'),
            $inputs = $('.js-translate-placeholder'),
            $amounts = $('.js-translate-amount')

        $phrases.each((index, element) => {
            element.innerText = element.getAttribute('data-eng')
        })

        $inputs.each((index, element) => {
            element.setAttribute('placeholder', element.getAttribute('data-eng'))
        })
    }
})