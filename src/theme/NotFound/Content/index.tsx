import React from "react";
import clsx from "clsx";
import type { Props } from "@theme/NotFound/Content";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";

export default function NotFoundContent({ className }: Props): JSX.Element {
  return (
    <main className={clsx("container margin-vert--xl", className)}>
      <div className="row">
        <div className="col col--6 col--offset-3">
          <Heading as="h1" className="hero__title">
            Page Not Found
          </Heading>
          <p>
            We couldn't find the page you were looking for. The page might have
            been moved, or there was an error in the link.
          </p>
          <p>Here are some things you can do:</p>
          <ul>
            <li>Go back and retry the link.</li>
            <li>
              Search for the document by its title or keywords from any EUID
              page.
            </li>
            <li>
              <Link to="/docs/intro">
                Visit the EUID documentation home page.
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
