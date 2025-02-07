"use client";
import React from "react";
import { Header as FingridHeader } from "@fingrid/design-system-components";
import type { FC } from "react";

export const Header: FC = () => {
  return (
    <FingridHeader
      announcementsOnPress={function Zi() {}}
      className=""
      languageOnChange={function Zi() {}}
      languages={[]}
      hideAnnouncements={true}
      hideServices={true}
      nameOfTheService="Developer Portal"
      selectedLocale="fi-FI"
      user={{
        initials: "+",
        name: "Login",
      }}
    />
  );
};
