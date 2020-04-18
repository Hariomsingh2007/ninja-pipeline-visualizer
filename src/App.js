import React from 'react';
import logo from './logo.svg';
import './App.css';
import Pipeline from './components/Pipeline_viz'

function App() {

    var node_info = [{
            'NodeID': 'T1',
            'NodeName': 'Table 1',
            'NodeUrl': 'https://www.table1.com',
            'NodeColor': 'mediumseagreen'
        },
        {
            'NodeID': 'T2',
            'NodeName': 'Table 2'
        },
        {
            'NodeID': 'T3',
            'NodeName': 'Table 3',
            'NodeUrl': 'https://table3.com',
            'NodeColor': 'lightgreen'
        },
        {
            'NodeID': 'T4',
            'NodeName': 'Table 4',
            'NodeUrl': 'https://table4.com',
            'NodeColor': 'lightgreen'
        },
        {
            'NodeID': 'T5',
            'NodeName': 'Scoop Job',
            'NodeUrl': 'https://Scoop.com',
            'NodeColor': 'lightgreen'
        },
        {
            'NodeID': 'T6',
            'NodeName': 'Spark Job',
            'NodeUrl': 'https://Spark.com',
            'NodeColor': 'lightgreen'
        },
        {
            'NodeID': 'T7',
            'NodeName': 'Load S3',
            'NodeUrl': 'https://s3.com',
            'NodeColor': 'yellow'
        }
    ];


    var node_rel = [
        ["T1", "T2"],
        ["T2", "T3"],
        ["T3", "T4"],
        ["T3", "T5"],
        ["T5", "T6"],
        ["T6", "T7"]
    ];

    return ( <
        div className = "App" >
        <
        div class = "header" >
        <
        a href = "#default"
        class = "logo" > Ninja Pipeline Visualizer < /a> <
        div class = "header-right" >
        <
        a class = "active"
        href = "/" > Home < /a> <
        a href = "https://google.com" > Contact < /a> <
        a href = "/aboutus" > About < /a> <
        /div> <
        /div> <
        Pipeline node node_relation = {
            node_rel
        }
        node_information = {
            node_info
        }
        />

        <
        /div>
    );
}

export default App;