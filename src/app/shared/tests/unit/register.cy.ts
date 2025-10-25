import { HttpClientModule } from "@angular/common/http";
import { RegisterComponent } from "../../../routes/register/register.component";
import { AsyncValidatorService } from "../../services/async-validator.service";
import { AUTH_BASE_URL } from "../../utils/constants/util-constants";

context('create account testing', () => {
  beforeEach(() => {
    cy.intercept('GET', `${AUTH_BASE_URL}/check-alias*`, {
      statusCode: 200,
      body: null,
    }).as('checkAlias');

    cy.mount(RegisterComponent, {
      imports: [HttpClientModule],
      providers: [AsyncValidatorService],
    });
  });

  it('should display the registration form', () => {
    // Check that the form exists
    cy.get('form').should('exist');

    // Check that all main sections are present
    cy.get('.dropzone-add').should('exist');
    cy.get('#alias').should('exist');
    cy.get('#bio').should('exist');
  });

  it('should have all required form fields', () => {
    // User information fields
    cy.get('div#address input#street').should('exist');
    cy.get('div#address input#postal-code').should('exist');
    cy.get('div#address input#city').should('exist');

    // Bank account fields
    cy.get('div#bank-account input#account-holder').should('exist');
    cy.get('div#bank-account input#account-number').should('exist');

    // Submit button
    cy.get('button[type=submit]').should('exist');
  });

  it('should allow entering basic user information', () => {
    // Enter only alias information
    cy.get('#alias').type('testuser123');

    // Verify value was entered
    cy.get('#alias').should('have.value', 'testuser123');
  });
});
