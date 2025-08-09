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
