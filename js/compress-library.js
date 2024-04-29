function compress(data) {
    let sortMass = Array(301).fill(0);
    data.forEach(a => {
        sortMass[a]++;
    });
    let temp = '';
    let result = '';
    let result2 = '';
    let sep = 0;
    let part;
    let parts = [true, true, true, true, true];
    sortMass.forEach( (a, index) => {
        if (a != 0) {
            if (index < 10) {
                if (a > 3) {
                    temp += (Math.floor(a / 256) + 10).toString(2);
                    temp += (a % 256).toString(2).padStart(8, 0);
                } else {
                    for (let i = 1; i < a; i++) {
                        temp += index.toString(2).padStart(4, 0)
                    }
                }
                temp += index.toString(2).padStart(4, 0)
            } else {
                part = Math.floor((index - 10) / 50)
                if (parts[part]) {
                    temp += (56 + part).toString(2);
                    parts[part] = false;
                }
                if (a > 3) {
                    temp += (Math.floor(a / 256) + 50).toString(2);
                    temp += (a % 256).toString(2).padStart(8, 0);
                } else {
                    for (let i = 1; i < a; i++) {
                        temp += ((index - 10) % 50).toString(2).padStart(6, 0);
                    }
                }
                temp += ((index - 10) % 50).toString(2).padStart(6, 0);
            }
            while (temp.length >= 8) {
                let code = temp.slice(0, 8);
                result2 += code;
                result += String.fromCharCode(parseInt(code, 2));
                temp = temp.substring(8);
            }
        }
    })
    if (temp.length > 0) {
        let code = temp.padEnd(8, 1)
        result += String.fromCharCode(parseInt(code, 2));
    }
    return result;
}

function decompress(s) {
    let sortMass = Array(301).fill(0);
    let result = [];
    let sep = 0;
    let section = 0;
    let one = true;
    let part = -1;
    let index = 0;
    let temp = '';
    while (index < s.length || one && temp.length > 3 || !one && temp.length > 5) {
        if (temp.length < 8 && index < s.length) {
            temp += s.charCodeAt(index++).toString(2).padStart(8, 0);
        }
        if (one) {
            code = temp.substring(0, 4)
            if (code >= '1110') {
                one = false;
            }
            else {
                temp = temp.substring(4)
                if (code > '1001') {
                    let part = parseInt(code, 2) - 10;
                    if (temp.length < 8) {
                        temp += s.charCodeAt(index++).toString(2).padStart(8, 0);
                    }
                    code = temp.substring(0, 8)
                    temp = temp.substring(8)
                    let count = part * 256 + parseInt(code, 2);

                    if (temp.length < 4) {
                        temp += s.charCodeAt(index++).toString(2).padStart(8, 0);
                    }
                    code = temp.substring(0, 4)
                    temp = temp.substring(4)
                    let num = parseInt(code, 2);
                    sortMass[num] += count;
                }
                else {
                    let num = parseInt(code, 2);
                    sortMass[num]++;
                }
            }
        }
        else {
            code = temp.substring(0, 6)
            temp = temp.substring(6)
            if (code >= '111000') {
                section = parseInt(code, 2) - 56;
            }
            else if (code >= '110010') {
                let part = parseInt(code, 2) - 50;
                if (temp.length < 8) {
                    temp += s.charCodeAt(index++).toString(2).padStart(8, 0);
                }
                code = temp.substring(0, 8)
                temp = temp.substring(8)
                let count = part * 256 + parseInt(code, 2);

                if (temp.length < 6) {
                    temp += s.charCodeAt(index++).toString(2).padStart(8, 0);
                }
                code = temp.substring(0, 6)
                temp = temp.substring(6)
                let num = parseInt(code, 2);
                sortMass[section * 50 + 10 + num] += count;
            }
            else {
                let num = parseInt(code, 2);
                sortMass[section * 50 + 10 + num]++;
            }
        }
    }

    sortMass.forEach( (a, index) => {
        for (let i = 0; i < a; i++) {
            result.push(index);
        }
    })
    return result;
}