
import Realm = require("realm");

export class Task extends Realm.Object {}
Task.schema = {
   name: "Task",
   properties: {
      _id: 'objectId',
      _partition: 'string',
      assignee: 'objectId',
      name: 'string',
      status: 'string'
   }
};
/*
export class Project extends Realm.Object {}
Project.schema = {
    name: 'Project',
    properties: {
        name: 'string'
    },
};*/