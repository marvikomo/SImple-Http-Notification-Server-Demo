"use strict";
class Generic {

static addhttp(url)
{
    let pattern = /^((http|https|ftp):\/\/)/;

    if(!pattern.test(url)) {
        url = "http://" + url;
    }
    return url

}

}

module.exports = Generic;