import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../../utils/constants";

const useLipsticks = (search) => {
  const [lipsticks, setLipsticks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let uri = `${url}/lipsticks`;
  if (search) {
    uri += `?search=${search}`;
  }

  const getLipsticks = () => {
    axios
      .get(uri)
      .then((res) => {
        const myLipsticks = res.data;
        setLipsticks(myLipsticks);
        // console.log(myLipsticks)
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => getLipsticks(), [search]);
  return [lipsticks, isLoading];
};

export default useLipsticks;
