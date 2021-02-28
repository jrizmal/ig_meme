const { By } = require('selenium-webdriver');
const profiles = require("./pages.json")

const getUrls = async function (driver) {
    let imageUrls = []

    for (const profile of profiles) {
        try {
            await driver.get(profile);
            await driver.sleep(1500)
            try {
                const acceptCookiesBtn = await driver.findElement({ className: "aOOlW  bIiDR  " })
                await acceptCookiesBtn.click()
                await driver.sleep(1000)
            } catch (error) {
                // console.log(error);
                console.log("skipped cookies");
                // continue
            }

            // const dontUseAppBtn = await driver.findElement({className:"XwxgD sqdOP yWX7d    y3zKF     "})
            // await dontUseAppBtn.click()
            const imageContainers = await driver.findElements({
                className: "v1Nh3 kIKUG  _bz0w"
            })
            for (const element of imageContainers) {
                const a = await element.findElement(By.css("a"))
                imageUrls.push(await a.getAttribute("href"))
            }

        }
        catch (e) {
            console.log(e);
        }
    }

    return imageUrls


}

module.exports = {
    getUrls
}