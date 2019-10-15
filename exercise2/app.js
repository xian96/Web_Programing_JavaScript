const todoItems = require("./todo");

async function main() {
    // const createdTask = await todoItems.createTask("My First Task", "This is the first thing I need to do today");
    // console.log(createdTask);
    // const getTasks = await todoItems.getAllTasks();
    // console.log(getTasks);

    console.log(await todoItems.createTask("Ponder Dinosaurs","Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like"));
    await todoItems.createTask("Play Pokemon with Twitch TV","Should we revive Helix?");
    await todoItems.getAllTasks();
    await todoItems.removeTask(id);
}

main().catch(
    err => {
        console.log(err);
    }
);