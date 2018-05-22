$(document).ready(() => {
    var storage = window['localStorage']
    var $headlines = $('.js-appearing-headline'),
        $watermarkImage = $('.js-watermark-image')

    // console.log($headlines[0])
    // console.log(storage.getItem('transStatus'))
    // console.log($headlines[0].innerText)
    // $headlines[0].innerText = 'Пожалуйста, заберите ваши деньги'
    // $headlines[1].innerText = 'Please take your cash'

    switch (storage.getItem('transStatus')) {
        case '200':
            $headlines[0].innerText = 'Пожалуйста, заберите ваши деньги'
            $headlines[1].innerText = 'Please take your cash'
            $watermarkImage.attr('src', './static/img/tick.svg').removeClass('watermark-image_rotated')
            break
        case '201':
            $headlines[0].innerText = 'Лимит превышен. Попробуйте ввести другую сумму'
            $headlines[1].innerText = 'Limit is exceeded. Please try lesser amount'
            break
        case '202':
            $headlines[0].innerText = 'В банкомате закончились средства'
            $headlines[1].innerText = 'ATM is out of cash'
            break
        case '203':
            $headlines[0].innerText = 'Банкомат временно недоступен'
            $headlines[1].innerText = 'ATM is out of service'
            break
        case '204':
            $headlines[0].innerText = 'К сожалению,в базе нет клиента с таким ПИН-кодом'
            $headlines[1].innerText = 'Unfortunately there is no client with specified PIN'
            break
        case '226':
            $headlines[0].innerText = 'Карта заблокирована'
            $headlines[1].innerText = 'Card is blocked'
            break
        case '227':
            $headlines[0].innerText = 'Невозможно провести операцию'
            $headlines[1].innerText = 'It is impossible to perform an operation'
            break

        default:
            break
    }

    $watermarkImage.removeClass('hidden')
})