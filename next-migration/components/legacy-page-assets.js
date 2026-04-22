export function LegacyPageAssets({ page }) {
  return (
    <>
      {page.links?.map((link, index) => (
        <link
          key={`legacy-link-${index}`}
          rel={link.rel}
          href={link.href}
          as={link.as}
          type={link.type}
          media={link.media}
          crossOrigin={link.crossOrigin}
          referrerPolicy={link.referrerPolicy}
        />
      ))}
      {page.inlineStyles.map((styleContent, index) => (
        <style
          key={`legacy-style-${index}`}
          dangerouslySetInnerHTML={{ __html: styleContent }}
        />
      ))}
      {page.scripts.map((script, index) => {
        const id = script.id || `legacy-script-${index}`;

        if (script.src) {
          return (
            <script
              key={id}
              id={id}
              src={script.src}
              type={script.type}
            />
          );
        }

        return (
          <script
            key={id}
            id={id}
            type={script.type}
            dangerouslySetInnerHTML={{ __html: script.code }}
          />
        );
      })}
    </>
  );
}
