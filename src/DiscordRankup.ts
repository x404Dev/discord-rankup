import mongoose from 'mongoose';
import EventEmitter from 'events';

class DiscordRankup extends EventEmitter {
  private mongoURL: string;

  constructor() {
    super();
  }

  /**
   * @param url The URL to the MongoDB database
   * @returns mongoose connection
   */
  public async connect(url: string, options?: mongoose.ConnectOptions) {
    // Connect to the database
    this.mongoURL = url;
    return await mongoose.connect(url, options);
  }
}
