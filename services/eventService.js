const { PrismaClient } = require("@prisma/client");

const getAllEvents = () => {
    const prisma = new PrismaClient();
    return prisma.event.findMany();
};

const getOneEvent = (idEvent) => {
    const prisma = new PrismaClient();
    return prisma.event.findMany({
        where: {
            id: idEvent,
        },
    });
};

const createEvent = (event, userId) => {
    const prisma = new PrismaClient();

    return prisma.event.create({
        data: {
            name: event.name,
            description: event.description,
            init: event.init,
            end: event.end,
            user: {
                connect: {
                    id: event.userId
                }
            },
        },
    });
};

const updateEvent = (idevent, newevent) => {
    const prisma = new PrismaClient();

    return prisma.event.update({
        where: {
            id: idevent,
        },
        data: {
            name: newevent.name,
            description: newevent.description,
            init: newevent.init,
            end: newevent.end,
        },
    });
};

const deleteEvent = async (idevent) => {
    const prisma = new PrismaClient();

    prisma.event
        .findMany({
            where: {
                id: idevent,
            },
        })
        .then((event) => {
            console.log("event: ", event);
        })
        .catch((err) => {
            console.log("err: ", err);
        });
    return prisma.event.delete({
        where: {
            id: idevent,
        },
    });
};

module.exports = {
    getAllEvents,
    getOneEvent,
    createEvent,
    updateEvent,
    deleteEvent,
};
