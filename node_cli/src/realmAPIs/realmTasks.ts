import Realm = require("realm");
import * as auth from "./realmAuth"
import * as schemas from '../schemas'

let id;
async function setRealm() {
   return auth.internalOnlyLoginWithKey().then(async user=>{
      id = user.identity;
      console.log('I have a user identity: ', id);
      const config = {
         //schema: [schemas.Task],//, schemas.Project],
         sync: {
           user: user,
           partitionValue: 'myPartition',
         },
       };
      
       return await Realm.open(config).then(r=>{
          console.log('arrrrr', r)
          return r;
       });
   })
}

export async function getTasks() {
   setRealm().then(r => {
      return r.objects("Task");
   });
}

export async function getTask(taskId){
  
}

export async function createTask(taskName, taskStatus) {
   setRealm().then(r => {
      try{
         console.log('arr?', r)
         r.write(function() {
            let t = r.create('Task', 
            { 
              // _id: new r.objectId(),
               _partition: 'myPartition',
               name: taskName, 
               status: taskStatus, 
               assignee: id });
            
            console.log('t', t.name, t.status);
            return t;
         });
      } catch (err) {
         console.log('err', err);
         return null;
      }
 });
}

export async function changeStatus(taskId, taskStatus){
  
}

export async function deleteTask(taskId){
  
}

//TODO: watch for task changes!




