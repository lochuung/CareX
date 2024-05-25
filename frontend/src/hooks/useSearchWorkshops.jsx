import { useState, useEffect } from "react";

const useSearchWorkshops = (initialWorkshops) => {
  const [input, setInput] = useState("");
  const [workshopList, setWorkshopList] = useState(initialWorkshops);
  const debouncedSearchTerm = useDebounce(input, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const result = initialWorkshops.filter((workshop) =>
        workshop.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setWorkshopList(result);
    } else {
      setWorkshopList(initialWorkshops);
    }
  }, [debouncedSearchTerm, initialWorkshops]);

  return {
    input,
    setInput,
    workshopList,
  };
};

export default useSearchWorkshops;
