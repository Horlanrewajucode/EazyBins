// src/config/db.js
import mongoose from "mongoose";

class MongoDatabase {
  constructor() {
    this.connection = null;
    this.initialDelay = 2000; // start retry at 2s
    this.maxDelay = 30000; // cap retry delay at 30s
    this.currentDelay = this.initialDelay;
  }

  async connect() {
    if (this.connection) {
      console.log("ℹ️ MongoDB already connected");
      return this.connection;
    }

    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/myapp";

    // Event listeners
    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB connected");
      this.currentDelay = this.initialDelay; // reset delay after success
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected, retrying...");
      this._retryConnect();
    });

    mongoose.connection.on("reconnected", () => {
      console.log("🔄 MongoDB reconnected");
    });

    return this._tryConnect(mongoUri);
  }

  async close() {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      this.connection = null;
      console.log("✅ MongoDB connection closed");
    }
  }

  async _tryConnect(uri) {
    try {
      this.connection = await mongoose.connect(uri, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        autoIndex: true,
      });
      return this.connection;
    } catch (error) {
      console.error(`❌ Initial MongoDB connection failed: ${error.message}`);
      await this._retryConnect(uri);
    }
  }
  // i created function so that the server doesnt crash if ther are temporary network failures
  async _retryConnect(uri) {
    const delay = this.currentDelay;
    console.log(`⏳ Retrying MongoDB connection in ${delay / 1000}s...`);
    await new Promise((resolve) => setTimeout(resolve, delay));

    // Increase delay for next retry (exponential backoff)
    //  it keeps increasing the time before it retries to connect to the database
    this.currentDelay = Math.min(this.currentDelay * 2, this.maxDelay);

    return this._tryConnect(uri || process.env.MONGO_URI);
  }
}

export default new MongoDatabase();
