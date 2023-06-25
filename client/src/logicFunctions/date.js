exports.getDate = function () {
  const today = new Date();
  let option = {
    year: "numeric",
    day: "numeric",
    month: "long",
  };

  return today.toLocaleDateString("en-UK", option);
};

exports.getDay = function () {
  const today = new Date();
  let option = {
    weekday: "long",
  };
  return today.toLocaleDateString("en-UK", option);
};

exports.findDateString = function (numericDate) {
  const year = numericDate.slice(0, 4);
  const month =
    numericDate.slice(5, 6) + String(Number(numericDate.slice(6, 7)) - 1);
  const dayNum = numericDate.slice(8, 10);
  const event = new Date(Date.UTC(year, month, dayNum));
  const optionsDate = { year: "numeric", month: "long", day: "numeric" };
  const optionsDay = { weekday: "long" };
  const date = event.toLocaleDateString("en-UK", optionsDate);
  const day = event.toLocaleDateString("en-UK", optionsDay);
  return { date: date, day: day };
};

exports.numericDate = function (dateString) {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;

  return today;
};
