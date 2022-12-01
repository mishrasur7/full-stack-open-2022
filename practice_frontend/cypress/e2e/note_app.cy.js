describe('Note app', function() {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.contains('login').click()
    cy.get('#username').type('smishra')
    cy.get('#password').type('suraj')
    cy.get('#login-button').click()
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
  })

  it('a new note can be created', function() {
   cy.contains('create note').click()
   cy.get('input').type('new note')
   cy.get('save').click()

   cy.contains('new note')
  })

})