import React from 'react'
import './Footer.css'
import Button from './Button'

const Footer = () => {
  return (
    <>
      <div className="footer_div">
        <div className="upper_content">
          <div className="quick_links">
            <h2 className="quick_link_heading">Quick Links</h2>
            <ul className="quick_list">
              <a className="links" href="/videos">
                <li>Videos</li>
              </a>
              <a className="links" href="/images">
                <li>Images</li>
              </a>
              <a className="links" href="/experience">
                <li>Read Travel Experience</li>
              </a>
              <a className="links" href="/account">
                <li>Profile</li>
              </a>
              <a className="links" href="/create">
                <li>Write Your Travel Experience</li>
              </a>
              <a className="links" href="/login">
                <li>Login/Signup</li>
              </a>
            </ul>
          </div>
          <div className="form_div">
            <h2>Subscribe to get notification</h2>
            <form action="/" method="post">
              <input
                className="form_input"
                type="text"
                name="name"
                id="name"
                placeholder="Your Name"
              />
              <input
                className="form_input"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
              />
              <Button name="Subscribe" />
            </form>
          </div>
        </div>
        <div className="meida_icons">
          <a className="m_icons" target="__blank" href="https://youtube.com/">
            <li>
              <i class="fa-brands fa-youtube"></i>
            </li>
          </a>
          <a
            className="m_icons"
            target="__blank"
            href="https://www.instagram.com/"
          >
            <li>
              <i class="fa-brands fa-instagram"></i>
            </li>
          </a>
          <a
            className="m_icons"
            target="__blank"
            href="https://www.pinterest.ca/"
          >
            <li>
              <i class="fa-brands fa-pinterest"></i>
            </li>
          </a>
          <a
            className="m_icons"
            target="__blank"
            href="https://www.facebook.com/"
          >
            <li>
              <i class="fa-brands fa-facebook"></i>
            </li>
          </a>
          <a className="m_icons" target="__blank" href="/login">
            <li>
              <i class="fa-brands fa-whatsapp"></i>
            </li>
          </a>
          <a
            className="m_icons"
            target="__blank"
            href="https://www.reddit.com/"
          >
            <li>
              <i class="fa-brands fa-reddit"></i>
            </li>
          </a>
        </div>
        <div className="copyright">
          <p>Designed and developed by Saurabh Singh &copy; copyright 2022</p>
        </div>
      </div>
    </>
  );
}

export default Footer