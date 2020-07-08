import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import {login} from '../realmAPIs/realmAuth'

export default class Login extends Command {
  static description = 'logs user in. If this is a new user and '+
  'auto-confirm is enabled creates a new user.'

  static examples = [
    `$ realm_cli login email=user@domain.com password=P@ssw0rd!`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    email: flags.string({char: 'e', description: 'email address'}),
    password: flags.string({char: 'p', description: 'password'}),
  }

  async run() {
    let email
    let password
    const {flags} = this.parse(Login)
    if (flags.email === undefined){
      email = await cli.prompt('Email:');
    } else {
      email = flags.email;
    }
    if (flags.password === undefined){
      password = await cli.prompt('Password:', {type: 'mask'});
    } else {
        password = flags.password;
    }

    login(email, password).then(u=>{
      this.log("You are now logged in. Be sure to call $ realm_cli logout when " + 
      "you are finished!")
    });

  }
}
