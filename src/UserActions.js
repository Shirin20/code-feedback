/* eslint-disable jsdoc/require-jsdoc */
import shell from 'shelljs'
import fs from 'fs'
import { ProjectCodeChecker } from 'code-statistics/src/ProjectCodeChecker.js'

const projectFiles = new ProjectCodeChecker()

export class UserActions {
  cloneProject (url) {
    const path = 'students-projects'
    shell.cd(path)
    shell.exec(`git clone ${url}`)
  }

  deleteStudentProject (dirName) {
    // delete directory recursively
    const directory = `students-projects/${dirName}`
    fs.rm(directory, { recursive: true }, err => {
      if (err) {
        throw err
      }
      console.log(`${directory} is deleted!`)
    })
  }

  async report (projectFilesArray) {
    return {
      projectLines: await projectFiles.countProjectLines(projectFilesArray),
      projectsCharacters: await projectFiles.countFileCharacters(projectFilesArray)
    }
  }
}
