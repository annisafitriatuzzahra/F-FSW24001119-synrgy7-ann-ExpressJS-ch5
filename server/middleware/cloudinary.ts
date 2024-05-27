import { v2 as cloudinary } from 'cloudinary';

const {CLOUD_NAME, API_KEY, API_SECRET} = process.env

cloudinary.config({ 
  cloud_name: 'dg0ny6pr4', 
  api_key: '155138419526253', 
  api_secret: 'h1rJ5PDzOSSgh1j_60jrRxA1Liw' 
});

export default cloudinary;