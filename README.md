# Dream Life Café — Full Stack Website

## Features
- Café landing page inspired by the supplied references
- Responsive design for desktop/mobile
- Menu opens from the MENU navigation and VIEW MENU buttons
- Coffee, non-coffee, food and dessert categories
- Item descriptions and ₹ prices
- Add to Order cart with quantity controls
- Order checkout saved to MongoDB
- Table reservation form: name, phone, date, time, guests, special requests
- Reservations saved to MongoDB
- Health endpoint to check MongoDB connection

## Requirements
Install:
1. Node.js LTS
2. MongoDB Atlas account

## Setup
1. Open this folder in VS Code.
2. Open Terminal > New Terminal.
3. Run:
   npm install
4. Copy `.env.example` to `.env`.
5. Put your MongoDB Atlas connection string into `.env`.
6. Start:
   npm start
7. Open:
   https://splendid-genie-b290f0.netlify.app/

For development with automatic server restart:
   npm run dev

## MongoDB Atlas
Create a free cluster, database user and password.
In Network Access, add your current IP address.
For a temporary student/local test, `0.0.0.0/0` allows access from anywhere, but it is less secure. Prefer your own IP for normal use.
Click Connect > Drivers > Node.js and copy the URI.
Replace YOUR_USERNAME and YOUR_PASSWORD in `.env`.

Example:
MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/dreamlife_cafe?retryWrites=true&w=majority

If your password contains special characters such as @, :, / or #, URL-encode them.

## API
GET  /api/health
GET  /api/menu
POST /api/reservations
POST /api/orders

## Project
public/index.html  -> page structure
public/style.css   -> design and responsive layout
public/script.js   -> menu, cart, forms and API calls
server.js          -> Express server, API and MongoDB/Mongoose models
package.json       -> dependencies and scripts
.env               -> private MongoDB URI (create locally; do not upload/share it)

## Important
The website uses remote Unsplash image URLs for food/café photography. You can replace these URLs in `server.js` and `style.css` with your own images later.
