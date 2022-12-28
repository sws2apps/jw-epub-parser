# Adding Language for Enhanced Parsing

To enable your language for enhanced parsing, please do the following:

- Navigate to `src/rules`.

- Open the `languageRules.js` file. Then add your language definition following the existing languages as model.

- Open the `languages.js` file, and your language code. Make sure that this code is valid according to the naming of your EPUB file from jw.org.

- Add a sample EPUB file for testing in `test/enhancedParsing` folder.

- Create fixture file to test the parsing in the `test/fixtures` directory. It is recommended that you create this fixture file manually by checking your Meeting Workbook file. Although it is time consuming, it will ensure that the parsing works as expected.

- Run `npm run build` to build the module.

- Run `npm run test` and verify that all the tests passed.

- Submit a PR to merge your changes.
