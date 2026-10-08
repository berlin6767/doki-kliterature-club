/* ===== Club de Literatura Doki Doki - Interactive Script ===== */

// ===== Data =====
const MEMBERS = [
    {
        id: 'sayori',
        name: 'Sayori',
        role: 'Vicepresidenta',
        emoji: '☀️',
        desc: 'Alegre, optimista y siempre lista para animarte. Ama los poemas simples y sinceros.',
        color: 'sayori',
        dialogues: {
            greeting: [
                '¡Holaaaa! ¡Qué alegría verte por aquí! ☀️',
                '¡Hey! ¿Listo para escribir algo hermoso hoy?',
                '¡Bienvenido al club! ¡Estoy tan feliz de que estés aquí!'
            ],
            responses: {
                '¿Cómo estás?': '¡Estoy genial! Aunque a veces me siento un poco... ¿sabes? Pero hoy es un día perfecto para poemas.',
                'Háblame de poesía': 'A mí me gustan los poemas que hablan del día a día, de la lluvia, de los amigos... ¡Cosas que hacen sonreír!',
                'Consejo para escribir': '¡Solo escribe lo que sientes! No tiene que ser perfecto. La sinceridad es lo más bonito.'
            }
        }
    },
    {
        id: 'yuri',
        name: 'Yuri',
        role: 'Miembro',
        emoji: '📚',
        desc: 'Reservada y profunda. Disfruta de la literatura compleja y los poemas intensos.',
        color: 'yuri',
        dialogues: {
            greeting: [
                'Hola... Me alegra que hayas venido. Es... agradable tener compañía.',
                'Bienvenido. ¿Te interesa la poesía más... elaborada?',
                'Ah, hola. Espero no interrumpir tu lectura...'
            ],
            responses: {
                '¿Cómo estás?': 'Estoy bien, gracias. Acabo de terminar un libro fascinante sobre... bueno, preferiría no aburrirte con los detalles.',
                'Háblame de poesía': 'La poesía es un espejo del alma. Me fascina cómo las metáforas pueden expresar lo que las palabras simples no alcanzan.',
                'Consejo para escribir': 'No temas la oscuridad en tus versos. A veces la belleza más profunda nace de las sombras.'
            }
        }
    },
    {
        id: 'natsuki',
        name: 'Natsuki',
        role: 'Miembro',
        emoji: '🧁',
        desc: 'Tsundere y apasionada por el manga. Sus poemas son cortos, directos y con mucho carácter.',
        color: 'natsuki',
        dialogues: {
            greeting: [
                '¡H-hola! No es que me alegre de verte o nada... ¡Solo estaba por aquí!',
                'Oh, eres tú. Bueno, ya que estás, ¿qué quieres?',
                '¡No me mires así! Estaba... organizando los poemas, ¿ok?'
            ],
            responses: {
                '¿Cómo estás?': '¡Estoy bien! No es asunto tuyo, pero... sí, estoy bien. Gracias por preguntar, supongo.',
                'Háblame de poesía': '¡Los poemas cortos son los mejores! No necesitas mil palabras para decir algo importante. ¡Menos es más!',
                'Consejo para escribir': 'Sé directo. No andes con rodeos. Si sientes algo, dilo. ¡Y no te avergüences de tus gustos!'
            }
        }
    },
    {
        id: 'monika',
        name: 'Monika',
        role: 'Presidenta',
        emoji: '💚',
        desc: 'Carismática, inteligente y dedicada. Siempre buscando lo mejor para el club y sus miembros.',
        color: 'monika',
        dialogues: {
            greeting: [
                '¡Hola! Qué bueno que decidiste unirte a nosotros. El club no sería lo mismo sin nuevos talentos.',
                'Bienvenido al Club de Literatura. Espero que encuentres un hogar aquí.',
                '¡Hey! Me alegra verte. ¿Listo para descubrir el poder de las palabras?'
            ],
            responses: {
                '¿Cómo estás?': 'Estoy excelente, gracias. Dirigir el club me llena de energía. Cada poema nuevo es una pequeña victoria.',
                'Háblame de poesía': 'La poesía es libertad. Nos permite expresar lo que a veces no podemos decir en voz alta. Es mi forma favorita de conectar.',
                'Consejo para escribir': 'Lee mucho, escribe todos los días, y no tengas miedo de experimentar. El club está aquí para apoyarte.'
            }
        }
    }
];

const WORD_BANK = [
    'amor', 'noche', 'estrellas', 'corazón', 'sueño', 'lluvia',
    'libro', 'páginas', 'tinta', 'silencio', 'luz', 'sombra',
    'flor', 'jardín', 'viento', 'mar', 'cielo', 'luna',
    'amigo', 'sonrisa', 'lágrima', 'esperanza', 'tiempo', 'memoria',
    'verso', 'rima', 'melodía', 'eco', 'susurro', 'destino'
];

// ===== State =====
let currentMemberIndex = 0;
let userName = localStorage.getItem('ddl_userName') || '';
let poemWords = [];
let selectedMemberId = null;

// ===== DOM Elements =====
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initNameSystem();
    renderMembers();
    initWordBank();
    initPoemCanvas();
    initFormValidation();
    initNavigation();
    initKeyboard();
    fetchRandomPoem();
    loadSavedPoem();
});

// ===== Particles =====
function initParticles() {
    const container = $('#particles');
    const colors = ['#ffb7c5', '#d4a5ff', '#a5d8ff', '#b2f2bb', '#ffc9c9'];
    
    for (let i = 0; i < 25; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.width = (6 + Math.random() * 10) + 'px';
        p.style.height = p.style.width;
        p.style.animationDuration = (8 + Math.random() * 12) + 's';
        p.style.animationDelay = (Math.random() * 8) + 's';
        container.appendChild(p);
    }
}

// ===== Name System (Personalization + localStorage) =====
function initNameSystem() {
    const nameForm = $('#nameForm');
    const welcomeMsg = $('#welcomeMsg');
    const displayName = $('#displayName');
    const userNameInput = $('#userName');
    const saveBtn = $('#saveNameBtn');
    const changeBtn = $('#changeNameBtn');

    if (userName) {
        nameForm.classList.add('hidden');
        welcomeMsg.classList.remove('hidden');
        displayName.textContent = userName;
    }

    function saveName() {
        const name = userNameInput.value.trim();
        if (name.length < 2) {
            userNameInput.focus();
            userNameInput.style.borderColor = '#ff6b6b';
            return;
        }
        userName = name;
        localStorage.setItem('ddl_userName', userName);
        nameForm.classList.add('hidden');
        welcomeMsg.classList.remove('hidden');
        displayName.textContent = userName;
    }

    saveBtn.addEventListener('click', saveName);
    userNameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') saveName();
    });

    changeBtn.addEventListener('click', () => {
        welcomeMsg.classList.add('hidden');
        nameForm.classList.remove('hidden');
        userNameInput.value = userName;
        userNameInput.focus();
    });
}

// ===== Members Rendering & Interaction =====
function renderMembers() {
    const grid = $('#membersGrid');
    grid.innerHTML = MEMBERS.map((m, i) => `
        <article class="member-card card-${m.color}" data-index="${i}" data-id="${m.id}" tabindex="0" role="button" aria-label="Hablar con ${m.name}">
            <div class="member-avatar">${m.emoji}</div>
            <h3 class="member-name">${m.name}</h3>
            <p class="member-role">${m.role}</p>
            <p class="member-desc">${m.desc}</p>
        </article>
    `).join('');

    grid.querySelectorAll('.member-card').forEach(card => {
        card.addEventListener('click', () => openDialogue(parseInt(card.dataset.index)));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openDialogue(parseInt(card.dataset.index));
            }
        });
    });
}

function selectMember(index) {
    currentMemberIndex = (index + MEMBERS.length) % MEMBERS.length;
    $$('.member-card').forEach((c, i) => {
        c.classList.toggle('selected', i === currentMemberIndex);
    });
    const selected = $$('.member-card')[currentMemberIndex];
    if (selected) selected.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function openDialogue(index) {
    currentMemberIndex = index;
    selectMember(index);
    const member = MEMBERS[index];
    selectedMemberId = member.id;

    const modal = $('#dialogueModal');
    const avatar = $('#dialogueAvatar');
    const nameEl = $('#dialogueName');
    const textEl = $('#dialogueText');
    const choicesEl = $('#dialogueChoices');

    avatar.textContent = member.emoji;
    avatar.style.borderColor = getComputedStyle(document.querySelector(`.card-${member.color}`)).getPropertyValue('--card-color');
    nameEl.textContent = member.name;

    // Random greeting
    const greetings = member.dialogues.greeting;
    const greeting = greetings[Math.floor(Math.random() * greetings.length)];
    
    // Typewriter effect
    textEl.textContent = '';
    modal.classList.remove('hidden');
    
    let i = 0;
    const typeSpeed = 30;
    function typeWriter() {
        if (i < greeting.length) {
            textEl.textContent += greeting.charAt(i);
            i++;
            setTimeout(typeWriter, typeSpeed);
        }
    }
    typeWriter();

    // Choices
    const choices = Object.keys(member.dialogues.responses);
    choicesEl.innerHTML = choices.map(c => 
        `<button class="choice-btn" data-choice="${c}">${c}</button>`
    ).join('') + `<button class="choice-btn" data-choice="close">Adiós por ahora</button>`;

    choicesEl.querySelectorAll('.choice-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const choice = btn.dataset.choice;
            if (choice === 'close') {
                closeDialogue();
                return;
            }
            const response = member.dialogues.responses[choice];
            textEl.textContent = '';
            let j = 0;
            function typeResponse() {
                if (j < response.length) {
                    textEl.textContent += response.charAt(j);
                    j++;
                    setTimeout(typeResponse, typeSpeed);
                }
            }
            typeResponse();
        });
    });
}

function closeDialogue() {
    $('#dialogueModal').classList.add('hidden');
}

$('#closeDialogue').addEventListener('click', closeDialogue);
$('#dialogueModal').addEventListener('click', (e) => {
    if (e.target === $('#dialogueModal')) closeDialogue();
});

// ===== Poem of the Day (External API) =====
async function fetchRandomPoem() {
    const loading = $('#poemLoading');
    const content = $('#poemContent');
    const error = $('#poemError');
    
    loading.classList.remove('hidden');
    content.classList.add('hidden');
    error.classList.add('hidden');

    try {
        const res = await fetch('https://poetrydb.org/random');
        if (!res.ok) throw new Error('API error');
        const data = await res.json();
        const poem = Array.isArray(data) ? data[0] : data;

        $('#poemTitle').textContent = poem.title || 'Poema sin título';
        $('#poemAuthor').textContent = `— ${poem.author || 'Anónimo'}`;
        
        const linesEl = $('#poemLines');
        // Limit lines for display
        const lines = (poem.lines || []).slice(0, 16);
        linesEl.innerHTML = lines.map(l => `<p>${l || '&nbsp;'}</p>`).join('');

        loading.classList.add('hidden');
        content.classList.remove('hidden');
    } catch (err) {
        console.error(err);
        loading.classList.add('hidden');
        error.classList.remove('hidden');
    }
}

$('#newPoemBtn')?.addEventListener('click', fetchRandomPoem);
$('#retryPoemBtn')?.addEventListener('click', fetchRandomPoem);

// ===== Word Bank & Drag and Drop =====
function initWordBank() {
    const bank = $('#wordBank');
    bank.innerHTML = WORD_BANK.map(w => 
        `<span class="word-chip" draggable="true" data-word="${w}">${w}</span>`
    ).join('');

    bank.querySelectorAll('.word-chip').forEach(chip => {
        // Click to add
        chip.addEventListener('click', () => addWordToPoem(chip.dataset.word));
        
        // Drag
        chip.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', chip.dataset.word);
            chip.classList.add('dragging');
        });
        chip.addEventListener('dragend', () => chip.classList.remove('dragging'));
    });
}

function initPoemCanvas() {
    const canvas = $('#poemCanvas');
    
    canvas.addEventListener('dragover', (e) => {
        e.preventDefault();
        canvas.classList.add('drag-over');
    });
    
    canvas.addEventListener('dragleave', () => {
        canvas.classList.remove('drag-over');
    });
    
    canvas.addEventListener('drop', (e) => {
        e.preventDefault();
        canvas.classList.remove('drag-over');
        const word = e.dataTransfer.getData('text/plain');
        if (word) addWordToPoem(word);
    });
}

function addWordToPoem(word) {
    poemWords.push(word);
    renderPoemWords();
}

function renderPoemWords() {
    const area = $('#poemLinesArea');
    const placeholder = $('#canvasPlaceholder');
    
    if (poemWords.length === 0) {
        placeholder.classList.remove('hidden');
        area.innerHTML = '';
        return;
    }
    
    placeholder.classList.add('hidden');
    area.innerHTML = poemWords.map((w, i) => 
        `<span class="poem-word" data-index="${i}" title="Clic para eliminar">${w}</span>`
    ).join('');
    
    area.querySelectorAll('.poem-word').forEach(el => {
        el.addEventListener('click', () => {
            const idx = parseInt(el.dataset.index);
            poemWords.splice(idx, 1);
            renderPoemWords();
        });
    });
}

// Poem actions
$('#clearPoemBtn').addEventListener('click', () => {
    poemWords = [];
    renderPoemWords();
    showStatus('Poema limpiado');
});

$('#savePoemBtn').addEventListener('click', () => {
    if (poemWords.length === 0) {
        showStatus('¡Agrega algunas palabras primero!', true);
        return;
    }
    localStorage.setItem('ddl_savedPoem', JSON.stringify(poemWords));
    showStatus('✅ Poema guardado en tu dispositivo');
});

$('#loadPoemBtn').addEventListener('click', () => {
    loadSavedPoem(true);
});

function loadSavedPoem(showMsg = false) {
    const saved = localStorage.getItem('ddl_savedPoem');
    if (saved) {
        try {
            poemWords = JSON.parse(saved);
            renderPoemWords();
            if (showMsg) showStatus('Poema cargado');
        } catch (e) {
            if (showMsg) showStatus('Error al cargar', true);
        }
    } else if (showMsg) {
        showStatus('No hay poema guardado', true);
    }
}

function showStatus(msg, isError = false) {
    const el = $('#savedStatus');
    el.textContent = msg;
    el.style.color = isError ? '#e03131' : '#69db7c';
    setTimeout(() => { el.textContent = ''; }, 3000);
}

// ===== Form Validation (Real-time) =====
function initFormValidation() {
    const form = $('#joinForm');
    const fields = {
        fullName: {
            el: $('#fullName'),
            error: $('#fullNameError'),
            validate: (v) => {
                if (!v.trim()) return 'El nombre es obligatorio';
                if (v.trim().length < 3) return 'Mínimo 3 caracteres';
                return '';
            }
        },
        email: {
            el: $('#email'),
            error: $('#emailError'),
            validate: (v) => {
                if (!v.trim()) return 'El correo es obligatorio';
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!re.test(v)) return 'Correo no válido';
                return '';
            }
        },
        favorite: {
            el: $('#favorite'),
            error: $('#favoriteError'),
            validate: (v) => !v ? 'Selecciona un miembro favorito' : ''
        },
        reason: {
            el: $('#reason'),
            error: $('#reasonError'),
            validate: (v) => {
                if (!v.trim()) return 'Cuéntanos por qué quieres unirte';
                if (v.trim().length < 20) return 'Mínimo 20 caracteres';
                return '';
            }
        },
        terms: {
            el: $('#terms'),
            error: $('#termsError'),
            validate: (checked) => !checked ? 'Debes aceptar las reglas del club' : ''
        }
    };

    // Char counter
    const reasonEl = $('#reason');
    const charCount = $('#charCount');
    reasonEl.addEventListener('input', () => {
        charCount.textContent = `${reasonEl.value.length} / 300`;
    });

    // Real-time validation
    Object.values(fields).forEach(field => {
        const eventType = field.el.type === 'checkbox' ? 'change' : 'input';
        field.el.addEventListener(eventType, () => validateField(field));
        field.el.addEventListener('blur', () => validateField(field));
    });

    function validateField(field) {
        const value = field.el.type === 'checkbox' ? field.el.checked : field.el.value;
        const error = field.validate(value);
        field.error.textContent = error;
        field.el.classList.toggle('invalid', !!error);
        field.el.classList.toggle('valid', !error && (field.el.type === 'checkbox' ? field.el.checked : field.el.value.trim()));
        return !error;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let allValid = true;
        Object.values(fields).forEach(field => {
            if (!validateField(field)) allValid = false;
        });

        if (!allValid) return;

        // Save membership to localStorage
        const membership = {
            fullName: fields.fullName.el.value.trim(),
            email: fields.email.el.value.trim(),
            favorite: fields.favorite.el.value,
            reason: fields.reason.el.value.trim(),
            joinedAt: new Date().toISOString(),
            userName: userName || 'Anónimo'
        };
        localStorage.setItem('ddl_membership', JSON.stringify(membership));

        // Show success
        form.classList.add('hidden');
        const success = $('#successMsg');
        success.classList.remove('hidden');
        $('#successText').textContent = `¡Gracias, ${membership.fullName}! Tu solicitud ha sido registrada. ${userName ? userName + ', ' : ''}el club te espera con los brazos abiertos 💖`;
    });

    $('#resetFormBtn').addEventListener('click', () => {
        form.reset();
        form.classList.remove('hidden');
        $('#successMsg').classList.add('hidden');
        Object.values(fields).forEach(f => {
            f.error.textContent = '';
            f.el.classList.remove('invalid', 'valid');
        });
        charCount.textContent = '0 / 300';
    });
}

// ===== Navigation =====
function initNavigation() {
    const toggle = $('#menuToggle');
    const nav = $('#nav');
    
    toggle.addEventListener('click', () => {
        nav.classList.toggle('open');
    });

    $$('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            $$('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Active on scroll
    const sections = ['inicio', 'miembros', 'poema', 'escribir', 'unirse'];
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section && window.scrollY >= section.offsetTop - 120) {
                current = id;
            }
        });
        $$('.nav-link').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    });
}

// ===== Keyboard Interactions =====
function initKeyboard() {
    document.addEventListener('keydown', (e) => {
        // Escape closes modal
        if (e.key === 'Escape') {
            closeDialogue();
            return;
        }

        // Arrow keys for members (when not typing)
        if (['ArrowLeft', 'ArrowRight'].includes(e.key) && 
            !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
            e.preventDefault();
            if (e.key === 'ArrowLeft') selectMember(currentMemberIndex - 1);
            else selectMember(currentMemberIndex + 1);
        }

        // P key goes to poem section
        if ((e.key === 'p' || e.key === 'P') && 
            !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
            document.getElementById('poema').scrollIntoView({ behavior: 'smooth' });
        }

        // Enter on selected member opens dialogue
        if (e.key === 'Enter' && document.activeElement.classList.contains('member-card')) {
            openDialogue(parseInt(document.activeElement.dataset.index));
        }
    });
}

// Prevent default drag image issues on some browsers
document.addEventListener('dragstart', (e) => {
    if (e.target.classList.contains('word-chip')) {
        e.dataTransfer.effectAllowed = 'copy';
    }
});
