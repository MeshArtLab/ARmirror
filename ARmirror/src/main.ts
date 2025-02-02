import { bootstrapCameraKit } from '@snap/camera-kit';

(async function () {
  const liveRenderTarget = document.getElementById('canvas') as HTMLCanvasElement;

  // Function to resize the canvas to match the viewport size
  function resizeCanvas() {
    // Set canvas width and height to the current window size
    liveRenderTarget.width = window.innerWidth * window.devicePixelRatio;
    liveRenderTarget.height = window.innerHeight * window.devicePixelRatio;

    // Adjust the style to match the screen size
    liveRenderTarget.style.width = `${window.innerWidth}px`;
    liveRenderTarget.style.height = `${window.innerHeight}px`;
  }

  // Resize canvas initially
  resizeCanvas();

  // Event listener to resize canvas when the window is resized
  window.addEventListener('resize', resizeCanvas);

  // Initialize Camera Kit
  const cameraKit = await bootstrapCameraKit({
    apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzM4MTQ1NTU3LCJzdWIiOiI3NTkzNzdjNy0xNzJiLTQxYWYtYWJmOS03N2QwMWU1MDI0NGF-U1RBR0lOR35kYjkxM2U2ZC0yNTU0LTQ3YWEtODgyOS1iNDJjMWY5ZGFiYmEifQ.ng81BrWuksHykY4Hag_e0_Y5xPt_m2NGsW11l7n4RVE',
  });

  // Create a Camera Kit session
  const session = await cameraKit.createSession({ liveRenderTarget });

  // Define video constraints for full screen (using actual screen dimensions)
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    video: {
      width: { ideal: window.innerWidth },  // Use actual window width
      height: { ideal: window.innerHeight }, // Use actual window height
      facingMode: 'user',  // Use 'environment' for the back camera
    },
  });

  await session.setSource(mediaStream);
  await session.play();

  // Load and apply a lens
  const lens = await cameraKit.lensRepository.loadLens(
    '5214712e-4ce2-4fae-a707-f761c2c4d2eb',
    '20559398-3d79-4000-8c5b-4bce682a4154'
  );

// Load and apply a lens
///const { lenses } = await cameraKit.lensRepository.loadLensGroups (['20559398-3d79-4000-8c5b-4bce682a4154']);


  await session.applyLens(lens);

  ///session.applyLens(lenses[0])

  // Ensure the video feed scales properly to cover the canvas and crop if necessary
  liveRenderTarget.style.objectFit = 'cover';  // Ensures the video fills the entire canvas without distortion
})();
