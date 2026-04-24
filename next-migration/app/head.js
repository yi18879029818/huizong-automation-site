export default function Head() {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Inter:wght@100..900&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
      />
      <link rel="stylesheet" href="/assets/site-shell.css" />
      <link rel="alternate" type="application/json" title="llms-json" href="/llms.json" />
      <link rel="alternate" type="text/plain" title="llms-index" href="/llms.txt" />
      <link rel="alternate" type="text/plain" title="llms-full" href="/llms-full.txt" />
    </>
  );
}
