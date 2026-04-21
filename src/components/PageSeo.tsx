import { Helmet } from 'react-helmet-async'
import { site } from '../content/site'

export function PageSeo({ canonicalUrl }: { canonicalUrl: string }) {
  const title = `${site.name} — ${site.tagline}`
  const description = site.description

  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={site.ogImagePath} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={site.ogImagePath} />

      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: site.name,
          url: canonicalUrl,
        })}
      </script>
    </Helmet>
  )
}

