import Template from '../models/Content.template.model.js'

export const getAllTopics = async (req, res) => {
   try {
    const templates = await Template.find({}, "topics");

    const allTags = templates.flatMap(template =>
      (template.topics || []).flatMap(topic =>
        (topic.tags || []).map(tag => ({
          name: tag.name,
          color: tag.color,
          _id: tag._id
        }))
      )
    );
    res.status(200).json(allTags); 
  } catch (error) {
    console.error('Error fetching topics:', error.message);
    res.status(500).json({ message: 'Server error while fetching topics.' });
  }
};
