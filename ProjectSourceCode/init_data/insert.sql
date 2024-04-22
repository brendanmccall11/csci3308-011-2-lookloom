-- Insert test user
INSERT INTO users (user_id, username, password, first_name, last_name) VALUES
    (1, 'test', '$2b$10$1pjbz9V8tUTD/lsithLuH.bTh4Z19vsBtpN1TuAJeO.ibudeN6Sea', 'John', 'Doe'),
    (2, 'oliviaa', '$2b$10$4wi7dzzsiJi8ACLeyoAO1e/9H0E8Xjbmrb2bDLqSjILLUVWgdSvnS', 'Olivia', 'Zhu');

-- Insert sample data into categories table
INSERT INTO categories (category_name) VALUES
    ('Tops'),
    ('Bottoms'),
    ('Dresses'),
    ('Shoes'),
    ('Accessories');

-- Insert sample data into items table
INSERT INTO items (name, price, image_url, link, description, brand)
VALUES
    ('Floral Blouse', 25.99, '../../img/blouse.jpeg', 'https://www.example.com/products/floral-blouse', 'Beautiful floral blouse for casual wear', 'FashionX'),
    ('AESkinny Jeans', 39.99, '../../img/skinny-jeans.jpeg', 'https://www.example.com/products/skinny-jeans', 'Classic skinny jeans for everyday use', 'AE'),
    ('Summer Maxi Dress', 45.50, '../../img/maxi-dress.jpeg', 'https://www.example.com/products/summer-maxi-dress', 'Flowy maxi dress perfect for summer outings', 'FashionTrend'),
    ('High-Top Converse', 89.99, '../../img/converse-shoes.jpeg', 'https://www.example.com/products/leather-boots', 'Stylish high tops for all occasions', 'FootwearCo'),
    ('Necklace', 19.99, '../../img/necklace.jpeg', 'https://www.example.com/products/statement-necklace', 'Bold statement necklace to accessorize your outfit', 'AccessoriesPlus'),
    ('High-waisted sweatpants', 25.49, 'https://m.media-amazon.com/images/I/619IhAoylxL._AC_SY879_.jpg', '', 'Comfortable high-waisted sweatpants', 'HeSaYep' ),
    ('CU Boulder Pullover Sweatshirt', 74.99, '../../img/cu_boulder_sweatshirt.jpg', 'https://www.amazon.com/Colorado-Buffaloes-Officially-Licensed-Pullover/dp/B0BP9KSMMY', 'CU Boulder merch sweatshirt', 'CU Boulder'),
    ('Adidas Grand Court Sneakers', 70, 'https://images.rogansshoes.com/t_1000/AD_GW9196_WBK1.JPG', 'https://www.adidas.com/us/grand-court-shoes/GW9214.html', 'White sneakers with black stripes', 'Adidas'),
    ('Sundress', 25.99, 'https://d1flfk77wl2xk4.cloudfront.net/Assets/14/988/XXL_p0207598814.jpg', 'https://www.yesstyle.com/en/flowerisque-puff-sleeve-floral-mini-a-line-dress/info.html/pid.1128591867', 'Purple and white flowy dress', 'Flowerisque'), 
    ('White Sandals', 42.15, 'https://m.media-amazon.com/images/I/61lpuRrYbdS._AC_SX695_.jpg', '', 'Chunky white sandals', 'Soda ACCOUNT'),
    ('Hair Bow', 6.99, 'https://m.media-amazon.com/images/I/51Xf1Ym+Y3L._SX679_.jpg', '', 'White bow to put in your hair', 'Kefley'),
    ('Jean shorts', 20.99, 'https://d1flfk77wl2xk4.cloudfront.net/Assets/01/172/M_p0098817201.jpg', 'https://www.yesstyle.com/en/dudu-high-waist-denim-shorts/info.html/pid.1070830769', 'High-waisted jean shorts for warm weather', 'Dudu'),
    ('Floral sweater', 15.99, 'https://i.pinimg.com/736x/f0/70/29/f07029dc5d87a3e5ddf48c0bc481b82e.jpg', '', 'Yellow blouse with flower patterns', 'SHEIN'),
    ('Bow necklace', 9.99, 'https://m.media-amazon.com/images/I/41d33PFCiBL._AC_SY625_.jpg', '', 'Gold necklace with yellow bow charm', 'SUNNYOUTH'),
    ('Air Force Ones', 115, 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f094af40-f82f-4fb9-a246-e031bf6fc411/air-force-1-07-womens-shoes-b19lqD.png', 'https://www.nike.com/t/air-force-1-07-womens-shoes-b19lqD/DD8959-100', 'White Nike sneakers', 'Nike');

-- Insert sample data into items_to_categories table to associate items with categories
INSERT INTO items_to_categories (item_id, category_id)
VALUES
    ((SELECT item_id FROM items WHERE name = 'Floral Blouse'), 1),
    ((SELECT item_id FROM items WHERE name = 'AESkinny Jeans'), 2),
    ((SELECT item_id FROM items WHERE name = 'Summer Maxi Dress'), 3),
    ((SELECT item_id FROM items WHERE name = 'High-Top Converse'), 4),
    ((SELECT item_id FROM items WHERE name = 'Necklace'), 5),
    ((SELECT item_id FROM items WHERE name = 'High-waisted sweatpants'), 2),
    ((SELECT item_id FROM items WHERE name = 'CU Boulder Pullover Sweatshirt'), 1),
    ((SELECT item_id FROM items WHERE name = 'Adidas Grand Court Sneakers'), 4),
    ((SELECT item_id FROM items WHERE name = 'Sundress'), 3),
    ((SELECT item_id FROM items WHERE name = 'White Sandals'), 4),
    ((SELECT item_id FROM items WHERE name = 'Hair Bow'), 5),
    ((SELECT item_id FROM items WHERE name = 'Jean shorts'), 2),
    ((SELECT item_id FROM items WHERE name = 'Floral sweater'), 1),
    ((SELECT item_id FROM items WHERE name = 'Bow necklace'), 5),
    ((SELECT item_id FROM items WHERE name = 'Air Force Ones'), 4);

-- INSERTING SAMPLE DATA FOR OUTFITS

INSERT INTO outfits (outfit_name, image_url)
VALUES
    ('test outfit', '../../img/blouse.jpeg'),
    ('another test outfit', '../../img/maxi-dress.jpeg'),
    ('Finals week', '../../img/cu_boulder_sweatshirt.jpeg'),
    ('Summer vacation', 'https://d1flfk77wl2xk4.cloudfront.net/Assets/14/988/XXL_p0207598814.jpg'),
    ('Movie night', 'https://i.pinimg.com/736x/f0/70/29/f07029dc5d87a3e5ddf48c0bc481b82e.jpg');
    
    

INSERT INTO items_to_outfits (item_id, outfit_id)
VALUES
    ((SELECT item_id FROM items WHERE name = 'Floral Blouse'), (SELECT outfit_id FROM outfits WHERE outfit_name = 'test outfit')),
    ((SELECT item_id FROM items WHERE name = 'High-Top Converse'), (SELECT outfit_id FROM outfits WHERE outfit_name = 'test outfit')),
    ((SELECT item_id FROM items WHERE name = 'Necklace'), (SELECT outfit_id FROM outfits WHERE outfit_name = 'another test outfit')),
    ((SELECT item_id FROM items WHERE name = 'Summer Maxi Dress'), (SELECT outfit_id FROM outfits WHERE outfit_name = 'another test outfit')),
    ((SELECT item_id FROM items WHERE name = 'High-waisted sweatpants'), (SELECT outfit_id FROM outfits WHERE outfit_name = 'Finals week')),
    ((SELECT item_id FROM items WHERE name = 'CU Boulder Pullover Sweatshirt'), (SELECT outfit_id FROM outfits WHERE outfit_name = 'Finals week')),
    ((SELECT item_id FROM items WHERE name = 'Adidas Grand Court Sneakers'), (SELECT outfit_id FROM outfits WHERE outfit_name = 'Finals week')),
    ((SELECT item_id FROM items WHERE name = 'Sundress'), (SELECT outfit_id FROM outfits WHERE outfit_name = 'Summer vacation')),
    ((SELECT item_id FROM items WHERE name = 'White Sandals'), (SELECT outfit_id FROM outfits WHERE outfit_name = 'Summer vacation')),
    ((SELECT item_id FROM items WHERE name = 'Hair Bow'), (SELECT outfit_id FROM outfits WHERE outfit_name = 'Summer vacation')),
    ((SELECT item_id FROM items WHERE name = 'Jean shorts'), (SELECT outfit_id FROM outfits WHERE outfit_name = 'Movie night')),
    ((SELECT item_id FROM items WHERE name = 'Floral sweater'), (SELECT outfit_id FROM outfits WHERE outfit_name = 'Movie night')),
    ((SELECT item_id FROM items WHERE name = 'Bow necklace'), (SELECT outfit_id FROM outfits WHERE outfit_name = 'Movie night')),
    ((SELECT item_id FROM items WHERE name = 'Air Force Ones'), (SELECT outfit_id FROM outfits WHERE outfit_name = 'Movie night'));


-- Sample data to correspond with test user
INSERT INTO users_to_items (user_id, item_id) VALUES
    (1, (SELECT item_id FROM items WHERE name = 'Floral Blouse')),
    (1, (SELECT item_id FROM items WHERE name = 'AESkinny Jeans')),
    (1, (SELECT item_id FROM items WHERE name = 'Summer Maxi Dress')),
    (1, (SELECT item_id FROM items WHERE name = 'High-Top Converse')),
    (1, (SELECT item_id FROM items WHERE name = 'Necklace')),
    (2, (SELECT item_id FROM items WHERE name = 'High-waisted sweatpants')),
    (2, (SELECT item_id FROM items WHERE name = 'CU Boulder Pullover Sweatshirt')),
    (2, (SELECT item_id FROM items WHERE name = 'Adidas Grand Court Sneakers')),
    (2, (SELECT item_id FROM items WHERE name = 'Sundress')),
    (2, (SELECT item_id FROM items WHERE name = 'White Sandals')),
    (2, (SELECT item_id FROM items WHERE name = 'Hair Bow')),
    (2, (SELECT item_id FROM items WHERE name = 'Jean shorts')),
    (2, (SELECT item_id FROM items WHERE name = 'Floral sweater')),
    (2, (SELECT item_id FROM items WHERE name = 'Bow necklace')),
    (2, (SELECT item_id FROM items WHERE name = 'Air Force Ones'));

-- Sample outfits to correspond with test user
INSERT INTO users_to_outfits (user_id, outfit_id) VALUES
    (1, (SELECT outfit_id FROM outfits WHERE outfit_name = 'test outfit')),
    (1, (SELECT outfit_id FROM outfits WHERE outfit_name = 'another test outfit')),
    (2, (SELECT outfit_id FROM outfits WHERE outfit_name = 'Finals week')), 
    (2, (SELECT outfit_id FROM outfits WHERE outfit_name = 'Summer vacation')), 
    (2, (SELECT outfit_id FROM outfits WHERE outfit_name = 'Movie night'));
\dt;