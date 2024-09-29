```mermaid
sequenceDiagram
    Service Provider->>Admin: Submit new service listing
    Admin->>Service Provider: Review service details
    Admin-->>Service Provider: Approve or Reject Listing
    Service Provider-->>Customer: Service Listing goes live (if approved)
```
