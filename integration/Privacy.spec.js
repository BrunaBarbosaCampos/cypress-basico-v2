describe('Testa a página da política de privacidade de forma independente', () => {
    beforeEach (() =>{
        cy.visit('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html');
    });

    it('Valida a URL', () => {
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.url().should('eq', 'https://cac-tat.s3.eu-central-1.amazonaws.com/privacy.html')
    });


    it('Valida se contém na URL', () => {
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.url().should('include', 'privacy.html')
    });


    it('Valida Mensagem da nova aba aberta', () => {
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.contains('Talking About Testing').should('be.visible')
    });


});