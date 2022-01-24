import { Helmet } from "react-helmet-async";
import React from "react";

export type SEOProps = {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  keywords?: string[];
};

class SEO extends React.Component<SEOProps> {
  render() {
    const { title = "kotiChefs" } = this.props;
    return (
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </div>
    );
  }
}

export default SEO;
