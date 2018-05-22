$(document).ready(() => {
    var TIME_BETWEEN_HEADLINES = 3000,
        TIME_BETWEEN_WORDS = 500,
        TIME_HEADLINE_FADING = 2000,
        TIME_TEXT_SHOWN = 2000

    var headlines = document.querySelectorAll('.js-headline'),
        words = document.querySelectorAll('.js-word')

    // var totalDuration = (TIME_BETWEEN_HEADLINES + TIME_HEADLINE_FADING) * (headlines.length) +
    //     (TIME_BETWEEN_WORDS + TIME_TEXT_SHOWN) * (words.length - headlines.length)
    var totalDuration = (TIME_BETWEEN_HEADLINES + TIME_HEADLINE_FADING) * (headlines.length) +
        (TIME_BETWEEN_WORDS) * (words.length)

    var headlinesTimeline = anime.timeline()

    for (let i = 0; i < headlines.length; i++) {
        (() => {
            let ii = i
            headlinesTimeline.add({
                targets: headlines[i].children,
                translateY: -100,
                opacity: 1,
                easing: 'easeInOutQuart',
                delay: (el, i, l) => {
                    return TIME_BETWEEN_WORDS + (i * TIME_BETWEEN_WORDS);
                },
                complete: () => {
                    anime({
                        targets: headlines[ii].children,
                        opacity: 0,
                        duration: TIME_HEADLINE_FADING,
                        easing: 'easeInOutQuart',
                        delay: TIME_TEXT_SHOWN
                    })
                },
                offset: '+=' + TIME_BETWEEN_HEADLINES
            })
        })()
    }

    setInterval(() => {
        headlinesTimeline.restart()
    }, totalDuration)

    $(document).on('click', () => {
        location.href = 'language.html'
    })
})