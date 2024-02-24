# **Maya Web Scraper**
## Overview
The Maya Web Scraper is a tool developed in JavaScript using the Selenium WebDriver library. It enables users to extract timetable information from the Maya website of the University of Malaya. The extracted data is stored in CSV format for further analysis and processing.

## Features
- Automated extraction of timetable database from the Maya website.
- Supports login functionality to access timetable data.
- Extracts information such as module name, occurrence, location, and instructor details.
- Capable of handling paginated results to extract data from multiple pages.

## Prerequisite
Before using the Maya Web Scraper, ensure you have the following prerequisites installed:
- Node.js: Minimum version v14.20.0. [Download and install Node.js](https://nodejs.org/en/download/) on your system.
- Chrome Browser: Ensure you have Google Chrome installed on your system as the WebDriver script is configured to work with Chrome.

## Installation
1. Clone the repository:
```
https://github.com/yeesheaannn/MayaWebScraper.git
```
2. Install dependencies:
```
npm install
```

## Usage
1. Configure the scraping parameters in index.js.
2. Run the scraper:
```
npm start
```
3. The extracted timetable data will be stored in output.csv in the project directory.

## Dependencies
Selenium WebDriver: A WebDriver for browser automation.
Mocha: Testing framework (optional).

## Contributing
Contributions are welcome! Please feel free to open a pull request or submit an issue for any bug fixes, improvements, or feature requests.
