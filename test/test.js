( function() {
    window.onload = function() {
        var output = document.getElementById( 'output' );
        var count  = 0;
        var tick = new TickTack( function() {
            count ++;
            output.innerHTML = count+': Fire!<br>'+output.innerHTML;
        }, 30 );
        tick.start();

        setTimeout( function() {
            tick.stop();
        }, 2000 );
    };
} )();