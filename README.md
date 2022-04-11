<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/UIOWAjohnsonhj/TEAM_001">
    <img src="media/HVAC-erecords-logos_transparent.png" alt="Logo" width="240" height="240">
  </a>

<h3 align="center">HVAC eRecords</h3>

  <p align="center">
    This is a project for digitizing HVAC maintenance records.
    <br />
    <a href="https://github.com/UIOWAjohnsonhj/TEAM_001/wiki"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://hvac-erecords.herokuapp.com/">View Demo</a>
    ·
    <a href="https://github.com/UIOWAjohnsonhj/TEAM_001/wiki/User-Guide">User Guide</a>
    ·
    <a href="https://github.com/UIOWAjohnsonhj/TEAM_001/issues">Report Bug</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#django-backend">Django Backend</a></li>
        <li><a href="#nextjs-frontend">Nextjs Frontend</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributors">Contributors</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://hvac-erecords.herokuapp.com/)

Electronic HVAC Maintenance Records
<!-- expand project description -->

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Next.js](https://nextjs.org/)
* [Django](https://www.djangoproject.com/)
* [Tailwind](https://tailwindcss.com/)
* [PosgreSQL](https://www.postgresql.org//)


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

* Install python
* Install node.js
* Install PostgreSQL and pgAdmin



### Django backend
1. Change into the server directory: `cd server`
2. Create a virtualenv using: `python -m venv venv`
3. Activate the virtual environment: `source venv/bin/activate` or `.\venv\Scripts\activate`
4. Install all required packages: `pip3 install -r requirements.txt`
5. Install `psycopg2`: `pip3 install psycopg2` or `pip3 install psycopg2-binary` (if other doesn't work. Though this is only for development/testing)
6. Create a .env file inside the same directory where `settings.py` is located
7. Add the following to your .env file with your information:

```
DJANGO_SECRET_KEY=
DB_NAME=
DB_USER=
DB_PASS=
DB_HOST=
DB_PORT=
```

To exit out of virtual environment: `deactivate`



### Nextjs Frontend
1. Change into the client directory: `cd client`
2. Install all dependencies: `npm install`
3. Create `.env` file in the `client` directory
4. Add the following to your .env file:

```
NEXT_PUBLIC_HOST=http://127.0.0.1:8000
```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [User Guide](https://github.com/UIOWAjohnsonhj/TEAM_001/wiki/User-Guide)_

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Improve accounts system
- [ ] Records system
- [ ] [TBD](https://github.com/UIOWAjohnsonhj/TEAM_001#workspaces/)

See the [open issues](https://github.com/UIOWAjohnsonhj/TEAM_001/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTORS  -->
## Contributors

[![Michael Bilenko](https://github.com/michael-bilenko.png?size=100)](https://github.com/michael-bilenko) | [![Kevin Dao](https://github.com/kevintdao.png?size=100)](https://github.com/kevintdao) | [![Andrew Murley](https://github.com/AndrewMurley.png?size=100)](https://github.com/AndrewMurley) | [![Alfredo Filerio](https://github.com/AFilerio.png?size=100)](https://github.com/AFilerio)
---|---|---|---
[Michael Bilenko](https://github.com/michael-bilenko) | [Kevin Dao](https://github.com/kevintdao) | [Andrew Murley](https://github.com/AndrewMurley) | [Alfredo Filerio](https://github.com/AFilerio)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
[product-screenshot]: media/preview.png
