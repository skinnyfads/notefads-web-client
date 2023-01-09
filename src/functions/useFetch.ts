import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = <ResponseType>(url: string) => {
  const [data, setData] = useState<ResponseType>();
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get<ResponseType>(url, { signal: controller.signal })
      .then((res) => {
        setData(res.data);
      })

      .catch((err: Error) => {
        if (err.name !== "CanceledError") {
          console.log("error from usefetch", err);
          setError(err);
        }
      });
    return () => {
      controller.abort();
    };
  }, [url]);

  return { error, data };
};

export default useFetch;
