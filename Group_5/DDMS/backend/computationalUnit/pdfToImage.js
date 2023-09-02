const { spawn } = require("child_process");

const convertToImage = (path) => {
  return new Promise(function (success, error) {
    const args = ["computationalUnit/pdfToImage.py", path];
    const pythonProcess = spawn("python", args);
    let servPath;
    pythonProcess.stdout.on("data", (data) => {
      servPath = JSON.parse(data);
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
      error(data);
    });

    pythonProcess.on("close", (code) => {
      success(servPath);
    });
  });
};

module.exports = { convertToImage };
