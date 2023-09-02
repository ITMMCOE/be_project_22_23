const pdf_table_extractor = require("pdf-table-extractor");

const { Student } = require("../models/student");

//PDF parsed
function success(result) {
  mappings = map(result);
  mappings.forEach(async (mapping) => {
    let result = await Student.update(
      { examseatno: mapping.seatno },
      { where: { prn: mapping.prn } }
    );
  });
}

function map(result) {
  const mapping = [];
  for (let i = 0; i < result.pageTables.length; i++) {
    let headerpassed = false;
    for (let j = 0; j < result.pageTables[i].tables.length; j++) {
      row = result.pageTables[i].tables[j];
      if (headerpassed) {
        mapping.push({ seatno: row[0], prn: row[row.length - 1] });
      }
      if (row[0] == "SeatNo") {
        headerpassed = true;
      }
    }
  }
  return mapping;
}

//Error
function error(err) {
  console.error("Error: " + err);
}

const extractSeatnos = (file) => {
  pdf_table_extractor(file, success, error);
};

module.exports = { extractSeatnos };
