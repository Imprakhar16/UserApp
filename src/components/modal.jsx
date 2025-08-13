import CommonButton from "./button";

export const CommonModal = ({ children, close, modalTitle, modalFooter,style ,modalBackground}) => {
  return (
    <div
      className="modal show fade d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content" style={modalBackground}>
          <div className="modal-header">
            <h5 className="modal-title">{modalTitle}</h5>
            <CommonButton
              type="button"
              className="btn-close"
              onClick={() => close(false)}
            />
          </div>
          <div className="modal-body">{children}</div>

          {modalFooter && <div className="modal-footer" style={style}>{modalFooter}</div>}
        </div>
      </div>
    </div>
  );
};
