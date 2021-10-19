import React, { Fragment, useState, useEffect } from "react";
import Table from "./components/Table";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";
import api from "./utils/api";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [detail, setDetail] = useState(null);


  useEffect(() => {
    Promise.all([api.get("users"), api.get("albums")]).then(
      ([users, albuns]) => {
        setUsers({users,albuns});
        users.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
        const items = users.map((item) => ({
          selected: true,
          name: item.name,
          phone: item.phone,
          website: item.website,
          city: item.address?.city,
          albuns: albuns.reduce(
            (total, { userId }) => (userId === item.id ? total + 1 : total),
            0
          ),
        }));
        setIsLoaded(true);
        setData(items);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    );
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Website",
        accessor: "website",
      },
      {
        Header: "City",
        accessor: "city",
      },
      {
        Header: "Number of available albuns",
        accessor: "albuns",
      },
    ],
    []
  );

 const setDetailUserHandler = (userId) =>{
   const user = users.users.find(({id}) => (id === +userId));
   const albuns = users.albuns.filter((item) => (item.userId === +userId));
   const detail={user,albuns}
   setDetail(detail)
 }


  return (
    <Fragment>
      <CssBaseline />
      {error && <p>Error: {error.message}</p>}
      {!isLoaded && <p>Loading...</p>}
      {isLoaded && data.length === 0 && <p>No Results</p>}
      {data.length > 0 && (
        <main>
          <Table
            data={data}
            columns={columns}
            setData={setData}
            detail={detail}
            setDetail={(id)=>setDetailUserHandler(id)}
          />
        </main>
      )}
    </Fragment>
  );
}

export default App;
