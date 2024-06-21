/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import clsx from "clsx";
import styles from "./styles.module.scss";

type ArticleItem = {
  title: string;
  url: string;
  date: string;
};

const ArticleList: ArticleItem[] = [
  {
    title: "Forbes",
    url: "https://www.forbes.com/sites/forbesbusinessdevelopmentcouncil/2023/03/08/3-strategies-to-achieve-growth-and-innovation-through-neutrality-and-interoperability/?sh=c0460d5744d7",
    date: "March 8, 2023",
  },
  {
    title: "Business Wire",
    url: "https://www.businesswire.com/news/home/20230615392001/en/Global-Brands-Leading-European-Publishers-and-Retail-Partners-Turn-to-European-Unified-ID-to-Maintain-Relevant-Advertising",
    date: "June 15, 2023",
  },
  {
    title: "Performance Marketing World",
    url: "https://www.performancemarketingworld.com/article/1826376/bacardi-tesco-back-trade-desks-bid-fill-cookie-tracking-void",
    date: "June 15, 2023",
  },
  {
    title: "Ad Exchanger",
    url: "https://www.adexchanger.com/online-advertising/the-trade-desks-id5-integration-makes-european-audiences-more-addressable/",
    date: "June 19, 2023",
  },
  {
    title: "The Media Leader",
    url: "https://the-media-leader.fr/tf1-pub-sassocie-a-the-trade-desk/",
    date: "March 20, 2024",
  },
  {
    title: "Le Media Plus",
    url: "https://www.lemediaplus.com/m6-publicite-annonce-ses-partenariats-avec-liveramp-the-trade-desk-et-id5-autour-de-leurs-solutions-alternatives-aux-cookies-tiers/",
    date: "March 28, 2024",
  },
  {
    title: "Engage.it",
    url: "https://www.engage.it/programmatic/italiaonline-ancora-piu-cookieless-grazie-alladozione-di-euid-.aspx",
    date: "April 10, 2024",
  },
  {
    title: "Performance Marketing World",
    url: "https://www.performancemarketingworld.com/article/1868520/identity-fabric-enables-personalisation-privacy-first-era",
    date: "April 12, 2024",
  },
  {
    title: "Decision Marketing",
    url: "https://www.decisionmarketing.co.uk/news/tealium-jumps-into-bed-with-trade-desk-for-adtech-boost",
    date: "May 29, 2024",
  },
  {
    title: "GlobeNewswire",
    url: "https://www.globenewswire.com/news-release/2024/05/29/2889945/0/en/Tealium-expands-global-capabilities-for-customers-with-European-Unified-ID-integration.html",
    date: "May 29, 2024",
  },
  {
    title: "NewDigitalAge",
    url: "https://newdigitalage.co/technology/tealium-expands-capabilities-with-european-unified-id-integration/",
    date: "May 31, 2024",
  },
];

function ArticleCard({ title, url, date }: ArticleItem) {
  return (
    <div>
      <Link to={url} className={clsx("bg-white", styles.card)}>
        <div className={styles.cardBody}>
          <h3 className="type-paragraph-large text-11-o-clock">{title}</h3>
          <hr className={styles.divider} />
          <p className="type-eta text-gray-600">{date}</p>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageNews(): JSX.Element {
  return (
    <section className={clsx("bg-dirty-socks", styles.homepageNews)}>
      <div className="container">
        <header className={styles.header}>
          <h2 className="type-gamma text-11-o-clock">
            <Translate
              id="homepage.newsTitle"
              description="Press releases and media coverage"
            >
              Press releases and media coverage
            </Translate>
          </h2>
        </header>
        <div className={styles.cardGrid}>
          {ArticleList.reverse().map((article, idx) => (
            <ArticleCard key={idx} {...article} />
          ))}
        </div>
      </div>
    </section>
  );
}
