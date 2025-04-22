document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav ul li a, footer .footer-section ul li a');
    const sections = document.querySelectorAll('main section');

    document.querySelector('#home').classList.add('active');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            sections.forEach(section => section.classList.remove('active'));

            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.classList.add('active');

            history.pushState(null, '', `#${targetId}`);
        });
    });

    window.addEventListener('scroll', () => {
        let currentSectionId = 'home';
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                currentSectionId = section.id;
            }
        });

        if (location.hash.substring(1) !== currentSectionId) {
            history.replaceState(null, '', `#${currentSectionId}`);
        }
    });

    const recallButton = document.getElementById('recallButton');
    const recallModal = new bootstrap.Modal(document.getElementById('recallModal'));

    recallButton.addEventListener('click', () => {
        recallModal.show();
    });

    const recallForm = document.getElementById('recallForm');
    recallForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const surname = document.getElementById('surname').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        console.log(`Nome: ${name}, Cognome: ${surname}, Email: ${email}, Messaggio: ${message}`);
        alert('Lettera di richiamo inviata con successo!');
        recallModal.hide();
        recallForm.reset();
    });

    const hamburger = document.querySelector('.hamburger');
    const navOverlay = document.getElementById('navOverlay');
    const closeMenu = document.getElementById('closeMenu');

    hamburger.addEventListener('click', () => {
        navOverlay.classList.add('active');
    });

    closeMenu.addEventListener('click', () => {
        navOverlay.classList.remove('active');
    });

    navOverlay.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navOverlay.classList.remove('active');
        });
    });

    navOverlay.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            navOverlay.classList.remove('active');

            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            sections.forEach(section => section.classList.remove('active'));
            targetSection.classList.add('active');

            history.pushState(null, '', `#${targetId}`);
        });
    });
});

async function initializeDataTable() {
    const url = "https://sample-apis-sigma.vercel.app/api/dipendenti";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Response status: ' + response.status);
        }
        const json = await response.json();
        console.log(json);
        $('#employeeTable').DataTable({
            "columns": [
                { "data": "categoria" },
                { "data": "codiceFiscale" },
                { "data": "nome" },
                { "data": "cognome" },
                { "data": "dataAssunzione" },
                { "data": "nomeRiferimento" },
            ],
            data: json
        });
    } catch (error) {
        console.error(error.message);
    }
}

async function initializeTechniciansTable() {
    const url = "https://sample-apis-sigma.vercel.app/api/dipendenti";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Response status: ' + response.status);
        }
        const json = await response.json();

        const technicians = json.filter(employee => employee.categoria === "tecnico");

        console.log(technicians);
        new DataTable('#techniciansTable', {
            "columns": [
                { "data": "codiceFiscale" },
                { "data": "nome" },
                { "data": "cognome" },
                { "data": "dataAssunzione" },
                { "data": "nomeRiferimento" },
            ],
            data: technicians
        });
    } catch (error) {
        console.error(error.message);
    }
}

async function initializeManagersTable() {
    const url = "https://sample-apis-sigma.vercel.app/api/dipendenti";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Response status: ' + response.status);
        }
        const json = await response.json();

        const managers = json.filter(employee => employee.categoria === "manager");

        console.log(managers);
        new DataTable('#managersTable', {
            "columns": [
                { "data": "codiceFiscale" },
                { "data": "nome" },
                { "data": "cognome" },
                { "data": "dataAssunzione" },
                { "data": "nomeRiferimento" },
            ],
            data: managers
        });
    } catch (error) {
        console.error(error.message);
    }
}

async function initializeDirigentiTable() {
    const url = "https://sample-apis-sigma.vercel.app/api/dipendenti";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Response status: ' + response.status);
        }
        const json = await response.json();

        const dirigenti = json.filter(employee => employee.categoria === "dirigente");

        console.log(dirigenti);
        new DataTable('#dirigentiTable', {
            "columns": [
                { "data": "codiceFiscale" },
                { "data": "nome" },
                { "data": "cognome" },
                { "data": "dataAssunzione" },
                { "data": "nomeRiferimento" },
            ],
            data: dirigenti
        });
    } catch (error) {
        console.error(error.message);
    }
}

async function initializeLeggendeTable() {
    const url = "https://sample-apis-sigma.vercel.app/api/dipendenti";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Response status: ' + response.status);
        }
        const json = await response.json();

        const date = new Date('2001-01-01');
        const leggende = json.filter(employee => new Date(employee.dataAssunzione) < date);

        console.log(leggende);
        $('#leggendeTable').DataTable({
            "columns": [
                { "data": "categoria" },
                { "data": "codiceFiscale" },
                { "data": "nome" },
                { "data": "cognome" },
                { "data": "dataAssunzione" },
                { "data": "nomeRiferimento" },
            ],
            data: leggende
        });
    } catch (error) {
        console.error(error.message);
    }
}

function toggleMenu() {
    const navOverlay = document.getElementById('navOverlay');
    const hamburger = document.getElementById('hamburger');

    if (navOverlay.classList.contains('active')) {
        navOverlay.classList.remove('active');
        hamburger.style.display = 'block';
    } else {
        navOverlay.classList.add('active');
        hamburger.style.display = 'none';
    }
}

document.querySelectorAll('#navOverlay a').forEach(link => {
    link.addEventListener('click', () => {
        const navOverlay = document.getElementById('navOverlay');
        const hamburger = document.getElementById('hamburger');

        navOverlay.classList.remove('active');
        hamburger.style.display = 'block';
    });
});

document.getElementById('hamburger').addEventListener('click', toggleMenu);
document.getElementById('closeMenu').addEventListener('click', toggleMenu);

initializeDataTable();
initializeTechniciansTable();
initializeManagersTable();
initializeDirigentiTable();
initializeLeggendeTable();