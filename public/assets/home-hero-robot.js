const mount = document.querySelector('[data-home-robot]');

if (mount) {
  const viewer = mount.querySelector('model-viewer');
  const poster = mount.querySelector('.hsa-home-robot-poster');
  const status = mount.querySelector('.hsa-home-robot-status');
  const hint = mount.querySelector('.hsa-home-robot-hint');
  const scriptSource = '/assets/vendor-model-viewer.min.js';
  let viewerBound = false;

  function setStatus(text, state) {
    if (!status) {
      return;
    }

    status.textContent = text;
    status.classList.remove('is-ready', 'is-error');
    if (state) {
      status.classList.add(state);
    }
  }

  function loadModelViewerScript() {
    const existingScript = document.querySelector('script[data-model-viewer-script="true"]');

    if (existingScript) {
      if (existingScript.dataset.loaded === 'true') {
        return Promise.resolve();
      }

      return new Promise((resolve, reject) => {
        existingScript.addEventListener('load', resolve, { once: true });
        existingScript.addEventListener('error', reject, { once: true });
      });
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = scriptSource;
      script.type = 'module';
      script.async = true;
      script.dataset.modelViewerScript = 'true';
      script.addEventListener('load', () => {
        script.dataset.loaded = 'true';
        resolve();
      }, { once: true });
      script.addEventListener('error', reject, { once: true });
      document.head.appendChild(script);
    });
  }

  function bindViewerEvents() {
    if (!viewer || viewerBound) {
      return;
    }

    viewerBound = true;

    viewer.addEventListener('load', () => {
      if (poster) {
        poster.classList.add('is-hidden');
      }
      viewer.classList.add('is-ready');
      setStatus('3D model ready', 'is-ready');
      if (hint) {
        hint.innerHTML = '<span>Drag to rotate</span><span>Pinch to zoom</span>';
      }
    });

    viewer.addEventListener('error', () => {
      viewer.classList.remove('is-ready');
      if (poster) {
        poster.classList.remove('is-hidden');
      }
      setStatus('3D preview unavailable. Please refresh the page.', 'is-error');
    });

    window.setTimeout(() => {
      if (status && !status.classList.contains('is-ready') && !status.classList.contains('is-error')) {
        setStatus('3D model is still loading...', '');
      }
    }, 2500);
  }

  function startViewer() {
    if (!viewer) {
      setStatus('3D viewer element is missing.', 'is-error');
      return;
    }

    setStatus('Loading 3D viewer...');

    loadModelViewerScript()
      .then(() => customElements.whenDefined('model-viewer'))
      .then(() => {
        bindViewerEvents();
        if (viewer.loaded) {
          viewer.dispatchEvent(new Event('load'));
          return;
        }

        setStatus('Initializing 3D viewer...');
      })
      .catch(() => {
        setStatus('3D viewer failed to load.', 'is-error');
      });
  }

  startViewer();
}
