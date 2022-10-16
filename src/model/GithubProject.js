/* eslint-disable jsdoc/require-jsdoc */
import shell from 'shelljs'
import fs from 'fs'

export class GithubProject {
  cloneStudentProject (url) {
    const path = 'students-projects'
    shell.cd(path)
    shell.exec(`git clone ${url}`)
  }

  deleteStudentProject (dirNamePath) {
    const directory = `students-projects/${dirNamePath}`
    fs.rm(directory, { recursive: true }, err => {
      if (err) {
        throw err
      }
      console.log(`${directory} is deleted!`)
    })
  }
}
