"use client";
import React from "react";
import { Facebook, Footer as FingridFooter, Instagram, Linkedin, Rss, Twitter } from "@fingrid/design-system-components";
import { labGrotesqueWeb } from "@/fonts";
import type { FC } from "react";

const footerContent = {
  bottomLinks: [{
    text: "Privacy Statement",
    href: "https://www.fingrid.fi/tietosuojaselosteet/",
  }, {
    text: "Accessibility Statement",
    href: "https://www.fingrid.fi/globalassets/dokumentit/fi/tietosuojaselosteet/saavutettavuusseloste3-palvelut.datahub.fi.pdf",
  }, {
    text: "Terms and Conditions",
    href: "https://www.fingrid.fi/kayttoehdot/",
  }, {
    text: "Cookies",
    href: "https://www.fingrid.fi/en/cookies/",
  }, {
    text: "Feedback",
    href: "https://www.fingrid.fi/en/pages/contacts/feedback/",
  }],
  sections: [{
    heading: "Fingrid",
    links: [{
      text: "Fingrid.fi",
      href: "https://www.fingrid.fi/",
    }, {
      text: "About Us",
      href: "https://www.fingrid.fi/sivut/yhtio/esittely/",
    }, {
      text: "News",
      href: "https://www.fingrid.fi/sivut/ajankohtaista/tiedotteet/?tag=3467",
    }],
  }, {
    heading: "Extranet services",
    links: [{
      text: "Guarantees of Origin",
      href: "https://go.finextra.fi/",
    }, {
      text: "Grid Services",
      href: "https://ekstra.fingrid.fi/",
    }, {
      text: "Invoice measurement and balance settlement",
      href: "https://energiaselvitys.fingrid.fi/",
    }, {
      text: "Quality",
      href: "https://webamr.rejlers.fi/laatutieto/app",
    }, {
      text: "Projects",
      href: "https://ekstra.fingrid.fi/",
    }, {
      text: "Safety Declaration",
      href: "https://turvailmo.fingrid.fi/",
    }, {
      text: "Safety Audits",
      href: "https://portal.nordsafety.com/account/login",
    }],
  }, {
    heading: "Additional Information",
    links: [{
      text: "Electricity Network Planning",
      href: "https://www.fingrid.fi/kantaverkko/kehittaminen",
    }, {
      text: "Privacy Statement",
      href: "https://www.fingrid.fi/tietosuojaselosteet",
    }, {
      text: "Disturbances",
      href: "https://www.fingrid.fi/sivut/ajankohtaista/tiedotteet/?tag=3464",
    }, {
      text: "Safety",
      href: "https://www.fingrid.fi/kantaverkko/turvallisuus",
    }, {
      text: "Electricity Market Act",
      href: "https://www.finlex.fi/fi/laki/ajantasa/2013/20130588",
    }, {
      text: "EIC Codes",
      href: "https://www.fingrid.fi/sahkomarkkinat/markkinoiden-yhtenaisyys/eurooppa-yhteistyo/eic-koodit",
    }],
  }
]}

export const Footer: FC = () => {
  return (
    <FingridFooter
      className={labGrotesqueWeb.className}
      bottomLinks={footerContent.bottomLinks.map(link => (
        <a key={link.text} href={link.href}>
          {link.text}
        </a>
      ))}
      sections={[
        ...footerContent.sections.map(section => ({
          heading: section.heading,
          links: section.links.map(link => (
            <a key={link.text} href={link.href}>
              {link.text}
            </a>
          )),
        })),
        {
          heading: "",
          links: [
            <a key="information_for_consumers" href="https://palvelut.datahub.fi/en/dokumentaatio/dokumentaatio-ja-materiaalit">Information for Consumers</a>,
            <div
              key="footer_other_links"
              style={{ alignItems: "flex-start", display: "flex", gap: "16px" }}
            >
              <a key="some_fb" href="https://www.facebook.com/fingridfi">
                <Facebook height={40} width={40} />
              </a>
              <a key="some_twitter" href="https://twitter.com/fingrid_oyj">
                <Twitter height={40} width={40} />
              </a>
              <a key="some_instagram" href="https://www.instagram.com/fingridoyj">
                <Instagram height={40} width={40} />
              </a>
              <a key="some_linkedin" href="https://www.linkedin.com/company/42235">
                <Linkedin height={40} width={40} />
              </a>
              <a key="rss_feed" href="https://www.fingrid.fi/api/rss/news">
                <Rss height={40} width={40} />
              </a>
            </div>,
          ],
        },
      ]}
    />
  );
};
