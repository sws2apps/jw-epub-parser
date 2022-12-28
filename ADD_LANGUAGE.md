# Adding Language for Enhanced Parsing

To enable your language for enhanced parsing, please do the following:

- Navigate to `src/rules`.

- Open the `languageRules.js` file. Then add your language definition following the existing languages as model.

- Open the `languages.js` file, and your language code. Make sure that your language is valid according to the naming of your EPUB file from jw.org.

- Add an entry for your language in `test/enhancedParsing/list.json` file.

- Create fixture file for the issue you want to test in the `test/fixtures` directory.

- Run `npm run test` and verify that all the tests passed.

- Submit a PR to merge your changes.
