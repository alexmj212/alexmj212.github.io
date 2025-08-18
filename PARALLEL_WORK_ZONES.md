# Parallel Work Zones Documentation

## Worktree Structure
- **Main** (`/home/alex/Projects/alexmj212.github.io`) - Frontend Engineer
- **Security Fixes** (`/home/alex/Projects/security-fixes`) - Frontend Code Reviewer  
- **Accessibility Fixes** (`/home/alex/Projects/accessibility-fixes`) - General Purpose Agent

## Safe Parallel Zones Analysis

### ✅ LOW CONFLICT ZONES

#### Frontend Engineer (Main Branch)
- `src/components/` - Component logic and structure
- `src/styles/` - Styling and design system
- `tailwind.config.js` - Tailwind configuration
- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Build configuration
- `src/data/` - Data files and content

#### Security Agent (Security-fixes Branch)
- `package.json` & `package-lock.json` - Dependency management
- `public/index.html` - Security headers and CSP (specific sections)
- Security-specific component reviews (non-structural)

#### Accessibility Agent (Accessibility-fixes Branch)  
- `public/index.html` - Semantic HTML and lang attributes (specific sections)
- ARIA attributes in existing components
- Accessibility-specific CSS in `src/styles/`
- Screen reader optimizations

### ⚠️ MEDIUM CONFLICT ZONES (Requires Coordination)

#### Shared Components (All agents may modify)
- `src/components/Navbar.tsx` - Navigation structure, ARIA, security
- `src/components/ThreeBackground.tsx` - Performance, security, accessibility
- `src/components/ContactList.tsx` - Forms, security, accessibility

#### Shared Configuration Files
- `public/index.html` - Multiple sections (security headers vs semantic HTML)

### 🚫 HIGH CONFLICT ZONES (Sequential Work Required)

#### Core Application Files
- `src/App.tsx` - Main application structure
- `src/index.tsx` - Application bootstrap

## Coordination Protocol

### File-Level Coordination
1. **Navbar.tsx**: Frontend structure → Accessibility ARIA → Security review
2. **ThreeBackground.tsx**: Frontend performance → Accessibility screen reader → Security audit
3. **ContactList.tsx**: Frontend structure → Security validation → Accessibility forms
4. **index.html**: Security headers → Accessibility semantic → Frontend meta tags

### Communication Protocol
1. Update respective coordination files before starting work on shared components
2. Use git commit messages with clear scope: `[SECURITY]`, `[A11Y]`, `[FRONTEND]`
3. Create small, focused commits for easier conflict resolution
4. Review other agents' coordination files before major changes

### Merge Strategy
1. Security fixes merge first (dependency and security critical)
2. Accessibility fixes merge second (semantic and ARIA changes)  
3. Frontend optimizations merge last (performance and structure)

## Conflict Resolution
- Use the coordination markdown files for async communication
- Prefix commit messages with agent type for easy identification
- Keep commits atomic and well-documented
- Test in isolation before requesting merges