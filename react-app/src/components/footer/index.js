import './footer.css'

const FooterDisplay = () => {
  return(
      <div id='williamlinks'>
        < a className="linkimages" href="https://github.com/wziller">
            <img id='githublogo' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="github" />
        </a>
        <p id='nameBox'>William Ziller</p>
        <a className="linkimages" href="https://www.linkedin.com/in/william-ziller-99b45a90/">
            <img id='linkedinlogo' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-plain.svg" alt="linkedin" />
        </a>
      </div>
  )
};

export default FooterDisplay
