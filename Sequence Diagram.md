```mermaid
sequenceDiagram
    Customer->>Service Provider: Search for Services
    Service Provider-->>Customer: Display service listing (with availability, pricing)
    Customer->>Service Provider: Book Service
    Service Provider-->>Customer: Confirm booking
    Customer->>UPI System: Make Payment
    UPI System-->>Customer: Payment Confirmation
    Customer->>Service Provider: Payment Successful
    Service Provider-->>Customer: Service Completed
    Customer->>Service Provider: Leave Review & Rating
```
