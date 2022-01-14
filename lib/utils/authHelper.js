

async function fetchAuth() {
  return await URLSearchParams
    .get(
      ''
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw new Error(err.message);
    });
}

module.exports = { fetchAuth };
