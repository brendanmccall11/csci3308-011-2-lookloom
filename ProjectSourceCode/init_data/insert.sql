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
    ('Necklace', 19.99, '../../img/necklace.jpeg', 'https://www.example.com/products/statement-necklace', 'Bold statement necklace to accessorize your outfit', 'AccessoriesPlus');

-- Insert sample data into items_to_categories table to associate items with categories
INSERT INTO items_to_categories (item_id, category_id)
VALUES
    ((SELECT item_id FROM items WHERE name = 'Floral Blouse'), 1),
    ((SELECT item_id FROM items WHERE name = 'AESkinny Jeans'), 2),
    ((SELECT item_id FROM items WHERE name = 'Summer Maxi Dress'), 3),
    ((SELECT item_id FROM items WHERE name = 'High-Top Converse'), 4),
    ((SELECT item_id FROM items WHERE name = 'Necklace'), 5);

-- INSERTING SAMPLE DATA FOR OUTFITS

INSERT INTO outfits (outfit_name, image_url)
VALUES
    ('test outfit', '../../img/blouse.jpeg'),
    ('another test outfit', '../../img/maxi-dress.jpeg');

INSERT INTO items_to_outfits (item_id, outfit_id)
VALUES
    ((SELECT item_id FROM items WHERE name = 'Floral Blouse'), (SELECT outfit_id FROM outfits WHERE outfit_name = 'test outfit')),
    ((SELECT item_id FROM items WHERE name = 'High-Top Converse'), (SELECT outfit_id FROM outfits WHERE outfit_name = 'test outfit')),
    ((SELECT item_id FROM items WHERE name = 'Necklace'), (SELECT outfit_id FROM outfits WHERE outfit_name = 'another test outfit')),
    ((SELECT item_id FROM items WHERE name = 'Summer Maxi Dress'), (SELECT outfit_id FROM outfits WHERE outfit_name = 'another test outfit'));

\dt;