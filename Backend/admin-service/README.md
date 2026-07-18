# Admin Service

## Endpoints
- GET /api/v1/admin/users
- GET /api/v1/admin/pending-users
- GET /api/v1/admin/user/:id
- PUT /api/v1/admin/approve/:id
- PUT /api/v1/admin/reject/:id
- DELETE /api/v1/admin/user/:id
- GET /api/v1/admin/listings
- GET /api/v1/admin/listings/:id
- DELETE /api/v1/admin/listings/:id
- PUT /api/v1/admin/listings/:id/sold
- PUT /api/v1/admin/listings/:id/remove
- GET /api/v1/admin/stats

## Auth
Use a bearer token for an admin user account. The service expects the token to be signed with the same JWT secret as the auth service.
