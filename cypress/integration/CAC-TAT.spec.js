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
        cy.get('#phone-checkbox').check();
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

        });

    });

     it('Seleciona um produto por seu texto, value e índice', () => {
        cy.get('#product').select('YouTube');
        cy.should('have.value', 'youtube');

        cy.get('#product').select('mentoria');
        cy.should('have.value', 'mentoria');

        cy.get('#product').select(1);
        cy.should('have.value', 'blog');


     });


     it('Marca o tipo de atendimento "Feedback"', () => {
        cy.get('[type="radio"]').check('feedback')

        cy.should('have.value', 'feedback')
     });


     it('Marca cada tipo de atendimento', () => {
        cy.get('[type="radio"]').check('feedback').should('be.checked')
        cy.get('[type="radio"]').check('elogio').should('be.checked')
        cy.get('[type="radio"]').check('ajuda').should('be.checked')

     });


     it('Marca ambos checkboxes, depois desmarca o último',() =>{
        cy.get('#check input[type="checkbox"]').check()
        cy.should('be.checked')

        
        cy.get('#check input[type="checkbox"]').last().uncheck()
        cy.should('not.be.checked')

     });


     it('Seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]').selectFile('cypress/fixtures/Arquivo_teste.txt')
        .then(input => {
            expect(input[0].files[0].name).to.equal('Arquivo_teste.txt');
         });
    });


    it('Seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]').selectFile('cypress/fixtures/Arquivo_teste.txt', {action: 'drag-drop'})
        .then(input => {
            expect(input[0].files[0].name).to.equal('Arquivo_teste.txt');
         });
    });

    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('Arquivo_teste.txt').as('filebTAT')
        cy.get('input[type="file"]').selectFile('@filebTAT')
        .then(input => {
            expect(input[0].files[0].name).to.equal('Arquivo_teste.txt');
         });
    });


    it('Acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('#privacy a').invoke('removeAttr', 'target').click()

        cy.contains('Talking About Testing').should('be.visible')
        

    });

});
