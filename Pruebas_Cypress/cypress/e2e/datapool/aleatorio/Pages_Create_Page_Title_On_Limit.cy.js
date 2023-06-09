import {faker} from '@faker-js/faker'


//Importar el archivo JSON como variable
const data_pool = require('../../../../Mock_Data_Sebastian.json');
const variables =  require('../../../../variables.json');
const properties = require('../../properties_sebastian.json')


// Generar un título de más de 255 caracteres
let longTitle = faker.lorem.paragraphs(3); // Genera un párrafo largo con saltos de línea

// Elimina los saltos de línea y los reemplaza por espacios en blanco
longTitle = longTitle.replace(/[\r\n]+/g, ' ');

//Mantener solo los primeros 255 caracteres
longTitle = longTitle.slice(0,255);

// Generar el contenido del cuerpo de la página
const pageBody = faker.lorem.paragraphs(5);


describe('Crear una página con el título en el limite de caracteres', () => {
  it('Crear una página con el título en el limite de caracteres', () => {
      
      cy.visit(variables.UrlBase)
      cy.get('#identification').type(variables.username)
      cy.get('#password').type(variables.password)    
      cy.get(properties.buttons.next).click()

      cy.get(properties.buttons.pages).click()
      cy.get(properties.buttons["New Page"]).click()

      cy.get('div[data-placeholder="Begin writing your page..."]').type(pageBody)
      cy.get('textarea[placeholder="Page title"]').type(longTitle)
      
      cy.get(properties.buttons.publish).click()
      cy.get(properties.buttons["continue to final review"]).click()
      cy.get(properties.buttons["confirm publish"]).click()

      cy.get('div[data-test-publish-flow="complete"]')
      .contains('Boom. It’s out there.')
      .should('be.visible');
    
    
      
  });
});
