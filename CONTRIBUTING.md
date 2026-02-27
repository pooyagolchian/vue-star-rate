# Contributing to Vue Star Rate

Thank you for considering contributing to Vue Star Rate! We welcome all contributions, from bug fixes to new features.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)

## Code of Conduct

This project and everyone participating in it is governed by our commitment to maintain a welcoming, inclusive environment. Please be respectful and constructive in all interactions.

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **pnpm** >= 8 (recommended package manager)
- **Git**

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork:

```bash
git clone https://github.com/YOUR_USERNAME/vue-star-rate.git
cd vue-star-rate
```

1. Add the upstream remote:

```bash
git remote add upstream https://github.com/pooyagolchian/vue-star-rate.git
```

## Development Setup

1. Install dependencies:

```bash
pnpm install
```

1. Start the development server:

```bash
pnpm dev
```

1. Run tests:

```bash
pnpm test
```

1. Build the library:

```bash
pnpm build
```

### Documentation Development

To work on the documentation site:

```bash
pnpm docs:dev
```

## Making Changes

### Branch Naming

Create a branch with a descriptive name:

- `feature/add-animation-support`
- `fix/half-star-clicking`
- `docs/update-api-reference`
- `refactor/simplify-star-component`

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): short description

[optional body]

[optional footer]
```

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:

```
feat(rating): add support for custom icons
fix(keyboard): correct arrow key navigation in RTL mode
docs(readme): update installation instructions
```

## Pull Request Process

1. **Update your fork** with the latest upstream changes:

```bash
git fetch upstream
git rebase upstream/main
```

1. **Create a new branch** from `main`:

```bash
git checkout -b feature/your-feature
```

1. **Make your changes** and commit them with clear messages

2. **Run tests** and ensure they pass:

```bash
pnpm test:run
pnpm typecheck
```

1. **Push your branch** to your fork:

```bash
git push origin feature/your-feature
```

1. **Open a Pull Request** on GitHub:
   - Provide a clear title and description
   - Reference any related issues
   - Include screenshots for UI changes

### PR Checklist

- [ ] Tests pass locally (`pnpm test:run`)
- [ ] TypeScript compiles without errors (`pnpm typecheck`)
- [ ] Documentation updated (if applicable)
- [ ] Follows coding standards
- [ ] Commit messages follow conventional commits

## Coding Standards

### TypeScript

- Use strict TypeScript types
- Avoid `any` type when possible
- Export types for public APIs

### Vue Components

- Use Composition API with `<script setup>`
- Follow Vue 3 best practices
- Ensure accessibility (ARIA attributes, keyboard navigation)

### Styling

- Use scoped styles in Vue components
- Follow BEM naming convention for CSS classes
- Support dark/light themes

### Testing

- Write unit tests for new features
- Maintain test coverage
- Test edge cases and error scenarios

## Questions?

Feel free to open an issue for questions or discussions. We're here to help!

---

Thank you for contributing! 🌟
