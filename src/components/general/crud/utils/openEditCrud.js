import axios from "axios";
import { baseApiUrl, showError } from "../../../../global";
import { formatDateToString } from "../../../../utils/formatDate.js";
import { filterCrud } from "./filterCrud.js";

async function openEditCrud(id, url, fields) {
  if (id) {
    const mainConfig = {
      method: "get",
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      url: `${baseApiUrl}${url}/${id}`,
    };

    const mainDataObject = await axios(mainConfig)
      .then((result) => {
        return result.data;
      })
      .catch(showError);

    const object = Array.isArray(mainDataObject)
      ? mainDataObject[0]
      : mainDataObject;

    console.log(fields);
    if (object.id) {
      const mainTableFields = fields.mainTable.registerColumns;

      const dialogSelectCache = {};
      for (const [key, field] of Object.entries(mainTableFields)) {
        if (field.type === "DialogSelect" && field.options) {
          dialogSelectCache[key] = await filterCrud("", field.options.table);
        }
      }

      Object.entries(object).forEach((values) => {
        const [fieldKey, fieldValue] = values;
        if (!mainTableFields[fieldKey]) return;

        const field = mainTableFields[fieldKey];

        if (field.type === "DialogSelect") {
          if (
            fieldValue &&
            typeof fieldValue === "object" &&
            fieldValue[field.options.value]
          ) {
            field.model = {
              label: fieldValue[field.options.label],
              value: fieldValue[field.options.value],
            };
          } else if (
            fieldValue &&
            typeof fieldValue === "string" &&
            dialogSelectCache[fieldKey]
          ) {
            const found = dialogSelectCache[fieldKey].find(
              (item) => item[field.options.value] === fieldValue
            );
            if (found) {
              field.model = {
                label: found[field.options.label],
                value: found[field.options.value],
              };
            }
          }

          if (field.name === "plan") {
            field.readonly = field.model ? true : false;
          }
        } else if (field.type === "Date") {
          field.model = formatDateToString(fieldValue);
        } else {
          field.model = fieldValue;
        }
      });

      const planField = mainTableFields["plan"];
      if (planField && planField.type === "DialogSelect") {
        const planId = object.planId;
        planField.model = planId
          ? {
              label: planId[planField.options.label],
              value: planId[planField.options.value],
            }
          : null;
        planField.readonly = !!planId;
      }

      if (fields.childTable && fields.childTable.tableColumns) {
        fields.childTable.tableColumns.forEach((tableColumn) => {
          if (tableColumn.field.indexOf(".") > 0) {
            const key = tableColumn.field.substr(
              0,
              tableColumn.field.indexOf(".")
            );
            const value = tableColumn.field.substr(
              tableColumn.field.indexOf(".") + 1
            );

            tableColumn.field = key;

            console.log(object[fields.childTable.content]);

            object[fields.childTable.content].map((values) => {
              values[key] = values[key][value];
            });
          }
        });
      }

      if (fields.childTable && fields.childTable.tableColumns) {
        const dateColumns = fields.childTable.tableColumns.filter((column) => {
          return column.type === "date";
        });

        if (object[fields.childTable.content]) {
          object[fields.childTable.content].forEach((field) => {
            if (dateColumns) {
              dateColumns.forEach((col) => {
                field[col.name] = formatDateToString(field[col.name]);
              });
            }

            fields.childTable.tableData.push(field);
          });
        }
      }
    }
  } else {
    if (fields.childTable && fields.childTable.tableColumns) {
      fields.childTable.tableColumns.forEach((tableColumn) => {
        if (tableColumn.field.indexOf(".") > 0) {
          const key = tableColumn.field.substr(
            0,
            tableColumn.field.indexOf(".")
          );

          tableColumn.field = key;
        }
      });
    }
  }
}

export { openEditCrud };
