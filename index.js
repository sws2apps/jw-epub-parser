const { parseEpub } = require('@gxl/epub-parser');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = loadEPUB = async (epubData, monthNames) => {
    // epubData could be a FileObject from file select dialog, a file path or ArrayBuffer

    // check parameters
    if (!epubData || !monthNames) {
        throw new Error('The required parameters are missing. Please provide file object, or file path, or ArrayBuffer to begin. Also, make sure that you have included the month names array as second parameters.')
    }
    
    // Assign variable to hold the final ArrayBuffer
    let epubBuffer;

    // Check if we got a FileObject
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
        var epubSections = parsedEPUB.sections;
        var pgCount = epubSections.length;
        for(let i=0; i < pgCount; i++) {
            var section = epubSections[i];
            const dom = new JSDOM(section.htmlString);
            let div = dom.window.document;
            var MeetingSection = div.getElementsByTagName("h2");
            if (MeetingSection.length === 4) {
                var isValidTGW = false;
                var T = div.getElementsByTagName("h2").item(1).parentNode;
                if (T.hasAttribute("class") === true) {
                    if (T.getAttribute("class").includes("treasures") === true) {
                        isValidTGW = true;
                    }
                }
                
                var isValidAYF = false;
                T = div.getElementsByTagName("h2").item(2).parentNode;
                if (T.hasAttribute("class") === true) {
                    if (T.getAttribute("class").includes("ministry") === true) {
                        isValidAYF = true;
                    }
                }
                
                var isValidLC = false;
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
    weeksCount = validFiles.length;
    let weeksData = [];

    for(let a=0; a < weeksCount; a++) {
        let weekItem = {};

        div = validFiles[a].html;
        let wdHtml = div.getElementsByTagName("h1");
        var weekDate = wdHtml[0].textContent;

        weekItem.weekDate = weekDate;

        weeksData.push(weekItem);
    }

    console.log(weeksData)

    return { weeksCount };
}