// TODO: Import the Pet model
const PetModel = require(`../models/petModel.js`)

// TODO: Implement each controller function.
// Each controller should:
//   - Parse any needed data from req.params or req.body
//   - Call the appropriate Pet model method
//   - Send the appropriate response with the correct status code

module.exports.createPet = (req, res) => {
  const { name } = req.body;
  if (!name || !String(name).trim()) {
    return res.status(400).send({ message: 'Invalid name' });
  }

  const newPet = PetModel.create(String(name).trim());
  res.send(newPet);
};

module.exports.listPets = (req, res) => {
  // Get all pets and send them
  const pets = PetModel.list();
  res.send(pets);
};

module.exports.getPet = (req, res) => {
  const { id } = req.params;
  const pet = PetModel.find(Number(id));

  if (!pet) {
    return res.status(404).send({
      message: 'Pet not found'
    });
  }
  res.send(pet);
};

module.exports.updatePet = (req, res) => {
  const { name } = req.body;
  if (!name || !String(name).trim()) {
    return res.status(400).send({ message: 'Invalid name' });
  }

  const { id } = req.params;
  const updatedPet = PetModel.update(Number(id), String(name).trim());

  if (!updatedPet) {
    return res.status(404).send({
      message: 'Pet not found'
    });
  }

  res.send(updatedPet);
};

module.exports.deletePet = (req, res) => {
  const { id } = req.params;
  const didDelete = PetModel.destroy(Number(id));

  if (!didDelete) {
    return res.status(404).send({
      message: 'Pet not found'
    });
  }

  res.sendStatus(204);
};
