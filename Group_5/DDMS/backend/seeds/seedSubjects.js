const { Faculty } = require("../models/faculty");
const { Subject } = require("../models/subject");
const { User } = require("../models/user");

module.exports.seedSubjects = async (array) => {
  await Subject.bulkCreate(subjectData);
};

module.exports.associateSubjects = async () => {
  for (let id = 1; id < 9; id++) {
    let subid = subjectData[id].subCode;
    await Faculty.create({
      userId: id,
      SubjectSubCode: subid,
    });
  }
};

subjectData = [
  {
    subCode: "414441",
    subName: "Information and Storage Retrieval",
    pract: 0,
    oral: 25,
    sem: 7,
  },
  {
    subCode: "414442",
    subName: "Software Project Management",
    pract: 0,
    oral: 25,
    sem: 7,
  },
  {
    subCode: "414443",
    subName: "Deep Learning",
    pract: 0,
    oral: 25,
    sem: 7,
  },
  {
    subCode: "414444",
    subName: "Mobile Computing",
    pract: 0,
    oral: 25,
    sem: 7,
  },
  {
    subCode: "414445",
    subName: "High Performance Computing",
    pract: 0,
    oral: 25,
    sem: 7,
  },
  {
    subCode: "414446",
    subName: "Multimedia Technology",
    pract: 0,
    oral: 25,
    sem: 7,
  },
  {
    subCode: "414447",
    subName: "Introduction to DevOps",
    pract: 0,
    oral: 25,
    sem: 7,
  },
  {
    subCode: "414448",
    subName: "Computer Vision",
    pract: 0,
    oral: 25,
    sem: 7,
  },
  {
    subCode: "414449",
    subName: "Wireless Communication",
    pract: 0,
    oral: 25,
    sem: 7,
  },
  {
    subCode: "414450",
    subName: "Lab Practice 3",
    pract: 25,
    oral: 25,
    sem: 7,
  },
  {
    subCode: "414451",
    subName: "Lab Practice 4",
    pract: 0,
    oral: 25,
    sem: 7,
  },
  {
    subCode: "414452",
    subName: "Project Stage 1",
    pract: 0,
    oral: 50,
    sem: 7,
  },
  {
    subCode: "414441A",
    subName: "Audit Course",
    pract: 0,
    oral: 25,
    sem: 7,
  },
];
