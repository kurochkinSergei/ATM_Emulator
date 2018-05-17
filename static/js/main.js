$(document).ready(() => {
    function setCookie(name, value, options) {
        options = options || {};

        var expires = options.expires;

        if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }

        value = encodeURIComponent(value);

        var updatedCookie = name + "=" + value;

        for (var propName in options) {
            updatedCookie += "; " + propName;
            var propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }

        document.cookie = updatedCookie;
    }

    var headlinesTimeline = anime.timeline({ loop: true })

    headlinesTimeline.add({
        targets: document.querySelectorAll('.js-language-title')[0],
        opacity: [{ value: 1 }, { value: 0 }],
        duration: 6000,
        direction: 'alternate',
        easing: 'easeInOutQuart',
    })

    headlinesTimeline.add({
        targets: document.querySelectorAll('.js-language-title')[1],
        opacity: [{ value: 1 }, { value: 0 }],
        duration: 6000,
        direction: 'alternate',
        easing: 'easeInOutQuart',
    })

    redirect = e => {
        e.stopPropagation()
        var chosenLang = $(e.target).attr('data-lang')
        setCookie('Lang', chosenLang)

        // console.log(e.target)
        // console.log(chosenLang)
        // console.log('cookie :', document.cookie)
        location.href = "pin.html"
    }

    $('.js-language').on("click", redirect)
})