import React from 'react'
import Day from './day'


const MAX_YEAR = 2100;
const MIN_YEAR = 1900;
const NUMBER_OF_DAYS_IN_WEEK = 7;


class Calendar extends React.Component{

    month_options = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    year_options =     Array.from({length: MAX_YEAR - MIN_YEAR}, (v, k) => MIN_YEAR + k+1);

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
                            {this.year_options.map((year)=>{
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
                            {this.month_options.map((month, index)=>{
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
                        <tr>
                            <td></td>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }
}

export default Calendar