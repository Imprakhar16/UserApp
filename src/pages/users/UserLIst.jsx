import React, { Suspense, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, removeUser } from "../../features/user/showUserSlice.js";
import CommonButton from "../../components/button.jsx";
import CommonTable from "../../components/table.jsx";
import { Toast } from "../../components/toastComponent.jsx";
import { CommonModal } from "../../components/modal.jsx";

import "./userList.css"; 
import { updateUser } from "../../features/user/fetchDetailSlice.js";

const userDetail = lazy(() => import("./userDetail.jsx"));

export const UserList = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [modalState, setModalState] = useState({
    show: false,
    type: "",
    user: null,
  });

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

  const handleDetails = (id) => {
    const userDetail = users.find((user) => user.id === id);
    setModalState({ show: true, type: "detail", user: userDetail });
  };

  const handleUpdate = (id) => {
    const userToUpdate = users.find((user) => user.id === id);
    setModalState({ show: true, type: "update", user: userToUpdate });
  };

  const handleDelete = (id) => {
    const userToDelete = users.find((user) => user.id === id);
    setModalState({ show: true, type: "delete", user: userToDelete });
  };

  const confirmDelete = async () => {
    try {
      await dispatch(removeUser(modalState.user.id));
      Toast("success", "User Deleted Successfully");
      setModalState({ show: false, user: null });
    } catch (error) {
      console.error("Error deleting user:", error);
      Toast("error", "Error deleting user");
    }
  };

  const handleModalClose = () => {
    setModalState({ show: false, type: "", user: null });
  };
  const tableHeaders = ["S.no", "Name", "Email", "Actions"];
  return (
    <div className="page-background">
      <div className="glass-container">
        <h2 className="mb-4">👤 User List</h2>

        <CommonTable
          headers={tableHeaders}
          loading={loading}
          className="glass-table"
        >
          {users && users.length > 0 ? (
            users.map((user, index) => (
              <tr
                key={user.id}
                onClick={() => handleDetails(user.id)}
                style={{ cursor: "pointer" }}
              >
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <CommonButton
                    onClick={() => handleDetails(user.id)}
                    className="btn btn-primary"
                    title="Details"
                  /> 
                  <CommonButton
                    onClick={(e) => (e.stopPropagation(), handleDelete(user.id))}
                    className=" btn btn-danger"
                    title="Delete"
                    style={{marginLeft:"10px"}}
                  />
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

        {/* pagination */}
        <nav aria-label="User list pagination">
          <ul className="pagination justify-content-center mt-4">
            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
              <CommonButton
                className="page-link glass-btn"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                title="Previous"
              />
            </li>
            <li className="page-item disabled">
              <span className="page-link text-white bg-transparent border-0">
                Page {page} of {totalPages}
              </span>
            </li>
            <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
              <CommonButton
                className="page-link glass-btn"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                title="Next"
              />
            </li>
          </ul>
        </nav>

        {/* Modals */}
        {modalState.show && modalState.user && (
          <>
            {modalState.type === "delete" ? (
              <CommonModal
                close={handleModalClose}
                modalTitle="Delete User"
                modalFooter={
                  <>
                    <CommonButton
                      title="Cancel"
                      className="glass-btn btn-secondary"
                      onClick={handleModalClose}
                    />
                    <CommonButton
                      title="Delete User"
                      className="glass-btn btn-danger"
                      onClick={confirmDelete}
                    />
                  </>
                }
              >
                <p>Are you sure you want to delete this user?</p>
              </CommonModal>
            ) : modalState.type === "detail" ? (
              <CommonModal
                style={{ display: "flex", justifyContent: "center" }}
                close={handleModalClose}
                modalTitle="User Detail"
                modalFooter={
                  <CommonButton
                    title="Update User"
                    className="btn btn-warning"
                    onClick={() => handleUpdate(modalState.user.id)}
                  />
                }
              >
                <Suspense fallback={<div>Loading user detail...</div>}>
                  <userDetail user={modalState.user} />
                </Suspense>
              </CommonModal>
            ) : (
              <CommonModal
              close={handleModalClose}
              modalTitle="Update User"
              modalFooter={null}
            >
              <form
  onSubmit={(e) => {
    e.preventDefault();
    const updatedUser = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    dispatch(updateUser({ id: modalState.user.id, formData: updatedUser }))
      .unwrap()
      .then(() => {
        Toast("success", "User updated successfully!");
        handleModalClose();
        fetchUsers(page);
      })
      .catch((err) => {
        Toast("error", err.message || "Failed to update user.");
      });
  }}
>
                <div className="mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={modalState.user.name}
                    className="form-control"
                    required
                  />
                </div>
            
                <div className="mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={modalState.user.email}
                    className="form-control"
                    disabled
                  />
                </div>
            
                <div className="mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter new password"
                  />
                </div>
            
                <div className="d-flex justify-content-end gap-2">
                  <CommonButton
                    type="button"
                    className="btn btn-secondary"
                    title="Cancel"
                    onClick={handleModalClose}
                  />
                  <CommonButton
                    type="submit"
                    className="btn btn-success"
                    title="Save Changes"
                  />
                </div>
              </form>
            </CommonModal>
            
            )}
          </>
        )}
      </div>
    </div>
  );
};
