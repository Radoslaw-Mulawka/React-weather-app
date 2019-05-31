import React, {useEffect} from 'react';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

import {connect} from 'react-redux';
import {addCity} from '../store/actions/actionCreators';
import {getCitiesSuggestions} from '../store/actions/actionCreators';


//////////////////////////////////
function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}
//////////////////////////////////////
function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map(part => (
          <span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }}>
            {part.text}
          </span>
        ))}
      </div>
    </MenuItem>
  );
}
///////////////////////////////////////
function getSuggestions(value, citiesSuggestions) {

  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;
  return inputLength === 0 ? [] : citiesSuggestions.filter(suggestion => {
        const keep = count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;
        if (keep) {
          count += 1;
        }
        return keep;
      });
}
/////////////////////////////////////////
function getSuggestionValue(suggestion) {
  return suggestion.label;
}
//////////////////////////////////////
function IntegrationAutosuggest(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    single: '',
    id: null
  });

  const [stateSuggestions, setSuggestions] = React.useState([]);

  useEffect(()=>{
    props.triggerGetCitiesSuggestions()
  },[])

  const handleSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value, props.citiesSuggestions));
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleChange = name => (event, { newValue }) => {
    let cityObject = props.citiesSuggestions.filter(city=>city.label == newValue)[0];
    setState({
      ...state,
      [name]: newValue,
      id: cityObject ? cityObject.id+'': null
    });
    
  };

  const autosuggestProps = {
    renderInputComponent,
    suggestions: stateSuggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
    onSuggestionsClearRequested: handleSuggestionsClearRequested,
    getSuggestionValue,
    renderSuggestion,
  };

  return (
    <div className={classes.root}>
      <Autosuggest
        {...autosuggestProps}
        inputProps={{
          classes,
          placeholder: 'City',
          value: state.single,
          id: state.id,
          onChange: handleChange('single'),
        }}
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderSuggestionsContainer={options => (
          <Paper {...options.containerProps} square>
            {options.children}
          </Paper>
        )}
      />
      <Icon className={classes.icon} onClick={()=>{console.log(state); props.addCity({id: state.id, name: state.single})}}>add_circle</Icon>
    </div>
  );
}



/////////////////////////////////////////
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing(2),
  },
}));
/////////////////////////////////////








const mapStateToProps = state=>{
    return {
        citiesSuggestions: state.citiesSuggestions
    }
}

const mapDispatchToProps = dispatch=>{
    return {
        triggerGetCitiesSuggestions: ()=>dispatch(getCitiesSuggestions()),
        addCity:(city)=>dispatch(addCity(city))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IntegrationAutosuggest);