import React, { useState } from 'react'
import "./Home.css"
import { Link } from 'react-router-dom'

import { useNavigate } from 'react-router-dom';
import { FaSistrix } from "react-icons/fa";

const Home = () => {
//for home component
const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();

    const handleSearch = (textToSearch) => {
        if (textToSearch.trim() === '') {
            return;
        }
        // Navigate to JobList with searchText as query parameter
        navigate(`/jobList?search=${encodeURIComponent(searchText)}`);
    }

    return (
        <>
            <div className='home-searchbar'>
                <button className='btn-search' onClick={(e) => handleSearch(searchText)}>
                    <FaSistrix />
                </button>
                <input
                    className='input-search'
                    id='search-bar-section'
                    type='text'
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder='Enter to search'
                />
            </div>

            <div> <header class="banner">
                <div class="leftBannerSide">
                    <h1>Find the job that fit your life</h1><br />
                    <i>"A job portal is an online platform connecting job seekers and employers, offering a vast array of job listings across industries."</i>

                </div>
                <div class="rightBannerSide">
                    <img src="/img/intro.png" alt="" srcset="" />
                </div>
            </header>

                <section class="browseSection">
                    <div class="browseSectionTop">
                        <h2>Browse Categories</h2>
                        <p>Most categories of portal. sorted by popularity</p>
                    </div>
                    <div class="browseSectiondown">
                        <div class="firstRow">
                            <Link class="browserIntem home-search-text" to={"/jobList?search=Web Design"}>
                                <img src="../img/responsive.png" alt="" />
                                <span><b >Web Design</b></span>
                                </Link>
                            <Link class="browserIntem home-search-text"to={"/jobList?search=Graphic design"}> 
                                <img src="../img/illustration.png" alt="" />
                                <span><b >Graphic design</b></span>
                                </Link>
                            <Link class="browserIntem home-search-text">
                                <img src="../img/web-development.png" alt="" />
                                <span><b>Web Development</b></span>
                                </Link>
                        </div>
                        <div class="secondRow">
                            <Link class="browserIntem home-search-text" to={"/jobList?search=human"}>
                                <img src="../img/hiring.png" alt="" />
                                <span><b >Human Resource</b></span>
                                </Link>

                            <Link class="browserIntem home-search-text" to={"/jobList?search=support"}>
                                <img src="../img/technical-support.png" alt="" />
                                <span><b >Support</b></span>
                                </Link>
                            <Link class="browserIntem home-search-text" to={"/jobList?search=andriod"}>
                                <img src="../img/desktop.png" alt="" />
                                <span><b >Android Development</b></span>
                            </Link>

                        </div>
                    </div>
                </section>

                <section class="middleContainer">
                    <div class="middleContainerTop">
                        <h2>How It Works?</h2>
                        <p>Lorem ipsum dolor sit amet. consectetur adipiscing elit ellente-sque dignissim quam et
                            metus effci turac fr.ng.lla lorem facilrsis.</p>
                    </div>
                    <div class="middleContainerBottom">
                        <Link to="/signUp">
                            <div class="middleContainerTopitem">
                                <img src="../img/profile.png" alt="" />
                                <h4>Create an Account</h4>
                            </div>
                        </Link>
                        <a href="#search-bar-section">
                            <div class="middleContainerTopitem">
                                <img src="../img/search (1).png" alt="" />
                                <h4>Search Jobs</h4>
                            </div>
                        </a>
                        <Link to="/jobList">
                            <div class="middleContainerTopitem">
                                <img src="../img/posting.png" alt="" />
                                <h4>View All Jobs</h4>
                            </div>
                        </Link>
                    </div>

                </section>

                <div class="footer">
                    <div class="footer-links">
                        <a href="#">About Us</a>
                        <a href="#">Support</a>
                        <a href="#">Contact</a>
                    </div>
                    <div class="social-icons">
                        <a href=""><img src="../img/logo/facebook.png" alt="Facebook" /></a>
                        <a href=""><img src="../img/logo/twitter.png" alt="Twitter" /></a>
                        <a href=""><img src="../img/logo/linkedin.png" alt="LinkedIn" /></a>
                        <a href=""><img src="../img/logo/social.png" alt="Google" /></a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home