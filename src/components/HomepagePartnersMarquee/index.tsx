import React from "react";
import clsx from "clsx";
import Translate from "@docusaurus/Translate";
import styles from "./styles.module.scss";
import { partnersData } from "@site/src/data/partners";

const featuredPartners = partnersData.sort(
  ({ order: a }, { order: b }) => a - b,
);

export default function HomepagePartnersMarquee(): JSX.Element {
  return (
    <section className={styles.HomepagePartnersMarquee}>
      <div className={"container"}>
        <div className={clsx("row", styles.contentWrapper)}>
          <header className="col col--4">
            <h2 className={clsx(styles.heading, "text-11-o-clock")}>
              <Translate id="homepage.partnersTitle" description="Our partners">
                Our partners
              </Translate>
            </h2>
          </header>
          <div className="col col--8">
            <div className={styles.marquee}>
              <ul className={styles.marqueeInner}>
                {featuredPartners.map((partner, idx) => (
                  <li key={idx} className={clsx(styles.marqueeItem)}>
                    <img
                      src={`/img/partners/${partner.logo}`}
                      alt={partner.name}
                      className={styles.marqueeImage}
                    />
                  </li>
                ))}
              </ul>
              {/*have to duplicate for loop effect */}
              <ul className={styles.marqueeInner} aria-hidden="true">
                {featuredPartners.map((partner, idx) => (
                  <li key={idx} className={clsx(styles.marqueeItem)}>
                    <img
                      src={`/img/partners/${partner.logo}`}
                      alt={partner.name}
                      className={styles.marqueeImage}
                    />
                  </li>
                ))}
              </ul>
            </div>
            {/* <div className={styles.disableAnimation}>
              <input
                id="disable-animation"
                type="checkbox"
                onClick={() => handleDisableAnitmationClick()}
              />
              <label className="text-11-o-clock" htmlFor="disable-animation">
                Disable animation
              </label>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
