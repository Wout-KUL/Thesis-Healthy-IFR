import React, {useState} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export const TabsElement =(props)=>{
      
    //js als <div een value heeft => niet undifined => true
    console.log(props.children)
    return (
        <Tabs>
        <TabList>
          <Tab><p className='tabTitle'>{props.title1}</p></Tab>
          <Tab><p className='tabTitle'>{props.title2}</p></Tab>
        </TabList>
      
        <TabPanel>
          {props.children[0]}
        </TabPanel>
        <TabPanel>
          {props.children[1]}
        </TabPanel>
      </Tabs>
    );
}