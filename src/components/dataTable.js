import React from "react";
import Table from "./common/table";
import { getData } from "../services/dataService";
import { CSVLink } from "react-csv";

const columns = [
  { key: "userId", label: "User Id" },
  { key: "id", label: "Id" },
  { key: "title", label: "Title" },
  { key: "body", label: "Body" },
];

const DataTable = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await getData();
        setData(response.data);
      } catch {
        alert("We are not able to ping the server right now");
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container">
      <Table data={data} columns={columns} />
      <button className="btn btn-warning print-btn">
        <CSVLink data={data} headers={columns} filename="test.xlsx">
          Export
        </CSVLink>
      </button>
    </div>
  );
};

export default DataTable;
