// Initialisation de la scène, de la caméra et du renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Ajout d'une lumière pour éclairer le logo
const light = new THREE.AmbientLight(0x404040, 1); // lumière douce
scene.add(light);

// Définition d'un ShaderMaterial pour appliquer un dégradé de gris
const vertexShader = `
    varying float vGray;
    void main() {
        vGray = (position.y + 1.0) / 2.0; // Calcul du dégradé basé sur la position Y
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
    varying float vGray;
    void main() {
        gl_FragColor = vec4(vec3(vGray), 1.0); // Application du dégradé de gris
    }
`;

// Création du matériau avec le dégradé de gris
const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    side: THREE.FrontSide
});

// Définition des points pour dessiner un "N" (avec la ligne du bas)
const points = [];
points.push(new THREE.Vector3(-1, -1, 0)); // Bas gauche
points.push(new THREE.Vector3(-1, 1, 0)); // Haut gauche
points.push(new THREE.Vector3(1, -1, 0)); // Bas droite
points.push(new THREE.Vector3(1, 1, 0)); // Haut droite
points.push(new THREE.Vector3(0, 0, 0)); // Centre du "N" (la barre oblique)
points.push(new THREE.Vector3(-1, -1, 0)); // Retour à la base gauche

// Création de la géométrie du "N" (ligne filaire)
const geometry = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.LineLoop(geometry, material);
scene.add(line);

// Centrer le "N"
line.position.set(0, 0, 0);

// Positionner la caméra
camera.position.z = 5;

// Animation du logo (rotation autour de l'axe Y uniquement)
function animate() {
    requestAnimationFrame(animate);

    // Rotation du "N" autour de l'axe Y (horizontal)
    line.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();

// Adapter la taille du renderer lors du redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
