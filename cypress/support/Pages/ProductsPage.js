/// <reference types="cypress" />

export class ProductsPage {
    
    constructor() {
        this.closeModalButton   = '#closeModal';
        this.shoppingCartButton = '#goShoppingCart';
    };
    
    clickAddToCartButton(product) {
        cy.get(`[value='${product}']`).should('be.visible').click();
    };

    clickCloseModalButton() {
        cy.get(this.closeModalButton).should('be.visible').click();
    };

    clickShoppingCartButton() {
        cy.get(this.shoppingCartButton).should('be.visible').click();
    };
};