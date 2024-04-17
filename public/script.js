let dustdatas;

const PM10 = document.querySelector(".PM10");
const PM25 = document.querySelector(".PM25");
const O3 = document.querySelector(".O3");
const CO = document.querySelector(".CO");
const SO2 = document.querySelector(".SO2");
const NO2 = document.querySelector(".NO2");
const IDEX_NM = document.querySelector(".IDEX_NM");
const MSRDT = document.querySelector(".MSRDT");
const modalh1 = document.querySelector(".modal_text h1");

const getDust = () => {
  const url =
    "http://openAPI.seoul.go.kr:8088/6b57516b6e6a616531303061426d5571/json/RealtimeCityAir/1/100/";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      dustdatas = data.RealtimeCityAir.row;

      //
      let PM10Sum = 0;
      dustdatas
        .map((data) => data.PM10)
        .forEach((num) => {
          PM10Sum += num;
        });
      PM10.innerText = (PM10Sum / 25).toFixed(2);
      //
      let PM25Sum = 0;
      dustdatas
        .map((data) => data.PM25)
        .forEach((num) => {
          PM25Sum += num;
        });
      PM25.innerText = (PM25Sum / 25).toFixed(2);
      //
      let O3Sum = 0;
      dustdatas
        .map((data) => data.O3)
        .forEach((num) => {
          O3Sum += num;
        });
      O3.innerText = (O3Sum / 25).toFixed(4);
      //
      let SO2Sum = 0;
      dustdatas
        .map((data) => data.SO2)
        .forEach((num) => {
          SO2Sum += num;
        });
      SO2.innerText = (SO2Sum / 25).toFixed(4);
      //
      let COSum = 0;
      dustdatas
        .map((data) => data.CO)
        .forEach((num) => {
          COSum += num;
        });
      CO.innerText = (COSum / 25).toFixed(4);
      //
      let NO2Sum = 0;
      dustdatas
        .map((data) => data.NO2)
        .forEach((num) => {
          NO2Sum += num;
        });
      NO2.innerText = (NO2Sum / 25).toFixed(4);
      //

      // 등급에따른 색 및 사진 변화

      const infoH1 = document.querySelector(".info h1");
      const emoticon = document.querySelector(".emoticon");
      const average = document.querySelector(".average");
      const imgwrap = document.querySelector(".info_imgwrap");

      const countGoodAndBad = (array) => {
        let goodCount = 0;
        let badCount = 0;
        let realBadCount = 0;
        for (let item of array) {
          if (item === "좋음") {
            goodCount++;
          } else if (item === "나쁨") {
            badCount++;
          } else if (item === "매우나쁨") {
            realBadCount++;
          }
        }
        return { goodCount, badCount, realBadCount };
      };
      const displayResult = (array) => {
        const { goodCount, badCount, realBadCount } = countGoodAndBad(array);
        if (goodCount > badCount && goodCount > realBadCount) {
          IDEX_NM.innerText = "좋음";
          infoH1.innerText = "미세먼지 좋음";
          emoticon.src = "./src/good.png";
          average.style.color = "green";
          imgwrap.style.background = "rgba(0, 190, 0, 0.8)";
        } else if (badCount > goodCount && badCount > realBadCount) {
          IDEX_NM.innerText = "나쁨";
          infoH1.innerText = "미세먼지 나쁨";
          emoticon.src = "./src/mask.png";
          average.style.color = "#f00";
        } else if (realBadCount > goodCount && realBadCount > badCount) {
          IDEX_NM.innerText = "매우나쁨";
          infoH1.innerText = "미세먼지 매우나쁨";
          emoticon.src = "./src/mask.png";
          average.style.color = "#f00";
        } else {
          console.log("보통");
          IDEX_NM.innerText = "보통";
          infoH1.innerText = "미세먼지 보통";
          emoticon.src = "./src/good.png";
          average.style.color = "black";
        }
      };
      displayResult(dustdatas.map((data) => data.IDEX_NM));
      //날짜 치환
      const year = dustdatas[0].MSRDT.slice(0, 4);
      const month = dustdatas[0].MSRDT.slice(4, 6);
      const day = dustdatas[0].MSRDT.slice(6, 8);
      const hour = dustdatas[0].MSRDT.slice(8, 10);
      const minute = dustdatas[0].MSRDT.slice(10, 12);
      const formattedDate = `${year}-${month}-${day} ${hour}:${minute}`;
      MSRDT.innerText = formattedDate;
      //

      //지도 색 변경
      citys.forEach((city) => {
        dustdatas.forEach((dustdata) => {
          if (city.innerText === dustdata.MSRSTE_NM) {
            if (dustdata.IDEX_NM === "매우나쁨") {
              city.style.backgroundColor = "rgba(255,0,0,1)";
              city.style.color = "white";
            } else if (dustdata.IDEX_NM === "나쁨") {
              city.style.backgroundColor = "rgba(255,50,100,1)";
              city.style.color = "white";
            } else if (dustdata.IDEX_NM === "좋음") {
              city.style.backgroundColor = "rgba(0, 190, 0, 0.8)";
            } else if (dustdata.IDEX_NM === "") {
              city.style.backgroundColor = "black";
            } else if (dustdata.IDEX_NM === "보통") {
              city.style.backgroundColor = "skyblue";
            }
          }
        });
      });
      return dustdatas;
    });
};
getDust();

//모달창
const citys = document.querySelectorAll(".city");
const modal = document.querySelector(".modal");
const closebtn = document.querySelector("#close-btn");
let nowDate;
citys.forEach((city) => {
  city.addEventListener("click", () => {
    modal.style.display = "block";
    dustdatas.forEach((dustdata) => {
      if (city.innerText === dustdata.MSRSTE_NM) {
        const modal = document.querySelector(".modal");
        const PM10 = modal.querySelector(".PM10");
        const PM25 = modal.querySelector(".PM25");
        const O3 = modal.querySelector(".O3");
        const CO = modal.querySelector(".CO");
        const SO2 = modal.querySelector(".SO2");
        const NO2 = modal.querySelector(".NO2");
        const IDEX_NM = modal.querySelector(".IDEX_NM");
        const MSRDT = modal.querySelector(".MSRDT");
        const modalh1 = modal.querySelector(".modal_text h1");
        //시간 치환
        const year = dustdata.MSRDT.slice(0, 4);
        const month = dustdata.MSRDT.slice(4, 6);
        const day = dustdata.MSRDT.slice(6, 8);
        const hour = dustdata.MSRDT.slice(8, 10);
        const minute = dustdata.MSRDT.slice(10, 12);
        const formattedDate = `${year}-${month}-${day} ${hour}:${minute}`;

        modalh1.innerText = dustdata.MSRSTE_NM + " " + "대기환경 현황";
        PM10.innerText = dustdata.PM10;
        PM25.innerText = dustdata.PM25;
        O3.innerText = dustdata.O3;
        SO2.innerText = dustdata.SO2;
        CO.innerText = dustdata.CO;
        NO2.innerText = dustdata.NO2;
        IDEX_NM.innerText = dustdata.IDEX_NM;
        MSRDT.innerText = formattedDate;
      }
    });
  });
});

//모달창 closeBTN
closebtn.addEventListener("click", () => {
  modal.style.display = "none";
});
