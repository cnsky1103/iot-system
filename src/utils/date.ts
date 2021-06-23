function formDate(dateForm) {
    if (dateForm === "") {  //解决deteForm为空传1970-01-01 00:00:00
        return formDate("1970-01-01T00:00:00.000Z");
    } else {
        var dateee = new Date(dateForm).toJSON();
        var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
        return date;
    }
}

function formDateTime(dateForm) {
    return new Date(formDate(dateForm)).getTime()
}

/* console.log(formDate("2021-06-13T12:03:14.030Z")) //2021-06-13 20:03:14
console.log(formDateTime("2021-06-13T12:03:14.030Z"))// 1623585794000 */

export {
    formDate,
    formDateTime
}