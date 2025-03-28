"use client";
import React from "react";
import { Facebook, Footer as FingridFooter, Instagram, Linkedin, Rss, Twitter } from "@fingrid/design-system-components";
import { labGrotesqueWeb } from "@/fonts";
import type { FC } from "react";

export const Footer: FC = () => {
  return (
    <FingridFooter
      className={labGrotesqueWeb.className}
      bottomLinks={[
        <a href="https://www.fingrid.fi/tietosuojaselosteet/">Privacy Statement</a>,
        <a href="https://www.fingrid.fi/globalassets/dokumentit/fi/tietosuojaselosteet/saavutettavuusseloste3-palvelut.datahub.fi.pdf">Accessibility Statement</a>,
        <a href="https://www.fingrid.fi/kayttoehdot/">Terms and Conditions</a>,
        <a href="https://www.fingrid.fi/en/cookies/">Cookies</a>,
        <a href="https://www.fingrid.fi/en/pages/contacts/feedback/">Feedback</a>,
      ]}
      sections={[
        {
          heading: "Fingrid",
          links: [
            <a href="https://www.fingrid.fi/">Fingrid.fi</a>,
            <a href="https://www.fingrid.fi/sivut/yhtio/esittely/">About Us</a>,
            <a href="https://www.fingrid.fi/sivut/ajankohtaista/tiedotteet/?tag=3467">News</a>,
          ],
        },
        {
          heading: "Extranet services",
          links: [
            <a href="https://go.finextra.fi/">Guarantees of Origin</a>,
            <a href="https://ekstra.fingrid.fi/">Grid Services</a>,
            <a href="https://energiaselvitys.fingrid.fi/">Invoice measurement and balance settlement</a>,
            <a href="https://webamr.rejlers.fi/laatutieto/app">Quality</a>,
            <a href="https://ekstra.fingrid.fi/">Projects</a>,
            <a href="https://turvailmo.fingrid.fi/">Safety Declaration</a>,
            <a href="https://portal.nordsafety.com/account/login">Safety Audits</a>,
          ],
        },
        {
          heading: "Additional Information",
          links: [
            <a href="https://www.fingrid.fi/kantaverkko/kehittaminen">Electricity Network Planning</a>,
            <a href="https://www.fingrid.fi/tietosuojaselosteet">Privacy Statement</a>,
            <a href="https://www.fingrid.fi/sivut/ajankohtaista/tiedotteet/?tag=3464">Disturbances</a>,
            <a href="https://www.fingrid.fi/kantaverkko/turvallisuus">Safety</a>,
            <a href="https://www.finlex.fi/fi/laki/ajantasa/2013/20130588">Electricity Market Act</a>,
            <a href="https://www.fingrid.fi/sahkomarkkinat/markkinoiden-yhtenaisyys/eurooppa-yhteistyo/eic-koodit">EIC Codes</a>,
          ],
        },
        {
          heading: "",
          links: [
            <a href="https://palvelut.datahub.fi/en/dokumentaatio/dokumentaatio-ja-materiaalit">Information for Consumers</a>,
            <div
              style={{ alignItems: "flex-start", display: "flex", gap: "16px" }}
            >
              <a href="https://www.facebook.com/fingridfi">
                <Facebook height={40} width={40} />
              </a>
              <a href="https://twitter.com/fingrid_oyj">
                <Twitter height={40} width={40} />
              </a>
              <a href="https://www.instagram.com/fingridoyj">
                <Instagram height={40} width={40} />
              </a>
              <a href="https://www.linkedin.com/company/42235">
                <Linkedin height={40} width={40} />
              </a>
              <a href="https://www.fingrid.fi/api/rss/news">
                <Rss height={40} width={40} />
              </a>
            </div>,
          ],
        },
      ]}
    />
  );
};
