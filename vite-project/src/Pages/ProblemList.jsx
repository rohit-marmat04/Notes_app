import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ProblemList() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/problems")
      .then(res => {
        console.log("ApI response : ", res.data);
        setProblems(res.data.data);
  })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Problem List</h1>
      <ul>
        {problems.map(p => (
          <li key={p._id}>
            <Link to={`/problems/${p._id}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}