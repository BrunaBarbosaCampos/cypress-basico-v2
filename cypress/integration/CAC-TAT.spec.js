/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach (() =>{
        cy.visit('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html');
    });
    

    it('Verifica o titulo da aplicação', function() {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
    });

    it('Preenche campos obrigatórios e envia formulário', () => {
        cy.get('#firstName').type('Bruna');
        cy.get('#lastName').type('Campos');
        cy.get('#email').type('bruna.campos@gmail.com');
        cy.get('#open-text-area').type('Prezados, gostaria de expressar minha insatisfação com o serviço prestado. Comprei um produto há duas semanas e até agora não o recebi. Entrei em contato com o atendimento ao cliente várias vezes, mas não obtive nenhuma resposta satisfatória. O número do meu pedido é 123456. Aguardo uma solução rápida para o problema.', {delay:0});
        cy.contains('Enviar').click();

        cy.get('.success').should('be.visible', 'Mensagem enviada com sucesso.');
    });


    it('Exibe mensagem de erro ao inserir e-mail inválido', () => {
        cy.get('#firstName').type('Bruna');
        cy.get('#lastName').type('Campos');
        cy.get('#email').type('bruna.campos@gmail.com1');
        cy.get('#open-text-area').type('Prezados, gostaria de expressar minha insatisfação com o serviço prestado. Comprei um produto há duas semanas e até agora não o recebi. Entrei em contato com o atendimento ao cliente várias vezes, mas não obtive nenhuma resposta satisfatória. O número do meu pedido é 123456. Aguardo uma solução rápida para o problema.', {delay:0});
        cy.contains('Enviar').click();

        cy.get('.error').should('be.visible', 'Valide os campos obrigatórios!');
    });


    it('Valida o campo telefone', () => {
        cy.get('#phone').type('Teste')
        cy.get('#phone').should('have.value', '')

        cy.get('#phone').type('47988298347')
        cy.get('#phone').should('have.value', '47988298347')

    });


    it('Valida a obrigatoriedade do campo telefone', () => {
        cy.get('#firstName').type('Bruna');
        cy.get('#lastName').type('Campos');
        cy.get('#email').type('bruna.campos@gmail.com');
        cy.get('#phone-checkbox').click();
        cy.get('#open-text-area').type('Prezados, gostaria de expressar minha insatisfação com o serviço prestado. Comprei um produto há duas semanas e até agora não o recebi. Entrei em contato com o atendimento ao cliente várias vezes, mas não obtive nenhuma resposta satisfatória. O número do meu pedido é 123456. Aguardo uma solução rápida para o problema.', {delay:0});
        cy.contains('Enviar').click();

        cy.get('.error').should('be.visible', 'Valide os campos obrigatórios!');
    });


    it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName').type('Bruna').should('have.value', 'Bruna');
        cy.get('#lastName').type('Campos').should('have.value', 'Campos');
        cy.get('#email').type('bruna.campos@gmail.com').should('have.value', 'bruna.campos@gmail.com')
        cy.get('#open-text-area').type('Prezados, gostaria de expressar minha insatisfação com o serviço prestado. Comprei um produto há duas semanas e até agora não o recebi.', {delay:0}).should('have.value', 'Prezados, gostaria de expressar minha insatisfação com o serviço prestado. Comprei um produto há duas semanas e até agora não o recebi.');
        

        cy.get('#firstName').clear().should('have.value', '');
        cy.get('#lastName').clear().should('have.value', '');
        cy.get('#email').clear().should('have.value', '');
        cy.get('#open-text-area').clear().should('have.value', '');
    
    });


    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('Enviar').click();

        cy.get('.error').should('be.visible', 'Valide os campos obrigatórios!');
    
    

    });

    context('Envia o formuário com sucesso usando um comando customizado', () => {
        it('Comando customizado', () => {
            cy.fillMandatoryFieldsAndSubmit('bruna', 'campos', 'bruna@gmail.com', 'teste')

        })

    })



});
