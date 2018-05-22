$(document).ready(() => {
    var $customerInfo = $('.js-customer-info'),
        $customerName = $('.js-cust-name', $customerInfo),
        $customerBalance = $('.js-account-balance', $customerInfo),
        $customerCardNumber = $('.js-card-number', $customerInfo)

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

    var storage = window['localStorage'],
        cardNumber = storage.getItem('cardNumber').slice(0, 2) + '** **** ' + storage.getItem('cardNumber').slice(-4)
    if (storageAvailable('localStorage')) {
        $customerName.html(storage.getItem('name'))
        $customerBalance.html(storage.getItem('balance') + ' руб.')
        $customerCardNumber.html(cardNumber)
    }
})