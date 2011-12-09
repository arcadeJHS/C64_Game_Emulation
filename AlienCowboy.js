var AlienCowboy = function () {

    var C64 = this; // "this" is the Commodore64 instance

    var s = new C64.Sprite({
        name: "AlienCowboy",
        palette: [0, 7, 3, 6],
        tiles: "0055000055005555550AAAA00828200828200B2B200B2B200AAAA002AA8000AA0000280000280002AA8002AA800282800282800282800282800A82A00A82A0"
    });

    s.draw();

};