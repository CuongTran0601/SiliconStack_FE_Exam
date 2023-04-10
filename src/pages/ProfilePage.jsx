import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainPage from "./MainPage";

function ProfilePage() {
  const navigate = useNavigate();
  const [myValue, setMyValue] = useState('');
  const [userProfile, setUserProfile] = useState([]);
  const [userStared, setUserStared] = useState(0);
  const [userIssue, setUserIssue] = useState(0);
  const token = "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"

  //Lay ten nguoi dung
  useEffect(() => {
    const storedValue = localStorage.getItem('myValue');
    if (storedValue) {
      setMyValue(storedValue);
      // setGetData(prev => prev + 1)
    }
  });

  //Lấy tên và description
  useEffect(() => {
    async function fetchUserProfile() {
      try {        
        const response = await fetch(`https://api.github.com/users/${myValue}`,{
          headers: {
            Authorization: `token ${token}`
          }
        });
        const data = await response.json();
        setUserProfile(data);
      } catch (error) {
        console.error("Failed")
      }
    }
    fetchUserProfile();
  });


  //Lấy tổng số sao
  useEffect(() => {
    async function fetchUserStar() {
      try {
        const response = await fetch(`https://api.github.com/users/${myValue}/starred`,{
          headers: {
            Authorization: `token ${token}`
          }
        });
        const data = await response.json();
        const starCount = data?.reduce((acc, repo) => acc + repo.stargazers_count, 0);
        setUserStared(starCount);
      } catch (error) {
        console.error("Failed")
      }
    }
    fetchUserStar();
  },[myValue]);

  //Lấy số vấn đề
  useEffect(() => {
    async function fetchUserIssue() {
      try {
        const response = await fetch(`https://api.github.com/search/issues?q=author:${myValue}`,{
          headers: {
            Authorization: `token ${token}`
          }
        });
        const data = await response.json();
        setUserIssue(data.total_count);
      } catch (error) {
        console.error("Failed")
      }
    }
    fetchUserIssue();
  },[myValue]);
  return (
    <div>
      <h1 className="italic font-bold text-cyan-500 mb-[10px]">User Profile</h1>
      
      <div className="text-left text-2xl border-2 border-slate-950 m-[10px] rounded-lg p-[10px] bg-slate-100">
        <p>
          <span className="font-bold">Username: </span> 
          {userProfile.login}
        </p>
        <p className="">
          <span className="font-bold">Name: </span> 
          {userProfile?.name}
        </p>
        <p>
          <span className="font-bold">Description: </span> 
          {userProfile?.bio}
        </p>
        <p>
          <span className="font-bold">Stars Number: </span>
          {userStared} 
        </p>
        <p>
          <span className="font-bold">Issues Number: </span> 
          {userIssue} 
        </p>
      </div>
      <div>
        <button className="border-2 border-slate-950 m-[10px] bg-red-300 hover:bg-violet-600" onClick={() => navigate("/repository")}>Go to RepositoryPage</button>      
      </div>
    </div>

  );
}
export default ProfilePage;
