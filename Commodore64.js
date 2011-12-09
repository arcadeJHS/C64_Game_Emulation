var Commodore64 = function (pixelSize) {

    var C64 = this;
    this.pixelSize = pixelSize || 1;
    this.palette = [[255, 255, 255, 0], 		// 0 - transparent
					[0, 0, 0, 255], 			// 1
					[255, 255, 255, 255], 		// 2
					[104, 55, 43, 255], 		// 3
					[112, 164, 178, 255], 		// 4
					[111, 61, 134, 255], 		// 5
					[88, 141, 67, 255], 		// 6
					[53, 40, 121, 255], 		// 7
					[184, 199, 111, 255], 		// 8
					[111, 79, 37, 255], 		// 9
					[67, 57, 0, 255], 			// 10
					[154, 103, 89, 255], 		// 11
					[68, 68, 68, 255], 			// 12
					[108, 108, 108, 255], 		// 13
					[154, 210, 132, 255], 		// 14
					[108, 94, 181, 255], 		// 15
					[149, 149, 149, 255]]; 		// 16


    // <<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>>
    // GAME
    // <<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>>
    this.game = null;

    this.Load = function (game, pixelSize) {
        try {
            this.game = window[game];
            this.pixelSize = pixelSize || this.pixelSize;
            this.game();
        }
        catch (e) {
            alert("?FILE NOT FOUND ERROR\nREADY");
        }
    };


    // <<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>>
    // SPRITE
    // <<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>>
    this.Sprite = function (sParams) {

        this.id = sParams.name || "sprite";
        this.palette = sParams.palette || [0, 0, 0, 0];   // provides a default transparent pixels palette
        this.tiles = sParams.tiles || "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"; // provides a transparent sprite as default

        this.pixelSize = C64.pixelSize;
        this.numTileCols = 12;
        this.numTileRows = 21;
        this.numMicroCols = 4;
        this.numMacroCols = 3;
        this.spriteWidth = (this.numTileCols * (this.pixelSize * 2));
        this.spriteHeight = (this.numTileRows * this.pixelSize);


        // <<>><<>>  Sprite => public members <<>><<>><<>>
        this.draw = function () {
            var canvas = document.createElement("canvas");
            canvas.id = this.id;
            canvas.width = this.spriteWidth;
            canvas.height = this.spriteHeight;
            document.body.appendChild(canvas);

            var context = canvas.getContext("2d");
            var imageData = context.createImageData(this.spriteWidth, this.spriteHeight);
            var pixels = imageData.data;

            var tileWidth = (this.spriteWidth / this.numTileCols);
            var tileHeight = (this.spriteHeight / this.numTileRows);

            var red, green, blue, alpha;
            var posX, posY, pos;
            var hexIdx, hexChar, binChar, binColorIdx, binColorValue, paletteIdx;

            var text = document.getElementById("text");

            for (var r = 0; r < this.numTileRows; r++) {
                for (var c = 0; c < this.numTileCols; c++) {


                    /// get color from hex to binary conversion
                    hexIdx = (2 * (Math.floor(c / this.numMicroCols) + (r * this.numMacroCols)));
                    hexChar = this.tiles.substring(hexIdx, hexIdx + 2);
                    binChar = _zPad(_convertToBase(hexChar, 2, 16), 8);
                    binColorIdx = (c - (this.numMicroCols * Math.floor(c / this.numMicroCols)));
                    binColorValue = binChar.substring(2 * binColorIdx, (2 * binColorIdx + 2));
                    paletteIdx = _convertToBase(binColorValue, 10, 2);
                    ///
                    red = C64.palette[this.palette[paletteIdx]][0];
                    green = C64.palette[this.palette[paletteIdx]][1];
                    blue = C64.palette[this.palette[paletteIdx]][2];
                    alpha = C64.palette[this.palette[paletteIdx]][3];


                    for (var tr = 0; tr < tileHeight; tr++) {
                        for (var tc = 0; tc < tileWidth; tc++) {
                            posX = (c * tileWidth) + tc;
                            posY = (r * tileHeight) + tr;
                            pos = (posY * (this.spriteWidth * 4)) + (posX * 4);

                            pixels[pos + 0] = red;
                            pixels[pos + 1] = green;
                            pixels[pos + 2] = blue;
                            pixels[pos + 3] = alpha;
                        }
                    }
                }
            }

            context.putImageData(imageData, 0, 0);
        };


        // <<>><<>>  Sprite => private members <<>><<>><<>>
        var _convertToBase = function (n, to, from) {
            return parseInt(n, from || 10).toString(to);
        };

        var _zPad = function (num, count) {
            var n = num.toString();
            while (n.length < count) n = "0" + n;
            return n;
        };

    }

}