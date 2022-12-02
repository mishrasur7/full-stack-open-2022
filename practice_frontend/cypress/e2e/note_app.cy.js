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

  it.only('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('sahas')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.contains('Wrong credentials')
  })

  //   it('login form can be opened', function() {
  //     cy.contains('login').click()
  //     cy.get('#username').type('sahas')
  //     cy.get('#password').type('mishra')
  //     cy.get('#login-button').click()
  //   })

  //   describe('when logged in', function () {
  //     beforeEach(function() {
  //       cy.contains('login').click()
  //       cy.get('#username').type('sahas')
  //       cy.get('#password').type('mishra')
  //       cy.get('#login-button').click()
  //     })

  //     describe('and a note exists', function () {
  //       beforeEach(function () {
  //         cy.contains('create note').click()
  //         cy.get('input').type('another note cypress')
  //         cy.contains('save').click()
  //       })

  //       it('it can be made important', function () {
  //         cy.contains('another note cypress')
  //           .contains('make important')
  //           .click()

//         cy.contains('another note cypress')
//           .contains('make not important')
//       })
//     })
//  })
})