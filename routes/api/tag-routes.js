const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', (req, res) => {
  Tag.findAll( { include: Product, through: ProductTag} )
  .then((tagData) => {
    if (!tagData) {
      res.send(404);
    }
    else {
    res.json(tagData);
    }
  }).catch(err => res.status(500).send(err));
});

router.get('/:id', (req, res) => {
  Tag.findByPk(req.params.id, {include: Product, through: ProductTag})
  .then((tagData) => {
    if (!tagData) {
      res.sendStatus(404)
    }
    else {
    res.json(tagData);
    }
  })
});

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  try {
    const updateTag = Tag.update(req.body, {where: {id: req.params.id}});
    res.status(200).json(updateTag);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    else {
    res.status(200).json(tagData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;