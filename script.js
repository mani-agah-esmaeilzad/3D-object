document.addEventListener('DOMContentLoaded', () => {
    const messagesContainer = document.getElementById('messages');

    function addMessage(text) {
        const message = document.createElement('div');
        message.className = 'message';
        message.textContent = text;
        messagesContainer.appendChild(message);

        setTimeout(() => {
            messagesContainer.removeChild(message);
        }, 5000);
    }

    // برای اضافه کردن پیام‌های نمونه
    addMessage('به فروشگاه کتاب مک او اس خوش آمدید!');
    addMessage('تخفیف‌های ویژه برای مدت محدود!');

    // Animation on scroll
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Dark Mode Toggle
    const darkModeSwitch = document.getElementById('dark-mode-switch');
    darkModeSwitch.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('threejs-container').appendChild(renderer.domElement);

    // کتاب سه‌بعدی
    const loader = new THREE.TextureLoader();
    loader.load('https://example.com/book-cover.jpg', function(texture) {
        const geometry = new THREE.BoxGeometry(3, 4, 0.5);
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const book = new THREE.Mesh(geometry, material);
        scene.add(book);

        book.position.x = 0;
        book.position.y = 0;
        book.position.z = -10;

        const animate = function() {
            requestAnimationFrame(animate);

            book.rotation.x += 0.01;
            book.rotation.y += 0.01;

            renderer.render(scene, camera);
        };

        animate();
    });

    camera.position.z = 5;
});
