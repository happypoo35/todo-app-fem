const Filters = ({ status, setStatus }) => {
  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div className="filters" onChange={handleStatus}>
      <input
        type="radio"
        name="filter"
        id="filterAll"
        className="radio"
        value="all"
        defaultChecked={status === "all"}
      />
      <label htmlFor="filterAll" className="filter">
        All
      </label>
      <input
        type="radio"
        name="filter"
        id="filterActive"
        className="radio"
        value="active"
        defaultChecked={status === "active"}
      />
      <label htmlFor="filterActive" className="filter">
        Active
      </label>
      <input
        type="radio"
        name="filter"
        id="filterCompleted"
        className="radio"
        value="completed"
        defaultChecked={status === "completed"}
      />
      <label htmlFor="filterCompleted" className="filter">
        Completed
      </label>
    </div>
  );
};

export default Filters;
