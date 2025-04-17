# System Patterns: Finora Service

## System Architecture
- **Hexagonal Architecture (Ports and Adapters):**
  - Core business logic is isolated from external systems (databases, APIs, authentication) via well-defined interfaces.
  - Adapters implement these interfaces to connect the core to infrastructure (e.g., Supabase, file storage).

## Key Technical Decisions
- **RBAC via Supabase:** All authentication and role-based access control are delegated to Supabase, ensuring security and scalability.
- **Domain-Driven Modules:** Features are organized into domains (e.g., sales, advisory, contact management) for clear separation of concerns.
- **API-First Design:** All functionality is exposed via RESTful APIs, enabling easy integration with frontend clients.

## Design Patterns in Use
- **Repository Pattern:** Each domain uses repositories to abstract data access and persistence.
- **Service Layer:** Business logic is encapsulated in service classes, keeping controllers thin and focused on request/response handling.
- **Middleware:** Cross-cutting concerns (validation, authentication, rate limiting) are handled via Express middlewares.

## Component Relationships
- **Domain Entities:** Represent core business objects (e.g., Lead, Contact, Advisory).
- **Repositories:** Interface between domain entities and data sources.
- **Services:** Orchestrate business logic using repositories and domain entities.
- **Controllers/Routes:** Handle HTTP requests, invoke services, and return responses.
- **Middlewares:** Enforce validation, security, and other cross-cutting concerns.

## Critical Implementation Paths
- **Authentication & RBAC:** All requests pass through authentication and RBAC checks before accessing domain logic.
- **Contact Upload:** File upload endpoints validate, parse, and persist contact lists, ensuring data integrity.
- **Sales/Advisory Management:** CRUD operations and business workflows are managed through dedicated service and repository layers.

This document captures the essential system patterns and architectural decisions guiding the Finora Service backend.
