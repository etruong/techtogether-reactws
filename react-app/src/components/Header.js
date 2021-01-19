import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faHome,
    faUserAlt,
    faComment,
    faTools,
  } from '@fortawesome/free-solid-svg-icons'

export function Header(props) {
    return (
        <header>
            <h1>Crossing Paths</h1>
            <nav>
                <ul>
                    <li><FontAwesomeIcon icon={faHome} /></li>
                    <li><FontAwesomeIcon icon={faUserAlt} /></li>
                    <li><FontAwesomeIcon icon={faComment} /></li>
                    <li><FontAwesomeIcon icon={faTools} /></li>
                </ul>
            </nav>
        </header>
    );
}