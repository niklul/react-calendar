import React from 'react'
import Day from './day'


const MAX_YEAR = 2100;
const MIN_YEAR = 1900;

const DAY_OPTIONS = [ 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const MONTH_OPTIONS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const YEAR_OPTIONS = Array.from({length: MAX_YEAR - MIN_YEAR}, (v, k) => MIN_YEAR + k+1);

const NUMBER_OF_DAYS_IN_WEEK = DAY_OPTIONS.length;

class Calendar extends React.Component{


    state={
        selected_month: 3,
        selected_year: 2019,
    }

    getDaysCountInMonth = (month, year)=>{
        return new Date(year, parseInt(month)+1, 0).getDate();
    }

    getDatesForMonth = (month, year)=>{
        const dates = [];
        const days_count = this.getDaysCountInMonth(month, year);
        for (let i = 1; i <=days_count ; i++) {
            dates.push(new Date(year, month, i))
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
        const end_date = new Date(year, parseInt(month)+1, 0);
        for (let i = 1; i < NUMBER_OF_DAYS_IN_WEEK-end_date.getDay() ; i++) {
            post_dates.push(new Date(year, month+1, i))
        }
        return post_dates
    }


    handleMonthChange = (e)=>{
        this.setState({selected_month:e.target.value})
    }

    handleYearChange = (e)=>{
        this.setState({selected_year:e.target.value})
    }

    getTable = (all_dates)=>{
        const table = []
        for (let i = 0; i < all_dates.length; i++) {
            const children = []
            for (let j = 0; j < NUMBER_OF_DAYS_IN_WEEK; j++) {
                children.push(<td><Day date={all_dates[i+j].date} /></td>)
            }

            table.push(
                <tr>
                    {children}
                </tr>
            )

            i = i+NUMBER_OF_DAYS_IN_WEEK -1;
        }

        return table

    }


    render(){
        const {selected_year, selected_month} = this.state

        const pre_dates = this.getPreDatesForMonth(selected_month, selected_year).map( (date)=>{ return {onClick: '', date: date}});
        const current_dates = this.getDatesForMonth(selected_month, selected_year).map( (date)=>{ return {onClick: '', date: date}});
        const post_dates = this.getPostDatesForMonth(selected_month, selected_year).map( (date)=>{ return {onClick: '', date: date}});

        const all_dates = pre_dates.concat(current_dates).concat(post_dates);

        return(
            <div>
                <div>
                    <span>Select Year:</span>
                    <span>
                        <select name="year" onChange={this.handleYearChange} value={selected_year}>
                            {YEAR_OPTIONS.map((year)=>{
                                return (
                                    <option value={year} key={year} >{year}</option>
                                )
                            })
                            }
                        </select>
                    </span>
                </div>

                <div>
                    <span>Select Month:</span>
                    <span>
                        <select name="month" onChange={this.handleMonthChange} value={selected_month}>
                            {MONTH_OPTIONS.map((month, index)=>{
                                return (
                                    <option value={index} key={index} >{month}</option>
                                )
                            })

                            }

                        </select>
                    </span>
                </div>

                <div>
                    <table>
                        <thead>
                            <tr>
                                {DAY_OPTIONS.map((day)=>{
                                   return (<th> {day} </th>)
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {this.getTable(all_dates)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Calendar