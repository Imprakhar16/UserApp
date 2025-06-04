import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../helper/axiosInterceptor";
import API_PATHS from "../../service/apiPath";
import { userServices } from "../../service/userServices";

export const UserList = ({ onSignOut }) => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUsers = async (pageNumber) => {
    setLoading(true);
    try {
      const result = await userServices.userFetch(pageNumber, pageSize);

      const users = result.data;
      const total = result.totalRecords;
      setUsers(users);
      setTotalUsers(total);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const totalPages = Math.ceil(totalUsers / pageSize);

  const handleDetails = (i) => {
    const user = users[i];
    const id = user.id;
    navigate(`user/${id}`);
  };

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    onSignOut("");
  };

  const handleDelete = async (i) => {
    const user = users[i];
    const id = user.id;
    try {
      await axiosInstance.delete(`${API_PATHS.DELETE_USER}/${id}`);

      fetchUsers(page);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">User List</h2>
      <button
        style={{ float: "right", marginBottom: "30px" }}
        className="btn btn-outline-info"
        onClick={handleSignOut}
      >
        Sign Out
      </button>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <table className="table table-bordered table-striped table-hover">
            <thead className="table-primary">
              <tr>
                <th>S.No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <button
                        onClick={() => handleDetails(index)}
                        className="btn btn-primary me-2"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <nav aria-label="User list pagination">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  Previous
                </button>
              </li>
              <li className="page-item disabled">
                <span className="page-link">
                  Page {page} of {totalPages}
                </span>
              </li>
              <li
                className={`page-item ${page === totalPages ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};
