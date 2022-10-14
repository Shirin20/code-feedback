/* eslint-disable jsdoc/require-jsdoc */

import readline from 'readline'
import { UserActions } from './UserActions.js'
// import { writeFile } from 'node:fs/promises'
import fs from 'fs'
import { resolve } from 'path'


const userActions = new UserActions()
const dataSource = resolve(process.cwd(), 'data.text')

async function writePersistentFeedback (feedbackArray) {
  feedbackArray.shift()
  const feedback = feedbackArray.join(' ')
  const data = JSON.stringify(feedback, null, 4)
  // return writeFile(dataSource, data)
  return fs.appendFile(dataSource, `
  ${data}`, function (err) {
    if (err) throw err
    console.log('Saved!')
  })
}

function showMenu () {
  console.log(`
  ***************** Student project reports **********
  menu, help - show this menu

  clone <gitHub url> -  To clone a student project

  report - report <project dir root path>

  feedback <student name, project name, feedback text> - to write a feedback
  Write the student name and the project name separated by ' , ' and then write the feedback 

  delete- <project dir name> To delete a project
  
  exit, quit - Exits Program
  `)
}

(async function () {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.setPrompt('Write menu or help to see the options: ')
  rl.prompt()

  rl.on('close', exitProgram)
  rl.on('line', async (input) => {
    input = input.trim()
    const lineArray = input.split(' ')

    switch (lineArray[0]) {
      case 'exit':
      case 'quit':
        exitProgram()
        break
      case 'menu':
      case 'help':
        showMenu()
        break
      case 'clone':
        await userActions.cloneProject(lineArray[1])
        break
      case 'report':
        console.log(await userActions.report(lineArray[1]))
        break
      case 'feedback':
        writePersistentFeedback(lineArray)
        break
      case 'delete':
        await userActions.deleteStudentProject(lineArray[1])
        break
      default:
        showMenu()
        break
    }
    rl.prompt()
  })
})()

function exitProgram (code) {
  code = code || 0

  console.info('\nExiting with exit status: ' + code)
  process.exit(code)
}
