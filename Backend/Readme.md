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
   The frontend sends a `POST` request to `/signup` with `firstName`, `lastName`, `email`, and `password`.

2. **Password Hashing**  
   The backend hashes the password using a Mongoose pre-save hook before saving the user.

3. **Send OTP for Verification**  
   An OTP is generated and emailed to the user for account verification.

4. **Profile Completion Deferred**  
   Fields like `username`, `phoneNumber`, `address`, and `role` are excluded during signup and can be added later via the dashboard. A `profileCompleted` flag is set to `false` by default.

---

## Login Process

1. **User Provides Credentials**  
   The frontend sends a `POST` request to `/login` with `identifier` (either email or username) and `password`.

2. **Validate Password**  
   The backend compares the password using bcrypt. If valid, it proceeds to OTP generation.

3. **Send OTP for 2FA**  
   A new OTP is sent to the user's email for second-factor authentication.

---

## OTP Verification

1. **User Submits OTP**  
   The frontend sends a `POST` request to `/verify-otp` with `email` and `OTP`.

2. **Validate OTP**  
   If the OTP is correct and not expired, the backend issues a JWT token.

---

## Token Usage

- The JWT token is used to access protected routes.
- It includes the user ID and expires after a set duration.
- Store the token securely on the frontend (e.g., in `localStorage` or React context).

---

## Forgot Password Process

1. **User Requests Password Reset**  
   The frontend sends a `POST` request to `/forgot-password` with the user's email.

2. **Generate Reset Token**  
   The backend checks if the user exists. If found, it generates a secure token using `crypto.randomBytes`, sets a 30-minute expiry, and saves it to the user's record.

3. **Send Reset Link via Email**  
   A reset link is emailed to the user:  https://eazybinsbackend.onrender.com/api/auth/reset-password/:token
   the link expires in 30 minutes

---
## Reset Password Process

1. **User Clicks Reset Link**  
The link opens a frontend page where the user can enter a new password.

2. **Submit New Password**  
The frontend sends a `POST` request to `/reset-password/:token` with the new password.

3. **Token Validation & Password Update**  
The backend verifies the token and expiry. If valid, it updates the user's password and clears the reset token and expiry fields.

---

## Axios Example and Usage

In your React frontend, you'll use Axios to send HTTP requests to the backend API. These functions can be placed in a separate `api.js` file or directly inside your authentication service.

```js
import axios from 'axios';

const API_BASE = 'https://eazybinsbackend.onrender.com'; // Backend URL

// Sends user registration data to the backend
export const signup = (formData) => {
return axios.post(`${API_BASE}/api/auth/signup`, formData);
};

// Sends login credentials (email or username + password) to the backend
export const login = (credentials) => {
return axios.post(`${API_BASE}/api/auth/login`, credentials);
};

// Sends the OTP received by the user to verify their identity
export const verifyOtp = (otpData) => {
return axios.post(`${API_BASE}/api/auth/verify-otp`, otpData);
};

// Request password reset link
export const forgotPassword = (email) => {
return axios.post(`${API_BASE}/api/auth/forgot-password`, { email });
};

// Submit new password using reset token
export const resetPassword = (token, newPassword) => {
return axios.post(`${API_BASE}/api/auth/reset-password/${token}`, { newPassword });
};