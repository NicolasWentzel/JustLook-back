var express = require("express");
var router = express.Router();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OWM_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.get("/generate-text", async (req, res) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: req.body.prompt,
    temperature: 0,
    max_tokens: 2000,
  });
  // Return the generated text as the response
  res.send(response.data.choices[0].text);
  console.log(response.data.choices);
});

router.post("/mariage", async (req, res) => {
  console.log(req.body);
  const prompt = `Ecris un discours de mariage en français de 2000 mots minimum pour les mariés ${req.body.marie} et ${req.body.femme}. Je suis le ${req.body.relation}. Je veux que le ton de ton discours soit ${req.body.style}. J'aimerais inclure les anecdotes suivantes sur les mariés : ${req.body.anecdotes}. Je veux que le discours soit écrit au format MARKDOWN avec deux sauts de lignes entre chaque paragraphe.`;
  // Le ton du discours doit être drôle, émouvant et intime

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    // prompt: req.body.prompt,
    prompt: prompt,
    temperature: 0.7,
    max_tokens: 2000,
  });
  // Return the generated text as the response
  res.json(response.data.choices[0].text);

  // res.send(response.data.choices[0].text);
  console.log(response.data.choices);
});

// router.get("/generate-text", async (req, res) => {
//   const response = await openai
//     .createCompletion({
//       model: "text-davinci-003",
//       prompt: req.body.prompt,
//       temperature: 0,
//       max_tokens: 7,
//     })
//     .then((response) => response.json())
//     .then((data) => {
//       // Return the generated text as the response
//       // res.json({ result: true, response: response.data.choices[0].text });
//       res.json({ result: true, response: data });
//     });
// });

// Route pour enregistrer un sujet et une description
router.post("/subjects", (req, res) => {
  // Création d'un nouveau document à partir du modèle
  const newSubject = new Subject({
    subject: req.body.subject,
    description: req.body.description,
  });

  // Enregistrement du document dans la base de données
  newSubject.save((err, subject) => {
    if (err) {
      res.send(err);
    } else {
      res.send(subject);
    }
  });
});

module.exports = router;
