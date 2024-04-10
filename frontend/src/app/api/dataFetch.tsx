// // pages/database.tsx

// import { useEffect, useState } from "react";
// import mysql, {
//   Connection,
//   FieldPacket,
//   QueryError,
//   RowDataPacket,
// } from "mysql";

// interface SensorData {
//   column_name: string; // Replace with the actual type of your column
//   // Add more properties as needed based on your database schema
// }

// const DatabasePage: React.FC = () => {
//   const [databaseData, setDatabaseData] = useState<SensorData[]>([]);

//   useEffect(() => {
//     async function fetchData() {
//       // Create a MySQL connection
//       const connection: Connection = mysql.createConnection({
//         host: "localhost",
//         user: "root", // Replace with your MySQL username
//         password: "", // Replace with your MySQL password
//         database: "ce_project", // Replace with your database name
//       });

//       // Connect to the database
//       connection.connect();

//       // Execute a query
//       connection.query<RowDataPacket[]>(
//         "SELECT * FROM sensor_data",
//         (
//           error: QueryError | null,
//           results?: RowDataPacket[],
//           fields?: FieldPacket[]
//         ) => {
//           if (error) {
//             console.error("Error fetching data:", error);
//             return;
//           }

//           // Convert the row data to SensorData objects
//           if (results) {
//             const sensorData: SensorData[] = results.map((row) => ({
//               column_name: row.column_name, // Replace column_name with the actual property name
//               // Add more properties as needed based on your database schema
//             }));
//             setDatabaseData(sensorData);
//           }
//         }
//       );

//       // Close the connection
//       connection.end();
//     }

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>Database Data</h1>
//       <ul>
//         {databaseData.map((item, index) => (
//           <li key={index}>{item.column_name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default DatabasePage;
