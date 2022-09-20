/// <reference types="cypress" />

export class ShoppingCartPage {
    
    constructor() {
        this.price = '#price';
    };

    clickShowTotalPriceButton() {
        cy.contains('Show total price').should('be.visible').click();
    };

    verifyNameProduct(nameProduct) {
        cy.get(`[name='${nameProduct}']`).should('have.text', nameProduct);
    };

    verifyPriceProduct(nameProduct, priceProduct) {
        cy.get(`[name='${nameProduct}']`).siblings(`[name='${priceProduct}']`).should('have.text', `$${priceProduct}`);
    };

    verifyTotalProducts(totalPrice) {
        cy.get(this.price).should('have.text', totalPrice);
    };
};