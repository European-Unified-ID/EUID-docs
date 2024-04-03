import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";
import { pushGtmEvent } from "@site/src/utils/pushGtmEvent";
import styles from "./styles.module.scss";
// import OutboundArrow from "@site/static/img/arrow-outbound-link.svg";
import SectionHeader from "@site/src/components/SectionHeader";

export default function HomepageConsumerBenefit(): JSX.Element {
  const buttonClickData = {
    event: "button_click",
    click_item: "home page consumer benefit",
    click_text: "Manage my EUID",
    link_url: "https://www.transparentadvertising.eu/",
  };

  const componentData = {
    heading: translate({
      id: "homepage.benefitsTitle",
      message: "European Unified ID benefits",
    }),
    subheading: translate({
      id: "homepage.benefitsCopy",
      message:
        "EUID was created with consumer privacy and the regulatory requirements of the region as a top priority. User can opt out of using their EUID universally by visiting the opt-out portal. Participants are required to honor user opt-out requests made through the portal.",
    }),
  };

  return (
    <section className={clsx("bg-deep-sea text-white", styles.sectionPadding)}>
      <div className={"container"}>
        <SectionHeader
          heading={componentData.heading}
          subheading={componentData.subheading}
          extraClass={styles.header}
        />
        <Link
          to="https://www.transparentadvertising.eu/"
          rel="noopener noreferrer"
          className={clsx("button button--nav", styles.ctaButton)}
          onClick={() => pushGtmEvent(buttonClickData)}
        >
          <Translate id="homepage.benefitsButtonLabel">
            Manage my EUID
          </Translate>
        </Link>

        {/* <div className={styles.contentContainer}>
          <h2 className="text-white type-delta">
            <Translate id="homepage.benefitsTitle">
              European Unified ID Benefits
            </Translate>
          </h2>
          <Link
            to="https://www.transparentadvertising.eu/"
            rel="noopener noreferrer"
            className={clsx("button button--nav", styles.ctaButton)}
            onClick={() => pushGtmEvent(pageViewData)}
          >
            <Translate id="homepage.benefitsButtonLabel">
              Manage my EUID
            </Translate>
            <OutboundArrow />
          </Link>
        </div>
        <p>
          <Translate id="homepage.benefitsCopy">
            EUID was created with consumer privacy and the regulatory
            requirements of the region as a top priority. Users can opt out of
            using their EUID universally by visiting the opt-out portal.
            Participants are required to honor users’ opt-out requests made
            through the portal.
          </Translate>
        </p> */}
      </div>
    </section>
  );
}
