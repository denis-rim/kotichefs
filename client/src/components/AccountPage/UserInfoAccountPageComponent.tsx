import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

import Box from "../Layout/Box/Box";
import BoxInner from "../Layout/Box/BoxInner";
import Button from "../shared/Button";

import styles from "./UserInfoAccountPageComponent.module.css";
import { currentUserData } from "../../store/actions/UserActionCreators";
import Spinner from "../Spinner/Spinner";

const UserInfoAccountPageComponent = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.userReducer);

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    dispatch(currentUserData());
  }, [dispatch]);

  if (isLoading) {
    return (
      <Box>
        <Spinner />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box>
        <BoxInner>
          <h1>User not found</h1>
        </BoxInner>
      </Box>
    );
  }

  return (
    <div>
      <Box>
        <form>
          <div className={styles.accountContainer}>
            {/* User avatar section */}
            <BoxInner
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <label htmlFor="avatar" className={styles.label}>
                  Photo
                </label>
                <div className={styles.avatarContainer}>
                  <img src={user?.photo_url} alt={`${user?.fullName} avatar`} />
                  <div className={styles.avatarContent}>
                    <div className={styles.avatarWrapper}>
                      <label htmlFor="user-avatar">
                        {user?.photo_url ? "Change" : "Upload"}
                      </label>
                      <input id="user-avatar" name="user-avatar" type="file" />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <span>{user.role}</span>
                {user.role === "chef" ? (
                  <span>{user.promoted ? "promoted" : "no promotion"}</span>
                ) : (
                  ""
                )}
                <span>{user.rating}</span>
              </div>
            </BoxInner>

            {/* User information section */}
            <BoxInner>
              {/* Personal information form */}
              <div>
                <h3>Personal information</h3>
                <p>
                  This information will be displayed publicly so be careful what
                  you share.
                </p>
              </div>

              {/* Personal information section */}
              <div className={styles.personalInformationContainer}>
                <div className={styles.inputContainer3}>
                  <label htmlFor="full-name">Full name</label>
                  <input
                    type="text"
                    name="full-name"
                    id="full-name"
                    autoComplete="given-name"
                    defaultValue={user?.fullName}
                    disabled={disabled}
                  />
                </div>

                <div className={styles.inputContainer3}>
                  <label htmlFor="user-name">User name</label>
                  <input
                    type="text"
                    name="user-name"
                    id="user-name"
                    autoComplete="family-name"
                    defaultValue={user?.username}
                    disabled={disabled}
                  />
                </div>

                <div className={styles.inputContainer3}>
                  <label htmlFor="email-address">Email</label>
                  <input
                    type="text"
                    name="email-address"
                    id="email-address"
                    autoComplete="email"
                    defaultValue={user?.email}
                    disabled={disabled}
                  />
                </div>

                <div className={styles.inputContainer3}>
                  <label htmlFor="phone-number">Phone Number</label>
                  <input
                    type="text"
                    name="phone-number"
                    id="phone-number"
                    className=""
                    placeholder="+358 (44) 987-6543"
                    defaultValue={user?.phone}
                    disabled={disabled}
                  />
                </div>

                <div className={styles.inputContainer3}>
                  <label htmlFor="city">City</label>
                  <select
                    id="city"
                    name="city"
                    autoComplete="city-name"
                    defaultValue={user?.city}
                    disabled={disabled}
                    className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option>Helsinki</option>
                    <option>Espoo</option>
                    <option>Vanta</option>
                  </select>
                </div>

                <div className={styles.inputContainer4}>
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Street address
                  </label>
                  <input
                    type="text"
                    name="street-address"
                    id="street-address"
                    autoComplete="street-address"
                    defaultValue={user?.address}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div className={styles.inputContainer4}>
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700"
                  >
                    About
                  </label>
                  <div className="mt-1">
                    <textarea
                      rows={4}
                      name="about"
                      id="about"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      defaultValue={user?.about}
                    />
                  </div>
                </div>
              </div>
            </BoxInner>
          </div>
        </form>

        <BoxInner
          style={{
            textAlign: "right",
            backgroundColor: "hsl(210, 20%, 98%)",
          }}
        >
          <Button
            style={{ display: "inline-flex", width: "unset" }}
            onClick={() => setDisabled(!disabled)}
          >
            Edit
          </Button>
        </BoxInner>
      </Box>
    </div>
  );
};

export default UserInfoAccountPageComponent;
