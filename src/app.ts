
import express from 'express';
import connectDB from './config/db';
import ticketRoutes from './routes/ticket';
import dotenv from 'dotenv';
const cors = require('cors');


declare global {
      namespace Express {
            interface Request {
                  user?: any
            }
      }
}

dotenv.config();
try {

      const app = express();
      const PORT = process.env.PORT || 5000;

      connectDB();

      app.use(express.json());




      app.use(function (req, res, next) {
            console.log("origin:")
            console.log(req.headers.origin)
            const origin = req.headers.origin;

            if (req.headers.origin == 'https://melarix.com') {
                  app.use(cors({
                        origin: 'https://melarix.com'
                  }));
            }
            if (req.headers.origin == 'http://127.0.0.1:8080') {
                  app.use(cors({
                        origin: 'http://127.0.0.1:8080'
                  }));
            }

            res.header("Access-Control-Allow-Origin", origin);
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();

      });

      // just for localdev test
      app.use(cors({ origin: ["http://localhost:3000", "http://127.0.0.1:8080"] }));






      app.use('', ticketRoutes);

      app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
      });

} catch (error) {
      console.log('app.ts error')
      console.log(error)

}