// MongoDB Playground
const database = "travelnotes";
const note = "note";
const user = "user";
const pictures = "pictures";
// Create a new database.
use(database);
// Create a new collection.
db.createCollection(note);
db.createCollection(user);
db.createCollection(pictures + ".chunks");
db.createCollection(pictures + ".files");
