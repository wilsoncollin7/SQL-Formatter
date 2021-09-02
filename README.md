# ICC Formatter

This application helps internal developers in a local government agency to create a SQL file with proper format to update internal ICC fees for their permitting system. Before the app, developers would enter by hand all of the SQL commands every quarter. This simple application makes that process MUCH faster and easier.

This app was build off of Shan Carter's [Mr-Data-Converter](https://github.com/shancarter/Mr-Data-Converter). The front-end was added and a process to take the converted data and format it to the local governments specifications.

Styling done with Material-UI.

  ## Table of Contents

  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Questions](#questions)

   ## Installation

  Download the repo and run to start the app: 
  ```
  npm install

  npm start
  ```

  ## Usage

  The developer first has to have the Excel document with the data from the permitting department with the new fees. The Excel file is always in the same format to meet local government standards. The developer then copy's the data and pastes it into the correct bax and hits format! Its that simple! There is a choice to download the file as a .SQL file. 

  The app can take any form of data and rebuild it into anything the user wants. Using the [Mr-Data-Converter](https://github.com/shancarter/Mr-Data-Converter) you can configure the app to process any form of data. By default this app converts a string of numbers and separates the rows of the textarea into an array of arrays of numbers. Then the output is looped through to create a string of what ever you wish to convert.

  This loop is simple and creates the proper string in the format to add fields into the SQL table according to the users preferences.

  ```
  dataArray.forEach(group => {
      group.forEach(fee => {
        if (isNaN(parseInt(fee))) {
          output += `\n\r--${fee}\n\r`
        } else {
          if (typeKey !== 9) {
            typeKey++;
          } else {
            typeKey = 1;
            groupKey++;
          }
          output += `(${groupKey}, ${typeKey}, ${parseFloat(fee)}, '${discontinueDate}', '${effectiveDate}'),\n`;
        }
      });
    });
  ```
  Added to the top of the output are a series of SQL commands found inside the sqlHeader in the /src/utils/index.js. This can be configured to add any SQL commands.

  Input:

  ```
  298.55	288.43	280.93	269.54	253.09	245.77
  273.51	263.39	255.89	244.51	228.06	220.73
  233.39	226.42	220.85	211.80	199.64	194.14
  232.39	225.42	218.85	210.80	197.64	193.14
  276.84	266.72	259.22	247.83	231.83	225.68
  231.62	221.50	213.00	202.61	185.16	178.84
  272.51	262.39	253.89	243.51	226.06	219.73
  240.93	232.14	224.41	213.38	194.94	187.44

  ```
  output:
  ```
    --update [BCMS].[dbo].[List_ICCFee]
  --SET DiscontinueDate = '2021-04-19'
  --where DiscontinueDate like '%2999%'

  select *
  FROM List_ICCGroupTypes lit   

  select *
  FROM List_ICCPaymentType lit

  select *
  FROM List_ICCFee li
  where DiscontinueDate like '%2999%'

  insert into List_ICCFee(iccGroupCodeKey, iccPaymentTypeKey, iccFee, DiscontinueDate, EffectiveDate)
  values
  (1, 1, 298.55, '2999-01-01', '2021-09-02'),
  (1, 2, 288.43, '2999-01-01', '2021-09-02'),
  (1, 3, 280.93, '2999-01-01', '2021-09-02'),
  (1, 4, 269.54, '2999-01-01', '2021-09-02'),
  (1, 5, 253.09, '2999-01-01', '2021-09-02'),
  (1, 6, 245.77, '2999-01-01', '2021-09-02'),
  (1, 7, 273.51, '2999-01-01', '2021-09-02'),
  (1, 8, 263.39, '2999-01-01', '2021-09-02'),
  (1, 9, 255.89, '2999-01-01', '2021-09-02'),
  (2, 1, 244.51, '2999-01-01', '2021-09-02'),
  (2, 2, 228.06, '2999-01-01', '2021-09-02'),
  (2, 3, 220.73, '2999-01-01', '2021-09-02'),
  (2, 4, 233.39, '2999-01-01', '2021-09-02'),
  ```
  ## License

  This application is made with the [MIT License](https://opensource.org/licenses/MIT)

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 

  ## Questions

  For any questions you might have, please contact me at collin.wilson@brunswickcountync.gov

<img src="https://avatars2.githubusercontent.com/u/65512203?s=460&u=fb31e3048d1cfa064b8ee0ec696be762b96343f8&v=4" width="120" style="border-radius:50%"/>
