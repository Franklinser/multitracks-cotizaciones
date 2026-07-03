# Contributing Guidelines

Thank you for considering contributing to Multitracks Sistema de Cotizaciones!

## Code of Conduct

Please be respectful and constructive in all interactions.

## How to Contribute

### Reporting Bugs
1. Check if the bug has already been reported in Issues
2. Provide a clear description of the bug
3. Include steps to reproduce
4. Specify your environment (browser, OS)
5. Add screenshots if applicable

### Suggesting Enhancements
1. Check if the enhancement has been suggested
2. Provide clear use case
3. Explain the expected behavior
4. Describe current behavior (if applicable)

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit with clear messages (`git commit -m 'Add AmazingFeature'`)
5. Push to your fork (`git push origin feature/AmazingFeature`)
6. Open a Pull Request with description

### Commit Message Guidelines

```
<type>: <subject>

<body>

<footer>
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Build, dependencies, tooling

Example:
```
feat: add quote expiration tracking

- Implement expiration date field
- Add visual indicators for expired quotes
- Add email reminders before expiration

Closes #123
```

## Development Setup

```bash
# Clone repository
git clone https://github.com/Franklinser/multitracks-cotizaciones.git
cd multitracks-cotizaciones

# Install dependencies
npm install

# Start development server
npm run dev

# Run linter
npm run lint
```

## Code Standards

- Use TypeScript for type safety
- Follow ESLint rules
- Keep components small and focused
- Use meaningful variable names
- Add comments for complex logic
- Write tests for new features

## Branching Strategy

- `main` - Production ready
- `develop` - Development branch
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches
- `hotfix/*` - Urgent production fixes

## Questions?

Feel free to reach out:
- Email: Multysec@outlook.com
- WhatsApp: +503 6075-0647

---

**Thank you for contributing! 🙏**
