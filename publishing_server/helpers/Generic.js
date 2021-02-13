"use strict";
class Generic {

static addhttp($url)
{
    let pattern = /^((http|https|ftp):\/\/)/;

if(!pattern.test(url)) {
    url = "http://" + url;
}

}

}

module.exports = Generic;