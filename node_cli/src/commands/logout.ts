import {Command, flags} from '@oclif/command'
import {logout} from '../realmAPIs/realmAuth'

export default class Login extends Command {
  static description = 'logs the current user out and deletes the key.'

  static examples = [
    `$ realm_cli logout`,
  ]

  async run() {
    logout().then(b => {
      if (b) this.log("You are now logged out.")
    });
  }
}
