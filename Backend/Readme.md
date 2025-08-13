# How `server.js` and `db.js` Work

## Startup Process

1. **Attempt to Connect to MongoDB**  
   The application tries to establish a connection to the MongoDB database.

2. **Retry on Failure**

   - If the initial connection fails, it waits **2 seconds** before retrying.
   - The retry delay follows **exponential backoff**: `2s → 4s → 8s → 16s → max 30s`.

3. **Reset Delay on Success**  
   Once a connection is successfully established, the retry delay resets to **2 seconds** for future disconnections.

## While Running

- If the database connection drops at any point, the system **automatically retries in the background** until a connection is restored.

## Shutdown Process

1. **Stop Accepting Requests**  
   The HTTP server is closed, preventing new incoming requests.

2. **Close Database Connection**  
   Any open MongoDB connections are shut down cleanly.

3. **Exit Gracefully**  
   The process ends only after all cleanup tasks are completed.

# How Authentication Works

## Signup Process

1. **User Submits Details**  
   Full name, username, email, phone number, password, and address are collected.

2. **Password Hashing**  
   Password is hashed using a Mongoose pre-save hook before saving to the database.

3. **Send OTP for Verification**  
   An OTP is generated and emailed to the user for account verification.

## Login Process

1. **User Provides Credentials**  
   Email and password are submitted via the login endpoint.

2. **Validate Password**  
   Password is compared using bcrypt. If valid, proceed to OTP step.

3. **Send OTP for 2FA**  
   A new OTP is generated and sent to the user's email for second-factor authentication.

## OTP Verification

1. **User Submits OTP**  
   OTP is sent to the verification endpoint.

2. **Validate OTP**  
   If the OTP is correct and not expired, a JWT token is issued for authenticated access.

## Token Usage

- JWT token is used to access protected routes.
- Token includes user ID and expires after a set duration.

