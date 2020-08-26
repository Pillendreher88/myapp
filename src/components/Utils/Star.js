import StarEmpty from '@material-ui/icons/StarBorderRounded';
import StarHalf from '@material-ui/icons/StarHalfRounded';
import StarFull from '@material-ui/icons/StarRounded';
import React from 'react';


export default function Star(props) {

  const {filled, ...rest} = props;
  
    switch(filled) {
      case "empty": 
        return <StarEmpty {...rest}/>
      case "half": 
        return <StarHalf {...rest}/>
      case "full": 
        return <StarFull {...rest}/>
      default:
        return <StarFull {...rest}/>
    }
}
