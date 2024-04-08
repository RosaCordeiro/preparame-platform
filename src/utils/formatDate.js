function formatDateToString(date) {
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
  console.log("dateeeee", date);

  const newDate = new Date(date);

  console.log("newDate", newDate);

  const formatedDate = new Date(
    newDate.setMinutes(newDate.getMinutes() + newDate.getTimezoneOffset())
  );

  console.log("formatedDate", formatedDate);

  const day = formatedDate.getDate().toString().padStart(2, "0");
  const month = (formatedDate.getMonth() + 1).toString().padStart(2, "0");
  const year = formatedDate.getFullYear().toString().padStart(4, "0");
  const hour = formatedDate.getHours().toString().padStart(2, "0");
  const minute = formatedDate.getMinutes().toString().padStart(2, "0");

  return `${day}/${month}/${year}, ${hour}:${minute}`;
}

function formatDateToStringMentoringWithHour(date) {
  console.log("dateeeee", date);

  const newDate = new Date(date);

  console.log("newDate", newDate);

  const day = newDate.getDate().toString().padStart(2, "0");
  const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
  const year = newDate.getFullYear().toString().padStart(4, "0");
  const hour = newDate.getHours().toString().padStart(2, "0");
  const minute = newDate.getMinutes().toString().padStart(2, "0");

  return `${day}/${month}/${year}, ${hour}:${minute}`;
}

export {
  formatDateToString,
  formatDateToStringMasked,
  formatDateToStringWithHour,
  formatDateToStringMentoringWithHour,
};
