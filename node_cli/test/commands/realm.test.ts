import {expect, test} from '@oclif/test'

describe('realm', () => {
  test
  .stdout()
  .command(['login', 'newUser@foo.bar', 'mypassword'])
  .it('creates new user', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['hello', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
