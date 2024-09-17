import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
      try {
            console.log('from db.ts connection string is: ' + process.env.MONGO_URI)
            await mongoose.connect(process.env.MONGO_URI || '', {
                  //useNewUrlParser: true,
                  //useUnifiedTopology: true,
            });
            console.log('MongoDB Connected');
      } catch (err:any) {
            console.error(err.message);
            process.exit(1);
      }
};

export default connectDB;
