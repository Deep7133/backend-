const fs = require("fs");
let fun = process.argv;
if(!fs.existsSync('todos.txt')){
    fs.writeFileSync('todos.txt','')
}
let count = fs.readFileSync("./todos.txt", "utf-8").split("\n").length-1;
switch (fun[2]) {
  case "add":
    if (fun[3] == undefined) {
      console.log("Add Task Argument.");
      console.log("Ex: node index [flag] [arguments].");
    } else {
      let t = fun.slice(3).join(" ");
    //   console.log(t);
      addTask(t);
      console.log(`${t} Added successfully!`);
    }
    break;

    case "help":
        console.log("To Do List");
        console.log("Ex: node index [flag] [arguments].");
        console.log("Flags:")
        console.log("add \t to add task")
        console.log("list \t to show list of tasks")
        console.log("remove \t to remove task by number")
        console.log("clear \t to clear task list")
        console.log("help \t to help")
        break;
  case "list":
    listTask();
    break;

  case "remove":
    let t = parseInt(fun[3]);
    if (fun[3] == undefined || isNaN(t)) {
      console.log("Add Task number to remove");
      console.log("Ex: node index [Task No.].");
      console.log('Check Task List by "list" Flag.');
    } else if (t <= 0 || t > count) {
      console.log("Task Number is out of range.");
      console.log('Check Task List by "list" Flag.');
    } else {
      removeTask(t);
    }
    break;

    case "clear":
        fs.truncateSync("./todos.txt")

    default:
        console.log("Invalid Flag");
        console.log("Ex: node index [flag] [arguments].");
        console.log("Flags:")
        console.log("add \t to add task")
        console.log("list \t to show list of tasks")
        console.log("remove \t to remove task by number")
        console.log("clear \t to clear task list")
        console.log("help \t to help")
}

function addTask(t) {
  fs.appendFileSync("./todos.txt", `${++count}. ${t}\n`);
}

function listTask() {
  let t = fs.readFileSync("./todos.txt", "utf8");
  console.log(t);
}

function removeTask(t) {
  let data = fs.readFileSync("./todos.txt", "utf-8").split("\n");
    fs.truncateSync("./todos.txt")
  count = 0;
  for (let i = 0; i < data.length-1; i++) {
    data[i] = data[i].split(". ");
    if(data[i][0]==t){
        console.log(`${data[i][1]} is remove Successfully`);
        continue;
    }
    else{
        addTask(data[i][1]);
    }
  }
}