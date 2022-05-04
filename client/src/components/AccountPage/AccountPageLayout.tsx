import React from "react";
import { Link, Outlet } from "react-router-dom";

import {
  CreditCardIcon,
  KeyIcon,
  UserCircleIcon,
  UserGroupIcon,
  ViewGridAddIcon,
} from "@heroicons/react/outline";

import styles from "./AccountPageLayout.module.css";

const navigation = [
  { name: "Account", href: "", icon: UserCircleIcon, current: true },
  { name: "Password", href: "password", icon: KeyIcon, current: false },
  {
    name: "Plan & Billing",
    href: "billing",
    icon: CreditCardIcon,
    current: false,
  },
  { name: "Orders", href: "orders", icon: UserGroupIcon, current: false },
  {
    name: "My Products",
    href: "my-products",
    icon: ViewGridAddIcon,
    current: false,
  },
  {
    name: "Add product",
    href: "create",
    icon: ViewGridAddIcon,
    current: false,
  },
];

function AccountPageLayout() {
  return (
    <div className={styles.container}>
      {/* Navigation */}
      <aside>
        <nav>
          {navigation.map((item) => (
            <Link to={item.href} key={item.name} className={styles.navLink}>
              <item.icon className={styles.icon} />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>
      {/* User data */}
      <div className={styles.contentContainer}>
        <Outlet />
      </div>
    </div>
  );
}

export default AccountPageLayout;
