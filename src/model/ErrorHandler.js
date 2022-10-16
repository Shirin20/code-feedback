/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable jsdoc/check-param-names */

/**
 *
 */
export class ErrorHandler {
  handleGithubUrlError (githubUrl) {
    if (githubUrl === undefined) {
      throw TypeError('You did not pass the github url !')
    } else if (Array.isArray(githubUrl)) {
      throw TypeError('you should pass the github url as a string not an array!')
    } else if (typeof githubUrl === 'object') {
      throw TypeError('you should pass your github url as a string not an object!')
    }
  }

  handleDirPathError (dirPath) {
    if (dirPath === undefined) {
      throw TypeError('You did not pass the Folder Path !')
    } else if (Array.isArray(dirPath)) {
      throw TypeError('you should pass the Folder Path as a string not an array!')
    } else if (typeof dirPath === 'object') {
      throw TypeError('you should pass yourFolder Path as a string not an object!')
    }
  }

  handleProjectRootPathError (dirPath) {
    if (dirPath === undefined) {
      throw TypeError('You did not pass the project root Path !')
    } else if (Array.isArray(dirPath)) {
      throw TypeError('you should pass the project root Path as a string not an array!')
    } else if (typeof dirPath === 'object') {
      throw TypeError('you should pass your project root Path as a string not an object!')
    }
  }
}
