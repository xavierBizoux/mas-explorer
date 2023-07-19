# MAS Explorer

## Description

This sample application demonstrates how to access SAS Micro Analytic Service (MAS). Using this application you should be able to list and look for models which are deployed on a specific SAS Viya environment.
The sample application demonstrates how-to:

- Authenticate users using [sas-auth-browser](https://github.com/sassoftware/sas-viya-sdk-js/tree/main/sdk/sas-auth-browser)
- Call REST APIs to list models published to MAS
- Filter and limit the number of displayed models
- Fill in the input form related to a specific model
- Score data for a specific model

This application uses [TypeScript](https://www.typescriptlang.org/) as the main programming language. Additional packages like [webpack](https://webpack.js.org/) and [Bootstrap](https://getbootstrap.com/) are respectively to bundle and transpile TypeScript code and to improve application layout.

## Installation

To use this application, you should have NodeJS installed on your machine.

- Clone the repository on your machine
- Open the repository in [Visual Studio Code](https://code.visualstudio.com/)
- Create a file named *const.ts* under *src* folder
- In *const.ts*, define and export a constant for *viyaUrl* which contains the URL of your SAS Viya environment like this:

    ```typescript
    export const viyaUrl = "https://server.demo.sas.com"
    ```

- Save the file
- Build the application or run the development server for testing using the predefined **NPM SCRIPTS**