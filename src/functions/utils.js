/*- getDataFromRange: This function 3 argument requried (sheet : sheet name, range : range data in sheet wanna store data, 
value : the value you wanna to store in sheet). It's not return.-*/
const setDataToStore = (range, value) => {
    SpreadsheetApp.getActive().getSheetByName('StoreData').getRange(range).setValue(value);
};

/*- getDataFromRange: This function 2 argument requried (sheet : sheet name, range : range data in sheet wanna get it). It's will return range data.-*/
const getDataFromRange = (sheetname, range) => {
    return SpreadsheetApp.getActive().getSheetByName(sheetname).getRange(range).getValue();
};

/*- isEmpty: This function 1 argument requried (text : that wanna check is emtry or null). It's will return True or False.-*/
const isEmpty = (text) => {
    return text === '' ? true : false;
};

const parseCustomDateTime = (dateTimeStr) => {
    var parts = dateTimeStr.split(' ');
    var dateParts = parts[0].split('/');
    var timeParts = parts[1].split(':');

    var day = parseInt(dateParts[0], 10);
    var month = parseInt(dateParts[1], 10) - 1;
    var year = parseInt(dateParts[2], 10);
    var hours = parseInt(timeParts[0], 10);
    var minutes = parseInt(timeParts[1], 10);

    return new Date(year, month, day, hours, minutes);
}

const InsertValue = async (model) => {
    Logger.log('[InsertValue()]: starting function.' + JSON.stringify(model));
    model = JSON.parse(JSON.stringify(model));

    var diffTemp = parseInt(model.tmwd) - parseInt(model.tmfh);

    var start = parseCustomDateTime(model.startDTM);
    var end = parseCustomDateTime(model.finishDTM);
    var diffInMilliseconds = end - start;

    var diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    var hours = Math.floor(diffInSeconds / 3600);
    var minutes = Math.floor((diffInSeconds % 3600) / 60);
    var seconds = diffInSeconds % 60;

    var formattedDiff =
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0');

    Logger.log('[InsertValue()]: formattedDiff.' + formattedDiff);

    const Progress = Tamotsu.Table.define({
        sheetName: 'Database',
        rowShift: 0,
        columnShift: 0,
    });

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Database');
    var tmp_data = [
        model.finishDTM,
        model.meats,
        model.locations,
        model.startDTM,
        model.finishDTM,
        formattedDiff,
        model.tmfh,
        model.tmwd,
        diffTemp,
    ];
    sheet.appendRow(tmp_data);

    var likeCondoname = await Progress.all();
    return JSON.stringify(likeCondoname);
};

const filterByValueLike = async (string) => {
    Logger.log('[filterByValueLike()]: starting function.');
    const Progress = Tamotsu.Table.define({
        sheetName: 'Database',
        rowShift: 0,
        columnShift: 0,
    });

    var likeCondoname = await Progress.all();
    Logger.log('[filterByValueLike()]: likeCondoname.' + JSON.stringify(likeCondoname));
    likeCondoname = await likeCondoname.filter((elem) => {
        if (
            String(elem['Location'])
                .trim()
                .toLocaleLowerCase()
                .match(
                    new RegExp('.*' + string.trim().toLocaleLowerCase().split(/\s+/).join('|') + '.*\\b', 'g')
                )
        ) {
            return true;
        }
        return false;
    });
    return likeCondoname;
};

const filterByValue = (string) => {
    Logger.log('[filterByValue()]: starting function.');
    const Progress = Tamotsu.Table.define({
        sheetName: 'Database',
        rowShift: 0,
        columnShift: 0,
    });
    if (string) {
        var finalarray = Progress.where((row) => {
            return String(row['Transaction DTM']).trim() !== '';
        })
            .all()
            .filter((o) =>
                Object.keys(o).some((k) => String(o[k]).toLowerCase().includes(string.toLowerCase()))
            );
    } else {
        var finalarray = Progress.where((row) => {
            return String(row['Transaction DTM']).trim() !== '';
        }).all();
    }

    // Logger.log("[filterByValue()]" + JSON.stringify(finalarray));
    return JSON.stringify(finalarray);
};

const render = (file, argsObject) => {
    var tmp = HtmlService.createTemplateFromFile(file);
    if (argsObject) {
        var keys = Object.keys(argsObject);
        keys.forEach(function (key) {
            tmp[key] = argsObject[key];
        });
    }
    return tmp
        .evaluate()
        .setTitle('แบบบันทึกเวลาบริการและอุณหภูมิการส่งอาหารผู้ป่วยประจำวัน')
        .setFaviconUrl('https://foodhouse.co.th/wp-content/uploads/2018/12/cropped-image09-180x180.png')
        .addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
};

const getScriptURL = () => {
    return ScriptApp.getService().getUrl();
};

export {
    setDataToStore,
    getDataFromRange,
    isEmpty,
    filterByValue,
    filterByValueLike,
    render,
    InsertValue,
    getScriptURL,
    parseCustomDateTime
};
