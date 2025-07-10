/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import clsx from "clsx";
import styles from "./styles.module.scss";

type ArticleItem = { title: string; url: string; date: string };

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
    title: "New Digital Age",
    url: "https://newdigitalage.co/technology/tealium-expands-capabilities-with-european-unified-id-integration/",
    date: "May 31, 2024",
  },
  {
    title: "The Media Leader",
    url: "https://fr.themedialeader.com/media-figaro-integre-euid-et-openpath-dans-le-cadre-dun-partenariat-avec-the-trade-desk/",
    date: "June 27, 2024",
  },
  {
    title: "New Digital Age",
    url: "https://newdigitalage.co/publishing/reach-plc-adopts-the-trade-desks-european-unified-id/",
    date: "July 1, 2024",
  },
  {
    title: "Talk CMO",
    url: "https://talkcmo.com/quick-bytes/hightouch-introduces-euid-to-improve-privacy-conscious-advertising-across-the-open-web/",
    date: "July 2, 2024",
  },
  {
    title: "Info Bae",
    url: "https://www.infobae.com/espana/agencias/2024/09/30/eldiarioes-ssmas-y-webedia-adoptan-euid-y-apoyaran-openpath/",
    date: "September 30, 2024",
  },
  {
    title: "Business Wire",
    url: "https://www.businesswire.com/news/home/20241028397932/en/Leading-Supply-side-Partners-Including-FreeWheel-Index-Exchange-Magnite-Microsoft-Monetize-and-PubMatic-Integrate-European-Unified-ID-to-Maintain-Relevant-Advertising",
    date: "October 28, 2024",
  },
  {
    title: "CB News",
    url: "https://www.cbnews.fr/digital/image-the-trade-desk-rassemble-autour-son-european-unified-id-88209",
    date: "October 28, 2024",
  },
  {
    title: "Engage",
    url: "https://www.engage.it/programmatic/post-cookie-le-principali-piattaforme-sell-side-adottano-l-european-unified-id-di-the-trade-desk.aspx",
    date: "October 28, 2024",
  },
  {
    title: "Ad Zine",
    url: "https://www.adzine.de/2024/11/sell-side-schwergewichte-staerken-der-euid-den-ruecken/",
    date: "November 8, 2024",
  },
  {
    title: "Piemme",
    url: "https://www.engage.it/programmatic/piemme-sceglie-la-nuova-tecnologia-di-identity-di-id5-e-the-trade-desk-per-il-targeting-cookieless.aspx",
    date: "February 2, 2025",
  },
  {
    title: "United Internet Media",
    url: "https://www.united-internet-media.de/de/newsroom/vermarkterblog/blog/show/uim-bringt-euid-von-the-trade-desk-und-netid-zusammen/",
    date: "February 11, 2025",
  },
  {
    title: "Lockr",
    url: "https://www.prnewswire.com/news-releases/lockr-boosts-open-internet-addressability-with-leading-identity-solutions-302433925.html",
    date: "April 22, 2025",
  },
  {
    title: "Snowflake",
    url: "https://www.businesswire.com/news/home/20250506191798/en/The-Trade-Desk-Launches-European-Unified-ID-on-Snowflake-Marketplace-to-Enrich-First-Party-Data-and-Improve-Addressability-on-the-Open-Internet",
    date: "May 6, 2025",
  },
];

function ArticleCard({ title, url, date }: ArticleItem) {
  return (
    <div>
      <Link to={url} className={clsx("bg-white", styles.card)}>
        <div className={styles.cardBody}>
          <div>
            <h3 className="type-paragraph-large text-11-o-clock">{title}</h3>
          </div>
          <div>
            <hr className={styles.divider} />
            <p className="type-eta text-gray-600">{date}</p>
          </div>
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
