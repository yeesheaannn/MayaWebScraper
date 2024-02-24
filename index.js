// Import necessary modules from the selenium-webdriver package
const { Builder, By, Key } = require("selenium-webdriver");
// Define an asynchronous function to run the WebDriver script
(async function run(){
// Create a new WebDriver instance for the Chrome browser
const driver = await new Builder().forBrowser('chrome').build();
// Navigate to the Maya website login page
await driver.get('https://maya.um.edu.my/sitsvision/wrd/siw_lgn');

let username = await driver.findElement(By.name('MUA_CODE.DUMMY.MENSYS.1'));
let password = await driver.findElement(By.name('PASSWORD.DUMMY.MENSYS.1'));
let loginButton = await driver.findElement(By.name('BP101.DUMMY_B.MENSYS'));
await username.sendKeys('YOUR MATRIC NUMBER');
await password.sendKeys('YOUR PASSWORD');
await loginButton.click();

let timetableButton = await driver.findElement(By.className('sv-tiled-cop sv-tiled-cop-c'));
await timetableButton.click();
let searchButtonContainer = await driver.findElement(By.className('ui-dialog-content ui-widget-content'));
let searchButton = await searchButtonContainer.findElement(By.className('sv-col-xs-3 sv-col-sm-2 sv-col-md-3 timetable_button'));
await searchButton.click();
    
let academicYearButton = await driver.findElement(By.className('chosen-container chosen-container-single'));
await academicYearButton.click();
let yearTextBox = await driver.findElement(By.css('.chosen-search input'));
await yearTextBox.sendKeys('2023/2024');
let actions = driver.actions();
await actions.sendKeys(Key.ARROW_DOWN).perform();
await actions.sendKeys(Key.ENTER).perform();
let periodSlotButton = await driver.findElements(By.className('chosen-container chosen-container-single'));
await periodSlotButton[1].click();
await actions.sendKeys('SEMESTER 2');
for (let i = 0; i < 12; i++) {
    await actions.sendKeys(Key.ARROW_DOWN).perform();
    await driver.sleep(100); 
}
await actions.sendKeys(Key.ENTER).perform();
let facultyButton = await driver.findElements(By.className('chosen-container chosen-container-single'));
await facultyButton[2].click();
let inputFaculty = await driver.findElements(By.css('.chosen-search input'));
await inputFaculty[2].sendKeys('FACULTY OF COMPUTER SCIENCE AND INFORMATION TECHNOLOGY');
actions = driver.actions();
await actions.sendKeys(Key.ARROW_DOWN).perform();
await actions.sendKeys(Key.ENTER).perform();
let submitButton = await driver.findElement(By.name('BP103.DUMMY_B.MENSYS.1'));
await submitButton.click();

let lastButtonContainer = await driver.findElement(By.className('paginate_button last'));
let lastButton = await lastButtonContainer.findElement(By.css('a'));
await lastButton.click();
let lastLi = await driver.findElement(By.className('paginate_button sv-pagination-page sv-active'));
let lastA = await lastLi.findElement(By.css('a'));
let totalPages = await lastA.getText();
let firstButtonContainer = await driver.findElement(By.className('paginate_button first'));
let firstButton = await firstButtonContainer.findElement(By.css('a'));
await firstButton.click();

// Start scraping the data from the web pages
let csv = 'sep=;\n';
let headers = await driver.findElements(By.className('sorting'));
let module = await driver.findElement(By.className('sorting_asc')).getText();
csv += module + ";";
for (let i = 0; i < (await headers).length; i++) {
    if (i !== headers.length - 1) {
        csv += await headers[i].getText() + ";";
    } else {
        csv += await headers[i].getText() + "\n";
    }
}
for (let i = 0; i < Number(totalPages); i++) {
    const trs = await driver.findElements(By.css('.odd, .even'));
    const trNumber = trs.length;
        for (let x = 0; x < trNumber; x++) {
            let tds = await trs[x].findElements(By.css('td'));
            for (let y = 0; y < tds.length; y++) {
                let td = (await tds[y].getText()).replace("\n", " ");
                console.log(td.trim());
                    if (y !== tds.length - 1) {
                        csv += td.trim() + ';';
                    } else {
                        csv += td.trim() + '\n';
                    }
            }
            console.log("\n");
        }
let nextButtonContainer = await driver.findElement(By.className('paginate_button next'));
let nextButton = await nextButtonContainer.findElement(By.css('a'));
await nextButton.click();
}

// Write data to CSV file
const fs = require('fs');
fs.writeFile('output.csv', csv, 'utf8', function (err) {
    if (err) {
        console.log('Error occurred while writing to file:', err);
    } else {
        console.log('Data has been written to output.csv');
    }
})
})()
