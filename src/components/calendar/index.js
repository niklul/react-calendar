import React from 'react'
import Day from './day'

const NUMBER_OF_DAYS_IN_WEEK = 7


class Calendar extends React.Component{

    getDaysCountInMonth = (month, year)=>{
        return new Date(year, month+1, 0).getDate();
    }

    getDatesForMonth = (month, year)=>{
        const dates = [];
        const end_date = new Date(year, month+1, 0);
        for (let i = 1; i <=end_date.getDate() ; i++) {
            dates.push(new Date(year, month+1, i))
        }
        return dates
    }

    getPreDatesForMonth = (month, year)=>{
        const pre_dates = [];
        const start_date = new Date(year, month, 1);
        for (let i = start_date.getDay()-1; i >=0 ; i--) {
            pre_dates.push(new Date(year, month, -1*i))
        }
        return pre_dates
    }

    getPostDatesForMonth = (month, year)=>{
        const post_dates = [];
        const end_date = new Date(year, month+1, 0);
        for (let i = 1; i < NUMBER_OF_DAYS_IN_WEEK-end_date.getDay() ; i++) {
            post_dates.push(new Date(year, month+1, i))
        }
        return post_dates
    }


    render(){
        return(
            <div>

                {this.getPreDatesForMonth(4, 2019).map(
                    (date)=>{
                        return (<Day date={date}/>)
                    })}
                {this.getDatesForMonth(4, 2019).map(
                    (date)=>{
                        return (<Day date={date}/>)
                    })}

                {this.getPostDatesForMonth(4, 2019).map(
                    (date)=>{
                        return (<Day date={date}/>)
                    })}
            </div>
        )
    }
}

export default Calendar