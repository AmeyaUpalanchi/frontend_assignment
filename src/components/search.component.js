import React, { useState, useEffect } from "react";
import { AiOutlineCloseCircle, AiOutlineSearch } from "react-icons/ai";

import { locations } from "./tabs";
// import { useClickOutside } from "react-click-outside-hook";
import { Places } from "./results.component";
import { motion } from "framer-motion";
import "../app.css";

//for animation purpose
const containerVariants = {
  expanded: {
    height: "30em",
  },
  collapsed: {
    height: "3.8em",
  },
};

const containerTransition = { type: "spring", damping: 22, stiffness: 150 };

const SearchBar = (props) => {
  const [isExpanded, setExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const expandContainer = () => {
    setExpanded(true);
  };

  const collapseContainer = () => {
    setExpanded(false);
  };

  const onSelectContinents = (event) => {
    setSelectedOption(event.target.alt);
  };

  const onSelectOptions = (event) => {
    setSelectedOption(event.target.innerText);
  };

  useEffect(() => {
    props.expand === false ? setExpanded(false) : setExpanded(true);
  }, [props.value]);

  return (
    <>
      <motion.div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className="container">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                textAlign: "center",
                alignSelf: "center",
              }}
            >
              <AiOutlineCloseCircle
                onClick={collapseContainer}
                size={25}
                style={{ alignSelf: "center", marginRight: 20 }}
              />
              <input
                onChange={props.onChange}
                onFocus={expandContainer}
                placeholder="Search by College or City"
                className="search-container"
              />
            </div>
          </div>
          <button className="search-icon-container">
            <AiOutlineSearch
              size={30}
              color={"#fff"}
              style={{ alignSelf: "center" }}
            />
            <div style={{ fontSize: 17, alignSelf: "center", marginLeft: 10 }}>
              Search
            </div>
          </button>
        </div>
        {!props.expand && (
          <div style={{display:'flex', justifyContent:'space-between' }}>
            <h4 style={{ marginLeft: 30 }}>Please type more than 3 letters</h4>
            <h4>You selected: {selectedOption}</h4>
          </div>
        )}
        {props.expand && (
          <motion.div
            className="content-container"
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={containerVariants}
            transition={containerTransition}
            style={{
              height: 100,
              marginLeft: 15,
              marginTop: 20,
            }}
          >
            <div className="search-content-container">
              {props.value === "" ? (
                <div className="continents">
                  {locations.map(({ title, img }, i) => (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <img
                        onClick={onSelectContinents}
                        style={{ width: 130, marginLeft: 10 }}
                        src={img}
                        alt={title}
                      />
                      <h4>{title}</h4>
                    </div>
                  ))}
                </div>
              ) : (
                <></>
              )}

              {/* {!props.isLoading && props.hasNoData && (
                <div className="loading-container-text">
                  <p>Start typing to Search</p>
                </div>
              )}
              {!props.isLoading && props.hasNoData && (
                <div className="loading-container-text">
                  <p>Enter minimum 3 letters to search</p>
                </div>
              )} */}
              {!props.isLoading && !props.hasNoData && (
                <>
                  {props.data.map((loc) => {
                    return (
                      <>
                        <Places
                          onClick={onSelectOptions}
                          key={loc.id}
                          name={loc.name}
                          rating={loc.state}
                        />
                      </>
                    );
                  })}
                </>
              )}
            </div>
          </motion.div>
        )}
        

        <div> 
          {!props.expand && (

        
            <div className="continents">
              {locations.map(({ title, img }, i) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <img
                    onClick={onSelectContinents}
                    style={{ width: 130, marginLeft: 10 }}
                    src={img}
                    alt={title}
                  />
                  <h4>{title}</h4>
                </div>
              ))}
            </div>
              )}

          {/* {!props.isLoading && props.hasNoData && (
                <div className="loading-container-text">
                  <p>Start typing to Search</p>
                </div>
              )}
              {!props.isLoading && props.hasNoData && (
                <div className="loading-container-text">
                  <p>Enter minimum 3 letters to search</p>
                </div>
              )} */}
        </div>
      </motion.div>
    </>
  );
};

export default SearchBar;
