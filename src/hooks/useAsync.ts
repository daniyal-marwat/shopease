import { useState } from "react";

function useAsync<T>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  async function run(promise: Promise<T>) {
    try {
      setSuccess(false);
      setData(null);
      setError(null);
      setLoading(true);
      const data = await promise;
      setData(data);
      setSuccess(true);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error(String(error)));
      }
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, run, data, success };
}
export { useAsync };
