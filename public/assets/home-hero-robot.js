const mount = document.querySelector('[data-home-robot]');

if (mount) {
  const viewer = mount.querySelector('model-viewer');
  const status = mount.querySelector('.hsa-home-robot-status');
  const hint = mount.querySelector('.hsa-home-robot-hint');

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

  setStatus('Initializing 3D viewer...');

  if (!viewer) {
    setStatus('3D viewer element is missing.', 'is-error');
  } else {
    viewer.addEventListener('load', () => {
      setStatus('3D model ready', 'is-ready');
      if (hint) {
        hint.innerHTML = '<span>Drag to rotate</span><span>Pinch to zoom</span>';
      }
    });

    viewer.addEventListener('error', () => {
      setStatus('3D preview unavailable. Please refresh the local preview page.', 'is-error');
    });

    window.setTimeout(() => {
      if (status && !status.classList.contains('is-ready') && !status.classList.contains('is-error')) {
        setStatus('3D model is still loading...', '');
      }
    }, 2500);
  }
}
