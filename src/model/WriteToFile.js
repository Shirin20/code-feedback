/* eslint-disable jsdoc/require-jsdoc */
import fs from 'fs'
import { resolve } from 'path'

export class WriteToFile {
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
}
