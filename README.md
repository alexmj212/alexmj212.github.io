# alexmj212.github.io

Personal portfolio and blog built with Jekyll and TailwindCSS.

## Local Development

### Prerequisites
- Ruby 3.1+
- Node.js 20+
- Bundler (`gem install bundler`)

### Setup
```bash
# Install Ruby dependencies
bundle install

# Install Node dependencies
npm install
```

### Development
```bash
# Build and serve locally with live reload
npm run serve

# Or build for production
npm run build
```

## Deployment

This site is automatically deployed to GitHub Pages using GitHub Actions. 

The workflow:
1. Builds TailwindCSS from source
2. Builds the Jekyll site
3. Deploys to GitHub Pages

Push to the `main` branch to trigger a deployment.

## Technology Stack

- **Jekyll** - Static site generator
- **TailwindCSS** - Utility-first CSS framework
- **Three.js** - 3D graphics for hero background animation
- **GitHub Pages** - Hosting
- **GitHub Actions** - CI/CD pipeline