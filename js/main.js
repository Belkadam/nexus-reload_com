// Scene, camera, and renderer setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Set background color to match the gradient
renderer.setClearColor(0x000000); // Black background for consistency
document.getElementById('container').appendChild(renderer.domElement);

// Ambient light for illumination
const light = new THREE.AmbientLight(0x808080, 1); // Soft light for a neutral tone
scene.add(light);

// Gradient material for the lines
const material = new THREE.LineBasicMaterial({
    vertexColors: true, // Enable vertex colors for gradient effects
});

// Points
const points = [
    new THREE.Vector3(-0.4, -0.2, 0), // Bottom left
    new THREE.Vector3(-0.4, 0.2, 0),  // Top left
    new THREE.Vector3(0, 0, 0),       // Middle
    new THREE.Vector3(0.4, 0.2, 0),   // Top right
    new THREE.Vector3(0.4, -0.2, 0),  // Bottom right
    new THREE.Vector3(0, 0, 0),       // Middle
    new THREE.Vector3(-0.4, -0.2, 0), // Close the shape
];

// Geometry and colors
const geometry = new THREE.BufferGeometry().setFromPoints(points);

// Define colors for a marked gradient
const colors = new Float32Array([
    1.0, 1.0, 1.0,
    0.7, 0.7, 0.7,
    0.5, 0.5, 0.5,
    0.7, 0.7, 0.7,
    0.3, 0.3, 0.3,
    0.5, 0.5, 0.5,
    1.0, 1.0, 1.0,
]);
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

// Line creation
const line = new THREE.Line(geometry, material);
scene.add(line);

// Position the camera
camera.position.z = 4;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate
    line.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
