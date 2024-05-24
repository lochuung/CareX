import React, { useEffect, useState } from "react";
import DefaultLayout from "../layouts/DefaultLayout";

const Workshop = () => {
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const data = [...new Array(10000)];
    setState(data);

    setLoading(false);
  }, []);
  return (
    <DefaultLayout>
      <div className="">
        {loading && <div className="bg-red-400">Loading...</div>}
        {state?.map((item) => (
          <div className="bg-red-400">hello</div>
        ))}
      </div>
    </DefaultLayout>
  );
};

export default Workshop;
