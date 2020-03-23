import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

class ComboBox extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            college: '',
            programList: [],
            degrees: [],
        }
    }

    componentWillReceiveProps(props){
        this.state.degrees = props.degrees;
        this.state.college = props.college;
        this.changeProgramList(props)
    }

    changeProgramList(props) {

        var updatedProgramList = [];
        
        props.degrees.map(degree => {
            if(String(props.college) == String(degree.college)){
                const program = {'id':degree.id, 'name':degree.degree_name};
                updatedProgramList = updatedProgramList.concat(program);
            }
        })

        this.state.programList = updatedProgramList;

    }

    render (){
        

        return (
            <Autocomplete
              id="combo-box-demo"
              options={this.state.programList}
              getOptionLabel={option => option.name}
              style={{ width: 500 }}
              renderInput={params => <TextField {...params} label="Degree Program" variant="outlined" />}
              onChange={this.props.handleAutoCompleteChange}
            />
        );
    }
}

export default ComboBox;