const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
   Category.findAll({
    limit: 10
  }).then((categories) => {
    if (!categories) {
      res.status(400).json({message: "Cannot find categories"})
    }
    res.status(200).json(categories)
  }).catch(err => res.status(500).send("Internal server error"));
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  const { headers, url } = req;
  console.log(headers,url);
  const { category_name } = req.body;
  if (!category_name) {
    res.status(400).json({message: "category_name is required"})
  }
  Category.create({category_name}).then((category) => {
    console.log(category);
    res.status(200).json(category)
  }).catch(err => res.status(500).send(err));
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
