# API documentation

## Authentication
1. /api/token/ - POST - Get token

Request body:
```json
{
    "username": "admin",
    "password": "admin"
}
```

Response body:
```json
{
    "access":"token",
    "refresh":"token"
}
```

Usage
- Add `Authorization: Bearer <access_token>` to headers for authentication
- Add `refresh_token=<refresh_token>` to headers for refreshing token


2. /api/token/refresh/ - POST - Refresh token

Request body:
```json
{
    "refresh":"token"
}
```

Response body:
```json
{
    "access":"token"
}
```

3. /api/visitor/ - GET - Get all visitors

Query parameters:
- `registration_id` - filter by registration id
- `name` - filter by name
- `phone` - filter by phone
- `email` - filter by email
- `username` - filter by username
- `joining_date` - filter by joining date

Response:
```json
{
    "status":"success",
    "message":"Visitor list",
    "data":[
        {
            "registration_id":"REG-1",
            "name":"Visitor 1",
            "phone":"1234567890",
            "email":"email",
            "username":"username",
            "joining_date":"2020-01-01"
            "is_checked_in":true
        },
    ]
}
```

4. /api/visitor/upload/ - POST - Upload visitor list

Request
- `data` - csv file

5. /api/visitor/checkin/ - POST - Check in visitor
- `registration_id` - registration id of visitor