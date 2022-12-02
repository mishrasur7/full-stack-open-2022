/* eslint-disable no-undef */
describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Suraj Mishra',
      username: 'sahas',
      password: 'mishra'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
    cy.get('#username').type('suraj')
    cy.get('#password').type('mishra')
    cy.get('#login-button').click()
  })

})