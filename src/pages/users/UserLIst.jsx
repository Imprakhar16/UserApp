import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, removeUser } from "../../features/user/showUserSlice";
import CommonButton from "../../components/button";
import CommonTable from "../../components/table";
import { Toast } from "../../components/toastComponent";

export const UserList = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users, totalUsers, loading } = useSelector((state) => state.getUsers);

  const fetchUsers = async (pageNumber) => {
    try {
      await dispatch(fetchUser({ pageNumber, pageSize }));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const totalPages = Math.ceil(totalUsers / pageSize);

  const handleDetails = (i) => {
    const user = users[i];
    const id = user.id;
    navigate(`/user/${id}`);
  };

  const handleDelete = async (i) => {
    const user = users[i];
    const id = user.id;

    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      try {
        await dispatch(removeUser(id));
        fetchUsers(page);
        Toast("success", "User Deleted Successfully");
      } catch (error) {
        console.error("Error deleting user:", error);
        Toast("error", "Error deleting user");
      }
    }
  };

  return (
    <div className="container mt-4" style={{ paddingTop: '90px', paddingLeft: '20px' }}>
      <h2 className="mb-4">👤User List</h2>

      <CommonTable headers={["S.no", "Name", "Email", "Actions"]} loading={loading}>
        {loading ? (
          <tr>
            <td colSpan="4" className="text-center">
              Loading users...
            </td>
          </tr>
        ) : users && users.length > 0 ? (
          users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <CommonButton onClick={() => handleDetails(index)} className="btn btn-primary me-2" title="Details"></CommonButton>
                <CommonButton title="Delete" onClick={() => handleDelete(index)} className="btn btn-danger"></CommonButton>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center">
              No users available.
            </td>
          </tr>
        )}
      </CommonTable>

      <nav aria-label="User list pagination">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <CommonButton
              className="page-link"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              title="Previous"
            ></CommonButton>
          </li>
          <li className="page-item disabled">
            <span className="page-link">
              Page {page} of {totalPages}
            </span>
          </li>
          <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
            <CommonButton
              className="page-link"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              title="Next"
            ></CommonButton>
          </li>
        </ul>
      </nav>
    </div>
  );
};
