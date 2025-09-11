import Template from "../models/Content.template.model.js"

// GET by slug (e.g. aptitude)
export const getTemplate = async (req, res) => {
  try {
    const template = await Template.findOne({ slug: req.params.slug });
    if (!template) return res.status(404).json({ message: "Not found" });
    res.json(template);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST/UPDATE content
export const updateTemplate = async (req, res) => {
  console.log("Recevied data: ", req.body);
  const { slug, title, description, sections, topics } = req.body;

  try {
    let template = await Template.findOne({ slug });

    if (template) {
      template.title = title;
      template.description = description;
      template.sections = sections;
      template.topics = topics;
    } else {
      template = new Template({ slug, title, description, sections, topics });
    }

    await template.save();
    res.json({ message: "Content saved successfully", template });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Delete entire template by slug
export const deleteTemplate = async (req, res) => {
  try {
    const result = await Template.findOneAndDelete({ slug: req.params.slug });
    if (!result) return res.status(404).json({ message: "Template not found" });
    res.json({ message: "Template deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Delete a topic from a template
export const deleteTopicFromTemplate = async (req, res) => {
  const { slug } = req.params;
  const { topicTitle } = req.body;

  try {
    const template = await Template.findOne({ slug });
    if (!template) return res.status(404).json({ message: "Template not found" });

    template.topics = template.topics.filter(t => t.title !== topicTitle);
    await template.save();

    res.json({ message: `Topic '${topicTitle}' deleted`, template });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Update a topic in a template
export const updateTopicInTemplate = async (req, res) => {
  const { slug } = req.params;
  const { topicTitle, newTopic } = req.body; // `newTopic` should be complete topic object

  try {
    const template = await Template.findOne({ slug });
    if (!template) return res.status(404).json({ message: "Template not found" });

    const topicIndex = template.topics.findIndex(t => t.title === topicTitle);
    if (topicIndex === -1) return res.status(404).json({ message: "Topic not found" });

    template.topics[topicIndex] = newTopic;
    await template.save();

    res.json({ message: `Topic '${topicTitle}' updated`, template });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Add a new topic to a template
export const addTopicToTemplate = async (req, res) => {
  const { slug } = req.params;
  const { newTopic } = req.body;

  try {
    const template = await Template.findOne({ slug });
    if (!template) return res.status(404).json({ message: "Template not found" });

    template.topics.push(newTopic);
    await template.save();

    res.json({ message: "New topic added", template });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all templates
export const getAllTemplates = async (req, res) => {
  try {
    const templates = await Template.find();
    res.json(templates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
