const getDust = () => {
  const url =
    "http://openAPI.seoul.go.kr:8088/6b57516b6e6a616531303061426d5571/json/RealtimeCityAir/1/100/";
  fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data));
};
getDust();
