import "./styles.css"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import JSONDATA from './MOCK_DATA.json';
import * as XLSX from "xlsx";
function App() {
  const [searchTerm, setSearchTerm] = useState(''); //For search bar
  const [items, setItems] = useState([]);
//Reading an excel file
 const readExcel = (file)=>{
  const promise = new Promise((resolve, reject)=>{

    const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e)=>{
          const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, {type: 'buffer'});
        const wsName = wb.SheetNames[0];
        const ws = wb.Sheets[wsName];
        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };
      fileReader.onerror = ((error)=>{
        reject(error);
      })
  });

  promise.then((d)=>{
    setItems(d);
  });
  
  };


//Search bar function and file uploader function
  return (
    <div className="App">
        <form >
          <h1>Resume Uploader</h1>
         
          <input type="file" onChange={(e)=>{
            const file = e.target.files[0];

              readExcel(file);
          }}/>
          <table class="table container">
  <thead>
    <tr>
      <th scope="col">FirstName</th>
      <th scope="col">LastName</th>
      <th scope="col">Skill</th>
    </tr>
  </thead>
  <tbody>
    {
      items.map((d)=>(
    <tr key={d.FirstName}>
      <td> {d.FirstName}</td>
      <td>{d.LastName}</td>
      <td>{d.Skill}</td>
    </tr>
    
      ))
    }
    
  
  </tbody>
</table>
          <button >Submit</button>
         
          <div className="search">
          <br></br>
            <input type="text" placeholder="Search..." 
            onChange={event => 
            {setSearchTerm(event.target.value)
            }}/>
            {JSONDATA.filter((val)=>{
              if(searchTerm == ""){
                return val
              }else if(val.skill.toLowerCase().includes(searchTerm.toLowerCase())){
                  return val
              }
            }).map((val, key) =>{
              return <div className="user" key={key}>
                <p>{val.skill} </p>
              </div>;
            }
            
            )}
            
          </div>
        </form>
    </div>
   
  );
}

export default App;