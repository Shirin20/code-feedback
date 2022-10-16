/* eslint-disable jsdoc/require-jsdoc */
import shell from 'shelljs'
import fs from 'fs'
import { ErrorHandler } from './ErrorHandler.js'

const errorChecker = new ErrorHandler()

export class GithubProject {
  cloneStudentProject (githubUrl) {
    errorChecker.handleGithubUrlError(githubUrl)

    const path = 'students-projects'
    shell.cd(path)
    shell.exec(`git clone ${githubUrl}`)
  }

  deleteStudentProject (dirPath) {
    errorChecker.handleDirPathError(dirPath)

    const directory = `students-projects/${dirPath}`
    fs.rm(directory, { recursive: true }, err => {
      if (err) {
        throw err
      }
      console.log(`${directory} is deleted!`)
    })
  }
}
