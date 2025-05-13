const index = () => {
  res.render("index");
};

const registerGet = () => {
  res.render("registerGet");
};

module.exports = {
  index,
  registerGet,
};
