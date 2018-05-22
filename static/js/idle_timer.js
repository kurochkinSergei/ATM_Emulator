$(document).ready(() => {
    $.idleTimer(120000); //120000ms - > 2min
    $(document).bind('idle.idleTimer', function() {
        location.href = 'index.html'
    });
})