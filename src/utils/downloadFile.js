export const downloadFile = (blob, fileName) => {
  const url = window.URL.createObjectURL(new Blob([blob]));
  console.log(url);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  console.log(blob);
};

export const downloadFileFromUrl = async (url, fileName) => {
  fetch(url, {
    method: "get",
  })
    .then(async (res) => {
      const contentType = res.headers.get("Content-Type");
      const fileExtension = contentType ? contentType.split("/")[1] : "unknown";

      return {
        blob: await res.blob(),
        fileExtension: fileExtension,
      };
    })
    .then((data) => {
      const aElement = document.createElement("a");

      // Concatenando a extensão do arquivo ao nome
      const fullFileName = `${fileName}.${data.fileExtension}`;

      aElement.setAttribute("download", fullFileName);
      const href = URL.createObjectURL(data.blob);
      aElement.href = href;
      aElement.setAttribute("target", "_blank");
      aElement.click();
      URL.revokeObjectURL(href);
    });
};

export const downloadFileFromPublic = (fileName) => {
  const url = `${window.location.origin}/${fileName}`;

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
};
