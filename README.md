
# README.md

## Overview
I built a React application that displays movies fetched from The Movie Database (TMDb) API. Users can search for movies by title, filter them by genre, sort the results, and navigate through pages using pagination. The app only shows movies released in the last month.

## App Structure and Architecture
I set up the project using Vite because it's faster and more efficient during development compared to Create React App. The app is organized into several directories:

- **shared/Hooks**: Custom hooks like useDebounce for debouncing search input.
- **shared/Components**: Contains reusable UI components like MovieCard, MovieList, SearchBar, FilterBar, and SortMenu.
- **core/layout**: Holds container components like HomePage that connect the UI components to the Redux store.
- **core/store**: Manages global state using Redux Toolkit. It includes the store, custom hooks, and slices for state management.
- **core/Utils**: Utility functions and constants, such as the api configuration and genres list.

## Key Implementation Points

### Search, Filter, and Sort
- **Search by Title**: Implemented using a controlled input in the SearchBar component. I used a custom `useDebounce` hook to delay the API call until the user stops typing for 500ms. This reduces unnecessary API requests and improves performance.

- **Filter by Genre**: The FilterBar component allows users to select a genre. When the selection changes, it updates the state and triggers a new API call to fetch movies of that genre.

- **Sorting**: The SortMenu component provides options to sort movies by popularity, release date, or rating. The selected sort option is sent as a parameter in the API request.

### Pagination
- **Implementation**: Used Material-UI's Pagination component. The current page and total pages are stored in the Redux state. Changing the page triggers an API call to fetch movies for that page.

- **Reasoning**: Managing pagination through the Redux store keeps the state consistent across the app and makes it easier to handle in components.

### Limiting Results to Last Month
- **How I Did It**: Calculated the date one month before the current date and formatted it to match the API's expected date format. Used `release_date.gte` and `release_date.lte` parameters in the API request to limit results to movies released in that date range.

- **Challenges**: Ensuring the date calculations accounted for edge cases like month boundaries and formatting dates correctly.

## Decisions and Reasoning
- **Vite and TypeScript**: I chose Vite as the web bundler for its speed and simplicity. TypeScript was essential for type safety, which helped catch errors early and made the code more maintainable.

- **Redux Toolkit**: Simplified the Redux setup and reduced boilerplate. Using `createAsyncThunk` made handling asynchronous API calls and managing loading states straightforward.

- **Material-UI**: Provided a set of ready-to-use components, which sped up development and ensured a consistent look and feel.

- **Axios**: Made handling HTTP requests easier, and its support for interceptors was useful for handling errors globally.

## How to Run the Project
### Install Dependencies:
```bash
npm install
```

### Set Up Environment Variables:
Create a `.env` file in the root directory and add your TMDb API key:

```
VITE_API_KEY=your_api_key_here
```

### Start the Development Server:
```bash
npm run dev
```
