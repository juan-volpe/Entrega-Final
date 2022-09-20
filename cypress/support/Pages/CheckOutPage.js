/// <reference types="cypress" />

export class CheckOutPage {

    constructor() {
        this.firstNameInput = '#FirstName';
        this.lastNameInput = '#lastName';
        this.cardNumberInput = '#cardNumber';
    };

    clickGoToCheckoutButton() {
        cy.contains('Go to Checkout').should('be.visible').click();
    };

    typeFirstName(firstName) {
        cy.get(this.firstNameInput).type(firstName);
    };

    typeLastName(lastName) {
        cy.get(this.lastNameInput).type(lastName);
    };

    typeCardNumber(cardNumber) {
        cy.get(this.cardNumberInput).type(cardNumber);
    };

    clickPurchaseButton() {
        cy.contains('Purchase').should('be.visible').click();
    };

    waitMessage() {
        cy.get('#name', {timeout:10000}).should('be.visible');
    };
};