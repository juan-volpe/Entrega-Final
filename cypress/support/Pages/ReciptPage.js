/// <reference types="cypress" />

export class ReciptPage {

    constructor() {
        this.creditCard   = '#creditCard';
        this.totalPrice   = '#totalPrice';    
    };

    verifyFirstNameAndLastName(firstName, lastName) {
        cy.get('#name').should('have.text', `${firstName}` + ' ' + `${lastName}` + ' has succesfully purchased the following items');
    };

    verifyNameProduct1(nameProduct) {
        cy.get(`[id='${nameProduct}']`).should('have.text', nameProduct);
    };

    verifyNameProduct2(nameProduct) {
        cy.get(`[id='${nameProduct}']`).should('have.text', nameProduct);
    };
    
    verifyCardNumber(cardNumber) {
        cy.get(this.creditCard).should('have.text', cardNumber);
    };

    verifyTotalPrice(totalPrice) {
        cy.get(this.totalPrice).should('have.text', 'You have spent ' + `$${totalPrice}`);
    };
};