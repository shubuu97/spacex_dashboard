import React, { useEffect, useState } from "react";

//?libraries import
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import moment from "moment";

//?component import
import Switch from "../../../assets/images/common/Switch";

//?actions imports
import { FETCH_LAUNCHES } from "../../../store/actionTypes";
import genericActionCreator from "../../../store/actions/genericActionCreator";

//?apis import
import {
  ALL_LAUNCHES,
  UPCOMING_LAUNCHES,
  PAST_LAUNCHES,
} from "../../../utilities/api";

//?css import
import "./style.scss";

/**
 * All the filter management is done in this component.
 * Whenever we click on any filter it pushes that in url query and extracts value from it to show the value
 * State is not used anywhere, everything is managed from the url itself.
 */

const Filter = () => {
  const [endDateCalendarOpen, setEndDateCalendarOpen] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const launches = useSelector((state) => state?.launches ?? {}, shallowEqual);
  const { isLoading = false } = launches || {};

  const pathname = location?.pathname ?? "";
  const search = location?.search ?? "";

  const params = new URLSearchParams(search);

  //?after passing search object to URLSearchParams it gives us methods to play with the params like get, set, has, delete etc

  //!extracting all the params
  const upcoming_launches = params.get("upcoming_launches");
  const past_launches = params.get("past_launches");
  const all_launches = params.get("all_launches");
  const start = params.get("start");
  const end = params.get("end");
  const launch_success = params.get("launch_success");

  useEffect(() => {
    if (!search) {
      addQuery("all_launches", true);
    }
    if (start) {
      if (!end) {
        return;
      }
    }
    fetchLaunchList();
  }, [location, start, end]);

  const fetchLaunchList = () => {
    //!creating params object from the url, undefined is passed in case of null so that the key will not be created
    let param = {
      start: start ? `${moment(start).format("YYYY-MM-DD")}` : undefined,
      end: end ? `${moment(end).format("YYYY-MM-DD")}` : undefined,
      launch_success: launch_success === "true" ? true : undefined,
    };

    //!dispatching actions according to params, there will be three cases only upcoming, past or all launches
    if (upcoming_launches === "true") {
      dispatch(genericActionCreator(UPCOMING_LAUNCHES, FETCH_LAUNCHES, param));
    } else if (past_launches === "true") {
      dispatch(genericActionCreator(PAST_LAUNCHES, FETCH_LAUNCHES, param));
    } else if (all_launches === "true") {
      dispatch(genericActionCreator(ALL_LAUNCHES, FETCH_LAUNCHES, param));
    }
  };

  /**
   * key and value to add in search param
   * @param {String} key required
   * @param {String} value required
   */

  const addQuery = (key, value) => {
    //! don't perform any action if data is being fetching
    if (isLoading) {
      return true;
    }
    params.set(key, value);
    history.push({
      pathname,
      search: params.toString(),
    });
  };

  /**
   * handles all, upcoming and past filters
   * resets successful and date filters
   * @param {String} key - name to add in query
   */

  const handleMainFilters = (key) => {
    //! don't perform any action if data is being fetching
    if (isLoading) {
      return;
    }
    if (params.has(key)) {
      return;
    }
    history.push({
      pathname,
      search: `?${key}=true`,
    });
  };

  //!pushes to the main route that resets all the filter
  const handleClearFilters = () => {
    history.push({
      pathname,
      search: "?all_launches=true",
    });
  };

  /**
   * @returns {Boolean} - return true if any filter is selected
   */

  const anyFilterActive = () => {
    for (const [key, value] of params) {
      if (key !== "all_launches") {
        if (value) return true;
      }
    }
    return false;
  };

  /**
   * @param {Date} date - start date
   */
  const handleStartDateClick = (date) => {
    if (isLoading) {
      return true;
    }
    const selectedDate = new Date(date);
    const startDate = new Date(start);
    if (selectedDate.getTime() !== startDate.getTime()) {
      addQuery("start", date);
    }
    // if end date is null then open it after selecting start date
    if (!end) {
      setEndDateCalendarOpen(true);
    }
  };

  /**
   * @param {Date} date - end date
   */
  const handleEndDateClick = (date) => {
    if (isLoading) {
      return true;
    }
    const selectedDate = new Date(date);
    const startDate = new Date(start);
    //?check if end date is not equal to start date
    if (selectedDate.getTime() !== startDate.getTime()) {
      addQuery("end", date);
      setEndDateCalendarOpen(!endDateCalendarOpen);
    }
  };

  return (
    <div className="filter mb-5">
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <div className="container">
          <div className="items">
            <div className="left">
              <div className="mr_4">
                <button
                  className={params.has("all_launches") ? "selected" : ""}
                  onClick={() => {
                    handleMainFilters("all_launches");
                  }}>
                  All
                </button>
              </div>
              <div className="mr_4">
                <button
                  className={upcoming_launches === "true" ? "selected" : ""}
                  onClick={() => {
                    handleMainFilters("upcoming_launches");
                  }}>
                  Upcoming
                </button>
              </div>
              <div className="mr_4">
                <button
                  className={past_launches === "true" ? "selected" : ""}
                  onClick={() => {
                    handleMainFilters("past_launches");
                  }}>
                  Past
                </button>
              </div>
            </div>
            <div className="right">
              <div className="mr_4">
                <Switch
                  disabled={params.has("upcoming_launches")}
                  checked={launch_success === "true"}
                  handleChange={() => {
                    //?if launch_success exists toggle ot otherwise initialize with true
                    let newValue = true;
                    if (params.has("launch_success")) {
                      newValue = launch_success === "true" ? false : true;
                    }
                    addQuery("launch_success", newValue);
                  }}
                />
              </div>
              <div className="mr_4 date_picker">
                <DatePicker
                  variant="inline"
                  autoOk={true}
                  disableFuture={params.has("past_launches")}
                  disablePast={params.has("upcoming_launches")}
                  maxDate={end || undefined}
                  emptyLabel="Start Date"
                  value={start}
                  onChange={handleStartDateClick}
                />
              </div>
              <div className="mr_4 date_picker">
                <DatePicker
                  disabled={!start}
                  variant="inline"
                  autoOk={true}
                  disableFuture={params.has("past_launches")}
                  disablePast={params.has("upcoming_launches")}
                  minDate={start || undefined}
                  emptyLabel="End Date"
                  value={end}
                  onOpen={() => {
                    setEndDateCalendarOpen(true);
                  }}
                  open={endDateCalendarOpen}
                  onChange={handleEndDateClick}
                />
              </div>
              {/* if any filter is selected then only show clear button */}
              {anyFilterActive() ? (
                <div className="clear-filters" onClick={handleClearFilters}>
                  <span>Clear</span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default Filter;
