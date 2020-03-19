import React, { Component } from "react";
import '../css/Preferences.css';

class Preferences extends Component {
    render() {
      return (
        <div>
            <div class="prefIntro">
                <a href="/">
                    <svg class="bi bi-house" width="3em" height="3em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M9.646 3.146a.5.5 0 01.708 0l6 6a.5.5 0 01.146.354v7a.5.5 0 01-.5.5h-4.5a.5.5 0 01-.5-.5v-4H9v4a.5.5 0 01-.5.5H4a.5.5 0 01-.5-.5v-7a.5.5 0 01.146-.354l6-6zM4.5 9.707V16H8v-4a.5.5 0 01.5-.5h3a.5.5 0 01.5.5v4h3.5V9.707l-5.5-5.5-5.5 5.5z" clip-rule="evenodd"></path>
                        <path fill-rule="evenodd" d="M15 4.5V8l-2-2V4.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5z" clip-rule="evenodd"></path>
                    </svg>
                </a>
                
                <div class="introduction">
                    <h2>Preferences</h2>
                    <p>Disclaimer: Adding your preferences will help filter out the schedules that best suits you from among the available choices. However, it cannot assure you that all your preferences will be satisfied because taking into account the courses you need is of upmost priority.</p>
                    <center><input type="submit" class="btn btn-success change-flowchart" value="Save" /></center>
                </div>
            </div>

            <div class="prefIntro-main">
                <div className="preference-category">
                    <div className="timePreferences">
                        <h2>Time Preferences</h2>
                        
                        <div className="preference-category-content">
                            Earliest Time
                            <br/>
                            <input type="time"/><br/><br/>

                            Latest Time
                            <br/>
                            <input type="time"/><br/><br/>

                            Preferred Days
                            <br/>
                            <input className="checkbox-description" type="checkbox" id="" name="" value=""/>
                            <label className="checkbox-description" for=""> M </label><br/>

                            <input className="checkbox-description" type="checkbox" id="" name="" value=""/>
                            <label className="checkbox-description" for=""> T </label><br/>

                            <input className="checkbox-description" type="checkbox" id="" name="" value=""/>
                            <label className="checkbox-description" for=""> W </label><br/>

                            <input className="checkbox-description" type="checkbox" id="" name="" value=""/>
                            <label className="checkbox-description" for=""> H </label><br/>

                            <input className="checkbox-description" type="checkbox" id="" name="" value=""/>
                            <label className="checkbox-description" for=""> F </label><br/>

                            <input className="checkbox-description" type="checkbox" id="" name="" value=""/>
                            <label className="checkbox-description" for=""> S </label><br/><br/>

                            Break Length
                            <br/>
                            <input/><br/><br/>
                        </div>
                    </div>

                    <div className="workloadPreferences">
                        <h2>Workload Preferences</h2>
                        
                        <div className="preference-category-content">
                            Minimum Courses per Day
                            <br/>
                            <input/><br/><br/>

                            Maximum Courses per Day
                            <br/>
                            <input/><br/><br/>
                        </div>
                    </div>

                    <div className="classDetails">
                        <h2>Class Details</h2>
                        
                        <div className="preference-category-content">
                            Faculty Preferences
                            <br/>
                            <input/><br/><br/>
                            {/* change this input to multiple entries in one box */}

                            Building Preferences
                            <br/>
                            <input className="checkbox-description" type="checkbox" id="" name="" value=""/>
                            <label className="checkbox-description" for=""> St. La Salle Hall </label><br/>

                            <input className="checkbox-description" type="checkbox" id="" name="" value=""/>
                            <label className="checkbox-description" for=""> Enrique Yuchengco Hall </label><br/>

                            <input className="checkbox-description" type="checkbox" id="" name="" value=""/>
                            <label className="checkbox-description" for=""> St. Joseph Hall </label><br/>

                            <input className="checkbox-description" type="checkbox" id="" name="" value=""/>
                            <label className="checkbox-description" for=""> Velasco Hall </label><br/>

                            <input className="checkbox-description" type="checkbox" id="" name="" value=""/>
                            <label className="checkbox-description" for=""> St. Miguel Hall </label><br/>

                            <input className="checkbox-description" type="checkbox" id="" name="" value=""/>
                            <label className="checkbox-description" for=""> St. Mutien Marie Hall </label><br/>

                            <input className="checkbox-description" type="checkbox" id="" name="" value=""/>
                            <label className="checkbox-description" for=""> Gokongwei Hall </label><br/>

                            <input className="checkbox-description" type="checkbox" id="" name="" value=""/>
                            <label className="checkbox-description" for=""> Br. Andrew Gonzales Hall </label><br/><br/>

                            Section Preferences
                            <br/>
                            <input/><br/><br/>
                            {/* change this input to multiple entries in one box */}
                        </div>
                    </div>


                </div>
            </div>
        </div>        
      );
    }
  }
  export default Preferences;