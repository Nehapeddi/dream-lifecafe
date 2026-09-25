const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const menuItems = [
  { id: "espresso", category: "coffee", name: "Espresso", price: 120, description: "Rich, intense single-shot coffee with a smooth crema.", image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e32?auto=format&fit=crop&w=900&q=80" },
  { id: "americano", category: "coffee", name: "Americano", price: 140, description: "Espresso softened with hot water for a clean, bold cup.", image: "https://images.unsplash.com/photo-1551030173-122aabc4489c?auto=format&fit=crop&w=900&q=80" },
  { id: "cappuccino", category: "coffee", name: "Classic Cappuccino", price: 160, description: "Velvety espresso, steamed milk and airy foam.", image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=900&q=80" },
  { id: "latte", category: "coffee", name: "Café Latte", price: 160, description: "Smooth espresso and creamy steamed milk with delicate foam.", image: "https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?auto=format&fit=crop&w=900&q=80" },
  { id: "mocha", category: "coffee", name: "Hazelnut Mocha", price: 210, description: "Chocolate, espresso and toasted hazelnut finished with silky milk.", image: "https://images.unsplash.com/photo-1578374173705-5e1b5c5e7c0c?auto=format&fit=crop&w=900&q=80" },
  { id: "spanish", category: "coffee", name: "Iced Spanish Latte", price: 190, description: "Chilled espresso balanced with sweet condensed milk and ice.", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80" },

  { id: "hot-chocolate", category: "non-coffee", name: "Hot Chocolate", price: 150, description: "Creamy cocoa drink topped with a soft cloud of foam.", image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=900&q=80" },
  { id: "matcha", category: "non-coffee", name: "Matcha Latte", price: 220, description: "Earthy premium matcha whisked with creamy milk.", image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=80" },
  { id: "mango", category: "non-coffee", name: "Mango Smoothie", price: 210, description: "Fresh mango blended into a cool, creamy summer treat.", image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=900&q=80" },
  { id: "lemon-tea", category: "non-coffee", name: "Iced Lemon Mint Tea", price: 120, description: "Refreshing black tea, lemon, mint and ice.", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=80" },

  { id: "paneer-pesto", category: "food", name: "Paneer Pesto Sandwich", price: 240, description: "Grilled paneer, basil pesto, lettuce and tomato in toasted bread.", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80" },
  { id: "chicken-sandwich", category: "food", name: "Chicken Sandwich", price: 220, description: "Juicy chicken, crisp lettuce, tomato and house sauce.", image: "https://images.unsplash.com/photo-1550507992-eb63ffee0847?auto=format&fit=crop&w=900&q=80" },
  { id: "white-pasta", category: "food", name: "Creamy White Pasta", price: 280, description: "Penne tossed in a rich garlic-parmesan cream sauce.", image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=900&q=80" },
  { id: "red-pasta", category: "food", name: "Arrabbiata Pasta", price: 260, description: "Penne in a bright tomato-chilli sauce with herbs.", image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80" },
  { id: "veggie-pizza", category: "food", name: "Garden Veggie Pizza", price: 320, description: "Crisp crust with vegetables, mozzarella and Italian herbs.", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80" },
  { id: "fries", category: "food", name: "Truffle Herb Fries", price: 180, description: "Golden fries tossed with herbs and a subtle truffle finish.", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=80" },
  { id: "garlic-bread", category: "food", name: "Cheesy Garlic Bread", price: 160, description: "Toasted garlic bread covered with bubbling mozzarella.", image: "https://images.unsplash.com/photo-1573140401552-3fab0b24306f?auto=format&fit=crop&w=900&q=80" },

  { id: "brownie", category: "desserts", name: "Chocolate Brownie", price: 150, description: "Fudgy dark chocolate brownie with a soft, gooey centre.", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80" },
  { id: "cheesecake", category: "desserts", name: "Berry Cheesecake", price: 220, description: "Creamy cheesecake with berry compote and fresh berries.", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=80" },
  { id: "tiramisu", category: "desserts", name: "Classic Tiramisu", price: 230, description: "Coffee-soaked sponge, mascarpone cream and cocoa.", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=80" },
  { id: "choco-cake", category: "desserts", name: "Chocolate Fudge Cake", price: 190, description: "Moist chocolate cake layered with glossy fudge frosting.", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80" },
  { id: "red-velvet", category: "desserts", name: "Red Velvet Slice", price: 210, description: "Soft red velvet sponge with tangy cream-cheese frosting.", image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=900&q=80" },
  { id: "muffin", category: "desserts", name: "Chocolate Chip Muffin", price: 140, description: "Warm, fluffy muffin packed with melted chocolate chips.", image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=900&q=80" },
  { id: "icecream", category: "desserts", name: "Brownie with Ice Cream", price: 240, description: "Warm brownie paired with vanilla ice cream and chocolate drizzle.", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=80" },
  { id: "cookie", category: "desserts", name: "Loaded Choco Cookie", price: 130, description: "Crisp-edged, soft-centred cookie loaded with chocolate chunks.", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=80" }
];

const reservationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  guests: { type: Number, required: true, min: 1, max: 20 },
  specialRequests: { type: String, trim: true, default: "" },
  status: { type: String, default: "confirmed" },
  createdAt: { type: Date, default: Date.now }
});

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  orderType: { type: String, enum: ["dine-in", "takeaway"], default: "takeaway" },
  items: [{
    itemId: String,
    name: String,
    price: Number,
    quantity: Number
  }],
  total: { type: Number, required: true, min: 0 },
  notes: { type: String, default: "" },
  status: { type: String, default: "received" },
  createdAt: { type: Date, default: Date.now }
});

const Reservation = mongoose.model("Reservation", reservationSchema);
const Order = mongoose.model("Order", orderSchema);

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    mongodb: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    time: new Date().toISOString()
  });
});

app.get("/api/menu", (req, res) => {
  res.json(menuItems);
});

app.post("/api/reservations", async (req, res) => {
  try {
    const { name, phone, date, time, guests, specialRequests } = req.body;
    if (!name || !phone || !date || !time || !guests) {
      return res.status(400).json({ message: "Please fill all required reservation fields." });
    }

    const reservation = await Reservation.create({
      name,
      phone,
      date,
      time,
      guests: Number(guests),
      specialRequests
    });

    res.status(201).json({
      message: "Table reserved successfully!",
      reservationId: reservation._id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not save reservation. Please try again." });
  }
});

app.post("/api/orders", async (req, res) => {
  try {
    const { customerName, phone, orderType, items, total, notes } = req.body;

    if (!customerName || !phone || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Customer details and at least one item are required." });
    }

    const safeItems = items.map(item => ({
      itemId: item.itemId,
      name: item.name,
      price: Number(item.price),
      quantity: Number(item.quantity)
    }));

    const calculatedTotal = safeItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (Math.abs(calculatedTotal - Number(total)) > 0.01) {
      return res.status(400).json({ message: "Order total validation failed." });
    }

    const order = await Order.create({
      customerName,
      phone,
      orderType: orderType === "dine-in" ? "dine-in" : "takeaway",
      items: safeItems,
      total: calculatedTotal,
      notes
    });

    res.status(201).json({
      message: "Order received successfully!",
      orderId: order._id,
      total: calculatedTotal
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not place order. Please try again." });
  }
});

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing. Create a .env file using .env.example.");
    }

    await mongoose.connect("mongodb+srv://vu241fa04163_db_user:241fa04163@cluster0.wamyeum.mongodb.net/?appName=Cluster0");
    console.log("✓ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`✓ Dream Life Café running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("✗ Startup failed:", error.message);
    process.exit(1);
  }
}

startServer();
