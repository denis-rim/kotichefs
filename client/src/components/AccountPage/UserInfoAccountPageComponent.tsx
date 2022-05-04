import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { EditUserInput, editUserSchema } from "../../services/validation";

import { currentUserData } from "../../store/actions/UserActionCreators";

import Box from "../Layout/Box/Box";
import BoxInner from "../Layout/Box/BoxInner";
import Button from "../shared/Button";
import Spinner from "../Spinner/Spinner";

import styles from "./UserInfoAccountPageComponent.module.css";

const UserInfoAccountPageComponent = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.userReducer);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      fullName: user?.fullName || "",
      username: user?.username || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      photo_url: user?.photo_url || "",
      city: user?.city || "",
      about: user?.about || "",
    },
  });

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    dispatch(currentUserData());
  }, [dispatch]);

  function onSubmit(body: EditUserInput) {
    console.log(body);
  }

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
        <form onSubmit={handleSubmit(onSubmit)}>
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
                      <input id="user-avatar" type="file" />
                    </div>
                  </div>
                </div>
              </div>
              {/* User badge component */}
              <div className={styles.userBadgeContainer}>
                <span>{user.role}</span>
                {user.role === "chef" ? (
                  <span className={user.promoted ? styles.promoted : ""}>
                    {user.promoted ? "promoted" : "no promotion"}
                  </span>
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
                    id="full-name"
                    autoComplete="given-name"
                    {...register("fullName")}
                    disabled={true}
                  />
                </div>

                <div className={styles.inputContainer3}>
                  <label htmlFor="user-name">User name</label>
                  <input
                    type="text"
                    id="user-name"
                    autoComplete="family-name"
                    {...register("username")}
                    disabled={disabled}
                  />
                </div>

                <div className={styles.inputContainer3}>
                  <label htmlFor="email-address">Email</label>
                  <input
                    type="text"
                    id="email-address"
                    autoComplete="email"
                    {...register("email")}
                    disabled={disabled}
                  />
                </div>

                <div className={styles.inputContainer3}>
                  <label htmlFor="phone-number">Phone Number</label>
                  <input
                    type="text"
                    id="phone-number"
                    {...register("phone")}
                    disabled={disabled}
                  />
                </div>

                <div className={styles.inputContainer3}>
                  <label htmlFor="city">City</label>
                  <select
                    id="city"
                    autoComplete="city-name"
                    {...register("city")}
                    disabled={disabled}
                  >
                    <option>Helsinki</option>
                    <option>Espoo</option>
                    <option>Vanta</option>
                  </select>
                </div>

                <div className={styles.inputContainer4}>
                  <label htmlFor="street-address">Street address</label>
                  <input
                    type="text"
                    id="street-address"
                    autoComplete="street-address"
                    disabled={disabled}
                    {...register("address")}
                  />
                </div>

                <div className={styles.inputContainer4}>
                  <label htmlFor="about">About</label>
                  <div className="mt-1">
                    <textarea
                      rows={4}
                      id="about"
                      disabled={disabled}
                      {...register("about")}
                    />
                  </div>
                </div>
              </div>
            </BoxInner>
          </div>
          <BoxInner
            style={{
              textAlign: "right",
              backgroundColor: "hsl(210, 20%, 98%)",
            }}
          >
            {disabled ? (
              <Button
                style={{ display: "inline-flex", width: "unset" }}
                onClick={() => setDisabled(!disabled)}
                type="submit"
              >
                Edit
              </Button>
            ) : (
              <>
                <Button
                  appearance="secondary"
                  style={{ display: "inline-flex", width: "unset" }}
                >
                  Cancel
                </Button>
                <Button
                  appearance="primary"
                  type="submit"
                  style={{
                    display: "inline-flex",
                    width: "unset",
                    marginLeft: "1rem",
                  }}
                >
                  Save
                </Button>
              </>
            )}
          </BoxInner>
        </form>
      </Box>
    </div>
  );
};

export default UserInfoAccountPageComponent;
