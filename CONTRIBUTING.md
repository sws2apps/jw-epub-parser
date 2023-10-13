# How to Contribute

JW EPUB Parser is one of the utilities that is developped by the [Scheduling Workbox System (SWS)](https://github.com/sws2apps) team. But we are also more than happy to receive support from those who are very intersted to assist us. Hopefully this document makes the process for contributing clear and answers some questions that you may have.

Please make sure that you have read the [code of conduct](https://github.com/sws2apps/jw-epub-parser/blob/main/CODE_OF_CONDUCT.md) before continuing.

## Semantic Versioning

JW EPUB Parser follows semantic versioning. We release patch versions for bugfixes, minor versions for new features or non-essential changes, and major versions for any breaking changes. Every significant change is documented in the [changelog](https://github.com/sws2apps/jw-epub-parser/blob/main/CHANGELOG.md) file.

## Branch Organization

We used three different branches to make production, beta and alpha releases of SWS Pocket:

| branch | whats for                                                                                                  |
| :----- | :--------------------------------------------------------------------------------------------------------- |
| main   | making production release of JW EPUB Parser: bug fix for the current version will be queued in this branch |
| beta   | making beta release of JW EPUB Parser: new feature will be queued in this branch                           |
| alpha  | making alpha release of JW EPUB Parser: major update to the application will be queued in this branch      |

## Bugs

### Known Issues and Report

We are using [GitHub Issues](https://github.com/sws2apps/jw-epub-parser/issues) to keep track of bugs fix. We keep a close eye on this and try to make it clear when we have an internal fix in progress. Before filing a new task, try to make sure your problem doesn’t already exist.

### Security Bugs

Please do not report security bugs in the public issues; go through the process outlined on the [Security Policy](https://github.com/sws2apps/jw-epub-parser/blob/main/SECURITY.md).

## Proposing a Change

If you intend to add new features or suggest major changes to JW EPUB Parser, check first that your idea is not yet in our tracking issues list. If not, we recommend creating a new [discussion first](https://github.com/sws2apps/jw-epub-parser/discussions/categories/ideas). This lets us reach an agreement on your proposal before you put significant effort into it. After it has been approved, please create [new issue](https://github.com/sws2apps/jw-epub-parser/issues), and choose the correct template.

If you’re only fixing a bug, it’s fine to submit a pull request right away but we still recommend to file an issue detailing what you’re fixing. This is helpful in case we don’t accept that specific fix but want to keep track of the issue.

## Contribution Prerequisites

- You have the latest version of [Node](https://nodejs.org) and [Git](https://git-scm.com) installed
- You will be working on one item at a time.
- If you do not have it yet, fork the repository. Clone it if you will work locally.
- If you have already forked and clone the repository, make sure that it is in sync with the upstream repository ([Syncing a fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork)).
- Run `npm i` to install the needed dependencies

## Sending a Pull Request (PR)

We are monitoring for pull requests. We will review your pull request and either merge it, request changes to it, or close it with an explanation. We’ll do our best to provide updates and feedback throughout the process.

**Before submitting a PR**, please make sure the following is done:

- Run `npm build` to build the module first.
- Then run `npm test` to make sure that your changes pass the test.

**When commiting your changes**, we recommend the following commands to be run:

- Check again if your forked repository or your local copy is up to date with upstream. ([Syncing a fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork)).
- Resolve conflicts if any.
- Commit and push your changes to your forked repository.

**When your proposed changes are in the forked repository on GitHub**:

- Create your PR.
- Make sure the title follows the [conventional-changelog](https://github.com/semantic-release/semantic-release#commit-message-format) format, depending on what item or issue you have been working on. Failure to set this accordingly will cause your pull request to be discarded.

You will receive a notification and be informed when your PR is published on beta, or alpha, or in production.
