describe('Testing JW EPUB Parser Module in the browser', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('correctly parses mwb epub file', () => {
		cy.get('[data-test=mwb_file]').selectFile('cypress/fixtures/mwb_E_202309.epub');
		cy.get('.json-formatter-toggler').should('exist');
	});

	it('correctly parses w epub file', () => {
		cy.get('[data-test=w_file]').selectFile('cypress/fixtures/w_E_202309.epub');
		cy.get('.json-formatter-toggler').should('exist');
	});
});
