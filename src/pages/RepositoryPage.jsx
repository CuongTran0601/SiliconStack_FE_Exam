import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function RepositoryPage() {
  const navigate = useNavigate();
  const token = "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"
  const [myValue, setMyValue] = useState('');
  const [commits, setCommits] = useState([]);
  
  //Lay ten nguoi dung
  useEffect(() => {
    const storedValue = localStorage.getItem('myValue');
    if (storedValue) {
      setMyValue(storedValue);
      // setGetData(prev => prev + 1)
    }
  });

  useEffect(() => {
    async function fetchComits() {
      try {        
        const response = await fetch(`https://api.github.com/users/${myValue}/events`,{
          headers: {
            Authorization: `token ${token}`
          }
        });
        const data = await response.json();
        const commitEvents = data.filter(event => event.type === 'PushEvent').slice(0, 10);
        const commitPromises = commitEvents.map(event => fetch(`https://api.github.com/repos/${event.repo.name}/commits/${event.payload.commits[0].sha}`, {
          headers: {
            Authorization: `token ${token}`
          }
        }));
        const commitResponses = await Promise.all(commitPromises);
        const commitData = await Promise.all(commitResponses.map(response => response.json()));
        setCommits(commitData);
      } catch (error) {
        console.error("Failed")
      }
    }
    fetchComits();
  }, [myValue]);
  return (
    <div className="">
      <div className="mb-[10px]">
        <h1 className="italic font-bold text-cyan-500 mb-[10px]">User Recent 10 Commits</h1>
        <p className="italic text-2xl">(CLick Commit Messgae to view commit on github.com)</p>
      </div>
      <div className=" bg-slate-100">
        <ul className="text-2xl ">
          {commits.map((commit,index) => (
            <li  key={commit?.sha} className="text-left border-2 border-slate-950 m-[10px] rounded-lg p-[10px]">
              <p><span className="font-bold">Commit: </span> {index+1}</p>
              <p><span className="font-bold">Author:</span> {commit.commit.author.name}</p>
              <a className="" href={commit?.html_url} target="_blank" rel="noopener noreferrer">
                <span className="text-black font-bold">Commit message: </span>
                {commit?.commit?.message}
              </a>
              <p><span className="font-bold">Commit ID:</span>{commit.sha}</p>
            </li>
          ))}
        </ul>
      </div>      
    </div>

  );
}

export default RepositoryPage;
