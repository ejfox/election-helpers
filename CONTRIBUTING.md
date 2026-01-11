# Contributing to Election Helpers

Thank you for your interest in contributing to Election Helpers! This document provides guidelines and best practices for development.

## Development Setup

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Getting Started

1. Fork and clone the repository:
   ```bash
   git clone https://github.com/your-username/election-helpers.git
   cd election-helpers
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run tests to ensure everything works:
   ```bash
   npm test
   ```

## Development Workflow

### Code Quality Tools

This project uses several tools to maintain code quality:

- **ESLint**: Lints JavaScript code for errors and code style
- **Prettier**: Automatically formats code for consistency
- **Vitest**: Runs unit tests

### Available Scripts

```bash
# Run tests
npm test

# Watch mode for tests (auto-runs on file changes)
npm run test:watch

# Generate test coverage report
npm run test:coverage

# Lint code
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format code
npm run format

# Check if code is formatted
npm run format:check

# Run all quality checks (format, lint, test)
npm run check

# Generate documentation
npm run docs

# Serve documentation locally
npm run serve
```

### Before Committing

Before committing your changes, run:

```bash
npm run check
```

This will:
1. Check code formatting with Prettier
2. Run ESLint to catch code issues
3. Run all tests

### Code Style Guidelines

#### JavaScript Style

- Use ES6+ features (const/let, arrow functions, destructuring, etc.)
- Use single quotes for strings
- Use 2 spaces for indentation
- Use trailing commas in objects and arrays
- Keep lines under 80 characters when possible

#### JSDoc Documentation

All exported functions must have JSDoc comments with:
- Description of what the function does
- `@param` tags for all parameters with types
- `@returns` tag with return type
- `@example` showing usage

Example:
```javascript
/**
 * Converts a state abbreviation to its FIPS code
 * @param {string} stateAbbr - Two-letter state abbreviation (e.g., 'CA')
 * @returns {string|undefined} - FIPS code or undefined if invalid
 * @example
 * getStateFipsFromStateAbbr('CA') // => '06'
 */
export function getStateFipsFromStateAbbr(stateAbbr) {
  // ...
}
```

### Testing Guidelines

#### Writing Tests

- All new features must include tests
- Tests should be placed in the `test/` directory
- Use descriptive test names that explain what is being tested
- Aim for 100% code coverage

Example:
```javascript
describe('myFunction', () => {
  it('should return correct value for valid input', () => {
    expect(myFunction('input')).toBe('expected');
  });

  it('should handle edge cases', () => {
    expect(myFunction('')).toBeUndefined();
    expect(myFunction(null)).toBeUndefined();
  });
});
```

#### Running Tests

```bash
# Run all tests once
npm test

# Watch mode (recommended during development)
npm run test:watch

# With coverage
npm run test:coverage
```

### Git Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add support for primary election dates
fix: correct FIPS code validation for territories
docs: update README with new API examples
test: add edge cases for vote percentage calculation
```

You can also use commitizen:
```bash
npm run cz
```

### Pull Request Process

1. Create a feature branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them with descriptive messages

3. Ensure all tests pass and code is formatted:
   ```bash
   npm run check
   ```

4. Push your branch and create a Pull Request

5. Ensure CI checks pass on your PR

6. Wait for code review and address any feedback

### Code Review Guidelines

When reviewing code, check for:

- **Correctness**: Does the code do what it's supposed to?
- **Tests**: Are there tests for new functionality?
- **Documentation**: Is the code well-documented?
- **Style**: Does it follow the project's style guidelines?
- **Performance**: Are there any obvious performance issues?
- **Security**: Are there any security concerns?

## Project Structure

```
election-helpers/
├── .github/          # GitHub Actions workflows
├── src/              # Source code modules
│   ├── geographic.js         # Geographic/FIPS helpers
│   ├── election-dates.js     # Election date calculations
│   ├── party-normalizer.js   # Party name normalization
│   └── universal-helpers.js  # Universal election helpers
├── test/             # Test files
├── docs/             # Generated documentation
├── index.js          # Main entry point
├── index.d.ts        # TypeScript type definitions
├── package.json      # Package configuration
├── eslint.config.js  # ESLint configuration
├── .prettierrc       # Prettier configuration
├── .editorconfig     # Editor configuration
└── vitest.config.js  # Vitest configuration (if exists)
```

## Questions?

If you have questions or need help, please:

1. Check existing issues and discussions
2. Open a new issue with the "question" label
3. Reach out to the maintainers

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
