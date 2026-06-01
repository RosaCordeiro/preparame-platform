function adjustColumnsAndRowsRegister(fields, fieldsAdjusted) {
  console.log("fields", fields);
  console.log("fieldsAdjusted", fieldsAdjusted);

  const columns = fields?.registerColumns ?? fields ?? [];

  console.log("columns", columns);

  const rowsCount = Object.values(columns)
    .map((column) => {
      return column.row;
    })
    .filter((row, index, self) => {
      return self.indexOf(row) === index;
    });

  rowsCount.forEach((rowNumber) => {
    const cols = Object.values(columns).filter((column) => {
      return column.row === rowNumber;
    });

    fieldsAdjusted.push({
      row: rowNumber,
      cols: cols,
    });
  });
}

function adjustColumnsAndRowsRegisterWithReturn(fields) {
  const fieldsAdjusted = [];

  const columns = fields?.registerColumns ?? fields ?? [];

  console.log("columns", columns);

  const rowsCount = Object.values(columns)
    .map((column) => {
      return column.row;
    })
    .filter((row, index, self) => {
      return self.indexOf(row) === index;
    });

  rowsCount.forEach((rowNumber) => {
    const cols = Object.values(columns).filter((column) => {
      return column.row === rowNumber;
    });

    fieldsAdjusted.push({
      row: rowNumber,
      cols: cols,
    });
  });

  return {
    registerColumns: fieldsAdjusted,
  };
}

export { adjustColumnsAndRowsRegister, adjustColumnsAndRowsRegisterWithReturn };
