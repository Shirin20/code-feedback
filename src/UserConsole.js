/* eslint-disable promise/param-names */
/* eslint-disable jsdoc/require-jsdoc */

export class UserConsole {
  showMenu () {
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

  printReport (reportObject) {
    console.log(`
    project Lines = ${reportObject.projectLines}
    project if statements = ${reportObject.projectIfStatements}
    project for loops = ${reportObject.projectLinesForLoops}
    project projectsCharacters and whitespace = ${reportObject.projectsCharacters}
    `)
  }

  exitProgram (code) {
    code = code || 0

    console.info('\nExiting with exit status: ' + code)
    process.exit(code)
  }
}
