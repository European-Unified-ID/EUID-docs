import React from "react";
import { translate } from "@docusaurus/Translate";
import Layout from "@theme/Layout";
import PageHeader from "@site/src/components/PageHeader";
import { pushGtmEvent } from "@site/src/utils/pushGtmEvent";
import {
  capitalizeFirstLetter,
  identifyClosestSiblingInput,
} from "@site/src/utils";
import styles from "./request-access.module.scss";

const MARKETO_FORM_DELAY = 500; // Delay time for loading Marketo form
const MARKETO_FORM_ID = 3880;

declare global {
  interface Window {
    MktoForms2: any;
  }
}

const componentData = {
  title: translate({
    id: "requestAccess.metaTitle",
    message: "Request Access",
    description: "The request access page meta title",
  }),
  description: translate({
    id: "requestAccess.metaDescription",
    message: "Contact us to become an EUID partner.",
    description: "The request access page meta description",
  }),
  heading: translate({
    id: "requestAccess.heading",
    message: "Request access to EUID",
    description: "The request access page heading",
  }),
  subheading: translate({
    id: "requestAccess.subheading",
    message:
      "Interested in adopting EUID as a part of your identity strategy? Contact The Trade Desk to learn more about integrating with the EUID framework today. Advertisers, publishers, data and measurement providers, DSPs, SSPs, and data storage and audience platforms are all welcome!",
    description: "The request access page subheading",
  }),
};

const RequestDemo = (): JSX.Element => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const loadMarketoForm = React.useCallback(() => {
    if (window.MktoForms2) {
      window.MktoForms2.loadForm(
        "//pages.thetradedesk.com",
        "527-INM-364",
        MARKETO_FORM_ID,
      );

      window.MktoForms2.whenRendered(function (form) {
        const formEl = form.getFormElem()[0];
        const styledEls = Array.from(formEl.querySelectorAll("[style]")).concat(
          formEl,
        );
        styledEls.forEach(function (el: Element) {
          el.removeAttribute("style");
        });

        // disable remote stylesheets and local <style>
        const styleSheets = Array.from(document.styleSheets);
        styleSheets.forEach(function (ss) {
          if (
            // @ts-ignore
            [mktoForms2BaseStyle, mktoForms2ThemeStyle].indexOf(ss.ownerNode) !=
              -1 ||
            formEl.contains(ss.ownerNode)
          ) {
            ss.disabled = true;
          }
        });
      });
    }
  }, [MARKETO_FORM_ID]);

  React.useEffect(() => {
    // call marketo after delay to prevent race conditions on rapid multiple renders
    const timer = setTimeout(loadMarketoForm, MARKETO_FORM_DELAY);
    return () => clearTimeout(timer);
  }, [loadMarketoForm]);

  const onChange = React.useCallback((event) => {
    const target = event.target;
    const parent = target.parentElement;
    const label = parent.getElementsByTagName("label")[0];
    const value = target.value;

    value
      ? label?.classList.add(styles.hasContentLabel)
      : label?.classList.remove(styles.hasContentLabel);
  }, []);

  const onFocus = React.useCallback((event) => {
    const target = event.target;
    const parent = target.parentElement;
    const label = parent.getElementsByTagName("label")[0];

    label?.classList.add(styles.focusedLabel);
  }, []);

  const onBlur = React.useCallback((event) => {
    const target = event.target;
    const parent = target.parentElement;
    const label = parent.getElementsByTagName("label")[0];

    label?.classList.remove(styles.focusedLabel);
  }, []);

  const onFormMutation = React.useCallback(() => {
    const labelNodes = formRef?.current.querySelectorAll("label");
    const submitButton = formRef?.current.querySelector(
      'button[type="submit"]',
    );

    labelNodes.forEach((label) => {
      const siblingInput = identifyClosestSiblingInput(label);

      const tagName = capitalizeFirstLetter(
        siblingInput?.tagName.toLowerCase(),
      );
      const inputTypeClassName = `for${tagName}`;

      if (inputTypeClassName in styles) {
        label.classList.add(styles[inputTypeClassName]);
      }
    });
    if (submitButton) {
      submitButton.addEventListener("click", function () {
        pushGtmEvent({
          event: "form_submit",
          form_id: MARKETO_FORM_ID,
        });
      });
    }
  }, [formRef]);

  React.useEffect(() => {
    if (formRef.current) {
      // Event listeners and observer setup
      formRef.current.addEventListener("focusin", onFocus);
      formRef.current.addEventListener("focusout", onBlur);
      formRef.current.addEventListener("change", onChange);

      const observer = new MutationObserver(onFormMutation);
      observer.observe(formRef.current, { childList: true, subtree: true });

      return () => {
        if (formRef?.current) {
          formRef.current.removeEventListener("focusin", onFocus);
          formRef.current.removeEventListener("focusin", onBlur);
          formRef.current.removeEventListener("change", onChange);
          observer?.disconnect();
        }
      };
    }
  }, [formRef]);

  return (
    <Layout title={componentData.title} description={componentData.description}>
      <PageHeader
        heading={componentData.heading}
        subheading={componentData.subheading}
      />
      <main className={styles.requestDemoPage}>
        <div className="container">
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col col--5">
              <div className="marketo-form">
                <form ref={formRef} id={`mktoForm_${MARKETO_FORM_ID}`} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default RequestDemo;
