const app = document.querySelector('body');

const container = document.createElement('div');
container.setAttribute('id', 'root');

app.appendChild(container);

const req = new XMLHttpRequest();
const gitURL = 'https://api.github.com/users/dfimbres/repos';

req.open('GET', gitURL, true);

req.onload = function () {
    var data = JSON.parse(this.response);

    //No Errors
    if (req.status >= 200 && req.status < 400) {
        data.forEach(project => {
            console.log(project);

            //Dont have website project on website
            if (project.name == 'dfimbres.github.io') return;

            const card = document.createElement('div');
            card.setAttribute('class', 'card');

            const link = document.createElement('a');
            link.setAttribute('href', project.html_url);
            link.setAttribute('target', '_blank');

            const title = document.createElement('h1');
            title.textContent = project.name;

            container.appendChild(card);
            card.appendChild(link);
            link.appendChild(title);

            if (project.homepage != "" && project.homepage != null) {
                const globe = document.createElement('img');
                globe.setAttribute('src', 'img/globe.png');

                const site = document.createElement('a');
                site.setAttribute('href', project.homepage);
                site.setAttribute('target', '_blank');

                card.appendChild(site);
                site.appendChild(globe);
            }

            if (project.description != null) {
                const text = document.createElement('p');
                project.description = project.description.substring(0, 140);
                text.textContent = `${project.description}...`;
                card.appendChild(text);
            }
        });
    } else {
        const error = document.createElement('h1');
        error.textContent = "This isn't working!";

        container.appendChild(error);
        console.log(data);
    }
}

req.send();

// Globe by Ben from the Noun Project