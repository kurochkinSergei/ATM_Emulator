$(document).ready(() => {
    redirect = e => {
        e.stopPropagation()
        var chosenLang = $(e.target).attr('data-lang')
        localStorage.setItem('lang', chosenLang)

        // console.log(e.target)
        // console.log(chosenLang)
        // console.log('cookie :', document.cookie)
        location.href = "pin.html"
    }

    $('.js-language').on("click", redirect)
})