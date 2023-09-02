const { spawn } = require("child_process");
const { Student } = require("../models/student");
const { Subject } = require("../models/subject");

const cleanResult = async ({ result, errors }) => {
  let prevSeatno = null;
  let prevSubject = null;
  let subCode = null;
  let uid = null;
  const finalResult = []; //store the 2D result array to 1D for bulk create
  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result[i].length; j++) {
      let currSub = result[i][j];
      console.log(currSub);
      if (currSub.SubjectSubCode != prevSubject) {
        subCode = await Subject.findOne({
          where: { subCode: currSub.SubjectSubCode },
          attributes: ["subCode"],
        });
        if (subCode) {
          prevSubject = subCode.subCode;
        }
        console.log(prevSubject);
      }
      if (currSub.seatno != prevSeatno) {
        console.log("Hit");
        uid = await Student.findOne({
          where: { examseatno: currSub.seatno },
          attributes: [["UserId", "userId"]],
        });
      }
      if (subCode && uid) {
        delete currSub.seatno;
        currSub.StudentUserId = uid.userId;
        console.log(currSub);
        finalResult.push(currSub);
      } else {
        if (!subCode) {
          errors.push({
            value: currSub,
            error: `No subject: ${currSub.SubjectSubCode}`,
          });
        } else {
          errors.push({
            value: currSub,
            error: `No student with seat no: ${currSub.seatno}`,
          });
        }
      }
    }
  }
  return { result: finalResult, errors: errors };
};

const getresult = async () => {
  let result = await cleanResult({ result: test, errors: [] });
  console.log(result.result, result.errors);
};

// getresult();

const spawnProcess = (coords, seatNos, pages, path) => {
  return new Promise(async function (success, error) {
    // Send SSE headers
    //res.writeHead(200, {
    //   "Content-Type": "text/event-stream",
    //   "Cache-Control": "no-cache",
    //   Connection: "keep-alive",
    // });
    let result = [];
    let errors = [];
    let tempStr = "";
    let count = 0;
    const pdf_path = path;
    const args = [
      "computationalUnit/extractpdf.py",
      pdf_path,
      coords,
      seatNos,
      pages,
    ];
    const pythonProcess = spawn("python", args);

    pythonProcess.stdout.on("data", (data) => {
      count++;
      //res.write(`Processed: ${(count / pages) * 100}\n\n`);
      console.log(`Processed: ${(count / pages) * 100}`);
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
      //res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      success({ result: result, errors: errors });
    });
  });
};

module.exports = { spawnProcess, cleanResult };
