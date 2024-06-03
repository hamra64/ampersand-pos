import { Fragment } from "react";

const EmptyState = ({ header, description, primaryAction, icon, imageUrl }) => {
  return (
    <>
      <div className="empty-state h-100 d-flex flex-column align-items-center flex-grow-1 text-center" style={{padding: "25% 0"}}>
        {imageUrl && <img src={imageUrl} alt="Empty State Icon" /> }
        {icon && <>{icon}</> }
        {header && <h1>{header}</h1>}
        {description && <p>{description}</p> }
        {primaryAction && <div className="actions">
         <>primaryAction</>
        </div>}
      </div>
    </>
  );
};

export default EmptyState;
