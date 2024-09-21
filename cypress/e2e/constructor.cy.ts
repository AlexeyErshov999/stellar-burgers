import { URL } from '@api';
import { deleteCookie, setCookie } from '../../src/utils/cookie';
import { selectorList } from '../support/constants/selectors';
import { url } from '../support/constants/url';

describe('Конструктор работает', () => {
  beforeEach(() => {
    setCookie('accessToken', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjBhMDAyOTdlZGUwMDAxZDA2MDg1NCIsImlhdCI6MTcxMjMxMDE2NiwiZXhwIjoxNzEyMzExMzY2fQ.v7kdecJvLfdmlBsvf_BySvsfnXX3K0Er__GNYw-NRLM');
    localStorage.setItem('refreshToken', '9cbdd5b777edfb92bd9183a7cf2372a12b545c045a9796f94c1afd0b9d374a8794aa15bee20a7556');
    cy.intercept('GET', `${URL}//auth/user`, {fixture: 'user.json'}).as('getUser');
    cy.intercept('GET', `${URL}/ingredients`, {fixture: 'ingredients.json'}).as('getIngredients');
    cy.visit(url);
    cy.wait('@getUser');
  });

  it('Ингредиенты приходят с сервера', () => {
    cy.get(selectorList.constructor).as('constructor');

    cy.addIngredient('Булки');
    cy.addIngredient('Начинки');

    cy.get('@constructor').should('contain', 'Краторная булка N-200i');
    cy.get('@constructor').should('contain', 'Биокотлета из марсианской Магнолии');
  });

  it('Модалка открывается и закрывается', () => {
    cy.get(selectorList.ingredientItem).first().click();
    cy.get(selectorList.modal).as('modal');
    cy.get('@modal').should('exist');
    cy.get('@modal').should('contain', 'Краторная булка N-200i');

      // закрытие по крестику
    cy.get(selectorList.modalCloseButton).click();
    cy.get('@modal').should('not.exist');

      // открытие
    cy.get(selectorList.ingredientItem).first().click();
    cy.get('@modal').should('exist');

      // закрытие по оверлею
    cy.get(selectorList.modalOverlay).click('left', {force: true});
    cy.get('@modal').should('not.exist');
  });

  it('Заказ создается', () => {
    cy.intercept('POST', `${URL}/orders`, {fixture: 'order.json'}).as('orderBurgerApi');
    cy.get(selectorList.constructor).as('constructor');


    cy.addIngredient('Булки');
    cy.addIngredient('Начинки');

    cy.get('@constructor').children('div').children('button').click();

    cy.get(selectorList.modal).as('modal');
    cy.get('@modal').should('exist');
    cy.get('@modal').should('contain', '37865');

    cy.get(selectorList.modalCloseButton).click();
    cy.get('@modal').should('not.exist');


    cy.get('@constructor').should('not.contain', 'Биокотлета из марсианской Магнолии');
    cy.get('@constructor').should('not.contain', 'Краторная булка N-200i');

    cy.wait('@orderBurgerApi');
  })

    afterEach(() => {
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
    });
});
