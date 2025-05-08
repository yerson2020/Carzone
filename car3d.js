let scene, camera, renderer, car, controls;

// Datos de las partes del carro
const carPartsData = {
    'wheel-0': {
        name: 'Rueda Delantera Izquierda',
        status: 'Buen estado',
        material: 'Aleación de aluminio',
        cost: '$2,500 MXN'
    },
    'wheel-1': {
        name: 'Rueda Delantera Derecha',
        status: 'Buen estado',
        material: 'Aleación de aluminio',
        cost: '$2,500 MXN'
    },
    'wheel-2': {
        name: 'Rueda Trasera Izquierda',
        status: 'Desgaste moderado',
        material: 'Aleación de aluminio',
        cost: '$2,500 MXN'
    },
    'wheel-3': {
        name: 'Rueda Trasera Derecha',
        status: 'Desgaste moderado',
        material: 'Aleación de aluminio',
        cost: '$2,500 MXN'
    },
    'body': {
        name: 'Carrocería',
        status: 'Excelente estado',
        material: 'Acero galvanizado',
        cost: '$15,000 MXN'
    },
    'cabin': {
        name: 'Cabina',
        status: 'Buen estado',
        material: 'Fibra de carbono',
        cost: '$8,000 MXN'
    }
};

let selectedPart = null;

function init() {
    // Crear escena
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // Obtener el contenedor y sus dimensiones
    const container = document.getElementById('car-3d-container');
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // Crear cámara
    camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000);
    camera.position.set(0, 2, 5);

    // Crear renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerWidth, containerHeight);
    container.appendChild(renderer.domElement);

    // Agregar controles de órbita
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.minDistance = 3;
    controls.maxDistance = 10;

    // Agregar luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Crear modelo básico del carro
    createCar();

    // Event listeners para controles de vista
    document.getElementById('view-front').addEventListener('click', () => setCameraView('front'));
    document.getElementById('view-side').addEventListener('click', () => setCameraView('side'));
    document.getElementById('view-top').addEventListener('click', () => setCameraView('top'));

    // Manejar redimensionamiento de ventana
    window.addEventListener('resize', onWindowResize);

    // Iniciar animación
    animate();

    // Hacer partes del carro seleccionables
    makePartsSelectable();
}

function createCar() {
    // Crear grupo para el carro
    car = new THREE.Group();

    // Crear carrocería
    const bodyGeometry = new THREE.BoxGeometry(2, 0.5, 4);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xff0000,
        emissive: 0x000000,
        emissiveIntensity: 1
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.name = 'body';
    car.add(body);

    // Crear cabina
    const cabinGeometry = new THREE.BoxGeometry(1.8, 0.6, 1.5);
    const cabinMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x333333,
        emissive: 0x000000,
        emissiveIntensity: 1
    });
    const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
    cabin.position.y = 0.55;
    cabin.position.z = -0.5;
    cabin.name = 'cabin';
    car.add(cabin);

    // Crear ruedas
    createWheels();

    scene.add(car);
}

function createWheels() {
    const wheelGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 32);
    const wheelMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x333333,
        emissive: 0x000000,
        emissiveIntensity: 1
    });

    const wheelPositions = [
        { x: -1, y: -0.3, z: 1.5 },
        { x: 1, y: -0.3, z: 1.5 },
        { x: -1, y: -0.3, z: -1.5 },
        { x: 1, y: -0.3, z: -1.5 }
    ];

    wheelPositions.forEach((pos, index) => {
        const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(pos.x, pos.y, pos.z);
        wheel.name = `wheel-${index}`;
        car.add(wheel);
    });
}

function updateCarColor(event) {
    const color = event.target.value;
    car.children.forEach(child => {
        if (child.material && child.material.color) {
            child.material.color.set(color);
        }
    });
}

function updateWheels(event) {
    createWheels(event.target.value);
}

function setCameraView(view) {
    const views = {
        'front': {
            position: [0, 2, 5],
            target: [0, 0, 0],
            up: [0, 1, 0]
        },
        'side': {
            position: [5, 2, 0],
            target: [0, 0, 0],
            up: [0, 1, 0]
        },
        'top': {
            position: [0, 5, 0],
            target: [0, 0, 0],
            up: [0, 0, -1]
        }
    };

    const targetView = views[view];
    
    // Disable controls during animation
    controls.enabled = false;
    
    // Animate camera position and target
    gsap.to(camera.position, {
        x: targetView.position[0],
        y: targetView.position[1],
        z: targetView.position[2],
        duration: 1,
        ease: 'power2.inOut',
        onUpdate: () => {
            camera.lookAt(
                targetView.target[0],
                targetView.target[1],
                targetView.target[2]
            );
            camera.up.set(
                targetView.up[0],
                targetView.up[1],
                targetView.up[2]
            );
        },
        onComplete: () => {
            // Re-enable controls after animation
            controls.enabled = true;
        }
    });
}

function onWindowResize() {
    const container = document.getElementById('car-3d-container');
    const width = container.clientWidth;
    const height = container.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

function selectPart(part) {
    // Remover selección anterior
    if (selectedPart) {
        selectedPart.material.emissive.setHex(0x000000);
    }

    // Seleccionar nueva parte
    selectedPart = part;
    part.material.emissive.setHex(0x333333);

    // Actualizar información en la card
    updatePartInfo(part);

    // Mostrar solo la sección de información de la parte
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    document.querySelector('.part-info').classList.add('visible');
}

function updatePartInfo(part) {
    const partData = carPartsData[part.name];
    if (partData) {
        document.querySelector('.part-name').textContent = partData.name;
        document.querySelector('.detail-item:nth-child(1) .detail-value').textContent = partData.status;
        document.querySelector('.detail-item:nth-child(2) .detail-value').textContent = partData.material;
        document.querySelector('.detail-item:nth-child(3) .detail-value').textContent = partData.cost;
    }
}

function resetCardView() {
    // Deselect the current part
    if (selectedPart) {
        selectedPart.material.emissive.setHex(0x000000);
        selectedPart = null;
    }

    // Show all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('hidden');
    });

    // Hide part info
    document.querySelector('.part-info').classList.remove('visible');
}

// Inicializar la escena cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init); 