const { spawn } = require("child_process");

const extract_seatno = async (file) => {
  return new Promise((success, error) => {
    const args = ["computationalUnit/seatnoMapping.py", file];
    const pythonProcess = spawn("python", args);
    const result = [];
    const errors = [];
    let tempStr = "";

    pythonProcess.stdout.on("data", (data) => {
      tempStr += data;
    });

    pythonProcess.stderr.on("data", (data) => {
      errors.push(`${data}`);
    });

    pythonProcess.on("close", (code) => {
      tempStr = tempStr.split("|");
      tempStr.forEach((element) => {
        try {
          element = element.trim();
          if (element.length > 0) {
            result.push(JSON.parse(element));
          }
        } catch (err) {
          console.log(element, err);
        }
      });
      console.log(`child process exited with code ${code}`);
      success(result);
    });
  });
};

module.exports = { extract_seatno };
