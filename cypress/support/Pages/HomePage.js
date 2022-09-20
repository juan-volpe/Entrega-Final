/// <reference types="cypress" />

export class HomePage {

    constructor() {
        this.onlineShopLinkButton = '#onlineshoplink';
    };
    
    clickOnlineShopLinkButton() {
        cy.get(this.onlineShopLinkButton).should('be.visible').click();
    };
};