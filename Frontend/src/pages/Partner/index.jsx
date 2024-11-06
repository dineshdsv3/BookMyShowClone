import React from "react";
import { Tabs } from "antd";
import TheatreList from "./TheatreList";

const items = [
    {
        key: "theatre",
        label: "Theatres",
        children: <TheatreList />,
    },
];

function Partner() {
    return (
        <div>
            <h1>Partner Page</h1>
            <Tabs items={items} />
        </div>
    );
}

export default Partner;