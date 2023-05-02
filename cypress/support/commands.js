Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    
  cy.get('#firstName').type('Ricardo')
  cy.get('#lastName').type('Gomes')
  cy.get('#email').type('Ricardo.g@exemplo.com')
  cy.get('#open-text-area').type('Aprendizado teste')
  cy.contains('button', 'Enviar').click()

})