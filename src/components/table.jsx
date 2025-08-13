import React from "react";
import { Loader } from "./loader";

const CommonTable = ({ headers, children, loading }) => {
  return (
    <table className="table table-bordered table-striped table-hover">
      <thead className="table-primary">
        <tr>
          {headers.map((head, i) => (
            <th key={i}>{head}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td className="text-center" colSpan={`${headers.length}`}>
             <Loader className={"d-flex justify-content-center text-secondary"} size="3rem"/>
            </td>
          </tr>
        ) : children.length === 0 ? (
          <tr>
            <td colSpan="4" className="text-center">
              No users found.
            </td>
          </tr>
        ) : (
          children
        )}
      </tbody>
    </table>
  );
};

export default CommonTable;
