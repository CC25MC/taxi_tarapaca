import Calendar from 'react-calendar';
import styled from 'styled-components';

const CalendarContainer = styled.div`
  /* ~~~ container styles ~~~ */
  max-width: 800px;
  margin: auto;
  margin-top: 15px;
  padding: 10px;
  border-radius: 3px;
  /* ~~~ navigation styles ~~~ */
  .react-calendar__navigation {
    display: flex;
    .react-calendar__navigation__label {
      font-weight: bold;
    }
    .react-calendar__navigation__arrow {
      flex-grow: 0.333;
    }
  }
  /* ~~~ label styles ~~~ */
  .react-calendar__month-view__weekdays {
    text-align: center;
  }
  /* ~~~ button styles ~~~ */
  button {
    margin: 3px;
    background-color: #fad409;
    border: 0;
    border-radius: 3px;
    color: black;
    padding: 5px 0;
    &:hover {
      background-color: #f7fafc;
    }
    &:active {
      background-color: #f7fafc;
    }
  }
  /* ~~~ day grid styles ~~~ */
  .react-calendar__month-view__days {
    display: grid !important;
    grid-template-columns: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%;

    .react-calendar__tile {
      max-width: initial !important;
    }
    .react-calendar__tile--range {
      color: white;
      background-color: black;
    }
  }
  /* ~~~ neighboring month & weekend styles ~~~ */
  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.5;
  }
  .react-calendar__month-view__days__day--weekend {
    color: black;
  }
  /* ~~~ other view styles ~~~ */
  .react-calendar__year-view__months,
  .react-calendar__decade-view__years,
  .react-calendar__century-view__decades {
    display: grid !important;
    grid-template-columns: 20% 20% 20% 20% 20%;
    &.react-calendar__year-view__months {
      grid-template-columns: 33.3% 33.3% 33.3%;
    }

    .react-calendar__tile {
      max-width: initial !important;
    }
  }
`;
export const CalendarStyled = ({ value, onChange }) => {
  return (
    <CalendarContainer>
      <Calendar
        value={value}
        onChange={date => {
          onChange(date)
        }}
        calendarType={'US'}
      />
    </CalendarContainer>
  );
};
