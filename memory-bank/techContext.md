# Technical Context: Finora Service

## Technologies Used
- **Language:** TypeScript (Node.js runtime)
- **Framework:** Express.js for HTTP API routing and middleware
- **Database & Auth:** Supabase (PostgreSQL + RBAC + Auth)
- **Architecture:** Hexagonal (Ports and Adapters)
- **Other:** ESLint, Prettier for code quality and formatting

## Development Setup
- **Project Structure:** Modular, with separate folders for domains (sales, advisory, contact management), services, repositories, and infrastructure.
- **Configuration:** Environment-specific configs in the `config/` directory.
- **Scripts:** Managed via npm (see `package.json` for available scripts).
- **Linting/Formatting:** Enforced via `.eslintrc.json` and `.prettiercc`.

## Technical Constraints
- **Backend Only:** No frontend/UI code in this repository.
- **Supabase Integration:** All authentication and RBAC must use Supabase APIs.
- **Strict Separation:** Business logic must not depend directly on infrastructure or external services.

## Dependencies
- **Express:** For API server and middleware.
- **Supabase JS Client:** For database and authentication integration.
- **TypeORM/Prisma (TBD):** For ORM if needed (not confirmed in current structure).
- **Validation Libraries:** For request validation (e.g., Joi, Zod, or custom).

## Tool Usage Patterns
- **Repositories:** Abstract all data access, supporting easy swapping of data sources.
- **Services:** Encapsulate business logic, called by controllers/routes.
- **Middlewares:** Handle cross-cutting concerns (validation, auth, rate limiting).
- **Schema Files:** Define data validation and API contracts.

This technical context ensures consistent development practices and guides future onboarding and maintenance.
