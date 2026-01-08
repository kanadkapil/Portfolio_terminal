document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal');
    const colorOptions = {
        light: '#fff',
        blue: '#00f',
        green: '#0f0',
        red: '#f00',
        violet: '#ee82ee',
        orange: '#ffa500'
    };

    const commands = {
        clear: () => {
            terminal.innerHTML = '';
            printWelcomeMessage();
            printInputLine();
        },
        help: () => printToTerminal(`
        <br>
            Available commands:<br>
            - clear: Clear the terminal<br>
            - help: Show this help message<br>
            - about: Show about information<br>
            - description: Show description<br>
            - socials: Show social media links<br>
            - skills: Show skills<br>
            - projects: Show projects<br>
            - color [option]: Change text color. Options: light, blue, green, red, violet, orange<br>
        `),
        about: () => printToTerminal(`
            <br>
            <h1>About</h1>
            <br>
            Kanad Kapil is a student, Web designer, Musician. Currently, he is pursuing B.Tech(CSE) from Lovely Professional University (LPU), Punjab. His SSC was in 2018, and HSC in 2020. He was born and brought up in Dhaka, Bangladesh. Kanad Kapil is an enthusiastic, reliable, responsible, self-motivated person. He knows his field and forces himself for hard work. He handles his situation maturely and efficiently. Taking challenges is his hobby. Handling pressure is one of the valuable skills he has.
        `),
        description: () => printToTerminal(`<br><h1>Details</h1><br>
        I am a dedicated student with a passion for web design, having honed my skills in HTML, CSS, Bootstrap, and PHP over a period of three years. My journey in the world of web development began as a student, and I continue to expand my knowledge in this field. My ultimate goal is to become a proficient full stack developer, equipped with the skills not only to create stunning digital experiences but also to ensure their security.
        Beyond the realm of coding, I find solace and creativity in the world of art. As a Bengali writer, singer, and violinist, I immerse myself in various forms of artistic expression. These artistic endeavors fuel my sense of self, enabling me to channel my thoughts, emotions, and ideas into beautiful creations.
        While I recognize that perfection is a journey rather than a destination, I approach my work with unwavering determination. Every project I undertake is a step forward, an opportunity to learn, grow, and refine my abilities. My multifaceted interests and unwavering commitment define my path, one that I tread with enthusiasm and an open heart.
        Stay tuned for more updates on my journey as I traverse the realms of web development, cybersecurity, and the captivating world of art. Your support and encouragement are invaluable as I continue to evolve and embrace the opportunities that come my way.`),
        socials: () => printToTerminal('Your social media links go here.'),
        skills: () => printToTerminal(`<br><h1>Skills</h1> <br><br>
        <h2>Technical</h2><br>
        HTML<br>
        Bootstrap<br>
        JavaScript<br>
        PHP<br><br>
        
        <h2>Soft</h2><br>
        Writing<br>
        Music<br>
        Singing<br>
        Violin<br>
        Communication<br><br>
        
        <h2>Language</h2><br>
        English<br>
        Bengali<br>
        `),
        projects: () => printToTerminal('Your projects go here.'),
        color: (option) => {
            if (colorOptions[option]) {
                terminal.style.color = colorOptions[option];
                printToTerminal(`Changed text color to ${option}`);
            } else {
                printToTerminal(`Invalid color option: ${option}. Available options: light, blue, green, red, violet, orange`);
            }
        }
    };

    const printToTerminal = (message) => {
        const newLine = document.createElement('div');
        newLine.innerHTML = message; // Changed to innerHTML
        terminal.appendChild(newLine);
        terminal.scrollTop = terminal.scrollHeight;
    };

    const printInputLine = () => {
        const inputLine = document.createElement('div');
        inputLine.id = 'inputLine';
        inputLine.className = 'd-flex';
        inputLine.innerHTML = `<span>&gt;</span> <input type="text" id="commandInput" autofocus>`;
        terminal.appendChild(inputLine);
        const commandInput = document.getElementById('commandInput');

        commandInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const input = commandInput.value.trim();
                commandInput.value = '';
                inputLine.remove();
                const [cmd, arg] = input.split(' ');
                if (commands[cmd]) {
                    commands[cmd](arg);
                } else {
                    printToTerminal(`Command not found: ${input}`);
                }
                printInputLine();
            }
        });

        commandInput.focus();
        terminal.scrollTop = terminal.scrollHeight;
    };

    const printWelcomeMessage = () => {
        printToTerminal(`Welcome to Kanad Kapil's Project,\nI hope you are used to with terminal. You can get commands help, writing "help", you will get necessary instructions over there.`);
    };

    printWelcomeMessage();
    printInputLine();
});
