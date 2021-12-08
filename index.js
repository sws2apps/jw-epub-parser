const { parseEpub } = require('@gxl/epub-parser');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = loadEPUB = async (epubData) => {
    // epubData could be a FileObject, a file path or ArrayBuffer

    // check parameter
    if (!epubData) {
        throw new Error('The required parameter is missing. Please provide file object, or file path, or ArrayBuffer to begin.')
    }
    
    // Assign letiable to hold the final ArrayBuffer
    let epubBuffer;

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
            epubBuffer = await getDataEPUB();
        } catch {
            throw new Error('There is an issue when loading the file you have provided. Please make sure that file is correct.')
        }
    } else {
        epubBuffer = epubData;
    }

    // use the ArrayBuffer data
    let parsedEPUB;
    const getParsedEPUB = async () => {
        return new Promise((resolve, reject) => {
            parseEpub(epubBuffer)
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

    // check if epub data is valid
    let validFiles = [];
    if (parsedEPUB.info.author || parsedEPUB.info.author === "WATCHTOWER") {
        let epubSections = parsedEPUB.sections;
        let pgCount = epubSections.length;
        for(let i=0; i < pgCount; i++) {
            let section = epubSections[i];
            const dom = new JSDOM(section.htmlString);
            let div = dom.window.document;
            let MeetingSection = div.getElementsByTagName("h2");
            if (MeetingSection.length === 4) {
                let isValidTGW = false;
                let T = div.getElementsByTagName("h2").item(1).parentNode;
                if (T.hasAttribute("class") === true) {
                    if (T.getAttribute("class").includes("treasures") === true) {
                        isValidTGW = true;
                    }
                }
                
                let isValidAYF = false;
                T = div.getElementsByTagName("h2").item(2).parentNode;
                if (T.hasAttribute("class") === true) {
                    if (T.getAttribute("class").includes("ministry") === true) {
                        isValidAYF = true;
                    }
                }
                
                let isValidLC = false;
                T = div.getElementsByTagName("h2").item(3).parentNode;
                if (T.hasAttribute("class") === true) {
                    if (T.getAttribute("class").includes("christianLiving") === true) {
                        isValidLC = true;
                    }
                }

                if (isValidTGW === true && isValidAYF === true && isValidLC === true) {
                    let obj = {};
                    obj.html = div;
                    validFiles.push(obj);
                }
            };
        };

        if (validFiles.length === 0 ) {
            throw new Error('The file you provided is not a valid Meeting Workbook or Watchtower Study EPUB file. Please make sure that the file is correct.')
        }
    } else {
        throw new Error('The file you provided is not a valid Meeting Workbook or Watchtower Study EPUB file. Please make sure that the file is correct.')
    }

    // epub validated, start extract
    let weeksCount;
    let weeksData = [];

    weeksCount = validFiles.length;    

    for(let a=0; a < weeksCount; a++) {
        let weekItem = {};

        div = validFiles[a].html;
        let wdHtml = div.getElementsByTagName("h1");
        let weekDate = wdHtml[0].textContent;

        weekItem.weekDate = weekDate;

        let src = "";
        let cnAYF = 1;

        MeetingSection = div.getElementsByTagName("div");
        for(let a=0; a < MeetingSection.length; a++) {
            for(let b=1; b <= 4; b++) {
                let idSection = "section" + b;
                if (MeetingSection[a].getAttribute("id") === idSection) {
                    let MeetingPart = MeetingSection[a].children;
                    for(let c=0; c < MeetingPart.length; c++) {
                        if (MeetingPart.item(c).className === "pGroup") {
                            let part1 = MeetingPart.item(c).children;
                            for(let d=0; d < part1.length; d++) {
                                let part2 = part1.item(d).children;
                                for(let e=0; e < part2.length; e++) {
                                    let part3 = part2.item(e).children;
                                    for(let f=0; f < part3.length; f++) {
                                        if (part3.item(f).nodeName.toLocaleLowerCase() === "p") {
                                            src+= "|" + part3.item(f).textContent.replace(" ", " ");
                                        };
                                    }
                                }
                            }
                            break;
                        }
                    }

                    if (b === 3) {
                        cnAYF = 0;
                        for(let c=0; c < MeetingPart.length; c++) {
                            if (MeetingPart.item(c).className === "pGroup") {
                                part1 = MeetingPart.item(c).children;
                                for(let d=0; d < part1.length; d++) {
                                    part2 = part1.item(d).children;
                                    cnAYF = part2.length;
                                }
                                break;
                            }
                        }
                    }
                    break;
                }
            }
        }

        weekItem.cnAYF = cnAYF;

        let toSplit = src.split("|");
        let toSplit1;
        let assType = "";

        //WeekOf Source
        toSplit1 = toSplit[0];
        weekItem.weekOf = toSplit1;

        //Bible Reading Source
        toSplit1 = toSplit[5].split(".)");
        weekItem.bibleReadingSrc = toSplit1[1].trim();

        //AYF1 Assignment Type
        toSplit1 = toSplit[6].split(": (");
        assType = toSplit1[0];
        assType = assType.trim();
        weekItem.ass1Type = assType;

        //AYF1 Assignment Time
        toSplit1 = toSplit[6].split(".)");
        weekItem.ass1Time = toSplit1[0].match(/(\d+)/)[0];

        //AYF1 Assignment Source
        toSplit1 = toSplit[6].split("min.) ");
        assSource = toSplit1[1];
        weekItem.ass1Src = assSource;

        if (cnAYF > 1) {
            //AYF2 Assignment Type
            toSplit1 = toSplit[7].split(": (");
            assType = toSplit1[0];
            assType = assType.trim();
            weekItem.ass2Type = assType;
    
            //AYF2 Assignment Time
            toSplit1 = toSplit[7].split(".)");
            weekItem.ass2Time = toSplit1[0].match(/(\d+)/)[0];
    
            //AYF2 Assignment Source
            toSplit1 = toSplit[7].split("min.) ");
            assSource = toSplit1[1];
            weekItem.ass2Src = assSource;
        }
    
        if (cnAYF > 2) {
            //AYF3 Assignment Type
            toSplit1 = toSplit[8].split(": (");
            assType = toSplit1[0];
            assType = assType.trim();
            weekItem.ass3Type = assType;
    
            //AYF3 Assignment Time
            toSplit1 = toSplit[8].split(".)");
            weekItem.ass3Time = toSplit1[0].match(/(\d+)/)[0];
    
            //AYF3 Assignment Source
            toSplit1 = toSplit[8].split("min.) ");
            assSource = toSplit1[1];
            weekItem.ass3Src = assSource;
        }
    
        if (cnAYF > 3) {
            //AYF4 Assignment Type
            toSplit1 = toSplit[9].split(": (");
            assType = toSplit1[0];
            assType = assType.trim();
            weekItem.ass4Type = assType;
    
            //AYF4 Assignment Time
            toSplit1 = toSplit[9].split(".)");
            weekItem.ass4Time = toSplit1[0].match(/(\d+)/)[0];
    
            //AYF4 Assignment Source
            toSplit1 = toSplit[9].split("min.) ");
            assSource = toSplit1[1];
            weekItem.ass4Src = assSource;
        }

        weeksData.push(weekItem);
    }

    return { weeksCount, weeksData };
}