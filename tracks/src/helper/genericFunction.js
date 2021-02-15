export const speedConverter = (speed) => {
  return parseFloat(speed * 3.6).toFixed(2);
};

export const timeConverter = (timestamp) => {
  const a = new Date(timestamp);

  const year = a.getFullYear();
  let month = a.getMonth() + 1;
  const date = a.getDate();
  const hour = a.getHours();
  let min = a.getMinutes();
  if (month < 10) {
    month = `0${month}`;
  }
  if (min < 10) {
    min = `0${min}`;
  }
  const time = date + "/" + month + "/" + year + " " + hour + ":" + min;
  return time;
};

export const getAddressFromCoords = (latitude, longitude) => {
  return new Promise((resolve) => {
    const url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=IPBo-z9UPWKczGjY2dLBX4j7P6cbSc6IkG810cVAsXo&mode=retrieveAddresses&prox=${latitude},${longitude}`;
    fetch(url)
      .then((res) => res.json())
      .then((resJson) => {
        // the response had a deeply nested structure :/
        if (
          resJson &&
          resJson.Response &&
          resJson.Response.View &&
          resJson.Response.View[0] &&
          resJson.Response.View[0].Result &&
          resJson.Response.View[0].Result[0]
        ) {
          resolve(resJson.Response.View[0].Result[0].Location.Address.Label);
        } else {
          resolve();
        }
      })
      .catch((e) => {
        console.log("Error in getAddressFromCoordinates", e);
        resolve();
      });
  });
};
