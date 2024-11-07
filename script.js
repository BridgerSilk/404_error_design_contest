// Set up renderer, scene, and camera
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 0; // Position the camera at the center
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);

// Resize the renderer on window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Add a light to simulate the sun, positioned at the camera
const pointLight = new THREE.PointLight(0xffffff, 2);
camera.add(pointLight); // Attach light to the camera
scene.add(camera); // Add the camera (with light) to the scene

// Planet data with a unique color for Mars (e.g., red)
const planetsData = [
    { name: "Mercury", size: 0.5, color: 0xffffff, }, // white
    { name: "Venus", size: 1.2, color: 0xffffff },   // white
    { name: "Earth", size: 1.2, color: 0xffffff },   // white
    { name: "Mars", size: 2.5, color: 0xff0000 },    // red
    { name: "Jupiter", size: 2.5, color: 0xffffff }, // white
    { name: "Saturn", size: 2.0, color: 0xffffff },  // white
    { name: "Uranus", size: 1.5, color: 0xffffff },  // white
    { name: "Neptune", size: 1.5, color: 0xffffff }  // white
];

const orbitRadius = 20; // Fixed distance from the camera for all planets
const orbitSpeed = 0.003; // Fixed orbit speed

// Create each planet as a sphere with individual colors
const planets = [];

planetsData.forEach((data, index) => {
    const geometry = new THREE.SphereGeometry(data.size, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: data.color }); // Set color from data

    const planet = new THREE.Mesh(geometry, material);

    // Calculate initial position in a circular pattern
    const angle = (index / planetsData.length) * Math.PI * 2; // Spread evenly around the circle
    planet.position.x = Math.cos(angle) * orbitRadius;
    planet.position.z = Math.sin(angle) * orbitRadius;

    scene.add(planet);
    planets.push(planet);
});

// Animation loop to make planets orbit around the camera
function animate() {
    requestAnimationFrame(animate);

    planets.forEach(planet => {
        // Update each planet's position to orbit around the camera at the fixed radius
        const currentAngle = Math.atan2(planet.position.z, planet.position.x); // Get current angle
        const newAngle = currentAngle - orbitSpeed; // Update angle by orbit speed

        // Update the position based on the new angle
        planet.position.x = Math.cos(newAngle) * orbitRadius;
        planet.position.z = Math.sin(newAngle) * orbitRadius;
    });

    renderer.render(scene, camera);
}

animate();
