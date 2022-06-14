const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000
require('dotenv').config()


// midelware 
app.use(cors())
app.use(express.json())



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.ADMIN_NAME}:${process.env.ADMIN_PASS}@cluster0.fq8zx.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });






async function run() {
    try {
        await client.connect();
        const projectsCollection = client.db("PortfolioProjects").collection("projects");

        // Get projects method
        app.get('/myProjects', async (req, res) => {
            const query = {};
            const result = projectsCollection.find(query)
            const projectResult = await result.toArray()
            res.send({ success: true, data: projectResult });
        })


        // Get Single Projects
        app.get('/myProjects/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const cursor = projectsCollection.find(query);
            const project = await cursor.toArray();
            res.send({ success: true, data: project });
        })



    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);







// Get Projects 
app.get('/projects', (req, res) => {
    console.log('db is conneted');
})




// Get
app.get('/', (req, res) => {
    res.send('kaj hoo vai')
})


app.listen(port, () => {
    console.log('listing to the port', port)
})