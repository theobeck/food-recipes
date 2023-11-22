describe('The Main Page', () => {
  it('successfully loads', () => {
    cy.visit('/');
  });
});

// describe('first test', () => {
//   it('passes', () => {
//     expect(true).to.equal(false);
//   });
// });

// describe('open sink', () => {
//   it('clicks the link "type"', () => {
//     cy.visit('https://example.cypress.io');
//     cy.contains('type').click();
//     cy.url().should('include', '/commands/actions');
//     cy.get('.action-email').type('nicosjokk@pray.com');
//     cy.get('.action-email').should('have.value', 'nicosjokk@pray.com');
//   });
// });
