import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Button from '../common/button';
import Toggle from '../common/toggle';

export default function MenuBar({navLinks, lightMode, onSetLightMode}) {
    const [menuOpen, setMenuOpen] = useState(false)
    return (
        <nav className="lavish-menu-bar">
            <ul className={menuOpen && 'active'}>
                <Toggle onClick={() => onSetLightMode(!lightMode)} />
                <svg
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="lavish-logo"
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="50px"
                    height="50px"
                    viewBox="0 0 290 290"
                >
                    <title>Untitled-1</title>
                    <path d="M710,143a137,137,0,1,1-96.87,40.13A136.08,136.08,0,0,1,710,143m0-8A145,145,0,1,0,855,280,145,145,0,0,0,710,135Z" transform="translate(-565 -135)" /><polygon points="93.5 247 63.5 247 22.5 75 52.5 75 93.5 247" /><rect x="73" y="217" width="91" height="30" /><path d="M659.25,341.46l-5.12-21.73q21.2-32.79,42.4-65.56l35.29.42-55.89,86.87Z" transform="translate(-565 -135)" /><path d="M792.17,367.55l-25.39,14.36a.43.43,0,0,1-.57-.16L695.94,257.51a.42.42,0,0,1,.16-.57L708,256l24-1Z" transform="translate(-565 -135)" /><polygon points="201 247 231.21 247 272.5 75 242.29 75 201 247" /><path d="M709,249" transform="translate(-565 -135)" /><path d="M911,361" transform="translate(-565 -135)" /><path d="M732,377" transform="translate(-565 -135)" /><path d="M690,340" transform="translate(-565 -135)" /><path d="M707,341" transform="translate(-565 -135)" /><path d="M655.42,329.42" transform="translate(-565 -135)" /></svg>
                    {navLinks.map(({ title, path }, ind) => (
                        <li key={ind}><Link to={path}>{title}</Link></li>
                    ))}
                <Button type="flashy" rounded>Pricing</Button>
            </ul>
        </nav>
    )
}