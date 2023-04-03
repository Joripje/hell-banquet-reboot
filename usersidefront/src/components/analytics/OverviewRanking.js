import { useState, useEffect } from "react";
import { getDailyRank } from "../../api/leftover";

function OverviewRanking() {
  const [result, setResult] = useState();

  useEffect(() => {
    const handleGetDailyRank = async () => {
      await getDailyRank(
        { userId: "ssafy" },
        (data) => {
          console.log(data);
          return data.data;
        },
        (err) => console.log(err)
      ).then((data) => setResult(data));
    };
    handleGetDailyRank();
  }, []);
  return <div>{result}</div>;
}

export default OverviewRanking;
