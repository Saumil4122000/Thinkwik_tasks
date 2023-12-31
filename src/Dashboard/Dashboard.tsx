import { useAuth } from "../Core/AuthContext";
import css from "./Dashboard.module.css";
import { SortAndFilterTable } from "./Table";
import UserLogo from "../../assets/icons/book-list.svg?react";

export const Dashboard = () => {
  const { user } = useAuth();
  const { firstName, lastName } = user || {};

  return (
    <div>
      <div className={css.wrapper}>
        <div className={css["section-user-data"]}>
          <h1 className={css["user-heading"]}>
            Welcome {firstName} {lastName}
          </h1>
          <p className={css["user-paragraph"]}>To Book management system</p>
        </div>

        <div className={css["book-image"]}>
          <UserLogo className={css["book-svg"]} />
        </div>
      </div>
      <SortAndFilterTable />
    </div>
  );
};
