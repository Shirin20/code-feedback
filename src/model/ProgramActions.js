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

  async getReport (projectRootPath) {
    const projectFilesArray = await projectReader.getDirectoryFilesPaths(projectRootPath)
    const reportObj = {
      projectLines: await projectFiles.countProjectLines(projectFilesArray),
      projectIfStatements: await projectFiles.countProjectIfStatements(projectFilesArray),
      projectLinesForLoops: await projectFiles.countProjectForLoops(projectFilesArray),
      projectsCharacters: await projectFiles.countProjectCharacters(projectFilesArray)
    }
    return reportObj
  }

  async writePersistentFeedbackToFile (feedbackArray) {
    const reportFile = this.#specifyReportFile()
    this.#deleteFeedbackWord(feedbackArray)
    const feedback = this.#convertArrayToText(feedbackArray)
    this.#writeFeedbackToFile(feedback, reportFile)
  }

  #specifyReportFile () {
    const fileData = resolve(process.cwd(), 'students-reports-feedback.text')
    return fileData
  }

  #deleteFeedbackWord (feedbackArray) {
    feedbackArray.shift()
  }

  #convertArrayToText (feedbackArray) {
    return feedbackArray.join(' ')
  }

  #writeFeedbackToFile (feedback, reportFile) {
    const jsonFeedback = this.#convertStringToJson(feedback)
    return fs.appendFile(reportFile, `
    ${jsonFeedback}`, function (err) {
      if (err) throw err
      console.log('Saved!')
    })
  }

  #convertStringToJson (feedback) {
    return JSON.stringify(feedback, null, 4)
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
