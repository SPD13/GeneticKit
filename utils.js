function intFromBytesOld(x) {
    var val = 0;
    for (var i = 0; i < x.length; ++i) {
        val += x[i];
        if (i < x.length - 1) {
            val = val << 8;
        }
    }
    return val;
}

//Byte order little
function intFromBytes(buf) {
    return buf[0] | buf[1] << 8;
}

//Byte order is big-endian (network byte order).
function intFromBytesB(array) {
    var value = 0;
    for (var i = 0; i < array.length; i++) {
        value = (value * 256) + array[i];
    }
    return value;
}

function intTo1Byte(long) {
    return long;// & 0xff;
}

function intTo2Bytes(long) {
    // we want to represent the input as a 2-bytes array
    var byteArray = [0, 0];

    for (var index = 0; index < byteArray.length; index++) {
        var byte = long & 0xff;
        byteArray [index] = byte;
        long = (long - byte) / 256;
    }

    return byteArray;
}

function dec2hex(n){
    return n ? [n%256].concat(dec2hex(~~(n/256))) : [];
}

function toBigEndian(bytes){
    const dv = new DataView(new Uint8Array(bytes).buffer);
    const uint = dv.getUint16(0, /* little endian data */ false);
    return intTo2Bytes(uint);
    //var hexar = dec2hex(n);
    //return hexar.map(h => (h < 16 ? "0x0" : "0x") + h.toString(16))
     //   .concat(Array(4-hexar.length).fill("0x00"));
}

function string2Bin(str) {
    var enc = new TextEncoder();
    return enc.encode(str);
    /*var result = [];
    for (var i = 0; i < str.length; i++) {
      result.push(str.charCodeAt(i));
    }
    return new Uint8Array(result);*/
}

function mergeUint8Arrays(a, b) {
    var c = new Uint8Array(a.length + b.length);
    c.set(a);
    c.set(b, a.length);

    return c;
}

function fixedLengtharray(array, length) {
    if (array.length>length) {
        array = array.slice(0, length);
    }
    if (array.length<length) {
        var additional = new Uint8Array([length-array.length]);
        array = mergeUint8Arrays(array, additional);
    }
    return array;
}

function checkBitValue(number, bitPosition) {
    var mask = 1 << bitPosition; // gets the nth bit
    if ((number & mask) != 0) {
        return true;
    } else {
        return false;
    }
}

function updateBit(number, bitPosition, bitValue) {
    const bitValueNormalized = bitValue ? 1 : 0;
    const clearMask = ~(1 << bitPosition);
    return (number & clearMask) | (bitValueNormalized << bitPosition);
}