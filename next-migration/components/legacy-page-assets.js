import Script from "next/script";

export function LegacyPageAssets({ page }) {
  return (
    <>
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
            <Script
              key={id}
              id={id}
              src={script.src}
              strategy={script.strategy}
              type={script.type}
            />
          );
        }

        return (
          <Script
            key={id}
            id={id}
            strategy={script.strategy}
            type={script.type}
            dangerouslySetInnerHTML={{ __html: script.code }}
          />
        );
      })}
    </>
  );
}
