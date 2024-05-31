import React from "react";
import { Input } from "antd";
const { TextArea } = Input;
const App = ({ thought, setThought }) => (
  <>
    <div className="w-full">
      <div className="flex gap-2 items-center">
        <div className="py-4 text-xl font-bold">
          Just tell anything you want today
        </div>
        <span className="font-bold text-blue-500"> </span>
      </div>
      <TextArea
        value={thought}
        onChange={(e) => setThought(e.target.value)}
        rows={4}
      />
    </div>
  </>
);
export default App;
