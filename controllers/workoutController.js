const getAllWorkouts = (req, res) => {
  res.send("get all workouts");
};

const getOneWorkout = (req, res) => {
    const idWorkout = req.params.id;
    res.send(`get one workout with id ${idWorkout}`);
};

const createWorkout = (req, res) => {
    const workout = req.body;
    res.send(`create a workout with ${workout}`);
};

const updateWorkout = (req, res) => {
    const idWorkout = req.params.id;
    const workout = req.body;
    res.send(`update a workout with id ${idWorkout} and ${workout}`);
};

const deleteWorkout = (req, res) => {
    const idWorkout = req.params.id;
    res.send(`delete a workout with id ${idWorkout}`);
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
