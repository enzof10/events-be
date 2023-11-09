const eventService = require("../services/eventService");

const getAllEvents = (req, res) => {
    eventService
        .getAllEvents()
        .then((boards) => {
            boards.forEach((board) => {
                board.tasks.forEach((task) => {
                    task.types = task.types.map((type) => type.type);
                });
            });

            res.status(200).json({ data: boards });
        })
        .catch((err) => {
            console.log("err: ", err);
            res.status(500).json({ error: true, message: err.toString() });
        });
};

const getOneEvent = (req, res) => {
    const idTask = Number(req.params.id);
    eventService
        .getOneEvent(idTask)
        .then((board) => {
            res.json(board);
        })
        .catch((err) => {
            res.json(err);
        });
};

const createEvent = (req, res) => {
    const userId = req.user.id;
    eventService
        .createEvent(req.body, userId)
        .then((board) => {
            res.status(201).json({ data: board });
        })
        .catch((err) => {
            console.log("err: ", err);
            res.status(500).json({ error: err.toString() });
        });
};

const updateEvent = (req, res, next) => {
    const idEvent = Number(req.params.id);
    if (!idEvent || typeof idEvent !== "number") {
        return res.status(400).json({ error: true, message: "idEvent is required" });
    }
    const newTask = req.body;
    eventService
        .updateEvent(idEvent, newTask)
        .then((board) => {
            res.json(board);
        })
        .catch(next);
};

const deleteEvent = (req, res) => {
    const idEvent = Number(req.params.id);
    if (!idEvent || typeof idEvent !== "number") {
        return res.status(400).json({ error: "idEvent is required" });
    }
    eventService
        .deleteEvent(idEvent)
        .then((task) => {
            res.json(task);
        })
        .catch((err) => {
            res.status(500).json({ error: err.toString() });
        });
};

module.exports = {
    getAllEvents,
    getOneEvent,
    createEvent,
    updateEvent,
    deleteEvent,
};
