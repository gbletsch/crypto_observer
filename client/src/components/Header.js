import React from "react";
import { Link } from "react-router-dom";
import { Logout } from "./Logout";

export const Header = () => {
  return (
    <div className="header">
      <div className="header__first_line">
        <Link className="header__link" to="/">
          <h2>Crypto Observer</h2>
        </Link>
        <Logout />
      </div>
      <div className="header__second_line">
        <Link className="header__link" to="/balance">
          <h4>Balance</h4>
        </Link>
        <Link className="header__link" to="/crops">
          <h4>Crops</h4>
        </Link>
      </div>
    </div>
  );
};
