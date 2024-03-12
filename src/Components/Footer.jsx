
function Footer() {
    return (
        <footer>
            <div className="links">
                <a href='#'>Q&A</a>
                <a href='#'>Buyers</a>
            </div>

            <div className="socials">
                <p>Design & Develop By</p>
                <a href="#"><img src={require('../Images/instagram.png')} /></a>
                <a href="#"><img src={require('../Images/whatsapp.png')} /></a>
            </div>
        </footer>
    )
}

export default Footer;