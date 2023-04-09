import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchPage() {
    const getProfile = useRef([]);
    const [display,setDisplay] = useState("none")
    const [inputValue, setinputValue] = useState("")
    const [changeValue, setChangeValue] = useState("")
    const [userInfo, setUserInfo] = useState([])
    const navigate = useNavigate();

    const handleValue = (event) => {
        setinputValue(event.target.value);
    }; 
    useEffect(() => {
      async function fetchUser() {
        try {
          const requestUrl = `https://api.github.com/search/users?q=${inputValue}`
          const response = await fetch(requestUrl);
          const responseJSON = await response.json();
          setUserInfo(responseJSON.items);
        } catch (error) {
          console.log("Failed")
        }
      }
      fetchUser();
    },[changeValue]);
    
    const handleBtn = () => {
        if (inputValue.length == 0) {
            alert("Please enter username!")
        } else {
            setChangeValue(inputValue)
            localStorage.setItem('myValue', inputValue); 
        }
        setDisplay("block")
    }  

  return (
    <div className="SearchPage w-full h-full">
        
      <div className="content mb-[20px] ">
        <img className=" w-[500px] h-[250px] mb-[20px] ml-[50px]" src="https://1000logos.net/wp-content/uploads/2021/05/GitHub-logo.png" alt="githublogo" />
        <h1 className="italic">GitHub Users SearchEngine</h1>
      </div>
      <div className="pt-[10px] pb-[20px]">
        <input type="text" value={inputValue} onChange={handleValue} className="border-2 border-slate-950 w-[300px] h-[50px] rounded-lg placeholder:italic pl-[5px]" placeholder="Type Username from Github"/>
        <button className=" bg-black text-white border-2 border-slate-950 ml-[10px] h-[50px]" onClick={handleBtn}>SEARCH</button>
        <hr color="black" className="h-[2px] mt-[20px]"/>
      </div>
      <ul className="userSearch">
        <p className="font-bold italic text-2xl" style={{display:display}}>Search Results</p>
            {userInfo?.map((x,index) => {
              return (
                <li
                  key={index}
                  className="flex justify-center items-center m-[10px]"
                >
                  <img src={x?.avatar_url}  className="w-[100px] h-[100px] border-2 border-slate-950 rounded-lg"></img>
                  <p id="pinsert" className=" m-2 font-bold text-2xl ">{x?.login}</p>
                  <button 
                    className="bg-black text-white border-2 border-slate-950 ml-[10px]" 
                    onClick={() => {navigate("/profile")}} 
                    ref={(element) => { getProfile.current[index] = element;}}>View Profile
                  </button>
              </li>
            );
          })} 
      </ul>
    </div>
  );
}
export default SearchPage;
