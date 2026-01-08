document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal');

    const commands = {
        clear: () => {
            terminal.innerHTML = '';
            printWelcomeMessage();
            printInputLine();
        },
        help: () => printToTerminal(`
            Available commands:
            - clear: Clear the terminal
            - help: Show this help message
            - about: Show about information
            - description: Show description
            - socials: Show social media links
            - skills: Show skills
            - projects: Show projects
        `),
        about: () => printToTerminal('Your about information goes here.'),
        description: () => printToTerminal('Your description goes here.'),
        socials: () => printToTerminal('Your social media links go here.'),
        skills: () => printToTerminal('Your skills go here.'),
        projects: () => printToTerminal('Your projects go here.')
    };

    const printToTerminal = (message) => {
        const newLine = document.createElement('div');
        newLine.innerText = message;
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
                if (commands[input]) {
                    commands[input]();
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
        printToTerminal(`Welcome to Kanad Kapil's Project,\nI hope you are used to with terminal. You can get commands help, writing *help*, you will get necessary instructions over there.`);
    };

    printWelcomeMessage();
    printInputLine();
});
