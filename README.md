# Documentation

## Project Description

Our recipe website is designed to offer users an immersive culinary experience. The main page presents a captivating list of dish names and corresponding images, enticing users to explore the diverse world of recipes. Navigation through recipes is seamless, facilitated by page-based browsing rather than the traditional "Load More" button. Each dish selection leads users to a dedicated page, revealing comprehensive recipe details, including ingredients and preparation steps.

### Key Features

1. **User Reviews:** Users can leave reviews for each recipe, providing a star rating out of five and leaving comments to share their culinary experiences.

2. **Filtering, Sorting, and Searching:** The main page offers filtering options, allowing users to specifically look for vegetarian recipes. Moreover, users can sort recipes based on various criteria. The robust search functionality enables users to find specific recipes efficiently, and the filtering options extend beyond just vegetarian recipes.

3. **Pagination:** Instead of a "Load More" button, users can navigate through pages to view more recipes, enhancing the user experience.

## Technical Choices

### Backend

The backend, hosted on a virtual machine, is implemented using MongoDB. For local development, connect to the NTNU network or use VPN. The MongoDB database stores recipe information and user reviews.

## How to Run

Follow these steps to set up and run the application:

### Backend

1. Open a terminal and navigate to the "Backend" folder.
2. Run `npm install` to install dependencies.
3. Execute `npm start` to launch the server. (Note: Ensure connection to NTNU network or use VPN for local development).

### Frontend

4. Open another terminal and navigate to the project directory.
5. Run `npm install` to install required dependencies.
6. Execute `npm run dev` to start the application.

### Testing

#### ESLint

To check for ESLint errors in both the frontend and backend, run:

```bash
npm run lint
```

To fix ESLint issues, run:

```bash
npm run lint-fix
```

#### Prettier

To check for formatting issues, run:

```bash
npm run prettier
```

To fix formatting issues, run:

```bash
npm run prettier-fix
```

### Frontend Tests

The frontend tests include component tests and snapshot tests. To run these tests, navigate to the frontend directory and run:

```bash
npm run test
```

### E2E and API Tests

Both API and E2E tests are made with the Cypress framework. Ensure both frontend and backend are running locally before running the tests. To run the tests, navigate to the frontend directory and run:

```bash
npm run cypress:run
```

Alternatively, for an interactive mode, run:

```bash
npm run cypress:open
```

### Functionality

- Users can search for specific recipes, view detailed information, and leave reviews.
- Browsing recipes includes filtering, sorting, and navigating through paginated results.
- The app is responsive and accessible.

## Technologies Used

- **Backend:**

  - Apollo Server - GraphQL server
  - MongoDB - NoSQL Database
  - Mongoose - MongoDB object modeling

- **Frontend:**

  - React - JavaScript library for building user interfaces
  - Redux - State management
  - Typescript - Programming language
  - Vite - Build tool for frontend development

- **Testing:**
  - Cypress - Framework for API and E2E tests

## Accessibility and Sustainability

### Adherence to WCAG Guidelines

We have prioritized accessibility by ensuring our website complies with the Web Content Accessibility Guidelines (WCAG). Our focus has been on principles of perceivability, operability, understandability, and robustness. The website has been thoroughly tested using the axe devTools to guarantee a user-friendly experience for individuals with various abilities.

### Screen Reader Compatibility

To enhance accessibility for visually impaired users, we've made sure that the site is navigable and understandable when using screen readers. Manual testing with a screen reader extension was conducted to ensure a seamless experience for users relying on this assistive technology.

### Semantic HTML Usage

Employing Semantic HTML elements in our website's structure not only improves overall structure and readability for all users but also enhances accessibility for screen readers and assistive technologies. This commitment to semantic HTML aligns with our goal of creating an inclusive and user-friendly platform.

### Keyboard Navigation

Recognizing the diversity of users, we've made the site fully navigable via keyboard. This ensures accessibility for users with motor disabilities who may not be able to use a mouse. Thorough manual testing has been conducted to validate the effectiveness of keyboard navigation.

### Color Contrast and Text Size

We've ensured high contrast between text and background colors and provided options to adjust text size (zoom). This accommodates users with visual impairments and improves overall readability. Our efforts in this regard have been verified using Google Lighthouse to meet established standards.
