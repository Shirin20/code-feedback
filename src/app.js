/* eslint-disable jsdoc/require-jsdoc */

import { ProjectFilesReader } from 'code-statistics/src/ProjectFilesReader.js'
import { ProjectCodeChecker } from 'code-statistics/src/ProjectCodeChecker.js'

import readline from 'readline'
import { UserActions } from './UserActions.js'

// const projectReader = new ProjectFilesReader()

const userActions = new UserActions()
// const projectFilesChecker = new ProjectCodeChecker()

function showMenu () {
  console.log(`
  ***************** Student project reports **********
  menu, help - show this menu
  exit, quit - Exits Program
  clone <gitHub url> -  To Clone a new project
  delete- <project dir name> To delete a project
  report - report
  `)
}

function exitProgram (code) {
  code = code || 0

  console.info('\nExiting with exit status: ' + code)
  process.exit(code)
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
    // let projectFiles = []
    // let report = {}
    // const projectFilesChecker = new ProjectCodeChecker()

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
        // projectFiles = await projectReader.getDirectoryFilesPaths(lineArray[1])
        // report = await projectFilesChecker.countProjectLines(projectFiles)
        console.log('reporting.....re')
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
