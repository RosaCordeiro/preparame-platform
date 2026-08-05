import axios from "axios";
import { baseApiUrl, showError } from "../../../../global";
import { urlQueryBuilder } from "./../../../../utils/urlQueryBuilder.js";

async function filterCrud(filters, url, columns, headers = {}) {
  url = urlQueryBuilder(url, filters);

  const config = {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      ...headers,
    },
  };

  const result = await axios
    .get(`${baseApiUrl}${url}`, config)
    .catch(showError);

  if (columns && columns.length > 0) {
    columns.forEach((column) => {
      if (typeof column.field !== "string") {
        return;
      }

      if (column.field.indexOf(".") > 0) {
        const key = column.field.substr(0, column.field.indexOf("."));
        const value = column.field.substr(column.field.indexOf(".") + 1);

        result.data.map((values) => {
          if (values[key]) {
            values[column.field] = values[key][value];
          }
        });
      }
    });
  }

  return result.data;
}

export { filterCrud };
