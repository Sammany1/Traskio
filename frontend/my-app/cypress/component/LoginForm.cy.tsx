import React from 'react';
import { mount } from 'cypress/react';
import LoginForm from '../../src/pages/Login/LoginForm';

describe('LoginForm Component', () => {
  it('renders the login form', () => {
    mount(<LoginForm />);
    cy.get('input[type="text"]').should('exist');
    cy.get('input[type="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  it('displays an error message on invalid login', () => {
    mount(<LoginForm />);
    cy.get('input[type="text"]').type('invaliduser');
    cy.get('input[type="password"]').type('invalidpassword');
    cy.get('button[type="submit"]').click();
    cy.get('.error-message').should('contain', 'Invalid credentials. Please try again.');
  });
});