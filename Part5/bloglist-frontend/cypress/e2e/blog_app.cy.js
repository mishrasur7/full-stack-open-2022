/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Suraj Mishra',
      username: 'suraj',
      password: 'mishra'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login').click()
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('suraj')
      cy.get('#password').type('mishra')
      cy.get('#login-button').click()
    })

    it('fails with wrong credentials', function() {
      cy.contains('logout').click()
      cy.contains('login').click()
      cy.get('#username').type('suraj')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()

      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('suraj')
      cy.get('#password').type('mishra')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('create blog').click()
      cy.get('#title').type('New title from cypress')
      cy.get('#author').type('cypress author')
      cy.get('#url').type('www.cypress.com')
      cy.get('#create').click()

      cy.contains('New title from cypress')
    })
  })
})