import Problem from "../models/Problem.js";

// helper function for conversion
function convertCode(language, code) {
  let converted = {
    c: "",
    cpp: "",
    java: "",
    python: ""
  };

  if (language === "java") {
    converted.java = code;
    converted.c = `#include <stdio.h>\nint main() {\n    printf("Hello World");\n    return 0;\n}`;
    converted.cpp = `#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello World";\n    return 0;\n}`;
    converted.python = `print("Hello World")`;
  } else if (language === "python") {
    converted.python = code;
    converted.c = `#include <stdio.h>\nint main() {\n    printf("Hello World");\n    return 0;\n}`;
    converted.cpp = `#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello World";\n    return 0;\n}`;
    converted.java = `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello World");\n    }\n}`;
  }
  // ⚡ tu aur cases add kar sakta hai C aur C++ ke liye bhi

  return converted;
}

// ✅ Updated Add Problem
export const addProblem = async (req, res) => {
  try {
    const { title, description, constraints, examples, approaches, hints, language, code } = req.body;

    // convert to all 4 langs
    const convertedCodes = convertCode(language, code);

    const problem = new Problem({
      title,
      description,
      constraints,
      examples,
      approaches,
      hints,
      code: convertedCodes
    });

    await problem.save();
    res.status(201).json({ success: true, data: problem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc   Get all problems
// @route  GET /api/problems
export const getProblems = async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json({ success: true, data: problems });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc   Get problem by ID
// @route  GET /api/problems/:id
export const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ success: false, message: "Problem not found" });
    }
    res.json({ success: true, data: problem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc   Update problem
// @route  PUT /api/problems/:id
export const updateProblem = async (req, res) => {
  try {
    const problem = await Problem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!problem) {
      return res.status(404).json({ success: false, message: "Problem not found" });
    }
    res.json({ success: true, data: problem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc   Delete problem
// @route  DELETE /api/problems/:id
export const deleteProblem = async (req, res) => {
  try {
    const problem = await Problem.findByIdAndDelete(req.params.id);
    if (!problem) {
      return res.status(404).json({ success: false, message: "Problem not found" });
    }
    res.json({ success: true, message: "Problem deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};