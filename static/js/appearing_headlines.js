$(document).ready(() => {
    var headlinesTimeline = anime.timeline({ loop: true })

    headlinesTimeline.add({
        targets: document.querySelectorAll('.js-appearing-headline')[0],
        opacity: [{ value: 1 }, { value: 0 }],
        duration: 6000,
        direction: 'alternate',
        easing: 'easeInOutQuart',
    })

    headlinesTimeline.add({
        targets: document.querySelectorAll('.js-appearing-headline')[1],
        opacity: [{ value: 1 }, { value: 0 }],
        duration: 6000,
        direction: 'alternate',
        easing: 'easeInOutQuart',
    })
})