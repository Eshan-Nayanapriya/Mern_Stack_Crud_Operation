import React, {useEffect,useRef,useState} from 'react';
import { useReactToPrint } from 'react-to-print';
import NAV from "../nav/nav";
import axios from "axios";
import User from  '../User/User'

const URL = "http://Localhost:5000/users";

const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data);
}

function Users() {

    const [users, setUsers] = useState();
    useEffect(() =>{
        fetchHandler().then((data) => setUsers(data.users));
    },[])


    const ComponentsRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => ComponentsRef.current,
      DocumentTitle: "Users Report",
      onafterprint:() => alert("Users report downloaded"), 
    })


    const [searchQuery, setSearchQuery] = useState("");
    const [noResults, setNoResults] = useState(false);

    const handleSearch = () => {
      fetchHandler().then((data) => {
        const filteredUsers = data.users.filter((user) => 
        Object.values(user).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      ))
      setUsers(filteredUsers);
      setNoResults(filteredUsers.length === 0);
      });
    }

  return (
    <div>
      <NAV />
      <h1>user details display Page</h1>

      <input onChange={(e) => setSearchQuery(e.target.value)}//
      type='text'
      name='search'
      placeholder='Search Users Details'></input>

      <button onClick={handleSearch}>Search</button>

      {noResults ?(
        <div>
          <p>No Users Found</p>
          </div>
      ):(

///////////////////////////

      <div ref = {ComponentsRef}>
        {users && users.map((user, i) =>(
            <div key={i}>
                <User user = {user}/>
                </div>
        ))}
      </div>
      )}
      <button onClick={handlePrint}>Download report</button>
    </div>
    
  );
}

export default Users;
