describe('ListEmployees Component', () => {

  context('When no employees exist', () => {
    it('should display "No employees found" message', () => {
      // Visit page with explicitly empty localStorage
      cy.visit('http://localhost:3000/list', {
        onBeforeLoad: (win) => {
          win.localStorage.removeItem('employeeList'); // Ensure it's empty
        }
      });

      // Check for the no employees message
      cy.contains('No employees found.').should('be.visible');

      // Verify the main element has correct attributes
      cy.get('main[role="main"][aria-label="List of Employees"]').should('exist');

      // Ensure table is NOT displayed
      cy.get('table').should('not.exist');
    });
  });

  context('When employees exist', () => {
    const mockEmployees = [
      {
        firstname: 'Alice',
        lastname: 'Durand',
        birthdate: '1985-05-05',
        startdate: '2010-09-01',
        street: '10 avenue République',
        city: 'Lyon',
        state: 'TX',
        zipcode: '69000',
        department: 'Engineering'
      },
      {
        firstname: 'John',
        lastname: 'Doe',
        birthdate: '1990-03-15',
        startdate: '2015-06-20',
        street: '123 Main Street',
        city: 'Paris',
        state: 'CA',
        zipcode: '75001',
        department: 'Marketing'
      },
      {
        firstname: 'Jane',
        lastname: 'Smith',
        birthdate: '1988-12-10',
        startdate: '2018-02-14',
        street: '456 Oak Avenue',
        city: 'Marseille',
        state: 'NY',
        zipcode: '13001',
        department: 'Sales'
      }
    ];

    beforeEach(() => {
      // Set data BEFORE page loads using onBeforeLoad
      cy.visit('http://localhost:3000/list', {
        onBeforeLoad: (win) => {
          win.localStorage.setItem('employeeList', JSON.stringify(mockEmployees));
        }
      });
    });

    it('should display the main page heading from ListEmployees component', () => {
      // Check for the main heading from ListEmployees.js
      cy.get('main h1').should('contain.text', 'Employee List').and('be.visible');

      // Verify the main element structure
      cy.get('main[role="main"][aria-label="List of Employees"]').should('exist');

      // Ensure "No employees found" is NOT displayed
      cy.contains('No employees found.').should('not.exist');
    });

    it('should display the table with react-table features', () => {
      // Wait for table to be rendered
      cy.get('table.table-striped', { timeout: 10000 }).should('be.visible');

      // Check for the table heading from Table component
      cy.get('.main-row h1').should('contain.text', 'List Employees');

      // Verify table structure
      cy.get('thead').should('exist');
      cy.get('tbody').should('exist');

      // Check that employee data is displayed in table rows
      cy.get('tbody tr').should('have.length.at.least', 1);
    });

    it('should display employee data in table cells', () => {
      // Wait for table to load
      cy.get('table', { timeout: 10000 }).should('be.visible');

      // Check for specific employee data using td with role="cell"
      cy.get('td[role="cell"]').should('contain', 'Alice');
      cy.get('td[role="cell"]').should('contain', 'Durand');
      cy.get('td[role="cell"]').should('contain', 'John');
      cy.get('td[role="cell"]').should('contain', 'Doe');
      cy.get('td[role="cell"]').should('contain', 'Jane');
      cy.get('td[role="cell"]').should('contain', 'Smith');
      cy.get('td[role="cell"]').should('contain', 'Engineering');
      cy.get('td[role="cell"]').should('contain', 'Marketing');
      cy.get('td[role="cell"]').should('contain', 'Sales');
    });

    it('should have functional search feature', () => {
      // Wait for table to load
      cy.get('table', { timeout: 10000 }).should('be.visible');

      // Find and use the search input
      cy.get('.searchBlock input[placeholder*="records"]').should('be.visible');
      cy.get('.searchBlock input[placeholder*="records"]').type('Alice');

      // Wait for debounced search to execute
      cy.wait(300);

      // Should show only rows containing "Alice"
      cy.get('td[role="cell"]').should('contain', 'Alice');
      cy.get('td[role="cell"]').should('not.contain', 'John');
      cy.get('td[role="cell"]').should('not.contain', 'Jane');
    });

    it('should have functional pagination controls', () => {
      // Wait for table to load
      cy.get('table', { timeout: 10000 }).should('be.visible');

      // Check pagination info
      cy.contains('Page').should('be.visible');
      cy.contains('of').should('be.visible');

      // Check pagination buttons exist
      cy.get('button').contains('<<').should('exist');
      cy.get('button').contains('<').should('exist');
      cy.get('button').contains('>').should('exist');
      cy.get('button').contains('>>').should('exist');
    });

    it('should have functional page size selector', () => {
      // Wait for table to load
      cy.get('table', { timeout: 10000 }).should('be.visible');

      // Find page size selector
      cy.get('select.form-select').should('be.visible');

      // Check default value and options
      cy.get('select.form-select').should('have.value', '10');
      cy.get('select.form-select option').should('contain', '10 entries');
      cy.get('select.form-select option').should('contain', '25 entries');
      cy.get('select.form-select option').should('contain', '50 entries');
      cy.get('select.form-select option').should('contain', '100 entries');
    });

    it('should maintain accessibility attributes', () => {
      // Check main element accessibility
      cy.get('main')
        .should('have.attr', 'role', 'main')
        .should('have.attr', 'aria-label', 'List of Employees');

      // Check that both headings exist (from ListEmployees and Table components)
      cy.get('main h1').should('contain.text', 'Employee List');
      cy.get('.main-row h1').should('contain.text', 'List Employees');
    });

    it('should render table container with correct classes', () => {
      // Wait for table to load
      cy.get('table', { timeout: 10000 }).should('be.visible');

      // Check table container
      cy.get('.tableContainer').should('exist').and('have.class', 'w-85');

      // Check table classes
      cy.get('table').should('have.class', 'table-striped').and('have.class', 'table-bordered');
    });

    // Test based on your working example
    it('displays the employee from localStorage (your working test)', () => {
      cy.contains('Alice').should('exist');
      cy.contains('Durand').should('exist');
      cy.contains('Engineering').should('exist');
    });
  });

  context('Redux Integration', () => {
    it('should handle empty array from Redux store', () => {
      // Visit with empty array set before load
      cy.visit('http://localhost:3000/list', {
        onBeforeLoad: (win) => {
          win.localStorage.setItem('employeeList', JSON.stringify([]));
        }
      });

      // Should show no employees message
      cy.contains('No employees found.').should('be.visible');
      cy.get('table').should('not.exist');
    });

    it('should handle malformed data gracefully', () => {
      // Visit with invalid JSON
      cy.visit('http://localhost:3000/list', {
        onBeforeLoad: (win) => {
          win.localStorage.setItem('employeeList', 'invalid-json');
        }
      });

      // Should still render without crashing
      cy.get('main').should('exist');
    });
  });

  context('Component Integration', () => {
    it('should properly pass data from ListEmployees to Table component', () => {
      const testEmployee = [
        {
          firstname: 'Test',
          lastname: 'User',
          birthdate: '1990-01-01',
          startdate: '2020-01-01',
          street: '123 Test Street',
          city: 'Test City',
          state: 'TS',
          zipcode: '12345',
          department: 'Testing'
        }
      ];

      // Set data BEFORE page loads
      cy.visit('http://localhost:3000/list', {
        onBeforeLoad: (win) => {
          win.localStorage.setItem('employeeList', JSON.stringify(testEmployee));
        }
      });

      // Verify data flows from ListEmployees to Table
      cy.get('table', { timeout: 10000 }).should('be.visible');
      cy.contains('td', 'Test').should('be.visible');
      cy.contains('td', 'User').should('be.visible');
      cy.contains('td', 'Testing').should('be.visible');
    });
  });
});