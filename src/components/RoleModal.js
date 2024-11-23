import React, { useState, useEffect } from "react";
import "../App.css";
import "../styles/modal.css";

const RoleModal = ({
  show,
  onClose,
  onSave,
  currentRole,
  permissionOptions,
}) => {
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    if (currentRole) {
      setName(currentRole.name);
      setPermissions(currentRole.permissions);
    } else {
      setName("");
      setPermissions([]);
    }
  }, [currentRole]);

  const handlePermissionChange = (permission) => {
    if (permissions.includes(permission)) {
      setPermissions(permissions.filter((p) => p !== permission));
    } else {
      setPermissions([...permissions, permission]);
    }
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert("Role name is required");
      return;
    }
    onSave({ name, permissions });
  };

  if (!show) return null;

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {currentRole ? "Edit Role" : "Add Role"}
            </h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">Role Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Permissions</label>
                {permissionOptions.map((permission) => (
                  <div className="form-check" key={permission}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={permissions.includes(permission)}
                      onChange={() => handlePermissionChange(permission)}
                    />
                    <label className="form-check-label">{permission}</label>
                  </div>
                ))}
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleModal;
