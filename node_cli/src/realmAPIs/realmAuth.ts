import {Command, flags} from '@oclif/command'
import Realm = require("realm");
import * as fs from 'fs';

const REALM_APP_ID = "realmtutorials-dcyrc";
const appConfig = {
   id: REALM_APP_ID,
   timeout: 10000,
 };
 const keyFileName = 'realmUserAPI.key';

 Realm.deleteFile(appConfig)
 const app = new Realm.App(appConfig);


 console.log('app', app.auth)
 let user;

  export async function login(email, password) {
    const credentials = Realm.Credentials.emailPassword(email, password);
    let user;
try{
   return await app.logIn(credentials).then(async u=>{
      console.log('u', u)
      user = u;
      console.log('user', user.isLoggedIn, user.identity);
      saveKey(user)
   })
  }
   catch(e){
     console.log(e)
     if (e.message == 'invalid username/password'){
      return await app.auth.emailPassword.registerUser(email, password)
      .then(async u=>{
        console.log('u', u)
        user = u;
        console.log('user', user.isLoggedIn, user.identity);
        saveKey(user)
     })
     }
   }
  
      // + new Date().getTime();
/*
      var key = await user.auth.apiKey.get(keyName);
      if (key !== undefined) {
        fs.writeFile(keyFileName, JSON.stringify(key), function (err) {
          console.log(err)
        });
      } else {
        key = await user.auth.apiKeys.createAPIKey(keyName);
        fs.writeFile(keyFileName, JSON.stringify(newKey), function (err) {
          console.log(err)
        });
      }*/
    }//)
 
    //TODO: Check for existing keyFileName first!!
    
async function saveKey(user){
  let keyName = user.identity;
  let newKey = await user.auth.apiKeys.createAPIKey(keyName);
    fs.writeFile(keyFileName, JSON.stringify(newKey), function (err) {
      console.log(err)
    })
}
/*
    if (fs.exists(keyFileName)){
      let keyFile = fs.readFile(keyFileName);
      let key = JSON.parse(keyFile);
      user.auth.apiKeys.get(key);
    }

    let newKey = await user.auth.apiKeys.createAPIKey(keyName);
    fs.writeFile(keyFileName, JSON.stringify(newKey), function (err) {
      console.log(err)
    });*/
  //}

export async function logout() {
  //TODO: delete or disable the API key until the next logon
  //await app.auth.apiKey.disable(keyId);
  //or
  //await app.auth.apiKey.delete(keyId);
  user = app.currentUser;
  console.log(user?.identity)
  if (user?.identity !== undefined) user.logOut();

  fs.writeFile(keyFileName, "", function (err) {
    console.log(err)
  });

  return true;
}

export async function internalOnlyLoginWithKey(){
  
  let keyFile = fs.readFileSync(keyFileName);

  let key = JSON.parse(keyFile);

  console.log(key.key);

  const credentials = Realm.Credentials.userAPIKey(key.key);
  let user = await app.logIn(credentials);

  return user;
  
  /*
  const credentials = Realm.Credentials.apiKey(key);

    return await app.logIn(credentials).then(async u =>{
      console.log(u);
      const config = {
        sync: {
          user: u,
          partitionValue: '"myPartition"',
        },
      };
  
      //return await Realm.open(config);
    });

   */

}




