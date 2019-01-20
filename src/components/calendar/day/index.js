import React from 'react'


class Day extends React.Component{
    render(){
        const {date} = this.props

        return(
            <span> {date.getDate()} </span>
        )
    }
}


export default Day;