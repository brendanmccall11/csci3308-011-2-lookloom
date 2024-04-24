// *****************************************************
// Gallery Modal
// *****************************************************
var closetModal = document.getElementById("Modal");
var addToClosetButtons = document.querySelectorAll('.btn.btn-success');
var closeButton = document.getElementsByClassName('close-button');
const cButtonArr = Array.from(closeButton);

addToClosetButtons.forEach(function(button) {
    button.onclick = function() {
        closetModal.style.display = "block";
    }
});

// When the user clicks on <span> (x), close the modal
cButtonArr.forEach(function(but) {
    but.onclick = function() {
        closetModal.style.display = "none";
    }
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == closetModal) {
        closetModal.style.display = "none";
    }
};

document.addEventListener("DOMContentLoaded", function () {
  var addToClosetButtons = document.querySelectorAll(".addToCloset");
  addToClosetButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        var itemData = {
            name: button.getAttribute("data-name"),
            price: parseInt(button.getAttribute("data-price"), 10),
            image: button.getAttribute("data-image"),
            description: button.getAttribute("data-description"),
            brand: button.getAttribute("data-brand"),
            categoryid: parseInt(button.getAttribute("data-categoryid"), 10) // Updated attribute name
        };
        console.log("Item data being sent to server:", itemData);
        addToCloset(itemData);
    });
  });
});

function addToCloset(itemData) {
  fetch("/addtocloset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itemData),
  })
  .then((response) => response.json())
  .then((data) => {
    if (data.message) {
      alert(data.message); // Display the alert message from server
    }
    if (data.redirect) {
      // Delay the redirection for a short period to allow the user to read the alert message
      setTimeout(() => {
        window.location.href = data.redirect;
      }, 2000); // Delay of 2000 milliseconds (2 seconds)
    }
  })
  .catch((error) => {
    console.error("Error during fetch operation:", error);
    alert("Failed to process your request.");
  });
}

// Array of item objects
const items = [
    {
        name: "Women's Summer Dress",
        price: 16,
        imageUrl: "../../img/dress.jpg",
        description: "2022 hollow out long-sleeve dress with waist A-line and big swing lace, lined with dress shorts.",
        brand: "Amazon Essentials",
        link: "https://www.amazon.com/Womens-Summer-Dresses-Hollow-Long-Sleeve/dp/B0B7RHC3V1",
        categoryid: 3
    },
    {
        name: "Men's Slim-Fit Long-Sleeve Shirt",
        price: 16,
        imageUrl: "../../img/long-sleeve.jpg",
        description: "Lightweight slim-fit henley with ribbed neck, raglan sleeves, overlock stitching, and shirttail hem.",
        brand: "Amazon Essentials",
        link: "https://www.amazon.com/Amazon-Essentials-Slim-Fit-Long-Sleeve-Oatmeal/dp/B07BJKQV4X/",
        categoryid: 1
    },
    {
        name: "Aelfric Eden Oversized Sweater",
        price: 53,
        imageUrl: "../../img/sweater.jpg",
        description: "Ribbed knit sweater with a vintage, streetwear style. Casual, crewneck, oversized and unisex design.",
        brand: "Aelfric Eden",
        link: "https://www.amazon.com/Aelfric-Eden-Oversized-Crewneck-Pullover/dp/B0BJTX4YX5/",
        categoryid: 1
    },
    {
        name: "Diamond Round Stud Earrings",
        price: 449,
        imageUrl: "../../img/diamond-earrings.jpg",
        description: "0.50ct ethically-sourced, lab-grown diamond stud earrings set in a classic 4-prong basket.",
        brand: "Diamond Wish",
        link: "https://www.amazon.com/Diamond-Earrings-VS1-VS2-Screw-backs-Wish/dp/B07SSN6XT6/",
        categoryid: 5
    },
    {
        name: "Wangyue Men's Suit",
        price: 66,
        imageUrl: "../../img/suit.jpg",
        description: "Men's suit with blazer, vest, and pants. Offers multiple dressing options for various occasions.",
        brand: "Amazon Essentials",
        link: "https://www.amazon.com/Button-Double-Breasted-Business-Wedding/dp/B09VGM1P55",
        categoryid: 1
    },
    {
        name: "Dickies Men's Casual Leather Belt",
        price: 14,
        imageUrl: "../../img/belt.jpg",
        description: "Features two rows of stitches on edges, a matte finish buckle, and a classic pointed tip silhouette.",
        brand: "Dickies",
        link: "https://www.amazon.com/Dickies-Mens-Big-Tall-Stitch-Black/dp/B0776VCZ91/",
        categoryid: 5
    },
    {
        name: "Men's Linen Casual Short Sleeve Shirts",
        price: 449,
        imageUrl: "../../img/beach-shirt.jpg",
        description: "Superior linen blend material. Soft, lightweight, breathable, and wrinkle-free for all seasons.",
        brand: "COOFANDY",
        link: "https://www.amazon.com/COOFANDY-Casual-Button-Cotton-Shirts/dp/B0BKG4WT9J/",
        categoryid: 1
    },
    {
        name: "Alelly Women's Summer Ruffle Skirt",
        price: 29,
        imageUrl: "../../img/skirt.jpg",
        description: "High waist ruffle skirt perfect for every occasion, featuring a trendy design and casual chic look.",
        brand: "Alelly",
        link: "https://www.amazon.com/Alelly-Womens-Summer-Ruffle-Floral/dp/B07TSSH1W2/",
        categoryid: 2
    },
    {
        name: "Adidas Adilette Shower Slides Sandal",
        price: 18,
        imageUrl: "../../img/slides.jpg",
        description: "The ultimate comfort slide for anytime wear.",
        brand: "Adidas",
        link: "https://www.amazon.com/adidas-Unisex-Adilette-Shower-Sandal/dp/B091ZF99DJ/",
        categoryid: 4
    },
    {
        name: "Women's Mid-Waisted Jeans",
        price: 46,
        imageUrl: "../../img/mid-jeans.jpg",
        description: "Straight design jeans to accentuate your legs. Soft, lightweight, and sexy.",
        brand: "ETTELO",
        link: "https://www.amazon.com/ETTELO-Waisted-Straight-Stretchy-Lightweight/dp/B0C1KTBPQ6/",
        categoryid: 2
    },
    {
        name: "MANGOPOP Women's Mock Turtle Neck",
        price: 25,
        imageUrl: "../../img/turtle-neck.jpg",
        description: "Fleece lined turtleneck shirts made of stretchy, soft, lightweight material for winter warmth.",
        brand: "MANGPOP",
        link: "https://www.amazon.com/dp/B0C6QF5X8G/",
        categoryid: 1
    },
    {
        name: "Nike Mens Air Jordan 1",
        price: 236,
        imageUrl: "../../img/nike-dunks.jpg",
        description: "Blue Black Hyper Royal White design offering both comfort and style.",
        brand: "Nike",
        link: "https://www.amazon.com/Nike-554724-Black-Royal-Numeric_10/dp/B08Q8NS9RN?ref_=ast_sto_dp&th=1&psc=1",
        categoryid: 4
    },
    {
        name: "PAVOI 14K Gold Plated Tennis Bracelet",
        price: 18,
        imageUrl: "../../img/bracelet.jpg",
        description: "Features round 3mm AAAAA cubic zirconia stones in four-prong basket settings, 6.5 inches in length.",
        brand: "PAVOI",
        link: "https://www.amazon.com/PAVOI-Zirconia-Classic-Bracelet-Bracelets/dp/B07TBN9JRJ/",
        categoryid: 5
    },
    {
        name: "Men's Baggy Jeans Loose Fit Wide Leg",
        price: 37,
        imageUrl: "../../img/baggy-jeans.jpg",
        description: "Elastic waist wide leg jeans with drawstring closure for a comfortable, adjustable fit.",
        brand: "HeyFanee",
        link: "https://www.amazon.com/Baggy-Jeans-Skateboard-Streetwear-Trousers/dp/B0CTJR9Q1W/",
        categoryid: 2
    },
    {
        name: "Floerns Women's Boho Floral Dress",
        price: 44,
        imageUrl: "../../img/floral-dress.jpg",
        description: "Off-shoulder, ditsy floral, short sleeve, high waist, split, long A-line dress.",
        brand: "Floerns",
        link: "https://www.amazon.com/Floerns-Womens-Floral-Print-Shoulder/dp/B08D9GVL3R/",
        categoryid: 3
    }
];

function createCard(item) {
    // Create the main card element
    const card = document.createElement('div');
    card.className = 'card';

    // Create the link element that only wraps the image
    const link = document.createElement('a');
    link.href = item.link;
    link.className = 'card-link';

    // Create the image element
    const image = document.createElement('img');
    image.src = item.imageUrl;
    image.alt = "Card Image";
    image.className = 'card-img-top';
    link.appendChild(image); // Append image to link

    // Append link (with image) to the card
    card.appendChild(link);

    // Create the card body for other information (not clickable)
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    // Add product name
    const cardName = document.createElement('div');
    cardName.className = 'card-name';
    const name = document.createElement('h5');
    name.textContent = item.name;
    cardName.appendChild(name);

    // Add product price
    const cardPrice = document.createElement('div');
    cardPrice.className = 'card-price';
    const price = document.createElement('p');
    price.textContent = `$${item.price}`;
    cardPrice.appendChild(price);

    // Add description
    const cardDescription = document.createElement('div');
    cardDescription.className = 'card-description';
    const description = document.createElement('p');
    description.textContent = item.description;
    cardDescription.appendChild(description);

    // Add brand
    /*const cardText = document.createElement('div');
    cardText.className = 'card-text';
    const brand = document.createElement('p');
    brand.textContent = `Brand: ${item.brand}`;
    cardText.appendChild(brand);*/

    // Add the button
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'addToCloset btn btn-success mb-2';
    button.textContent = 'Add to Closet';
    button.dataset.name = item.name;
    button.dataset.price = item.price;
    button.dataset.image = item.imageUrl;
    button.dataset.description = item.description;
    button.dataset.brand = item.brand;
    button.dataset.categoryid = item.categoryid;
    // Append all parts to the card body
    cardBody.appendChild(cardName);
    cardBody.appendChild(cardPrice);
    cardBody.appendChild(cardDescription);
    //cardBody.appendChild(cardText);
    cardBody.appendChild(button);

    // Append the card body to the card
    card.appendChild(cardBody);

    return card;
}


function addCardsToPage() {
    const container = document.querySelector('.fixed-div');
    items.forEach(item => {
        container.appendChild(createCard(item));
    });
}