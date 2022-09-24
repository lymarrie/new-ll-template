/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import * as React from "react";
import Banner from "../components/banner";
import Contact from "../components/contact";
import Cta from "../components/cta";
import Hours from "../components/hours";
import List from "../components/list";
import PageLayout from "../components/page-layout";
import StaticMap from "../components/static-map";
import { formatPhoneNumber } from 'react-phone-number-input';
import Markdown from 'markdown-to-jsx';
import "../index.css";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-id-1",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "mainPhone",
      "description",
      "paymentOptions",
      "photoGallery",
      "hours",
      "accessHours",
      "c_accessHoursSummary",
      "slug",
      "logo",
      "neighborhood",
      "frequentlyAskedQuestions",
      "geocodedCoordinate",
      "services",
      "c_pageName",
      "c_pageSubtitleH2",
      "c_pageTextBlockTitleH3",
      "c_pageTextBlockText"
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      savedFilterIds: ["1237002683"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug
    ? document.slug
    : `${document.locale}/${document.address.region}/${document.address.city}/${document.address.address1
    }-${document.id.toString()}`;
};

/**
 * Defines a list of paths which will redirect to the path created by getPath.
 *
 * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
 * a new deploy.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
};

/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.description,
        },
      },
    ],
  };
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct stream document defined by `config`.
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */
const Location: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const {
    _site,
    name,
    address,
    openTime,
    hours,
    mainPhone,
    frequentlyAskedQuestions,
    geocodedCoordinate,
    services,
    accessHours,
    c_accessHoursSummary,
    c_pageName,
    c_pageSubtitleH2,
    c_pageTextBlockText,
    c_pageTextBlockTitleH3
  } = document;

  var formattedPhone = formatPhoneNumber(mainPhone);

  const faqDivs = frequentlyAskedQuestions.map((faq: any) => (
    <div className="rounded-lg drop-shadow-md space-y-5">
      <details className="bg-gray-100 rounded-md shadow-sm px-5 py-5 bg-white hover:cursor-pointer">
        <summary className="text-lg font-bold text-ll-blue hover:text-ll-red">
          {faq.question}
        </summary>
        <p className="py-2 font-normal">
          <Markdown>{faq.answer}</Markdown>
        </p>
      </details>
    </div>
  ));

  return (
    <>
      <PageLayout mainPhone={mainPhone}>
        <div className="centered-container">
          <div className="section grid lg:grid-cols-5 gap-x-8">
            <div className="lg:col-span-3">
              <h1>{name}</h1>
              <h3 className='text-2xl font-extrabold'>{c_pageSubtitleH2}</h3>
              <div className="location-reviews-count"></div>
              <div className="grid gap-y-5">
                <div className="grid gap-x-2 grid-cols-2">
                  <div className='' id=''>
                    <h3>Address</h3>
                    <a id="" className="hover:underline" href="https://www.google.com/maps/dir/?api=1&destination={{name}} {{address.line1}} {{address.city}} {{address.region}} {{address.postalCode}}">{address.line1} {address.city}, {address.region} {address.postalCode}<p></p></a>
                    <div className="hidden" id="address">{address.line1} {address.city} {address.region} {address.postalCode}</div>
                  </div>
                  <div className=''>
                    <h3>Phone</h3>
                    <p>{formattedPhone}</p>
                  </div>
                </div>

                <div className="grid gap-y-5 sm:grid-cols-2 md:gap-x-5">
                  <div className=''>
                    <details className="">
                      <summary className="summary text-lg font-bold text-ll-red">
                        Access Hours
                        <div className="subtitle text-ll-blue text-base font-normal">
                          {c_accessHoursSummary}
                        </div>
                      </summary>
                      {hours && <Hours hours={accessHours} />}
                    </details>
                  </div>
                  <div className=''>
                    <details>
                      <summary className="summary text-lg font-bold text-ll-red">
                        Support Hours
                        <div className="subtitle text-ll-blue text-base font-normal">
                          Expand for details
                        </div>
                      </summary>
                      {hours && <Hours hours={hours} />}
                    </details>
                  </div>
                </div>

              </div>
              <div className="section units-table"></div>
            </div>
            <div className="grid space-y-6 lg:col-span-2">
              <div>
                {geocodedCoordinate && (
                  <StaticMap
                    latitude={geocodedCoordinate.latitude}
                    longitude={geocodedCoordinate.longitude}
                  ></StaticMap>
                )}
              </div>
              <div></div>
            </div>
          </div>
          <div className="section">
            <h2>Customer Reviews</h2>
          </div>
          <div className="section">
            <h2>{c_pageTextBlockTitleH3}</h2>
            <div className="description mt-3">{c_pageTextBlockText}</div>
          </div>
          <a id="faqs">
            <div className="section">
              <h2 className="section-header">Frequently Asked Questions</h2>
              <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {faqDivs}
              </div>
            </div>
          </a>
        </div>
      </PageLayout>
    </>
  );
};

export default Location;
