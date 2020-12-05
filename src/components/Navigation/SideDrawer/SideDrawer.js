import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Auxiliary/Auxiliary'
const SideDrawer = (props) => {
  let classesAttached=[classes.SideDrawer,classes.Close]
  if(props.open){
  classesAttached=[classes.SideDrawer,classes.Open]
  }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed}/>
    <div className={classesAttached.join(" ")}>
      <div className={classes.Logo}><Logo /></div>
      
      <nav>
        <NavigationItems />
      </nav>
    </div></Aux>
  );
};

export default SideDrawer;
