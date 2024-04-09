// *****************************************************
// <!-- Section 1 : Import Dependencies -->
// *****************************************************

const express = require("express"); // To build an application server or API
const app = express();
const handlebars = require("express-handlebars");
const Handlebars = require("handlebars");
const path = require("path");
const pgp = require("pg-promise")(); // To connect to the Postgres DB from the node server
const bodyParser = require("body-parser");
const session = require("express-session"); // To set the session object. To store or access session data, use the `req.session`, which is (generally) serialized as JSON by the store.
const bcrypt = require("bcrypt"); //  To hash passwords
const axios = require("axios"); // To make HTTP requests from our server. We'll learn more about it in Part B.

// *****************************************************
// <!-- Section 2 : Connect to DB -->
// *****************************************************

// create `ExpressHandlebars` instance and configure the layouts and partials dir.
const hbs = handlebars.create({
  extname: "hbs",
  layoutsDir: __dirname + "/views/layouts",
  partialsDir: __dirname + "/views/partials",
});

// database configuration
const dbConfig = {
  host: "db", // the database server
  port: 5432, // the database port
  database: process.env.POSTGRES_DB, // the database name
  user: process.env.POSTGRES_USER, // the user account to connect with
  password: process.env.POSTGRES_PASSWORD, // the password of the user account
};

const db = pgp(dbConfig);

// test your database
db.connect()
  .then((obj) => {
    console.log("Database connection successful"); // you can view this message in the docker compose logs
    obj.done(); // success, release the connection;
  })
  .catch((error) => {
    console.log("ERROR:", error.message || error);
  });

// *****************************************************
// <!-- Section 3 : App Settings -->
// *****************************************************

// Register `hbs` as our view engine using its bound `engine()` function.
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json()); // specify the usage of JSON for parsing request body.
app.use(express.static("public"));

// initialize session variables
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// *****************************************************
// <!-- Section 4 : API Routes -->
// *****************************************************

const user = {
  username: undefined,
  password: undefined,
  firstName: undefined,
  lastName: undefined,
};

// THIS ENDPOINT IS FOR LAB 11
app.get("/welcome", (req, res) => {
  res.json({ status: "success", message: "Welcome!" });
});

app.get("/", (req, res) => {
  res.redirect(302, "/login");
});

app.get("/gallery", (req, res) => {
  res.render("pages/gallery");
});

app.get("/closet", async (req, res) => {
  try {
    // Fetch all items from the database
    const items = await db.query("SELECT * FROM items");

    // Render the closet page and pass items to the template
    res.render("pages/closet", { items });
  } catch (error) {
    // Handle errors
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route for showing tops
app.get("/closet/tops", async (req, res) => {
  try {
    // Fetch items belonging to the "Tops" category
    const items = await db.query(
      "SELECT * FROM items WHERE item_id IN (SELECT item_id FROM items_to_categories WHERE category_id = (SELECT category_id FROM categories WHERE category_name = 'Tops'))"
    );

    // Render the page for tops and pass the items
    res.render("pages/closet", { items });
  } catch (error) {
    // Handle errors
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route for showing bottoms
app.get("/closet/bottoms", async (req, res) => {
  try {
    // Fetch items belonging to the "Bottoms" category
    const items = await db.query(
      "SELECT * FROM items WHERE item_id IN (SELECT item_id FROM items_to_categories WHERE category_id = (SELECT category_id FROM categories WHERE category_name = 'Bottoms'))"
    );

    // Render the page for bottoms and pass the items
    res.render("pages/closet", { items });
  } catch (error) {
    // Handle errors
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route for showing Dresses
app.get("/closet/dresses", async (req, res) => {
  try {
    // Fetch items belonging to the "Bottoms" category
    const items = await db.query(
      "SELECT * FROM items WHERE item_id IN (SELECT item_id FROM items_to_categories WHERE category_id = (SELECT category_id FROM categories WHERE category_name = 'Dresses'))"
    );

    // Render the page for Dresses and pass the items
    res.render("pages/closet", { items });
  } catch (error) {
    // Handle errors
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route for showing bottoms
app.get("/closet/shoes", async (req, res) => {
  try {
    // Fetch items belonging to the "Bottoms" category
    const items = await db.query(
      "SELECT * FROM items WHERE item_id IN (SELECT item_id FROM items_to_categories WHERE category_id = (SELECT category_id FROM categories WHERE category_name = 'Shoes'))"
    );

    // Render the page for bottoms and pass the items
    res.render("pages/closet", { items });
  } catch (error) {
    // Handle errors
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route for showing bottoms
app.get("/closet/Accessories", async (req, res) => {
  try {
    // Fetch items belonging to the "Bottoms" category
    const items = await db.query(
      "SELECT * FROM items WHERE item_id IN (SELECT item_id FROM items_to_categories WHERE category_id = (SELECT category_id FROM categories WHERE category_name = 'Accessories'))"
    );

    // Render the page for bottoms and pass the items
    res.render("pages/closet", { items });
  } catch (error) {
    // Handle errors
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/outfits", (req, res) => {
  res.render("pages/outfit");
});

app.get("/accountDetails", (req, res) => {
  res.render("pages/accountDetails");
});

app.get("/login", (req, res) => {
  res.render("pages/login");
});

app.get("/register", (req, res) => {
  res.render("pages/register");
});

app.post("/register", async (req, res) => {
  //hash the password using bcrypt library
  const hash = await bcrypt.hash(req.body.password, 10);

  // Insert username and hashed password into the 'users' table
  const user = req.body.username;
  const first_name = req.body.firstName;
  const last_name = req.body.lastName;
  var query = `INSERT INTO users (username, password, first_name, last_name) VALUES ($1, $2, $3, $4);`;
  db.any(query, [user, hash, first_name, last_name])
    .then((data) => {
      res.status(200).render("pages/login", {
        message: "Successfully registered!",
      });
    })
    .catch((err) => {
      res.status(400).render("pages/register", {
        message: "Failed to register. Please try again.",
        error: true,
      });
    });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  console.log(username);
  var query = "SELECT * FROM users WHERE username = $1;";
  console.log(query);

  db.any(query, [username])
    .then(async (data) => {
      console.log(data);
      user.username = username;
      user.password = data[0].password;
      user.first_name = data[0].first_name;
      user.last_name = data[0].last_name;
      // check if password from request matches with password in DB
      const match = await bcrypt.compare(req.body.password, user.password);

      if (match) {
        //save user details in session like in lab 7
        req.session.user = user;
        req.session.save();
        res.redirect("/gallery");
      } else {
        res.status(400).render("pages/login", {
          message: "Incorrect username or password.",
          error: true,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).render("pages/register", {
        message: "Account not found. Please register.",
        error: true,
      });
    });
});

const auth = (req, res, next) => {
  if (!req.session.user) {
    // Default to login page.
    return res.redirect("/login");
  }
  next();
};

app.use(auth);

app.get("/logout", (req, res) => {
  res.render("pages/logout");
});
// *****************************************************
// <!-- Section 5 : Start Server-->
// *****************************************************
// starting the server and keeping the connection open to listen for more requests
module.exports = app.listen(3000); // CHANGED THIS FOR LAB 11
console.log("Server is listening on port 3000");
