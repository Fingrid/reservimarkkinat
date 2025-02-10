"use client";
import React from "react";
import { Facebook, Footer as FingridFooter, Instagram, Linkedin, Rss, Twitter } from "@fingrid/design-system-components";
import type { FC } from "react";

export const Footer: FC = () => {
  return (
    <FingridFooter
      bottomLinks={[
        <a href=".">Legal</a>,
        <a href=".">Terms and conditions</a>,
        <a href=".">Cookies</a>,
        <a href=".">Feedback</a>,
      ]}
      sections={[
        {
          heading: "Fingrid",
          links: [
            <a href=".">Fingrid.fi</a>,
            <a href=".">Yhtiö</a>,
            <a href=".">Ajankohtaista</a>,
          ],
        },
        {
          heading: "Extranet-palvelut",
          links: [
            <a href=".">Alkuperätakuut</a>,
            <a href=".">Sähkönsiirto</a>,
            <a href=".">Laskutus- ja taseselvitystieto</a>,
            <a href=".">Laatutiedot</a>,
          ],
        },
        {
          heading: "Lisätiedot",
          links: [
            <a href=".">Kantaverkon kehittäminen</a>,
            <a href=".">Ohjeet</a>,
            <a href=".">Tietosuoja</a>,
          ],
        },
        {
          heading: "",
          links: [
            <a href=".">Apua ja ohjeita</a>,
            <a href=".">Yhteystiedot</a>,
            <div
              style={{ alignItems: "flex-start", display: "flex", gap: "16px" }}
            >
              <a href=".">
                <Facebook height={40} width={40} />
              </a>
              <a href=".">
                <Twitter height={40} width={40} />
              </a>
              <a href=".">
                <Instagram height={40} width={40} />
              </a>
              <a href=".">
                <Linkedin height={40} width={40} />
              </a>
              <a href=".">
                <Rss height={40} width={40} />
              </a>
            </div>,
          ],
        },
      ]}
    />
  );
};
