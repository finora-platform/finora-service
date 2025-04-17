# Product Context: Finora Service

## Why This Project Exists
Research analysts require a secure, scalable, and efficient backend to manage their workflows, data, and user permissions. The Finora Service is designed to centralize and streamline these operations, enabling analysts to focus on research and client engagement rather than technical overhead.

## Problems It Solves
- **Access Control:** Ensures only authorized users can access sensitive data and features, leveraging Supabase for robust RBAC.
- **Contact Management:** Simplifies the process of uploading, storing, and managing diverse contact lists, reducing manual effort and errors.
- **Sales & Advisory Management:** Provides dedicated modules for managing sales pipelines and advisory services, supporting business growth and compliance.
- **Separation of Concerns:** Adopts hexagonal architecture to isolate business logic from infrastructure, improving maintainability and testability.

## How It Should Work
- Users authenticate and are assigned roles via Supabase.
- Admins and authorized users can upload and manage contact lists.
- Sales and advisory teams interact with dedicated modules to track leads, opportunities, and advisory engagements.
- All operations are governed by strict access controls and auditability.

## User Experience Goals
- **Reliability:** Backend services must be robust and available, minimizing downtime for analysts.
- **Security:** Sensitive data is protected through strong access controls and secure integrations.
- **Simplicity:** APIs and backend processes are designed for ease of use and integration with frontend clients.
- **Scalability:** The system can grow with the organization, supporting more users, data, and modules as needed.

This context guides all design and implementation decisions for the Finora Service backend.
