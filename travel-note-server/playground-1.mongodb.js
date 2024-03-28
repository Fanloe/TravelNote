// MongoDB Playground
const database = "travelnotes";
const note = "note";
const user = "user";
const chunks = "";
const file = "";
// Create a new database.
use(database);
// Create a new collection.
db.createCollection(note);
db.createCollection(user);
db.createCollection(chunks);
db.createCollection(file);
