import React from 'react';

import '../css/Notifications.css';

import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from 'reactstrap';

class Notifications extends React.Component{

    constructor(props){
        super(props);

        var today = new Date();

        this.state = {
            database: [
                this.createData('Schedule', 'INOVATE S17 is full.',             false,  today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(), "", ""),
                this.createData('Friend',   'Juan Tamad saved a new schedule.', true,   today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(), "", ""),
                this.createData('Schedule', 'FTDANCE S15 was dissolved.',       true,   today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(), "", "")
            ]
        }
    }

    createData(category, message, seen, date, icon, bgColor) {
        return {category, message, seen, date, icon, bgColor };
    }

    specifyIcon(props) {
        const category = props.category;

        if(category == "Schedule"){
            return (
                <svg class='bi bi-calendar-fill' width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M0 2a2 2 0 012-2h12a2 2 0 012 2H0z'></path> <path fill-rule='evenodd' d='M0 3h16v11a2 2 0 01-2 2H2a2 2 0 01-2-2V3zm6.5 4a1 1 0 100-2 1 1 0 000 2zm4-1a1 1 0 11-2 0 1 1 0 012 0zm2 1a1 1 0 100-2 1 1 0 000 2zm-8 2a1 1 0 11-2 0 1 1 0 012 0zm2 1a1 1 0 100-2 1 1 0 000 2zm4-1a1 1 0 11-2 0 1 1 0 012 0zm2 1a1 1 0 100-2 1 1 0 000 2zm-8 2a1 1 0 11-2 0 1 1 0 012 0zm2 1a1 1 0 100-2 1 1 0 000 2zm4-1a1 1 0 11-2 0 1 1 0 012 0z' clip-rule='evenodd'/>
                </svg>
            );
        }
        else {
            return (
                <svg class='bi bi-people-fill' width='1em' height='1em' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
                    <path fill-rule='evenodd' d='M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 100-6 3 3 0 000 6zm-5.784 6A2.238 2.238 0 015 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 005 9c-4 0-5 3-5 4s1 1 1 1h4.216zM4.5 8a2.5 2.5 0 100-5 2.5 2.5 0 000 5z' clip-rule='evenodd'/>
                </svg>
            );
        }
    }

    render (){
        const options = [];
        var list = this.state.database;
        
        for (let i=0; i < list.length; i++){

            // SPECIFY BACKGROUND COLOR
            if(!list[i].seen){
                list[i].bgColor = "#E5E5E5";
                // #D3D3D3
            }
            else {
                list[i].bgColor = "white";
            }

            options.push(list[i]);
        }

        return(
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle tag="span" data-toggle="dropdown">
                    <svg class="bi bi-bell-fill" width="32" height="32" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 18a2 2 0 002-2H8a2 2 0 002 2zm.995-14.901a1 1 0 10-1.99 0A5.002 5.002 0 005 8c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"></path>
                    </svg>
                </DropdownToggle>
                
                <DropdownMenu right id="dropdownMenu">
                    <DropdownItem header id="notifSettings">
                        <a href='javascript:void(0)' id="headerLink">Settings</a>
                    </DropdownItem>

                    {options.map(option => (
                        <DropdownItem className="notifItem" style={{backgroundColor: option.bgColor}}>
                            <this.specifyIcon category={option.category} />
                            <span id="notifDate"> {option.date} </span>
                            <span> {option.message} </span>
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }
}

export default Notifications 