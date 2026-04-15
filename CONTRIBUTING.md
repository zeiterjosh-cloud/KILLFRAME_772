# Contributing to KILLFRAME

Thank you for your interest in contributing to KILLFRAME! This document provides guidelines and information for contributors.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/KILLFRAME_772.git
   cd KILLFRAME_772
   ```
3. **Install dependencies** (if any):
   ```bash
   npm install
   ```
4. **Run the tests** to ensure everything works:
   ```bash
   npm test
   ```

## Development Workflow

### Making Changes

1. Create a new branch for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes, following the code style of the project

3. Test your changes:
   ```bash
   npm test
   ```

4. Commit your changes with a clear message:
   ```bash
   git commit -m "Add feature: description of your changes"
   ```

5. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

6. Create a Pull Request on GitHub

### Code Style

- Use ES6+ JavaScript features
- Keep functions small and focused
- Add JSDoc comments for public APIs
- Follow existing naming conventions

### Testing

- Add tests for new features
- Ensure all existing tests pass
- Test both success and error cases

## Types of Contributions

### Bug Reports

- Use GitHub Issues to report bugs
- Include steps to reproduce
- Include expected vs actual behavior
- Include your environment details

### Feature Requests

- Use GitHub Issues to suggest features
- Explain the use case
- Describe the expected behavior

### Code Contributions

- Bug fixes
- New game/app generation modes
- New quality checks
- Documentation improvements
- Example apps/games

## Questions?

Feel free to open an issue for any questions about contributing!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
