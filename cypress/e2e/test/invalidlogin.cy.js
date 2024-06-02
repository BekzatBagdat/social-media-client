import { invalidEmail, invalidPassword } from '../../support/testdata';

describe('Login with valid credentials', () => {
  it('User can log in with valid credentials', () => {
    // Visit the login page
    cy.visit('https://bekzatbagdat.github.io/social-media-client/');

    // Ensuring the register modal is not visible
    cy.get('#registerModal').then(($modal) => {
      if ($modal.is(':visible')) {
        //close the modal
        cy.get('#registerModal').click('topRight');
      }
    });

    // the login button is visible before clicking
    cy.get('button[data-auth="login"][data-bs-toggle="modal"]').should(
      'be.visible',
    );

    // Click the login button to open the login modal
    cy.get('button[data-auth="login"][data-bs-toggle="modal"]').eq(1).click();

    // Fill in invalid credentials
    cy.get('#loginEmail').type(invalidEmail);
    cy.get('#loginPassword').type(invalidPassword);

    // Click the login button in the form
    cy.get('#loginForm button').contains('Login').click();

    // Verify that the alert message says credentials is not valid
    cy.on('window:alert', (message) => {
      expect(message).to.equal(
        'Either your username was not found or your password is incorrect',
      );
    });
  });
});
