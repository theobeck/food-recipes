// // Import any necessary dependencies or modules
// import { configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// // Configure Enzyme with the appropriate adapter
// configure({ adapter: new Adapter() });

// // Add any other setup code you need for your tests
// // For example, setting up a test database connection, mocking API calls, etc.
// // You can also define global variables or functions that will be available in your tests

// // Export any setup code or variables that you want to use in your tests
// export const setup = () => {
//   // Your setup code here
// };

// import '@testing-library/jest-dom';
// import { vi } from 'vitest';

// // Mocks for Browser APIs
// global.fetch = vi.fn();
// global.scrollTo = vi.fn();

// // Extend expect with more matchers
// import '@testing-library/jest-dom/extend-expect';

// // Mock react-router-dom
// vi.mock('react-router-dom', () => ({
//   useNavigate: vi.fn(),
//   useParams: vi.fn(),
//   // Add other mocks as needed
// }));

// Add other global setup steps here
