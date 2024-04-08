import React from "react";
import clsx from "clsx";
import Translate from "@docusaurus/Translate";

import HeroDesktopBg from "@site/static/img/hero-desktop.svg";
import HeroMobileBg from "@site/static/img/hero-mobile.svg";
import styles from "./styles.module.scss";
import { useColorMode } from "@docusaurus/theme-common";
export default function HomepageHero(): JSX.Element {
  const { setColorMode, colorMode } = useColorMode();

  //quick fix for updating color mode on page load breaking after theme upgrade
  React.useEffect(() => {
    const originalTheme = colorMode;

    // The second parameter exists, it's just not on the type :(
    setColorMode("dark", { persist: false });

    return () => {
      setColorMode(originalTheme);
    };
  }, []);

  return (
    <header className={clsx("bg-deep-sea text-white", styles.homepageHero)}>
      <div className={clsx("container", styles.homepageHeroContent)}>
        <div className="row">
          <div className={"col"}>
            <span className={"type-zeta"}>
              <Translate id="homepage.heroEyebrow">
                European Unified ID
              </Translate>
            </span>
          </div>
        </div>
        <div className="row">
          <div className={"col col--9"}>
            <h1 className={"type-alpha"}>
              <Translate id="homepage.heroTitle">
                An open-source identity solution built for Europe
              </Translate>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col col--6">
            <p className={clsx("type-paragraph-large")}>
              <Translate id="homepage.heroCopy">
                European Unified ID (EUID) leverages encrypted email data to
                provide a privacy-conscious, secure, and accurate identity
                standard for the digital advertising ecosystem.
              </Translate>
            </p>
          </div>
        </div>
      </div>
      <HeroMobileBg className={clsx(styles.heroBg, styles.heroMobileBg)} />
      <HeroDesktopBg className={clsx(styles.heroBg, styles.heroDesktopBg)} />
    </header>
  );
}
