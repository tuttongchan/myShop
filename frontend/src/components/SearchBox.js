import React, { useState } from 'react';

export default function SearchBox({ history, search, setSearch }) {
  const submitHandler = (e) => {
    e.preventDefault();
    history.push(`/products/${search}`);
  };

  console.log(search);

  return (
    <form
      onSubmit={submitHandler}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* <i className="fa-solid fa-xmark"></i> */}
      <div className="topbar-input-container">
        <input
          type="text"
          className="topbar-input"
          placeholder="Search product..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="topbar-input-button">
          <i className="fas fa-search"></i>
        </button>
      </div>
    </form>
  );
}
