# Professional Folder Structure

This project follows an enterprise-level folder structure that promotes scalability, maintainability, and team collaboration.

## 📁 Folder Structure

```
src/
├── core/                    # Core application functionality
│   ├── api.js              # API configuration and interceptors
│   ├── storage.js          # Storage service (AsyncStorage wrapper)
│   ├── navigation.js       # Navigation utilities
│   └── index.js           # Core exports
│
├── config/                 # Configuration files
│   ├── endpoints.js       # API endpoints configuration
│   ├── routes.js          # Navigation routes configuration
│   └── index.js           # Config exports
│
├── constants/              # Application constants
│   └── index.js           # App config, storage keys, validation rules
│
├── types/                  # Type definitions and enums
│   └── index.js           # User roles, status types, etc.
│
├── utils/                  # Utility functions
│   └── index.js           # Validation, formatting, helpers
│
├── shared/                 # Shared components and utilities
│   ├── components/        # Reusable UI components
│   ├── layout/            # Layout components
│   ├── context/           # Shared context providers
│   └── index.js           # Shared exports
│
├── features/               # Feature-based modules
│   ├── auth/              # Authentication feature
│   │   ├── components/    # Auth-specific components
│   │   ├── screens/       # Auth screens
│   │   ├── hooks/         # Auth hooks
│   │   ├── context/       # Auth context
│   │   └── index.js       # Auth exports
│   │
│   ├── home/              # Home feature
│   ├── institutions/      # Institutions feature
│   ├── profile/           # Profile feature
│   ├── chat/              # Chat feature
│   ├── events/            # Events feature
│   ├── notifications/     # Notifications feature
│   ├── application/       # Application feature
│   └── support/           # Support feature
│
├── navigation/             # Navigation configuration
│   ├── AppNavigator.js    # Main app navigator
│   ├── AuthNavigator.js   # Auth flow navigator
│   ├── MainNavigator.js   # Main app navigator
│   └── index.js           # Navigation exports
│
└── index.js               # Main application exports
```

## 🎯 Key Benefits

### 1. **Feature-Based Architecture**
- Each feature is self-contained with its own components, screens, hooks, and context
- Easy to locate and modify feature-specific code
- Better code organization and team collaboration

### 2. **Separation of Concerns**
- **Core**: Essential app functionality (API, storage, navigation)
- **Config**: Configuration files (endpoints, routes)
- **Shared**: Reusable components and utilities
- **Features**: Business logic organized by functionality

### 3. **Scalability**
- Easy to add new features without affecting existing code
- Clear boundaries between different parts of the application
- Consistent structure across all features

### 4. **Maintainability**
- Centralized configuration makes updates easier
- Clear import paths and dependencies
- Consistent naming conventions

### 5. **Team Collaboration**
- Multiple developers can work on different features simultaneously
- Clear ownership of code modules
- Reduced merge conflicts

## 📋 Import Examples

```javascript
// Feature imports
import { SignInScreen, useAuth } from '../features/auth';
import { InstitutionCard, useInstitutions } from '../features/institutions';

// Shared imports
import { CustomToast, LoadingSpinner } from '../shared';
import { Button, Input } from '../shared/components';

// Core imports
import { api, storage } from '../core';
import { navigate, NavigationHelpers } from '../core/navigation';

// Config imports
import { API_ENDPOINTS, ROUTES } from '../config';

// Utility imports
import { validateEmail, formatDate } from '../utils';
```

## 🔄 Migration Strategy

1. **Phase 1**: Create new structure (✅ Complete)
2. **Phase 2**: Move existing files to new locations
3. **Phase 3**: Update all import paths
4. **Phase 4**: Create index.js files for clean imports
5. **Phase 5**: Remove old folder structure

## 📝 Best Practices

1. **Always use index.js files** for clean imports
2. **Keep features self-contained** - don't import from other features
3. **Use shared folder** for truly reusable components
4. **Follow consistent naming** conventions
5. **Document feature APIs** in each feature's index.js

This structure follows industry best practices and will scale well as the application grows.
