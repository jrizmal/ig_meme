const { getUrls } = require("./getUrls.js")
const { Options, Driver } = require("selenium-webdriver/chrome")
const { By } = require('selenium-webdriver');
var fs = require('fs'),
    request = require('request');

var download = function (uri, filename, callback) {

    request.head(uri, function (err, res, body) {
        // console.log('content-type:', res.headers['content-type']);
        // console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

async function downloadImages() {
    let opts = new Options()
    opts.setMobileEmulation({
        deviceName: "iPhone X"
    })
    opts.addArguments(["--incognito"])
    let driver = Driver.createSession(opts)

    let counter = 0

    const urls = await getUrls(driver);
    console.log(`Got ${urls.length} urls.`);
    
    let image_meta = []

    for (const url of urls) {
        await driver.get(url)
        await driver.sleep(1000)
        let img
        try {
            img = await driver.findElement(By.className("FFVAD"))
        } catch (error) {
            continue
        }


        const split = url.split("/")
        const uri = await img.getAttribute("src")
        const imageName = split[split.length - 2] + ".jpg"
        if (uri) {
            // console.log(split);
            download(await img.getAttribute("src"), "./images/" + imageName, function () {
                counter++
            });
            image_meta.push({
                file: imageName,
                approved: false
            })
        }

    }
    fs.writeFileSync("./images/meta.json",JSON.stringify(image_meta,null,"\t"))
    console.log(`Downloaded ${counter} images.`);
    driver.quit()
}

downloadImages();