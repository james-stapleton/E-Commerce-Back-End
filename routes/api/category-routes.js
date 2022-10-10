const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', (req, res) => {
   Category.findAll(  { include: Product
  }).then((categories) => {
    if (!categories) {
      res.status(400).json({message: "Cannot find categories"})
    }
    res.status(200).json(categories)
  }).catch(err => res.status(500).send("Internal server error"));
});

router.get('/:id', (req, res) => {
  Category.findByPk(req.params.id, {include: Product} )
    .then((category) => {
      if (!category) {
        res.status(400).json({message: "Cannot find category by id"})
      }
      res.status(200).json(category)
    }).catch(err => res.status(500).send("Internal server error"));
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  const {headers, url} = req;
  console.log(headers, url);
  const id = req.body.id;
  const {category_name} = req.body;
  Category.update().then((category) => {

  });
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: { id: req.params.id }
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;