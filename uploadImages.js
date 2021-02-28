const { getUrls } = require("./getUrls.js")
const { Options, Driver } = require("selenium-webdriver/chrome")
const { By, until } = require('selenium-webdriver');
require("dotenv").config()

async function uploadImage() {
    let opts = new Options()
    opts.setMobileEmulation({
        deviceName: "iPhone X"
    })
    opts.addArguments(["--incognito"])
    let driver = Driver.createSession(opts)

    /* Login first */
    try {
        await driver.get("https://www.instagram.com/")
        await driver.sleep(500)

        const acceptCookiesBtn = await driver.findElement(By.css("body > div.RnEpo.Yx5HN > div > div > div > div.mt3GC > button.aOOlW.bIiDR"))
        await acceptCookiesBtn.click()

        await driver.sleep("500")

        const logInClick = await driver.wait(until.elementLocated(By.css("button.sqdOP.L3NKy.y3zKF")))
        await logInClick.click()

        await driver.sleep(500)

        /* #loginForm > div.Igw0E.IwRSH.eGOV_._4EzTm.kEKum > div:nth-child(3) > div > label > input */
        const usernameField = await driver.wait(until.elementLocated(By.css("#loginForm > div.Igw0E.IwRSH.eGOV_._4EzTm.kEKum > div:nth-child(3) > div > label > input")))
        await usernameField.sendKeys(process.env.IG_USERNAME)

        await driver.sleep(500)

        const passwordField = await driver.wait(until.elementLocated(By.css("#loginForm > div.Igw0E.IwRSH.eGOV_._4EzTm.kEKum > div:nth-child(4) > div > label > input")))
        await passwordField.sendKeys(process.env.IG_PASSWORD)

        await driver.sleep(500)

        /* #loginForm > div.Igw0E.IwRSH.eGOV_._4EzTm.kEKum > div:nth-child(6) > button */
        const loginButton = await driver.wait(until.elementLocated(By.css("#loginForm > div.Igw0E.IwRSH.eGOV_._4EzTm.kEKum > div:nth-child(6) > button")))
        await loginButton.click()

        await driver.sleep(500)

        /* #react-root > section > main > div > div > div > button */
        const nosaveInfoButton = await driver.wait(until.elementLocated(By.css("#react-root > section > main > div > div > div > button")))
        await nosaveInfoButton.click()

        await driver.sleep(500)
    } catch (error) {
        console.log("Login error");
        return
    }

    const meta = require("./images/meta.json")
    for (const m of meta) {
        if(!m.approved){
            continue
        }
        try {
            /* #react-root > section > nav.NXc7H.f11OC > div > div > div.KGiwt > div > div > div.q02Nz._0TPg */
            /* Click create new post */
            const newPostButton = await driver.wait(until.elementLocated(By.css("#react-root > section > nav.NXc7H.f11OC > div > div > div.KGiwt > div > div > div.q02Nz._0TPg")))
            await newPostButton.click()

            await driver.sleep(500)

            /* File input */
            /* #react-root > section > nav.NXc7H.f11OC > div > div > form > input */
            const imageInputField = await driver.wait(until.elementLocated(By.css("#react-root > section > nav.NXc7H.f11OC > div > div > form > input")))
            await imageInputField.sendKeys("/Users/jrizmal/Projects/ig_meme/images/" + m.file)

            await driver.sleep(1500)

            try {
                const resizeImageButton = await driver.wait(until.elementLocated(By.css("#react-root > section > div.gH2iS > div.N7f6u.Bc-AD > div > div > div > button.pHnkA")), 2000)
                await resizeImageButton.click()
            } catch (error) {
                console.log("image was square");
            }

            await driver.sleep(500)

            /* Click next */
            /* #react-root > section > div.Scmby > header > div > div.mXkkY.KDuQp > button */
            const imageShareNextButton = await driver.wait(until.elementLocated(By.css("#react-root > section > div.Scmby > header > div > div.mXkkY.KDuQp > button")))
            await imageShareNextButton.click()

            await driver.sleep(500)

            /* Share image */
            const wejt = await driver.wait(until.urlIs("https://www.instagram.com/create/details/"))
            const imageShareButton = await driver.wait(until.elementLocated(By.css("#react-root > section > div.Scmby > header > div > div.mXkkY.KDuQp > button")))
            /*  By.css("#react-root > section > div.Scmby > header > div > div.mXkkY.KDuQp > button","Share"   */
            await imageShareButton.click()
            const wejt2 = await driver.wait(until.urlIs("https://www.instagram.com/"))
        }
        catch{
            console.log("upload error");
        }
    }

}

uploadImage();