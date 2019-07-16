import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util';

(async () => {

  // Init the Express application
  const app = express();


  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());


  let fileData: string[] = [];

  app.get("/", async (req, res) => {
    res.send("Please try GET /filteredimage?image_url={{URL}}");
  });


  app.get("/filteredimage", async (req, res) => {

    let { image_url } = req.query;

    deleteLocalFiles(fileData);
    let finalImage = await filterImageFromURL(image_url);

    if (!finalImage)
      return res.status(422).send({ message: 'Ohoo! Something went wrong' });

    fileData.push(finalImage);

    res.status(200).sendFile(finalImage);
  });


  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();