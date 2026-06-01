function formatDateToString(date) {
  if (!date || date === null || date === "") {
    return "";
  }

  let newDate = date.substr(0, 10);

  newDate = newDate.split("-");

  newDate = `${newDate[2]}/${newDate[1]}/${newDate[0]}`;

  return newDate;
}

function formatDateToStringMasked(date, mask) {
  let dateMasked = mask;
  let dateReference = new Date(date);

  if (mask.includes("dd")) {
    let dayDateReference = `0${dateReference.getDate().toString()}`;

    dayDateReference = dayDateReference.substring(dayDateReference.length - 2);

    dateMasked = dateMasked.replace("dd", dayDateReference);
  }

  if (mask.includes("mm")) {
    let monthDateReference = dateReference.getMonth() + 1;

    monthDateReference = `0${monthDateReference.toString()}`;

    monthDateReference = monthDateReference.substring(
      monthDateReference.length - 2
    );

    dateMasked = dateMasked.replace("mm", monthDateReference);
  }

  if (mask.includes("yyyy")) {
    let yearDateReference = dateReference.getFullYear().toString();

    yearDateReference = yearDateReference.substring(
      yearDateReference.length - 4
    );

    dateMasked = dateMasked.replace("yyyy", yearDateReference);
  }

  return dateMasked;
}

export const dateToString = (date) => {
  try {
    const newDate = new Date(date);
    const formatedDate = new Date(
      newDate.setMinutes(newDate.getMinutes() - -newDate.getTimezoneOffset())
    );
    return `${formatedDate.getDate().toString().padStart(2, "0")}/${(
      formatedDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${formatedDate.getFullYear()}`;
  } catch (error) {
    return date;
  }
};

function formatDateToStringWithHour(date) {
  console.log("Function formatDateToStringWithHour");
  try {
    const newDate = new Date(date);

    return newDate.toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    return date;
  }
}

function formatDateToStringMentoringWithHour(date) {
  console.log("Function formatDateToStringMentoringWithHour");
  try {
    const newDate = new Date(date);

    const formatted = newDate.toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return formatted;
  } catch (error) {
    return date;
  }
}

export {
  formatDateToString,
  formatDateToStringMasked,
  formatDateToStringWithHour,
  formatDateToStringMentoringWithHour,
};
