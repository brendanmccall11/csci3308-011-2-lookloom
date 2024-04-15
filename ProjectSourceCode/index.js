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
  res.redirect("/login");
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

app.get("/gallery", async (req, res) => {
  try {
    // Fetch all items from the database
    //const items = await db.query("SELECT * FROM items");

    // Render the gallery page and pass items to the template
    //res.render('pages/gallery', { items });
    res.render('pages/gallery');
  } catch (error) {
    // Handle errors
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/gallery/search", async (req, res) => {
  try {
    const query = req.query.q;

    const keywordOptions = {
      method: 'GET',
      url: 'https://axesso-axesso-amazon-data-service-v1.p.rapidapi.com/amz/amazon-search-by-keyword-asin',
      params: {
        domainCode: 'com',
        keyword: query,
        page: '1',
        excludeSponsored: 'false',
        sortBy: 'relevanceblender',
        withCache: 'true'
      },
      headers: {
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host': 'axesso-axesso-amazon-data-service-v1.p.rapidapi.com'
      }
    };
    
    try {
      const keywordResponse = await axios.request(keywordOptions);
      productAsin = keywordResponse.data.foundProducts[0];

      const lookupOptions = {
        method: 'GET',
        url: 'https://axesso-axesso-amazon-data-service-v1.p.rapidapi.com/amz/amazon-lookup-product',
        params: {
          url: 'https://www.amazon.com/dp/' + productAsin + '/'
        },
        headers: {
          'X-RapidAPI-Key': process.env.API_KEY,
          'X-RapidAPI-Host': 'axesso-axesso-amazon-data-service-v1.p.rapidapi.com'
        }
      };
      
      try {
        const lookupResponse = await axios.request(lookupOptions);
        console.log(lookupResponse.data);
      } catch (error) {
        console.error(error);
      }

      console.log(keywordResponse.data);
    } catch (error) {
      console.error(error);
    }

    res.render('pages/gallery');
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/closet", async (req, res) => {
  try {
    // Fetch all items from the database
    const items = await db.query("SELECT * FROM items");
    const outfits = await db.query("SELECT * FROM outfits");

    // Render the closet page and pass items to the template
    res.render("pages/closet", { items, outfits });
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

app.post("/closet/addYourOwn", (req, res) => {
  const item_name = req.body.item_name;
  const price = req.body.price;
  const description = req.body.description;
  const website_link = req.body.website_link;
  const image_url = req.body.image_url;
  const brand = req.body.brand;
  const category = req.body.categories;
  console.log(category);

  var query = "INSERT INTO items (name, price, image_url, link, description, brand) VALUES ($1, $2, $3, $4, $5, $6);";
  var query1 = "INSERT INTO items_to_categories (item_id, category_id) VALUES ((SELECT item_id FROM items WHERE name = $1), (SELECT category_id FROM categories WHERE category_name = $2))"

  db.task('post-everything', task => {
    return task.batch([task.any(query, [item_name, price, image_url, website_link, description, brand]), 
      task.any(query1, [item_name, category])]);
  })
    .then(function (data) {
      res.redirect("/closet")
    })
    .catch(async error => {

      try {
        // Fetch all items from the database
        const items = await db.query("SELECT * FROM items");
    
        // Render the closet page and pass items to the template
        res.render("pages/closet", { 
          items,
          message: "Failed to add. Please try again.",
          error: true
         });

      } catch (error) {
        // Handle errors
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
      }
    });
});

app.post("/addToOutfit", async (req, res) => {

  const existing_outfit_id = Number(req.body.existingOutfit); 
  const new_outfit_name = req.body.newOutfitName;
  const new_outfit_description = req.body.newOutfitDescription;
  const current_item_id = Number(req.body.itemId);

  console.log(current_item_id);

  // CASE: user wants to create a new outfit
  if (existing_outfit_id == "" && new_outfit_name != null && new_outfit_name != undefined)
  {
    var query = `INSERT INTO outfits (outfit_name) VALUES ($1);`;
    db.any(query, [new_outfit_name, new_outfit_description])
      .then((data) => {
        console.log("successful insert into outfits table!!");
      })
      .catch((err) => {
        console.log("unsuccessful insert into outfits table");
      });


    // if user entered a description
    if (new_outfit_description != null && new_outfit_description != undefined)
    {
      var query1 = `UPDATE outfits SET description = $1 WHERE outfit_name = $2;`;
      db.any(query1, [new_outfit_description, new_outfit_name])
        .then((data) => {
          console.log("successful outfit description update!!");
        })
        .catch((err) => {
          console.log("unsuccessful outfit description update");
        });
    }

    const new_outfit_id = await db.query(
      `SELECT outfit_id FROM outfits WHERE outfit_name = '${new_outfit_name}';`
    );

    // Access the outfit_id directly from the object
    const outfitId = new_outfit_id[0].outfit_id;

    console.log(outfitId);

    var query2 = `INSERT INTO items_to_outfits (item_id, outfit_id) VALUES ($1, $2);`;
    db.any(query2, [current_item_id, outfitId])
      .then((data) => {
        res.redirect('/closet');
        console.log("successful add to items_to_outfits");
      })
      .catch((err) => {
        res.redirect('/closet');
        console.log("unsuccessful add to items_to_outfits");
      });
  }

  // NEED TO UPDATE CASES LATER, THERE ARE MANY EDGE CASES
  // else if (existing_outfit_id != null && existing_outfit_id != undefined && (new_outfit_name == null || new_outfit_name == undefined) && (new_outfit_description == null || new_outfit_description == undefined))
  else
  {
    var query3 = `INSERT INTO items_to_outfits (item_id, outfit_id) VALUES ($1, $2);`;
    db.any(query3, [current_item_id, existing_outfit_id])
      .then((data) => {
        res.redirect('/closet');
        console.log("successful add to items_to_outfits (existing outfit)");
      })
      .catch((err) => {
        res.redirect('/closet');
        console.log("unsuccessful add to items_to_outfits (existing outfit)");
      });

      // const testingtesting = await db.query(
      //   `SELECT name FROM items WHERE item_id = (SELECT item_id FROM items_to_outfits WHERE outfit_id= '${existing_outfit_id}');`
      // );

      // console.log(testingtesting);
  }
});

app.get("/outfits", async (req, res) => {
  try {
    // Fetch all items from the database
    const outfits = await db.query("SELECT * FROM outfits");

    // Render the closet page and pass items to the template
    res.render("pages/outfits", { outfits });
  } catch (error) {
    // Handle errors
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/outfit", (req, res) => {
  res.render("pages/outfit");
});

// Route to render the account details page
app.get("/accountDetails", (req, res) => {
  // Pass user information to the template
  res.render("pages/accountDetails", { user: req.session.user });
});

// Route to handle updating account details
app.post("/updateAccount", async (req, res) => {
  const { username, password, firstName, lastName, closetPreference } = req.body;

  // Update user information in the database
  try {
    // Update username, first name, last name, and closet preference
    await db.none(
      "UPDATE users SET username = $1, first_name = $2, last_name = $3, closet_preference = $4 WHERE username = $5",
      [username, firstName, lastName, closetPreference, req.session.user.username]
    );

    // If password is being updated, hash the new password and update it
    if (password) {
      const hash = await bcrypt.hash(password, 10);
      await db.none(
        "UPDATE users SET password = $1 WHERE username = $2",
        [hash, req.session.user.username]
      );
    }

    // Update session with new user information
    req.session.user = {
      ...req.session.user,
      username,
      firstName,
      lastName,
      closetPreference
    };

    res.redirect("/accountDetails");
  } catch (error) {
    console.error("Error updating account:", error);
    res.status(500).send("Error updating account");
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.render('pages/logout',{
    message: "Logged out successfully! To access your closet and outfits, please log back in."
  });
});

// *****************************************************
// <!-- Section 5 : Start Server-->
// *****************************************************
// starting the server and keeping the connection open to listen for more requests
module.exports = app.listen(3000); // CHANGED THIS FOR LAB 11
console.log("Server is listening on port 3000");
