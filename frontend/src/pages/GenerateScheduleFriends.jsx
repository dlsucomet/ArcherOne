import React, {Component} from 'react';
import {Column, Row} from 'simple-flexbox';
import {Input} from 'reactstrap';
import Menu from '../components/Menu.jsx';
import CourseDnD from '../components/CourseDnD';
import '../css/GenerateSchedule.css';
import GenSchedInfo from '../components/GenSchedInfo';
import axios from 'axios';
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import { Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import PropTypes from 'prop-types';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import ReactLoading from 'react-loading';
import ComboBox from '../components/ComboBox.jsx';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';

import groupArray from 'group-array'

import { Steps, Hints } from 'intro.js-react';
import 'intro.js/introjs.css';
import '../css/introjs-modern.css';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import FriendTable from '../components/FriendTable.jsx';
import Link from '@material-ui/core/Link';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import HelpIcon from '@material-ui/icons/Help';
import Tooltip from '@material-ui/core/Tooltip';
import {Tabs, Tab } from 'react-bootstrap';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const styles = theme => ({
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },
    buttonSuccess: {
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
    buttonProgress: {
    //   color: green[500],
      position: 'absolute',
      top: '65%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
    buttonProgressSave: {
        //   color: green[500],
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginTop: -12,
          marginLeft: -12,
        },
    schedButton:{
        textTransform: "none",
        borderRadius: "25px",
        padding: "10px",
        paddingLeft: "30px",
        paddingRight: "30px",
        backgroundColor: "#16775D",
        border: "none",
        color: "white",
        boxShadow: "6px 5px #e8f4ea",
        borderStyle: "solid",
        borderColor: "#16775D",
        marginTop: "20px",
        '&:hover': {
            backgroundColor: "white",
            color: "#16775D"
          },
    }
  });

  const GreenCheckbox = withStyles({
    root: {
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);
     
     const WhiteCheckbox = withStyles({
    root: {
        color: "white",
      '&$checked': {
        color: "white",
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

class GenerateSchedule extends Component {

    constructor(props) {
        super(props);
        // this.handleKeyPress = this.handleKeyPress.bind(this);
        this.generatedRef = React.createRef();
        this.handleScrollToGen = this.handleScrollToGen.bind(this);
        this.handleSaveChange = this.handleSaveChange.bind(this);
      
        // this.updateSchedTitle = this.updateSchedTitle.bind(this);
        this.state = {
            value: "",
            courseList: [],
            currentPage: 0,
            currentContent: "",
            currentCourse: "",
            generatedContents: [],
            // generatedContents : ['Hello', 'There', 'Josh'],
            // currentContent: ['Hello'],
            pagesCount: 1,
            searchedCourse: "",
            hideGenContent:true,
            savedScheds: [],
            saveButtonLabel: "Save Schedule",
            saveButtonStyle: {margin: "30px"},
            AutoCompleteValue: [],
            schedules: [],
            dataReceived: false,

            snackBar: false,
            loading: false,
            success: false,
            courseAdded: true,
            filterFull: true,

            courseOfferings: [],
            
            openModalCourseOfferings: false,
            modalCourseName: "",
            siteData: [],
            siteDataArray: [],
            allCheckBox: true,
     
            skeletons: [...Array(8).keys()],

            openModalWait: false,
            shareCode: '',
            redirect: false,
            copyLabel: "Copy link to clipboard",
            friends: {},
            friendKeys: []
        };

        if(localStorage.getItem('stepsFriends') == undefined){
            localStorage.setItem('stepsFriends',true)
        }

    }

    componentDidMount(){
        const id = localStorage.getItem('user_id');
        console.log(this.props)
        axios.get('https://archerone-backend.herokuapp.com/api/getsharecode/'+this.props.params['id']+'/')
        .then(res => {
            console.log(res)
            // this.setState({owner: res.data[0].owner}) 
            var friends = {}
            var friendKeys = Object.keys(res.data)
            friendKeys.map(key => {
                console.log(key)
                console.log(res.data[key])
                var schedules = []
                var schedCount = 0;
                res.data[key].map(newSchedule => {
                    this.setState({shareCode: newSchedule.shareCode}) 
                    console.log(newSchedule)
                    var count = 0;
                    var scheduleContent = []
                    var tableContent = []
                    var earliest = 9
                    var latest = 17

                    newSchedule.offerings.map(offering=>{
                        var startTime = offering.timeslot_begin.split(':');
                        var endTime = offering.timeslot_end.split(':');
                        var newContent = 
                        {
                            id: count,
                            title: offering.course + ' ' + offering.section,
                            section: offering.section,
                            startDate: this.createTimeslot(offering.day,startTime[0],startTime[1]),
                            endDate: this.createTimeslot(offering.day,endTime[0],endTime[1]),
                            priorityId: 3,
                            location: offering.room,
                            professor: offering.faculty,
                            startTime: offering.timeslot_begin.substring(0, offering.timeslot_begin.length - 3),
                            endTime: offering.timeslot_end.substring(0, offering.timeslot_end.length - 3),
                            days: offering.day,
                            classCode: offering.classnumber 
                        }
                        if(earliest > Number(startTime[0])){
                            earliest = Number(startTime[0])
                        }
                        if(latest < Number(endTime[0]) + 1){
                            latest = Number(endTime[0]) + 1
                        }
                        scheduleContent.push(newContent);
                        var day = ''
                        var classnumber = ''
                        var course = ''
                        var section = ''
                        var faculty = ''
                        var timeslot_begin = ''
                        var timeslot_end = ''
                        var room = ''
                        var max_enrolled = ''
                        var current_enrolled = ''

                        day = offering.day
                        classnumber = offering.classnumber
                        course = offering.course
                        section = offering.section
                        faculty = offering.faculty
                        timeslot_begin = offering.timeslot_begin
                        timeslot_end = offering.timeslot_end
                        room = offering.room
                        max_enrolled = offering.max_enrolled
                        current_enrolled = offering.current_enrolled
                        var newTableContent = this.createData(classnumber, course, section, faculty, day, timeslot_begin, timeslot_end, room, max_enrolled, current_enrolled);
                        // tableContent.push(newTableContent)
                        count += 1;
                    })
                    schedCount += 1;
                    schedules.push({
                        id: schedCount,
                        title: "Schedule "+schedCount.toString(),
                        scheduleContent: scheduleContent,
                        tableContent: tableContent,
                        prefContent: [],
                        prefContent: newSchedule.preferences,
                        prefFriendContent: newSchedule.friendPreferences,
                        conflictsContent: newSchedule.information,
                        earliest: earliest,
                        latest: latest,
                        offerings: newSchedule.offerings,
                        key: key 
                    });
                })
                friends[key] = this.setSchedInfo(schedules);
            })
            console.log(friends)
            console.log(friendKeys)
            this.setState({friends: friends, friendKeys: friendKeys, currentContent: friends[friendKeys[0]][0], currentFriend: friendKeys[0]}, () => {
                this.setState({success: true});
                this.setState({loading: false});
                this.setState({dataReceived: true});
            })
            this.toggleModalWait();
        }).catch(error => {
            console.log(error)
            this.setState({success: false});
            this.setState({loading: false});
            this.toggleModalWait();
        })
    }
    renderRedirect = () => {
        return <Redirect to={'/coordinate_schedule/'+this.state.shareCode+'/'}/>
    }
    reload = () => {
        window.location.reload()
    }
    saveCourses = () => {
        // const priority = res.data.priority
        // var newCourseList = []
        // this.state.courseList.map(course =>{
        //     if(course.id == res.data.courses){
        //         if(priority){
        //             var courses = this.state.highCourses;
        //             courses.push(course.course_code)
        //             this.setState({highCourses: courses})
        //         }else{
        //             var courses = this.state.lowCourses;
        //             courses.push(course.course_code)
        //             this.setState({lowCourses: courses})
        //         }
        //     }else{
        //         newCourseList.push(course)
        //     }
        // })
        // this.setState({courseList:newCourseList})
    }

    componentDidUpdate(prevProp, prevState){
        if(prevState.generatedContents !== this.state.generatedContents){
            this.handleScrollToGen();
            prevState.generatedContents = this.state.generatedContents;
        }
       
    }



    createTimeslot = (day, hour, minute) =>{
        if(day == 'M'){
            return new Date(2018, 5, 25, hour, minute);
        }else if(day == 'T'){
            return new Date(2018, 5, 26, hour, minute);
        }else if(day == 'W'){
            return new Date(2018, 5, 27, hour, minute);
        }else if(day == 'H'){
            return new Date(2018, 5, 28, hour, minute);
        }else if(day == 'F'){
            return new Date(2018, 5, 29, hour, minute);
        }else if(day == 'S'){
            return new Date(2018, 5, 30, hour, minute);
        }
    }

    setSchedInfo = (schedules) => {
        var generatedContents = schedules.map((item, index) =>
            <GenSchedInfo key={item.id} id={item.id} offerings={item.offerings} scheduleContent={item.scheduleContent} tableContent={item.tableContent} prefFriendContent={item.prefFriendContent} prefContent={item.prefContent} conflictsContent={item.conflictsContent} titleName={item.title} earliest={item.earliest} latest={item.latest} updateSchedTitle={this.updateSchedTitle}/>
        );
        this.setState({currentPage: 0})
        this.setState({pagesCount: generatedContents.length});
        // this.handleScrollToGen();
        return generatedContents
        // this.setState({generatedContents});
        // this.setState({hideGenContent: false});
        // this.setState({currentContent: generatedContents[0]})

    }

    createData(classNmbr, course, section, faculty, day, startTime, endTime, room, capacity, enrolled, checked) {
        return { classNmbr, course, section, faculty, day, startTime, endTime, room, capacity, enrolled, checked };
    }

    updateSchedTitle=(text)=>{
         var newArray = [];
         const currentContent = this.state.currentContent;
        // var index = newArray.findIndex(this.state.currentContent);
        const newContent = <GenSchedInfo key={currentContent.props.id} earliest={currentContent.props.earliest} latest={currentContent.props.latest} id={currentContent.props.id} offerings={currentContent.props.offerings} scheduleContent={currentContent.props.scheduleContent} tableContent={currentContent.props.tableContent} prefContent={currentContent.props.prefContent} conflictsContent={currentContent.props.conflictsContent} titleName={text} updateSchedTitle={this.updateSchedTitle}/>

        this.state.generatedContents.map(value=>{
            if(value.key == this.state.currentContent.key){
                newArray.push(newContent)
            }else{
                newArray.push(value)
            }
        })

        this.setState({generatedContents: newArray});
        this.setState({currentContent: newContent});
    }
    
    handleScrollToGen=()=>{
        // window.scrollTo({
        //     top: this.generatedRef.current.offsetTop,
        //     behavior: "smooth"
        // })
    }

    handleSaveChange=()=>{
        if(this.state.savedScheds.includes(this.state.currentContent.key)){
        }else{
            this.setState({loading: true});
            const courseOfferings = []
            const user_id = localStorage.getItem('user_id')
            console.log(this.state.currentContent)
            this.state.currentContent.props.offerings.map(offering => {
                courseOfferings.push(offering.id)
            })
            axios.post('https://archerone-backend.herokuapp.com/api/schedules/',{
                title: this.state.currentContent.props.titleName,
                courseOfferings: courseOfferings,
                user: user_id
            }).then(res => {
                // axios.get('https://archerone-backend.herokuapp.com/api/users/'+user_id+'/')
                // .then(res => {
                //     const schedules = res.data.schedules;
                //     schedules.push(sched_id);
                //     axios.patch('https://archerone-backend.herokuapp.com/api/users/'+user_id+'/',{
                //         schedules: schedules
                //     }).then(res => {
                //         console.log(res)
                        
                //     }).catch(err => {
                //         console.log(err.response)
                //     })
                // })
            }).catch(err => {
                console.log(err.response)

            })
            this.setState(state=>{
                const savedScheds = state.savedScheds.concat(state.currentContent.key);
                return {savedScheds};
            })
            this.setState({loading: false});
            this.setState({saveButtonLabel: "Saved"});
            const styleChange = {margin: "30px", backgroundColor: "white", color: "#16775D", borderStyle: "solid", borderColor: "#16775D"};
            this.setState({saveButtonStyle: styleChange});
            this.setState({snackBar: true});
        }
        

    }

    handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({snackBar: false});
    }
    
    handleFilterFull = () => {
        this.setState({filterFull: !this.state.filterFull});
    }

    handleCheckbox = (index) => {
        this.setState(state =>{
            const siteData  = state.siteData
            siteData[index].checked = !siteData[index].checked
            localStorage.setItem(siteData[index].classNmbr, siteData[index].checked)
            return{siteData};
        });
        console.log(this.state.siteData[index]) 
    }
    
    handleAllCheckbox = () => {
        this.setState(state =>{
            const siteData = state.siteData
            siteData.map(c => {
                if(this.state.allCheckBox){
                    c.checked = false 
                }else{
                    c.checked = true 
                }
                localStorage.setItem(c.classNmbr, c.checked)
            })
            return{siteData};
        }, () => {
            this.setState({allCheckBox: !this.state.allCheckBox})
        });
    }

    handleCourseOfferingChange =(e, val)=>{
        this.setState({courseOfferings: val});
    }
    
    triggerModal=(courseName, siteData)=>{
        this.setState({siteData})
        this.setState({allCheckBox: false}, () => {
            this.state.siteData.map(c => {
                if(c.checked){
                    this.setState({allCheckBox: true})
                }
            })
        })
        this.setState({openModalCourseOfferings: true});
        this.setState({modalCourseName: courseName});
    }

    handleCloseModalCourseOfferings = ()=>{
      this.setState({openModalCourseOfferings: false})
    }
  
    handleOpenModalCourseOfferings = () =>{
        this.setState({openModalCourseOfferings: true})
    }
  
    toggleModal = () => {
        var openModalVar = this.state.openModalCourseOfferings;
        this.setState({openModalCourseOfferings: !openModalVar});
    }
    
    handleSaveCourseOfferings = () =>{
        console.log("Course Offerings changes saved");
        this.setState({openModalCourseOfferings: false});
      } 
    
    toggleModalWait = () => {
        var openModalVar = this.state.openModalWait;
        this.setState({openModalWait: !openModalVar});
      }

    onCopy = () => {
        console.log("copied")
        this.setState({copyLabel: "Copied!"}, ()=>{
            setTimeout(() => {  this.setState({copyLabel:  "Copy link to clipboard"}) }, 1000);
        });
        
    }

    handlePageChange = (e,index) => {
        this.setState(state =>{
            var currentContent = this.state.friends[this.state.currentFriend][index];
            return {currentContent};
        });
        
        this.setState({currentPage: index});
        this.setState(state =>{
            var currentPage = index;
            return {currentPage};
            });

        this.handleScrollToGen();

        if(this.state.savedScheds.includes(this.state.friends[this.state.currentFriend].key)){
            this.setState({saveButtonLabel: "Saved"});
            const styleChange = {margin: "30px", backgroundColor: "white", color: "#16775D"};
            this.setState({saveButtonStyle: styleChange});
        }else{
            this.setState({saveButtonLabel: "Save Schedule"});
            const styleChange = {margin: "30px", backgroundColor: "#16775D", color: "white"};
            this.setState({saveButtonStyle: styleChange});
        }
    }

    handleTab = (event, value) => {
        // event.preventDefault();
        if(this.state.currentFriend != value && value != undefined){
            this.setState({currentFriend: value})
            console.log("handle tab")
            console.log(value)
            this.setState(state =>{
                var currentContent = state.friends[value][this.state.currentPage];
                return {currentContent};
            });
            this.handleScrollToGen();
        }

    }

    tutorialDone = () => {
        localStorage.setItem('stepsFriends',false)
    }

    render() { 
        let search_field = this.props.search_field;
        // const { currentPage } = this.state;
        const { classes } = this.props;
        
        const StyledTableCell = withStyles(theme => ({
            head: {
              backgroundColor: '#006A4E',
              color: theme.palette.common.white,
            },
            body: {
              fontSize: 14,
              borderBottom: "1px solid white",
            },
          }))(TableCell);

          const StyledTableRow = withStyles(theme => ({
            root: {
              '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.background.default,
              },
            },
          }))(TableRow);
            const steps = [
            {
                intro: 'Welcome to coordinate schedule! This is where you can find new schedules generated by the system.',
            },
            {
                element: '#friendList',
                intro: 'The generated schedules consider the preferences of the friends listed, and matched possible classes that can be taken by friends together.',
            },
            {
                element: '#friendVariations',
                intro: 'Here you can see what schedule each friend will have per schedule variation.',
            },
            {
                element: '#multipleVariations',
                intro: 'There are multiple schedule variations you can choose from.',
                // position: 'right',
                // tooltipClass: 'myTooltipClass',
                // highlightClass: 'myHighlightClass',
            },
            {
                element: '#save',
                intro: 'Saving a schedule here will save it to your own saved schedules.',
            },
            {
                element: '#copy',
                intro: 'Here you can copy and share these coordinated schedules.',
            },
            {
                // element: '',
                // position: 'bottom-right-aligned',
                intro: 'Decide on a schedule variation with your friends!',
            },
            ];
        const linkShare = "https://animosched.herokuapp.com/coordinate_schedule/"+this.state.shareCode+"/"
        return (
            <div>

                <div class="header" style={{backgroundColor: "#006A4E", padding:"10px"}}>
                    <a className="backBtn" href="/view_friends">
                    <div className={"backBtn"} style={{marginTop: "5px"}}></div>
                    <ArrowBackIosIcon fontSize="large"className={classes.backBtn} viewBox="0 0 1 24"/> <span className="backBtn">Back</span>
                    </a>
                    <div style={{color:"white"}}>
                        <center><h5 >FIRST TRIMESTER, AY 2020 - 2021</h5></center>
                    </div>
                    {/* <img class='img-responsive' id='lower' src={SidebarIMG}/> */}
                </div>
                {this.state.dataReceived ?
                
                <div>
                    <Steps
                    enabled={localStorage.getItem('stepsFriends') == 'true'}
                    steps={steps}
                    initialStep={0}
                    onExit={this.tutorialDone}
                    onComplete={this.tutorialDone}
                    />

                    <div>
                        <Column flexGrow={1} style={{margin: "40px"}}>
                            <center><h5>
                                {/* {this.state.owner+'\'s generated schedules: '}  */}
                                Share with friends: 
                                <CopyToClipboard id="copy" text={linkShare} onCopy={this.onCopy}>
                                    <Button variant='outlined' startIcon={<FileCopyIcon/>} >{this.state.copyLabel}</Button>
                                </CopyToClipboard>
                            </h5></center>
                <center><h6><span id="friendList">
                    Coordinated schedules of: {this.state.friendKeys.map((friend, index) => <span>{index+1 != this.state.friendKeys.length ? friend + ", " : friend}</span>)} 
                {/* <Tooltip title="こんにちは！" placement="bottom">
                    <HelpIcon />
                </Tooltip> */}
                </span>
            
                </h6>

                <div style={{marginTop: "30px"}}>
                <ToggleButtonGroup id="friendVariations"
                    value={this.state.currentFriend}
                    exclusive
                    onChange={this.handleTab}
                    aria-label="text alignment"
                    >
                    {this.state.friendKeys.map(friend => 
                    <ToggleButton value={friend} aria-label="centered">
                        {friend}
                    </ToggleButton>
                    )}
                </ToggleButtonGroup>
                </div>
                </center>
                            <div className = "genSchedInfoContainer" style={{margin: "40px"}}>
                                <span>{this.state.currentContent}</span>
                                {/* <FriendTable/> */}
                            
                                <div className = "paginationContainer">
                                        
                                    <Pagination aria-label="Page navigation example" style={{justifyContent: "center"}}>
                                        <PaginationItem disabled={this.state.currentPage <= 0}>
                                            <PaginationLink onClick={e => this.handlePageChange(e, this.state.currentPage - 1)}
                                                previous/>
                                        </PaginationItem>
                                        {[...Array(this.state.pagesCount)].map((page, i) => 
                                            <PaginationItem id="multipleVariations" active={i === this.state.currentPage} key={i} className={'paginationItemStyle'}>
                                                <PaginationLink onClick={e => this.handlePageChange(e, i)} className={'paginationLinkStyle'}>
                                                {i + 1}
                                                </PaginationLink>
                                            </PaginationItem>
                                            )}
                                        <PaginationItem disabled={this.state.currentPage >= this.state.friends[this.state.currentFriend].length - 1}>
                                            <PaginationLink
                                                onClick={e => this.handlePageChange(e, this.state.currentPage + 1)}
                                                next
                                            />
                                            
                                            </PaginationItem>
                                    </Pagination>
                                </div>
                                <Row horizontal='center'>
                                    <div className={classes.root}>
                                            <div className={classes.wrapper}> 
                                                <Button id="save"
                                                variant="contained"
                                                className={classes.schedButton}
                                                onClick={this.handleSaveChange}
                                                style={this.state.saveButtonStyle}
                                                >
                                                {this.state.saveButtonLabel}
                                                </Button>
                                                {this.state.loading && <CircularProgress size={24} className={classes.buttonProgressSave}/>}
                                            </div>
                                            <Snackbar open={this.state.snackBar} autoHideDuration={4000} onClose={this.handleCloseSnackBar}>
                                                <Alert onClose={this.handleCloseSnackBar} severity="success">
                                                    Your schedule have been successfully saved! <a href="/" style={{color:"#D3D3D3"}}>View in homepage</a>
                                                </Alert>
                                            </Snackbar>
                                        </div>
                                    {/* <button className={"schedButton"} style={this.state.saveButtonStyle} onClick={this.handleSaveChange}>{this.state.saveButtonLabel}</button> */}
                                </Row>  
                            </div>
                        </Column>
                    </div>

                </div>
                : 
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh"}}>
                    <ReactLoading type={'spin'} color={'#9BCFB8'} height={'5%'} width={'5%'}/>
                  <div className="courseInputContainer">
                      <Modal isOpen={!this.state.dataReceived} returnFocusAfterClose={false} backdrop={true} data-keyboard="false" centered={true}>
                          <ModalHeader>
                              <center>
                                  <br></br><p>Please wait...In the process of loading your schedules</p>
                                  <ReactLoading type={'spin'} color={'#9BCFB8'} height={'10%'} width={'10%'}/>
                              </center>
                              </ModalHeader>
                          
                              <ModalFooter>
                                  
                                  <Button style={{color: "gray"}}>Cancel</Button>
                              </ModalFooter>
                          
                      </Modal> 
                  </div>
                </div> 

                }
            </div>  
        );
    }
}

GenerateSchedule.propTypes={
    classes: PropTypes.object.isRequired,
  };


export default withStyles(styles)(GenerateSchedule);