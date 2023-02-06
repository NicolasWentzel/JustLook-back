var express = require("express");
var router = express.Router();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OWM_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.post("/mariage", async (req, res) => {
  console.log(req.body);
  const prompt = `Je veux que tu joues le rôle d'un orateur. Tu inventeras des discours qui sont éloquents et captivants pour le public. Il peut s'agir de discours de mariage, de remerciement, ou de tout autre type de discours qui ont le potentiel de capter l'attention et l'imagination des gens. En fonction du public cible, tu peux choisir des thèmes ou des sujets spécifiques pour ton discours, par exemple, s'il s'agit d'un mariage, tu peux parler de l'amour ; s'il s'agit d'un discours professionnel, tu pourrais citer des entrepreneurs ou des chefs d'entreprise connus qui pourraient mieux les intéresser, etc. Ma première demande est "J'ai besoin d'un discours en français, de 2000 mots minimum, pour un mariage. Les mariés sont ${req.body.marie} et ${req.body.femme}. Je suis le ${req.body.role} de ${req.body.relation}. Je veux que le ton de ton discours soit ${req.body.selectedStyles}. J'aimerais inclure des ${req.body.selectedCitations}. J'aimerais inclure les anecdotes suivantes ${req.body.anecdotes}. Je veux que le discours soit écrit au format MARKDOWN avec deux sauts de lignes entre chaque paragraphe."`;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.7,
    max_tokens: 2000,
  });
  // Return the generated text as the response
  res.header("Content-Type", "text/plain");
  res.json(response.data.choices[0].text);
  //   res.send(response.data.choices[0].text);
  // res.send(response.data.choices[0].text);
  console.log(response.data.choices);
});

module.exports = router;
