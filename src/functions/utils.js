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

const InsertValue = async(string) => {
    Logger.log('[InsertValue()]: starting function.');
    const Progress = Tamotsu.Table.define({
        sheetName: 'Database',
        rowShift: 0,
        columnShift: 0,
    });

    Progress.create({
        "":"",
        
    });

    var likeCondoname = await Progress.all();
    return likeCondoname;
};

const filterByValueLike = async(string) => {
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
        keys.forEach(function(key) {
            tmp[key] = argsObject[key];
        });
    }
    return tmp
        .evaluate()
        .setTitle('แบบบันทึกเวลาบริการและอุณหภูมิการส่งอาหารผู้ป่วยประจำวัน')
        .setFaviconUrl(
            'https://www.vimut.com/favicon.ico'
        );
};

export { setDataToStore, getDataFromRange, isEmpty, filterByValue, filterByValueLike, render };