import Axios from "axios";

export const getCoronaData = (key, year, month, day, day2) =>
  Axios.get(
    `http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=${key}&pageNo=1&numOfRows=10&startCreateDt=${year}${month}${day2}&endCreateDt=${year}${month}${day}`
  );
export const getIssue = () =>
  Axios.get(
    `http://apis.data.go.kr/1262000/SafetyNewsList/getCountrySafetyNewsList?serviceKey=OW%2B7pApxaWyA%2FMtp4h809DV8bN%2FTeDY%2B6RVsTr5ZsS4Peuz2gAmUOTBpsqyZc0ITRd%2FIyE5qor%2B2cCxo42moPQ%3D%3D&numOfRows=10&pageNo=1&title1=%EC%9E%85%EA%B5%AD&title2=%EC%BD%94%EB%A1%9C%EB%82%98&title3=%EC%9A%B4%ED%95%AD&title4=%ED%95%AD%EA%B3%B5%EA%B6%8C&title5=%EA%B2%A9%EB%A6%AC`
  );
