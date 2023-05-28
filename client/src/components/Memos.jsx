import { useState,useEffect } from "react";
import "./Memos.css"
const Memos=({state})=>{
    const [memos,setMemos]=useState([]);
    const {contract}=state;
    useEffect(()=>{
        const memosMessage = async()=>{
          const memos = await contract.getMemos();
          setMemos(memos.slice(22))
          //console.log(memos)
        }
        contract && memosMessage()
    },[contract])
    return (
        <div className="container-fluid">
        <h1 style={{ textAlign: "center", marginTop: "20px" }}>Chai Feedback</h1>
        <table style={{ width: "100%", borderCollapse: "collapse", }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Timestamp</th>
              <th style={tableHeaderStyle}>Name</th>
              <th style={tableHeaderStyle}>Message</th>
              <th style={tableHeaderStyle}>Transaction Hash</th>
            </tr>
          </thead>
          <tbody>
            {memos.map((memo, index) => (
              <tr key={index}>
                <td style={tableCellStyle}>
                  {new Date(memo.timestamp * 1000).toLocaleString()}
                </td>
                <td style={tableCellStyle}>{memo.name}</td>
                <td style={tableCellStyle}>{memo.message}</td>
                <td style={tableCellStyle}>{memo.from}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      );
}
export default Memos;
const tableHeaderStyle = {
  backgroundColor: "dodgerblue",
  border: "1px solid white",
  padding: "7px",
  width: "25%",
  color: "white",
};

const tableCellStyle = {
  backgroundColor: "lightblue",
  border: "1px solid white",
  padding: "7px",
  width: "25%",
};
