import mydb from "../utils/db";


async function todoSchema() {
    try {
        //  await mydb.query(`DROP TABLE IF EXISTS todos;`)
         
        await mydb.query(`
        CREATE TABLE IF NOT EXISTS todos  (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userid INT,
        name VARCHAR(50) NOT NULL,
        detail VARCHAR(500),
        checkbox BOOLEAN,
        FOREIGN KEY (userid) REFERENCES users(id)
        )
`)
    } catch (e) {
        console.log("error")
    }
}

todoSchema()

export default todoSchema