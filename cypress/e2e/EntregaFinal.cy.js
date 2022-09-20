/// <reference types='cypress' />

import { HomePage         } from '../support/Pages/HomePage';
import { ProductsPage     } from '../support/Pages/ProductsPage';
import { ShoppingCartPage } from '../support/Pages/ShoppingCartPage';
import { CheckOutPage     } from '../support/Pages/CheckOutPage';
import { ReciptPage       } from '../support/Pages/ReciptPage';

describe('Entrega-Final - Juan Francisco Volpe', () => {
    
    const homePage         = new HomePage();
    const productsPage     = new ProductsPage();
    const shoppingCartPage = new ShoppingCartPage();
    const checkOutPage     = new CheckOutPage();
    const reciptPage       = new ReciptPage();

    let username     = 'juan14';
    let password     = '775588!';
    let gender       = 'Male';
    let year         = '1987';
    let month        = 'June';
    let day          = '28';
    let productsData = '';
    let checkOutData = '';
    let totalPrice   = 0;
        
    before('Debería poder registrarse a la página web y setear toda la data correctamente', () => {

        cy.request({          
            url: 'https://pushing-it-backend.herokuapp.com/api/register',
            method: 'POST',
            body: {
                    username: username,
                    password: password,
                    gender: gender,
                    year: year, 
                    month: month,
                    day: day
                }      
            }).then((response) => {
                expect(response.status).equal(200);
                expect(response.body.newUser.username).equal(username);      
            });
            
            cy.fixture('Products/ProductsData').then((dataProducts) => {            
                productsData = dataProducts;
            });

            cy.fixture('CheckOut/CheckOutData').then((dataCheckOut) => {            
                checkOutData = dataCheckOut;
            });
    });

    beforeEach('Debería poder loguearse e ir a la página web correctamente', () => {
        
        cy.request({      
            url: 'https://pushing-it.herokuapp.com/api/login',
            method: 'POST',
            body: {      
                username: username,
                password: password
            }
        }).then((response) => {
            expect(response.status).equal(200);
            expect(response.body.user.username).equal(username);
            window.localStorage.setItem('token', response.body.token);
            window.localStorage.setItem('user', response.body.user.username);
        });

        cy.visit('/');    
        cy.url().should('contain', 'pushing');
    });
    
    it('Debería poder: ' +
        'Ir al módulo "Online Shop" ' + 
        'Elegir 2 productos a elección y añadirlos al carrito ' +   
        'Verificar el nombre y el precio de los dos productos ' +
        'Hacer click en "Show total price" y verificar el precio acumulado de los 2 productos ' +
        'Completar el checkout con su nombre, apellido y una tarjeta de crédito de 16 dígitos ' +
        'Verificar los siguientes datos en el ticket de compra (nombre y apellido, productos, tarjeta de crédito, costo total)', () => {
        
        homePage.clickOnlineShopLinkButton();

        productsPage.clickAddToCartButton(productsData.firstProductName);
        productsPage.clickCloseModalButton();

        productsPage.clickAddToCartButton(productsData.secondProductName);
        productsPage.clickCloseModalButton();
        
        productsPage.clickShoppingCartButton();

        shoppingCartPage.verifyNameProduct(productsData.firstProductName);
        shoppingCartPage.verifyPriceProduct(productsData.firstProductName, productsData.firstProductPrice);
        
        shoppingCartPage.verifyNameProduct(productsData.secondProductName);
        shoppingCartPage.verifyPriceProduct(productsData.secondProductName, productsData.secondProductPrice);
            
        shoppingCartPage.clickShowTotalPriceButton();

        totalPrice = productsData.firstProductPrice + productsData.secondProductPrice;

        shoppingCartPage.verifyTotalProducts(totalPrice);

        checkOutPage.clickGoToCheckoutButton();
        checkOutPage.typeFirstName(checkOutData.firstName);
        checkOutPage.typeLastName(checkOutData.lastName);
        checkOutPage.typeCardNumber(checkOutData.cardNumber);   
        checkOutPage.clickPurchaseButton();    
        checkOutPage.waitMessage();

        reciptPage.verifyFirstNameAndLastName(checkOutData.firstName, checkOutData.lastName);
        reciptPage.verifyNameProduct1(productsData.firstProductName);
        reciptPage.verifyNameProduct2(productsData.secondProductName);
        reciptPage.verifyCardNumber(checkOutData.cardNumber);
        reciptPage.verifyTotalPrice(totalPrice);
    });

    after('Debería poder eliminar el usuario correctamente', () => {
        
        cy.request({
            url: 'https://pushing-it-backend.herokuapp.com/api/deleteuser/' + username,
            method: 'DELETE'
        }).then((response) => {
            expect(response.status).equal(200);
        });
    });
});