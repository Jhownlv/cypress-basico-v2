/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
cy.visit('./src/index.html')

    })
  it('verifica o título da aplicação', function() {
    cy.visit('./src/index.html')

    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('Preenche os campos obrigatórios e envia o formulário', function (){
    const longText = 'Aprendizado teste, Aprendizado teste, Aprendizado teste, Aprendizado teste, Aprendizado teste, Aprendizado teste, Aprendizado teste, Aprendizado teste, Aprendizado teste, Aprendizado teste.'
    
    cy.get('#firstName').type('Ricardo')
    cy.get('#lastName').type('Gomes')
    cy.get('#email').type('Ricardo.g@exemplo.com')
    cy.get('#open-text-area').type(longText, { delay: 0})
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {

    cy.get('#firstName').type('Ricardo')
    cy.get('#lastName').type('Gomes')
    cy.get('#email').type('Ricardo.g@exemplo,com')
    cy.get('#open-text-area').type('Aprendizado Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {

    //cy.get('#phone')
    .type('jshalstue')
    .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do formulário', function() {

    cy.get('#firstName').type('Ricardo')
    cy.get('#lastName').type('Gomes')
    cy.get('#email').type('Ricardo.g@exemplo.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Aprendizado Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')  
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
  
    cy.get('#firstName')
   .type('Ricardo')
   .should('have.value', 'Ricardo')
   .clear()
   .should('have.value', '')

   cy.get('#lastName')
   .type('Gomes')
   .should('have.value', 'Gomes')
   .clear()
   .should('have.value', '')

   cy.get('#email')
   .type('Ricardo.g@exemplo.com')
   .should('have.value', 'Ricardo.g@exemplo.com')
   .clear()
   .should('have.value', '')

   cy.get('#phone')
   .type('61985336622')
   .should('have.value', '61985336622')
   .clear()
   .should('have.value', '')

   cy.get('#open-text-area')
   .type('Aprendizado teste')
   .should('have.value', 'Aprendizado teste')
   .clear()
   .should('have.value', '')
  })
  
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
    
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('envia o formulário com sucesso usando um comando customizado', function(){

 cy.fillMandatoryFieldsAndSubmit()

 cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (Blog) por seu texto', function() {

    cy.get('#product')
    .select('Blog')
    .should('have.value', 'blog')
  })

  it('Seleciona um produto (Youtube) por seu texto', function() {

    cy.get('#product')
    .select('youtube')
    .should('have.value', 'youtube')

  })

  it('seleciona um produto (Mentoria) por seu índice', function() {

    cy.get('#product')
    .select(3)
    .should('have.value', 'mentoria')
  })

  it('marca o tipo de atendimento "Elogio" ', function() {

   cy.get('input[type="radio"][value="elogio"]')
   .check()
   .should('have.value', 'elogio')
  })

  it('marca cada tipo de atendimento', function() {

    cy.get('input[type="radio"]')
     .should('have.length', 3)
     .each(function ($radio){ 
    cy.wrap($radio).check()
    cy.wrap($radio).should('be.checked')
    })
  })

  it('marca ambos checkboxes, depois desmarca o último', function() {

    cy.get('input[type="checkbox"]')
     .check()
     .should('be.checked')
     .last()
     .uncheck()
     .should('not.be.checked')
    })

  it('exibe mensage de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
 
    cy.get('#firstName').type('Ricardo')
    cy.get('#lastName').type('Gomes')
    cy.get('#email').type('Ricardo.g@exemplo.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Aprendizado Teste')
    cy.contains('button', 'Enviar').click()
  
    cy.get('.error').should('be.visible')
    })

  it('seleciona um arquivo da pasta fixtures', function() {

    cy.get('input[type="file"]#file-upload')
     .should('not.have.value')
     .selectFile('./cypress/fixtures/example.json')
     .should(function($input) {
      expect($input[0].files[0].name).to.equal('example.json')
     })
    })

  it('seleciona um arquivo simulando um drg-and-drop', function() {

    cy.get('input[type="file"]#file-upload')
     .should('not.have.value')
     .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
     .should(function($input) {
      expect($input[0].files[0].name).to.equal('example.json')
     })
  }) 

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {

    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
    .selectFile('@sampleFile')
    .should(function($input) {
      expect($input[0].files[0].name).to.equal('example.json')
     })
  })

  it('verifica se a política de privacidade abre em outra aba sem a necessedade de um clique', function() {

   cy.get('#privacy a')
   .should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link ', function() {

    cy.get('#privacy a')
     .invoke('removeAttr', 'target')
     .click()

     cy.contains('Talking About Testing').should('be.visible') 
  })

  it('', function() {


  })
})