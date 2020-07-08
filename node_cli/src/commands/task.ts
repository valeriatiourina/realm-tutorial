import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import * as inquirer from 'inquirer'
import * as realmTasks from '../RealmAPIs/realmTasks'

export default class Task extends Command {
  static description = 'Work with tasks.'

  static args = [
   {name: 'action'}
 ]

  static examples = [
    `$ realm_cli task\t\t\t\t<== get all tasks assigned to the user`,
    `$ realm_cli task --id='123456'\t\t<== get the specified task`,
    `$ realm_cli task create\t\t\t<== create a new task`,
    `$ realm_cli task delete --id='123456'\t\t<== delete the specified task`,
    `$ realm_cli task change --id='123456' --status='open | inprogress | closed'\t
    <== change the status of the specified task`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    id: flags.string({description: 'the task ID'}),
    status: flags.string({char: 's', description: 'the new status (open | inprogress | closed).'}),
  }

  async run() {
   const {args, flags} = this.parse(Task)
   let id;
   this.log('flags', flags.id)
   
   switch (args.action){
      case undefined:
         if (flags.id === undefined){
            this.log('Get all tasks')
            realmTasks.getTasks();
            //this.log(allTasks)
            //TODO: format as table
            //https://oclif.io/docs/table
         } else {
            this.log("get task by id")
            //realmTasks.getTask(flags.id);
            //TODO: format as table
            //https://oclif.io/docs/table
         }
      break;

      case "create":
         const taskName = await cli.prompt('What is the task name?');
         let responses: any = await inquirer.prompt([{
            name: 'status',
            message: 'What is the task status?',
            type: 'list',
            choices: [{name: 'open'}, {name: 'inprogress'}, {name: 'closed'}],
         }])
         let taskStatus = responses.status;

         var result = await realmTasks.createTask(taskName, taskStatus);
         //.then(result=>{
            console.log('I have returned from creating a task', result)
            this.log('New task created: ', result?.name);
        // });
      break;

      case "delete":

         if (flags.id === undefined){
         id = await cli.prompt('What is the ID of the task you want to delete?');
         } else {
            id = flags.id;
         }
         let confirm: any = await inquirer.prompt([{
         name: 'deleteConfirm',
         message: `Are you sure you want to delete ${id}?`,
         type: 'list',
         choices: [{name: 'yes'}, {name: 'no'}],
      }])
         if (confirm.deleteConfirm === 'yes'){
            //TODO: call deleteTask(id)
         }
         this.log(confirm.deleteConfirm, id)
         break;
   
      case "change":
         if (flags.id === undefined){
         id = await cli.prompt('What is the ID of the task you want to change?');
         } else {
            id = flags.id;
         }
         let changeTo: any = await inquirer.prompt([{
         name: 'changeTo',
         message: `What is the new status of task ${id}?`,
         type: 'list',
         choices: [{name: 'open'}, {name: 'inprogress'}, {name: 'closed'}]
         }])
         
         //TODO call taskChange(id, changeTo.changeTo)
         this.log(`${id} is now set to '${changeTo.changeTo}'`);
         break;
      }
   }
   return;
}
