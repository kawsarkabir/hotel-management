const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(express.json());

// MongoDB Connection URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5ceog.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with options
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Database connection
async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    const db = client.db("hostel-management");
    const usersCollection = db.collection("users");
    const mealsCollection = db.collection("meals");
    const reviewCollection = db.collection("reviews");
    const membershipCollection = db.collection("memberships");
    const paymentCollection = db.collection("payments");
    // jwt related api
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "5d",
      });
      res.send({ token });
    });

    // middlewares
    const verifyToken = (req, res, next) => {
      if (!req.headers.authorization) {
        return res.status(401).send({ message: "Forbidden access" });
      }
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(403).send({ message: "Forbidden access" });
        }
        req.decoded = decoded;

        next();
      });
    };
    // user verify admin
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      const isAdmin = user?.role === "admin";
      if (!isAdmin) {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    };

    //   users related api
    app.post("/user", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await usersCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: "user already exists", insertedId: null });
      }
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    // GET API: Check if a user is an admin
    app.get("/users/admin/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      if (email !== req.decoded.email) {
        return res.status(403).send({ message: "unauthorized access" });
      }
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      let = admin = false;
      if (user) {
        admin = user?.role === "admin";
      }
      res.send({ admin });
    });

    // PATCH API: Promote a user to an admin role
    app.patch(
      "/users/admin/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: {
            role: "admin",
          },
        };
        const result = await usersCollection.updateOne(filter, updateDoc);
        res.send(result);
      }
    );

    // DELETE API to remove a specific user by ID
    app.delete("/users/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    });

    // meals related apis
    app.post("/meal", async (req, res) => {
      const meal = req.body;
      const result = await mealsCollection.insertOne(meal);
      res.send(result);
    });
    // all meals get api

    app.get("/meals", async (req, res) => {
      const { sortBy, search, minPrice, maxPrice } = req.query;
      const filter = req.query.filter;
      const query = {};
      if (filter) query.category = filter;
      if (search) {
        query.title = { $regex: search, $options: "i" };
      }
      if (search) {
        query.title = { $regex: search, $options: "i" };
      }
      console.log(minPrice, maxPrice);
      if (
        minPrice !== undefined &&
        maxPrice !== undefined &&
        minPrice > 0 &&
        maxPrice > 1
      ) {
        console.log("hi");

        const result = await mealsCollection
          .find({
            price: { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) },
          })
          .toArray();

        return res.send(result);
      }

      let sortOptions = {};
      if (sortBy === "like") {
        sortOptions = { like: -1 };
      } else if (sortBy === "review") {
        sortOptions = { review: -1 };
      } else {
        sortOptions = { title: 1 };
      }
      const result = await mealsCollection
        .find(query)
        .sort(sortOptions)
        .toArray();
      res.send(result);
    });

    // get api to specific meal id
    app.get("/meals/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await mealsCollection.findOne(query);
      res.send(result);
    });
    //  patch api api to specific id
    app.patch("/meals/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const meal = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          name: meal.name,
          email: meal.email,
          category: meal.category,
          price: meal.price,
          ingredients: meal.ingredients,
          title: meal.title,
          deadline: meal.deadline,
          description: meal.description,
          photoUrl: meal.photoUrl,
        },
      };
      const result = await mealsCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // DELETE API to remove a specific user by ID
    app.delete("/meals/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await mealsCollection.deleteOne(query);
      res.send(result);
    });

    // review api
    app.get("/reviews/:id", async (req, res) => {
      const id = req.params.id;
      const query = { meal_id: id };
      const result = await reviewCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/reviews", async (req, res) => {
      const result = await reviewCollection.find().toArray();
      res.send(result);
    });

    // Route for fetching reviews by email (must be below the above route)
    // app.get("/reviews", verifyToken,  async (req, res) => {
    //   try {
    //     const email = req.query.email; // Get email from query
    //     if (!email) {
    //       return res.status(400).send({ error: "Email is required" });
    //     }

    //     const query = { "user.email": email }; // Filter by user email
    //     const reviews = await reviewCollection.find(query).toArray(); // Query the database
    //     res.send(reviews);
    //   } catch (error) {
    //     console.error("Error fetching reviews:", error);
    //     res.status(500).send({ error: "Failed to fetch reviews" });
    //   }
    // });

    app.post("/review", async (req, res) => {
      const review = req.body;
      const result = await reviewCollection.insertOne(review);
      res.send(result);
    });

    app.delete("/reviews/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await reviewCollection.deleteOne(query);
      res.send(result);
    });

    // membership collection api
    app.get("/memberships", async (req, res) => {
      const result = await membershipCollection.find().toArray();
      res.send(result);
    });
    app.get("/memberships/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await membershipCollection.findOne(query);
      res.send(result);
    });
    app.post("/membership", async (req, res) => {
      const membership = req.body;
      const result = await membershipCollection.insertOne(membership);
      res.send(result);
    });

    app.patch(
      "/memberships/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        const card = req.body;
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: {
            category: card.category,
            price: card.price,
          },
        };
        const result = await membershipCollection.updateOne(filter, updateDoc);
        res.send(result);
      }
    );

    // payment intent
    app.post("/create-payment-intent", async (req, res) => {
      const { price, email, displayName } = req.body;

      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: price * 100,
          currency: "usd",
          metadata: {
            email,
            displayName,
          },
        });

        res.send({
          clientSecret: paymentIntent.client_secret,
        });
      } catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(400).send({ error: error.message });
      }
    });

    app.get("/payments/:email", verifyToken, async (req, res) => {
      const query = { email: req.params.email };
      if (req.params.email !== req.decoded.email) {
        return res.status(403).send({ message: "forbidden access" });
      }
      const result = await paymentCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/payments", async (req, res) => {
      const payment = req.body;
      const paymentResult = await paymentCollection.insertOne(payment);
      res.send(paymentResult);
    });

    // Root route
    app.get("/", (req, res) => {
      res.send("Service is running");
    });

    // Server listen
    app.listen(port, () => {
      console.log(`Service is running on PORT: ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Run the database and server setup
run().catch(console.dir);
