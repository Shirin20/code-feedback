/* eslint-disable jsdoc/require-jsdoc */
import shell from 'shelljs'
import fs from 'fs'
import { resolve } from 'path'
import { ProjectCodeChecker } from 'code-statistics/src/ProjectCodeChecker.js'
import { ProjectFilesReader } from 'code-statistics/src/ProjectFilesReader.js'

const projectFiles = new ProjectCodeChecker()
const projectReader = new ProjectFilesReader()

export class ProgramActions {
  cloneProject (url) {
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

  async report (projectRootPath) {
    const projectFilesArray = await projectReader.getDirectoryFilesPaths(projectRootPath)
    const reportObj = {
      projectLines: await projectFiles.countProjectLines(projectFilesArray),
      projectIfStatements: await projectFiles.countProjectIfStatements(projectFilesArray),
      projectLinesForLoops: await projectFiles.countProjectForLoops(projectFilesArray),
      projectsCharacters: await projectFiles.countProjectCharacters(projectFilesArray)
    }
    return reportObj
  }

  async writePersistentFeedback (feedbackArray) {
    const dataSource = resolve(process.cwd(), 'students-reports-feedback.text')
    feedbackArray.shift()
    const feedback = feedbackArray.join(' ')
    const data = JSON.stringify(feedback, null, 4)
    return fs.appendFile(dataSource, `
    ${data}`, function (err) {
      if (err) throw err
      console.log('Saved!')
    })
  }
}
