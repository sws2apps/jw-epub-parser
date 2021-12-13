const { parseEpub } = require('@gxl/epub-parser');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = loadEPUB = async (epubData) => {
    // check parameter
    if (!epubData) {
        throw new Error('The required parameter is missing. Please provide file object, or file path, or ArrayBuffer.')
    }
    
    // Assign varibale to hold the final input
    let epubInput;

    // Check if we got a FileObject with name property, otherwise it is path or ArrayBuffer
    if (epubData.name) {
        const getDataEPUB = () => {
            return new Promise((resolve, reject) => {
                let reader = new FileReader();
                reader.readAsArrayBuffer(epubData);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        }

        try {
            epubInput = await getDataEPUB();
        } catch {
            throw new Error('There is an issue when loading the file you have provided. Please make sure that file is correct.')
        }
    } else {
        epubInput = epubData;
    }

    // use the ArrayBuffer data or epub file path
    let parsedEPUB;

    const getParsedEPUB = async () => {
        return new Promise((resolve, reject) => {
            parseEpub(epubInput)
            .then((data) => {
                resolve(data);
            })
            .catch(() => {
                reject();
            })
        });
    }

    try {
        parsedEPUB = await getParsedEPUB();
    } catch (error) {
        throw new Error('There is an issue when reading and parsing the EPUB file you provide. Make sure that the file is correct.')
    }

    // check if epub data is valid JW EPUB file
    let validFiles = [];
    let mwbYear;

    if (parsedEPUB.info.author || parsedEPUB.info.author === "WATCHTOWER") {
        mwbYear = parsedEPUB.info.title.match(/(\d+)/)[0];

        const epubSections = parsedEPUB.sections;
        const pgCount = epubSections.length;
        for(let i=0; i < pgCount; i++) {
            const section = epubSections[i];
            const dom = new JSDOM(section.htmlString);

            const htmlDoc = dom.window.document;

            const isValidTGW = htmlDoc.querySelector(`[class*=treasures]`) ? true : false;
            const isValidAYF = htmlDoc.querySelector(`[class*=ministry]`) ? true : false;
            const isValidLC = htmlDoc.querySelector(`[class*=christianLiving]`) ? true : false;


            if (isValidTGW === true && isValidAYF === true && isValidLC === true) {
                let obj = {};
                obj.html = htmlDoc;
                validFiles.push(obj);
            }
        };

        if (validFiles.length === 0 ) {
            throw new Error('The file you provided is not a valid Meeting Workbook EPUB file. Please make sure that the file is correct.')
        }
    } else {
        throw new Error('The file you provided is not a valid Meeting Workbook EPUB file. Please make sure that the file is correct.')
    }

    // epub validated, start extract
    let weeksCount;
    let weeksData = [];

    weeksCount = validFiles.length;    

    for(let a=0; a < weeksCount; a++) {
        let weekItem = {};

        const htmlItem = validFiles[a].html;

        const wdHtml = htmlItem.getElementsByTagName("h1").item(0);
        const weekDate = wdHtml.textContent;
        weekItem.weekDate = weekDate;

        const wbHtml = htmlItem.getElementsByTagName("h2").item(0);
        weekItem.weeklyBibleReading = wbHtml.textContent;

        let src = "";
        let cnLC = 0;

        const cnAYF = htmlItem.querySelector("#section3").querySelectorAll("li").length;
        const lcLiLength = htmlItem.querySelector("#section4").querySelectorAll("li").length;

        cnLC = lcLiLength === 6 ? 2 : 1;

        const pGroupData = htmlItem.querySelectorAll(".pGroup");
        pGroupData.forEach(pGroup => {
            pgData = pGroup.querySelectorAll("p");
            pgData.forEach(p => {
                src+= "|" + p.textContent;
            })
        })

        src.replace(/\u00A0/g, ' '); // remove non-breaking space
        let toSplit = src.split("|");

        // First song
        weekItem.songFirst = toSplit[1].match(/(\d+)/)[0];

        // 10min TGW Source
        weekItem.tgw10Talk = toSplit[3].trim();

        //Bible Reading Source
        weekItem.tgwBRead = toSplit[7].trim();

        // AYF Part Count
        weekItem.ayfCount = cnAYF;

        //AYF1 Source
        weekItem.ayfPart1 = toSplit[8].trim();

        if (cnAYF > 1) {
            //AYF2 Source
            weekItem.ayfPart2 = toSplit[9].trim();
        }
    
        if (cnAYF > 2) {
            //AYF3 Source
            weekItem.ayfPart3 = toSplit[10].trim();
        }
    
        if (cnAYF > 3) {
            //AYF4 Source
            weekItem.ayfPart3 = toSplit[11].trim();
        }

        // Middle song
        let nextIndex = cnAYF > 3 ? 12 : cnAYF > 2 ? 11 : cnAYF > 1 ? 10 : 9;
        weekItem.songMiddle = toSplit[nextIndex].match(/(\d+)/)[0];

        // LC Part Count
        weekItem.lcCount = cnLC;

        // 1st LC part
        nextIndex++;
        weekItem.lcPart1 = toSplit[nextIndex].trim();

        if (cnLC === 2) {
            // 1st LC part
            nextIndex++;
            weekItem.lcPart2 = toSplit[nextIndex].trim();
        }

        // CBS Source
        nextIndex++;
        weekItem.lcCBS = toSplit[nextIndex].trim();

        // Concluding Song
        nextIndex++;
        nextIndex++;
        weekItem.songConclude = toSplit[nextIndex].match(/(\d+)/)[0];

        weeksData.push(weekItem);
    }

    return { mwbYear, weeksCount, weeksData };
}