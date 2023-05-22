import {faker} from '@faker-js/faker'


// Obtener Variables aleatorias de Faker

const name = faker.name.firstName();
// Generar un título de más de 255 caracteres
let longEmail = faker.lorem.paragraphs(3); // Genera un párrafo largo con saltos de línea

// Elimina los saltos de línea y los reemplaza por espacios en blanco
longEmail = longEmail.replace(/[\r\n]+/g, ' ');

longEmail = longEmail.slice(0,100);

//Agregar Dominio
longEmail = longEmail + "@hotmail.com"

describe('Gestión Miembro', () => {
    let properties;
    let variables;
  
    before(() => {
        cy.readFile('variables.json').then((content) => {
          variables = content;
        });
        cy.readFile('post_properties.json').then((content_post) => {
          properties = content_post;
        });
      });
  
      it('Hacer Login, crear un miembro, modificar un miembro y validar que el miembro ha sido modificado', () => {
        cy.visit(variables.UrlBase);
        cy.wait(2000);
        cy.get('#identification').type(variables.username);
        cy.get('#password').type(variables.password);
        cy.get('[data-test-button=\"sign-in\"]').click();
        cy.wait(2000);


        cy.get("[data-test-nav=\"members\"]").click();
        cy.wait(2000);
        cy.get("[data-test-new-member-button=\"true\"]").click();
        cy.wait(2000);
        cy.get("[data-test-input=\"member-name\"]").type('Nuevo miembro');
        cy.get("[data-test-input=\"member-email\"]").type('nuevoeditaado@correo.com');
        cy.get("[data-test-button=\"save\"]").click();
        
        cy.wait(2000);
        cy.get("[data-test-nav=\"members\"]").click();
        cy.wait(2000);
        cy.get(".gh-member-avatar-image").filter((_, element) => {
          return Cypress.$(element).attr('alt') === 'Nuevo miembro';
        }).click();
        cy.wait(2000);
        cy.get("input[data-test-input='member-email']").clear().type(longEmail);
        cy.wait(2000);
        cy.get("[data-test-button=\"save\"]").click();
        cy.get(properties.buttons["miembro-primero"]).first().click();
        cy.wait(2000);
    
        cy.get(properties.elements["miembro-titulo-nombre"]).should('contain', name);
      });
  });