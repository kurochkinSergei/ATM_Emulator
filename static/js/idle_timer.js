$(document).ready(() => {
    //$.idleTimer(60000);
    $(document).bind('idle.idleTimer', function() {
        location.href = 'index.html'
    });
})