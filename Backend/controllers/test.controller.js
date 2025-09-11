import AptitudeTest from "../models/aptitudetestschema.js";

// Create new aptitude test
export const createTest = async (req, res) => {
  try {
    const { title, questions, duration } = req.body;

    if (!title || !questions || questions.length === 0) {
      return res.status(400).json({ message: "Title and questions are required" });
    }

    const test = new AptitudeTest({ title, questions, duration });
    await test.save();
    res.status(201).json(test);
  } catch (err) {
    res.status(500).json({ message: "Error creating test", error: err.message });
  }
};

// Get all tests
export const getAllTests = async (req, res) => {
  try {
    const tests = await AptitudeTest.find();
    res.status(200).json(tests);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tests", error: err.message });
  }
};

export const getQuestionByTitle = async (req, res) => {
  try {
    const { title } = req.params;

    // Search test by its title
    const test = await AptitudeTest.findOne({
      title: { $regex: "^" + title + "$", $options: "i" } // exact match, case-insensitive
    });

    if (!test) {
      return res.status(404).json({ message: "No test found with that title" });
    }

    res.status(200).json(test);
  } catch (error) {
    console.error("Error fetching test by title:", error.message);
    res.status(500).json({ message: "Error fetching test by title", error: error.message });
  }
};


// Get single test by ID
export const getTestById = async (req, res) => {
  try {
    const { id } = req.params;

    const test = await AptitudeTest.findById(id);

    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    res.status(200).json(test);
  } catch (err) {
    console.error("Error fetching test:", err.message);
    res.status(500).json({ message: "Error fetching test", error: err.message });
  }
};

export const submitTest = async (req, res) => {
  try {
    const { testTitle, answers } = req.body;

    const test = await AptitudeTest.findOne({ title: testTitle });
    if (!test) return res.status(404).json({ message: "Test not found" });

    let score = 0;
    test.questions.forEach((q, index) => {
      if (answers[index] === q.correct) score++;
    });

    res.status(200).json({
      message: "Test submitted successfully",
      totalQuestions: test.questions.length,
      score,
    });
  } catch (err) {
    res.status(500).json({ message: "Error submitting test", error: err.message });
  }
};


// Delete a test
export const deleteTest = async (req, res) => {
  try {
    const test = await AptitudeTest.findByIdAndDelete(req.params.id);
    if (!test) return res.status(404).json({ message: "Test not found" });
    res.status(200).json({ message: "Test deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting test", error: err.message });
  }
};

